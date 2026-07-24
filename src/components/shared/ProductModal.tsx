
// "use client";

// import React, { useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import {
//   FiX,
//   FiHeart,
//   FiPlus,
//   FiMinus,
//   FiZap,
//   FiStar,
//   FiMessageCircle,
//   FiTruck,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiSend,
//   FiPackage,
//   FiShoppingBag,
//   FiThumbsUp,
//   FiUser,
//   FiClock,
// } from 'react-icons/fi';
// import { addToCart, increaseQuantity, decreaseQuantity } from '@/redux/slices/cartSlice';
// import { useCreateReviewMutation, useGetProductReviewsQuery } from '@/redux/api/reviewApi';
// import { useGetRelatedProductsQuery } from '@/redux/api/productApi';
// import { useSession } from 'next-auth/react';
// import Button from '@/components/ui/Button';
// import ProductCard from '@/components/shared/ProductCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode } from 'swiper/modules';
// import 'swiper/css';
// import toast from 'react-hot-toast';

// /* ---------- Types ---------- */

// interface Variant {
//   _id: string;
//   weightOrVolume: number;
//   unitID: string;
//   costPrice: number;
//   regularPrice: number;
//   salePrice: number;
//   stock: number;
// }

// interface Review {
//   _id: string;
//   user: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     avatar?: string;
//   };
//   rating: number;
//   comment: string;
//   createdAt: string;
//   status: string;
// }

// interface ComboItem {
//   productID: {
//     _id: string;
//     name: string;
//     thumbnail: string;
//     regularPrice: number;
//     salePrice: number;
//     stock: number;
//     unit: {
//       _id: string;
//       name: string;
//       shortName: string;
//     };
//     weightOrVolume?: number;
//   };
//   quantity: number;
//   selectedVariant: any;
//   variant?: any;
// }

// interface Product {
//   _id: string;
//   name: string;
//   shortDescription?: string;
//   description?: string;
//   categoryID?: { name: string; _id: string };
//   regularPrice: number;
//   salePrice: number;
//   stock: number;
//   thumbnail: string;
//   images: string[];
//   variants: Variant[];
//   rating?: number;
//   numReviews?: number;
//   specifications?: Array<{ key: string; value: string }>;
//   productType?: 'single' | 'combo';
//   comboItems?: ComboItem[];
// }

// interface ProductModalProps {
//   product: Product;
//   onClose: () => void;
// }

// /* ---------- Tabs ---------- */
// const TABS = [
//   { id: 'details', label: 'Details' },
//   { id: 'reviews', label: 'Reviews' },
// ];

// /* ---------- Helpers ---------- */

// const formatTk = (n: number) => `৳${n.toLocaleString()}`;

// const getDisplayPrice = (product: Product, variant: Variant | null) => {
//   if (variant) {
//     return {
//       price: variant.salePrice || variant.regularPrice,
//       mrp: variant.regularPrice,
//     };
//   }
//   const price = product.salePrice && product.salePrice > 0 ? product.salePrice : product.regularPrice;
//   return { price, mrp: product.regularPrice };
// };

// const getCartItemId = (product: Product, variant: Variant | null) =>
//   variant ? `${product._id}-${variant._id}` : product._id;

// const StarRating = ({ rating }: { rating: number }) => {
//   const fullStars = Math.floor(rating);
//   const emptyStars = 5 - fullStars;

//   return (
//     <div className="flex items-center gap-0.5">
//       {[...Array(fullStars)].map((_, i) => (
//         <FiStar key={`full-${i}`} className="fill-yellow-400 text-yellow-400" size={14} />
//       ))}
//       {[...Array(emptyStars)].map((_, i) => (
//         <FiStar key={`empty-${i}`} className="text-gray-300" size={14} />
//       ))}
//     </div>
//   );
// };

// /* ---------- Main Component ---------- */
// const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [activeTab, setActiveTab] = useState('details');
//   const [activeImage, setActiveImage] = useState(0);

//   // Review Form State
//   const [reviewRating, setReviewRating] = useState(0);
//   const [reviewComment, setReviewComment] = useState('');
//   const [isSubmittingReview, setIsSubmittingReview] = useState(false);

//   const cartItems = useSelector((state: any) => state.cart?.items || []);

//   const hasVariants = product.variants && product.variants.length > 0;
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
//     hasVariants ? product.variants[0] : null
//   );

//   // ✅ Fetch Reviews - Fixed with proper types
//   const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useGetProductReviewsQuery({
//     productId: product._id,
//     limit: 6,
//   });

