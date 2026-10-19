'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  FiRepeat,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiShoppingBag,
  FiArrowRight,
  FiPackage,
  FiBox,
  FiGrid,
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
  const [selectedSubProduct, setSelectedSubProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpenSubscribe = (pkg: any) => {
    setSelectedSubProduct(pkg);
    setIsModalOpen(true);
  };

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
      })
    );
    toast.success(`${pkg.name} added to cart!`);
  };

  // 1. Process dynamic packages directly from the database API
  const normalizedPackages = useMemo(() => {
    if (!initialPackages || initialPackages.length === 0) return [];

    return initialPackages.map((p: any) => {
      const itemsList = Array.isArray(p.items)
        ? p.items.map((it: any) =>
            typeof it === 'string'
              ? it
              : it.quantity
              ? `${it.itemName} (${it.quantity})`
              : it.itemName
          )
        : [p.shortDescription || 'Essential items included'];

      const regular = Number(p.regularPrice) || 0;
      const subPrice = Number(p.subscriptionPrice) || Math.round(regular * 0.92);
      const discount =
        p.discountPercent !== undefined && p.discountPercent > 0
          ? p.discountPercent
          : regular > 0
          ? Math.max(0, Math.round(((regular - subPrice) / regular) * 100))
          : 8;

      return {
        _id: p._id,
        name: p.name,
        category:
          p.category ||
          (p.boxType === 'cleaning'
            ? 'Household & Cleaning'
            : p.boxType === 'vegetable'
            ? 'Fresh Vegetables'
            : 'Curated Box'),
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
      };
    });
  }, [initialPackages]);

  // 2. Extract distinct categories dynamically from packages
  const availableCategories = useMemo(() => {
    const list: string[] = [];
    normalizedPackages.forEach((pkg) => {
      if (pkg.category && !list.includes(pkg.category)) {
        list.push(pkg.category);
      }
    });
    return list;
  }, [normalizedPackages]);

  const [activeTab, setActiveTab] = useState<string>('all');

  // 3. Filter packages based on active category tab
  const displayedPackages = useMemo(() => {
    if (activeTab === 'all') return normalizedPackages;
    return normalizedPackages.filter(
      (p) =>
        p.category === activeTab ||
        p.boxType === activeTab ||
        p.boxType === activeTab.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    );
  }, [normalizedPackages, activeTab]);

  return (
    <section
      className="py-14 bg-gradient-to-b from-[#fbfcfa] via-[#f7faf2]/50 to-[#ffffff] relative overflow-hidden"
      id="subscriptions"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#619d23]/10 text-[#619d23] border border-[#619d23]/20 text-xs font-black uppercase tracking-wider mb-3">
            <FiRepeat className="text-[#619d23] animate-spin-slow" />
            <span>SobjiHut Auto-Delivery & Subscriptions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Curated Subscription Boxes
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Buy once or subscribe for scheduled recurring deliveries. Save up to 10% on every order with guaranteed <strong>100% free delivery</strong>!
          </p>

          {/* Dynamic Tab Switcher */}
          {availableCategories.length > 0 && (
            <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-gray-100/90 rounded-2xl mt-6 border border-gray-200 shadow-2xs gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#619d23] text-white shadow-md shadow-[#619d23]/25'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FiGrid />
                <span>All Boxes ({normalizedPackages.length})</span>
              </button>

              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    activeTab === cat
                      ? 'bg-[#619d23] text-white shadow-md shadow-[#619d23]/25'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiBox />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {displayedPackages.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 mx-auto flex items-center justify-center text-2xl">
              <FiPackage />
            </div>
            <h4 className="font-extrabold text-gray-800 text-base">No Subscription Boxes Available</h4>
            <p className="text-xs text-gray-500">
              There are currently no active subscription packages in this category. Please check back soon or explore other categories.
            </p>
          </div>
        ) : (
          /* Packages Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#619d23]/70"
              >
                {/* Card Image Banner */}
                <div
                  onClick={() => handleOpenSubscribe(pkg)}
                  className="relative h-52 w-full overflow-hidden bg-gray-100 cursor-pointer"
                  title="Click to view details and subscribe"
                >
                  <img
                    src={pkg.thumbnail}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Badges */}
                  <span className="absolute top-3 left-3 bg-[#619d23] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                    {pkg.badge}
                  </span>

                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#619d23] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <FiRepeat size={11} /> {pkg.frequencyText}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block">
                      {pkg.category || pkg.idealFor}
                    </span>
                    <h3 className="text-base sm:text-lg font-black line-clamp-1">{pkg.name}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Items checklist */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Included in this box:
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenSubscribe(pkg)}
                        className="text-[11px] text-[#619d23] font-bold hover:underline cursor-pointer"
                      >
                        View All ({pkg.items.length})
                      </button>
                    </div>
                    <ul className="space-y-1.5">
                      {pkg.items.slice(0, 5).map((item: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <FiCheckCircle className="text-[#619d23] shrink-0 mt-0.5 text-xs" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                      {pkg.items.length > 5 && (
                        <li>
                          <button
                            type="button"
                            onClick={() => handleOpenSubscribe(pkg)}
                            className="text-[11px] text-[#619d23] hover:text-[#52861c] font-bold pl-4 flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <span>+ {pkg.items.length - 5} more items (Click to view)</span>
                            <FiArrowRight size={12} />
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Price Strip */}
                  <div className="bg-[#619d23]/8 border border-[#619d23]/20 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">Subscription Price</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-[#619d23]">৳{pkg.salePrice}</span>
                        {pkg.regularPrice > pkg.salePrice && (
                          <span className="text-xs text-gray-400 line-through">৳{pkg.regularPrice}</span>
                        )}
                      </div>
                    </div>
                    <span className="bg-[#619d23] text-white text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-xs">
                      {pkg.subscriptionDiscountPercent > 0
                        ? `Save ${pkg.subscriptionDiscountPercent}% + Free Delivery`
                        : 'Free Delivery'}
                    </span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleOneTimeBuy(pkg)}
                      className="py-2.5 px-3 rounded-xl border border-gray-300 hover:border-[#619d23] bg-white hover:bg-gray-50 text-gray-800 hover:text-[#619d23] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                    >
                      <FiShoppingBag size={14} />
                      <span>One-Time Buy</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenSubscribe(pkg)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#619d23] to-[#76b533] hover:from-[#52861c] hover:to-[#619d23] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#619d23]/25 cursor-pointer"
                    >
                      <FiRepeat size={14} />
                      <span>Subscribe Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Value Prop Banner */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#619d23]/10 text-[#619d23] flex items-center justify-center text-xl shrink-0">
                <FiRepeat />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">Automated Schedule</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Never worry about reordering daily essentials. Delivered directly to your home on time.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#619d23]/10 text-[#619d23] flex items-center justify-center text-xl shrink-0">
                <FiTruck />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">100% Free Delivery</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Every recurring subscription box includes guaranteed free doorstep shipping.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                <FiShield />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">Skip or Pause Anytime</h4>
                <p className="text-xs text-gray-500 mt-1">
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
