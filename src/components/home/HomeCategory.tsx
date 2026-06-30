// 'use client';

// import React, { useEffect, useRef, useState } from 'react';

// /* =========================================================================
//    Brand color: --color-primary: #619d23
//    Expects the CSS variable defined globally:
//      :root { --color-primary: #619d23; }
//    ========================================================================= */

// /* ---------------------------------------------------------------------------
//    JSON-style data (swap for an API/CMS response later — shape stays the same)
// --------------------------------------------------------------------------- */

// interface Category {
//   id: string;
//   icon:
//     | 'leaf'
//     | 'apple'
//     | 'wheat'
//     | 'milk'
//     | 'meat'
//     | 'basket'
//     | 'drink'
//     | 'soap'
//     | 'house'
//     | 'baby';
//   title: string;
//   itemCount: string;
//   imageBg: string;
// }

// const categoriesData: Category[] = [
//   { id: 'veg', icon: 'leaf', title: 'Fresh Vegetables', itemCount: '120+ Items', imageBg: '#eef3e6' },
//   { id: 'fruit', icon: 'apple', title: 'Fresh Fruits', itemCount: '80+ Items', imageBg: '#fdf1e3' },
//   { id: 'staples', icon: 'wheat', title: 'Staples & Pulses', itemCount: '150+ Items', imageBg: '#f6f1e3' },
//   { id: 'dairy', icon: 'milk', title: 'Dairy & Eggs', itemCount: '60+ Items', imageBg: '#eef6f6' },
//   { id: 'meat', icon: 'meat', title: 'Meat, Fish & Eggs', itemCount: '50+ Items', imageBg: '#fbeae8' },
//   { id: 'packaged', icon: 'basket', title: 'Packaged Foods', itemCount: '200+ Items', imageBg: '#fdf2e1' },
//   { id: 'beverages', icon: 'drink', title: 'Beverages', itemCount: '100+ Items', imageBg: '#eaf2fb' },
//   { id: 'personal', icon: 'soap', title: 'Personal Care', itemCount: '120+ Items', imageBg: '#f1eefb' },
//   { id: 'household', icon: 'house', title: 'Household Care', itemCount: '100+ Items', imageBg: '#eaf3ec' },
//   { id: 'baby', icon: 'baby', title: 'Baby Care', itemCount: '80+ Items', imageBg: '#fbeef3' },
// ];

// /* ---------------------------------------------------------------------------
//    Decorative doodles (paper plane + dashed trail, floating leaf + dashed trail)
// --------------------------------------------------------------------------- */

// const PaperPlaneDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
//   <svg viewBox="0 0 220 160" className={className} fill="none" aria-hidden>
//     <path
//       d="M8 140C30 110 55 130 70 110C82 94 65 80 78 70"
//       stroke="#bcd9a8"
//       strokeWidth="2"
//       strokeDasharray="2 8"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <circle cx="78" cy="55" r="13" stroke="#bcd9a8" strokeWidth="2" fill="none" strokeDasharray="2 7" />
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

// const FloatingLeafDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
//   <svg viewBox="0 0 220 140" className={className} fill="none" aria-hidden>
//     <g transform="translate(10,10)">
//       <path
//         d="M28 0C20 10 18 24 28 38C38 24 36 10 28 0Z"
//         fill="none"
//         stroke="#8fbf78"
//         strokeWidth="2"
//       />
//       <path d="M28 6V34" stroke="#8fbf78" strokeWidth="1.6" strokeLinecap="round" />
//       <path d="M28 16 18 24M28 24 36 30" stroke="#8fbf78" strokeWidth="1.4" strokeLinecap="round" />
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
//    Category badge icons (small circular icon on each card)
// --------------------------------------------------------------------------- */

// const LeafBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 21c-5-1-8-5-8-10 0-2 .4-3.6 1-5 4 0 9 2 11 6 1.3 2.6 1 6-1 9-1 .8-2 .8-3 0Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.7"
//       strokeLinejoin="round"
//     />
//     <path d="M5 6c5 1 9 5 10 11" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
//   </svg>
// );

