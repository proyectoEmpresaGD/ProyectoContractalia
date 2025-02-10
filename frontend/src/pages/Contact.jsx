import Form from "../components/Form";

const Contact = () => {
    return (
        <section
            id="contact"
            className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 text-center"
            style={{
                background: "linear-gradient(to bottom, #222, #2d2d2d)",
            }}
        >
            {/* Contenido principal */}
            <div className="relative z-10 max-w-4xl w-full text-white px-6 md:px-12 mt-8 ">
                <h2 className="text-2xl md:text-5xl font-bold mb-4">
                    Cuéntanos cómo podemos ayudarte y te responderemos lo antes posible.
                </h2>

                {/* Contenedor del formulario mejor alineado y más grande en pantallas grandes */}
                <div className="mt-20 flex justify-center">
                    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl transition-transform transform hover:scale-105">
                        <Form />
                    </div>
                </div>
            </div>

            {/* Pie de página con más espacio */}
            <footer className="mt-16 md:mt-24 text-white text-sm opacity-75">
                © Contractalia 2025 - Todos los Derechos Reservados
            </footer>
        </section>
    );
};

export default Contact;
