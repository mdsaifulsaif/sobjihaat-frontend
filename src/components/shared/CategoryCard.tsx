// 'use client';



// import React from 'react';

// interface Category {
//   _id: string;
//   name: string;
//   productCount: number;
//   image?: string;
//   order: number;
// }

// const DefaultBadge = () => (
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

// const SimpleCategoryIllustration: React.FC<{ image?: string }> = ({ image }) => {
//   if (image) {
//     return (
//       <img
//         src={image}
//         alt="category"
//         className="h-full w-full object-contain"
//       />
//     );
//   }

//   return (
//     <svg viewBox="0 0 100 100" className="h-full w-full">
//       <ellipse cx="50" cy="70" rx="30" ry="9" fill="#c89b5c" />
//       <circle cx="50" cy="45" r="18" fill="#5fb247" />
//     </svg>
//   );
// };

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

// // const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
// //   const bgColors = ['#eef3e6', '#fdf1e3', '#f6f1e3', '#eef6f6', '#fbeae8', '#fdf2e1', '#eaf2fb', '#f1eefb', '#eaf3ec', '#fbeef3'];
// //   const bgIndex = parseInt(item._id.slice(-2), 16) % bgColors.length;
// //   const imageBg = bgColors[bgIndex];

// //   return (
// //     <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
// //       <div
// //         className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full sm:h-36 sm:w-36"
// //         style={{ backgroundColor: imageBg }}
// //       >
// //         <div className="h-20 w-20 sm:h-24 sm:w-24">
// //           <SimpleCategoryIllustration image={item.image} />
// //         </div>
// //         <span className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
// //           <DefaultBadge />
// //         </span>
// //       </div>

// //       <h3 className="mt-4 text-center text-base font-bold text-gray-900">{item.name}</h3>
// //       <p className="mt-1 text-center text-sm text-gray-500">
// //         {item.productCount} {item.productCount === 1 ? 'Item' : 'Items'}
// //       </p>

// //       <div className="mt-3 flex justify-center">
// //         <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3e6] transition group-hover:bg-[var(--color-primary)]">
// //           <ArrowRightIcon />
// //         </span>
// //       </div>
// //     </div>
// //   );
// // };

// const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
//   const bgColors = ['#eef3e6', '#fdf1e3', '#f6f1e3', '#eef6f6', '#fbeae8', '#fdf2e1', '#eaf2fb', '#f1eefb', '#eaf3ec', '#fbeef3'];
//   const bgIndex = parseInt(item._id.slice(-2), 16) % bgColors.length;
//   const imageBg = bgColors[bgIndex];

//   return (
//     <div className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
//       {/* Image Area - Bigger */}
//       <div
//         className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-3xl sm:h-44 sm:w-44"
//         style={{ backgroundColor: imageBg }}
//       >
//         <div className="h-28 w-28 sm:h-32 sm:w-32 transition-transform group-hover:scale-110">
//           <SimpleCategoryIllustration image={item.image} />
//         </div>

//         {/* Decorative Badge */}
//         <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm">
//           <DefaultBadge />
//         </span>
//       </div>

//       {/* Content */}
//       <div className="mt-6 text-center">
//         <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.name}</h3>
//         <p className="mt-1 text-sm text-gray-500">
//           {item.productCount} {item.productCount === 1 ? 'Product' : 'Products'}
//         </p>
//       </div>

//       {/* Arrow */}
//       <div className="mt-auto flex justify-center pt-4">
//         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3e6] text-[var(--color-primary)] transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white">
//           <ArrowRightIcon />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;




// 'use client';

// import Link from 'next/link';
// import React from 'react';

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

// const ArrowRightIcon: React.FC<{ size?: number }> = ({ size = 13 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <path
//       d="M5 12h14M13 6l6 6-6 6"
//       stroke="currentColor"
//       strokeWidth="2.2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
//   const bgColors = [
//     '#eef3e6', '#fdf1e3', '#f6f1e3', '#eef6f6',
//     '#fbeae8', '#fdf2e1', '#eaf2fb', '#f1eefb',
//     '#eaf3ec', '#fbeef3',
//   ];
//   const bgIndex = parseInt(item._id.slice(-2), 16) % bgColors.length;
//   const imageBg = bgColors[bgIndex];

//   return (
//     <Link
//       href={`/category/${item.slug}`}
//       className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-2 py-3 md:px-3 md:py-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
//     >
//       {/* Image Area */}
//       <div
//         className="relative flex items-center justify-center rounded-2xl overflow-hidden
//           w-16 h-16
//           sm:w-20 sm:h-20
//           md:w-24 md:h-24
//           lg:w-28 lg:h-28"
//         style={{ backgroundColor: imageBg }}
//       >
//         <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-18 lg:h-18 transition-transform group-hover:scale-110">
//           <SimpleCategoryIllustration image={item.image} name={item.name} />
//         </div>

//         {/* Badge */}
//         <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm">
//           <DefaultBadge />
//         </span>
//       </div>

//       {/* Name */}
//       <h3 className="mt-2 text-center font-semibold text-gray-800 line-clamp-2
//         text-[10px] leading-tight
//         sm:text-[11px]
//         md:text-xs
//         lg:text-sm">
//         {item.name}
//       </h3>

//       {/* Product count */}
//       <p className="mt-0.5 text-center text-gray-400
//         text-[9px]
//         sm:text-[10px]
//         md:text-xs">
//         {item.productCount} {item.productCount === 1 ? 'Product' : 'Products'}
//       </p>

//       {/* Arrow */}
//       <div className="mt-2 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-[#eef3e6] text-[var(--color-primary)] transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white">
//         <ArrowRightIcon size={11} />
//       </div>
//     </Link>
//   );
// };

// export default CategoryCard;




'use client';

import React from 'react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  slug: string;
  productCount: number;
  image?: string;
  order: number;
}

const DefaultBadge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21c-5-1-8-5-8-10 0-2 .4-3.6 1-5 4 0 9 2 11 6 1.3 2.6 1 6-1 9-1 .8-2 .8-3 0Z"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M5 6c5 1 9 5 10 11" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SimpleCategoryIllustration: React.FC<{ image?: string; name: string }> = ({ image, name }) => {
  if (image) {
    return <img src={image} alt={name} className="h-full w-full object-contain" />;
  }
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <ellipse cx="50" cy="70" rx="30" ry="9" fill="#c89b5c" />
      <circle cx="50" cy="45" r="18" fill="#5fb247" />
    </svg>
  );
};

const ArrowRightIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
  const bgColors = ['#eef3e6', '#fdf1e3', '#f6f1e3', '#eef6f6', '#fbeae8', '#fdf2e1', '#eaf2fb', '#f1eefb', '#eaf3ec', '#fbeef3'];
  const bgIndex = parseInt(item._id.slice(-2), 16) % bgColors.length;
  const imageBg = bgColors[bgIndex];

  return (
    <Link
      href={`/category/${item.slug}`}
      className="group flex h-full flex-col items-center rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
    >
      {/* Square Image Container */}
      <div
        className="relative flex h-28 w-28 items-center justify-center rounded-2xl overflow-hidden bg-white sm:h-32 sm:w-32"
        style={{ backgroundColor: imageBg }}
      >
        <div className="h-20 w-20 sm:h-24 sm:w-24 transition-transform group-hover:scale-110">
          <SimpleCategoryIllustration image={item.image} name={item.name} />
        </div>

        {/* Badge */}
        <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white shadow">
          <DefaultBadge />
        </span>
      </div>

      {/* Content - Fixed Height */}
      <div className="mt-4 flex h-[72px] flex-col items-center justify-center text-center">
        <h3 className="line-clamp-2 font-semibold text-gray-900 text-[13px] leading-tight sm:text-sm">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {item.productCount} {item.productCount === 1 ? 'Product' : 'Products'}
        </p>
      </div>

      {/* Arrow - Hidden on Mobile */}
      <div className="mt-auto hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-[#eef3e6] text-[var(--color-primary)] transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white">
        <ArrowRightIcon />
      </div>
    </Link>
  );
};

export default CategoryCard;