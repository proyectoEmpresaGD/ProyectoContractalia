import React from "react";
import Header from "./components/Header";
import Home from "./components/Hero.jsx";
import Contact from "./pages/Contact.jsx";

const App = () => {
  return (
    <div className="w-full h-auto overflow-auto scroll-smooth">
      <Header />
      <Home />
      <Contact />
    </div >
  );
};

export default App;