//   // ✅ Safe data extraction with proper fallback
//   const reviews = (reviewsData as any)?.data || [];
//   const totalReviews = (reviewsData as any)?.meta?.total || product.numReviews || 0;
//   const averageRating = (reviewsData as any)?.meta?.averageRating || product.rating || 0;
//   const ratingCounts = (reviewsData as any)?.meta?.ratingCounts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

//   // ✅ Create Review Mutation
//   const [createReview] = useCreateReviewMutation();

//   // ✅ Fetch Related Products
//   const categoryId = product.categoryID?._id || '';
//   const { data: relatedData, isLoading: relatedLoading } = useGetRelatedProductsQuery(
//     categoryId,
//     { skip: !categoryId }
//   );

//   const relatedProducts = (relatedData as any)?.data || [];

//   const galleryImages = useMemo(() => {
//     return product.images?.length > 0 ? product.images : [product.thumbnail];
//   }, [product.images, product.thumbnail]);

//   const { price, mrp } = getDisplayPrice(product, selectedVariant);
//   const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
//   const inStock = selectedVariant ? selectedVariant.stock > 0 : product.stock > 0;
//   const isCombo = product.productType === 'combo';

//   const cartItemId = getCartItemId(product, selectedVariant);
//   const qtyInCart = cartItems.find((it: any) => it.id === cartItemId)?.quantity || 0;

//   /* ---------- Cart Handlers ---------- */
//   const handleAddToCart = () => {
//     if (!inStock) return;
//     dispatch(
//       addToCart({
//         id: cartItemId,
//         name: selectedVariant
//           ? `${product.name} (${selectedVariant.weightOrVolume} kg)`
//           : product.name,
//         price,
//         mrp,
//         image: product.thumbnail,
//         category: product.categoryID?.name || '',
//         quantity: 1,
//       })
//     );
//   };

//   const handleBuyNow = () => {
//     if (!inStock) return;
//     dispatch(
//       addToCart({
//         id: cartItemId,
//         name: selectedVariant
//           ? `${product.name} (${selectedVariant.weightOrVolume} kg)`
//           : product.name,
//         price,
//         mrp,
//         image: product.thumbnail,
//         category: product.categoryID?.name || '',
//         quantity: 1,
//       })
//     );
//     onClose();
//     router.push('/checkout');
//   };

//   /* ---------- Review Submit ---------- */
//   const handleSubmitReview = async () => {
//     if (!session) {
//       toast.error('Please login to submit a review');
//       return;
//     }
//     if (reviewRating === 0) {
//       toast.error('Please select a rating');
//       return;
//     }
//     if (!reviewComment.trim()) {
//       toast.error('Please write a review');
//       return;
//     }

//     setIsSubmittingReview(true);
//     try {
//       await createReview({
//         productID: product._id,
//         rating: reviewRating,
//         comment: reviewComment,
//       }).unwrap();

//       toast.success('Review submitted successfully!');
//       setReviewRating(0);
//       setReviewComment('');
//       refetchReviews();
//     } catch (error: any) {
//       toast.error(error?.data?.message || 'Failed to submit review');
//     } finally {
//       setIsSubmittingReview(false);
//     }
//   };

//   // Transform related products for ProductCard
//   const transformedRelatedProducts = relatedProducts.map((p: any) => ({
//     id: p._id,
//     name: p.name,
//     image: p.thumbnail || '/placeholder.png',
//     price: p.salePrice || p.regularPrice,
//     originalPrice: p.regularPrice,
//     mrp: p.regularPrice,
//     discount: p.discountPercent || 0,
//     rating: p.rating || 0,
//     reviews: p.numReviews || 0,
//     categoryName: p.categoryID?.name || '',
//     unit: p.unit?.shortName || '',
//   }));

//   return (
//     <div className="fixed inset-0 z-[70] flex items-start md:items-center justify-center bg-black/60 p-4 md:p-6">
//       <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition"
//         >
//           <FiX size={22} />
//         </button>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="flex flex-col md:flex-row">
//             {/* Left: Image Gallery - 1:1 Ratio */}
//             <div className="md:w-[45%] bg-gray-50 p-4 md:p-6 flex-shrink-0">
//               <div className="relative w-full aspect-square max-h-[420px] mx-auto">
//                 <img
//                   src={galleryImages[activeImage]}
//                   alt={product.name}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Thumbnails */}
//               {galleryImages.length > 1 && (
//                 <div className="flex gap-2 mt-4 justify-center flex-wrap">
//                   {galleryImages.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setActiveImage(idx)}
//                       className={`w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
//                         activeImage === idx ? 'border-[var(--color-primary)]' : 'border-gray-200'
//                       }`}
//                     >
//                       <img src={img} alt="" className="w-full h-full object-cover" />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Right: Details */}
//             <div className="md:w-[55%] p-6 md:p-8 overflow-y-auto">
//               <div>
//                 {/* Category */}
//                 {product.categoryID?.name && (
//                   <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
//                     {product.categoryID.name}
//                   </p>
//                 )}

//                 {/* Name */}
//                 <h2 className="text-2xl font-bold mt-1 leading-tight">{product.name}</h2>

//                 {/* Rating */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <StarRating rating={averageRating || 0} />
//                   <span className="text-sm text-gray-500">
//                     {averageRating || 0} ({totalReviews} reviews)
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center gap-4 mt-4">
//                   <span className="text-3xl font-bold text-[var(--color-primary)]">৳{price}</span>
//                   {mrp > price && (
//                     <>
//                       <span className="text-lg line-through text-gray-400">৳{mrp}</span>
//                       <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">
//                         -{discount}% OFF
//                       </span>
//                     </>
//                   )}
//                 </div>

//                 {/* Stock Status */}
//                 <div className="mt-2 flex items-center gap-2">
//                   {inStock ? (
//                     <span className="text-sm text-green-600 flex items-center gap-1">
//                       <FiCheckCircle size={14} /> In Stock
//                     </span>
//                   ) : (
//                     <span className="text-sm text-red-600 flex items-center gap-1">
//                       <FiAlertCircle size={14} /> Out of Stock
//                     </span>
//                   )}
//                 </div>

//                 {/* Variants */}
//                 {hasVariants && (
//                   <div className="mt-6">
//                     <p className="font-semibold text-sm mb-2">Size / Weight</p>
//                     <div className="flex flex-wrap gap-2">
//                       {product.variants.map((v: Variant) => (
//                         <button
//                           key={v._id}
//                           onClick={() => setSelectedVariant(v)}
//                           className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
//                             selectedVariant?._id === v._id
//                               ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
//                               : 'border-gray-200 hover:border-gray-400'
//                           }`}
//                         >
//                           {v.weightOrVolume} kg
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* ✅ Short Description */}
//                 {product.shortDescription && (
//                   <div className="mt-4 p-3 bg-gray-50 rounded-xl">
//                     <p className="text-xs text-gray-500 leading-relaxed">{product.shortDescription}</p>
//                   </div>
//                 )}

//                 {/* ✅ Combo Items - Small Table */}
//                 {isCombo && product.comboItems && product.comboItems.length > 0 && (
//                   <div className="mt-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <FiPackage className="text-[var(--color-primary)]" size={16} />
//                       <p className="text-sm font-semibold text-gray-700">Combo Includes</p>
//                     </div>
//                     <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
//                       <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-gray-100/50 text-xs font-semibold text-gray-500">
//                         <span className="col-span-2">Item</span>
//                         <span className="text-center">Qty</span>
//                         <span className="text-right">Price</span>
//                       </div>
//                       {product.comboItems.map((item: ComboItem, idx: number) => {
//                         const p = item.productID;
//                         const variant = item.variant || item.selectedVariant;
//                         const weight = variant?.weightOrVolume || p?.weightOrVolume || 0;
//                         const unit = p?.unit?.shortName || 'kg';
//                         const itemPrice = variant?.salePrice || variant?.regularPrice || p?.salePrice || p?.regularPrice || 0;

//                         return (
//                           <div key={idx} className="grid grid-cols-4 gap-2 px-3 py-2 border-t border-gray-100 items-center hover:bg-gray-100/50 transition-colors">
//                             <div className="col-span-2 flex items-center gap-2 min-w-0">
//                               <img
//                                 src={p?.thumbnail}
//                                 alt={p?.name}
//                                 className="w-8 h-8 rounded-lg object-cover border flex-shrink-0"
//                               />
//                               <span className="text-xs font-medium text-gray-700 truncate">
//                                 {p?.name}
//                                 {weight > 0 && (
//                                   <span className="text-gray-400 font-normal"> ({weight}{unit})</span>
//                                 )}
//                               </span>
//                             </div>
//                             <span className="text-center text-xs font-medium text-gray-600">
//                               ×{item.quantity}
//                             </span>
//                             <span className="text-right text-xs font-semibold text-gray-800">
//                               {formatTk(itemPrice)}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Quantity + Add to Cart */}
//                 <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
//                   <div className="flex items-center border rounded-xl flex-shrink-0">
//                     <button
//                       onClick={() => {
//                         if (qtyInCart > 0) dispatch(decreaseQuantity(cartItemId));
//                       }}
//                       className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-l-xl"
//                     >
//                       −
//                     </button>
//                     <span className="w-12 text-center font-bold text-lg">{qtyInCart}</span>
//                     <button
//                       onClick={handleAddToCart}
//                       className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-r-xl"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <Button
//                     onClick={handleBuyNow}
//                     variant="primary"
//                     size="lg"
//                     fullWidth
//                     className="flex-1"
//                     rightIcon={<FiZap size={18} />}
//                   >
//                     Buy Now
//                   </Button>
//                 </div>

