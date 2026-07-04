"use client";

import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FiX, FiHeart, FiPlus, FiMinus, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi';
import { addToCart, increaseQuantity, decreaseQuantity } from '@/redux/slices/cartSlice';

/* ---------- Types ---------- */

interface Variant {
  _id: string;
  weightOrVolume: number;
  unitID: string;
  costPrice: number;
  regularPrice: number;
  salePrice: number;
  stock: number;
}

interface Product {
  _id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  categoryID?: { name: string };
  regularPrice: number;
  salePrice: number;
  stock: number;
  thumbnail: string;
  images: string[];
  variants: Variant[];
  rating?: number;
  numReviews?: number;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

/* ---------- Helpers ---------- */

const formatTk = (n: number) => `৳${n.toLocaleString()}`;

const getDisplayPrice = (product: Product, variant: Variant | null) => {
  if (variant) {
    return {
      price: variant.salePrice || variant.regularPrice,
      mrp: variant.regularPrice,
    };
  }
  const price = product.salePrice && product.salePrice > 0 ? product.salePrice : product.regularPrice;
  return { price, mrp: product.regularPrice };
};

const getCartItemId = (product: Product, variant: Variant | null) =>
  variant ? `${product._id}-${variant._id}` : product._id;

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state: any) => state.cart?.items || []);

  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    hasVariants ? product.variants[0] : null
  );

  const galleryImages = useMemo(() => {
    return product.images?.length > 0 ? product.images : [product.thumbnail];
  }, [product.images, product.thumbnail]);

  const [activeImage, setActiveImage] = useState(0);

  const { price, mrp } = getDisplayPrice(product, selectedVariant);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.stock > 0;

  const cartItemId = getCartItemId(product, selectedVariant);
  const qtyInCart = cartItems.find((it: any) => it.id === cartItemId)?.quantity || 0;

  /* ---------- Direct Add to Cart ---------- */
  const handleAddToCart = () => {
    if (!inStock) return;

    dispatch(
      addToCart({
        id: cartItemId,
        name: selectedVariant
          ? `${product.name} (${selectedVariant.weightOrVolume} kg)`
          : product.name,
        price,
        mrp,
        image: product.thumbnail,
        category: product.categoryID?.name || '',
        quantity: 1,
      })
    );
  };

  const handleBuyNow = () => {
    if (!inStock) return;

    dispatch(
      addToCart({
        id: cartItemId,
        name: selectedVariant
          ? `${product.name} (${selectedVariant.weightOrVolume} kg)`
          : product.name,
        price,
        mrp,
        image: product.thumbnail,
        category: product.categoryID?.name || '',
        quantity: 1,
      })
    );

    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start md:items-center justify-center bg-black/60 p-4 md:p-6">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition"
        >
          <FiX size={22} />
        </button>

        {/* Left: Image */}
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6 relative">
          <img
            src={galleryImages[activeImage]}
            alt={product.name}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <div>
            {product.categoryID?.name && (
              <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                {product.categoryID.name}
              </p>
            )}

            <h2 className="text-2xl font-bold mt-1 leading-tight">{product.name}</h2>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-bold text-[var(--color-primary)]">৳{price}</span>
              {mrp > price && (
                <>
                  <span className="text-lg line-through text-gray-400">৳{mrp}</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Variants */}
            {hasVariants && (
              <div className="mt-6">
                <p className="font-semibold text-sm mb-2">Size / Weight</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v: Variant) => (
                    <button
                      key={v._id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedVariant?._id === v._id
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {v.weightOrVolume} kg
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border rounded-xl">
                <button
                  onClick={() => {
                    if (qtyInCart > 0) dispatch(decreaseQuantity(cartItemId));
                  }}
                  className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-l-xl"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-lg">{qtyInCart}</span>
                <button
                  onClick={handleAddToCart}
                  className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-r-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-[var(--color-primary)] text-white font-semibold rounded-2xl hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <FiZap size={18} />
                Buy Now
              </button>
            </div>

            {/* Description */}
            {product.shortDescription && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Description</p>
                <p className="text-sm leading-relaxed text-gray-600">{product.shortDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;


// "use client";

// import React, { useMemo, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { FiX, FiHeart, FiShoppingCart, FiZap, FiChevronLeft, FiChevronRight, FiMinus, FiPlus } from 'react-icons/fi';
// import { addToCart, increaseQuantity, decreaseQuantity } from '@/redux/slices/cartSlice';

// /* ---------- Types (matches the API response you shared) ---------- */

// interface Variant {
//     _id: string;
//     weightOrVolume: number;
//     unitID: string;
//     costPrice: number;
//     regularPrice: number;
//     salePrice: number;
//     stock: number;
//     sku?: string;
// }

// interface Category {
//     _id: string;
//     name: string;
//     slug: string;
// }

// export interface Product {
//     _id: string;
//     name: string;
//     shortDescription?: string;
//     description?: string;
//     categoryID?: Category;
//     regularPrice: number;
//     salePrice: number;
//     discountPercent: number;
//     stock: number;
//     productType: 'single' | 'combo' | string;
//     unit?: string | null;
//     weightOrVolume?: number;
//     variants: Variant[];
//     thumbnail: string;
//     images: string[];
//     rating?: number;
//     numReviews?: number;
// }

// interface ProductModalProps {
//     product: Product;
//     relatedProducts?: Product[];
//     onClose: () => void;
//     onAddRelated?: (product: Product) => void;       // qty 0 -> 1 (or +1)
//     onDecreaseRelated?: (product: Product) => void;   // -1 (or remove)
// }

// /* ---------- Helpers ---------- */

// const formatTk = (n: number) => `৳${n.toLocaleString()}`;

// const getDisplayPrice = (product: Product, variant: Variant | null) => {
//     if (variant) {
//         return { price: variant.salePrice || variant.regularPrice, mrp: variant.regularPrice };
//     }
//     const price = product.salePrice && product.salePrice > 0 ? product.salePrice : product.regularPrice;
//     return { price, mrp: product.regularPrice };
// };

// // variant থাকলে cart id হবে "productId-variantId", না থাকলে শুধু productId
// // এতে একই প্রোডাক্টের ভিন্ন variant আলাদা cart line হিসেবে থাকবে
// const getCartItemId = (product: Product, variant: Variant | null) =>
//     variant ? `${product._id}-${variant._id}` : product._id;

// /* ---------- Component ---------- */

// const ProductModal: React.FC<ProductModalProps> = ({
//     product,
//     relatedProducts = [],
//     onClose,
//     onAddRelated,
//     onDecreaseRelated,
// }) => {
//     const dispatch = useDispatch();
//     const router = useRouter();

//     // Read live cart state so quantity controls reflect actual cart contents
//     const cartItems = useSelector((state: any) => state.cart?.items || []);
//     const getCartQty = (id: string) => {
//         const found = cartItems.find((it: any) => it.id === id);
//         return found ? found.quantity : 0;
//     };

//     const hasVariants = product.variants && product.variants.length > 0;
//     const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
//         hasVariants ? product.variants[0] : null
//     );
//     const [quantity, setQuantity] = useState(1);

//     // Gallery only shows if there are extra images besides the thumbnail
//     const galleryImages = useMemo(() => {
//         const imgs = product.images && product.images.length > 0 ? product.images : [];
//         return imgs.length > 0 ? imgs : [product.thumbnail];
//     }, [product.images, product.thumbnail]);
//     const hasGallery = product.images && product.images.length > 0;

//     const [activeImage, setActiveImage] = useState(0);

//     const { price, mrp } = getDisplayPrice(product, selectedVariant);
//     const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     const inStock = selectedVariant ? selectedVariant.stock > 0 : product.stock > 0;

//     const cartItemId = getCartItemId(product, selectedVariant);
//     const qtyInCart = getCartQty(cartItemId);

//     // ✅ fix: এই ফাংশনটাই আসল cart এ item যোগ করে — সরাসরি dispatch করে
//     const buildCartItem = () => ({
//         id: cartItemId,
//         name: selectedVariant
//             ? `${product.name} (${selectedVariant.weightOrVolume} kg)`
//             : product.name,
//         price,
//         mrp,
//         image: product.thumbnail,
//         thumbnail: product.thumbnail,
//         category: product.categoryID?.name || '',
//         quantity, // modal এ যত quantity সিলেক্ট করা আছে সেটাই যাবে
//     });

//     const handleAddToCart = () => {
//         if (!inStock) return;
//         dispatch(addToCart(buildCartItem()));
//     };

//     const handleBuyNow = () => {
//         if (!inStock) return;
//         dispatch(addToCart(buildCartItem()));
//         onClose();
//         router.push('/checkout'); // ✅ fix: Buy Now চাপলে সরাসরি checkout page এ যাবে
//     };

//     return (
//         <div className="fixed inset-0 z-[70] flex items-start md:items-center justify-center bg-black/50 p-0 md:p-6 overflow-y-auto">
//             <div
//                 className="relative w-full md:max-w-5xl bg-white rounded-none md:rounded-2xl shadow-2xl my-0 md:my-auto"
//                 style={{ background: 'var(--color-background)' }}
//             >
//                 {/* Close */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
//                     style={{ color: 'var(--color-text-secondary)' }}
//                     aria-label="Close"
//                 >
//                     <FiX size={22} />
//                 </button>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
//                     {/* ---------------- Left: Image / Gallery ---------------- */}
//                     <div>
//                         <div
//                             className="w-full aspect-square rounded-xl overflow-hidden border flex items-center justify-center"
//                             style={{ borderColor: 'var(--color-surface)', background: 'var(--color-surface)' }}
//                         >
//                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                             <img
//                                 src={galleryImages[activeImage]}
//                                 alt={product.name}
//                                 className="w-full h-full object-contain"
//                             />
//                         </div>

//                         {/* Gallery thumbnails — only rendered if product has images[] */}
//                         {hasGallery && galleryImages.length > 1 && (
//                             <div className="flex items-center gap-2 mt-3">
//                                 <button
//                                     onClick={() => setActiveImage((i) => Math.max(0, i - 1))}
//                                     className="w-8 h-8 flex items-center justify-center rounded-full border flex-shrink-0"
//                                     style={{ borderColor: 'var(--color-surface)' }}
//                                 >
//                                     <FiChevronLeft size={16} />
//                                 </button>
//                                 <div className="flex gap-2 overflow-x-auto">
//                                     {galleryImages.map((img, idx) => (
//                                         <button
//                                             key={idx}
//                                             onClick={() => setActiveImage(idx)}
//                                             className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2"
//                                             style={{
//                                                 borderColor:
//                                                     activeImage === idx
//                                                         ? 'var(--color-primary)'
//                                                         : 'var(--color-surface)',
//                                             }}
//                                         >
//                                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                                             <img src={img} alt="" className="w-full h-full object-cover" />
//                                         </button>
//                                     ))}
//                                 </div>
//                                 <button
//                                     onClick={() =>
//                                         setActiveImage((i) => Math.min(galleryImages.length - 1, i + 1))
//                                     }
//                                     className="w-8 h-8 flex items-center justify-center rounded-full border flex-shrink-0"
//                                     style={{ borderColor: 'var(--color-surface)' }}
//                                 >
//                                     <FiChevronRight size={16} />
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     {/* ---------------- Right: Details ---------------- */}
//                     <div className="flex flex-col">
//                         {product.categoryID?.name && (
//                             <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
//                                 {product.categoryID.name}
//                             </p>
//                         )}

//                         <h2
//                             className="text-2xl font-bold mt-1 pr-8"
//                             style={{ color: 'var(--color-text-primary)' }}
//                         >
//                             {product.name}
//                         </h2>

//                         {(product.rating ?? 0) > 0 && (
//                             <div className="flex items-center gap-2 mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
//                                 <span style={{ color: 'var(--color-secondary)' }}>
//                                     {'★'.repeat(Math.round(product.rating || 0))}
//                                     {'☆'.repeat(5 - Math.round(product.rating || 0))}
//                                 </span>
//                                 <span>{product.rating} ({product.numReviews ?? 0} reviews)</span>
//                             </div>
//                         )}

//                         {/* Price */}
//                         <div className="flex items-center gap-3 mt-4">
//                             <span className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
//                                 {formatTk(price)}
//                             </span>
//                             {mrp > price && (
//                                 <>
//                                     <span
//                                         className="text-lg line-through"
//                                         style={{ color: 'var(--color-text-muted)' }}
//                                     >
//                                         {formatTk(mrp)}
//                                     </span>
//                                     <span
//                                         className="text-xs font-semibold px-2 py-1 rounded-full"
//                                         style={{ background: 'var(--color-error)', color: 'var(--color-background)' }}
//                                     >
//                                         -{discount}% OFF
//                                     </span>
//                                 </>
//                             )}
//                         </div>

//                         {/* Variants — only rendered if variants[] is non-empty */}
//                         {hasVariants && (
//                             <div className="mt-5">
//                                 <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
//                                     Weight / Size
//                                 </p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {product.variants.map((v) => {
//                                         const active = selectedVariant?._id === v._id;
//                                         return (
//                                             <button
//                                                 key={v._id}
//                                                 onClick={() => {
//                                                     setSelectedVariant(v);
//                                                     setQuantity(1); // ✅ variant বদলালে quantity রিসেট, ভুল variant এ পুরনো qty যোগ না হয়
//                                                 }}
//                                                 disabled={v.stock === 0}
//                                                 className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                                                 style={{
//                                                     borderColor: active ? 'var(--color-primary)' : 'var(--color-surface)',
//                                                     background: active ? 'var(--color-primary)' : 'transparent',
//                                                     color: active ? 'var(--color-background)' : 'var(--color-text-primary)',
//                                                 }}
//                                             >
//                                                 {v.weightOrVolume} kg
//                                             </button>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Quantity */}
//                         <div className="mt-5">
//                             <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
//                                 Quantity
//                                 {qtyInCart > 0 && (
//                                     <span
//                                         className="ml-2 text-xs font-normal"
//                                         style={{ color: 'var(--color-primary)' }}
//                                     >
//                                         ({qtyInCart} already in cart)
//                                     </span>
//                                 )}
//                             </p>
//                             <div
//                                 className="inline-flex items-center border rounded-lg"
//                                 style={{ borderColor: 'var(--color-surface)' }}
//                             >
//                                 <button
//                                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                                     className="w-10 h-10 flex items-center justify-center text-lg"
//                                     style={{ color: 'var(--color-text-secondary)' }}
//                                 >
//                                     −
//                                 </button>
//                                 <span className="w-10 text-center font-semibold" style={{ color: 'var(--color-text-primary)' }}>
//                                     {quantity}
//                                 </span>
//                                 <button
//                                     onClick={() => setQuantity((q) => q + 1)}
//                                     className="w-10 h-10 flex items-center justify-center text-lg"
//                                     style={{ color: 'var(--color-text-secondary)' }}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Description */}
//                         {product.shortDescription && (
//                             <div className="mt-5">
//                                 <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
//                                     Product Description
//                                 </p>
//                                 <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--color-text-secondary)' }}>
//                                     {product.shortDescription}
//                                 </p>
//                             </div>
//                         )}

//                         {/* Actions */}
//                         <div className="flex items-center gap-3 mt-6">
//                             <button
//                                 disabled={!inStock}
//                                 onClick={handleAddToCart}
//                                 className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
//                                 style={{ background: 'var(--color-primary)', color: 'var(--color-background)' }}
//                             >
//                                 <FiShoppingCart size={18} />
//                                 {inStock ? 'Add to Cart' : 'Out of Stock'}
//                             </button>
//                             <button
//                                 disabled={!inStock}
//                                 onClick={handleBuyNow}
//                                 className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border disabled:opacity-40 disabled:cursor-not-allowed"
//                                 style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
//                             >
//                                 <FiZap size={18} />
//                                 Buy Now
//                             </button>
//                             <button
//                                 className="w-12 h-12 flex items-center justify-center rounded-xl border flex-shrink-0"
//                                 style={{ borderColor: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
//                                 aria-label="Wishlist"
//                             >
//                                 <FiHeart size={18} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ---------------- Related Products ---------------- */}
//                 {relatedProducts.length > 0 && (
//                     <div className="px-6 md:px-8 pb-8 pt-2 border-t mt-4" style={{ borderColor: 'var(--color-surface)' }}>
//                         <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
//                             You May Also Like
//                         </h3>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                             {relatedProducts.map((rp) => {
//                                 const rpPrice = rp.salePrice && rp.salePrice > 0 ? rp.salePrice : rp.regularPrice;
//                                 const qty = getCartQty(rp._id);
//                                 return (
//                                     <div
//                                         key={rp._id}
//                                         className="border rounded-xl p-3 relative hover:shadow-md transition-shadow"
//                                         style={{ borderColor: 'var(--color-surface)' }}
//                                     >
//                                         <div className="w-full aspect-square rounded-lg overflow-hidden mb-2" style={{ background: 'var(--color-surface)' }}>
//                                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                                             <img src={rp.thumbnail} alt={rp.name} className="w-full h-full object-contain" />
//                                         </div>

//                                         {/* Qty control — shows "+" when not in cart, stepper when it is */}
//                                         {qty === 0 ? (
//                                             <button
//                                                 onClick={() => onAddRelated?.(rp)}
//                                                 className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white"
//                                                 style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
//                                                 aria-label="Add to cart"
//                                             >
//                                                 <FiPlus size={16} />
//                                             </button>
//                                         ) : (
//                                             <div
//                                                 className="absolute top-2 right-2 flex items-center rounded-full border-2 bg-white overflow-hidden"
//                                                 style={{ borderColor: 'var(--color-primary)' }}
//                                             >
//                                                 <button
//                                                     onClick={() => onDecreaseRelated?.(rp)}
//                                                     className="w-7 h-7 flex items-center justify-center"
//                                                     style={{ color: 'var(--color-primary)' }}
//                                                     aria-label="Decrease quantity"
//                                                 >
//                                                     <FiMinus size={13} />
//                                                 </button>
//                                                 <span
//                                                     className="px-1 text-sm font-bold min-w-[16px] text-center"
//                                                     style={{ color: 'var(--color-primary)' }}
//                                                 >
//                                                     {qty}
//                                                 </span>
//                                                 <button
//                                                     onClick={() => onAddRelated?.(rp)}
//                                                     className="w-7 h-7 flex items-center justify-center"
//                                                     style={{ color: 'var(--color-primary)' }}
//                                                     aria-label="Increase quantity"
//                                                 >
//                                                     <FiPlus size={13} />
//                                                 </button>
//                                             </div>
//                                         )}

//                                         <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
//                                             {formatTk(rpPrice)}
//                                         </p>
//                                         <p className="text-xs line-clamp-2 mt-1" style={{ color: 'var(--color-text-secondary)' }}>
//                                             {rp.name}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductModal;