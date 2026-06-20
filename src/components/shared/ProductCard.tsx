// "use client";

// import React from 'react';
// import Link from 'next/link';
// import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
// import { FaStar } from 'react-icons/fa';
// import { useAppDispatch } from '@/redux';
// import { addToCart } from '@/redux/slices/cartSlice';
// import { addToWishlist } from '@/redux/slices/wishlistSlice';

// interface Product {
//     id: number;
//     name: string;
//     image: string;
//     price: number;
//     originalPrice?: number;
//     mrp?: number;
//     discount?: number | string;
//     rating: number;
//     reviews: number;
//     categoryName?: string;
// }

// interface ProductCardProps {
//     product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//     const dispatch = useAppDispatch();

//     const handleAddToCart = (e: React.MouseEvent) => {
//         e.preventDefault();
//         dispatch(addToCart({
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             mrp: product.mrp || product.originalPrice || product.price,
//             image: product.image,
//             category: product.categoryName || 'General'
//         }));
//     };

//     const handleAddToWishlist = (e: React.MouseEvent) => {
//         e.preventDefault();
//         dispatch(addToWishlist({
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             mrp: product.mrp || product.originalPrice || product.price,
//             image: product.image,
//             category: product.categoryName || 'General',
//             rating: product.rating
//         }));
//     };

//     const currentPrice = product.price;
//     const oldPrice = product.mrp || product.originalPrice;
//     const discountText = product.discount || (oldPrice ? `${Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%` : null);

//     return (
//         <Link href={`/product/${product.id}`}>
//             <div className='group bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 relative flex flex-col h-full'>
//                 {/* Image Container */}
//                 <div className='relative aspect-[4/3] bg-gray-50/50 overflow-hidden'>
//                     {/* Discount Badge */}
//                     {discountText && (
//                         <span className='absolute top-3 left-3 bg-[#EA4335] text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase z-10 tracking-widest leading-none'>
//                             Sale {typeof discountText === 'number' ? `${discountText}%` : discountText}
//                         </span>
//                     )}

//                     {/* Product Image */}
//                     <img
//                         src={product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800'}
//                         alt={product.name}
//                         className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
//                         onError={(e) => {
//                             (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800';
//                         }}
//                     />

//                     {/* Hover Actions */}
//                     <div className='absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500'>
//                         <button
//                             onClick={handleAddToWishlist}
//                             className='w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-md shadow-sm flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-all'
//                         >
//                             <FiHeart size={18} />
//                         </button>
//                         <button className='w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-md shadow-sm flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-all'>
//                             <FiEye size={18} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className='p-5 pt-4 flex flex-col flex-1 border-t border-gray-50'>
//                     <div className='mb-3'>
//                         <h3 className='text-gray-900 font-bold text-sm group-hover:text-[var(--color-primary)] transition-colors line-clamp-1 mb-1.5'>
//                             {product.name}
//                         </h3>
//                         <div className='flex items-center gap-2'>
//                             <span className='text-gray-900 font-black text-base'>৳{currentPrice.toLocaleString()}</span>
//                             {oldPrice && (
//                                 <span className='text-gray-400 text-xs line-through font-medium'>৳{oldPrice.toLocaleString()}</span>
//                             )}
//                         </div>
//                     </div>

//                     <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-50'>
//                         {/* Rating */}
//                         <div className='flex items-center gap-1.5'>
//                             <div className='flex text-[#FF8A00]'>
//                                 {[...Array(5)].map((_, i) => (
//                                     <FaStar key={i} size={10} className={i < Math.floor(product.rating) ? 'text-[#FF8A00]' : 'text-gray-200'} />
//                                 ))}
//                             </div>
//                             <span className='text-gray-400 text-[10px] font-bold'>({product.reviews})</span>
//                         </div>

//                         {/* Add to Cart Button */}
//                         <button
//                             onClick={handleAddToCart}
//                             className='w-10 h-10 bg-gray-900 text-white rounded-md flex items-center justify-center hover:bg-[var(--color-primary)] transition-all shadow-lg shadow-gray-200 hover:shadow-[var(--color-primary)]/20 active:scale-95 group/btn'
//                         >
//                             <FiShoppingCart size={18} className='group-hover/btn:scale-110 transition-transform' />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// };

// export default ProductCard;





"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  mrp?: number;
  discount?: number | string;
  rating: number;
  reviews: number;
  categoryName?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isQuantityHovered, setIsQuantityHovered] = useState(false);

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id),
  );

  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        mrp: product.mrp || product.originalPrice || product.price,
        image: product.image,
        category: product.categoryName || "General",
      }),
    );
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 0) {
      dispatch(decreaseQuantity(product.id));
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    // wishlist logic here
  };

  const currentPrice = product.price;
  const oldPrice = product.mrp || product.originalPrice;
  const discountText =
    product.discount ||
    (oldPrice
      ? `${Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%`
      : null);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 relative flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-gray-50/50 overflow-hidden">
          {/* Discount Badge */}
          {discountText && (
            <span className="absolute top-3 left-3 bg-[#EA4335] text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase z-10 tracking-widest leading-none">
              Sale{" "}
              {typeof discountText === "number"
                ? `${discountText}%`
                : discountText}
            </span>
          )}

          {/* Product Image */}
          <img
            src={
              product.image ||
              "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800"
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800";
            }}
          />

          {/* Hover Actions (Heart & Eye) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <button
              onClick={handleAddToWishlist}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-md shadow-sm flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              <FiHeart size={18} />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-md shadow-sm flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-all">
              <FiEye size={18} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 pt-4 flex flex-col flex-1 border-t border-gray-50">
          <div className="mb-3">
            <h3 className="text-gray-900 font-bold text-sm group-hover:text-[var(--color-primary)] transition-colors line-clamp-1 mb-1.5">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-black text-base">
                ৳{currentPrice.toLocaleString()}
              </span>
              {oldPrice && (
                <span className="text-gray-400 text-xs line-through font-medium">
                  ৳{oldPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-[#FF8A00]">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={10}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-[#FF8A00]"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-400 text-[10px] font-bold">
                ({product.reviews})
              </span>
            </div>

            {/* Quantity Control in Review Row */}
            <div
              className="relative"
              onMouseEnter={() => setIsQuantityHovered(true)}
              onMouseLeave={() => setIsQuantityHovered(false)}
            >
              {quantity === 0 ? (
                /* Initial + Button */
                <button
                  onClick={handleAddToCart}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all active:scale-95"
                >
                  <FiShoppingCart size={20} />
                </button>
              ) : isQuantityHovered ? (
                /* Hover: - Quantity + */
                <div className="bg-white border border-gray-200 rounded-full shadow-md flex items-center px-1 py-1">
                  <button
                    onClick={handleDecrease}
                    className="w-9 h-9 flex items-center justify-center text-xl text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-all active:scale-90"
                  >
                    −
                  </button>
                  <span className="font-bold text-lg px-4 text-gray-900 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-9 h-9 flex items-center justify-center text-xl text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-all active:scale-90"
                  >
                    +
                  </button>
                </div>
              ) : (
                /* Normal State: Purple Circle with Number */
                <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full shadow-md flex items-center justify-center font-bold text-xl cursor-pointer border-2 border-white">
                  {quantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;