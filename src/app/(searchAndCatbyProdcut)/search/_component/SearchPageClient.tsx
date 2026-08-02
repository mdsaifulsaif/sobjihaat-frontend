// "use client";

// import ProductCard from "@/components/shared/ProductCard";
// import ProductModal from "@/components/shared/ProductModal";
// import { useGetProductsQuery } from "@/redux/api/productApi";
// import React, { useEffect, useRef, useState, useCallback } from "react";

// interface SearchPageClientProps {
//   query: string;
// }

// const SearchPageClient: React.FC<SearchPageClientProps> = ({ query }) => {
//   const [page, setPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

//   const observerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     setPage(1);
//   }, [query]);

//   const { data, isLoading, isFetching, error } = useGetProductsQuery(
//     { searchTerm: query, page, limit: 15 },
//     { skip: !query },
//   );

//   const products = data?.data || [];
//   const meta = data?.meta;
//   const hasMore = meta ? meta.page < meta.totalPage : false;

//   const loadMore = useCallback(() => {
//     if (hasMore && !isFetching) {
//       setPage((prev) => prev + 1);
//     }
//   }, [hasMore, isFetching]);

//   useEffect(() => {
//     const el = observerRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) loadMore();
//       },
//       { threshold: 0.5 },
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [loadMore]);

//   const handleQuickView = (product: any) => {
//     setSelectedProduct(product);
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <>
//       {/* Search Info Banner */}
//       {/* <div className="w-full h-25 md:h-30 rounded-3xl overflow-hidden relative bg-gradient-to-r from-[var(--color-primary)] to-purple-500 flex items-center px-5 md:px-8">
//         <div className="text-white">
//           <h1 className="text-xl md:text-3xl font-black">
//             "{query}" এর জন্য ফলাফল
//           </h1>
//           {meta && (
//             <p className="text-sm md:text-base opacity-90 mt-1">
//               {meta.total} টি প্রোডাক্ট পাওয়া গেছে
//             </p>
//           )}
//         </div>
//       </div> */}

//       <div className="mt-4">
//         {isLoading && page === 1 && (
//           <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
//             {[...Array(10)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-72 bg-gray-100 rounded-2xl animate-pulse"
//               />
//             ))}
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-12 text-gray-500">
//             সার্চ করতে সমস্যা হয়েছে।
//           </div>
//         )}

//         {!isLoading && !error && products.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             "{query}" এর সাথে মিলে এমন কোনো প্রোডাক্ট পাওয়া যায়নি।
//           </div>
//         )}

//         {products.length > 0 && (
//           <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4">
//             {products.map((product: any) => (
//               <div key={product._id} className="w-full">
//                 <ProductCard
//                   product={product}
//                   onQuickView={() => handleQuickView(product)}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {hasMore && (
//           <div ref={observerRef} className="w-full flex justify-center py-10">
//             <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
//           </div>
//         )}

//         {!hasMore && products.length > 0 && (
//           <p className="text-center text-gray-400 text-sm py-10">
//             আর কোনো প্রোডাক্ট নেই
//           </p>
//         )}
//       </div>

//       {selectedProduct && (
//         <ProductModal product={selectedProduct} onClose={closeModal} />
//       )}
//     </>
//   );
// };

// export default SearchPageClient;



"use client";

import ProductCard from "@/components/shared/ProductCard";
import ProductModal from "@/components/shared/ProductModal";
import { useGetProductsQuery } from "@/redux/api/productApi";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface SearchPageClientProps {
  query: string;
}

const SearchPageClient: React.FC<SearchPageClientProps> = ({ query }) => {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const { data, isLoading, isFetching, error } = useGetProductsQuery(
    { searchTerm: query, page, limit: 15 },
    { skip: !query },
  );

  const products = data?.data || [];
  const meta = data?.meta;
  const hasMore = meta ? meta.page < meta.totalPage : false;

  const loadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isFetching]);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="mt-4">
        {isLoading && page === 1 && (
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-gray-500">
            সার্চ করতে সমস্যা হয়েছে।
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            "{query}" এর সাথে মিলে এমন কোনো প্রোডাক্ট পাওয়া যায়নি।
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4">
            {products.map((product: any) => (
              <div key={product._id} className="w-full">
                <ProductCard
                  product={product}
                  onQuickView={() => handleQuickView(product)}
                />
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div ref={observerRef} className="w-full flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <p className="text-center text-gray-400 text-sm py-10">
            আর কোনো প্রোডাক্ট নেই
          </p>
        )}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default SearchPageClient;