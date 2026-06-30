'use client';



import React from 'react';

interface Category {
  _id: string;
  name: string;
  productCount: number;
  image?: string;
  order: number;
}

const DefaultBadge = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21c-5-1-8-5-8-10 0-2 .4-3.6 1-5 4 0 9 2 11 6 1.3 2.6 1 6-1 9-1 .8-2 .8-3 0Z"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M5 6c5 1 9 5 10 11" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SimpleCategoryIllustration: React.FC<{ image?: string }> = ({ image }) => {
  if (image) {
    return (
      <img
        src={image}
        alt="category"
        className="h-full w-full object-contain"
      />
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <ellipse cx="50" cy="70" rx="30" ry="9" fill="#c89b5c" />
      <circle cx="50" cy="45" r="18" fill="#5fb247" />
    </svg>
  );
};

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

const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
  const bgColors = ['#eef3e6', '#fdf1e3', '#f6f1e3', '#eef6f6', '#fbeae8', '#fdf2e1', '#eaf2fb', '#f1eefb', '#eaf3ec', '#fbeef3'];
  const bgIndex = parseInt(item._id.slice(-2), 16) % bgColors.length;
  const imageBg = bgColors[bgIndex];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div
        className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full sm:h-36 sm:w-36"
        style={{ backgroundColor: imageBg }}
      >
        <div className="h-20 w-20 sm:h-24 sm:w-24">
          <SimpleCategoryIllustration image={item.image} />
        </div>
        <span className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
          <DefaultBadge />
        </span>
      </div>

      <h3 className="mt-4 text-center text-base font-bold text-gray-900">{item.name}</h3>
      <p className="mt-1 text-center text-sm text-gray-500">
        {item.productCount} {item.productCount === 1 ? 'Item' : 'Items'}
      </p>

      <div className="mt-3 flex justify-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3e6] transition group-hover:bg-[var(--color-primary)]">
          <ArrowRightIcon />
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;