// const AppleBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 8c-3.3 0-6 2.5-6 6.3 0 4 3 7.2 5.3 7.2.7 0 1.2-.3 1.7-.3s1 .3 1.7.3C17 21.5 20 18.3 20 14.3 20 10.5 17.3 8 14 8c-.7 0-1.3.2-2 .5-.7-.3-1.3-.5-2-.5Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.6"
//       strokeLinejoin="round"
//     />
//     <path d="M12 8c0-2 .8-3.6 2.4-4.6" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
//   </svg>
// );

// const WheatBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path d="M12 21V6" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
//     <path
//       d="M12 7c-1.8 0-3-1.2-3-3 1.8 0 3 1.2 3 3ZM12 7c1.8 0 3-1.2 3-3-1.8 0-3 1.2-3 3Z"
//       fill="var(--color-primary)"
//     />
//     <path
//       d="M12 11c-1.8 0-3-1.2-3-3 1.8 0 3 1.2 3 3ZM12 11c1.8 0 3-1.2 3-3-1.8 0-3 1.2-3 3Z"
//       fill="var(--color-primary)"
//     />
//     <path
//       d="M12 15c-1.8 0-3-1.2-3-3 1.8 0 3 1.2 3 3ZM12 15c1.8 0 3-1.2 3-3-1.8 0-3 1.2-3 3Z"
//       fill="var(--color-primary)"
//     />
//   </svg>
// );

// const MilkBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M9.5 3h5l.5 3-1.5 2v11.5a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V8L8 6l.5-3Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.6"
//       strokeLinejoin="round"
//     />
//     <path d="M8.6 12h6.8" stroke="var(--color-primary)" strokeWidth="1.4" />
//   </svg>
// );

// const MeatBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M16 3c-3 0-6 2.5-7.5 6C7 12.5 4 14 4 17a4 4 0 0 0 7 2.6c2.7-2.3 4-5 6-8.6 1.4-2.5 1.8-5-1-8Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.6"
//       strokeLinejoin="round"
//     />
//     <circle cx="8" cy="16" r="1.3" fill="var(--color-primary)" />
//   </svg>
// );

// const BasketBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path d="M4 10h16l-1.4 8.5A2 2 0 0 1 16.6 20H7.4a2 2 0 0 1-2-1.5L4 10Z" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinejoin="round" />
//     <path d="M8 10 9.4 5M16 10 14.6 5M11 10V6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
//   </svg>
// );

// const DrinkBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path d="M7 8h10l-1.2 11.5a1.5 1.5 0 0 1-1.5 1.3h-4.6a1.5 1.5 0 0 1-1.5-1.3L7 8Z" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinejoin="round" />
//     <path d="M6.5 8h11" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
//     <path d="M9.5 12h5" stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round" />
//   </svg>
// );

// const SoapBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <rect x="7" y="9" width="10" height="12" rx="2" stroke="var(--color-primary)" strokeWidth="1.6" />
//     <path d="M10 9V6.5a2 2 0 0 1 4 0V9" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
//     <circle cx="12" cy="4" r="1.1" fill="var(--color-primary)" />
//   </svg>
// );

// const HouseBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8.5Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.6"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const BabyBadge = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="13" r="7" stroke="var(--color-primary)" strokeWidth="1.6" />
//     <circle cx="9.3" cy="12" r="0.9" fill="var(--color-primary)" />
//     <circle cx="14.7" cy="12" r="0.9" fill="var(--color-primary)" />
//     <path d="M9.5 15.5c.8.8 1.7 1.2 2.5 1.2s1.7-.4 2.5-1.2" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
//     <path d="M12 6V4M10 4.5c.5-1 1.5-1 2 0" stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round" />
//   </svg>
// );

// const renderCategoryIcon = (icon: Category['icon']) => {
//   switch (icon) {
//     case 'leaf':
//       return <LeafBadge />;
//     case 'apple':
//       return <AppleBadge />;
//     case 'wheat':
//       return <WheatBadge />;
//     case 'milk':
//       return <MilkBadge />;
//     case 'meat':
//       return <MeatBadge />;
//     case 'basket':
//       return <BasketBadge />;
//     case 'drink':
//       return <DrinkBadge />;
//     case 'soap':
//       return <SoapBadge />;
//     case 'house':
//       return <HouseBadge />;
//     case 'baby':
//       return <BabyBadge />;
//   }
// };

