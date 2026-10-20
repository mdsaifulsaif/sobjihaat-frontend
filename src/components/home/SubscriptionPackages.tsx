'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FiRepeat,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiShoppingBag,
  FiArrowRight,
  FiPackage,
  FiBox,
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import SubscriptionModal from '@/components/shared/SubscriptionModal';
import toast from 'react-hot-toast';

interface Props {
  initialPackages?: any[];
  initialProducts?: any[];
}

export default function SubscriptionPackages({ initialPackages = [] }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedSubProduct, setSelectedSubProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Process dynamic packages directly from the database API
  const normalizedPackages = useMemo(() => {
    if (!initialPackages || initialPackages.length === 0) return [];

    return initialPackages.map((p: any) => {
      let catName = (p.category || '').trim();
      if (!catName) {
        if (p.boxType === 'cleaning') catName = 'Household & Cleaning';
        else if (p.boxType === 'vegetable' || p.boxType === 'vegetables') catName = 'Fresh Vegetables';
        else if (p.boxType === 'fruits' || p.boxType === 'fruit') catName = 'Organic Fruits';
        else if (p.boxType) {
          catName = p.boxType.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        } else {
          catName = 'Curated Box';
        }
      } else if (catName.toLowerCase() === 'cleaning') {
        catName = 'Household & Cleaning';
      }

      const itemsList = Array.isArray(p.items)
        ? p.items.map((it: any) => {
            if (typeof it === 'string') return it;
            if (it && it.itemName) {
              return it.quantity ? `${it.itemName} (${it.quantity})` : it.itemName;
            }
            return 'Essential item';
          })
        : [p.shortDescription || 'Essential items included'];

      const regular = Number(p.regularPrice) || 0;
      const subPrice = Number(p.subscriptionPrice) || Math.round(regular * 0.92);
      const discount =
        p.discountPercent !== undefined && p.discountPercent > 0
          ? p.discountPercent
          : regular > 0 && regular > subPrice
          ? Math.max(0, Math.round(((regular - subPrice) / regular) * 100))
          : 0;

      return {
        _id: p._id,
        name: p.name,
        category: catName,
        boxType: p.boxType || 'general',
        sku: p.sku || 'SUB-BOX',
        thumbnail: p.thumbnail || '/images/monthly_cleaning_box.jpg',
        badge: p.badge || (discount > 0 ? `${discount}% OFF` : 'Popular Choice'),
        frequencyText:
          p.frequencyText ||
          (p.frequency === 'weekly' ? 'Every Week (1x)' : 'Every Month (1x)'),
        frequency: p.frequency || 'monthly',
        regularPrice: regular,
        subscriptionPrice: subPrice,
        salePrice: subPrice,
        subscriptionDiscountPercent: discount,
        items: itemsList,
        rawItems: p.items,
        idealFor: p.idealFor || p.shortDescription || 'Scheduled recurring doorstep delivery',
        status: p.status || 'active',
        isPinnedToHome: Boolean(p.isPinnedToHome),
        sortOrder: p.sortOrder !== undefined ? Number(p.sortOrder) : 999,
      };
    });
  }, [initialPackages]);

  // 2. Extract distinct categories dynamically, ordered by admin priority (isPinnedToHome first, then lowest sortOrder)
  const availableCategories = useMemo(() => {
    const catMap = new Map<string, { isPinned: boolean; minOrder: number }>();

    normalizedPackages.forEach((pkg) => {
      if (!pkg.category) return;
      const existing = catMap.get(pkg.category);
      const isPinned = Boolean(pkg.isPinnedToHome);
      const order = typeof pkg.sortOrder === 'number' ? pkg.sortOrder : 999;

      if (!existing) {
        catMap.set(pkg.category, { isPinned, minOrder: order });
      } else {
        catMap.set(pkg.category, {
          isPinned: existing.isPinned || isPinned,
          minOrder: Math.min(existing.minOrder, order),
        });
      }
    });

    // Sort: pinned categories first, then by lowest sortOrder (priority)
    const sorted = Array.from(catMap.entries()).sort((a, b) => {
      if (a[1].isPinned !== b[1].isPinned) {
        return a[1].isPinned ? -1 : 1;
      }
      return a[1].minOrder - b[1].minOrder;
    });

    return sorted.map(([cat]) => cat);
  }, [normalizedPackages]);

  // 3. Default category selection (top prioritized category)
  const defaultCategory = useMemo(() => {
    return availableCategories[0] || '';
  }, [availableCategories]);

  const [activeTab, setActiveTab] = useState<string>('');

  // Keep activeTab synced with available categories
  useEffect(() => {
    if (defaultCategory && (!activeTab || !availableCategories.includes(activeTab))) {
      setActiveTab(defaultCategory);
    }
  }, [defaultCategory, availableCategories, activeTab]);

  // 4. Filter packages based on active category tab
  const displayedPackages = useMemo(() => {
    const selected = activeTab || defaultCategory;
    if (!selected) return normalizedPackages;
    return normalizedPackages.filter((p) => p.category === selected);
  }, [normalizedPackages, activeTab, defaultCategory]);

  const handleOpenSubscribe = (pkg: any) => {
    setSelectedSubProduct(pkg);
    setIsModalOpen(true);
  };

  // One-time buy directly adds to cart and proceeds to checkout
  const handleOneTimeBuy = (pkg: any) => {
    dispatch(
      addToCart({
        id: pkg._id,
        productID: pkg._id,
        name: pkg.name,
        price: pkg.regularPrice,
        mrp: pkg.regularPrice,
        image: pkg.thumbnail,
        category: pkg.category,
        quantity: 1,
      })
    );
    toast.success(`${pkg.name} added. Proceeding to checkout...`);
    router.push('/checkout');
  };

  if (!initialPackages || initialPackages.length === 0) {
    return null;
  }

  return (
    <section
      className="py-12 sm:py-16 bg-[#fbfcfa] relative overflow-hidden"
      id="subscriptions"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <FiRepeat className="text-[var(--color-primary)]" />
            <span>Regular Auto-Delivery & Subscriptions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Curated Subscription <span className="text-[var(--color-primary)]">Packages</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Choose your preferred box and get scheduled recurring delivery at your doorstep with guaranteed <strong>100% free delivery</strong>.
          </p>

          {/* Category Tabs (No "All Boxes", defaults to first/admin selected category) */}
          {availableCategories.length > 0 && (
            <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-gray-150/70 rounded-xl mt-6 border border-gray-200 shadow-2xs gap-1.5">
              {availableCategories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveTab(cat)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white shadow-xs'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'
                    }`}
                  >
                    <FiBox size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Empty State */}
        {displayedPackages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 mx-auto flex items-center justify-center text-2xl">
              <FiPackage />
            </div>
            <h4 className="font-bold text-gray-800 text-base">No Subscription Boxes Available</h4>
            <p className="text-xs text-gray-500">
              There are currently no active subscription packages in this category. Please check back soon or explore other categories.
            </p>
          </div>
        ) : (
          /* Packages Cards Grid (3 cards per category, top image header style from design) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {displayedPackages.map((pkg, idx) => {
              const isFeatured = pkg.isPinnedToHome || idx === 1;

              return (
                <div
                  key={pkg._id}
                  className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden group ${
                    isFeatured
                      ? 'border-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/10 ring-1 ring-[var(--color-primary)]/30'
                      : 'border-gray-200/90 shadow-xs hover:shadow-lg hover:border-gray-300'
                  }`}
                >
                  {/* Top Visual Section with Package Image Background */}
                  <div
                    onClick={() => handleOpenSubscribe(pkg)}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900 cursor-pointer select-none"
                    title="Click to view full details"
                  >
                    {/* Background Image */}
                    {pkg.thumbnail ? (
                      <img
                        src={pkg.thumbnail}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-gray-900" />
                    )}

                    {/* Gradient Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {pkg.badge}
                      </span>

                      <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <FiRepeat size={11} className="text-emerald-300" />
                        <span>{pkg.frequencyText}</span>
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block mb-0.5">
                        {pkg.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white line-clamp-1 drop-shadow-sm">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  {/* Lower Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    {/* Price Header */}
                    <div className="border-b border-gray-100 pb-3.5">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-black text-gray-900">
                          ৳{pkg.salePrice}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 font-semibold">
                          / {pkg.frequency === 'weekly' ? 'week' : 'month'}
                        </span>
                        {pkg.regularPrice > pkg.salePrice && (
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ৳{pkg.regularPrice}
                          </span>
                        )}
                        {pkg.subscriptionDiscountPercent > 0 && (
                          <span className="ml-auto text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-0.5 rounded-full">
                            Save {pkg.subscriptionDiscountPercent}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-1">
                        {pkg.idealFor}
                      </p>
                    </div>

                    {/* Items Checklist */}
                    <div className="space-y-2 flex-1">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Included in this package:
                      </p>
                      <ul className="space-y-2">
                        {pkg.items.slice(0, 5).map((item: any, itemIdx: number) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                          >
                            <FiCheckCircle
                              className="text-[var(--color-primary)] shrink-0 mt-0.5 text-sm"
                            />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                        {pkg.items.length > 5 && (
                          <li className="pt-0.5">
                            <button
                              type="button"
                              onClick={() => handleOpenSubscribe(pkg)}
                              className="text-xs text-[var(--color-primary)] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>+ {pkg.items.length - 5} more items</span>
                              <FiArrowRight size={12} />
                            </button>
                          </li>
                        )}
                      </ul>

                      {/* Free Delivery Banner */}
                      <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 border border-emerald-150 px-3 py-2 rounded-xl mt-3.5">
                        <FiTruck size={14} className="text-[var(--color-primary)] shrink-0" />
                        <span className="font-semibold">Guaranteed 100% Free Doorstep Delivery</span>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => handleOneTimeBuy(pkg)}
                        className="py-2.5 px-3 rounded-xl border border-gray-250 hover:border-[var(--color-primary)] bg-white hover:bg-gray-50 text-gray-800 hover:text-[var(--color-primary)] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
                      >
                        <FiShoppingBag size={14} />
                        <span>One-Time Buy</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenSubscribe(pkg)}
                        className="py-2.5 px-3 rounded-xl bg-[var(--color-primary)] hover:bg-[#52861c] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[var(--color-primary)]/20 cursor-pointer active:scale-98"
                      >
                        <FiRepeat size={14} />
                        <span>Subscribe Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Value Prop Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-lg shrink-0">
                <FiRepeat />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Automated Schedule</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Never worry about reordering daily essentials. Delivered directly to your home on time.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-lg shrink-0">
                <FiTruck />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">100% Free Delivery</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Every recurring subscription box includes guaranteed free doorstep shipping.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shrink-0">
                <FiShield />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Skip or Pause Anytime</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Going out of town? You can pause, skip, or modify your delivery schedule with 1 click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Confirmation Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedSubProduct}
      />
    </section>
  );
}
