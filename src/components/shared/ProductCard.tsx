// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
// import { FaStar } from "react-icons/fa";
// import { useAppDispatch, useAppSelector } from "@/redux";
// import {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "@/redux/slices/cartSlice";

// interface Product {
//   id: number | string; // API theke _id (string) ashe, tai number | string both support kora holo
//   name: string;
//   image: string;
//   price: number;
//   originalPrice?: number;
//   mrp?: number;
//   discount?: number | string;
//   rating: number;
//   reviews: number;
//   categoryName?: string;
// }

// interface ProductCardProps {
//   product: Product;
//   onClick?: () => void; // Quick View (Eye icon) modal open korar jonno
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
//   const dispatch = useAppDispatch();
//   const [isQuantityHovered, setIsQuantityHovered] = useState(false);

//   const cartItem = useAppSelector((state) =>
//     state.cart.items.find((item) => item.id === product.id),
//   );

//   const quantity = cartItem?.quantity || 0;

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     dispatch(
//       addToCart({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         mrp: product.mrp || product.originalPrice || product.price,
//         image: product.image,
//         category: product.categoryName || "General",
//       }),
//     );
//   };

//   const handleIncrease = (e: React.MouseEvent) => {
//     e.preventDefault();
//     dispatch(increaseQuantity(product.id));
//   };

//   const handleDecrease = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (quantity > 0) {
//       dispatch(decreaseQuantity(product.id));
//     }
//   };

//   const handleAddToWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     // wishlist logic here
//   };

//   const handleQuickView = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onClick?.();
//   };

//   const currentPrice = product.price;
//   const oldPrice = product.mrp || product.originalPrice;
//   const discountText =
//     product.discount ||
//     (oldPrice
//       ? `${Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%`
//       : null);

//   return (
//     <Link href={`/product/${product.id}`}>
//       <div className="group bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 relative flex flex-col h-full">
//         {/* Image Container */}
//         <div className="relative aspect-[4/3] bg-gray-50/50 overflow-hidden">
//           {/* Discount Badge */}
//           {discountText && (
//             <span className="absolute top-3 left-3 bg-[#EA4335] text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase z-10 tracking-widest leading-none">
//               Sale{" "}
//               {typeof discountText === "number"
//                 ? `${discountText}%`
//                 : discountText}
//             </span>
//           )}

//           {/* Product Image */}
//           <img
//             src={
//               product.image ||
//               "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800"
//             }
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800";
//             }}
//           />

//           {/* Hover Actions (Heart & Eye) */}
//           <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
//             <button
//               onClick={handleAddToWishlist}
//               className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-md shadow-sm flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-all"
//             >
//               <FiHeart size={18} />
//             </button>
//             <button
//               onClick={handleQuickView}
//               className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-md shadow-sm flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-all"
//             >
//               <FiEye size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="p-5 pt-4 flex flex-col flex-1 border-t border-gray-50">
//           <div className="mb-3">
//             <h3 className="text-gray-900 font-bold text-sm group-hover:text-[var(--color-primary)] transition-colors line-clamp-1 mb-1.5">
//               {product.name}
//             </h3>
//             <div className="flex items-center gap-2">
//               <span className="text-gray-900 font-black text-base">
//                 ৳{currentPrice.toLocaleString()}
//               </span>
//               {oldPrice && (
//                 <span className="text-gray-400 text-xs line-through font-medium">
//                   ৳{oldPrice.toLocaleString()}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
//             {/* Rating */}
//             {/* <div className="flex items-center gap-1.5">
//               <div className="flex text-[#FF8A00]">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     size={10}
//                     className={
//                       i < Math.floor(product.rating)
//                         ? "text-[#FF8A00]"
//                         : "text-gray-200"
//                     }
//                   />
//                 ))}
//               </div>
//               <span className="text-gray-400 text-[10px] font-bold">
//                 ({product.reviews})
//               </span>
//             </div> */}

//             {/* Quantity Control in Review Row */}
//             <div
//               className="relative"
//               onMouseEnter={() => setIsQuantityHovered(true)}
//               onMouseLeave={() => setIsQuantityHovered(false)}
//             >
//               {quantity === 0 ? (
//                 /* Initial + Button */
//                 <button
//                   onClick={handleAddToCart}
//                   className="w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all active:scale-95"
//                 >
//                   <FiShoppingCart size={20} />
//                 </button>
//               ) : isQuantityHovered ? (
//                 /* Hover: - Quantity + */
//                 <div className="bg-white border border-gray-200 rounded-full shadow-md flex items-center px-1 py-1">
//                   <button
//                     onClick={handleDecrease}
//                     className="w-9 h-9 flex items-center justify-center text-xl text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-all active:scale-90"
//                   >
//                     −
//                   </button>
//                   <span className="font-bold text-lg px-4 text-gray-900 min-w-[28px] text-center">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={handleIncrease}
//                     className="w-9 h-9 flex items-center justify-center text-xl text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-all active:scale-90"
//                   >
//                     +
//                   </button>
//                 </div>
//               ) : (
//                 /* Normal State: Purple Circle with Number */
//                 <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full shadow-md flex items-center justify-center font-bold text-xl cursor-pointer border-2 border-white">
//                   {quantity}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

"use client";

import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";

interface Product {
  id: number | string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  mrp?: number;
  discount?: number | string;
  rating: number;
  reviews: number;
  categoryName?: string;
  unit?: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
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
    if (quantity > 0) dispatch(decreaseQuantity(product.id));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    // Wishlist logic এখানে যোগ করবেন
  };

  const oldPrice = product.mrp || product.originalPrice;
  const discountText =
    product.discount ||
    (oldPrice
      ? `${Math.round(((oldPrice - product.price) / oldPrice) * 100)}%`
      : null);

  return (
    // <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative h-full flex flex-col">
    //   {/* Image */}
    //   <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
    //     <img
    //       src={product.image}
    //       alt={product.name}
    //       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    //       onError={(e) => {
    //         (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800";
    //       }}
    //     />

    //     {discountText && (
    //       <span className="absolute top-3 left-3 bg-[#EA4335] text-white text-xs font-bold px-2.5 py-1 rounded-md z-10">
    //         {discountText} OFF
    //       </span>
    //     )}

    //     {/* Wishlist */}
    //     <button
    //       onClick={handleWishlist}
    //       className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-xl shadow flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all z-20"
    //     >
    //       <FiHeart size={17} />
    //     </button>

    //     {/* Quantity Controller */}
    //     <div
    //       className="absolute bottom-3 right-3 z-20"
    //       onMouseEnter={() => setIsQuantityHovered(true)}
    //       onMouseLeave={() => setIsQuantityHovered(false)}
    //     >
    //       {quantity === 0 ? (
    //         <button
    //           onClick={handleAddToCart}
    //           className="w-11 h-11 bg-[var(--color-primary)] hover:bg-[#4a7c1c] text-white rounded-2xl shadow-lg flex items-center justify-center transition-all active:scale-95"
    //         >
    //           <span className="text-3xl leading-none">+</span>
    //         </button>
    //       ) : isQuantityHovered ? (
    //         <div className="bg-white border border-gray-200 rounded-2xl shadow-md flex items-center px-1 py-1">
    //           <button onClick={handleDecrease} className="w-9 h-9 flex items-center justify-center text-2xl text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-xl">-</button>
    //           <span className="font-bold text-xl px-4 text-gray-900 min-w-[32px] text-center">{quantity}</span>
    //           <button onClick={handleIncrease} className="w-9 h-9 flex items-center justify-center text-2xl text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-xl">+</button>
    //         </div>
    //       ) : (
    //         <div
    //           onClick={handleIncrease}
    //           className="w-11 h-11 bg-[var(--color-primary)] text-white rounded-2xl shadow-lg flex items-center justify-center font-bold text-2xl cursor-pointer border-2 border-white"
    //         >
    //           {quantity}
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {/* Info */}
    //   <div className="p-4 flex-1 flex flex-col">
    //     <div className="cursor-pointer flex-1" onClick={onQuickView}>
    //       <div className="flex items-baseline  mb-4">
    //         <span className="text-xl font-bold text-[var(--color-primary)]">
    //           ৳{product.price}
    //         </span>
    //         {oldPrice && (
    //           <span className="text-gray-400 line-through text-sm">৳{oldPrice}</span>
    //         )}
    //       </div>

    //       <p className=" font-400 text-[14px] leading-tight mt-1.5 text-gray-900 line-clamp-2 hover:text-[var(--color-primary)] transition-colors mb-2">
    //         {product.name}
    //       </p>

    //       {product.categoryName && (
    //         <p className="text-gray-500 text-sm mt-0.5">({product.categoryName})</p>
    //       )}
    //     </div>

    //     {/* Bottom Info */}
    //     <div className="flex items-center justify-between mt-auto pt-2 mt-2 border-t border-gray-100">
    //       <div className="flex items-center gap-1">
    //         <span className="text-yellow-500 text-lg">★</span>
    //         <span className="font-medium text-sm">{product.rating}</span>
    //         <span className="text-gray-400 text-xs">({product.reviews})</span>
    //       </div>

    //       {product.unit && (
    //         <span className="text-xs bg-gray-100 px-3 py-1 rounded-lg text-gray-600 font-medium">
    //           {product.unit}
    //         </span>
    //       )}
    //     </div>
    //   </div>
    // </div>

  <div className="group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 relative h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.discount && (
          <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-[#EA4335] text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md z-10">
            {product.discount}% OFF
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-1.5 right-1.5 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white/90 rounded-lg md:rounded-xl shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition-all z-20"
        >
          <FiHeart className="w-3 h-3 md:w-[17px] md:h-[17px]" />
        </button>

        {/* Quantity Controller */}
        <div 
          className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20"
          onMouseEnter={() => setIsQuantityHovered(true)}
          onMouseLeave={() => setIsQuantityHovered(false)}
        >
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 md:w-11 md:h-11 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-95"
            >
              <span className="text-xl font-bold">+</span>
            </button>
          ) : isQuantityHovered ? (
            <div className="bg-white border border-[var(--color-primary)] rounded-xl md:rounded-2xl shadow-sm flex items-center py-0.5 px-1 md:py-1 md:px-2">
              <button onClick={handleDecrease} className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)]">-</button>
              <span className="font-bold text-sm md:text-xl px-2 text-gray-900">{quantity}</span>
              <button onClick={handleIncrease} className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)]">+</button>
            </div>
          ) : (
            <div 
              onClick={handleIncrease}
              className="w-8 h-8 md:w-11 md:h-11 bg-[var(--color-primary)] text-white rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-sm md:text-xl cursor-pointer shadow-lg"
            >
              {quantity}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-2 md:p-4 flex-1 flex flex-col">
        <div className="cursor-pointer flex-1" onClick={onQuickView}>
          <div className="flex flex-wrap items-baseline gap-2 mb-1 md:mb-2">
            <span className="text-sm md:text-xl font-bold text-[var(--color-primary)]">
              ৳{product.price}
            </span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-[10px] md:text-sm">৳{oldPrice}</span>
            )}
          </div>

          <p className="text-[11px] md:text-[14px] leading-tight text-gray-800 line-clamp-2 mt-0.5 md:mt-1">
            {product.name}
          </p>
        </div>

        {/* Bottom Info */}
        <div className="flex items-center justify-between mt-1 md:mt-auto pt-1 md:pt-2 border-t border-gray-50">
          <div className="flex items-center gap-0.5 md:gap-1">
            <span className="text-yellow-500 text-[10px] md:text-lg">★</span>
            <span className="font-medium text-[10px] md:text-sm text-gray-600">{product.rating}</span>
          </div>

          {product.unit && (
            <span className="text-[9px] md:text-xs bg-gray-50 px-1.5 py-0.5 md:px-3 md:py-1 rounded md:rounded-lg text-gray-500">
              {product.unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
