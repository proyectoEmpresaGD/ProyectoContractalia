import express, { json } from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';
import { corsMiddleware } from "./src/middlewares/cors.js";
import helmet from "helmet";

// Configuración de Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(corsMiddleware());
app.use(express.json());
app.disable("x-powered-by");

// ✅ Verificación de credenciales en la terminal
console.log("📌 GERARDO_EMAIL:", process.env.GERARDO_EMAIL || "NO CARGADO ❌");
console.log("📌 PEDIDOS_EMAIL:", process.env.PEDIDOS_EMAIL || "NO CARGADO ❌");

// 📌 Configuración SMTP (One.com)
const SMTP_HOST = "send.one.com";
const SMTP_PORT = 465;

// 📌 Transportadores SMTP
const gerardoTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.GERARDO_EMAIL,
        pass: process.env.GERARDO_PASS,
    },
});

const pedidosTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.PEDIDOS_EMAIL,
        pass: process.env.PEDIDOS_PASS,
    },
});

// 📌 Middleware de seguridad
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://proyecto-contractalia-backend.vercel.app"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "https://proyecto-contractalia-backend.vercel.app"],
                connectSrc: ["'self'", "https://proyecto-contractalia-backend.vercel.app"],
            },
        },
    })
);

// 📌 Validación de teléfono
const isValidPhone = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, ""); // Elimina caracteres no numéricos
    return (
        cleanedPhone.length >= 9 &&
        cleanedPhone.length <= 15 &&
        !/^(\d)\1+$/.test(cleanedPhone) // Evita números repetidos como "111111111"
    );
};

