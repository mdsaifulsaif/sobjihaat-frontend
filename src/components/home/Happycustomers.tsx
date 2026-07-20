


// 'use client';

// import React from 'react';

// /* =========================================================================
//    Brand color: --color-primary: #619d23
//    This component expects the CSS variable to be defined globally, e.g.:
//      :root { --color-primary: #619d23; }
//    ========================================================================= */

// /* ---------------------------------------------------------------------------
//    JSON-style data (swap this for an API/CMS response later)
// --------------------------------------------------------------------------- */

// interface Stat {
//   id: string;
//   icon: 'bag' | 'smile' | 'clock' | 'star';
//   value: string;
//   label: string;
// }

// interface Testimonial {
//   id: string;
//   name: string;
//   role: string;
//   timeAgo: string;
//   quote: string;
//   initials: string;
//   avatarColor: string;
// }

// interface TrustBadge {
//   id: string;
//   icon: 'badge' | 'returns' | 'lock' | 'headset';
//   title: string;
//   subtitle: string;
// }

// const statsData: Stat[] = [
//   { id: 'orders', icon: 'bag', value: '15,000+', label: 'Orders Delivered' },
//   { id: 'satisfaction', icon: 'smile', value: '98%', label: 'Customer Satisfaction' },
//   { id: 'delivery', icon: 'clock', value: '30 Min', label: 'Average Delivery' },
//   { id: 'rating', icon: 'star', value: '4.9', label: 'Average Rating' },
// ];

// const testimonialsData: Testimonial[] = [
//   {
//     id: 't1',
//     name: 'Mahmud Hasan',
//     role: 'Verified Customer',
//     timeAgo: '2 days ago',
//     quote:
//       'FreshCart never disappoints! The vegetables are always fresh and delivery is super fast.',
//     initials: 'MH',
//     avatarColor: '#cfe3d1',
//   },
//   {
//     id: 't2',
//     name: 'Nusrat Jahan',
//     role: 'Verified Customer',
//     timeAgo: '1 week ago',
//     quote: 'Very reliable service in Barisal City. The delivery boys are polite and professional.',
//     initials: 'NJ',
//     avatarColor: '#f3d9d9',
//   },
//   {
//     id: 't3',
//     name: 'Rafiq Ahmed',
//     role: 'Verified Customer',
//     timeAgo: '2 weeks ago',
//     quote:
//       'I love how easy it is to order and get my groceries at home. Highly recommended!',
//     initials: 'RA',
//     avatarColor: '#d8e3f3',
//   },
//   {
//     id: 't4',
//     name: 'Sumiya Islam',
//     role: 'Verified Customer',
//     timeAgo: '3 weeks ago',
//     quote:
//       'Great experience! The live tracking feature is very helpful. Keep up the good work FreshCart team!',
//     initials: 'SI',
//     avatarColor: '#e3d9f3',
//   },
//   {
//     id: 't5',
//     name: 'Tanvir Ahmed',
//     role: 'Verified Customer',
//     timeAgo: '1 month ago',
//     quote:
//       'Fair prices and the quality never drops. FreshCart has become part of our weekly routine now.',
//     initials: 'TA',
//     avatarColor: '#f3e6c9',
//   },
//   {
//     id: 't6',
//     name: 'Farhana Akter',
//     role: 'Verified Customer',
//     timeAgo: '1 month ago',
//     quote:
//       'Customer support resolved my issue within minutes. Rare to see this level of care these days.',
//     initials: 'FA',
//     avatarColor: '#cfe8e3',
//   },
// ];

// const trustBadgesData: TrustBadge[] = [
//   { id: 'authentic', icon: 'badge', title: '100% Authentic', subtitle: 'Products' },
//   { id: 'returns', icon: 'returns', title: 'Easy Returns', subtitle: '& Refunds' },
//   { id: 'secure', icon: 'lock', title: 'Secure Payments', subtitle: 'You Can Trust' },
//   { id: 'support', icon: 'headset', title: '24/7 Customer', subtitle: 'Support' },
// ];

// /* ---------------------------------------------------------------------------
//    Decorative SVGs: heart badge icon, leaf doodle, heart speech-bubble doodle
// --------------------------------------------------------------------------- */

