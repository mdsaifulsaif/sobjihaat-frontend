// "use client";
// import React from "react";
// import Image from "next/image";

// /* ---------- SVG Icons ---------- */
// const ClockIcon: React.FC<{ size?: number; className?: string }> = ({
//   size = 28,
//   className = "",
// }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
//     <path
//       d="M12 7V12L15 14"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const CalendarIcon: React.FC<{ size?: number; className?: string }> = ({
//   size = 28,
//   className = "",
// }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect x="4" y="5" width="16" height="17" rx="3" stroke="currentColor" strokeWidth="2" />
//     <path d="M8 3V7M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     <path d="M4 10H20" stroke="currentColor" strokeWidth="2" />
//   </svg>
// );

// const DeliveryBanner = () => {
//   return (
//     <section className="border-gray-100 bg-[#eef0f2] py-6">
//       <div className="container mx-auto px-4">
//         <div className="max-h-[180px] h-[180px] overflow-hidden   ">
//           <div className="flex items-center h-full w-full px-6 lg:px-8">
//             {/* LEFT - Scooter with Rider */}
//             <div className="flex items-center justify-center shrink-0">
//               <Image
//                 src="/dbaner.png"
//                 alt="Delivery Rider"
//                 width={300}
//                 height={180}
//                 priority
//                 className="w-[190px] lg:w-[260px] h-auto object-contain"
//               />
//             </div>

//             {/* CENTER - Main Text */}
//             <div className="flex-1 min-w-0 px-4 lg:px-6">
//               <h2 className="text-[20px] lg:text-[30px] leading-tight font-bold text-gray-900 whitespace-nowrap">
//                 Groceries Delivered
//               </h2>
//               <h2 className="text-[20px] lg:text-[30px] leading-tight font-bold text-[var(--color-primary)] whitespace-nowrap">
//                 In 60 Minutes Max!
//               </h2>
//               <p className="mt-1 text-gray-500 text-[12px] lg:text-[15px] whitespace-nowrap">
//                 Fresh and fast, right at your doorstep anytime.
//               </p>
//             </div>

//             {/* DIVIDER */}
//             <div className="hidden md:block w-px self-stretch bg-gray-300/70 my-8 shrink-0" />

//             {/* Set Your Time */}
//             <div className="hidden md:flex items-center gap-3 px-6 lg:px-8 shrink-0">
//               <div className="text-[var(--color-primary)] shrink-0">
//                 <ClockIcon size={34} />
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
//                   Set Your Time
//                 </p>
//                 <p className="text-xs text-gray-500 leading-tight mt-0.5 whitespace-nowrap">
//                   Choose the delivery
//                   <br />
//                   time that suits you.
//                 </p>
//               </div>
//             </div>

//             {/* DIVIDER */}
//             <div className="hidden lg:block w-px self-stretch bg-gray-300/70 my-8 shrink-0" />

//             {/* Order for Tomorrow */}
//             <div className="hidden lg:flex items-center gap-3 pl-6 lg:pl-8 shrink-0">
//               <div className="text-[var(--color-primary)] shrink-0">
//                 <CalendarIcon size={34} />
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
//                   Order for Tomorrow
//                 </p>
//                 <p className="text-xs text-gray-500 leading-tight mt-0.5 whitespace-nowrap">
//                   Pre-order today,
//                   <br />
//                   confirm by tomorrow.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DeliveryBanner;


"use client";
import React from "react";
import Image from "next/image";

/* ---------- SVG Icons ---------- */
const ClockIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7V12L15 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="5" width="16" height="17" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 3V7M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 10H20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DeliveryBanner = () => {
  return (
    <section className="border-gray-100 bg-[#eef0f2] py-6">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden">
          <div className="flex flex-col md:flex-row items-center h-full w-full gap-4 px-4 py-4 md:px-6 md:py-0 lg:px-8">
            {/* LEFT - Scooter with Rider */}
            <div className="flex items-center justify-center shrink-0">
              <Image
                src="/dbaner.png"
                alt="Delivery Rider"
                width={300}
                height={180}
                priority
                className="w-[140px] sm:w-[170px] md:w-[190px] lg:w-[260px] h-auto object-contain"
              />
            </div>

            {/* CENTER - Main Text */}
            <div className="flex-1 min-w-0 text-center md:text-left px-0 md:px-4 lg:px-6">
              <h2 className="text-[18px] sm:text-[20px] lg:text-[30px] leading-tight font-bold text-gray-900">
                Groceries Delivered
              </h2>
              <h2 className="text-[18px] sm:text-[20px] lg:text-[30px] leading-tight font-bold text-[var(--color-primary)]">
                In 60 Minutes Max!
              </h2>
              <p className="mt-1 text-gray-500 text-[12px] lg:text-[15px]">
                Fresh and fast, right at your doorstep anytime.
              </p>
            </div>

            {/* DIVIDER */}
            <div className="hidden md:block w-px self-stretch bg-gray-300/70 my-8 shrink-0" />

            {/* Set Your Time */}
            <div className="hidden md:flex items-center gap-3 px-6 lg:px-8 shrink-0">
              <div className="text-[var(--color-primary)] shrink-0">
                <ClockIcon size={34} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                  Set Your Time
                </p>
                <p className="text-xs text-gray-500 leading-tight mt-0.5 whitespace-nowrap">
                  Choose the delivery
                  <br />
                  time that suits you.
                </p>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="hidden lg:block w-px self-stretch bg-gray-300/70 my-8 shrink-0" />

            {/* Order for Tomorrow */}
            <div className="hidden lg:flex items-center gap-3 pl-6 lg:pl-8 shrink-0">
              <div className="text-[var(--color-primary)] shrink-0">
                <CalendarIcon size={34} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                  Order for Tomorrow
                </p>
                <p className="text-xs text-gray-500 leading-tight mt-0.5 whitespace-nowrap">
                  Pre-order today,
                  <br />
                  confirm by tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryBanner;