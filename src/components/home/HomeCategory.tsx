


"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Mousewheel } from "swiper/modules";
import CategoryCard from "../shared/CategoryCard";
import { Category } from "@/types/category"; 

// Import styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

/* =========================================================================
   Brand color: --color-primary: #619d23
   ========================================================================= */

const StarBadgeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="var(--color-primary)" />
    <path
      d="M12 6.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.6 3.6-.5L12 6.5Z"
      fill="#fff"
    />
  </svg>
);

const ArrowRightIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="var(--color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Skeleton Loader
--------------------------------------------------------------------------- */
const SkeletonLoader = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        <div className="mt-3 text-center space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/2 mx-auto animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

interface HomeCategoryProps {
  initialCategories?: Category[];
}

const HomeCategory: React.FC<HomeCategoryProps> = ({ initialCategories = [] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ডাটা সর্ট এবং ফিল্টার
  const categoriesData = React.useMemo(() => {
    if (!initialCategories?.length) return [];

    return [...initialCategories]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .filter((cat) => cat.status === "active" && !cat.isDeleted);
  }, [initialCategories]);

  const breakpoints = {
    320: { slidesPerView: 3, spaceBetween: 12 },
    480: { slidesPerView: 3, spaceBetween: 14 },
    640: { slidesPerView: 3, spaceBetween: 16 },
    768: { slidesPerView: 4, spaceBetween: 18 },
    1024: { slidesPerView: 6, spaceBetween: 20 },
    1280: { slidesPerView: 6, spaceBetween: 24 },
  };

  if (!categoriesData.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#fbfcfa] px-1 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto container overflow-hidden">
        <div className="text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-4 py-1.5 text-xs font-bold tracking-wide text-[var(--color-primary)]">
            <StarBadgeIcon />
            EXPLORE &amp; SHOP
          </span>

          <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-[2.6rem]">
            Shop by Category
          </h2>

          <p className="mx-auto mt-4 text-sm text-gray-500 sm:text-base">
            Find everything you need,{" "}
            <span className="relative inline-block">
              fresh and fast
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-[var(--color-primary)]" />
            </span>
          </p>
        </div>

        <div className="relative mt-10">
          {!isMounted ? (
            <SkeletonLoader />
          ) : (
            <Swiper
              modules={[Navigation, Grid, Mousewheel]}
              breakpoints={breakpoints}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              mousewheel={{ sensitivity: 0.5, forceToAxis: true }}
              grabCursor={true}
              loop={false}
              className="!overflow-visible"
            >
              {categoriesData.map((cat: Category) => (
                <SwiperSlide key={cat._id}>
                  <CategoryCard item={cat} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {isMounted && (
            <>
              <button
                type="button"
                className="swiper-button-prev-custom absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-left-5 cursor-pointer"
                aria-label="Previous"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 5l-7 7 7 7"
                    stroke="#1a3c1f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="swiper-button-next-custom absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-right-5 cursor-pointer"
                aria-label="Next"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="#1a3c1f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 px-6 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-[#eef3e6]"
          >
            <GridIcon />
            View All Categories
            <ArrowRightIcon size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeCategory;