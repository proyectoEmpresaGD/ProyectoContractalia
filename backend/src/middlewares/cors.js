import cors from "cors";

const ACCEPTED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:1234",
    "https://movies.com",
    "https://midu.dev",
    "https://proyecto-react-cjmw-neon.vercel.app",
    "https://cjmw-worldwide.vercel.app",
    "https://proyecto-stock-react-backend.vercel.app",
    "https://proyecto-stock-react.vercel.app",
    "https://cjmw.eu",
    "https://www.cjmw.eu",
    "https://bassari.eu",
    "https://www.bassari.eu",
    "https://translate.google.com", // Para permitir Google Translate
    "https://proyecto-contractalia-backend.vercel.app/", // Para permitir Google Translate
    "https://proyecto-contractalia-web.vercel.app/",
    "https://www.contractalia.com",
    "https://cjmw.com"
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
    cors({
        origin: (origin, callback) => {
            if (!origin || acceptedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true, // ✅ Permite envío de cookies y autenticaciones si es necesario
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Métodos permitidos
        allowedHeaders: ["Content-Type", "Authorization"], // ✅ Encabezados permitidos
        exposedHeaders: ["Content-Length", "X-Foo"], // Permite acceder a estos headers
    });
