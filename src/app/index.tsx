import React, { useCallback, useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Transactions from "../components/Transactions";

const App = () => {
  return (
    <div className="w-full">
      <div className="min-h-screen bg-primary">
        <div className="w-full max-w-[1420px] mx-auto py-12 px-4 text-white">
          <Navbar />

          <HeroSection />
        </div>
      </div>
      <div className=" bg-[#E5E5E5]">
        <Transactions />
      </div>
    </div>
  );
};

export default App;
