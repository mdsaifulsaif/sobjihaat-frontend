"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import SectionHeader from "../shared/SectionHeader";
import {
  useGetActivePromotionalBannersQuery,
  IPromotionalBannerItem,
} from "@/redux/api/promotionalBannerApi";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface PromotionalBannersProps {
  initialBanners?: IPromotionalBannerItem[];
  title?: string;
  subtitle?: string;
}

const PromotionalBanners: React.FC<PromotionalBannersProps> = ({
  initialBanners = [],
  title = "Feature of this week",
  subtitle = "Exclusive deals, seasonal picks & curated essentials",
}) => {
  const { data: response } = useGetActivePromotionalBannersQuery();
  const apiBanners: IPromotionalBannerItem[] = response?.data || initialBanners;

  // Filter active banners
  const banners = apiBanners.filter((b) => b.isActive !== false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // If no active banners, don't show empty block
  if (!banners || banners.length === 0) {
    return null;
  }

  const isSlider = banners.length > 3;

  const renderCardContent = (banner: IPromotionalBannerItem) => (
    <div className="group relative flex flex-col h-full cursor-pointer select-none">
      {/* Banner Card Image */}
      <div className="relative w-full aspect-square sm:aspect-4/3 md:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-xs group-hover:shadow-md transition-all duration-300">
        <Image
          src={banner.image}
          alt={banner.title || "Promotional Banner"}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 33vw"
          className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500 ease-out"
          priority={false}
        />
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Caption (Title & Subtitle) */}
      {(banner.title || banner.subtitle) && (
        <div className="pt-2 sm:pt-3 px-1 text-left">
          {banner.title && (
            <h4 className="text-sm sm:text-lg font-black text-gray-900 tracking-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
              {banner.title}
            </h4>
          )}
          {banner.subtitle && (
            <p className="text-[11px] sm:text-sm text-gray-500 font-medium mt-0.5 line-clamp-1">
              {banner.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const renderBannerCard = (banner: IPromotionalBannerItem) => {
    if (!banner.link) {
      return (
        <div key={banner._id || banner.image} className="h-full">
          {renderCardContent(banner)}
        </div>
      );
    }

    const isExternal =
      banner.link.startsWith("http://") || banner.link.startsWith("https://");

    if (isExternal) {
      return (
        <a
          key={banner._id || banner.image}
          href={banner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {renderCardContent(banner)}
        </a>
      );
    }

    return (
      <Link
        key={banner._id || banner.image}
        href={banner.link}
        className="block h-full"
      >
        {renderCardContent(banner)}
      </Link>
    );
  };

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Row using reusable SectionHeader (Without See All) */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
          <SectionHeader
            title={title}
            description={subtitle}
            icon={<BiLeaf size={18} />}
            className="mb-0 flex-1"
          />

          {/* Navigation Controls (Only visible on desktop/tablet when slider is active (> 3 cards)) */}
          {isSlider && (
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                ref={prevRef}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] text-gray-700 flex items-center justify-center transition-all shadow-xs cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Previous Slide"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                ref={nextRef}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] text-gray-700 flex items-center justify-center transition-all shadow-xs cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Next Slide"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile View (< sm): Horizontally scrollable row matching screenshot */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto flex gap-3 pb-2 scrollbar-none snap-x snap-mandatory overscroll-x-contain touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {banners.map((banner) => (
            <div
              key={banner._id || banner.image}
              className={`shrink-0 snap-start ${
                banners.length === 1
                  ? "w-full max-w-sm mx-auto"
                  : "w-[41.5vw] min-w-[145px] max-w-[240px]"
              }`}
            >
              {renderBannerCard(banner)}
            </div>
          ))}
          {/* Spacer to give proper padding at end of scroll */}
          {banners.length > 1 && (
            <div className="shrink-0 w-1" aria-hidden="true" />
          )}
        </div>

        {/* Desktop / Tablet View (>= sm): Grid or Swiper Slider */}
        <div className="hidden sm:block">
          {isSlider ? (
            <div className="relative">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  if (
                    typeof swiper.params.navigation !== "boolean" &&
                    swiper.params.navigation
                  ) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={banners.length > 3}
                spaceBetween={24}
                slidesPerView={2}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                className="promotional-banners-swiper !pb-2"
              >
                {banners.map((banner) => (
                  <SwiperSlide key={banner._id || banner.image} className="h-auto">
                    {renderBannerCard(banner)}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            /* Grid mode when <= 3 cards */
            <div
              className={`grid gap-5 sm:gap-6 ${
                banners.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : banners.length === 2
                  ? "sm:grid-cols-2 max-w-4xl mx-auto"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {banners.map((banner) => (
                <div key={banner._id || banner.image}>
                  {renderBannerCard(banner)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;

