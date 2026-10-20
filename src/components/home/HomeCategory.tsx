


"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Mousewheel } from "swiper/modules";
import CategoryCard from "../shared/CategoryCard";
import { Category } from "@/types/category";

// Import styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import SectionHeader from "../shared/SectionHeader";
import SectionHeading from "../shared/SectionHeading";
import { BiLeaf } from "react-icons/bi";

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
  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
    {Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xs border border-gray-100 flex flex-col items-center"
      >
        <div className="aspect-square w-full rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        <div className="mt-2 text-center space-y-1.5 w-full">
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/2 mx-auto animate-pulse" />
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

  const router = useRouter();

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
    320: { slidesPerView: 4, spaceBetween: 8 },
    480: { slidesPerView: 4, spaceBetween: 10 },
    640: { slidesPerView: 6, spaceBetween: 12 },
    768: { slidesPerView: 7, spaceBetween: 12 },
    1024: { slidesPerView: 8, spaceBetween: 14 },
    1280: { slidesPerView: 10, spaceBetween: 14 },
    1536: { slidesPerView: 10, spaceBetween: 16 },
  };

  if (!categoriesData.length) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 bg-[#fbfcfa] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Product Categories"
          icon={<BiLeaf size={18} />}
          actionLabel="See all"
          onAction={() => {
            router.push("/categories");
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "instant" });
            }
          }}
        />

        <div className="relative mt-2">
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
              className="py-1"
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
                className="swiper-button-prev-custom absolute -left-2.5 sm:-left-3.5 top-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 cursor-pointer"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                className="swiper-button-next-custom absolute -right-2.5 sm:-right-3.5 top-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 cursor-pointer"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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

        {/* <div className="mt-8 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 px-6 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-[#eef3e6]"
          >
            <GridIcon />
            View All Categories
            <ArrowRightIcon size={15} />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HomeCategory;