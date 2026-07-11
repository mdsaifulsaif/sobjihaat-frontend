// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useGetCategoriesQuery } from "@/redux/api/categoryApi"; // আপনার প্রজেক্টের অনুযায়ী পাথ চেঞ্জ করুন
// import CategoryCard from "../shared/CategoryCard";
// // import CategoryCard from './CategoryCard';

// /* =========================================================================
//    Brand color: --color-primary: #619d23
//    ========================================================================= */

// /* ---------------------------------------------------------------------------
//    Decorative doodles
// --------------------------------------------------------------------------- */

// const PaperPlaneDoodle: React.FC<{ className?: string }> = ({
//   className = "",
// }) => (
//   <svg viewBox="0 0 220 160" className={className} fill="none" aria-hidden>
//     <path
//       d="M8 140C30 110 55 130 70 110C82 94 65 80 78 70"
//       stroke="#bcd9a8"
//       strokeWidth="2"
//       strokeDasharray="2 8"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <circle
//       cx="78"
//       cy="55"
//       r="13"
//       stroke="#bcd9a8"
//       strokeWidth="2"
//       fill="none"
//       strokeDasharray="2 7"
//     />
//     <path
//       d="M85 60C95 50 130 40 150 8 C130 30 105 40 90 45"
//       stroke="#bcd9a8"
//       strokeWidth="2"
//       strokeDasharray="2 8"
//       fill="none"
//       strokeLinecap="round"
//     />
//     <g transform="translate(140,10)">
//       <path
//         d="M0 38 L62 0 L34 22 L40 38 L26 28 Z"
//         fill="none"
//         stroke="#8fbf78"
//         strokeWidth="2.2"
//         strokeLinejoin="round"
//       />
//     </g>
//   </svg>
// );

// const FloatingLeafDoodle: React.FC<{ className?: string }> = ({
//   className = "",
// }) => (
//   <svg viewBox="0 0 220 140" className={className} fill="none" aria-hidden>
//     <g transform="translate(10,10)">
//       <path
//         d="M28 0C20 10 18 24 28 38C38 24 36 10 28 0Z"
//         fill="none"
//         stroke="#8fbf78"
//         strokeWidth="2"
//       />
//       <path
//         d="M28 6V34"
//         stroke="#8fbf78"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//       />
//       <path
//         d="M28 16 18 24M28 24 36 30"
//         stroke="#8fbf78"
//         strokeWidth="1.4"
//         strokeLinecap="round"
//       />
//     </g>
//     <path
//       d="M40 55C70 45 95 65 130 58 S 180 70 200 50"
//       stroke="#bcd9a8"
//       strokeWidth="2"
//       strokeDasharray="2 8"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </svg>
// );

// /* ---------------------------------------------------------------------------
//    Small UI icons
// --------------------------------------------------------------------------- */

// const StarBadgeIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="12" r="10" fill="var(--color-primary)" />
//     <path
//       d="M12 6.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.6 3.6-.5L12 6.5Z"
//       fill="#fff"
//     />
//   </svg>
// );

// const ArrowRightIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <path
//       d="M5 12h14M13 6l6 6-6 6"
//       stroke="var(--color-primary)"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const ChevronIcon: React.FC<{ direction?: "left" | "right" }> = ({
//   direction = "right",
// }) => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
//   >
//     <path
//       d="M9 5l7 7-7 7"
//       stroke="#1a3c1f"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const GridIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <rect
//       x="4"
//       y="4"
//       width="7"
//       height="7"
//       rx="1.5"
//       fill="var(--color-primary)"
//     />
//     <rect
//       x="13"
//       y="4"
//       width="7"
//       height="7"
//       rx="1.5"
//       fill="var(--color-primary)"
//     />
//     <rect
//       x="4"
//       y="13"
//       width="7"
//       height="7"
//       rx="1.5"
//       fill="var(--color-primary)"
//     />
//     <rect
//       x="13"
//       y="13"
//       width="7"
//       height="7"
//       rx="1.5"
//       fill="var(--color-primary)"
//     />
//   </svg>
// );

// /* ---------------------------------------------------------------------------
//    Main HomeCategory Component
// --------------------------------------------------------------------------- */

// // const PER_VIEW = { base: 1, sm: 2, lg: 5 };
// const PER_VIEW = {
//   base: 2, // Mobile: 3 টা
//   sm: 3,
//   md: 4,
//   lg: 6, // Large Screen: 6 টা
// };
// const AUTO_SLIDE_MS = 3500;

// const HomeCategory: React.FC = () => {
//   const { data, isLoading, error } = useGetCategoriesQuery({
//     status: "active",
//     isDeleted: false,
//     limit: 20,
//   });

