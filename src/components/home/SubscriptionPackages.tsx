'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FiRepeat,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiShoppingBag,
  FiMessageSquare,
  FiArrowRight,
  FiPackage,
  FiBox,
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import SubscriptionModal from '@/components/shared/SubscriptionModal';
import toast from 'react-hot-toast';

export default function SubscriptionPackages() {
  const [activeTab, setActiveTab] = useState<'veggie' | 'cleaning'>('cleaning');
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
    toast.success(`${pkg.name} কার্টে যোগ করা হয়েছে!`);
  };

  const cleaningPackages = [
    {
      _id: 'sub-clean-family-basic',
      name: 'ফ্যামিলি বেসিক ক্লিনিং বক্স',
      category: 'Household & Cleaning',
      sku: 'CLN-FAM-BSC',
      thumbnail: '/images/monthly_cleaning_box.jpg',
      badge: 'জনপ্রিয় ফ্যামিলি চয়েস',
      frequencyText: 'প্রতি মাসে ১ বার',
      frequency: 'monthly' as const,
      regularPrice: 950,
      subscriptionDiscountPercent: 8,
      salePrice: 875,
      items: [
        'হুইল / সার্ফ এক্সেল ডিটারজেন্ট (১ কেজি)',
        'হারপিক টয়লেট ক্লিনার (৭৫০ মিলি)',
        'ভিম বার / লিকুইড ডিশওয়াশার (৫০০ গ্রাম/মিলি)',
        'লাইফবয় / ডেটোল গায়ের সাবান (২ পিস)',
        'ক্লোজআপ / কোলগেট টুথপেস্ট (১২০ গ্রাম)',
        'হ্যান্ডওয়াশ রিফিল প্যাক (২০০ মিলি)',
      ],
      idealFor: '৩–৪ জনের সাধারণ পরিবারের মাসিক প্রয়োজন',
    },
    {
      _id: 'sub-clean-family-premium',
      name: 'ফ্যামিলি প্রিমিয়াম হাইজিন কেয়ার বক্স',
      category: 'Household & Cleaning',
      sku: 'CLN-FAM-PRM',
      thumbnail: '/images/monthly_cleaning_box.jpg',
      badge: 'সম্পূর্ণ হোম কেয়ার',
      frequencyText: 'প্রতি মাসে ১ বার',
      frequency: 'monthly' as const,
      regularPrice: 1650,
      subscriptionDiscountPercent: 10,
      salePrice: 1485,
      items: [
        'সার্ফ এক্সেল ম্যাটিক ডিটারজেন্ট (১ কেজি)',
        'হারপিক টয়লেট ক্লিনার (৭৫০ মিলি)',
        'ভিম লিকুইড ডিশওয়াশ (৫০০ মিলি বোতল)',
        'ডেটোল / স্যাভলন সাবান (৪ পিস)',
        'লাইজল / ফিনিস ফ্লোর ক্লিনার (১ লিটার)',
        'ফেসিয়াল টিস্যু বক্স (২টি) + টয়লেট টিস্যু (৪ রোল)',
        'লং লাস্টিং রুম ফ্রেশনার স্প্রে (২০০ মিলি)',
        'সেনসোডাইন / কোলগেট টোটাল টুথপেস্ট',
      ],
      idealFor: 'বড় পরিবার বা কমপ্লিট মাসিক হোম কেয়ার সল্যুশন',
    },
    {
      _id: 'sub-clean-office-pack',
      name: 'অফিস হাইজিন ও কেয়ার বক্স (B2B)',
      category: 'Office Essentials',
      sku: 'CLN-OFF-PRO',
      thumbnail: '/images/monthly_cleaning_box.jpg',
      badge: 'অফিস ও প্রতিষ্ঠানের জন্য',
      frequencyText: 'প্রতি মাসে ১ বার',
      frequency: 'monthly' as const,
      regularPrice: 2450,
      subscriptionDiscountPercent: 10,
      salePrice: 2200,
      items: [
        'ফেসিয়াল টিস্যু বড় বক্স (৪ বক্স)',
        'টয়লেট টিস্যু রোল প্যাক (১২ রোল)',
        'বড় হ্যান্ডওয়াশ পাম্প বোতল (৫০০ মিলি x ২)',
        'হারপিক টয়লেট ক্লিনার (১ লিটার)',
        'ফ্লোর ও টাইলস ক্লিনার (১ লিটার)',
        'গ্লাস ক্লিনার স্প্রে (Mr. Brasso)',
        'প্রিমিয়াম রুম ফ্রেশনার স্প্রে (৩০০ মিলি)',
        'ডিশওয়াশ লিকুইড ও স্ক্রাবার সেট',
      ],
      idealFor: 'যেকোনো কর্পোরেট অফিস, শোরুম, ব্যাংক শাখা ও চেম্বার',
    },
  ];

  const veggiePackages = [
    {
      _id: 'sub-veg-standard-box',
      name: 'স্ট্যান্ডার্ড ফ্যামিলি উইকলি সবজি বক্স (৫ কেজি)',
      category: 'Fresh Vegetables',
      sku: 'VEG-BOX-STD',
      thumbnail: '/images/weekly_veggie_box.jpg',
      badge: 'সেরা সাপ্তাহিক ভ্যালু',
      frequencyText: 'প্রতি সপ্তাহে ১ বার',
      frequency: 'weekly' as const,
      regularPrice: 580,
      subscriptionDiscountPercent: 8,
      salePrice: 535,
      variantName: '৫ কেজি সাইজ',
      items: [
        'আলু ১.৫ কেজি + দেশি পেঁয়াজ ১ কেজি',
        'রসুন ২৫০ গ্রাম + কাঁচামরিচ ও আদা ২৫০ গ্রাম',
        'টাটকা লাউ / ফুলকপি / বাঁধাকপি ১টি',
        'বেগুন / পটল ৫০০ গ্রাম',
        'লালশাক / পালংশাক ২ আঁটি',
      ],
      idealFor: '৩–৪ জনের পরিবারের সারা সপ্তাহের ফ্রেশ সবজির প্রয়োজন',
    },
    {
      _id: 'sub-veg-mega-box',
      name: 'মেগা ফ্যামিলি উইকলি সবজি বক্স (৮–১০ কেজি)',
      category: 'Fresh Vegetables',
      sku: 'VEG-BOX-MEGA',
      thumbnail: '/images/weekly_veggie_box.jpg',
      badge: 'বড় পরিবারের সাশ্রয়ী বক্স',
      frequencyText: 'প্রতি সপ্তাহে ১ বার',
      frequency: 'weekly' as const,
      regularPrice: 950,
      subscriptionDiscountPercent: 10,
      salePrice: 855,
      variantName: '৮–১০ কেজি মেগা সাইজ',
      items: [
        'আলু ৩ কেজি + পেঁয়াজ ২ কেজি',
        'রসুন ৫০০ গ্রাম + আদা ২৫০ গ্রাম + কাঁচামরিচ ২৫০ গ্রাম',
        'টমেটো ১ কেজি + শসা ১ কেজি',
        'লাউ ১টি + মিষ্টি কুমড়া কাটা ১ ফালি',
        'পটল/ঝিঙে/বেগুন ১ কেজি + তাজা শাক ৩ আঁটি',
      ],
      idealFor: '৫–৭ জনের একান্নবর্তী পরিবারের সম্পূর্ণ সাপ্তাহিক সবজি',
    },
  ];

  const currentPackages = activeTab === 'cleaning' ? cleaningPackages : veggiePackages;

  return (
    <section className="py-12 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden" id="subscriptions">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3">
            <FiRepeat className="text-emerald-700 animate-spin-slow" />
            <span>সবজিহাট অটো ডেলিভারি ও সাবস্ক্রিপশন</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            উইকলি ও মান্থলি প্যাকেজ বক্স
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-2">
            এককালীন কিনতে পারবেন অথবা <strong>অটো-সাবস্ক্রিপশন</strong> চালু করে প্রতি সপ্তাহে তাজা সবজি এবং প্রতি মাসে অফিস-ফ্যামিলির ক্লিনিং আইটেম পান ঘরে বসেই!
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl mt-6 border border-gray-200">
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'cleaning'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiBox />
              <span>মাসিক ক্লিনিং ও হাইজিন বক্স</span>
            </button>

            <button
              onClick={() => setActiveTab('veggie')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'veggie'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiPackage />
              <span>সাপ্তাহিক তাজা সবজি কম্বো</span>
            </button>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-emerald-300"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <img
                  src={pkg.thumbnail}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Badges */}
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                  {pkg.badge}
                </span>

                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <FiRepeat size={11} /> {pkg.frequencyText}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                    {pkg.idealFor}
                  </span>
                  <h3 className="text-base sm:text-lg font-black line-clamp-1">{pkg.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Items checklist */}
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    বক্সের ভেতরের আইটেমসমূহ:
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.items.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5 text-xs" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                    {pkg.items.length > 5 && (
                      <li className="text-[11px] text-emerald-700 font-bold pl-4">
                        + আরও {pkg.items.length - 5}টি প্রয়োজনীয় আইটেম
                      </li>
                    )}
                  </ul>
                </div>

                {/* Price Strip */}
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block">সাবস্ক্রিপশন প্রাইস</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-emerald-700">৳{pkg.salePrice}</span>
                      <span className="text-xs text-gray-400 line-through">৳{pkg.regularPrice}</span>
                    </div>
                  </div>
                  <span className="bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-xs">
                    {pkg.subscriptionDiscountPercent}% অফ + ফ্রি ডেলিভারি
                  </span>
                </div>

                {/* Dual Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOneTimeBuy(pkg)}
                    className="py-2.5 px-3 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <FiShoppingBag size={14} />
                    <span>একবার কিনুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenSubscribe(pkg)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-[#5CAF90] hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <FiRepeat size={14} />
                    <span>সাবস্ক্রাইব করুন</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Prop Banner */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                <FiRepeat />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">ঝামেলাহীন অটো শিডিউল</h4>
                <p className="text-xs text-gray-500 mt-1">
                  বারবার অর্ডার করার দরকার নেই, আপনার পছন্দের দিনে অটো পৌঁছে যাবে।
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">
                <FiTruck />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">ফ্রি হোম ডেলিভারি</h4>
                <p className="text-xs text-gray-500 mt-1">
                  সবজিহাটের সকল সাবস্ক্রিপশন বক্সের ডেলিভারি সম্পূর্ণ ফ্রি।
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                <FiShield />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">যেকোনো সময় স্কিপ বা পজ</h4>
                <p className="text-xs text-gray-500 mt-1">
                  ট্যুরে বা বাইরে থাকলে যেকোনো মাসে ১ ক্লিকেই ডেলিভারি স্কিপ করতে পারবেন।
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
