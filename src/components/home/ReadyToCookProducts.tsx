"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import ProductCard from "../shared/ProductCard";
import ProductModal from "../shared/ProductModal";
import SectionHeader from "../shared/SectionHeader";
import { BiLeaf } from "react-icons/bi";
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

interface ReadyToCookProductsProps {
  initialProducts?: any[];
  categorySlug?: string;
}

const ReadyToCookProducts: React.FC<ReadyToCookProductsProps> = ({
  initialProducts = [],
  categorySlug = "ready-to-cook",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleSeeAll = () => {
    router.push(`/cat/${categorySlug}`);
  };

  const displayProducts = React.useMemo(() => {
    if (!initialProducts || initialProducts.length === 0) return [];
    if (initialProducts.length <= 6) {
      return [...initialProducts, ...initialProducts];
    }
    return initialProducts;
  }, [initialProducts]);

  if (!isMounted) {
    return (
      <section className="py-6 sm:py-8 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Ready to Cook"
            icon={<BiLeaf size={18} />}
            actionLabel="See all"
            onAction={handleSeeAll}
          />
          <div className="mt-2">
            <SkeletonLoader />
          </div>
        </div>
      </section>
    );
  }

  // If no products yet in this category
  if (!initialProducts || initialProducts.length === 0) {
    return (
      <section className="py-6 sm:py-8 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Ready to Cook"
            icon={<BiLeaf size={18} />}
            actionLabel="See all"
            onAction={handleSeeAll}
          />
          <div className="bg-[#f8faf6] border border-dashed border-[#619d23]/30 rounded-2xl p-6 sm:p-8 text-center my-2">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#619d23]/10 flex items-center justify-center text-[#619d23]">
              <BiLeaf size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              Ready to Cook আইটেম শীঘ্রই আসছে
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              আমাদের ফ্রেশ এবং স্বাস্থ্যকর রেডি-টু-কুক পণ্যগুলো খুব দ্রুতই এখানে যুক্ত হবে।
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Ready to Cook"
          icon={<BiLeaf size={18} />}
          actionLabel="See all"
          onAction={handleSeeAll}
        />

        {/* Products Slider */}
        <div className="-mx-2 mt-2 md:-mx-4">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={8}
            slidesPerView={3}
            centeredSlides={false}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 6,
                centeredSlides: false,
              },
              360: {
                slidesPerView: 3,
                spaceBetween: 8,
                centeredSlides: false,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 10,
                centeredSlides: false,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 14,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 16,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 24,
                centeredSlides: false,
              },
            }}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            speed={800}
            freeMode={true}
            grabCursor={true}
            slideToClickedSlide={false}
            className="ready-to-cook-products-swiper"
          >
            {displayProducts.map((product: any, idx: number) => (
              <SwiperSlide key={`${product._id}-${idx}`}>
                <div className="px-0.5">
                  <ProductCard
                    product={product}
                    onQuickView={() => handleQuickView(product)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </section>
  );
};

export default ReadyToCookProducts;
