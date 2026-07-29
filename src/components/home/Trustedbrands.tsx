


// "use client";

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Brand Interface
// export interface Brand {
//   _id: string;
//   name: string;
//   slug: string;
//   logo: string;
//   description?: string;
//   status: string;
//   isFeatured: boolean;
//   showInHome: boolean;
//   showInMenu: boolean;
//   order: number;
//   metaTitle?: string;
//   metaDescription?: string;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v?: number;
//   productCount: number;
// }

// // Brands Skeleton Loader
// const BrandsSkeletonLoader = () => (
//   <div className="flex gap-6 overflow-hidden justify-center items-center">
//     {Array.from({ length: 6 }).map((_, index) => (
//       <div
//         key={index}
//         className="w-[150px] sm:w-[170px] md:w-[190px] lg:w-[200px] h-[160px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center space-y-3 animate-pulse shrink-0"
//       >
//         <div className="h-16 w-16 rounded-full bg-gray-200" />
//         <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
//       </div>
//     ))}
//   </div>
// );

// interface TrustedBrandsProps {
//   initialBrands?: Brand[];
// }

// const TrustedBrands: React.FC<TrustedBrandsProps> = ({ initialBrands = [] }) => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // ✅ Client mount হওয়ার আগ পর্যন্ত Skeleton লোডার দেখাবে
//   if (!isMounted) {
//     return (
//       <section className="relative py-16 bg-[#f8f9f6] overflow-hidden">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <span className="inline-block mb-3 px-5 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold rounded-full">
//               TOP BRANDS
//             </span>
//             <h2 className="text-4xl font-bold text-gray-900">
//               Trusted Brands, Quality You Can Trust
//             </h2>
//             <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//               We partner with the best brands to bring you authentic products every day.
//             </p>
//           </div>
//           <BrandsSkeletonLoader />
//         </div>
//       </section>
//     );
//   }

//   if (initialBrands.length === 0) {
//     return (
//       <section className="py-16 bg-[#f8f9f6]">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-gray-500">No brands to show right now.</p>
//         </div>
//       </section>
//     );
//   }

//   const loopBrands = [...initialBrands, ...initialBrands, ...initialBrands];

//   return (
//     <section className="relative py-16 bg-[#f8f9f6] overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <span className="inline-block mb-3 px-5 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold rounded-full">
//             TOP BRANDS
//           </span>
//           <h2 className="text-4xl font-bold text-gray-900">
//             Trusted Brands, Quality You Can Trust
//           </h2>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             We partner with the best brands to bring you authentic products every day.
//           </p>
//         </div>

//         <div className="marquee-wrapper">
//           <div className="marquee-track">
//             {loopBrands.map((brand: Brand, index: number) => (
//               <div key={`${brand._id}-${index}`} className="marquee-item">
//                 <Link
//                   href={`/brands/${brand.slug}`}
//                   className="group/card block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-full"
//                 >
//                   <div className="h-24 flex items-center justify-center mb-4">
//                     {brand.logo ? (
//                       <Image
//                         src={brand.logo}
//                         alt={brand.name}
//                         width={110}
//                         height={110}
//                         className="object-contain transition-transform group-hover/card:scale-110"
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div
//                         className="h-20 w-20 rounded-full flex items-center justify-center text-4xl font-bold text-white uppercase"
//                         style={{ backgroundColor: 'var(--color-primary)' }}
//                       >
//                         {brand.name?.slice(0, 1)}
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-xs text-[var(--color-primary)] font-medium text-center">
//                     {brand.productCount > 0 ? `${brand.productCount} Products` : '50+ Products'}
//                   </p>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .marquee-wrapper {
//           position: relative;
//           overflow: hidden;
//           mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
//           -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
//         }

//         .marquee-track {
//           display: flex;
//           gap: 24px;
//           width: max-content;
//           animation: marquee-scroll 45s linear infinite;
//         }

//         .marquee-item {
//           width: 150px;
//           flex-shrink: 0;
//         }

//         @media (min-width: 640px) {
//           .marquee-item {
//             width: 170px;
//           }
//         }

//         @media (min-width: 768px) {
//           .marquee-item {
//             width: 190px;
//           }
//         }

//         @media (min-width: 1024px) {
//           .marquee-item {
//             width: 200px;
//           }
//         }

//         @keyframes marquee-scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-33.33%);
//           }
//         }

//         .marquee-wrapper:hover .marquee-track {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TrustedBrands;



"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import SectionHeader from '../shared/SectionHeader';
import { BiLeaf } from 'react-icons/bi';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  status: string;
  isFeatured: boolean;
  showInHome: boolean;
  showInMenu: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  productCount: number;
}

const BrandsSkeletonLoader = () => (
  <div className="flex gap-4 overflow-hidden justify-center items-center">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="min-w-[120px] sm:min-w-[150px] md:min-w-[170px] lg:min-w-[190px] h-[140px] sm:h-[160px] bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center space-y-3 animate-pulse shrink-0"
      >
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gray-200" />
        <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
      </div>
    ))}
  </div>
);

interface TrustedBrandsProps {
  initialBrands?: Brand[];
}

const TrustedBrands: React.FC<TrustedBrandsProps> = ({ initialBrands = [] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="relative py-12 sm:py-16 bg-[#f8f9f6] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block mb-3 px-4 py-1.5 sm:px-5 sm:py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs sm:text-sm font-bold rounded-full">
              TOP BRANDS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Trusted Brands, Quality You Can Trust
            </h2>
          </div>
          <BrandsSkeletonLoader />
        </div>
      </section>
    );
  }

  if (initialBrands.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-[#f8f9f6]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">No brands to show right now.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 sm:py-10 bg-[#f8f9f6] overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Our Trusted Brands" 
          icon={<BiLeaf size={18} />} 
          actionLabel="See all" 
          onAction={() => router.push("/vegetables")} 
        />

        <div className="mt-6 mask-gradient">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={16}
            loop={true}
            speed={5000} // স্লাইড কত স্মুথ ও আস্তে চলবে (মিলি সেকেন্ড, বাড়াতে পারেন)
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            allowTouchMove={true} // ইউজার চাইলে হাত দিয়েও টানতে পারবে
            breakpoints={{
              640: { spaceBetween: 20 },
              768: { spaceBetween: 24 },
            }}
            className="trusted-brands-swiper py-2"
          >
            {initialBrands.map((brand: Brand) => (
              <SwiperSlide 
                key={brand._id} 
                style={{ width: '150px' }}
                className="sm:!w-[165px] md:!w-[185px] lg:!w-[195px] h-auto"
              >
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group/card block bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-full"
                >
                  <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center mb-3 sm:mb-4">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.name || "Brand logo"}
                        width={80}
                        height={80}
                        className="object-contain transition-transform group-hover/card:scale-110 w-12 h-12 sm:w-16 sm:h-16 md:w-[110px] md:h-[110px]"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        {brand.name?.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs text-[var(--color-primary)] font-medium text-center truncate w-full">
                    {brand.productCount > 0 ? `${brand.productCount} Products` : '50+ Products'}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        /* মারকিউ ইফেক্টকে লিনিয়ার করার জন্য */
        .trusted-brands-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }
      `}</style>
    </section>
  );
};

export default TrustedBrands;