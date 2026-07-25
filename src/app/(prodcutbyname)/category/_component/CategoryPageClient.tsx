"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  useGetProductsByCategorySlugQuery,
} from "@/redux/api/productApi";
import ProductCard from "@/components/shared/ProductCard";
import ProductModal from "@/components/shared/ProductModal";
import SidebarCategories from "@/components/shared/SidebarCategories";

interface CategoryPageClientProps {
  slug: string;
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({ slug }) => {
  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(1);
  }, [slug]);

  const { data, isLoading, isFetching, error } =
    useGetProductsByCategorySlugQuery(
      { slug, page, limit: 15 },
      { skip: !slug },
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

  const handleQuickView = (id: string) => {
    setSelectedProductId(id);
  };

  const closeModal = () => {
    setSelectedProductId(null);
  };

  const categoryName = products[0]?.categoryDetails?.name || slug;

  return (
    <div className="flex items-start bg-white min-h-screen container">
      {/* Static Sidebar */}
      <aside
        className="hidden md:block w-[200px] lg:w-[200px] flex-shrink-0 sticky overflow-y-auto border-r border-gray-100 bg-white custom-scrollbar z-30"
        style={{
          top: "var(--header-height, 74px)",
          height: "calc(100vh - var(--header-height, 74px))",
        }}
      >
        <SidebarCategories />
      </aside>

      {/* Right Side - Product Content */}
      <div className="flex-1 min-w-0 p-4">
        {/* Banner */}
        <div className="w-full h-25 md:h-30 rounded-3xl overflow-hidden relative bg-gradient-to-r from-[var(--color-primary)] to-purple-500 flex items-center px-5 md:px-8">
          <div className="text-white">
            <h1 className="text-2xl md:text-4xl font-black capitalize">
              {categoryName}
            </h1>
            <p className="text-sm md:text-base opacity-90 mt-1">
              সেরা মানের প্রোডাক্ট, সেরা দামে
            </p>
          </div>
        </div>

        <div className="mt-4">
          {/* Loading, Error, Empty States */}
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
              কোনো প্রোডাক্ট পাওয়া যায়নি।
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              এই ক্যাটাগরিতে এখনো কোনো প্রোডাক্ট নেই।
            </div>
          )}

          {/* Product Grid */}
          {products.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
              {products.map((product: any) => (
                <div key={product._id} className="w-full">
                  <ProductCard
                    product={{
                      id: product._id,
                      name: product.name,
                      image: product.thumbnail,
                      price:
                        product.salePrice > 0
                          ? product.salePrice
                          : product.regularPrice,
                      originalPrice: product.regularPrice,
                      mrp: product.regularPrice,
                      discount: product.discountPercent,
                      rating: product.rating || 0,
                      reviews: product.numReviews || 0,
                      unit: product.unitDetails?.shortName
                        ? `${product.weightOrVolume || 1} ${product.unitDetails.shortName}`
                        : product.unitDetails?.name || "1 pc",
                    }}
                    onQuickView={() => handleQuickView(product._id)}
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Infinite Scroll Loader */}
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
      </div>

      {/* Quick View Modal - শুধু productId পাস করা হচ্ছে */}
      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CategoryPageClient;