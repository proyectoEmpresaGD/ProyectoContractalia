import React, { useState, useEffect } from "react";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";

const menuLinks = [
  { label: "Inicio", href: "#home" },
  { label: "Contáctanos", href: "#contact" }
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (event) => {
    setShowMenu(false);
    const targetId = event.currentTarget.getAttribute("href");
    const element = targetId && document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-white shadow-md" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto max-w-screen-xl px-4 md:px-10 lg:px-16 flex items-center justify-between xl:justify-center py-4 relative">
        {/* Logo para móviles (visible en pantallas menores a 1280px) */}
        <div className="xl:hidden">
          <img
            src="https://bassari.eu/ImagenesTelasCjmw/Iconos/Logos/LogosParaFirmas/LOGO_CONTRACT_GRIS_MACIZO_15CM.png"
            alt="Contractalia Logo"
            className="w-10"
          />
        </div>

        {/* Logo para pantallas grandes (visible en pantallas de 1280px en adelante) */}
        <div
          className={`hidden xl:flex items-center absolute left-0 transition-opacity duration-300 ${scrolling ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src="https://bassari.eu/ImagenesTelasCjmw/Iconos/Logos/LogosParaFirmas/LOGO_CONTRACT_GRIS_MACIZO_15CM.png"
            alt="Contractalia Logo"
            className="w-16 ml-8"
          />
        </div>

        {/* Navegación desktop (visible en pantallas de 1280px en adelante) */}
        <nav className="hidden xl:flex space-x-8">
          {menuLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`nav-link ${scrolling ? "text-black" : "text-white"}`}
              onClick={handleLinkClick}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Botón de menú móvil (visible en pantallas menores a 1280px) */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="xl:hidden text-2xl p-2 focus:outline-none rounded"
        >
          {showMenu ? (
            <RiCloseLine
              className={`transition-colors duration-300 ${scrolling ? "text-black" : "text-white"
                }`}
            />
          ) : (
            <RiMenu3Fill
              className={`transition-colors duration-300 ${scrolling ? "text-black" : "text-white"
                }`}
            />
          )}
        </button>
      </div>

      {/* Menú móvil con margen superior */}
      {showMenu && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-start mt-16 space-y-6 text-center p-8 overflow-y-auto">
          {menuLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-black text-lg font-semibold px-6 py-3 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
              onClick={handleLinkClick}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setShowMenu(false)}
            className="text-lg text-black bg-gray-200 px-6 py-2 rounded-md mt-4 hover:bg-gray-300 transition-all"
          >
            Cerrar menú
          </button>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          transition: all 0.3s ease;
          font-size: 1.2rem;
          padding: 0.75rem 1.5rem;
          display: inline-block;
        }
        .nav-link:hover {
          color: #000;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 0.5rem;
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </header>
  );
};

export default Header;