// /* ---------------------------------------------------------------------------
//    Category illustration (clean SVG art used in place of stock photography)
// --------------------------------------------------------------------------- */

// const CategoryIllustration: React.FC<{ icon: Category['icon'] }> = ({ icon }) => {
//   switch (icon) {
//     case 'leaf':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <ellipse cx="50" cy="70" rx="30" ry="9" fill="#c89b5c" />
//           <path d="M22 70 L26 50 L74 50 L78 70Z" fill="#d6a86a" />
//           <path d="M30 50c-3-14 4-20 20-20s23 6 20 20" fill="none" stroke="#b9854a" strokeWidth="2" />
//           <circle cx="38" cy="42" r="9" fill="#4c9a3a" />
//           <circle cx="50" cy="36" r="11" fill="#5fb247" />
//           <circle cx="63" cy="42" r="9" fill="#4c9a3a" />
//           <circle cx="45" cy="46" r="7" fill="#e0413a" />
//           <circle cx="56" cy="46" r="7" fill="#e8c93a" />
//         </svg>
//       );
//     case 'apple':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <ellipse cx="50" cy="72" rx="28" ry="8" fill="#c89b5c" opacity="0.4" />
//           <circle cx="38" cy="55" r="14" fill="#d6453a" />
//           <circle cx="56" cy="50" r="17" fill="#e8c93a" />
//           <circle cx="68" cy="58" r="11" fill="#cc3a3a" />
//           <circle cx="46" cy="62" r="10" fill="#7fb43e" />
//           <path d="M50 33c2-4 6-6 9-5" fill="none" stroke="#4c8a2a" strokeWidth="2" strokeLinecap="round" />
//         </svg>
//       );
//     case 'wheat':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <rect x="18" y="48" width="34" height="30" rx="3" fill="#c9a36a" />
//           <path d="M18 48 34 30 52 48Z" fill="#b9874e" />
//           <rect x="56" y="62" width="22" height="16" rx="2" fill="#e8c93a" />
//           <rect x="56" y="40" width="14" height="22" rx="2" fill="#e3b23a" />
//           <circle cx="63" cy="46" r="2" fill="#fff" opacity="0.5" />
//         </svg>
//       );
//     case 'milk':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <rect x="40" y="20" width="14" height="55" rx="3" fill="#f2f2f2" stroke="#d8d8d8" />
//           <rect x="38" y="14" width="18" height="8" rx="2" fill="#9fc97f" />
//           <circle cx="68" cy="55" r="16" fill="#e8d28a" />
//           <rect x="60" y="62" width="16" height="14" rx="2" fill="#fff" stroke="#ddd" />
//           <ellipse cx="30" cy="68" rx="14" ry="10" fill="#fff" stroke="#ddd" />
//         </svg>
//       );
//     case 'meat':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <ellipse cx="50" cy="65" rx="32" ry="8" fill="#c9a36a" opacity="0.5" />
//           <path
//             d="M30 60c-4-10 2-22 14-26 12-4 22 4 22 14 0 12-12 20-22 22-8 1.6-12-4-14-10Z"
//             fill="#d9605a"
//           />
//           <path d="M34 38c10-2 18 4 18 14" stroke="#f0a8a0" strokeWidth="2" fill="none" />
//           <path d="M58 30 70 22 76 30 64 40Z" fill="#c0c0c0" />
//         </svg>
//       );
//     case 'basket':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <rect x="28" y="42" width="44" height="32" rx="4" fill="#e8c93a" />
//           <rect x="28" y="42" width="44" height="10" fill="#d9453a" />
//           <rect x="34" y="56" width="32" height="6" fill="#fff" opacity="0.4" />
//           <rect x="70" y="48" width="12" height="22" rx="3" fill="#5fa6c9" />
//           <circle cx="76" cy="44" r="5" fill="#cc3a3a" />
//         </svg>
//       );
//     case 'drink':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <path d="M34 30h16l-3 46a4 4 0 0 1-4 3.6h-2a4 4 0 0 1-4-3.6Z" fill="#5fa6c9" />
//           <rect x="32" y="26" width="20" height="6" rx="2" fill="#3f7ea1" />
//           <path d="M58 36h18l-2.6 32a3.6 3.6 0 0 1-3.6 3.3h-5.6a3.6 3.6 0 0 1-3.6-3.3Z" fill="#e3853a" />
//         </svg>
//       );
//     case 'soap':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <rect x="22" y="34" width="18" height="42" rx="4" fill="#cfd6e8" />
//           <rect x="26" y="26" width="10" height="10" rx="2" fill="#8a93b8" />
//           <rect x="46" y="40" width="16" height="36" rx="4" fill="#1f1f1f" />
//           <rect x="49" y="32" width="10" height="10" rx="2" fill="#444" />
//           <rect x="68" y="46" width="14" height="30" rx="4" fill="#cfc7e8" />
//         </svg>
//       );
//     case 'house':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <rect x="24" y="40" width="18" height="36" fill="#5fa6c9" />
//           <rect x="46" y="46" width="14" height="30" rx="2" fill="#e8c93a" />
//           <rect x="64" y="36" width="20" height="40" rx="2" fill="#5fb247" />
//           <rect x="70" y="44" width="4" height="6" fill="#fff" opacity="0.6" />
//         </svg>
//       );
//     case 'baby':
//       return (
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <rect x="26" y="34" width="22" height="42" rx="4" fill="#5fb6c9" />
//           <rect x="50" y="40" width="20" height="36" rx="4" fill="#cfc7e8" />
//           <circle cx="76" cy="64" r="12" fill="#e8c93a" />
//           <path d="M70 60c2-3 6-3 8 0" stroke="#b9954a" strokeWidth="2" fill="none" />
//         </svg>
//       );
//   }
// };

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