// 📌 Ruta para recibir datos del formulario y enviar correos
app.post("/api/email", async (req, res) => {
    const { email, phone, message } = req.body;

    // 📌 Validación de datos
    if (!email || !message || !phone || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || !isValidPhone(phone)) {
        return res.status(400).json({ error: "⚠️ Datos inválidos. Ingresa un email, teléfono y mensaje válidos." });
    }

    try {
        // 📌 1️⃣ Enviar correo a Contractalia (desde GERARDO@CJMW.EU)
        await gerardoTransporter.sendMail({
            from: `"Contractalia Contacto" <${process.env.GERARDO_EMAIL}>`,
            to: "pedidos@contractalia.com",
            subject: "📩 Nuevo contacto desde la web",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
                
                <div style="background-color: #007BFF; padding: 15px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                    <h2 style="color: #ffffff; margin: 0;">📩 Nuevo mensaje de contacto</h2>
                </div>

                <div style="padding: 20px; color: #333;">
                    <p style="font-size: 16px; margin-bottom: 10px;"><strong>Detalles del cliente:</strong></p>

                    <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);">
                        <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a></p>
                        <p><strong>📞 Teléfono:</strong> ${phone}</p>
                        <p><strong>📅 Fecha de envío:</strong> ${new Date().toLocaleString()}</p>
                    </div>

                    <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">

                    <p style="font-size: 16px; margin-bottom: 10px;"><strong>📝 Mensaje del cliente:</strong></p>
                    
                    <div style="background-color: #ffffff; padding: 15px; border-left: 5px solid #007BFF; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 14px; line-height: 1.6; color: #333;">${message}</p>
                    </div>

                    <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
                    
                    <p style="font-size: 12px; color: #777; text-align: center;">
                        📌 Recibido automáticamente a través del formulario de contacto en <a href="https://www.contractalia.com" style="color: #007BFF; text-decoration: none;">Contractalia.com</a>
                    </p>
                </div>
            </div>
            `
        });

        console.log(`📩 Correo enviado a Contractalia desde ${process.env.GERARDO_EMAIL}`);

        // 📌 2️⃣ Responder automáticamente al cliente
        await pedidosTransporter.sendMail({
            from: `"Contractalia" <${process.env.PEDIDOS_EMAIL}>`,
            to: email,
            subject: "Gracias por contactarnos en Contractalia",
            html: `
           <!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contractalia</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; text-align: center;">

    <!-- Contenido principal -->
    <table width="700px" cellpadding="0" cellspacing="0" border="0"
        style="background-color: #606060; padding-right: 20px; padding-bottom: 20px; margin: auto;">
        <tr>
            <td align="center">

                <!--[if mso]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:800px; height:600px;">
                    <v:fill type="frame" src="https://bassari.eu/PaginaContractalia/ImagenFondoContractalia.jpg" color="#ffffff"/>
                    <v:textbox inset="0,0,0,0" style="mso-position-vertical:center; mso-position-vertical-relative:text; padding-top: 100px; text-align:center;">
                        <table width="80%" cellpadding="20" cellspacing="0" border="0" align="center" 
                            style="background-color: #ffffff; text-align: left; margin: auto;">
                            <tr>
                                <td align="left">
                                    <img src="https://bassari.eu/ImagenesTelasCjmw/Iconos/Logos/LOGOS%20MARCAS/LogoContractalia.png" alt="Contractalia" width="80" height="80" style="display: block;">
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="padding-left: 100px; padding-right: 80px;">
                                    <p style="font-size: 18px; color: #333; line-height: 1.6;">
                                      Gracias por contacar con nosotros. Nuestro equipo comercial le responderá lo antes posible para que puedas hacer realidad ese nuevo proyecto.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </v:textbox>
                </v:rect>
                <![endif]-->

                <!-- Versión para otros clientes de correo -->
                <!--[if !mso]><!-->
                <table width="800px" height="600px" cellpadding="0" cellspacing="0" border="0" 
                    style="background: url('https://bassari.eu/PaginaContractalia/ImagenFondoContractalia.jpg') no-repeat center center;
                    background-size: cover; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
                    <tr>
                        <td align="center" style="padding: 60px;">
                            <table width="80%" cellpadding="20" cellspacing="0" border="0"
                                style="background-color: #ffffff; text-align: left;">
                                <tr>
                                    <td align="left">
                                        <img src="https://bassari.eu/ImagenesTelasCjmw/Iconos/Logos/LOGOS%20MARCAS/LogoContractalia.png"
                                            alt="Contractalia" width="80" style="display: block;">
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-left: 100px; padding-right: 80px;">
                                        <p style="font-size: 18px; color: #333; line-height: 1.6;">
                                          Gracias por contacar con nosotros. Nuestro equipo comercial le responderá lo antes posible para que puedas hacer realidad ese nuevo proyecto.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <!--<![endif]-->

            </td>
        </tr>
    </table>

    <!-- FIRMA - VERSIÓN EXCLUSIVA PARA OUTLOOK -->
<!--[if mso]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:700px; height:175px; margin: auto;">
    <v:textbox inset="0,0,0,0" style="mso-position-vertical:after; mso-position-vertical-relative:page; padding-top: 30px; mso-margin-top-alt:30px;">
        <table width="700px" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; text-align: left; font-family: Arial, sans-serif; color: black; border-spacing: 0;">
            <tr>
                <td style="padding-left: 32px; padding-right: 20px; vertical-align: top;">
                    <img src="https://bassari.eu/ImagenesTelasCjmw/Iconos/Logos/LogosParaFirmas/LOGO_CONTRACT_GRIS_MACIZO_15CM.png" alt="Contractalia Logo" width="110">
                </td>
                <td style="font-size: 15px; vertical-align: top; padding-right: 20px;">
                    <p><strong style="font-size: 17px;">Manolo Hidalgo</strong> <br> <em>Director Ventas Contract</em></p>
                    <p>M. 691 544 281 <br> <a href="mailto:pedidos@contractalia.com" style="color: black; text-decoration: none;">pedidos@contractalia.com</a></p>
                </td>
                <td style="border-left: solid 1px; height: 60px; margin-top: 2px; margin-right: 8px;"></td>
                <td style="font-size: 14px; padding-left: 20px; vertical-align: top;">
                    <p>Avda. de Europa, 19 <br>14550 Montilla, C&oacute;rdoba <br>M. 691 544 281 <br>
                        <a href="mailto:pedidos@contractalia.com" style="color: black; text-decoration: none;">pedidos@contractalia.com</a> <br>
                        <a href="https://contractalia.com" style="color: black; text-decoration: none;">contractalia.com</a>
                    </p>
                </td>
            </tr>
        </table>
    </v:textbox>
</v:rect>
<![endif]-->


<!-- FIRMA - VERSIÓN PARA OTROS CLIENTES -->
<!--[if !mso]><!-->
<table width="700px" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; text-align: left; margin-top: 30px; font-family: Arial, sans-serif; color: black; border-spacing: 0;">
    <tr>
        <td style="padding-top: 10px; padding-left: 32px; vertical-align: top;">
            <img src="https://bassari.eu/ImagenesTelasCjmw/Iconos/Logos/LogosParaFirmas/LOGO_CONTRACT_GRIS_MACIZO_15CM.png" alt="Contractalia Logo" width="110">
        </td>
        <td style="font-size: 15px; vertical-align: top;">
            <p><strong style="font-size: 17px;">Manolo Hidalgo</strong> <br> <em>Director Ventas Contract</em></p>
            <p>M. 691 544 281 <br> <a href="mailto:pedidos@contractalia.com" style="color: black; text-decoration: none;">pedidos@contractalia.com</a></p>
        </td>
        <td style="border-left: solid 1px; height: 98px; margin-top: 2px; margin-right: 8px;"></td>
        <td style="font-size: 14px; padding-left: 50px; vertical-align: top;">
            <p>Avda. de Europa, 19 <br>14550 Montilla, C&oacute;rdoba <br>M. 691 544 281 <br>
                <a href="mailto:pedidos@contractalia.com" style="color: black; text-decoration: none;">pedidos@contractalia.com</a> <br>
                <a href="https://contractalia.com" style="color: black; text-decoration: none;">contractalia.com</a>
            </p>
        </td>
    </tr>
</table>
<!--<![endif]-->


</body>

</html> `,
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
