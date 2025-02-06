import React from "react";
import Form from "../components/Form";

const Home = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-10 text-center"
      style={{
        backgroundImage: "url('https://bassari.eu/PaginaContractalia/ImagenFondoContractalia.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa oscura para mejorar la visibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Logo en pantallas grandes, oculto en móviles */}
      <div className="hidden md:block absolute top-20 left-20">
        <img
          src="https://bassari.eu/ImagenesTelasCjmw/Iconos/Logos/LogosParaFirmas/LOGO_CONTRACT_BLANCO_MACIZO_15CM.png"
          alt="Contractalia Logo"
          className="w-40"
        />
      </div>

      {/* Contenido principal con margen en móviles */}
      <div className="relative z-10 max-w-2xl text-white mt-20 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Diseño, calidad y versatilidad para crear el máximo confort
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed">
          En <span className="font-bold">Contractalia</span>, damos el toque final a los espacios más exigentes.
          Somos especialistas en tapicería, confección e instalación de textiles para el mercado contract, trabajando con hoteles y proyectos de alto nivel.
        </p>
        <p className="mt-4 text-lg md:text-xl leading-relaxed">
          Transformamos tus diseños en soluciones impecables, garantizando un ajuste perfecto y una instalación precisa.
          Nuestra experiencia y compromiso aseguran acabados elegantes, funcionales y a la altura de cualquier espacio exclusivo.
        </p>
        <p className="mt-4 text-lg md:text-xl leading-relaxed">
          Cuéntanos y nuestro equipo te asesorará en cada detalle. Porque los detalles importan, y nosotros nos encargamos del último paso.
        </p>
      </div>
    </section>
  );
};

export default Home;
