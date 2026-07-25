

// "use client";

// import React, { useState } from "react";
// import { FiHeart } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "@/redux";
// import {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "@/redux/slices/cartSlice";

// interface Product {
//   id: number | string;
//   name: string;
//   image: string;
//   price: number;
//   originalPrice?: number;
//   mrp?: number;
//   discount?: number | string;
//   rating: number;
//   reviews: number;
//   categoryName?: string;
//   unit?: string;
// }

// interface ProductCardProps {
//   product: Product;
//   onQuickView?: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
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
//     if (quantity > 0) dispatch(decreaseQuantity(product.id));
//   };

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     // Wishlist logic এখানে যোগ করবেন
//   };

//   const oldPrice = product.mrp || product.originalPrice;
//   const discountText =
//     product.discount ||
//     (oldPrice
//       ? `${Math.round(((oldPrice - product.price) / oldPrice) * 100)}%`
//       : null);

//   return (
  

//   <div className="group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 relative h-full flex flex-col">
//       {/* Image */}
//       <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 overflow-hidden">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />

//         {product.discount && (
//           <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-[#EA4335] text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md z-10">
//             {product.discount}% OFF
//           </span>
//         )}

//         <button
//           onClick={handleWishlist}
//           className="absolute top-1.5 right-1.5 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white/90 rounded-lg md:rounded-xl shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition-all z-20"
//         >
//           <FiHeart className="w-3 h-3 md:w-[17px] md:h-[17px]" />
//         </button>

//         {/* Quantity Controller */}
//         <div 
//           className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20"
//           onMouseEnter={() => setIsQuantityHovered(true)}
//           onMouseLeave={() => setIsQuantityHovered(false)}
//         >
//           {quantity === 0 ? (
//             <button
//               onClick={handleAddToCart}
//               className="w-8 h-8 md:w-11 md:h-11 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-95"
//             >
//               <span className="text-xl font-bold">+</span>
//             </button>
//           ) : isQuantityHovered ? (
//             <div className="bg-white border border-[var(--color-primary)] rounded-xl md:rounded-2xl shadow-sm flex items-center py-0.5 px-1 md:py-1 md:px-2">
//               <button onClick={handleDecrease} className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)]">-</button>
//               <span className="font-bold text-sm md:text-xl px-2 text-gray-900">{quantity}</span>
//               <button onClick={handleIncrease} className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)]">+</button>
//             </div>
//           ) : (
//             <div 
//               onClick={handleIncrease}
//               className="w-8 h-8 md:w-11 md:h-11 bg-[var(--color-primary)] text-white rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-sm md:text-xl cursor-pointer shadow-lg"
//             >
//               {quantity}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-2 md:p-4 flex-1 flex flex-col">
//         <div className="cursor-pointer flex-1" onClick={onQuickView}>
//           <div className="flex flex-wrap items-baseline gap-2 mb-1 md:mb-2">
//             <span className="text-sm md:text-xl font-bold text-[var(--color-primary)]">
//               ৳{product.price}
//             </span>
//             {oldPrice && (
//               <span className="text-gray-400 line-through text-[10px] md:text-sm">৳{oldPrice}</span>
//             )}
//           </div>

//           <p className="text-[11px] md:text-[14px] leading-tight text-gray-800 line-clamp-2 mt-0.5 md:mt-1">
//             {product.name}
//           </p>
//         </div>

//         {/* Bottom Info */}
//         <div className="flex items-center justify-between mt-1 md:mt-auto pt-1 md:pt-2 border-t border-gray-50">
//           <div className="flex items-center gap-0.5 md:gap-1">
//             <span className="text-yellow-500 text-[10px] md:text-lg">★</span>
//             <span className="font-medium text-[10px] md:text-sm text-gray-600">{product.rating}</span>
//           </div>

//           {product.unit && (
//             <span className="text-[9px] md:text-xs bg-gray-50 px-1.5 py-0.5 md:px-3 md:py-1 rounded md:rounded-lg text-gray-500">
//               {product.unit}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
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
  productID?: string;
  stock?: number; // ✅ stock যোগ করা হয়েছে
}

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const dispatch = useAppDispatch();
  const [isQuantityHovered, setIsQuantityHovered] = useState(false);

  // স্টক চেক - stock না থাকলে true ধরা হবে (পুরোনো যেসব জায়গায় stock নেই সেগুলোর জন্য)
  const isInStock = product.stock === undefined ? true : (product.stock ?? 0) > 0;

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id),
  );

  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isInStock) return;

    dispatch(
      addToCart({
        id: product.id,
        productID: product.productID || String(product.id),
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
    if (!isInStock) return;
    if (quantity < (product.stock || 999)) {
      dispatch(increaseQuantity(product.id));
    }
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 0) dispatch(decreaseQuantity(product.id));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const oldPrice = product.mrp || product.originalPrice;

  return (
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
              disabled={!isInStock}
              className={`w-8 h-8 md:w-11 md:h-11 bg-white border-2 border-[var(--color-primary)] rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
                isInStock 
                  ? 'text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white' 
                  : 'text-gray-400 border-gray-300 cursor-not-allowed opacity-60'
              }`}
            >
              <span className="text-xl font-bold">+</span>
            </button>
          ) : isQuantityHovered ? (
            <div className="bg-white border border-[var(--color-primary)] rounded-xl md:rounded-2xl shadow-sm flex items-center py-0.5 px-1 md:py-1 md:px-2">
              <button 
                onClick={handleDecrease} 
                className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)]"
              >
                -
              </button>
              <span className="font-bold text-sm md:text-xl px-2 text-gray-900">{quantity}</span>
              <button 
                onClick={handleIncrease} 
                disabled={!isInStock || quantity >= (product.stock || 999)}
                className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)] ${
                  (!isInStock || quantity >= (product.stock || 999)) ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                +
              </button>
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