//   const [perView, setPerView] = useState(PER_VIEW.lg);
//   const [index, setIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Sort by order
//   const categoriesData = React.useMemo(() => {
//     if (!data?.data) return [];
//     return [...data.data]
//       .sort((a, b) => (a.order || 0) - (b.order || 0))
//       .filter((cat) => cat.status === "active" && !cat.isDeleted);
//   }, [data]);

//   const maxIndex = Math.max(0, categoriesData.length - perView);

//   // Responsive items per view
//   useEffect(() => {
//     const updatePerView = () => {
//       const w = window.innerWidth;
//       if (w >= 1024) setPerView(PER_VIEW.lg);
//       else if (w >= 640) setPerView(PER_VIEW.sm);
//       else setPerView(PER_VIEW.base);
//     };
//     updatePerView();
//     window.addEventListener("resize", updatePerView);
//     return () => window.removeEventListener("resize", updatePerView);
//   }, []);

//   useEffect(() => {
//     setIndex((i) => Math.min(i, Math.max(0, categoriesData.length - perView)));
//   }, [perView, categoriesData.length]);

//   const goPrev = () => setIndex((i) => (i === 0 ? maxIndex : i - 1));
//   const goNext = () => setIndex((i) => (i === maxIndex ? 0 : i + 1));

//   // Auto slide
//   useEffect(() => {
//     if (isPaused || categoriesData.length === 0) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i >= maxIndex ? 0 : i + 1));
//     }, AUTO_SLIDE_MS);
//     return () => clearInterval(id);
//   }, [isPaused, maxIndex, categoriesData.length]);

//   const pauseThenResume = () => {
//     setIsPaused(true);
//     if (resumeTimer.current) clearTimeout(resumeTimer.current);
//     resumeTimer.current = setTimeout(
//       () => setIsPaused(false),
//       AUTO_SLIDE_MS * 2,
//     );
//   };

//   useEffect(() => {
//     return () => {
//       if (resumeTimer.current) clearTimeout(resumeTimer.current);
//     };
//   }, []);

//   const handlePrev = () => {
//     goPrev();
//     pauseThenResume();
//   };
//   const handleNext = () => {
//     goNext();
//     pauseThenResume();
//   };
//   const handleDotClick = (i: number) => {
//     setIndex(i);
//     pauseThenResume();
//   };

//   const slideWidthPct = 100 / perView;
//   const dotsCount = maxIndex + 1;

//   if (isLoading) {
//     return (
//       <section className="py-16 text-center">Loading categories...</section>
//     );
//   }

//   if (error || categoriesData.length === 0) {
//     return (
//       <section className="py-16 text-center">Failed to load categories</section>
//     );
//   }

//   return (
//     <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
//       {/* Decorative doodles */}
//       <PaperPlaneDoodle className="pointer-events-none absolute left-0 top-6 hidden h-40 w-56 sm:block" />
//       <FloatingLeafDoodle className="pointer-events-none absolute right-0 top-10 hidden h-32 w-56 sm:block" />

//       <div className="relative mx-auto container">
//         {/* Heading */}
//         <div className="text-center">
//           <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-4 py-1.5 text-xs font-bold tracking-wide text-[var(--color-primary)]">
//             <StarBadgeIcon />
//             EXPLORE &amp; SHOP
//           </span>

//           <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-[2.6rem]">
//             Shop by Category
//           </h2>

//           <p className="mx-auto mt-4 text-sm text-gray-500 sm:text-base">
//             Find everything you need,{" "}
//             <span className="relative inline-block">
//               fresh and fast
//               <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-[var(--color-primary)]" />
//             </span>
//           </p>
//         </div>

//         {/* Carousel */}
//         <div
//           className="relative mt-10"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           {/* Prev / Next Buttons */}
//           <button
//             type="button"
//             onClick={handlePrev}
//             aria-label="Previous"
//             className="absolute -left-3 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-left-5"
//           >
//             <ChevronIcon direction="left" />
//           </button>

//           <button
//             type="button"
//             onClick={handleNext}
//             aria-label="Next"
//             className="absolute -right-3 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-right-5"
//           >
//             <ChevronIcon direction="right" />
//           </button>

//           {/* Sliding Track */}
//           {/* <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-out"
//               style={{ transform: `translateX(-${index * slideWidthPct}%)` }}
//             >
//               {categoriesData.map((cat) => (
//                 <div
//                   key={cat._id}
//                   className="shrink-0 px-2"
//                   style={{ width: `${slideWidthPct}%` }}
//                 >
//                   <CategoryCard item={cat} />
//                 </div>
//               ))}
//             </div>
//           </div> */}
//           {/* Carousel Container */}
//           <div className="relative mt-10">
//             <div className="overflow-hidden">
//               <div
//                 className="flex transition-transform duration-500 ease-out"
//                 style={{ transform: `translateX(-${index * slideWidthPct}%)` }}
//               >
//                 {categoriesData.map((cat) => (
//                   <div
//                     key={cat._id}
//                     className="shrink-0 px-1.5" // ✅ px-2 md:px-3 থেকে px-1.5 করা হয়েছে
//                     style={{ width: `${slideWidthPct}%` }}
//                   >
//                     <CategoryCard item={cat} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Dots */}
//           <div className="mt-6 flex justify-center gap-1.5">
//             {Array.from({ length: dotsCount }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => handleDotClick(i)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   i === index
//                     ? "w-6 bg-[var(--color-primary)]"
//                     : "w-1.5 bg-gray-200"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* View All Button */}
//         <div className="mt-8 text-center">
//           <button
//             type="button"
//             className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 px-6 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-[#eef3e6]"
//           >
//             <GridIcon />
//             View All Categories
//             <ArrowRightIcon size={15} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeCategory;




"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Mousewheel } from "swiper/modules";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import CategoryCard from "../shared/CategoryCard";

// ✅ Dynamic import for Skeleton
import dynamic from "next/dynamic";
const Skeleton = dynamic(() => import("react-loading-skeleton"), {
  ssr: false,
});

// Import styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

/* =========================================================================
   Brand color: --color-primary: #619d23
   ========================================================================= */

/* ---------------------------------------------------------------------------
   Small UI icons
--------------------------------------------------------------------------- */

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
    <rect
      x="4"
      y="4"
      width="7"
      height="7"
      rx="1.5"
      fill="var(--color-primary)"
    />
    <rect
      x="13"
      y="4"
      width="7"
      height="7"
      rx="1.5"
      fill="var(--color-primary)"
    />
    <rect
      x="4"
      y="13"
      width="7"
      height="7"
      rx="1.5"
      fill="var(--color-primary)"
    />
    <rect
      x="13"
      y="13"
      width="7"
      height="7"
      rx="1.5"
      fill="var(--color-primary)"
    />
  </svg>
);

/* ---------------------------------------------------------------------------
   Professional Skeleton Loader
--------------------------------------------------------------------------- */

const SkeletonLoader = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        {/* Image Skeleton */}
        <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        
        {/* Title Skeleton */}
        <div className="mt-3 text-center space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/2 mx-auto animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/* ---------------------------------------------------------------------------
   Main HomeCategory Component
--------------------------------------------------------------------------- */

const HomeCategory: React.FC = () => {
  const { data, isLoading, error } = useGetCategoriesQuery({
    status: "active",
    isDeleted: false,
    limit: 20,
  });

  // Sort by order
  const categoriesData = React.useMemo(() => {
    if (!data?.data) return [];
    return [...data.data]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .filter((cat) => cat.status === "active" && !cat.isDeleted);
  }, [data]);

  // Swiper breakpoints
  const breakpoints = {
    320: {
      slidesPerView: 2,
      grid: { rows: 1, fill: "row" },
      spaceBetween: 12,
    },
    480: {
      slidesPerView: 2,
      grid: { rows: 1, fill: "row" },
      spaceBetween: 14,
    },
    640: {
      slidesPerView: 3,
      grid: { rows: 1, fill: "row" },
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 4,
      grid: { rows: 1, fill: "row" },
      spaceBetween: 18,
    },
    1024: {
      slidesPerView: 6,
      grid: { rows: 1, fill: "row" },
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 6,
      grid: { rows: 1, fill: "row" },
      spaceBetween: 24,
    },
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto container">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-4 py-1.5">
              <span className="text-xs font-bold tracking-wide text-[var(--color-primary)]">
                <StarBadgeIcon /> EXPLORE &amp; SHOP
              </span>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-[2.6rem]">
              Shop by Category
            </h2>
            <p className="mx-auto mt-4 text-sm text-gray-500 sm:text-base">
              Find everything you need, fresh and fast
            </p>
          </div>

          {/* Skeleton Grid */}
          <div className="mt-10">
            <SkeletonLoader />
          </div>
        </div>
      </section>
    );
  }

  if (error || categoriesData.length === 0) {
    return (
      <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto container text-center">
          <p className="text-gray-500">Failed to load categories</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto container overflow-hidden">
        {/* Heading */}
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

        {/* Swiper Carousel - No AutoPlay, No Infinite Loop */}
        <div className="relative mt-10">
          <Swiper
            modules={[Navigation, Grid, Mousewheel]}
            breakpoints={breakpoints}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            mousewheel={{
              sensitivity: 0.5,
              forceToAxis: true,
            }}
            grabCursor={true}
            // ❌ AutoPlay OFF
            // ❌ Loop OFF - No infinite scroll
            loop={false}
            className="!overflow-visible"
          >
            {categoriesData.map((cat) => (
              <SwiperSlide key={cat._id}>
                <CategoryCard item={cat} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            type="button"
            className="swiper-button-prev-custom absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-left-5"
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
            className="swiper-button-next-custom absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-right-5"
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
        </div>

        {/* View All Button */}
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