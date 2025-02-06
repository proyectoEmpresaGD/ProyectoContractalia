import React from "react";
import { RiWindowFill, RiPaintBrushLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Services = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Gracias por suscribirte!", {
      position: "top-right",
      autoClose: 3000, // Cerrar automáticamente después de 3 segundos
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      id="services"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 p-8 md:p-12 xl:p-20"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] font-bold">Our Services</h1>
        <p className="text-[20px] text-gray-500">
          Discover how we can help you enhance your living space with our
          customized curtain designs.
        </p>
        <form className="w-full" onSubmit={handleSubscribe}>
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-100 py-4 pl-10 pr-36 rounded-xl outline-none"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="absolute font-semibold py-2 px-6 bg-primary text-white rounded-xl top-1/2 -translate-y-1/2 right-2 transition-colors hover:bg-opacity-90"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 transition-transform hover:scale-105">
          <RiWindowFill className="text-4xl p-2 bg-secondary text-primary box-content rounded-xl" />
          <h3 className="text-[20px] font-bold">Custom Curtain Design</h3>
          <p className="text-gray-500">
            We offer personalized curtain designs tailored to your unique style
            and preferences.
          </p>
        </div>
        <div className="flex flex-col gap-4 transition-transform hover:scale-105">
          <RiPaintBrushLine className="text-4xl p-2 bg-secondary text-primary box-content rounded-xl" />
          <h3 className="text-[20px] font-bold">Professional Installation</h3>
          <p className="text-gray-500">
            Our team of experts ensures seamless installation of your custom
            curtains, guaranteeing a perfect fit every time.
          </p>
        </div>
        <div className="flex flex-col gap-4 transition-transform hover:scale-105">
          <RiWindowFill className="text-4xl p-2 bg-secondary text-primary box-content rounded-xl" />
          <h3 className="text-[20px] font-bold">Fabric Selection</h3>
          <p className="text-gray-500">
            Choose from a wide range of high-quality fabrics, colors, and
            patterns to create the perfect curtains for your space.
          </p>
        </div>
        <div className="flex flex-col gap-4 transition-transform hover:scale-105">
          <RiPaintBrushLine className="text-4xl p-2 bg-secondary text-primary box-content rounded-xl" />
          <h3 className="text-[20px] font-bold">Consultation Services</h3>
          <p className="text-gray-500">
            Our design experts provide personalized consultation services to
            help you bring your curtain ideas to life.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Services;
