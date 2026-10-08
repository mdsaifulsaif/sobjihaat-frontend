"use client";

import React, { useEffect, useRef, useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import ProductModal from "@/components/shared/ProductModal";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { FiSearch, FiX, FiRefreshCw, FiShoppingBag } from "react-icons/fi";

interface SearchPageClientProps {
  query?: string;
}

const SearchPageClient: React.FC<SearchPageClientProps> = ({ query = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read query directly from URL parameters (dynamic client update)
  const urlQuery = searchParams.get("q");
  const activeQuery = (urlQuery !== null ? urlQuery : query).trim();

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // When active query changes, reset page and list
  useEffect(() => {
    setPage(1);
    setAllProducts([]);
  }, [activeQuery]);

  // Fetch products — never skip! Empty query returns all products.
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery({
    searchTerm: activeQuery,
    page,
    limit: 16,
  });

  const meta = data?.meta;
  const hasMore = meta ? meta.page < meta.totalPage : false;

  // Append new page data or set initial page data
  useEffect(() => {
    if (!data?.data) return;

    if (page === 1) {
      setAllProducts(data.data);
    } else {
      setAllProducts((prev) => {
        const existingIds = new Set(prev.map((p: any) => p._id));
        const newUnique = data.data.filter((p: any) => !existingIds.has(p._id));
        return [...prev, ...newUnique];
      });
    }
  }, [data, page]);

  // Infinite scroll loader
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
      { threshold: 0.2 },
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

  const handleClearSearch = () => {
    startTransition(() => {
      router.replace("/search", { scroll: false });
    });
  };

  return (
    <div className="w-full pb-16">
      {/* Header Result Bar */}
      <div className=" mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
        <div>
          {activeQuery ? (
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2 flex-wrap">
              <span>ফলাফল:</span>
              <span className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-0.5 rounded-lg">
                &ldquo;{activeQuery}&rdquo;
              </span>
            </h1>
          ) : (
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <FiShoppingBag className="text-[var(--color-primary)]" />
              <span>সকল প্রোডাক্ট (All Products)</span>
            </h1>
          )}

          <p className="text-sm text-gray-500 font-medium mt-1">
            {isFetching && page === 1
              ? "প্রোডাক্ট লোড হচ্ছে..."
              : meta
              ? `${meta.total} টি প্রোডাক্ট পাওয়া গেছে`
              : `${allProducts.length} টি প্রোডাক্ট`}
          </p>
        </div>

        {activeQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-all border border-gray-200"
          >
            <FiX size={14} />
            <span>ফিল্টার ক্লিয়ার করুন (সকল প্রোডাক্ট দেখুন)</span>
          </button>
        )}
      </div>

      {/* Initial Loading Skeleton */}
      {isLoading && page === 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm animate-pulse flex flex-col justify-between h-72"
            >
              <div className="w-full h-36 bg-gray-150 rounded-xl mb-3" />
              <div className="space-y-2">
                <div className="w-3/4 h-4 bg-gray-150 rounded" />
                <div className="w-1/2 h-4 bg-gray-100 rounded" />
              </div>
              <div className="w-full h-8 bg-gray-100 rounded-xl mt-3" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto my-8">
          <p className="text-gray-700 font-semibold mb-4">
            প্রোডাক্ট লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all"
          >
            <FiRefreshCw size={16} /> পুনরায় চেষ্টা করুন
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && allProducts.length === 0 && (
        <div className="text-center py-16 px-6 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto my-8">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSearch size={28} />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {activeQuery
              ? `"${activeQuery}" এর সাথে মিলে এমন কোনো প্রোডাক্ট পাওয়া যায়নি`
              : "বর্তমানে কোনো প্রোডাক্ট নেই"}
          </h3>

          <p className="text-sm text-gray-500 font-medium mb-6">
            {activeQuery
              ? "বানান ঠিক আছে কিনা চেক করুন অথবা অন্য কোনো কীওয়ার্ড দিয়ে খুঁজুন।"
              : "নতুন প্রোডাক্ট শীঘ্রই যুক্ত করা হবে।"}
          </p>

          {activeQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-6 py-2.5 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-md"
            >
              সকল প্রোডাক্ট দেখুন
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      {allProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2.5 md:gap-4">
          {allProducts.map((product: any) => (
            <div key={product._id} className="w-full">
              <ProductCard
                product={product}
                onQuickView={() => handleQuickView(product)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Indicator */}
      {hasMore && (
        <div ref={observerRef} className="w-full flex justify-center py-12">
          <div className="flex items-center gap-3 text-sm font-bold text-gray-500 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-150">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-[var(--color-primary)] rounded-full animate-spin" />
            <span>আরও প্রোডাক্ট লোড হচ্ছে...</span>
          </div>
        </div>
      )}

      {!hasMore && allProducts.length > 0 && (
        <p className="text-center text-gray-400 text-sm font-medium py-12">
          সব প্রোডাক্ট দেখানো হয়েছে ✓
        </p>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchPageClient;