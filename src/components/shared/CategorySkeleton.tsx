// components/shared/CategorySkeleton.tsx
'use client';

import React from 'react';

const CategorySkeleton: React.FC = () => {
  return (
    <div className="block rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      {/* Square Image Skeleton - 1:1 Ratio */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M3 3a2 2 0 012-2h14a2 2 0 012 2v18a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm4 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mt-2.5 space-y-1.5">
        <div className="mx-auto h-3 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="mx-auto h-2 w-1/2 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;