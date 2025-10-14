import React from "react";

const Footer = () => {
  return (
    <footer className="w-full p-4 text-center text-sm md:text-base bg-bg-sec/40">
      @ {new Date().getFullYear()}. Build with 💚 by Hp.
    </footer>
  );
};

export default Footer;
