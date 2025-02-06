import express, { json } from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';
import { corsMiddleware } from "./src/middlewares/cors.js";




// Configuración de Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(corsMiddleware());
app.use(express.json());
app.disable("x-powered-by");

// ✅ Verificación de credenciales en la terminal
console.log("📌 GERARDO_EMAIL:", process.env.GERARDO_EMAIL || "NO CARGADO ❌");
console.log("📌 GERARDO_PASS:", process.env.GERARDO_PASS ? "CARGADA ✅" : "NO CARGADA ❌");
console.log("📌 PEDIDOS_EMAIL:", process.env.PEDIDOS_EMAIL || "NO CARGADO ❌");
console.log("📌 PEDIDOS_PASS:", process.env.PEDIDOS_PASS ? "CARGADA ✅" : "NO CARGADA ❌");

// 📌 Configuración SMTP (One.com) 🔥
const SMTP_HOST = "send.one.com";
const SMTP_PORT = 465;

// 📌 Transportador para enviar correos a Contractalia desde GERARDO@CJMW.EU
const gerardoTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // SSL en puerto 465
    auth: {
        user: process.env.GERARDO_EMAIL,
        pass: process.env.GERARDO_PASS,
    },
});

// 📌 Transportador para responder al cliente desde PEDIDOS@CONTRACTALIA.COM
const pedidosTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.PEDIDOS_EMAIL,
        pass: process.env.PEDIDOS_PASS,
    },
});

// 📌 Ruta para recibir datos del formulario y enviar los correos
app.post("/api/email", async (req, res) => {
    const { email, message } = req.body;

    // 📌 Validación de datos
    if (!email || !message || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({ error: "⚠️ Datos inválidos. Ingresa un email y mensaje válidos." });
    }

    try {
        // 📌 1️⃣ Enviar correo a Contractalia (desde GERARDO@CJMW.EU)
        await gerardoTransporter.sendMail({
            from: `"Contractalia Contacto" <${process.env.GERARDO_EMAIL}>`,
            to: "pedidos@contractalia.com",
            subject: "Este cliente quiere contactar con nosotros",
            text: `Correo del Cliente: ${email}\n\nMensaje:\n${message}`,
        });

        console.log(`📩 Correo enviado a Contractalia desde ${process.env.GERARDO_EMAIL}`);

        // 📌 2️⃣ Responder automáticamente al cliente (desde PEDIDOS@CONTRACTALIA.COM)
        await pedidosTransporter.sendMail({
            from: `"Contractalia" <${process.env.PEDIDOS_EMAIL}>`,
            to: email, // 📬 Cliente que contactó
            subject: "Gracias por contactarnos en Contractalia",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f4f4f4;">
            <h2 style="color: #333;">¡Gracias por contactarnos!</h2>
            <p style="color: #555;">Estimado/a cliente,</p>
            <p style="color: #555;">
                Hemos recibido su mensaje y en breve uno de nuestros agentes se pondrá en contacto con usted.
            </p>
            <p style="color: #555;">Mientras tanto, puede visitar nuestra web para más información.</p>
            <br>
            <a href="https://www.contractalia.com" 
                style="display: inline-block; background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Visitar nuestra web
            </a>
            <br><br>
            <p style="color: #777; font-size: 12px;">Atentamente, <br> El equipo de Contractalia</p>
        </div>
      `,
        });

        console.log(`📨 Respuesta enviada al cliente ${email} desde ${process.env.PEDIDOS_EMAIL}`);

        // 📌 Respuesta al frontend
        res.status(200).json({ message: "✅ Correos enviados con éxito" });

    } catch (error) {
        console.error("❌ Error al enviar los correos:", error);
        res.status(500).json({ error: "❌ Error al enviar los correos" });
    }
});

// 📌 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor en ejecución en http://localhost:${PORT}`);
});
