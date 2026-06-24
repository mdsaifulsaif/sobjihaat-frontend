// // // 'use client';

// // // import React from 'react';
// // // import Image from 'next/image';

// // // interface DeliveryTier {
// // //   id: number;
// // //   area: string;
// // //   charge: string;
// // //   freeAbove: string;
// // // }

// // // const barisalDeliveryData: DeliveryTier[] = [
// // //   { id: 1, area: "Rupatoli", charge: "৳30", freeAbove: "৳500" },
// // //   { id: 2, area: "Nahullabad", charge: "৳30", freeAbove: "৳500" },
// // //   { id: 3, area: "Amtala", charge: "৳40", freeAbove: "৳800" },
// // //   { id: 4, area: "Sadar Road", charge: "৳40", freeAbove: "৳800" },
// // //   { id: 5, area: "Bishwa Road", charge: "৳50", freeAbove: "৳1000" },
// // // ];

// // // const DeliveryCharges: React.FC = () => {
// // //   return (
// // //     <section className="py-16 bg-[#fefefe]">
// // //       <div className="container mx-auto px-4">
// // //         <div className="max-w-6xl mx-auto">
// // //           <div className="flex flex-col lg:flex-row items-center gap-12">
            
// // //             {/* Left Content - Table */}
// // //             <div className="lg:w-[60%] w-full">
// // //               <div className="mb-8">
// // //                 <h2 className="text-4xl font-semibold text-[var(--color-text-primary)] mb-3">
// // //                   Delivery Charges
// // //                 </h2>
// // //                 <p className="text-[var(--color-text-secondary)] text-lg">
// // //                   Affordable delivery across Barishal & beyond
// // //                 </p>
// // //               </div>

// // //               <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
// // //                 <table className="w-full">
// // //                   <thead>
// // //                     <tr className="border-b border-gray-100 bg-gray-50/50">
// // //                       <th className="px-8 py-5 text-left text-gray-700 font-semibold">Service Area</th>
// // //                       <th className="px-8 py-5 text-left text-gray-700 font-semibold">Delivery Charge</th>
// // //                       <th className="px-8 py-5 text-left text-gray-700 font-semibold">Free Delivery Above</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody className="divide-y divide-gray-100">
// // //                     {barisalDeliveryData.map((tier) => (
// // //                       <tr key={tier.id} className="hover:bg-gray-50 transition-colors">
// // //                         <td className="px-8 py-5 font-medium text-gray-700">{tier.area}</td>
// // //                         <td className="px-8 py-5 text-gray-600">{tier.charge}</td>
// // //                         <td className="px-8 py-5 text-gray-600">{tier.freeAbove}</td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //             </div>

// // //             {/* Right Side - Image */}
// // //             <div className="lg:w-[40%] w-full flex justify-center lg:justify-end">
// // //               <div className="relative">
// // //                 <Image
// // //                   src="/biked.png"
// // //                   alt="Fast Delivery"
// // //                   width={420}
// // //                   height={420}
// // //                   className="drop-shadow-2xl"
// // //                 />
// // //               </div>
// // //             </div>

// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default DeliveryCharges;


// // 'use client';

// // import React from 'react';
// // import Image from 'next/image';

// // interface DeliveryTier {
// //   id: number;
// //   icon: 'city' | 'pin' | 'road' | 'signpost';
// //   area: string;
// //   desc: string;
// //   charge: string;
// //   freeAbove: string;
// // }

// // const barisalDeliveryData: DeliveryTier[] = [
// //   {
// //     id: 1,
// //     icon: 'city',
// //     area: 'Barisal City',
// //     desc: 'All areas inside Barisal City',
// //     charge: '৳60',
// //     freeAbove: '৳599',
// //   },
// //   {
// //     id: 2,
// //     icon: 'pin',
// //     area: 'Nearby Areas',
// //     desc: 'Within 10 KM from Barisal City',
// //     charge: '৳120',
// //     freeAbove: '৳999',
// //   },
// //   {
// //     id: 3,
// //     icon: 'road',
// //     area: 'Suburban Areas',
// //     desc: '10 – 20 KM from Barisal City',
// //     charge: '৳150',
// //     freeAbove: '৳1,499',
// //   },
// //   {
// //     id: 4,
// //     icon: 'signpost',
// //     area: 'Remote Areas',
// //     desc: '20 KM+ from Barisal City',
// //     charge: '৳200',
// //     freeAbove: '৳1,999',
// //   },
// // ];

// // /* ---------- small inline icon set (kept dependency-free) ---------- */

// // const IconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
// //   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7f5e8]">
// //     {children}
// //   </div>
// // );

// // const CityIcon = () => (
// //   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M4 21V8l5-3v3l5-3v16M4 21h16M9 21v-4h2v4M14 21v-4h2v4M7 12h.01M7 16h.01M12 16h.01M17 12h.01M17 16h.01"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // );

// // const PinIcon = () => (
// //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinejoin="round"
// //     />
// //     <circle cx="12" cy="9" r="2.4" stroke="#2f9e44" strokeWidth="1.6" />
// //   </svg>
// // );

// // const RoadIcon = () => (
// //   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M8 21 11 3h2l3 18M9.5 13h5"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // );

// // const SignpostIcon = () => (
// //   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M12 3v18M5 7h6l-1.5 2.5L11 12H5V7ZM12 9h7v3h-7"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // );

// // const renderTierIcon = (icon: DeliveryTier['icon']) => {
// //   switch (icon) {
// //     case 'city':
// //       return <CityIcon />;
// //     case 'pin':
// //       return <PinIcon />;
// //     case 'road':
// //       return <RoadIcon />;
// //     case 'signpost':
// //       return <SignpostIcon />;
// //   }
// // };

// // /* ---------- header feature cards ---------- */

// // const TruckIcon = () => (
// //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M3 16V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10M3 16h11M3 16a2 2 0 1 0 4 0M14 16a2 2 0 1 0 4 0M14 9h4l3 3v4h-3M14 9v7"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // );

// // const ShieldIcon = () => (
// //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinejoin="round"
// //     />
// //     <path
// //       d="M9 12l2 2 4-4"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // );

// // const LocationIcon = () => (
// //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
// //       stroke="#2f9e44"
// //       strokeWidth="1.6"
// //       strokeLinejoin="round"
// //     />
// //     <circle cx="12" cy="9" r="2.4" stroke="#2f9e44" strokeWidth="1.6" />
// //   </svg>
// // );

// // const features = [
// //   {
// //     icon: <TruckIcon />,
// //     title: 'Fast Delivery',
// //     desc: 'On-time delivery you can trust',
// //   },
// //   {
// //     icon: <ShieldIcon />,
// //     title: 'Safe Checkout',
// //     desc: 'Your order is safe with us',
// //   },
// //   {
// //     icon: <LocationIcon />,
// //     title: 'Live Tracking',
// //     desc: 'Track your order in real-time',
// //   },
// // ];

// // /* ---------- table header icons (small circular badges in green bar) ---------- */

// // const HeaderPinIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
// //     <path
// //       d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
// //       stroke="#fff"
// //       strokeWidth="2"
// //       strokeLinejoin="round"
// //     />
// //     <circle cx="12" cy="9" r="2.4" stroke="#fff" strokeWidth="2" />
// //   </svg>
// // );

// // const HeaderCoinIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
// //     <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2" />
// //     <path d="M12 7v10M9.5 9.2c0-1 1-1.7 2.5-1.7s2.5.6 2.5 1.6c0 2.2-5 1-5 3.2 0 1 1 1.7 2.5 1.7s2.5-.7 2.5-1.7" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
// //   </svg>
// // );

// // const HeaderGiftIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
// //     <rect x="4" y="9" width="16" height="11" rx="1" stroke="#fff" strokeWidth="2" />
// //     <path d="M4 9h16M12 9v11M12 9c-1.8 0-4-1-4-3a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 2-2.2 3-4 3Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
// //   </svg>
// // );

// // /* ---------- right side: rider + map-style dotted connectors ---------- */

// // const RiderMapPanel: React.FC = () => {
// //   return (
// //     <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#fafdf9] p-6">
// //       {/* SVG map layer: dotted lines connecting pin markers, sitting behind the rider image */}
// //       <svg
// //         viewBox="0 0 360 420"
// //         className="absolute inset-0 h-full w-full"
// //         preserveAspectRatio="xMidYMid slice"
// //       >
// //         {/* faint route lines */}
// //         <path
// //           d="M40 130 C 90 110, 140 150, 190 120 S 280 70, 330 90"
// //           fill="none"
// //           stroke="#bfe3c3"
// //           strokeWidth="2"
// //           strokeDasharray="2 7"
// //           strokeLinecap="round"
// //         />
// //         <path
// //           d="M30 150 C 70 200, 60 260, 110 300"
// //           fill="none"
// //           stroke="#bfe3c3"
// //           strokeWidth="2"
// //           strokeDasharray="2 7"
// //           strokeLinecap="round"
// //         />
// //         <path
// //           d="M300 110 C 320 170, 290 230, 310 290"
// //           fill="none"
// //           stroke="#bfe3c3"
// //           strokeWidth="2"
// //           strokeDasharray="2 7"
// //           strokeLinecap="round"
// //         />

// //         {/* faint background glyphs: cloud + building, decorative */}
// //         <g opacity="0.5" fill="#dff0e0">
// //           <ellipse cx="80" cy="70" rx="26" ry="14" />
// //           <ellipse cx="100" cy="62" rx="18" ry="12" />
// //           <rect x="270" y="180" width="40" height="60" rx="3" />
// //           <rect x="277" y="190" width="8" height="8" />
// //           <rect x="295" y="190" width="8" height="8" />
// //           <rect x="277" y="206" width="8" height="8" />
// //           <rect x="295" y="206" width="8" height="8" />
// //         </g>

// //         {/* map pins: outlined waypoints + the rider's solid current-location pin */}
// //         <g transform="translate(34,118)" stroke="#3fae4a" strokeWidth="2" fill="none">
// //           <path d="M0 22C0 9 7 0 14 0s14 9 14 22c0 14-14 26-14 26S0 36 0 22Z" />
// //           <circle cx="14" cy="21" r="5" />
// //         </g>
// //         <g transform="translate(296,80)" stroke="#3fae4a" strokeWidth="2" fill="none">
// //           <path d="M0 18C0 7 6 0 12 0s12 7 12 18c0 11-12 21-12 21S0 29 0 18Z" />
// //           <circle cx="12" cy="17" r="4" />
// //         </g>
// //         <g transform="translate(296,272)" stroke="#3fae4a" strokeWidth="2" fill="none">
// //           <path d="M0 18C0 7 6 0 12 0s12 7 12 18c0 11-12 21-12 21S0 29 0 18Z" />
// //           <circle cx="12" cy="17" r="4" />
// //         </g>

// //         {/* scattered leaf marks, decorative texture like reference */}
// //         <g fill="#cfe9d1">
// //           <ellipse cx="55" cy="330" rx="9" ry="5" transform="rotate(20 55 330)" />
// //           <ellipse cx="35" cy="360" rx="9" ry="5" transform="rotate(-10 35 360)" />
// //           <ellipse cx="330" cy="330" rx="9" ry="5" transform="rotate(-20 330 330)" />
// //         </g>
// //       </svg>

// //       {/* rider illustration */}
// //       <div className="relative z-10 flex h-full items-end justify-center">
// //         <Image
// //           src="/bike1.png"
// //           alt="Delivery rider on a green scooter"
// //           width={340}
// //           height={360}
// //           className="select-none drop-shadow-xl"
// //           priority
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // /* ---------- main component ---------- */

// // const DeliveryCharges: React.FC = () => {
// //   return (
// //     <section className="bg-[#f8faf8] px-4 py-12 sm:px-8">
// //       <div className="mx-auto max-w-6xl">
// //         {/* top row: heading + feature cards */}
// //         <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
// //           <div>
// //             <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e7f5e8] px-4 py-1.5 text-xs font-bold tracking-wide text-[#2f9e44]">
// //               <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
// //                 <path
// //                   d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z"
// //                   stroke="#2f9e44"
// //                   strokeWidth="2"
// //                   strokeLinejoin="round"
// //                 />
// //                 <path d="M9 12l2 2 4-4" stroke="#2f9e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// //               </svg>
// //               FAST, SAFE &amp; RELIABLE
// //             </span>
// //             <h2 className="text-5xl font-extrabold leading-tight text-gray-900">
// //               Delivery Charges
// //             </h2>
// //             <p className="mt-3 text-lg text-gray-500">
// //               Affordable delivery across Barisal City &amp; beyond
// //             </p>
// //           </div>

// //           <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto">
// //             {features.map((f) => (
// //               <div
// //                 key={f.title}
// //                 className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm lg:w-[210px]"
// //               >
// //                 <IconWrap>{f.icon}</IconWrap>
// //                 <div>
// //                   <p className="text-sm font-bold text-gray-900">{f.title}</p>
// //                   <p className="text-xs leading-snug text-gray-500">{f.desc}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* main row: table + rider panel */}
// //         <div className="flex flex-col gap-6 lg:flex-row">
// //           {/* table card */}
// //           <div className="flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
// //             {/* green header bar */}
// //             <div className="grid grid-cols-3 bg-gradient-to-r from-[#3fae4a] to-[#2f9e44] px-8 py-4 text-sm font-semibold text-white">
// //               <div className="flex items-center gap-2">
// //                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
// //                   <HeaderPinIcon />
// //                 </span>
// //                 Delivery Area
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
// //                   <HeaderCoinIcon />
// //                 </span>
// //                 Delivery Charge
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
// //                   <HeaderGiftIcon />
// //                 </span>
// //                 Free Delivery Above
// //               </div>
// //             </div>

// //             {/* rows */}
// //             <div className="divide-y divide-gray-100">
// //               {barisalDeliveryData.map((tier) => (
// //                 <div key={tier.id} className="grid grid-cols-3 items-center px-8 py-6">
// //                   <div className="flex items-center gap-4">
// //                     <IconWrap>{renderTierIcon(tier.icon)}</IconWrap>
// //                     <div>
// //                       <p className="font-bold text-gray-900">{tier.area}</p>
// //                       <p className="text-sm text-gray-500">{tier.desc}</p>
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <p className="text-2xl font-bold text-gray-900">{tier.charge}</p>
// //                     <p className="text-sm text-gray-400">Per Order</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-2xl font-bold text-[#2f9e44]">{tier.freeAbove}</p>
// //                     <p className="text-sm text-gray-400">Minimum Order</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* right rider + map panel */}
// //           <div className="flex w-full flex-col lg:w-[340px]">
// //             <div className="flex-1 rounded-2xl bg-[#fafdf9]">
// //               <RiderMapPanel />
// //             </div>
// //             <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#eef8ee] px-5 py-4">
// //               <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2f9e44]">
// //                 <HeaderGiftIcon />
// //               </span>
// //               <div>
// //                 <p className="font-bold text-gray-900">Free Delivery</p>
// //                 <p className="text-sm text-gray-500">
// //                   On orders above <span className="font-semibold text-[#2f9e44]">৳599</span>
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* bottom note bar */}
// //         <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#fdf6e3] px-6 py-5">
// //           <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f1b53d] text-xs font-bold text-white">
// //             i
// //           </span>
// //           <p className="text-sm text-gray-700">
// //             <span className="font-bold">Please Note:</span> Delivery charges may vary for remote
// //             areas.
// //             <br />
// //             Our team will contact you if any additional charges apply.
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default DeliveryCharges;


// 'use client';

// import React from 'react';
// import Image from 'next/image';

// interface DeliveryTier {
//   id: number;
//   icon: 'city' | 'pin' | 'road' | 'signpost';
//   area: string;
//   desc: string;
//   charge: string;
//   freeAbove: string;
// }

// const barisalDeliveryData: DeliveryTier[] = [
//   {
//     id: 1,
//     icon: 'city',
//     area: 'Barisal City',
//     desc: 'All areas inside Barisal City',
//     charge: '৳60',
//     freeAbove: '৳599',
//   },
//   {
//     id: 2,
//     icon: 'pin',
//     area: 'Nearby Areas',
//     desc: 'Within 10 KM from Barisal City',
//     charge: '৳120',
//     freeAbove: '৳999',
//   },
//   {
//     id: 3,
//     icon: 'road',
//     area: 'Suburban Areas',
//     desc: '10 – 20 KM from Barisal City',
//     charge: '৳150',
//     freeAbove: '৳1,499',
//   },
//   {
//     id: 4,
//     icon: 'signpost',
//     area: 'Remote Areas',
//     desc: '20 KM+ from Barisal City',
//     charge: '৳200',
//     freeAbove: '৳1,999',
//   },
// ];

// /* ---------- Icon helpers ---------- */

// const IconWrap: React.FC<{ children: React.ReactNode; size?: 'sm' | 'md' }> = ({
//   children,
//   size = 'md',
// }) => (
//   <div
//     className={`flex shrink-0 items-center justify-center rounded-full bg-[#e7f5e8] ${
//       size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
//     }`}
//   >
//     {children}
//   </div>
// );

// const CityIcon = ({ size = 22 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <path
//       d="M4 21V8l5-3v3l5-3v16M4 21h16M9 21v-4h2v4M14 21v-4h2v4M7 12h.01M7 16h.01M12 16h.01M17 12h.01M17 16h.01"
//       stroke="#2f9e44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
//     />
//   </svg>
// );

// const PinIcon = ({ size = 20 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
//       stroke="#2f9e44" strokeWidth="1.6" strokeLinejoin="round"
//     />
//     <circle cx="12" cy="9" r="2.4" stroke="#2f9e44" strokeWidth="1.6" />
//   </svg>
// );

// const RoadIcon = ({ size = 22 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <path
//       d="M8 21 11 3h2l3 18M9.5 13h5"
//       stroke="#2f9e44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
//     />
//   </svg>
// );

// const SignpostIcon = ({ size = 22 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 3v18M5 7h6l-1.5 2.5L11 12H5V7ZM12 9h7v3h-7"
//       stroke="#2f9e44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
//     />
//   </svg>
// );

// const renderTierIcon = (icon: DeliveryTier['icon'], size?: number) => {
//   switch (icon) {
//     case 'city': return <CityIcon size={size} />;
//     case 'pin': return <PinIcon size={size} />;
//     case 'road': return <RoadIcon size={size} />;
//     case 'signpost': return <SignpostIcon size={size} />;
//   }
// };

// const TruckIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M3 16V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10M3 16h11M3 16a2 2 0 1 0 4 0M14 16a2 2 0 1 0 4 0M14 9h4l3 3v4h-3M14 9v7"
//       stroke="#2f9e44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
//     />
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z"
//       stroke="#2f9e44" strokeWidth="1.6" strokeLinejoin="round"
//     />
//     <path d="M9 12l2 2 4-4" stroke="#2f9e44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const LocationIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
//       stroke="#2f9e44" strokeWidth="1.6" strokeLinejoin="round"
//     />
//     <circle cx="12" cy="9" r="2.4" stroke="#2f9e44" strokeWidth="1.6" />
//   </svg>
// );

// const GiftIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//     <rect x="4" y="9" width="16" height="11" rx="1" stroke="#fff" strokeWidth="2" />
//     <path
//       d="M4 9h16M12 9v11M12 9c-1.8 0-4-1-4-3a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 2-2.2 3-4 3Z"
//       stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"
//     />
//   </svg>
// );

// const features = [
//   { icon: <TruckIcon />, title: 'Fast Delivery', desc: 'On-time delivery you can trust' },
//   { icon: <ShieldIcon />, title: 'Safe Checkout', desc: 'Your order is safe with us' },
//   { icon: <LocationIcon />, title: 'Live Tracking', desc: 'Track your order in real-time' },
// ];

// /* ---------- Improved Map Panel with real-looking location pins ---------- */

// const RiderMapPanel: React.FC = () => (
//   <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#f0faf0] p-4">
//     {/* Map SVG background */}
//     <svg
//       viewBox="0 0 360 380"
//       className="absolute inset-0 h-full w-full"
//       preserveAspectRatio="xMidYMid slice"
//     >
//       {/* Light grid lines for map feel */}
//       <defs>
//         <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//           <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d6eed8" strokeWidth="0.8" />
//         </pattern>
//       </defs>
//       <rect width="360" height="380" fill="url(#grid)" />

//       {/* Road paths */}
//       <path d="M0 190 Q90 170 180 190 Q270 210 360 190" fill="none" stroke="#c8e6c9" strokeWidth="8" strokeLinecap="round" />
//       <path d="M180 0 Q185 95 180 190 Q175 285 180 380" fill="none" stroke="#c8e6c9" strokeWidth="8" strokeLinecap="round" />
//       <path d="M0 290 Q120 270 220 295 Q290 310 360 280" fill="none" stroke="#dcedc8" strokeWidth="5" strokeLinecap="round" />
//       <path d="M50 0 Q80 120 60 200 Q40 280 70 380" fill="none" stroke="#dcedc8" strokeWidth="4" strokeLinecap="round" />
//       <path d="M290 0 Q310 110 300 190 Q288 270 305 380" fill="none" stroke="#dcedc8" strokeWidth="4" strokeLinecap="round" />

//       {/* Route dashes */}
//       <path
//         d="M75 120 Q130 90 180 110 Q230 130 285 100"
//         fill="none" stroke="#4caf50" strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round"
//       />
//       <path
//         d="M75 120 Q60 185 75 260"
//         fill="none" stroke="#4caf50" strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round"
//       />

//       {/* Location pin – top right (destination A) */}
//       <g transform="translate(268, 68)">
//         <filter id="shadow1">
//           <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
//         </filter>
//         <g filter="url(#shadow1)">
//           <path d="M14 0C6.3 0 0 6.3 0 14c0 9.8 14 24 14 24s14-14.2 14-24C28 6.3 21.7 0 14 0Z" fill="#2f9e44" />
//           <circle cx="14" cy="13" r="6" fill="white" />
//           <circle cx="14" cy="13" r="3" fill="#2f9e44" />
//         </g>
//         {/* pulse ring */}
//         <circle cx="14" cy="13" r="11" fill="none" stroke="#2f9e44" strokeWidth="1.5" opacity="0.3" />
//       </g>

//       {/* Location pin – bottom left (destination B) */}
//       <g transform="translate(55, 240)">
//         <filter id="shadow2">
//           <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
//         </filter>
//         <g filter="url(#shadow2)">
//           <path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20.5 12 20.5S24 20.4 24 12C24 5.4 18.6 0 12 0Z" fill="#388e3c" />
//           <circle cx="12" cy="11" r="5" fill="white" />
//           <circle cx="12" cy="11" r="2.5" fill="#388e3c" />
//         </g>
//       </g>

//       {/* Location pin – top left (small) */}
//       <g transform="translate(30, 105)">
//         <path d="M9 0C4 0 0 4 0 9c0 6.3 9 15.5 9 15.5S18 15.3 18 9C18 4 14 0 9 0Z" fill="#66bb6a" />
//         <circle cx="9" cy="8.5" r="3.5" fill="white" />
//         <circle cx="9" cy="8.5" r="1.8" fill="#66bb6a" />
//       </g>

//       {/* Location pin – right middle (small) */}
//       <g transform="translate(292, 255)">
//         <path d="M9 0C4 0 0 4 0 9c0 6.3 9 15.5 9 15.5S18 15.3 18 9C18 4 14 0 9 0Z" fill="#a5d6a7" />
//         <circle cx="9" cy="8.5" r="3.5" fill="white" />
//         <circle cx="9" cy="8.5" r="1.8" fill="#a5d6a7" />
//       </g>

//       {/* Decorative trees / park blobs */}
//       <g fill="#c8e6c9">
//         <circle cx="240" cy="310" r="22" />
//         <circle cx="260" cy="298" r="16" />
//         <circle cx="220" cy="305" r="14" />
//       </g>
//       <g fill="#a5d6a7">
//         <circle cx="100" cy="50" r="18" />
//         <circle cx="118" cy="42" r="13" />
//       </g>

//       {/* Small building rectangles */}
//       <g fill="#dcedc8" stroke="#c5e1a5" strokeWidth="0.5">
//         <rect x="140" y="240" width="25" height="35" rx="2" />
//         <rect x="168" y="250" width="18" height="25" rx="2" />
//         <rect x="155" y="245" width="10" height="10" fill="#b2dfdb" />
//       </g>
//     </svg>

//     {/* Rider image on top */}
//     <div className="relative z-10 flex h-full items-end justify-center pt-6">
//       <Image
//         src="/bike1.png"
//         alt="Delivery rider on a green scooter"
//         width={300}
//         height={320}
//         className="select-none drop-shadow-2xl"
//         priority
//       />
//     </div>
//   </div>
// );

// /* ---------- Mobile Card Row ---------- */

// const MobileTierCard: React.FC<{ tier: DeliveryTier }> = ({ tier }) => (
//   <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
//     <IconWrap size="sm">{renderTierIcon(tier.icon, 18)}</IconWrap>
//     <div className="min-w-0 flex-1">
//       <p className="text-sm font-bold text-gray-900">{tier.area}</p>
//       <p className="text-xs text-gray-400">{tier.desc}</p>
//     </div>
//     <div className="text-right">
//       <p className="text-base font-bold text-gray-900">{tier.charge}</p>
//       <p className="text-xs text-gray-400">per order</p>
//     </div>
//     <div className="text-right pl-2 border-l border-gray-100">
//       <p className="text-base font-bold text-[#2f9e44]">{tier.freeAbove}</p>
//       <p className="text-xs text-gray-400">free above</p>
//     </div>
//   </div>
// );

// /* ---------- Main Component ---------- */

// const DeliveryCharges: React.FC = () => {
//   return (
//     <section className="bg-[#f8faf8] px-3 py-10 sm:px-6 sm:py-12">
//       <div className="mx-auto max-w-6xl">

//         {/* Header */}
//         <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//           <div>
//             <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e7f5e8] px-3 py-1 text-xs font-bold tracking-wide text-[#2f9e44]">
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//                 <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z" stroke="#2f9e44" strokeWidth="2" strokeLinejoin="round" />
//                 <path d="M9 12l2 2 4-4" stroke="#2f9e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               FAST, SAFE &amp; RELIABLE
//             </span>
//             <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
//               Delivery Charges
//             </h2>
//             <p className="mt-2 text-sm text-gray-500 sm:text-base lg:text-lg">
//               Affordable delivery across Barisal City &amp; beyond
//             </p>
//           </div>

//           <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-auto">
//             {features.map((f) => (
//               <div
//                 key={f.title}
//                 className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-2 py-3 shadow-sm sm:flex-row sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 lg:w-[200px]"
//               >
//                 <IconWrap size="sm">{f.icon}</IconWrap>
//                 <div className="text-center sm:text-left">
//                   <p className="text-xs font-bold text-gray-900 sm:text-sm">{f.title}</p>
//                   <p className="hidden text-xs leading-snug text-gray-500 sm:block">{f.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Desktop: table + map panel side by side */}
//         <div className="hidden lg:flex gap-6">
//           {/* Table */}
//           <div className="flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
//             <div className="grid grid-cols-3 bg-gradient-to-r from-[#3fae4a] to-[#2f9e44] px-8 py-4 text-sm font-semibold text-white">
//               <div className="flex items-center gap-2">
//                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
//                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
//                     <circle cx="12" cy="9" r="2.4" stroke="#fff" strokeWidth="2" />
//                   </svg>
//                 </span>
//                 Delivery Area
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
//                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
//                     <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2" />
//                     <path d="M12 7v10M9.5 9.2c0-1 1-1.7 2.5-1.7s2.5.6 2.5 1.6c0 2.2-5 1-5 3.2 0 1 1 1.7 2.5 1.7s2.5-.7 2.5-1.7" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
//                   </svg>
//                 </span>
//                 Delivery Charge
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
//                   <GiftIcon />
//                 </span>
//                 Free Delivery Above
//               </div>
//             </div>
//             <div className="divide-y divide-gray-100">
//               {barisalDeliveryData.map((tier) => (
//                 <div key={tier.id} className="grid grid-cols-3 items-center px-8 py-5">
//                   <div className="flex items-center gap-4">
//                     <IconWrap>{renderTierIcon(tier.icon)}</IconWrap>
//                     <div>
//                       <p className="font-bold text-gray-900">{tier.area}</p>
//                       <p className="text-sm text-gray-500">{tier.desc}</p>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">{tier.charge}</p>
//                     <p className="text-sm text-gray-400">Per Order</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-[#2f9e44]">{tier.freeAbove}</p>
//                     <p className="text-sm text-gray-400">Minimum Order</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Rider + map */}
//           <div className="flex w-[320px] flex-col gap-4">
//             <div className="flex-1 rounded-2xl">
//               <RiderMapPanel />
//             </div>
//             <div className="flex items-center gap-3 rounded-2xl bg-[#eef8ee] px-5 py-4">
//               <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2f9e44]">
//                 <GiftIcon />
//               </span>
//               <div>
//                 <p className="font-bold text-gray-900">Free Delivery</p>
//                 <p className="text-sm text-gray-500">
//                   On orders above <span className="font-semibold text-[#2f9e44]">৳599</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile: card list */}
//         <div className="flex flex-col gap-3 lg:hidden">
//           {/* Green header */}
//           <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#3fae4a] to-[#2f9e44] px-4 py-3 text-white">
//             <span className="text-xs font-semibold tracking-wide">Delivery Area</span>
//             <span className="text-xs font-semibold tracking-wide">Charge / Free Above</span>
//           </div>
//           {barisalDeliveryData.map((tier) => (
//             <MobileTierCard key={tier.id} tier={tier} />
//           ))}

//           {/* Compact rider panel for mobile */}
//           <div className="relative mt-2 overflow-hidden rounded-2xl bg-[#f0faf0]" style={{ height: 200 }}>
//             <svg viewBox="0 0 360 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
//               <defs>
//                 <pattern id="gridM" width="40" height="40" patternUnits="userSpaceOnUse">
//                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d6eed8" strokeWidth="0.8" />
//                 </pattern>
//               </defs>
//               <rect width="360" height="200" fill="url(#gridM)" />
//               <path d="M0 100 Q90 80 180 100 Q270 120 360 100" fill="none" stroke="#c8e6c9" strokeWidth="7" strokeLinecap="round" />
//               <path d="M0 150 Q120 130 220 152 Q290 165 360 140" fill="none" stroke="#dcedc8" strokeWidth="4" strokeLinecap="round" />
//               {/* right pin */}
//               <g transform="translate(300, 30)">
//                 <path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20.5 12 20.5S24 20.4 24 12C24 5.4 18.6 0 12 0Z" fill="#2f9e44" />
//                 <circle cx="12" cy="11" r="5" fill="white" />
//                 <circle cx="12" cy="11" r="2.5" fill="#2f9e44" />
//               </g>
//               {/* left pin */}
//               <g transform="translate(20, 55)">
//                 <path d="M9 0C4 0 0 4 0 9c0 6.3 9 15.5 9 15.5S18 15.3 18 9C18 4 14 0 9 0Z" fill="#66bb6a" />
//                 <circle cx="9" cy="8.5" r="3.5" fill="white" />
//                 <circle cx="9" cy="8.5" r="1.8" fill="#66bb6a" />
//               </g>
//               <path d="M38 68 Q110 50 300 48" fill="none" stroke="#4caf50" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
//             </svg>
//             <div className="relative z-10 flex h-full items-end justify-center">
//               <Image src="/bike1.png" alt="Delivery rider" width={220} height={200} className="select-none drop-shadow-xl" priority />
//             </div>
//           </div>

//           {/* Free delivery badge */}
//           <div className="flex items-center gap-3 rounded-2xl bg-[#eef8ee] px-4 py-3">
//             <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2f9e44]">
//               <GiftIcon />
//             </span>
//             <p className="text-sm text-gray-700">
//               <span className="font-bold text-gray-900">Free Delivery</span> on orders above{' '}
//               <span className="font-semibold text-[#2f9e44]">৳599</span>
//             </p>
//           </div>
//         </div>

//         {/* Note */}
//         <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#fdf6e3] px-4 py-4 sm:px-6 sm:py-5">
//           <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f1b53d] text-xs font-bold text-white">
//             i
//           </span>
//           <p className="text-xs text-gray-700 sm:text-sm">
//             <span className="font-bold">Please Note:</span> Delivery charges may vary for remote areas.
//             <br />
//             Our team will contact you if any additional charges apply.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DeliveryCharges;







'use client';

import React from 'react';
import Image from 'next/image';

/* Brand color: --color-primary: #619d23 */

interface DeliveryTier {
  id: number;
  icon: 'city' | 'pin' | 'road' | 'signpost';
  area: string;
  desc: string;
  charge: string;
  freeAbove: string;
}

const barisalDeliveryData: DeliveryTier[] = [
  {
    id: 1,
    icon: 'city',
    area: 'Barisal City',
    desc: 'All areas inside Barisal City',
    charge: '৳60',
    freeAbove: '৳599',
  },
  {
    id: 2,
    icon: 'pin',
    area: 'Nearby Areas',
    desc: 'Within 10 KM from Barisal City',
    charge: '৳120',
    freeAbove: '৳999',
  },
  {
    id: 3,
    icon: 'road',
    area: 'Suburban Areas',
    desc: '10 – 20 KM from Barisal City',
    charge: '৳150',
    freeAbove: '৳1,499',
  },
  {
    id: 4,
    icon: 'signpost',
    area: 'Remote Areas',
    desc: '20 KM+ from Barisal City',
    charge: '৳200',
    freeAbove: '৳1,999',
  },
];

/* ---------- dashed-circle wrapper for the per-row area icon ---------- */

const DashedIconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--color-primary)]/50">
    {children}
  </div>
);

/* ---------- filled light-bg wrapper for wallet / tag icons ---------- */

const SoftIconWrap: React.FC<{ children: React.ReactNode; size?: 'sm' | 'md' }> = ({
  children,
  size = 'md',
}) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full bg-[#eef3e6] ${
      size === 'sm' ? 'h-10 w-10' : 'h-12 w-12'
    }`}
  >
    {children}
  </div>
);

/* ---------- area icons (solid fill, used inside dashed circle) ---------- */

const CityIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 21V10l4-2.5V10l4-2.5V21" fill="var(--color-primary)" />
    <path d="M6 21V10l4-2.5V10l4-2.5V21H6Z" stroke="var(--color-primary)" strokeWidth="0.5" />
    <rect x="7.2" y="12" width="1.6" height="2" fill="#fff" />
    <rect x="11.2" y="12" width="1.6" height="2" fill="#fff" />
    <rect x="7.2" y="16" width="1.6" height="2" fill="#fff" />
    <rect x="11.2" y="16" width="1.6" height="2" fill="#fff" />
    <path d="M3 21h18" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PinAreaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
      fill="var(--color-primary)"
    />
    <circle cx="12" cy="9" r="2.6" fill="#fff" />
  </svg>
);

const RoadAreaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21 11 3h2l2 18"
      stroke="var(--color-primary)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10.3 13h3.4" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SignpostAreaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M6 6h6l-1.5 2.5L12 11H6V6Z"
      fill="var(--color-primary)"
    />
    <path
      d="M12 9h6v3h-6"
      fill="var(--color-primary)"
    />
  </svg>
);

const renderTierIcon = (icon: DeliveryTier['icon'], size?: number) => {
  switch (icon) {
    case 'city':
      return <CityIcon size={size} />;
    case 'pin':
      return <PinAreaIcon size={size} />;
    case 'road':
      return <RoadAreaIcon size={size} />;
    case 'signpost':
      return <SignpostAreaIcon size={size} />;
  }
};

/* ---------- wallet / tag icons used per row ---------- */

const WalletIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M4 8 15 6" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="16" cy="13" r="1.4" fill="var(--color-primary)" />
  </svg>
);

const TagIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 12.5 11.2 4.3a1.5 1.5 0 0 1 1.06-.44L18 3.8a1.6 1.6 0 0 1 1.7 1.7l-.06 5.75a1.5 1.5 0 0 1-.44 1.05L11 20.5a1.5 1.5 0 0 1-2.1 0L3 14.6a1.5 1.5 0 0 1 0-2.1Z"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="15.5" cy="7.5" r="1.3" stroke="var(--color-primary)" strokeWidth="1.4" />
  </svg>
);

/* ---------- top feature icons (outline style, no card box) ---------- */

const ScooterOutlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="6.5" cy="18" r="2" stroke="var(--color-primary)" strokeWidth="1.6" />
    <circle cx="16" cy="18" r="2" stroke="var(--color-primary)" strokeWidth="1.6" />
    <path
      d="M3 18h2l1-6.5h5l3 2.6h2.3a1.8 1.8 0 0 1 1.7 1.8v2h-1.5"
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="5.6" y="11.5" width="5" height="2.6" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
    <rect x="6.7" y="8.5" width="2.8" height="2" rx="0.4" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M8.7 12.2l2.3 2.3 4.3-4.6"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PinOutlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.4" fill="var(--color-primary)" />
  </svg>
);

const TruckOutlineIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 16V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10M3 16h11M3 16a2 2 0 1 0 4 0M14 16a2 2 0 1 0 4 0M14 9h4l3 3v4h-3M14 9v7"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 10.5v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="7.3" r="1.1" fill="#fff" />
  </svg>
);

const features = [
  { icon: <ScooterOutlineIcon />, title: 'Fast Delivery', desc: 'On-time delivery you can trust' },
  { icon: <ShieldCheckIcon />, title: 'Safe Checkout', desc: 'Your order is safe with us' },
  { icon: <PinOutlineIcon />, title: 'Live Tracking', desc: 'Track your order in real-time' },
];

/* ---------- right panel: rider over a faint city skyline with one floating pin ---------- */

const RiderCityPanel: React.FC = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl">
    <svg
      aria-hidden
      viewBox="0 0 360 360"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
    >
      <g fill="var(--color-primary)" opacity="0.08">
        {/* cloud */}
        <ellipse cx="100" cy="60" rx="30" ry="16" />
        <ellipse cx="124" cy="52" rx="20" ry="13" />

        {/* skyline silhouette */}
        <rect x="40" y="160" width="26" height="120" />
        <rect x="70" y="130" width="34" height="150" />
        <rect x="108" y="175" width="22" height="105" />
        <rect x="230" y="150" width="30" height="130" />
        <rect x="264" y="185" width="24" height="95" />
        <rect x="292" y="140" width="32" height="140" />

        {/* window cut-outs */}
        <g fill="#fff" opacity="0.7">
          <rect x="47" y="172" width="5" height="7" />
          <rect x="57" y="172" width="5" height="7" />
          <rect x="47" y="190" width="5" height="7" />
          <rect x="57" y="190" width="5" height="7" />
          <rect x="78" y="145" width="5" height="7" />
          <rect x="90" y="145" width="5" height="7" />
          <rect x="78" y="163" width="5" height="7" />
          <rect x="90" y="163" width="5" height="7" />
          <rect x="238" y="165" width="5" height="7" />
          <rect x="250" y="165" width="5" height="7" />
          <rect x="300" y="155" width="5" height="7" />
          <rect x="312" y="155" width="5" height="7" />
        </g>

        {/* single tree */}
        <circle cx="200" cy="255" r="20" />
        <rect x="196" y="270" width="8" height="22" />
      </g>

      {/* faint ground line */}
      <path d="M0 285 H360" stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="1.5" />
    </svg>

    {/* single floating location pin, top-right, with dashed tail */}
    <svg
      viewBox="0 0 60 90"
      className="absolute right-4 top-2 h-16 w-12 sm:right-6 sm:top-4 sm:h-20 sm:w-14"
    >
      <path
        d="M30 24c-8.3 0-15 6.7-15 15 0 11.2 15 27 15 27s15-15.8 15-27c0-8.3-6.7-15-15-15Z"
        fill="#9fc97f"
      />
      <circle cx="30" cy="39" r="7" fill="#fff" />
      <path
        d="M22 66 Q14 76 5 80"
        fill="none"
        stroke="#9fc97f"
        strokeWidth="2"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
    </svg>

    {/* rider image */}
    <div className="relative z-10 flex h-full items-end justify-center">
      <Image
        src="/bike1.png"
        alt="Delivery rider on a green scooter"
        width={320}
        height={320}
        className="h-auto w-[78%] max-w-[300px] select-none drop-shadow-2xl sm:w-[85%]"
        priority
      />
    </div>
  </div>
);

/* ---------- mobile compact tier card ---------- */

const MobileTierCard: React.FC<{ tier: DeliveryTier }> = ({ tier }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--color-primary)]/50">
      {renderTierIcon(tier.icon, 18)}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-bold text-gray-900">{tier.area}</p>
      <p className="text-xs text-gray-400">{tier.desc}</p>
    </div>
    <div className="text-right">
      <p className="text-base font-bold text-gray-900">{tier.charge}</p>
      <p className="text-xs text-gray-400">per order</p>
    </div>
    <div className="border-l border-gray-100 pl-2 text-right">
      <p className="text-base font-bold text-[var(--color-primary)]">{tier.freeAbove}</p>
      <p className="text-xs text-gray-400">free above</p>
    </div>
  </div>
);

/* ---------- main component ---------- */

const DeliveryCharges: React.FC = () => {
  return (
    <section className="bg-[#fbfcfa] px-3 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* ---------- header ---------- */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-3 py-1 text-xs font-bold tracking-wide text-[var(--color-primary)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 4 5v6c0 6 3.5 9 8 11 4.5-2 8-5 8-11V5l-8-3Z"
                  fill="var(--color-primary)"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              FAST. SAFE. RELIABLE
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-5xl">
              Delivery Charges
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base lg:text-lg">
              Affordable delivery across Barisal City &amp; beyond
            </p>
          </div>

          <div className="  flex flex-wrap gap-x-6 gap-y-4 lg:flex-nowrap lg:divide-x lg:divide-gray-200">
            {features.map((f, i) => (
              <div key={f.title} className={`flex items-center gap-3 ${i > 0 ? 'lg:pl-6' : ''}`}>
                <SoftIconWrap>{f.icon}</SoftIconWrap>
                <div>
                  <p className="text-sm font-bold text-gray-900">{f.title}</p>
                  <p className="text-xs leading-snug text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- main row: table + rider panel ---------- */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* table (desktop) */}
          <div className="hidden flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
            <div className="divide-y divide-gray-100">
              {barisalDeliveryData.map((tier) => (
                <div key={tier.id} className="grid grid-cols-3 items-center px-8 py-6">
                  <div className="flex items-center gap-4">
                    <DashedIconWrap>{renderTierIcon(tier.icon)}</DashedIconWrap>
                    <div>
                      <p className="font-bold text-gray-900">{tier.area}</p>
                      <p className="text-sm text-gray-500">{tier.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
                    <SoftIconWrap>
                      <WalletIcon />
                    </SoftIconWrap>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{tier.charge}</p>
                      <p className="text-sm text-gray-400">Per Order</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
                    <SoftIconWrap>
                      <TagIcon />
                    </SoftIconWrap>
                    <div>
                      <p className="text-2xl font-bold text-[var(--color-primary)]">
                        {tier.freeAbove}
                      </p>
                      <p className="text-sm text-gray-400">
                        Minimum Order
                        <br />
                        (Free Delivery)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* mobile card list */}
          <div className="flex flex-col gap-3 lg:hidden">
            {barisalDeliveryData.map((tier) => (
              <MobileTierCard key={tier.id} tier={tier} />
            ))}
          </div>

          {/* right rider + city panel */}
          <div className="flex w-full flex-col gap-4 lg:w-[320px]">
            <div className="h-[260px] overflow-hidden rounded-2xl bg-[#fbfcfa] sm:h-[320px] lg:h-full lg:min-h-[360px]">
              <RiderCityPanel />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
              <TruckOutlineIcon />
              <div>
                <p className="font-bold text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-500">
                  On orders above{' '}
                  <span className="font-semibold text-[var(--color-primary)]">৳599</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- bottom note ---------- */}
        <div className="relative mt-6 flex items-start gap-3 overflow-hidden rounded-2xl px-1 py-4 sm:px-2">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]">
            <InfoIcon />
          </span>
          <p className="text-xs text-gray-700 sm:text-sm">
            <span className="font-bold">Please Note:</span> Delivery charges may vary for remote
            areas.
            <br />
            Our team will contact you if any additional charges apply.
          </p>

          {/* faint decorative truck, bottom-right */}
          <svg
            width="64"
            height="40"
            viewBox="0 0 64 40"
            className="absolute bottom-0 right-0 hidden opacity-15 sm:block"
          >
            <path d="M2 8h26 M2 16h20 M2 24h14" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(30,4)">
              <rect x="0" y="6" width="20" height="14" rx="1.5" stroke="var(--color-primary)" strokeWidth="1.6" fill="none" />
              <path d="M20 10h6l5 5v5h-11" stroke="var(--color-primary)" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
              <circle cx="6" cy="22" r="2.4" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
              <circle cx="24" cy="22" r="2.4" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCharges;