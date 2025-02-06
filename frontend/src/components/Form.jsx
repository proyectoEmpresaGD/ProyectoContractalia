import { useState } from "react";

const Form = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // Función para validar email con regex
    const isValidEmail = (email) => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        // Validaciones
        if (!isValidEmail(email)) {
            setStatus("⚠️ Por favor ingresa un email válido.");
            setLoading(false);
            return;
        }

        if (!message.trim()) {
            setStatus("⚠️ Por favor ingresa un mensaje.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, message }),
            });

            if (response.ok) {
                setStatus("✅ Correo enviado con éxito");
                setEmail("");
                setMessage("");
            } else {
                setStatus("❌ Error al enviar el correo. Inténtalo de nuevo.");
            }
        } catch (error) {
            setStatus("⚠️ Error de conexión con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white p-6 md:p-8 shadow-2xl rounded-xl w-full max-w-md md:max-w-lg lg:max-w-xl transition-all transform hover:scale-105">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">Contáctanos</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {/* Campo de Email */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="text-gray-900 border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    required
                />

                {/* Campo de Mensaje */}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos"
                    className="text-gray-900 border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    required
                />

                {/* Botón Enviar */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`p-3 rounded-md w-full font-bold text-white transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                        }`}
                >
                    {loading ? "Enviando..." : "Enviar"}
                </button>

                {/* Mensaje de Estado */}
                {status && (
                    <p className={`text-sm mt-2 text-center ${status.includes("✅") ? "text-green-500" : "text-red-500"
                        } transition-opacity duration-500 opacity-100`}>
                        {status}
                    </p>
                )}
            </form>
        </section>
    );
};

export default Form;
