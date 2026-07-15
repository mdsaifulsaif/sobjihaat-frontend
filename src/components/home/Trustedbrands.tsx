
// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useGetAllBrandsQuery } from '@/redux/api/brandApi';

// const TrustedBrands = () => {
//   const { data: brandsResponse, isLoading } = useGetAllBrandsQuery({
//     page: 1,
//     limit: 20,
//   });

//   const brands = brandsResponse?.data || [];
//   // Duplicate the list so the marquee can loop seamlessly (no snap-back).
//   const loopBrands = brands.length > 0 ? [...brands, ...brands] : [];

//   if (isLoading) {
//     return (
//       <section className="py-16 bg-[#f8f9f6]">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-gray-500">Loading trusted brands...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative py-16 bg-[#f8f9f6]">
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

//         {brands.length === 0 ? (
//           <p className="text-center text-gray-500">No brands to show right now.</p>
//         ) : (
//           <div
//             className="group relative -mx-4 overflow-hidden"
//             style={{
//               maskImage:
//                 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
//               WebkitMaskImage:
//                 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
//             }}
//           >
//             <div className="brands-marquee-track flex w-max gap-6 px-4">
//               {loopBrands.map((brand: any, i: number) => (
//                 <div
//                   key={`${brand._id}-${i}`}
//                   className="w-[150px] shrink-0 sm:w-[170px] md:w-[190px] lg:w-[200px]"
//                 >
//                   <Link
//                     href={`/brands/${brand.slug}`}
//                     className="group/card block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-full"
//                   >
//                     <div className="h-24 flex items-center justify-center mb-4">
//                       {brand.logo ? (
//                         <Image
//                           src={brand.logo}
//                           alt={brand.name}
//                           width={110}
//                           height={110}
//                           className="object-contain transition-transform group-hover/card:scale-110"
//                         />
//                       ) : (
//                         <div
//                           className="h-20 w-20 rounded-full flex items-center justify-center text-4xl font-bold text-white"
//                           style={{ backgroundColor: 'var(--color-primary)' }}
//                         >
//                           {brand.name.slice(0, 1)}
//                         </div>
//                       )}
//                     </div>

//                     <p className="text-xs text-[var(--color-primary)] font-medium text-center">
//                       {brand.productCount || '50+'} Products
//                     </p>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .brands-marquee-track {
//           animation: brands-marquee-scroll 30s linear infinite;
//         }
//         .group:hover .brands-marquee-track {
//           animation-play-state: paused;
//         }
//         @keyframes brands-marquee-scroll {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .brands-marquee-track {
//             animation: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TrustedBrands;


"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetAllBrandsQuery } from '@/redux/api/brandApi';

const TrustedBrands = () => {
  const { data: brandsResponse, isLoading } = useGetAllBrandsQuery({
    page: 1,
    limit: 20,
  });

  const brands = brandsResponse?.data || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-[#f8f9f6]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading trusted brands...</p>
        </div>
      </section>
    );
  }

  if (brands.length === 0) {
    return (
      <section className="py-16 bg-[#f8f9f6]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">No brands to show right now.</p>
        </div>
      </section>
    );
  }

  // ✅ 3 বার ডুপ্লিকেট করুন - smooth loop এর জন্য
  const loopBrands = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-16 bg-[#f8f9f6] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-5 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold rounded-full">
            TOP BRANDS
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Trusted Brands, Quality You Can Trust
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We partner with the best brands to bring you authentic products every day.
          </p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track">
            {loopBrands.map((brand: any, index: number) => (
              <div key={`${brand._id}-${index}`} className="marquee-item">
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group/card block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-full"
                >
                  <div className="h-24 flex items-center justify-center mb-4">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={110}
                        height={110}
                        className="object-contain transition-transform group-hover/card:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="h-20 w-20 rounded-full flex items-center justify-center text-4xl font-bold text-white"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        {brand.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-primary)] font-medium text-center">
                    {brand.productCount || '50+'} Products
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
        }

        .marquee-item {
          width: 150px;
          flex-shrink: 0;
        }

        @media (min-width: 640px) {
          .marquee-item {
            width: 170px;
          }
        }

        @media (min-width: 768px) {
          .marquee-item {
            width: 190px;
          }
        }

        @media (min-width: 1024px) {
          .marquee-item {
            width: 200px;
          }
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        /* Hover করলে থামবে */
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustedBrands;