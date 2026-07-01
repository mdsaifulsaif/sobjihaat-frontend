
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useGetProductsByCategorySlugQuery, useGetProductByIdQuery } from "@/redux/api/productApi";
import ProductCard from "@/components/shared/ProductCard";
import ProductModal from "@/components/shared/ProductModal";

const CategoryPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(1);
  }, [slug]);

  const { data, isLoading, isFetching, error } = useGetProductsByCategorySlugQuery(
    { slug, page, limit: 15 },
    { skip: !slug }
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
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const { data: selectedProductData } = useGetProductByIdQuery(selectedProductId as string, {
    skip: !selectedProductId,
  });

  const handleQuickView = (id: string) => {
    setSelectedProductId(id);
  };

  const closeModal = () => {
    setSelectedProductId(null);
  };

  const categoryName = products[0]?.categoryDetails?.name || slug;

  return (
    <div className="w-full ">
      {/* Category Banner */}
      <div className="w-full h-32 md:h-40 rounded-2xl overflow-hidden mb-6 relative bg-gradient-to-r from-[var(--color-primary)] to-purple-500 flex items-center px-5 md:px-8">
        <div className="text-white">
          <h1 className="text-2xl md:text-4xl font-black capitalize">{categoryName}</h1>
          <p className="text-sm md:text-base opacity-90 mt-1">
            সেরা মানের প্রোডাক্ট, সেরা দামে
          </p>
        </div>
      </div>

      {isLoading && page === 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {error && <div className="text-center py-12 text-gray-500">কোনো প্রোডাক্ট পাওয়া যায়নি।</div>}

      {!isLoading && !error && products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          এই ক্যাটাগরিতে এখনো কোনো প্রোডাক্ট নেই।
        </div>
      )}


      {/* Product Grid - Flexbox Layout (Chaldal Style) */}
{products.length > 0 && (
  <div className="flex flex-wrap justify-start gap-3 md:gap-4">
    {products.map((product: any) => (
      <div 
        key={product._id} 
        /* mobile: calc((100% - 12px) / 2) -> স্ক্রিন অনুযায়ী ২ কলামে জায়গা নেবে (gap 12px হলে)
           md: 170px -> ট্যাবলেট বা বড় স্ক্রিনে ফিক্সড সাইজ
        */
        className="w-[calc(50%-6px)] sm:w-[calc(50%-6px)] md:w-[191px] lg:w-[191px] flex-shrink-0"
      >
        <ProductCard
          product={{
            id: product._id,
            name: product.name,
            image: product.thumbnail,
            price: product.salePrice > 0 ? product.salePrice : product.regularPrice,
            originalPrice: product.regularPrice,
            mrp: product.regularPrice,
            discount: product.discountPercent,
            rating: product.rating || 0,
            reviews: product.numReviews || 0,
            // categoryName: product.categoryDetails?.name,
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

      {hasMore && (
        <div ref={observerRef} className="w-full flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-10">আর কোনো প্রোডাক্ট নেই</p>
      )}

      {/* Quick View Modal */}
      {selectedProductId && selectedProductData?.data && (
        <ProductModal
          product={selectedProductData.data}
          onClose={closeModal}
          onAddToCart={(product, variant, qty) => console.log("Add to cart", product, variant, qty)}
          onBuyNow={(product, variant, qty) => console.log("Buy now", product, variant, qty)}
        />
      )}
    </div>
  );
};

export default CategoryPage;