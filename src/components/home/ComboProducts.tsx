"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { useGetProductsQuery, useGetProductByIdQuery } from "@/redux/api/productApi";
import ProductCard from "../shared/ProductCard";
import ProductModal from "../shared/ProductModal";
import "swiper/css";

// Skeleton Loader
const SkeletonLoader = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="bg-white rounded-xl md:rounded-2xl border border-gray-100 animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-t-xl md:rounded-t-2xl" />
        <div className="p-2 md:p-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

interface ComboProductsProps {
  initialProducts?: any[];
}

const ComboProducts: React.FC<ComboProductsProps> = ({ initialProducts }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Client-side mount check (Layout shift & FOUC আটকানোর জন্য)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // initialProducts থাকলে RTK Query API Call Skip হবে
  const { data, isLoading } = useGetProductsQuery(
    {
      limit: 10,
      productType: "combo",
      status: "active",
    },
    { skip: !!initialProducts }
  );

  // Quick View state
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const { data: selectedProductData } = useGetProductByIdQuery(
    selectedProductId as string,
    { skip: !selectedProductId }
  );

  const handleQuickView = (id: string) => {
    setSelectedProductId(id);
  };

  const closeModal = () => {
    setSelectedProductId(null);
  };

  const products = initialProducts || data?.data || [];

  // Transform API data to ProductCard props
  const transformedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.map((product: any) => {
      const price = product.salePrice || product.regularPrice;
      const mrp = product.regularPrice || 0;
      const discount = product.discountPercent || 0;

      return {
        id: product._id,
        name: product.name,
        image: product.thumbnail || "/placeholder.png",
        price: price,
        originalPrice: mrp,
        mrp: mrp,
        discount: discount > 0 ? discount : undefined,
        rating: product.rating || 0,
        reviews: product.numReviews || 0,
        categoryName: product.categoryID?.name || "",
        unit: product.unit?.shortName || "",
        isCombo: true,
        comboItems: product.comboItems || [],
      };
    });
  }, [products]);

  // Client mount না হওয়া পর্যন্ত অথবা initialProducts না থাকলে এবং RTK loading অবস্থায় Skeleton দেখাবে
  if (!isMounted || (!initialProducts && isLoading)) {
    return (
      <section className="py-8 md:py-12 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <span className="inline-block mb-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
              🔥 COMBO DEALS
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-[var(--color-text-primary)]">
              Combo Offers
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Save more with our special combo deals
            </p>
          </div>
          <SkeletonLoader />
        </div>
      </section>
    );
  }

  if (transformedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-[var(--color-background)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-block mb-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
            🔥 COMBO DEALS
          </span>
          <h2 className="text-xl md:text-3xl font-bold text-[var(--color-text-primary)]">
            Combo Offers
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Save more with our special combo deals
          </p>
        </div>

        {/* Combo Products Slider */}
        <div className="-mx-2 md:-mx-4">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
              1280: { slidesPerView: 6, spaceBetween: 24 },
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            speed={800}
            freeMode={true}
            grabCursor={true}
            className="combo-products-swiper"
          >
            {transformedProducts.map((product: any) => (
              <SwiperSlide key={product.id}>
                <div className="relative">
                  <span className="absolute top-2 left-2 z-20 bg-purple-600 text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full">
                    COMBO
                  </span>
                  <ProductCard
                    product={product}
                    onQuickView={() => handleQuickView(product.id)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProductId && selectedProductData?.data && (
        <ProductModal
          product={selectedProductData.data}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ComboProducts;