//                 {/* Delivery Info */}
//                 <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
//                   <FiTruck className="text-[var(--color-primary)]" size={18} />
//                   <span className="text-sm text-gray-600">
//                     Delivery within 40 - 60 minutes in Barisal city
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ===== Tabs ===== */}
//           <div className="border-t border-gray-200">
//             <div className="flex gap-6 px-6 md:px-8">
//               {TABS.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 text-sm font-medium border-b-2 transition-all ${
//                     activeTab === tab.id
//                       ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab.label}
//                   {tab.id === 'reviews' && totalReviews > 0 && (
//                     <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
//                       {totalReviews}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* ===== Tab Content ===== */}
//             <div className="p-6 md:p-8">
//               {/* Details Tab - Product Info Only */}
//               {activeTab === 'details' && (
//                 <div className="space-y-6">
//                   {/* Full Description */}
//                   {product.description && (
//                     <div>
//                       <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
//                         Description
//                       </h4>
//                       <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
//                         {product.description}
//                       </p>
//                     </div>
//                   )}

//                   {/* Specifications */}
//                   {product.specifications && product.specifications.length > 0 && (
//                     <div>
//                       <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
//                         Specifications
//                       </h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         {product.specifications.map((spec: any, idx: number) => (
//                           <div key={idx} className="flex items-center gap-2 text-sm">
//                             <span className="font-medium text-gray-600">{spec.key}:</span>
//                             <span className="text-gray-500">{spec.value}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Origin */}
//                   <div>
//                     <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
//                       Origin
//                     </h4>
//                     <p className="text-sm text-gray-600">Bangladesh</p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Sourced from trusted local farms in Bangladesh. 100% natural & organic cultivation.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Reviews Tab */}
//               {activeTab === 'reviews' && (
//                 <div>
//                   {/* Summary */}
//                   <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
//                     <div className="text-center">
//                       <div className="text-4xl font-bold text-gray-900">{averageRating || 0}</div>
//                       <StarRating rating={averageRating || 0} />
//                       <div className="text-sm text-gray-500 mt-1">{totalReviews} reviews</div>
//                     </div>
//                     <div className="flex-1 w-full">
//                       {[5, 4, 3, 2, 1].map((star) => {
//                         const count = ratingCounts[star as keyof typeof ratingCounts] || 0;
//                         const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
//                         return (
//                           <div key={star} className="flex items-center gap-2 mt-1 first:mt-0">
//                             <span className="text-sm text-gray-600 w-8">{star} ★</span>
//                             <div className="flex-1 h-2 bg-gray-200 rounded-full">
//                               <div
//                                 className="h-2 bg-yellow-400 rounded-full transition-all"
//                                 style={{ width: `${percentage}%` }}
//                               />
//                             </div>
//                             <span className="text-sm text-gray-600 w-10 text-right">{percentage}%</span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Review List */}
//                   {reviewsLoading ? (
//                     <div className="text-center py-8 text-gray-400">Loading reviews...</div>
//                   ) : reviews.length > 0 ? (
//                     <div className="space-y-4">
//                       {reviews.map((review: any) => (
//                         <div key={review._id} className="border-b border-gray-100 pb-4">
//                           <div className="flex items-center gap-3 flex-wrap">
//                             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
//                               {review.user?.firstName?.[0] || 'U'}
//                             </div>
//                             <div>
//                               <p className="font-semibold text-sm">
//                                 {review.user?.firstName} {review.user?.lastName}
//                               </p>
//                               <StarRating rating={review.rating} />
//                             </div>
//                             <span className="ml-auto text-xs text-gray-400">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8 text-gray-400">
//                       <FiMessageCircle size={40} className="mx-auto mb-2 text-gray-300" />
//                       <p>No reviews yet. Be the first to review!</p>
//                     </div>
//                   )}

//                   {/* Show All Reviews */}
//                   {totalReviews > 6 && (
//                     <button
//                       onClick={() => console.log('Show all reviews')}
//                       className="mt-4 text-sm text-[var(--color-primary)] font-medium hover:underline flex items-center gap-1"
//                     >
//                       Show All Reviews →
//                     </button>
//                   )}

