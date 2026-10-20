"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useGetActiveBannersQuery, IBannerItem } from "@/redux/api/bannerApi";

const defaultBanners: IBannerItem[] = [
  {
    _id: "default-1",
    title: "Fresh Groceries at Your Doorstep",
    image: "/img/sbb1.png",
    link: "/",
    isActive: true,
  },
];

interface HeroProps {
  initialBanners?: IBannerItem[];
}

const Hero: React.FC<HeroProps> = ({ initialBanners }) => {
  const { data: bannerResponse } = useGetActiveBannersQuery();
  const apiBanners: IBannerItem[] = bannerResponse?.data || initialBanners || [];
  const banners = apiBanners.length > 0 ? apiBanners : defaultBanners;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isSliderEnabled = banners.length > 1;

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (!isSliderEnabled || isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isSliderEnabled, isHovered, banners.length]);

  // Keep index within bounds if banners change
  useEffect(() => {
    if (currentSlide >= banners.length) {
      setCurrentSlide(0);
    }
  }, [banners.length, currentSlide]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance && isSliderEnabled) {
      handleNext();
    } else if (distance < -minSwipeDistance && isSliderEnabled) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 sm:pb-8">
      {/* ===== HERO BANNER WRAPPER ===== */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-gray-100 group select-none
                   aspect-[16/7] sm:aspect-[16/6] md:aspect-[21/8] lg:h-[400px] xl:h-[440px] max-h-[440px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        {banners.map((banner, index) => {
          const isActive = index === currentSlide;
          const content = (
            <div className="relative w-full h-full">
              <picture>
                {banner.mobileImage && (
                  <source
                    media="(max-width: 640px)"
                    srcSet={banner.mobileImage}
                  />
                )}
                <img
                  src={banner.image}
                  alt={banner.title || `Hero banner ${index + 1}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </picture>
            </div>
          );

          return (
            <div
              key={banner._id || index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {banner.link ? (
                <Link
                  href={banner.link === "/shop" || banner.link === "/offers" ? "/" : banner.link}
                  className="block w-full h-full cursor-pointer"
                  tabIndex={isActive ? 0 : -1}
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}

        {/* Prev / Next Navigation Arrows (Only shown when > 1 banner) */}
        {isSliderEnabled && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Banner"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full
                         bg-white/80 hover:bg-white text-gray-800 backdrop-blur-md shadow-md
                         flex items-center justify-center transition-all duration-200
                         opacity-0 group-hover:opacity-100 active:scale-95 focus:outline-none"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Banner"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full
                         bg-white/80 hover:bg-white text-gray-800 backdrop-blur-md shadow-md
                         flex items-center justify-center transition-all duration-200
                         opacity-0 group-hover:opacity-100 active:scale-95 focus:outline-none"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}

        {/* Navigation Indicator Dots (Only shown when > 1 banner) */}
        {isSliderEnabled && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 outline-none ${
                  index === currentSlide
                    ? "w-6 sm:w-8 bg-white shadow-sm"
                    : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;