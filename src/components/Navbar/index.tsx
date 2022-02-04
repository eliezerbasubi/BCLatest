import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center pb-8">
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-extrabold">
        Latest<span className="text-maroon">BC</span>
      </h1>
    </nav>
  );
};

export default Navbar;
