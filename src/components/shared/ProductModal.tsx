


"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  FiX,
  FiZap,
  FiStar,
  FiMessageCircle,
  FiTruck,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiPackage,
  FiShoppingBag,
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
  unitName?: string;
  unitShortName?: string;
  costPrice: number;
  regularPrice: number;
  salePrice: number;
  stock: number;
}

interface ComboItem {
  productID: string;
  quantity: number;
  selectedVariant?: string | null;
  productName?: string;
  productSlug?: string;
  productThumbnail?: string;
  weightOrVolume?: number | null;
  unitName?: string | null;
  unitShortName?: string | null;
}

interface Product {
  _id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  categoryID?: { name: string; _id: string };
  categoryDetails?: { name: string; _id: string };
  brandID?: { name: string; _id: string; logo?: string };
  brandDetails?: { name: string; _id: string; logo?: string };
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
  unit?: { _id: string; name: string; shortName: string };
  unitDetails?: { name: string; shortName: string };
  unitName?: string;
  unitShortName?: string;
  weightOrVolume?: number;
  discountPercent?: number;
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

  const [detailSubTab, setDetailSubTab] = useState('description');
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [reviewPage, setReviewPage] = useState(1);

  const cartItems = useSelector((state: any) => state.cart?.items || []);

  const productId = product?._id;

  const hasVariants = !!(product?.variants && product.variants.length > 0);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product?.variants?.length ? product.variants[0] : null
  );

  // Product change hole reset
  useEffect(() => {
    setSelectedVariant(product?.variants?.length ? product.variants[0] : null);
    setReviewPage(1);
    setActiveImage(0);
    setActiveTab('details');
    setDetailSubTab('description');
    setIsDescExpanded(false);
  }, [product?._id]);

  // Reviews
  const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useGetProductReviewsQuery(
    {
      productId,
      limit: REVIEWS_PER_PAGE,
      page: reviewPage,
    },
    { skip: !productId }
  );

  const reviews = (reviewsData as any)?.data || [];
  const totalReviews = (reviewsData as any)?.meta?.total || product?.numReviews || 0;
  const averageRating = (reviewsData as any)?.meta?.averageRating || product?.rating || 0;
  const ratingCounts = normalizeRatingCounts((reviewsData as any)?.meta?.ratingCounts);
  const totalReviewPages = Math.max(1, Math.ceil(totalReviews / REVIEWS_PER_PAGE));

  const [createReview] = useCreateReviewMutation();

  // ✅ সঠিকভাবে categoryId বের করা - উভয় জায়গা থেকে
  const categoryId = useMemo(() => {
    if (!product) return '';
    
    // categoryDetails থেকে নেওয়া (Category Page থেকে আসলে)
    if (product.categoryDetails?._id) {
      return product.categoryDetails._id;
    }
    // categoryID থেকে নেওয়া (Home Page থেকে আসলে)
    if (product.categoryID?._id) {
      return product.categoryID._id;
    }
    // যদি string হয়
    if (typeof product.categoryID === 'string') {
      return product.categoryID;
    }
    return '';
  }, [product]);

  // Related products
  const { data: relatedData, isLoading: relatedLoading } = useGetRelatedProductsQuery(
    categoryId,
    { skip: !categoryId }
  );

  const relatedProducts = (relatedData as any)?.data || [];

  const galleryImages = useMemo(() => {
    if (!product) return [];
    return product.images?.length > 0 ? product.images : [product.thumbnail];
  }, [product]);

  if (!product) return null;

  const { price, mrp } = getDisplayPrice(product, selectedVariant);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const inStock = selectedVariant ? selectedVariant.stock > 0 : (product?.stock ?? 0) > 0;
  const isCombo = product?.productType === 'combo';

  const cartItemId = getCartItemId(product, selectedVariant);
  const qtyInCart = cartItems.find((it: any) => it.id === cartItemId)?.quantity || 0;

  // ✅ Related Products Transform - পুরো product object
  const transformedRelatedProducts = useMemo(() => {
    if (!relatedProducts || relatedProducts.length === 0) return [];
    
    return relatedProducts.map((p: any) => ({
      ...p,
      id: p._id,
      _id: p._id,
      name: p.name,
      thumbnail: p.thumbnail || '/placeholder.png',
      image: p.thumbnail || '/placeholder.png',
      salePrice: p.salePrice || 0,
      regularPrice: p.regularPrice || 0,
      price: p.salePrice || p.regularPrice,
      originalPrice: p.regularPrice,
      mrp: p.regularPrice,
      discountPercent: p.discountPercent || 0,
      rating: p.rating || 0,
      numReviews: p.numReviews || 0,
      categoryID: p.categoryID,
      categoryDetails: p.categoryDetails,
      unit: p.unit,
      unitDetails: p.unitDetails,
      stock: p.stock || 0,
      variants: p.variants || [],
      productType: p.productType || 'single',
      comboItems: p.comboItems || [],
      description: p.description || '',
      shortDescription: p.shortDescription || '',
      specifications: p.specifications || [],
      images: p.images || [],
    }));
  }, [relatedProducts]);

  /* ---------- Cart Handlers ---------- */
  const handleAddToCart = () => {
    if (!product || !inStock) {
      toast.error('Product is out of stock');
      return;
    }
    dispatch(
      addToCart({
        id: cartItemId,
        productID: product._id,
        variantID: selectedVariant?._id,
        name: selectedVariant
          ? `${product.name} (${selectedVariant.weightOrVolume} ${selectedVariant.unitShortName || 'kg'})`
          : product.name,
        price,
        mrp,
        image: product.thumbnail,
        category: product.categoryID?.name || product.categoryDetails?.name || '',
        quantity: 1,
      })
    );
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    if (!product || !inStock) {
      toast.error('Product is out of stock');
      return;
    }
    dispatch(
      addToCart({
        id: cartItemId,
        productID: product._id,
        variantID: selectedVariant?._id,
        name: selectedVariant
          ? `${product.name} (${selectedVariant.weightOrVolume} ${selectedVariant.unitShortName || 'kg'})`
          : product.name,
        price,
        mrp,
        image: product.thumbnail,
        category: product.categoryID?.name || product.categoryDetails?.name || '',
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
        productID: productId,
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

  const descriptionText = product?.description || '';
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
            {/* Left: Image Gallery */}
            <div className="md:w-[45%] bg-gray-50 p-4 md:p-6 flex-shrink-0 md:sticky md:top-0 md:self-start">
              <div className="relative w-full h-[300px] md:h-[380px] bg-white rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={galleryImages[activeImage] || product.thumbnail || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
                {!inStock && (
                  <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

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
                {(product.categoryID?.name || product.categoryDetails?.name) && (
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                    {product.categoryID?.name || product.categoryDetails?.name}
                  </p>
                )}

                <h2 className="text-2xl font-bold mt-1 leading-tight">{product.name}</h2>

                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={averageRating || 0} />
                  <span className="text-sm text-gray-500">
                    {averageRating || 0} ({totalReviews} reviews)
                  </span>
                </div>

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

                {hasVariants && (
                  <div className="mt-6">
                    <p className="font-semibold text-sm mb-2">Size / Weight</p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v: Variant) => {
                        const variantOutOfStock = v.stock <= 0;
                        return (
                          <button
                            key={v._id}
                            onClick={() => !variantOutOfStock && setSelectedVariant(v)}
                            disabled={variantOutOfStock}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                              variantOutOfStock
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                                : selectedVariant?._id === v._id
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {v.weightOrVolume} {v.unitShortName || 'kg'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Combo Items */}
                {isCombo && product.comboItems && product.comboItems.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiPackage className="text-[var(--color-primary)]" size={16} />
                      <p className="text-sm font-semibold text-gray-700">Combo Includes</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      <div className="grid grid-cols-3 gap-2 px-3 py-2 bg-gray-100/50 text-xs font-semibold text-gray-500">
                        <span className="col-span-2">Item</span>
                        <span className="text-right">Qty</span>
                      </div>
                      {product.comboItems.map((item: ComboItem, idx: number) => {
                        const weightOrVolume = item.weightOrVolume;
                        const unit = item.unitShortName || '';

                        let itemName = item.productName || 'Product';
                        if (weightOrVolume && unit) {
                          itemName += ` (${weightOrVolume} ${unit})`;
                        }

                        return (
                          <div
                            key={item.productID + idx}
                            className="grid grid-cols-3 gap-2 px-3 py-2 border-t border-gray-100 items-center hover:bg-gray-100/50 transition-colors"
                          >
                            <div className="col-span-2 flex items-center gap-2 min-w-0">
                              {item.productThumbnail && (
                                <img
                                  src={item.productThumbnail}
                                  alt={item.productName || ''}
                                  className="w-8 h-8 rounded-lg object-cover border flex-shrink-0"
                                />
                              )}
                              <span className="text-xs font-medium text-gray-700 truncate">
                                {itemName}
                              </span>
                            </div>
                            <span className="text-right text-xs font-medium text-gray-600">
                              ×{item.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border rounded-xl flex-shrink-0">
                    <button
                      onClick={() => {
                        if (qtyInCart > 0) dispatch(decreaseQuantity(cartItemId));
                      }}
                      disabled={qtyInCart === 0 || !inStock}
                      className={`w-12 h-12 flex items-center justify-center text-2xl rounded-l-xl ${
                        qtyInCart > 0 && inStock ? 'hover:bg-gray-100' : 'opacity-40 cursor-not-allowed'
                      }`}
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{qtyInCart}</span>
                    <button
                      onClick={handleAddToCart}
                      disabled={!inStock}
                      className={`w-12 h-12 flex items-center justify-center text-2xl rounded-r-xl ${
                        inStock ? 'hover:bg-gray-100' : 'opacity-40 cursor-not-allowed'
                      }`}
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
                    disabled={!inStock}
                  >
                    {inStock ? 'Buy Now' : 'Out of Stock'}
                  </Button>
                </div>

                {!inStock && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                    <FiAlertCircle className="text-red-500" size={16} />
                    <span className="text-sm text-red-600 font-medium">
                      This product is currently out of stock
                    </span>
                  </div>
                )}

                {product.shortDescription && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                )}

                <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                  <FiTruck className="text-[var(--color-primary)]" size={18} />
                  <span className="text-sm text-gray-600">
                    Delivery within 40 - 60 minutes in Barisal city
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
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

            <div className="p-6 md:p-8">
              {activeTab === 'details' && (
                <div>
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

                  {detailSubTab === 'origin' && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Bangladesh</p>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        Sourced from trusted local farms in Bangladesh. 100% natural &amp; organic
                        cultivation.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{averageRating || 0}</div>
                      <StarRating rating={averageRating || 0} />
                      <div className="text-sm text-gray-500 mt-1">{totalReviews} reviews</div>
                    </div>
                    <div className="flex-1 w-full">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingCounts[star] || 0;
                        const percentage =
                          totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                        return (
                          <div key={star} className="flex items-center gap-2 mt-1 first:mt-0">
                            <span className="text-sm text-gray-600 w-8">{star} ★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-yellow-400 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-10 text-right">
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

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

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-4">Write a Review</h4>

                    {session ? (
                      <div className="space-y-4">
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
                          Please{' '}
                          <button className="text-[var(--color-primary)] font-medium hover:underline">
                            login
                          </button>{' '}
                          to write a review
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
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
          ) : transformedRelatedProducts.length > 0 ? (
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
                      <ProductCard 
                        product={p} 
                        onQuickView={() => {
                          // Related Product ক্লিক করলে নতুন Modal খোলা
                          onClose();
                          // প্যারেন্ট কম্পোনেন্টে নতুন product পাঠানোর জন্য
                          // এখানে একটি callback function পাঠাতে হবে
                        }}
                      />
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