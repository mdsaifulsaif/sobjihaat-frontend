
// "use client";

// import React, { useState } from "react";
// import { FiHeart } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "@/redux";
// import {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "@/redux/slices/cartSlice";

// interface ProductCardProps {
//   product: any; // পুরো product object
//   onQuickView?: () => void; // প্যারেন্ট থেকে আসবে
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
//   const dispatch = useAppDispatch();
//   const [isQuantityHovered, setIsQuantityHovered] = useState(false);

//   // ✅ সব ডেটা প্রসেস করা হচ্ছে এখানে
//   const productId = product._id || product.id;
//   const productName = product.name;
//   const productImage = product.thumbnail || product.image || "/placeholder.png";

//   // প্রাইস ক্যালকুলেশন
//   const salePrice = product.salePrice || 0;
//   const regularPrice = product.regularPrice || 0;
//   const price = salePrice > 0 ? salePrice : regularPrice;

//   // ডিসকাউন্ট ক্যালকুলেশন
//   const discountValue = product.discountPercent || 0;
//   const discountAmount =
//     discountValue > 0
//       ? discountValue
//       : regularPrice > 0 && price > 0
//         ? Math.round(((regularPrice - price) / regularPrice) * 100)
//         : 0;

//   // স্টক ক্যালকুলেশন
//   let totalStock = product.stock || 0;
//   if (product.variants && product.variants.length > 0) {
//     totalStock = product.variants.reduce(
//       (sum: number, v: any) => sum + (v.stock || 0),
//       0,
//     );
//   }
//   if (product.productType === "combo" && product.comboItems) {
//     totalStock = product.stock || 0;
//   }

//   const isInStock = totalStock > 0;


//   let unitText = "1 pc";
//   if (product.unitDetails) {
//     const weight = product.weightOrVolume || 1;
//     const unitName =
//       product.unitDetails.shortName || product.unitDetails.name || "";
//     unitText = unitName ? `${weight} ${unitName}` : "1 pc";
//   } else if (product.unit) {
//     unitText = typeof product.unit === "string" ? product.unit : "1 pc";
//   }

//   // রেটিং ক্যালকুলেশন
//   const rating = product.rating || 0;

//   // কার্ট আইটেম চেক
//   const cartItem = useAppSelector((state) =>
//     state.cart.items.find((item) => item.id === productId),
//   );
//   const quantity = cartItem?.quantity || 0;

//   // ✅ হ্যান্ডলার ফাংশন
//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isInStock) return;

//     dispatch(
//       addToCart({
//         id: productId,
//         productID: product.productID || String(productId),
//         name: productName,
//         price: price,
//         mrp: regularPrice || price,
//         image: productImage,
//         category:
//           product.categoryDetails?.name || product.categoryName || "General",
//       }),
//     );
//   };

//   const handleIncrease = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isInStock) return;
//     if (quantity < totalStock) {
//       dispatch(increaseQuantity(productId));
//     }
//   };

//   const handleDecrease = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (quantity > 0) dispatch(decreaseQuantity(productId));
//   };

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // wishlist functionality
//   };

//   return (
//     <div
//       className="group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 relative h-full flex flex-col cursor-pointer"
//       onClick={onQuickView}
//     >
//       {/* Image */}
//       <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 overflow-hidden">
//         <img
//           src={productImage}
//           alt={productName}
//           className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
//             !isInStock ? "opacity-50 grayscale-[30%]" : ""
//           }`}
//         />

//         {discountAmount > 0 && isInStock && (
//           <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-[#EA4335] text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md z-10">
//             {discountAmount}% OFF
//           </span>
//         )}

//         {!isInStock && (
//           <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-gray-900/80 text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md z-10">
//             Out of Stock
//           </span>
//         )}

//         <button
//           onClick={handleWishlist}
//           className="absolute top-1.5 right-1.5 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white/90 rounded-lg md:rounded-xl shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition-all z-20"
//         >
//           <FiHeart className="w-3 h-3 md:w-[17px] md:h-[17px]" />
//         </button>

//         {/* Quantity Controller */}
//         {isInStock && (
//           <div
//             className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20"
//             onMouseEnter={() => setIsQuantityHovered(true)}
//             onMouseLeave={() => setIsQuantityHovered(false)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {quantity === 0 ? (
//               <button
//                 onClick={handleAddToCart}
//                 className="w-8 h-8 md:w-11 md:h-11 bg-white border-2 border-[var(--color-primary)] rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-95 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
//               >
//                 <span className="text-xl font-bold">+</span>
//               </button>
//             ) : isQuantityHovered ? (
//               <div className="bg-white border border-[var(--color-primary)] rounded-xl md:rounded-2xl shadow-sm flex items-center py-0.5 px-1 md:py-1 md:px-2">
//                 <button
//                   onClick={handleDecrease}
//                   className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)]"
//                 >
//                   -
//                 </button>
//                 <span className="font-bold text-sm md:text-xl px-2 text-gray-900">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={handleIncrease}
//                   disabled={quantity >= totalStock}
//                   className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)] ${
//                     quantity >= totalStock
//                       ? "opacity-40 cursor-not-allowed"
//                       : ""
//                   }`}
//                 >
//                   +
//                 </button>
//               </div>
//             ) : (
//               <div
//                 onClick={handleIncrease}
//                 className="w-8 h-8 md:w-11 md:h-11 bg-[var(--color-primary)] text-white rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-sm md:text-xl cursor-pointer shadow-lg"
//               >
//                 {quantity}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Info */}
//       <div className="p-2 md:p-4 flex-1 flex flex-col">
//         <div className="flex-1">
//           <div className="flex flex-wrap items-baseline gap-2 mb-1 md:mb-2">
//             <span className="text-sm md:text-xl font-bold text-[var(--color-primary)]">
//               ৳{price}
//             </span>
//             {regularPrice > 0 && regularPrice > price && (
//               <span className="text-gray-400 line-through text-[10px] md:text-sm">
//                 ৳{regularPrice}
//               </span>
//             )}
//           </div>

//           <p className="text-[11px] md:text-[14px] leading-tight text-gray-800 line-clamp-2 mt-0.5 md:mt-1">
//             {productName}
//           </p>

//           {/* {!isInStock && (
//             <p className="text-[10px] md:text-xs text-red-500 font-medium mt-0.5 md:mt-1">
//               Out of Stock
//             </p>
//           )} */}
//         </div>

//         {/* Bottom Info */}
//         <div className="flex items-center justify-between mt-1 md:mt-auto pt-1 md:pt-2 border-t border-gray-50">
//           <div className="flex items-center gap-0.5 md:gap-1">
//             <span className="text-yellow-500 text-[10px] md:text-lg">★</span>
//             <span className="font-medium text-[10px] md:text-sm text-gray-600">
//               {rating}
//             </span>
//           </div>

//           {unitText && (
//             <span className="text-[9px] md:text-xs bg-gray-50 px-1.5 py-0.5 md:px-3 md:py-1 rounded md:rounded-lg text-gray-500">
//               {unitText}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiHeart } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";

interface ProductCardProps {
  product: any;
  onQuickView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const dispatch = useAppDispatch();
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ সব ডেটা প্রসেস করা হচ্ছে এখানে
  const productId = product._id || product.id;
  const productName = product.name;
  const productImage = product.thumbnail || product.image || "/placeholder.png";

  // প্রাইস ক্যালকুলেশন
  const salePrice = product.salePrice || 0;
  const regularPrice = product.regularPrice || 0;
  const price = salePrice > 0 ? salePrice : regularPrice;

  // ডিসকাউন্ট ক্যালকুলেশন
  const discountValue = product.discountPercent || 0;
  const discountAmount =
    discountValue > 0
      ? discountValue
      : regularPrice > 0 && price > 0
        ? Math.round(((regularPrice - price) / regularPrice) * 100)
        : 0;

  // স্টক ক্যালকুলেশন
  let totalStock = product.stock || 0;
  if (product.variants && product.variants.length > 0) {
    totalStock = product.variants.reduce(
      (sum: number, v: any) => sum + (v.stock || 0),
      0,
    );
  }
  if (product.productType === "combo" && product.comboItems) {
    totalStock = product.stock || 0;
  }
  const isInStock = totalStock > 0;

  let unitText = "1 pc";
  if (product.unitDetails) {
    const weight = product.weightOrVolume || 1;
    const unitName =
      product.unitDetails.shortName || product.unitDetails.name || "";
    unitText = unitName ? `${weight} ${unitName}` : "1 pc";
  } else if (product.unit) {
    unitText = typeof product.unit === "string" ? product.unit : "1 pc";
  }

  // রেটিং ক্যালকুলেশন
  const rating = product.rating || 0;

  // কার্ট আইটেম চেক
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === productId),
  );
  const quantity = cartItem?.quantity || 0;

  // ===== Auto close after 5 seconds + exclusive open =====
  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const startCloseTimer = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsQuantityOpen(false);
    }, 5000); // 5 seconds
  };

  const openQuantity = () => {
    setIsQuantityOpen(true);
    startCloseTimer();

    // অন্য সব কার্ডকে বলো বন্ধ হয়ে যাও
    window.dispatchEvent(
      new CustomEvent("quantity-open", { detail: productId }),
    );
  };

  const closeQuantity = () => {
    setIsQuantityOpen(false);
    clearCloseTimer();
  };

  // অন্য কার্ড খুললে এই কার্ড বন্ধ হয়ে যাবে
  useEffect(() => {
    const handleOtherOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== productId) {
        closeQuantity();
      }
    };

    window.addEventListener("quantity-open", handleOtherOpen);
    return () => {
      window.removeEventListener("quantity-open", handleOtherOpen);
      clearCloseTimer();
    };
  }, [productId]);

  // ===== Handlers =====
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInStock) return;
    dispatch(
      addToCart({
        id: productId,
        productID: product.productID || String(productId),
        name: productName,
        price: price,
        mrp: regularPrice || price,
        image: productImage,
        category:
          product.categoryDetails?.name || product.categoryName || "General",
      }),
    );
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInStock) return;
    if (quantity < totalStock) {
      dispatch(increaseQuantity(productId));
      startCloseTimer(); // টাইমার রিসেট
    }
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 0) {
      dispatch(decreaseQuantity(productId));
      startCloseTimer(); // টাইমার রিসেট
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // wishlist functionality
  };

  const handleQuantityToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isQuantityOpen) {
      closeQuantity();
    } else {
      openQuantity();
    }
  };

  return (
    <div
      className="group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 relative h-full flex flex-col cursor-pointer"
      onClick={onQuickView}
    >
      {/* Image */}
      <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            !isInStock ? "opacity-50 grayscale-[30%]" : ""
          }`}
        />

        {discountAmount > 0 && isInStock && (
          <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-[#EA4335] text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md z-10">
            {discountAmount}% OFF
          </span>
        )}

        {!isInStock && (
          <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-gray-900/80 text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md z-10">
            Out of Stock
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-1.5 right-1.5 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white/90 rounded-lg md:rounded-xl shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition-all z-20"
        >
          <FiHeart className="w-3 h-3 md:w-[17px] md:h-[17px]" />
        </button>

        {/* Quantity Controller */}
        {isInStock && (
          <div
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20"
            onMouseEnter={() => {
              openQuantity();
            }}
            onMouseLeave={() => {
              closeQuantity();
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-8 h-8 md:w-11 md:h-11 bg-white border-2 border-[var(--color-primary)] rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-95 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
              >
                <span className="text-xl font-bold">+</span>
              </button>
            ) : isQuantityOpen ? (
              <div className="bg-white border border-[var(--color-primary)] rounded-xl md:rounded-2xl shadow-sm flex items-center py-0.5 px-1 md:py-1 md:px-2">
                <button
                  onClick={handleDecrease}
                  className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)]"
                >
                  -
                </button>
                <span className="font-bold text-sm md:text-xl px-2 text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  disabled={quantity >= totalStock}
                  className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-2xl text-[var(--color-primary)] ${
                    quantity >= totalStock
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  +
                </button>
              </div>
            ) : (
              <div
                onClick={handleQuantityToggle}
                className="w-8 h-8 md:w-11 md:h-11 bg-[var(--color-primary)] text-white rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-sm md:text-xl cursor-pointer shadow-lg"
              >
                {quantity}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2 md:p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-2 mb-1 md:mb-2">
            <span className="text-sm md:text-xl font-bold text-[var(--color-primary)]">
              ৳{price}
            </span>
            {regularPrice > 0 && regularPrice > price && (
              <span className="text-gray-400 line-through text-[10px] md:text-sm">
                ৳{regularPrice}
              </span>
            )}
          </div>
          <p className="text-[11px] md:text-[14px] leading-tight text-gray-800 line-clamp-2 mt-0.5 md:mt-1">
            {productName}
          </p>
        </div>

        {/* Bottom Info */}
        <div className="flex items-center justify-between mt-1 md:mt-auto pt-1 md:pt-2 border-t border-gray-50">
          <div className="flex items-center gap-0.5 md:gap-1">
            <span className="text-yellow-500 text-[10px] md:text-lg">★</span>
            <span className="font-medium text-[10px] md:text-sm text-gray-600">
              {rating}
            </span>
          </div>
          {unitText && (
            <span className="text-[9px] md:text-xs bg-gray-50 px-1.5 py-0.5 md:px-3 md:py-1 rounded md:rounded-lg text-gray-500">
              {unitText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;