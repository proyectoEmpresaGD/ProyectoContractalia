import React, { useState } from "react";
import { RiInstagramLine, RiFacebookLine, RiTwitterLine, RiGithubLine } from "react-icons/ri";

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleContactModal = () => {
    setShowContactModal(!showContactModal);
  };

  const handlePhoneClick = () => {
    if (window.innerWidth < 768) {
      window.location.href = "tel:+1234567890";
    }
  };

  return (
    <footer className="bg-footer p-8 xl:p-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-500 pb-8">
        {/* Logo */}
        <div className="w-1/6">
          <a href="#" className="flex items-center">
            <div className="bg-white rounded-full p-2">
              <img src="/cc.png" alt="Logo" className="w-10 h-10" />
            </div>
          </a>
        </div>
        {/* Social media */}
        <nav className="flex items-center gap-4">
          <a href="#" className="block text-white p-3 rounded-full bg-primary transition-colors hover:bg-primary-dark transform hover:scale-105">
            <RiInstagramLine size={24} />
          </a>
          <a href="#" className="block text-white p-3 rounded-full bg-primary transition-colors hover:bg-primary-dark transform hover:scale-105">
            <RiFacebookLine size={24} />
          </a>
          <a href="#" className="block text-white p-3 rounded-full bg-primary transition-colors hover:bg-primary-dark transform hover:scale-105">
            <RiTwitterLine size={24} />
          </a>
          <a href="#" className="block text-white p-3 rounded-full bg-primary transition-colors hover:bg-primary-dark transform hover:scale-105">
            <RiGithubLine size={24} />
          </a>
        </nav>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold text-white text-center md:text-left">
          Company
        </h3>
        <nav className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="#"
            className="text-gray-300 mt-2 md:mt-0 hover:text-white hover:underline transition-colors hover:bg-primary hover:bg-opacity-10 px-2 py-1 rounded-md"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-gray-300 mt-2 md:mt-0 hover:text-white hover:underline transition-colors hover:bg-primary hover:bg-opacity-10 px-2 py-1 rounded-md"
          >
            Press
          </a>
          <a
            href="#"
            className="text-gray-300 mt-2 md:mt-0 hover:text-white hover:underline transition-colors hover:bg-primary hover:bg-opacity-10 px-2 py-1 rounded-md"
          >
            Investors
          </a>
          <a
            href="#"
            className="text-gray-300 mt-2 md:mt-0 hover:text-white hover:underline transition-colors hover:bg-primary hover:bg-opacity-10 px-2 py-1 rounded-md"
          >
            Events
          </a>
          <a
            href="#"
            className="text-gray-300 mt-2 md:mt-0 hover:text-white hover:underline transition-colors hover:bg-primary hover:bg-opacity-10 px-2 py-1 rounded-md"
          >
            Terms of use
          </a>
          <a
            href="#"
            className="text-gray-300 mt-2 md:mt-0 hover:text-white hover:underline transition-colors hover:bg-primary hover:bg-opacity-10 px-2 py-1 rounded-md"
          >
            Privacy policy
          </a>
          <button
            type="button"
            onClick={toggleContactModal}
            className="font-semibold py-2 px-6 bg-primary text-white rounded-xl transition-colors hover:bg-primary-dark transform hover:scale-105"
          >
            Contact Us
          </button>
        </nav>
        {showContactModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <button
                  onClick={toggleContactModal}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src="/cc.png" alt="Logo" className="w-10 h-10 mr-2" />
                  <div>
                    <p className="text-gray-800 font-medium">Curtain Crafters</p>
                    <p>Email: info@example.com</p>
                    <p>Phone: <a href="tel:+1234567890" onClick={handlePhoneClick} className="text-primary hover:underline">+1234567890</a></p>
                    <p>Address: 123 Street, City, Country</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12">
        <p className="text-gray-300 text-center">
          © Gerardo-Sanchez-Pino 2023 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
