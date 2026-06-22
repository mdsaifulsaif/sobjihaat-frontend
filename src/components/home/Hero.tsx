

"use client";

import React from "react";
import Image from "next/image";
import { FiMapPin, FiClock, FiShield } from "react-icons/fi";
import { PiLeafLight } from "react-icons/pi";
import { TbCurrencyTaka } from "react-icons/tb";

const bannerUrl = "/img/image.png";
const heroProductImg = "/img/hero-product.png"; // basket/groceries image

interface Feature {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const features: Feature[] = [
  {
    icon: <FiClock size={18} />,
    title: "60 Min Delivery",
    subtitle: "",
  },
  {
    icon: <PiLeafLight size={18} />,
    title: "Fresh from",
    subtitle: "Local Market",
  },
  {
    icon: <TbCurrencyTaka size={18} />,
    title: "Best Price",
    subtitle: "Everyday",
  },
  {
    icon: <FiClock size={18} />,
    title: "Choose Time",
    subtitle: "You Prefer",
  },
  {
    icon: <FiShield size={18} />,
    title: "Secure",
    subtitle: "Payments",
  },
];

const Hero: React.FC = () => {
  const location = "Barisal Sadar, Rupatoli, Nathullabad & more";

  return (
    <div className="mx-auto w-full  px-4">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerUrl})`, minHeight: "280px" }}
      >
        {/* White gradient overlay — left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-0 pointer-events-none" />

        {/* Today's Delivery badge — top right */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-white shadow-md">
          <FiClock size={13} />
          <div className="text-[11px] leading-tight">
            <p className="font-semibold">Today's Delivery</p>
            <p className="opacity-80">60 Minutes</p>
          </div>
        </div>

        {/* Left content */}
        <div className="relative z-10 flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 max-w-[65%] md:max-w-[55%] pb-20 md:pb-24">
          {/* Headline */}
          <h1 className="font-['Montserrat_Alternates',sans-serif] text-[20px] sm:text-[28px] md:text-[36px] font-bold leading-[1.2] text-gray-900 mb-1 sm:mb-2">
            Fresh Groceries
            <br />
            Delivered at your Doorstep
          </h1>

          <p className="text-[11px] sm:text-[13px] text-gray-500 mb-3 sm:mb-4">
            Order now and get fast delivery at your preferred time.
          </p>

          {/* Location row */}
          <div className="flex items-center gap-1.5">
            <FiMapPin size={13} className="text-[#37651B] flex-shrink-0" />
            <span className="text-[11px] sm:text-[12px] text-gray-600 border border-gray-300 rounded-full px-2.5 py-0.5 truncate max-w-[280px]">
              Delivering to: {location}
            </span>
          </div>
        </div>

     

        {/* Bottom glass feature bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="mx-3 mb-3 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 shadow-sm px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
            {features.map((f, i) => (
              <React.Fragment key={f.title}>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/60 text-[#37651B]">
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-[11px] sm:text-[12px] font-semibold text-gray-800 leading-tight whitespace-nowrap">
                      {f.title}
                    </p>
                    {f.subtitle && (
                      <p className="text-[10px] sm:text-[11px] text-gray-600 leading-tight whitespace-nowrap">
                        {f.subtitle}
                      </p>
                    )}
                  </div>
                </div>
                {i < features.length - 1 && (
                  <div className="h-6 w-px bg-white/50 flex-shrink-0 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;