// const ChevronIcon: React.FC<{ direction?: 'left' | 'right' }> = ({ direction = 'right' }) => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     style={{ transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
//   >
//     <path d="M9 5l7 7-7 7" stroke="#1a3c1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const GridIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <rect x="4" y="4" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
//     <rect x="13" y="4" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
//     <rect x="4" y="13" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
//     <rect x="13" y="13" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
//   </svg>
// );

// /* ---------------------------------------------------------------------------
//    Category card
// --------------------------------------------------------------------------- */

// const CategoryCard: React.FC<{ item: Category }> = ({ item }) => (
//   <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
//     <div
//       className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full sm:h-36 sm:w-36"
//       style={{ backgroundColor: item.imageBg }}
//     >
//       <div className="h-20 w-20 sm:h-24 sm:w-24">
//         <CategoryIllustration icon={item.icon} />
//       </div>
//       <span className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
//         {renderCategoryIcon(item.icon)}
//       </span>
//     </div>

//     <h3 className="mt-4 text-center text-base font-bold text-gray-900">{item.title}</h3>
//     <p className="mt-1 text-center text-sm text-gray-500">{item.itemCount}</p>

//     <div className="mt-3 flex justify-center">
//       <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3e6] transition group-hover:bg-[var(--color-primary)]">
//         <ArrowRightIcon />
//       </span>
//     </div>
//   </div>
// );

// /* ---------------------------------------------------------------------------
//    Main component — JSON-driven, one-at-a-time swiper carousel
// --------------------------------------------------------------------------- */

// const PER_VIEW = { base: 1, sm: 2, lg: 5 };
// const AUTO_SLIDE_MS = 3500;

// const HomeCategory: React.FC = () => {
//   const [perView, setPerView] = useState(PER_VIEW.lg);
//   const [index, setIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const maxIndex = Math.max(0, categoriesData.length - perView);

//   // responsive items-per-view, like a swiper breakpoints config
//   useEffect(() => {
//     const updatePerView = () => {
//       const w = window.innerWidth;
//       if (w >= 1024) setPerView(PER_VIEW.lg);
//       else if (w >= 640) setPerView(PER_VIEW.sm);
//       else setPerView(PER_VIEW.base);
//     };
//     updatePerView();
//     window.addEventListener('resize', updatePerView);
//     return () => window.removeEventListener('resize', updatePerView);
//   }, []);

//   // clamp index whenever perView (breakpoint) changes
//   useEffect(() => {
//     setIndex((i) => Math.min(i, Math.max(0, categoriesData.length - perView)));
//   }, [perView]);

//   const goPrev = () => setIndex((i) => (i === 0 ? maxIndex : i - 1));
//   const goNext = () => setIndex((i) => (i === maxIndex ? 0 : i + 1));

//   // auto-advance one card at a time
//   useEffect(() => {
//     if (isPaused) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i >= maxIndex ? 0 : i + 1));
//     }, AUTO_SLIDE_MS);
//     return () => clearInterval(id);
//   }, [isPaused, maxIndex]);

//   const pauseThenResume = () => {
//     setIsPaused(true);
//     if (resumeTimer.current) clearTimeout(resumeTimer.current);
//     resumeTimer.current = setTimeout(() => setIsPaused(false), AUTO_SLIDE_MS * 2);
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

//   return (
//     <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
//       {/* decorative doodles */}
//       <PaperPlaneDoodle className="pointer-events-none absolute left-0 top-6 hidden h-40 w-56 sm:block" />
//       <FloatingLeafDoodle className="pointer-events-none absolute right-0 top-10 hidden h-32 w-56 sm:block" />

//       <div className="relative mx-auto container    ">
//         {/* ---------- heading ---------- */}
//         <div className="text-center">
//           <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-4 py-1.5 text-xs font-bold tracking-wide text-[var(--color-primary)]">
//             <StarBadgeIcon />
//             EXPLORE &amp; SHOP
//           </span>

//           <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-[2.6rem]">
//             Shop by Category
//           </h2>

//           <p className="mx-auto mt-4 text-sm text-gray-500 sm:text-base">
//             Find everything you need,{' '}
//             <span className="relative inline-block">
//               fresh and fast
//               <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-[var(--color-primary)]" />
//             </span>
//           </p>
//         </div>

//         {/* ---------- swiper carousel ---------- */}
//         <div
//           className="relative mt-10"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           {/* prev / next controls */}
//           <button
//             type="button"
//             onClick={handlePrev}
//             aria-label="Previous categories"
//             className="absolute -left-3 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-left-5"
//           >
//             <ChevronIcon direction="left" />
//           </button>
//           <button
//             type="button"
//             onClick={handleNext}
//             aria-label="Next categories"
//             className="absolute -right-3 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-right-5"
//           >
//             <ChevronIcon direction="right" />
//           </button>

//           {/* sliding track: moves one card at a time */}
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-out"
//               style={{ transform: `translateX(-${index * slideWidthPct}%)` }}
//             >
//               {categoriesData.map((cat) => (
//                 <div
//                   key={cat.id}
//                   className="shrink-0 px-2"
//                   style={{ width: `${slideWidthPct}%` }}
//                 >
//                   <CategoryCard item={cat} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* dots */}
//           <div className="mt-6 flex justify-center gap-1.5">
//             {Array.from({ length: dotsCount }).map((_, i) => (
//               <button
//                 key={i}
//                 aria-label={`Go to slide ${i + 1}`}
//                 onClick={() => handleDotClick(i)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   i === index ? 'w-6 bg-[var(--color-primary)]' : 'w-1.5 bg-gray-200'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ---------- view all categories ---------- */}
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



'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGetCategoriesQuery } from '@/redux/api/categoryApi'; // আপনার প্রজেক্টের অনুযায়ী পাথ চেঞ্জ করুন
import CategoryCard from '../shared/CategoryCard';
// import CategoryCard from './CategoryCard';

/* =========================================================================
   Brand color: --color-primary: #619d23
   ========================================================================= */

/* ---------------------------------------------------------------------------
   Decorative doodles
--------------------------------------------------------------------------- */

const PaperPlaneDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 220 160" className={className} fill="none" aria-hidden>
    <path
      d="M8 140C30 110 55 130 70 110C82 94 65 80 78 70"
      stroke="#bcd9a8"
      strokeWidth="2"
      strokeDasharray="2 8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="78" cy="55" r="13" stroke="#bcd9a8" strokeWidth="2" fill="none" strokeDasharray="2 7" />
    <path
      d="M85 60C95 50 130 40 150 8 C130 30 105 40 90 45"
      stroke="#bcd9a8"
      strokeWidth="2"
      strokeDasharray="2 8"
      fill="none"
      strokeLinecap="round"
    />
    <g transform="translate(140,10)">
      <path
        d="M0 38 L62 0 L34 22 L40 38 L26 28 Z"
        fill="none"
        stroke="#8fbf78"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const FloatingLeafDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 220 140" className={className} fill="none" aria-hidden>
    <g transform="translate(10,10)">
      <path
        d="M28 0C20 10 18 24 28 38C38 24 36 10 28 0Z"
        fill="none"
        stroke="#8fbf78"
        strokeWidth="2"
      />
      <path d="M28 6V34" stroke="#8fbf78" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M28 16 18 24M28 24 36 30" stroke="#8fbf78" strokeWidth="1.4" strokeLinecap="round" />
    </g>
    <path
      d="M40 55C70 45 95 65 130 58 S 180 70 200 50"
      stroke="#bcd9a8"
      strokeWidth="2"
      strokeDasharray="2 8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

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

const ChevronIcon: React.FC<{ direction?: 'left' | 'right' }> = ({ direction = 'right' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    style={{ transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
  >
    <path d="M9 5l7 7-7 7" stroke="#1a3c1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
   Main HomeCategory Component
--------------------------------------------------------------------------- */

const PER_VIEW = { base: 1, sm: 2, lg: 5 };
const AUTO_SLIDE_MS = 3500;

const HomeCategory: React.FC = () => {
  const { data, isLoading, error } = useGetCategoriesQuery({
    status: 'active',
    isDeleted: false,
    limit: 20,
  });

  const [perView, setPerView] = useState(PER_VIEW.lg);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sort by order
  const categoriesData = React.useMemo(() => {
    if (!data?.data) return [];
    return [...data.data]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .filter(cat => cat.status === 'active' && !cat.isDeleted);
  }, [data]);

  const maxIndex = Math.max(0, categoriesData.length - perView);

  // Responsive items per view
  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) setPerView(PER_VIEW.lg);
      else if (w >= 640) setPerView(PER_VIEW.sm);
      else setPerView(PER_VIEW.base);
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, categoriesData.length - perView)));
  }, [perView, categoriesData.length]);

  const goPrev = () => setIndex((i) => (i === 0 ? maxIndex : i - 1));
  const goNext = () => setIndex((i) => (i === maxIndex ? 0 : i + 1));

  // Auto slide
  useEffect(() => {
    if (isPaused || categoriesData.length === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [isPaused, maxIndex, categoriesData.length]);

  const pauseThenResume = () => {
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), AUTO_SLIDE_MS * 2);
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const handlePrev = () => {
    goPrev();
    pauseThenResume();
  };
  const handleNext = () => {
    goNext();
    pauseThenResume();
  };
  const handleDotClick = (i: number) => {
    setIndex(i);
    pauseThenResume();
  };

  const slideWidthPct = 100 / perView;
  const dotsCount = maxIndex + 1;

  if (isLoading) {
    return <section className="py-16 text-center">Loading categories...</section>;
  }

  if (error || categoriesData.length === 0) {
    return <section className="py-16 text-center">Failed to load categories</section>;
  }

  return (
    <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
      {/* Decorative doodles */}
      <PaperPlaneDoodle className="pointer-events-none absolute left-0 top-6 hidden h-40 w-56 sm:block" />
      <FloatingLeafDoodle className="pointer-events-none absolute right-0 top-10 hidden h-32 w-56 sm:block" />

      <div className="relative mx-auto container">
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
            Find everything you need,{' '}
            <span className="relative inline-block">
              fresh and fast
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-[var(--color-primary)]" />
            </span>
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev / Next Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute -left-3 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-left-5"
          >
            <ChevronIcon direction="left" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next"
            className="absolute -right-3 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition hover:bg-gray-50 lg:-right-5"
          >
            <ChevronIcon direction="right" />
          </button>

          {/* Sliding Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * slideWidthPct}%)` }}
            >
              {categoriesData.map((cat) => (
                <div
                  key={cat._id}
                  className="shrink-0 px-2"
                  style={{ width: `${slideWidthPct}%` }}
                >
                  <CategoryCard item={cat} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: dotsCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-[var(--color-primary)]' : 'w-1.5 bg-gray-200'
                }`}
              />
            ))}
          </div>
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