
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
      href={`/cat/${item.slug}`}
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