// const HeartIcon: React.FC<{ size?: number; filled?: boolean }> = ({
//   size = 14,
//   filled = true,
// }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 20.3S3.5 15.3 3.5 9.4A4.9 4.9 0 0 1 12 6.3a4.9 4.9 0 0 1 8.5 3.1c0 5.9-8.5 10.9-8.5 10.9Z"
//       fill={filled ? 'var(--color-primary)' : 'none'}
//       stroke="var(--color-primary)"
//       strokeWidth={filled ? 0 : 1.8}
//     />
//   </svg>
// );

// const QuoteIcon = () => (
//   <svg width="22" height="18" viewBox="0 0 32 24" fill="none">
//     <path
//       d="M3 24V14.8c0-5 2.7-8.7 8-11.2l1.8 3.3c-3.4 1.8-5 4-5 6.6h5V24H3Zm17 0V14.8c0-5 2.7-8.7 8-11.2l1.8 3.3c-3.4 1.8-5 4-5 6.6h5V24H20Z"
//       fill="var(--color-primary)"
//     />
//   </svg>
// );

// const LeafDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
//   <svg
//     viewBox="0 0 280 220"
//     className={className}
//     fill="none"
//     aria-hidden
//   >
//     <path
//       d="M10 210C30 150 55 130 90 120 S150 95 150 50"
//       stroke="#bcd9a8"
//       strokeWidth="2"
//       strokeDasharray="2 9"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <g transform="translate(95,55)">
//       <path d="M30 0C24 14 24 26 30 40C36 26 36 14 30 0Z" fill="#a9cf94" opacity="0.85" />
//       <path d="M30 14C18 14 8 18 0 26C12 30 22 28 30 14Z" fill="#bcd9a8" opacity="0.85" />
//       <path d="M30 26C42 26 52 30 60 38C48 42 38 40 30 26Z" fill="#bcd9a8" opacity="0.85" />
//       <path d="M30 6V42" stroke="#8fbf78" strokeWidth="1.4" strokeLinecap="round" />
//     </g>
//   </svg>
// );

// const HeartBubbleDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
//   <svg viewBox="0 0 220 180" className={className} fill="none" aria-hidden>
//     <rect
//       x="10"
//       y="10"
//       width="120"
//       height="84"
//       rx="20"
//       stroke="#bcd9a8"
//       strokeWidth="2"
//       fill="#fff"
//     />
//     <path d="M40 94 L40 118 L66 94 Z" fill="#fff" stroke="#bcd9a8" strokeWidth="2" />
//     <path
//       d="M70 38c-5-6-14-6-18 0-4 6-1 13 18 26 19-13 22-20 18-26-4-6-13-6-18 0Z"
//       fill="#bcd9a8"
//     />
//     <path
//       d="M132 120C150 110 168 112 182 128 S 210 145 212 128"
//       stroke="#cfe3bb"
//       strokeWidth="2"
//       strokeDasharray="2 8"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <circle cx="205" cy="105" r="14" stroke="#cfe3bb" strokeWidth="2" fill="none" strokeDasharray="2 7" />
//   </svg>
// );

// /* ---------------------------------------------------------------------------
//    Stat icons
// --------------------------------------------------------------------------- */

// const BagIcon = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.8"
//       strokeLinejoin="round"
//     />
//     <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
//   </svg>
// );

// const SmileIcon = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="12" r="9" stroke="var(--color-primary)" strokeWidth="1.8" />
//     <circle cx="9" cy="10" r="1" fill="var(--color-primary)" />
//     <circle cx="15" cy="10" r="1" fill="var(--color-primary)" />
//     <path
//       d="M8.5 14c1 1.4 2.4 2 3.5 2s2.5-.6 3.5-2"
//       stroke="var(--color-primary)"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//     />
//   </svg>
// );

// const FastClockIcon = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <circle cx="14" cy="13" r="7" stroke="var(--color-primary)" strokeWidth="1.8" />
//     <path
//       d="M14 9.5V13l3 1.7"
//       stroke="var(--color-primary)"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path d="M1 10h4M2.5 13h4M4 16h4" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
//   </svg>
// );

// const StarStatIcon = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.6"
//       strokeLinejoin="round"
//       fill="var(--color-primary)"
//       fillOpacity="0.18"
//     />
//   </svg>
// );

// const renderStatIcon = (icon: Stat['icon']) => {
//   switch (icon) {
//     case 'bag':
//       return <BagIcon />;
//     case 'smile':
//       return <SmileIcon />;
//     case 'clock':
//       return <FastClockIcon />;
//     case 'star':
//       return <StarStatIcon />;
//   }
// };

// /* ---------------------------------------------------------------------------
//    Trust badge icons
// --------------------------------------------------------------------------- */

// const AuthenticBadgeIcon = () => (
//   <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 2l2.2 1.6 2.7-.3 1 2.5 2.5 1-.3 2.7L21.7 12l-1.6 2.2.3 2.7-2.5 1-1 2.5-2.7-.3L12 21.7l-2.2-1.6-2.7.3-1-2.5-2.5-1 .3-2.7L2.3 12l1.6-2.2-.3-2.7 2.5-1 1-2.5 2.7.3L12 2Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.4"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M8.8 12.3l2.1 2.1 4.3-4.6"
//       stroke="var(--color-primary)"
//       strokeWidth="1.6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const ReturnsIcon = () => (
//   <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
//     <rect x="4" y="8" width="16" height="13" rx="1.6" stroke="var(--color-primary)" strokeWidth="1.7" />
//     <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="var(--color-primary)" strokeWidth="1.7" strokeLinecap="round" />
//     <path
//       d="M14.5 12.2a2.6 2.6 0 1 1-2.4 3.6M12 11.5l.3 2 1.8-.9"
//       stroke="var(--color-primary)"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const LockIcon = () => (
//   <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
//     <rect x="5" y="10" width="14" height="11" rx="1.8" stroke="var(--color-primary)" strokeWidth="1.7" />
//     <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="var(--color-primary)" strokeWidth="1.7" strokeLinecap="round" />
//     <circle cx="12" cy="15" r="1.6" fill="var(--color-primary)" />
//     <path d="M12 16.6V18.5" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
//   </svg>
// );

// const HeadsetIcon = () => (
//   <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M5 13v-1a7 7 0 0 1 14 0v1"
//       stroke="var(--color-primary)"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <rect x="3.5" y="13" width="3.2" height="5.2" rx="1.3" stroke="var(--color-primary)" strokeWidth="1.6" />
//     <rect x="17.3" y="13" width="3.2" height="5.2" rx="1.3" stroke="var(--color-primary)" strokeWidth="1.6" />
//     <path
//       d="M19 18.2v.5a2.3 2.3 0 0 1-2.3 2.3H14"
//       stroke="var(--color-primary)"
//       strokeWidth="1.6"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </svg>
// );

// const renderTrustIcon = (icon: TrustBadge['icon']) => {
//   switch (icon) {
//     case 'badge':
//       return <AuthenticBadgeIcon />;
//     case 'returns':
//       return <ReturnsIcon />;
//     case 'lock':
//       return <LockIcon />;
//     case 'headset':
//       return <HeadsetIcon />;
//   }
// };

// /* ---------------------------------------------------------------------------
//    Misc small icons (verified check, chevrons, arrow)
// --------------------------------------------------------------------------- */

// const VerifiedCheckIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 2.5l2.3 1.3 2.6-.2 1 2.4 2.4 1-.2 2.6L21.5 12l-1.4 2.2.2 2.6-2.4 1-1 2.4-2.6-.2L12 21.5l-2.3-1.5-2.6.2-1-2.4-2.4-1 .2-2.6L2.5 12l1.4-2.2-.2-2.6 2.4-1 1-2.4 2.6.2L12 2.5Z"
//       fill="var(--color-primary)"
//     />
//     <path d="M8.5 12.3l2.2 2.2 4.5-4.8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

// const ArrowRightIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M5 12h14M13 6l6 6-6 6"
//       stroke="var(--color-primary)"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// /* ---------------------------------------------------------------------------
//    Avatar (initials-based placeholder, no real photos)
// --------------------------------------------------------------------------- */

// const Avatar: React.FC<{ initials: string; color: string }> = ({ initials, color }) => (
//   <div
//     className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#2c4a2f]"
//     style={{ backgroundColor: color }}
//   >
//     {initials}
//   </div>
// );

// /* ---------------------------------------------------------------------------
//    Testimonial card
// --------------------------------------------------------------------------- */

// const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
//   <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//     <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef3e6]">
//       <QuoteIcon />
//     </span>

//     <p className="mt-5 flex-1 text-[15px] leading-relaxed text-gray-700">{item.quote}</p>

//     <span className="mt-5 block h-[3px] w-8 rounded-full bg-[var(--color-primary)]" />