//                   {/* ===== Write Review Form ===== */}
//                   <div className="mt-8 pt-6 border-t border-gray-200">
//                     <h4 className="text-sm font-semibold text-gray-800 mb-4">Write a Review</h4>

//                     {session ? (
//                       <div className="space-y-4">
//                         {/* Rating */}
//                         <div>
//                           <label className="text-sm text-gray-600 block mb-1.5">Your Rating</label>
//                           <div className="flex gap-1">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <button
//                                 key={star}
//                                 onClick={() => setReviewRating(star)}
//                                 className={`text-2xl transition-all ${
//                                   star <= reviewRating
//                                     ? 'text-yellow-400'
//                                     : 'text-gray-300 hover:text-yellow-200'
//                                 }`}
//                               >
//                                 ★
//                               </button>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Comment */}
//                         <div>
//                           <label className="text-sm text-gray-600 block mb-1.5">Your Review</label>
//                           <textarea
//                             value={reviewComment}
//                             onChange={(e) => setReviewComment(e.target.value)}
//                             rows={3}
//                             placeholder="Share your experience with this product..."
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none"
//                           />
//                         </div>

//                         <Button
//                           onClick={handleSubmitReview}
//                           variant="primary"
//                           size="md"
//                           isLoading={isSubmittingReview}
//                           leftIcon={<FiSend size={16} />}
//                         >
//                           Submit Review
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="p-4 bg-gray-50 rounded-xl text-center">
//                         <p className="text-sm text-gray-500">
//                           Please <button className="text-[var(--color-primary)] font-medium hover:underline">login</button> to write a review
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ===== Related Products Section ===== */}
//           {relatedLoading ? (
//             <div className="border-t border-gray-200 p-6 md:p-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                   <FiShoppingBag className="text-[var(--color-primary)]" />
//                   Related Products
//                 </h3>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="bg-gray-100 rounded-xl animate-pulse h-48" />
//                 ))}
//               </div>
//             </div>
//           ) : relatedProducts.length > 0 ? (
//             <div className="border-t border-gray-200 p-6 md:p-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                   <FiShoppingBag className="text-[var(--color-primary)]" />
//                   Related Products
//                 </h3>
//               </div>
//               <div className="-mx-2">
//                 <Swiper
//                   modules={[FreeMode]}
//                   spaceBetween={12}
//                   slidesPerView={2}
//                   breakpoints={{
//                     480: { slidesPerView: 2, spaceBetween: 12 },
//                     640: { slidesPerView: 3, spaceBetween: 16 },
//                     768: { slidesPerView: 3, spaceBetween: 16 },
//                     1024: { slidesPerView: 4, spaceBetween: 20 },
//                   }}
//                   freeMode={true}
//                   grabCursor={true}
//                   className="related-products-swiper"
//                 >
//                   {transformedRelatedProducts.map((p: any) => (
//                     <SwiperSlide key={p.id}>
//                       <ProductCard product={p} onQuickView={() => {}} />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  FiX,
  FiHeart,
  FiPlus,
  FiMinus,
  FiZap,
  FiStar,
  FiMessageCircle,
  FiTruck,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiPackage,
  FiShoppingBag,
  FiThumbsUp,
  FiUser,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { addToCart, increaseQuantity, decreaseQuantity } from '@/redux/slices/cartSlice';
import { useCreateReviewMutation, useGetProductReviewsQuery } from '@/redux/api/reviewApi';
import { useGetRelatedProductsQuery } from '@/redux/api/productApi';
import { useSession } from 'next-auth/react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/shared/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import toast from 'react-hot-toast';

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

interface Review {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  status: string;
}

interface ComboItem {
  productID: {
    _id: string;
    name: string;
    thumbnail: string;
    regularPrice: number;
    salePrice: number;
    stock: number;
    unit: {
      _id: string;
      name: string;
      shortName: string;
    };
    weightOrVolume?: number;
  };
  quantity: number;
  selectedVariant: any;
  variant?: any;
}

interface Product {
  _id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  categoryID?: { name: string; _id: string };
  regularPrice: number;
  salePrice: number;
  stock: number;
  thumbnail: string;
  images: string[];
  variants: Variant[];
  rating?: number;
  numReviews?: number;
  specifications?: Array<{ key: string; value: string }>;
  productType?: 'single' | 'combo';
  comboItems?: ComboItem[];
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

/* ---------- Tabs ---------- */
const TABS = [
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
];

const DETAIL_SUB_TABS = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'origin', label: 'Origin' },
];

const REVIEWS_PER_PAGE = 6;

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

