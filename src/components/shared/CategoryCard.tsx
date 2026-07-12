


// 'use client';

// import React from 'react';
// import Link from 'next/link';

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   productCount: number;
//   image?: string;
//   order: number;
// }

// const DefaultBadge = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M12 21c-5-1-8-5-8-10 0-2 .4-3.6 1-5 4 0 9 2 11 6 1.3 2.6 1 6-1 9-1 .8-2 .8-3 0Z"
//       stroke="var(--color-primary)"
//       strokeWidth="1.7"
//       strokeLinejoin="round"
//     />
//     <path d="M5 6c5 1 9 5 10 11" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
//   </svg>
// );

// const SimpleCategoryIllustration: React.FC<{ image?: string; name: string }> = ({ image, name }) => {
//   if (image) {
//     return <img src={image} alt={name} className="h-full w-full object-contain" />;
//   }
//   return (
//     <svg viewBox="0 0 100 100" className="h-full w-full">
//       <ellipse cx="50" cy="70" rx="30" ry="9" fill="#c89b5c" />
//       <circle cx="50" cy="45" r="18" fill="#5fb247" />
//     </svg>
//   );
// };

// const ArrowRightIcon: React.FC = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//     <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
//   const bgColors = ['#eef3e6', '#fdf1e3', '#f6f1e3', '#eef6f6', '#fbeae8', '#fdf2e1', '#eaf2fb', '#f1eefb', '#eaf3ec', '#fbeef3'];
//   const bgIndex = parseInt(item._id.slice(-2), 16) % bgColors.length;
//   const imageBg = bgColors[bgIndex];

//   return (
//     <Link
//       href={`/category/${item.slug}`}
//       className="group flex h-full flex-col items-center rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
//     >
//       {/* Square Image Container */}
//       <div
//         className="relative flex h-28 w-28 items-center justify-center rounded-2xl overflow-hidden bg-white sm:h-32 sm:w-32"
//         style={{ backgroundColor: imageBg }}
//       >
//         <div className="h-20 w-20 sm:h-24 sm:w-24 transition-transform group-hover:scale-110">
//           <SimpleCategoryIllustration image={item.image} name={item.name} />
//         </div>

//         {/* Badge */}
//         <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white shadow">
//           <DefaultBadge />
//         </span>
//       </div>

//       {/* Content - Fixed Height */}
//       <div className="mt-4 flex h-[72px] flex-col items-center justify-center text-center">
//         <h3 className="line-clamp-2 font-semibold text-gray-900 text-[13px] leading-tight sm:text-sm">
//           {item.name}
//         </h3>
//         <p className="mt-1 text-xs text-gray-500">
//           {item.productCount} {item.productCount === 1 ? 'Product' : 'Products'}
//         </p>
//       </div>

//       {/* Arrow - Hidden on Mobile */}
//       <div className="mt-auto hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-[#eef3e6] text-[var(--color-primary)] transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white">
//         <ArrowRightIcon />
//       </div>
//     </Link>
//   );
// };

// export default CategoryCard;
// components/shared/CategoryCard.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  _id: string;
  name: string;
  slug: string;
  productCount: number;
  image?: string;
  order: number;
  status?: string;
  isDeleted?: boolean;
}

const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
  // '#eef3e6', '#fdf1e3', '#f6f1e3', '#eef6f6', '#fbeae8', '#fdf2e1', '#eaf2fb', '#f1eefb', '#eaf3ec', '#fbeef3'
  const bgColors = ['#ffff'];
  const bgIndex = parseInt(item._id.slice(-2), 16) % bgColors.length;
  const imageBg = bgColors[bgIndex];

  return (
    <Link
      href={`/category/${item.slug}`}
      className="group block rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
    >
      {/* Square Image Container - 1:1 Ratio */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl" style={{ backgroundColor: imageBg }}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 15vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-16 w-16">
              <ellipse cx="50" cy="70" rx="30" ry="9" fill="#c89b5c" />
              <circle cx="50" cy="45" r="18" fill="#5fb247" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-2.5 text-center">
        <h3 className="line-clamp-1 font-semibold text-gray-900 text-xs sm:text-sm">
          {item.name}
        </h3>
        <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
          {item.productCount} {item.productCount === 1 ? 'Product' : 'Products'}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;