//     <div className="mt-4 flex items-center gap-3">
//       <Avatar initials={item.initials} color={item.avatarColor} />
//       <div>
//         <div className="flex items-center gap-1.5">
//           <p className="text-sm font-bold text-gray-900">{item.name}</p>
//           <VerifiedCheckIcon />
//         </div>
//         <p className="text-sm font-medium text-[var(--color-primary)]">{item.role}</p>
//         <p className="text-xs text-gray-400">{item.timeAgo}</p>
//       </div>
//     </div>
//   </div>
// );

// /* ---------------------------------------------------------------------------
//    Main component
// --------------------------------------------------------------------------- */

// const HappyCustomers: React.FC = () => {
//   // Duplicate the list once so the marquee can loop seamlessly (no snap-back).
//   const loopData = [...testimonialsData, ...testimonialsData];

//   return (
//     <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
//       {/* decorative doodles */}
//       <LeafDoodle className="pointer-events-none absolute left-0 top-16 hidden h-44 w-64 sm:block" />
//       <HeartBubbleDoodle className="pointer-events-none absolute right-0 top-10 hidden h-40 w-56 sm:block" />

//       <div className="relative mx-auto container">
//         {/* ---------- heading ---------- */}
//         <div className="text-center">
//           <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-4 py-1.5 text-xs font-bold tracking-wide text-[var(--color-primary)]">
//             <HeartIcon size={13} />
//             OUR HAPPY CUSTOMERS
//           </span>

//           <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-[2.6rem]">
//             Trusted by Thousands of
//             <br />
//             Happy Customers{' '}
//             <HeartIcon size={28} filled={false} />
//           </h2>

//           <p className="mx-auto mt-4 max-w-md text-sm text-gray-500 sm:text-base">
//             Real experiences from customers across Bangladesh
//           </p>
//         </div>

//         {/* ---------- testimonial marquee (smooth, infinite, never snaps back) ---------- */}
//         <div
//           className="group relative mt-10 overflow-hidden"
//           style={{
//             maskImage:
//               'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
//             WebkitMaskImage:
//               'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
//           }}
//         >
//           <div className="marquee-track flex w-max gap-5">
//             {loopData.map((t, i) => (
//               <div
//                 key={`${t.id}-${i}`}
//                 className="w-[260px] shrink-0 sm:w-[300px] lg:w-[320px]"
//               >
//                 <TestimonialCard item={t} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .marquee-track {
//           animation: marquee-scroll 40s linear infinite;
//         }
//         .group:hover .marquee-track {
//           animation-play-state: paused;
//         }
//         @keyframes marquee-scroll {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .marquee-track {
//             animation: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HappyCustomers;



'use client';

import React from 'react';
import { useGetFeaturedReviewsQuery } from '@/redux/api/reviewApi'; // 👈 তোমার আসল path বসাও

/* =========================================================================
   Brand color: --color-primary: #619d23
   This component expects the CSS variable to be defined globally, e.g.:
     :root { --color-primary: #619d23; }
   ========================================================================= */

/* ---------------------------------------------------------------------------
   Types
--------------------------------------------------------------------------- */

interface Testimonial {
  id: string;
  name: string;
  role: string;
  timeAgo: string;
  quote: string;
  initials: string;
  avatarColor: string;
  avatarUrl?: string;
}

// API response shape (from /reviews/featured)
interface FeaturedReviewApiItem {
  _id: string;
  productID?: {
    _id: string;
    name: string;
    thumbnail?: string;
    slug?: string;
  };
  userID?: {
    _id: string;
    firstName?: string;
    lastName?: string;
    avatar?: {
      public_id?: string;
      url?: string;
    };
  };
  rating: number;
  comment: string;
  status: string;
  isFeatured: boolean;
  featuredAt?: string;
  createdAt: string;
  updatedAt?: string;
  adminReply?: string;
}

/* ---------------------------------------------------------------------------
   Helpers: initials, avatar color, time-ago
--------------------------------------------------------------------------- */

const AVATAR_COLORS = ['#cfe3d1', '#f3d9d9', '#d8e3f3', '#e3d9f3', '#f3e6c9', '#cfe8e3'];

const getInitials = (firstName?: string, lastName?: string) => {
  const f = firstName?.trim()?.[0] ?? '';
  const l = lastName?.trim()?.[0] ?? '';
  return (f + l).toUpperCase() || 'U';
};

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ];

  for (const [secondsInUnit, label] of intervals) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'Just now';
};

const mapReviewToTestimonial = (
  item: FeaturedReviewApiItem,
  index: number
): Testimonial => {
  const firstName = item.userID?.firstName ?? 'Anonymous';
  const lastName = item.userID?.lastName ?? '';

  return {
    id: item._id,
    name: `${firstName} ${lastName}`.trim(),
    role: 'Verified Customer',
    timeAgo: timeAgo(item.createdAt),
    quote: item.comment,
    initials: getInitials(firstName, lastName),
    avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
    avatarUrl: item.userID?.avatar?.url,
  };
};

/* ---------------------------------------------------------------------------
   Decorative SVGs: heart badge icon, leaf doodle, heart speech-bubble doodle
--------------------------------------------------------------------------- */

const HeartIcon: React.FC<{ size?: number; filled?: boolean }> = ({
  size = 14,
  filled = true,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 20.3S3.5 15.3 3.5 9.4A4.9 4.9 0 0 1 12 6.3a4.9 4.9 0 0 1 8.5 3.1c0 5.9-8.5 10.9-8.5 10.9Z"
      fill={filled ? 'var(--color-primary)' : 'none'}
      stroke="var(--color-primary)"
      strokeWidth={filled ? 0 : 1.8}
    />
  </svg>
);

const QuoteIcon = () => (
  <svg width="22" height="18" viewBox="0 0 32 24" fill="none">
    <path
      d="M3 24V14.8c0-5 2.7-8.7 8-11.2l1.8 3.3c-3.4 1.8-5 4-5 6.6h5V24H3Zm17 0V14.8c0-5 2.7-8.7 8-11.2l1.8 3.3c-3.4 1.8-5 4-5 6.6h5V24H20Z"
      fill="var(--color-primary)"
    />
  </svg>
);

const LeafDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 280 220" className={className} fill="none" aria-hidden>
    <path
      d="M10 210C30 150 55 130 90 120 S150 95 150 50"
      stroke="#bcd9a8"
      strokeWidth="2"
      strokeDasharray="2 9"
      strokeLinecap="round"
      fill="none"
    />
    <g transform="translate(95,55)">
      <path d="M30 0C24 14 24 26 30 40C36 26 36 14 30 0Z" fill="#a9cf94" opacity="0.85" />
      <path d="M30 14C18 14 8 18 0 26C12 30 22 28 30 14Z" fill="#bcd9a8" opacity="0.85" />
      <path d="M30 26C42 26 52 30 60 38C48 42 38 40 30 26Z" fill="#bcd9a8" opacity="0.85" />
      <path d="M30 6V42" stroke="#8fbf78" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  </svg>
);

const HeartBubbleDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 220 180" className={className} fill="none" aria-hidden>
    <rect x="10" y="10" width="120" height="84" rx="20" stroke="#bcd9a8" strokeWidth="2" fill="#fff" />
    <path d="M40 94 L40 118 L66 94 Z" fill="#fff" stroke="#bcd9a8" strokeWidth="2" />
    <path
      d="M70 38c-5-6-14-6-18 0-4 6-1 13 18 26 19-13 22-20 18-26-4-6-13-6-18 0Z"
      fill="#bcd9a8"
    />
    <path
      d="M132 120C150 110 168 112 182 128 S 210 145 212 128"
      stroke="#cfe3bb"
      strokeWidth="2"
      strokeDasharray="2 8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="205" cy="105" r="14" stroke="#cfe3bb" strokeWidth="2" fill="none" strokeDasharray="2 7" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Misc small icons (verified check)
--------------------------------------------------------------------------- */

const VerifiedCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.5l2.3 1.3 2.6-.2 1 2.4 2.4 1-.2 2.6L21.5 12l-1.4 2.2.2 2.6-2.4 1-1 2.4-2.6-.2L12 21.5l-2.3-1.5-2.6.2-1-2.4-2.4-1 .2-2.6L2.5 12l1.4-2.2-.2-2.6 2.4-1 1-2.4 2.6.2L12 2.5Z"
      fill="var(--color-primary)"
    />
    <path d="M8.5 12.3l2.2 2.2 4.5-4.8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Avatar (image if available, otherwise initials placeholder)
--------------------------------------------------------------------------- */

const Avatar: React.FC<{ initials: string; color: string; imageUrl?: string }> = ({
  initials,
  color,
  imageUrl,
}) => {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={initials}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#2c4a2f]"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   Testimonial card
--------------------------------------------------------------------------- */

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef3e6]">
      <QuoteIcon />
    </span>

    <p className="mt-5 flex-1 text-[15px] leading-relaxed text-gray-700">{item.quote}</p>

    <span className="mt-5 block h-[3px] w-8 rounded-full bg-[var(--color-primary)]" />

    <div className="mt-4 flex items-center gap-3">
      <Avatar initials={item.initials} color={item.avatarColor} imageUrl={item.avatarUrl} />
      <div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-bold text-gray-900">{item.name}</p>
          <VerifiedCheckIcon />
        </div>
        <p className="text-sm font-medium text-[var(--color-primary)]">{item.role}</p>
        <p className="text-xs text-gray-400">{item.timeAgo}</p>
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   Skeleton card (loading state, same layout so no jump)
--------------------------------------------------------------------------- */

const TestimonialSkeleton = () => (
  <div className="flex h-full animate-pulse flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <span className="h-10 w-10 rounded-full bg-gray-100" />
    <div className="mt-5 flex-1 space-y-2">
      <div className="h-3 w-full rounded bg-gray-100" />
      <div className="h-3 w-5/6 rounded bg-gray-100" />
      <div className="h-3 w-2/3 rounded bg-gray-100" />
    </div>
    <span className="mt-5 block h-[3px] w-8 rounded-full bg-gray-100" />
    <div className="mt-4 flex items-center gap-3">
      <div className="h-12 w-12 shrink-0 rounded-full bg-gray-100" />
      <div className="space-y-2">
        <div className="h-3 w-24 rounded bg-gray-100" />
        <div className="h-3 w-20 rounded bg-gray-100" />
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   Main component
--------------------------------------------------------------------------- */

const HappyCustomers: React.FC = () => {
  const { data, isLoading, isError } = useGetFeaturedReviewsQuery({ limit: 6 });

  const testimonials: Testimonial[] =
    data?.data?.map((item: FeaturedReviewApiItem, index: number) =>
      mapReviewToTestimonial(item, index)
    ) ?? [];

  // Duplicate the list so the marquee can loop seamlessly (no snap-back).
  const loopData = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  return (
    <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
      {/* decorative doodles */}
      <LeafDoodle className="pointer-events-none absolute left-0 top-16 hidden h-44 w-64 sm:block" />
      <HeartBubbleDoodle className="pointer-events-none absolute right-0 top-10 hidden h-40 w-56 sm:block" />

      <div className="relative mx-auto container">
        {/* ---------- heading ---------- */}
        <div className="text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-4 py-1.5 text-xs font-bold tracking-wide text-[var(--color-primary)]">
            <HeartIcon size={13} />
            OUR HAPPY CUSTOMERS
          </span>

          <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-[2.6rem]">
            Trusted by Thousands of
            <br />
            Happy Customers <HeartIcon size={28} filled={false} />
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm text-gray-500 sm:text-base">
            Real experiences from customers across Bangladesh
          </p>
        </div>

        {/* ---------- testimonial marquee (smooth, infinite, never snaps back) ---------- */}
        <div
          className="marquee-viewport relative mt-10 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
        >
          {isLoading && (
            <div className="flex w-max gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="w-[260px] shrink-0 sm:w-[300px] lg:w-[320px]">
                  <TestimonialSkeleton />
                </div>
              ))}
            </div>
          )}

          {!isLoading && isError && (
            <p className="py-10 text-center text-sm text-gray-400">
              রিভিউ লোড করা যায়নি। একটু পরে আবার চেষ্টা করো।
            </p>
          )}

          {!isLoading && !isError && loopData.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-400">
              এখনো কোনো ফিচার্ড রিভিউ নেই।
            </p>
          )}

          {!isLoading && !isError && loopData.length > 0 && (
            <div className="marquee-track flex w-max gap-5">
              {loopData.map((t, i) => (
                <div key={`${t.id}-${i}`} className="w-[260px] shrink-0 sm:w-[300px] lg:w-[320px]">
                  <TestimonialCard item={t} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Plain global <style>, NOT styled-jsx — avoids "styled-jsx not configured"
          issues in non-Next.js setups and keeps behavior predictable. */}
      <style>{`
        .marquee-track {
          animation-name: marquee-scroll;
          animation-duration: 40s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .marquee-viewport:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default HappyCustomers;