// ✅ Normalizes ratingCounts whether API returns it as
// an object map { "1": 2, "2": 5 } OR as a Mongo aggregation
// array [{ _id: 5, count: 3 }, { _id: 4, count: 1 }]
const normalizeRatingCounts = (raw: any): Record<number, number> => {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!raw) return counts;

  if (Array.isArray(raw)) {
    raw.forEach((item: any) => {
      const star = Number(item?._id ?? item?.rating ?? item?.star);
      const count = Number(item?.count ?? item?.total ?? 0);
      if (star >= 1 && star <= 5) counts[star] = count;
    });
    return counts;
  }

  Object.keys(raw).forEach((key) => {
    const star = Number(key);
    if (star >= 1 && star <= 5) counts[star] = Number(raw[key]) || 0;
  });
  return counts;
};

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FiStar key={`full-${i}`} className="fill-yellow-400 text-yellow-400" size={size} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <FiStar key={`empty-${i}`} className="text-gray-300" size={size} />
      ))}
    </div>
  );
};

/* ---------- Main Component ---------- */
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('details');
  const [activeImage, setActiveImage] = useState(0);

  // Details sub-tab + description expand state
  const [detailSubTab, setDetailSubTab] = useState('description');
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Review Form State
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Review pagination
  const [reviewPage, setReviewPage] = useState(1);

  const cartItems = useSelector((state: any) => state.cart?.items || []);

  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    hasVariants ? product.variants[0] : null
  );

  // Reset review page if product changes
  useEffect(() => {
    setReviewPage(1);
  }, [product._id]);

  // ✅ Fetch Reviews - with pagination
  const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useGetProductReviewsQuery({
    productId: product._id,
    limit: REVIEWS_PER_PAGE,
    page: reviewPage,
  });

  // ✅ Safe data extraction with proper fallback
  const reviews = (reviewsData as any)?.data || [];
  const totalReviews = (reviewsData as any)?.meta?.total || product.numReviews || 0;
  const averageRating = (reviewsData as any)?.meta?.averageRating || product.rating || 0;
  const ratingCounts = normalizeRatingCounts((reviewsData as any)?.meta?.ratingCounts);
  const totalReviewPages = Math.max(1, Math.ceil(totalReviews / REVIEWS_PER_PAGE));

  // ✅ Create Review Mutation
  const [createReview] = useCreateReviewMutation();

  // ✅ Fetch Related Products
  const categoryId = product.categoryID?._id || '';
  const { data: relatedData, isLoading: relatedLoading } = useGetRelatedProductsQuery(
    categoryId,
    { skip: !categoryId }
  );

  const relatedProducts = (relatedData as any)?.data || [];

  const galleryImages = useMemo(() => {
    return product.images?.length > 0 ? product.images : [product.thumbnail];
  }, [product.images, product.thumbnail]);

  const { price, mrp } = getDisplayPrice(product, selectedVariant);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.stock > 0;
  const isCombo = product.productType === 'combo';

  const cartItemId = getCartItemId(product, selectedVariant);
  const qtyInCart = cartItems.find((it: any) => it.id === cartItemId)?.quantity || 0;

  /* ---------- Cart Handlers ---------- */
const handleAddToCart = () => {
    if (!inStock) return;
    dispatch(
        addToCart({
            id: cartItemId,
              productID: product._id,              // ✅ যোগ করুন
        variantID: selectedVariant?._id,     // ✅ যোগ করুন     // ✅ variant থাকলে তার id, না থাকলে undefined
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
            productID: product._id,
            variantID: selectedVariant?._id,
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

  /* ---------- Review Submit ---------- */
  const handleSubmitReview = async () => {
    if (!session) {
      toast.error('Please login to submit a review');
      return;
    }
    if (reviewRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewComment.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmittingReview(true);
    try {
      await createReview({
        productID: product._id,
        rating: reviewRating,
        comment: reviewComment,
      }).unwrap();

      toast.success('Review submitted successfully!');
      setReviewRating(0);
      setReviewComment('');
      setReviewPage(1);
      refetchReviews();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Transform related products for ProductCard
  const transformedRelatedProducts = relatedProducts.map((p: any) => ({
    id: p._id,
    name: p.name,
    image: p.thumbnail || '/placeholder.png',
    price: p.salePrice || p.regularPrice,
    originalPrice: p.regularPrice,
    mrp: p.regularPrice,
    discount: p.discountPercent || 0,
    rating: p.rating || 0,
    reviews: p.numReviews || 0,
    categoryName: p.categoryID?.name || '',
    unit: p.unit?.shortName || '',
  }));

  const descriptionText = product.description || '';
  const isLongDescription = descriptionText.length > 220;

  return (
    <div className="fixed inset-0 z-[70] flex items-start md:items-center justify-center bg-black/60 p-4 md:p-6">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition"
        >
          <FiX size={22} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-start">
            {/* Left: Image Gallery - sticky so it scrolls together with, and ends together with, the right column */}
            <div className="md:w-[45%] bg-gray-50 p-4 md:p-6 flex-shrink-0 md:sticky md:top-0 md:self-start">
              {/* Standard-size main image box */}
              <div className="relative w-full h-[300px] md:h-[380px] bg-white rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={galleryImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center flex-wrap">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 bg-white p-1 overflow-hidden flex-shrink-0 transition-all ${
                        activeImage === idx
                          ? 'border-[var(--color-primary)] shadow-sm'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="md:w-[55%] p-6 md:p-8">
              <div>
                {/* Category */}
                {product.categoryID?.name && (
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                    {product.categoryID.name}
                  </p>
                )}

                {/* Name */}
                <h2 className="text-2xl font-bold mt-1 leading-tight">{product.name}</h2>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={averageRating || 0} />
                  <span className="text-sm text-gray-500">
                    {averageRating || 0} ({totalReviews} reviews)
                  </span>
                </div>

                {/* Price */}
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

                {/* Stock Status */}
                <div className="mt-2 flex items-center gap-2">
                  {inStock ? (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <FiCheckCircle size={14} /> In Stock
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 flex items-center gap-1">
                      <FiAlertCircle size={14} /> Out of Stock
                    </span>
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

                {/* ✅ Combo Items - Small Table */}
                {isCombo && product.comboItems && product.comboItems.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiPackage className="text-[var(--color-primary)]" size={16} />
                      <p className="text-sm font-semibold text-gray-700">Combo Includes</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-gray-100/50 text-xs font-semibold text-gray-500">
                        <span className="col-span-2">Item</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Price</span>
                      </div>
                      {product.comboItems.map((item: ComboItem, idx: number) => {
                        const p = item.productID;
                        const variant = item.variant || item.selectedVariant;
                        const weight = variant?.weightOrVolume || p?.weightOrVolume || 0;
                        const unit = p?.unit?.shortName || 'kg';
                        const itemPrice = variant?.salePrice || variant?.regularPrice || p?.salePrice || p?.regularPrice || 0;

                        return (
                          <div key={idx} className="grid grid-cols-4 gap-2 px-3 py-2 border-t border-gray-100 items-center hover:bg-gray-100/50 transition-colors">
                            <div className="col-span-2 flex items-center gap-2 min-w-0">
                              <img
                                src={p?.thumbnail}
                                alt={p?.name}
                                className="w-8 h-8 rounded-lg object-cover border flex-shrink-0"
                              />
                              <span className="text-xs font-medium text-gray-700 truncate">
                                {p?.name}
                                {weight > 0 && (
                                  <span className="text-gray-400 font-normal"> ({weight}{unit})</span>
                                )}
                              </span>
                            </div>
                            <span className="text-center text-xs font-medium text-gray-600">
                              ×{item.quantity}
                            </span>
                            <span className="text-right text-xs font-semibold text-gray-800">
                              {formatTk(itemPrice)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity + Add to Cart */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border rounded-xl flex-shrink-0">
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

                  <Button
                    onClick={handleBuyNow}
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="flex-1"
                    rightIcon={<FiZap size={18} />}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* ✅ Short Description - moved below buttons */}
                {product.shortDescription && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 leading-relaxed">{product.shortDescription}</p>
                  </div>
                )}

                {/* Delivery Info */}
                <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                  <FiTruck className="text-[var(--color-primary)]" size={18} />
                  <span className="text-sm text-gray-600">
                    Delivery within 40 - 60 minutes in Barisal city
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Tabs ===== */}
          <div className="border-t border-gray-200">
            <div className="flex gap-6 px-6 md:px-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {tab.id === 'reviews' && totalReviews > 0 && (
                    <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {totalReviews}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ===== Tab Content ===== */}
            <div className="p-6 md:p-8">
              {/* Details Tab - Sub-tabbed: Description / Specifications / Origin */}
              {activeTab === 'details' && (
                <div>
                  {/* Sub-tab pills */}
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {DETAIL_SUB_TABS.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setDetailSubTab(sub.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          detailSubTab === sub.id
                            ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>

                  {/* Description */}
                  {detailSubTab === 'description' && (
                    <div>
                      {descriptionText ? (
                        <>
                          <p
                            className={`text-sm leading-relaxed text-gray-600 whitespace-pre-wrap ${
                              !isDescExpanded && isLongDescription ? 'line-clamp-3' : ''
                            }`}
                          >
                            {descriptionText}
                          </p>
                          {isLongDescription && (
                            <button
                              onClick={() => setIsDescExpanded((v) => !v)}
                              className="mt-2 text-sm font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1"
                            >
                              {isDescExpanded ? (
                                <>
                                  Show less <FiChevronUp size={14} />
                                </>
                              ) : (
                                <>
                                  Show more <FiChevronDown size={14} />
                                </>
                              )}
                            </button>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-gray-400">No description available.</p>
                      )}
                    </div>
                  )}

                  {/* Specifications */}
                  {detailSubTab === 'specifications' && (
                    <div>
                      {product.specifications && product.specifications.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {product.specifications.map((spec: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
                            >
                              <span className="font-medium text-gray-600">{spec.key}</span>
                              <span className="text-gray-500">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">No specifications available.</p>
                      )}
                    </div>
                  )}

                  {/* Origin */}
                  {detailSubTab === 'origin' && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Bangladesh</p>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        Sourced from trusted local farms in Bangladesh. 100% natural &amp; organic cultivation.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  {/* Summary */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{averageRating || 0}</div>
                      <StarRating rating={averageRating || 0} />
                      <div className="text-sm text-gray-500 mt-1">{totalReviews} reviews</div>
                    </div>
                    <div className="flex-1 w-full">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingCounts[star] || 0;
                        const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                        return (
                          <div key={star} className="flex items-center gap-2 mt-1 first:mt-0">
                            <span className="text-sm text-gray-600 w-8">{star} ★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-yellow-400 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-10 text-right">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review List */}
                  {reviewsLoading ? (
                    <div className="text-center py-8 text-gray-400">Loading reviews...</div>
                  ) : reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review: any) => (
                        <div key={review._id} className="border-b border-gray-100 pb-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                              {review.user?.firstName?.[0] || 'U'}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">
                                {review.user?.firstName} {review.user?.lastName}
                              </p>
                              <StarRating rating={review.rating} />
                            </div>
                            <span className="ml-auto text-xs text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <FiMessageCircle size={40} className="mx-auto mb-2 text-gray-300" />
                      <p>No reviews yet. Be the first to review!</p>
                    </div>
                  )}

                  {/* ✅ Pagination */}
                  {!reviewsLoading && totalReviews > REVIEWS_PER_PAGE && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <button
                        onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                        disabled={reviewPage === 1}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-400 transition-all"
                      >
                        <FiChevronLeft size={16} />
                      </button>

                      {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setReviewPage(pageNum)}
                          className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all ${
                            reviewPage === pageNum
                              ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                              : 'border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => setReviewPage((p) => Math.min(totalReviewPages, p + 1))}
                        disabled={reviewPage === totalReviewPages}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-400 transition-all"
                      >
                        <FiChevronRight size={16} />
                      </button>
                    </div>
                  )}

                  {/* ===== Write Review Form ===== */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-4">Write a Review</h4>

                    {session ? (
                      <div className="space-y-4">
                        {/* Rating */}
                        <div>
                          <label className="text-sm text-gray-600 block mb-1.5">Your Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setReviewRating(star)}
                                className={`text-2xl transition-all ${
                                  star <= reviewRating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300 hover:text-yellow-200'
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Comment */}
                        <div>
                          <label className="text-sm text-gray-600 block mb-1.5">Your Review</label>
                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            rows={3}
                            placeholder="Share your experience with this product..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none"
                          />
                        </div>

                        <Button
                          onClick={handleSubmitReview}
                          variant="primary"
                          size="md"
                          isLoading={isSubmittingReview}
                          leftIcon={<FiSend size={16} />}
                        >
                          Submit Review
                        </Button>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <p className="text-sm text-gray-500">
                          Please <button className="text-[var(--color-primary)] font-medium hover:underline">login</button> to write a review
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== Related Products Section ===== */}
          {relatedLoading ? (
            <div className="border-t border-gray-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FiShoppingBag className="text-[var(--color-primary)]" />
                  Related Products
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl animate-pulse h-48" />
                ))}
              </div>
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="border-t border-gray-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FiShoppingBag className="text-[var(--color-primary)]" />
                  Related Products
                </h3>
              </div>
              <div className="-mx-2">
                <Swiper
                  modules={[FreeMode]}
                  spaceBetween={12}
                  slidesPerView={2}
                  breakpoints={{
                    480: { slidesPerView: 2, spaceBetween: 12 },
                    640: { slidesPerView: 3, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 16 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  freeMode={true}
                  grabCursor={true}
                  className="related-products-swiper"
                >
                  {transformedRelatedProducts.map((p: any) => (
                    <SwiperSlide key={p.id}>
                      <ProductCard product={p} onQuickView={() => {}} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;