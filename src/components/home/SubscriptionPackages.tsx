// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import {
//   FiRepeat,
//   FiCheckCircle,
//   FiShield,
//   FiTruck,
//   FiShoppingBag,
//   FiArrowRight,
//   FiPackage,
//   FiBox,
// } from 'react-icons/fi';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '@/redux/slices/cartSlice';
// import SubscriptionModal from '@/components/shared/SubscriptionModal';
// import toast from 'react-hot-toast';

// interface Props {
//   initialPackages?: any[];
//   initialProducts?: any[];
// }

// export default function SubscriptionPackages({ initialPackages = [] }: Props) {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [selectedSubProduct, setSelectedSubProduct] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // 1. Process dynamic packages directly from the database API
//   const normalizedPackages = useMemo(() => {
//     if (!initialPackages || initialPackages.length === 0) return [];

//     return initialPackages.map((p: any) => {
//       let catName = (p.category || '').trim();
//       if (!catName) {
//         if (p.boxType === 'cleaning') catName = 'Household & Cleaning';
//         else if (p.boxType === 'vegetable' || p.boxType === 'vegetables') catName = 'Fresh Vegetables';
//         else if (p.boxType === 'fruits' || p.boxType === 'fruit') catName = 'Organic Fruits';
//         else if (p.boxType) {
//           catName = p.boxType.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
//         } else {
//           catName = 'Curated Box';
//         }
//       } else if (catName.toLowerCase() === 'cleaning') {
//         catName = 'Household & Cleaning';
//       }

//       const itemsList = Array.isArray(p.items)
//         ? p.items.map((it: any) => {
//             if (typeof it === 'string') return it;
//             if (it && it.itemName) {
//               return it.quantity ? `${it.itemName} (${it.quantity})` : it.itemName;
//             }
//             return 'Essential item';
//           })
//         : [p.shortDescription || 'Essential items included'];

//       const regular = Number(p.regularPrice) || 0;
//       const subPrice = Number(p.subscriptionPrice) || Math.round(regular * 0.92);
//       const discount =
//         p.discountPercent !== undefined && p.discountPercent > 0
//           ? p.discountPercent
//           : regular > 0 && regular > subPrice
//           ? Math.max(0, Math.round(((regular - subPrice) / regular) * 100))
//           : 0;

//       return {
//         _id: p._id,
//         name: p.name,
//         category: catName,
//         boxType: p.boxType || 'general',
//         sku: p.sku || 'SUB-BOX',
//         thumbnail: p.thumbnail || '/images/monthly_cleaning_box.jpg',
//         badge: p.badge || (discount > 0 ? `${discount}% OFF` : 'Popular Choice'),
//         frequencyText:
//           p.frequencyText ||
//           (p.frequency === 'weekly' ? 'Every Week (1x)' : 'Every Month (1x)'),
//         frequency: p.frequency || 'monthly',
//         regularPrice: regular,
//         subscriptionPrice: subPrice,
//         salePrice: subPrice,
//         subscriptionDiscountPercent: discount,
//         items: itemsList,
//         rawItems: p.items,
//         idealFor: p.idealFor || p.shortDescription || 'Scheduled recurring doorstep delivery',
//         status: p.status || 'active',
//         isPinnedToHome: Boolean(p.isPinnedToHome),
//         sortOrder: p.sortOrder !== undefined ? Number(p.sortOrder) : 999,
//       };
//     });
//   }, [initialPackages]);

//   // 2. Extract distinct categories dynamically, ordered by admin priority (isPinnedToHome first, then lowest sortOrder)
//   const availableCategories = useMemo(() => {
//     const catMap = new Map<string, { isPinned: boolean; minOrder: number }>();

//     normalizedPackages.forEach((pkg) => {
//       if (!pkg.category) return;
//       const existing = catMap.get(pkg.category);
//       const isPinned = Boolean(pkg.isPinnedToHome);
//       const order = typeof pkg.sortOrder === 'number' ? pkg.sortOrder : 999;

//       if (!existing) {
//         catMap.set(pkg.category, { isPinned, minOrder: order });
//       } else {
//         catMap.set(pkg.category, {
//           isPinned: existing.isPinned || isPinned,
//           minOrder: Math.min(existing.minOrder, order),
//         });
//       }
//     });

//     // Sort: pinned categories first, then by lowest sortOrder (priority)
//     const sorted = Array.from(catMap.entries()).sort((a, b) => {
//       if (a[1].isPinned !== b[1].isPinned) {
//         return a[1].isPinned ? -1 : 1;
//       }
//       return a[1].minOrder - b[1].minOrder;
//     });

//     return sorted.map(([cat]) => cat);
//   }, [normalizedPackages]);

//   // 3. Default category selection (top prioritized category)
//   const defaultCategory = useMemo(() => {
//     return availableCategories[0] || '';
//   }, [availableCategories]);

//   const [activeTab, setActiveTab] = useState<string>('');

//   // Keep activeTab synced with available categories
//   useEffect(() => {
//     if (defaultCategory && (!activeTab || !availableCategories.includes(activeTab))) {
//       setActiveTab(defaultCategory);
//     }
//   }, [defaultCategory, availableCategories, activeTab]);

//   // 4. Filter packages based on active category tab
//   const displayedPackages = useMemo(() => {
//     const selected = activeTab || defaultCategory;
//     if (!selected) return normalizedPackages;
//     return normalizedPackages.filter((p) => p.category === selected);
//   }, [normalizedPackages, activeTab, defaultCategory]);

//   const handleOpenSubscribe = (pkg: any) => {
//     setSelectedSubProduct(pkg);
//     setIsModalOpen(true);
//   };

//   // One-time buy directly adds to cart and proceeds to checkout
//   const handleOneTimeBuy = (pkg: any) => {
//     dispatch(
//       addToCart({
//         id: pkg._id,
//         productID: pkg._id,
//         name: pkg.name,
//         price: pkg.regularPrice,
//         mrp: pkg.regularPrice,
//         image: pkg.thumbnail,
//         category: pkg.category,
//         quantity: 1,
//       })
//     );
//     toast.success(`${pkg.name} added. Proceeding to checkout...`);
//     router.push('/checkout');
//   };

//   if (!initialPackages || initialPackages.length === 0) {
//     return null;
//   }

//   return (
//     <section
//       className="py-12 sm:py-16 bg-[#fbfcfa] relative overflow-hidden"
//       id="subscriptions"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
//         {/* Section Header */}
//         <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 text-xs font-bold uppercase tracking-wider mb-3">
//             <FiRepeat className="text-[var(--color-primary)]" />
//             <span>Regular Auto-Delivery & Subscriptions</span>
//           </div>

//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
//             Curated Subscription <span className="text-[var(--color-primary)]">Packages</span>
//           </h2>

//           <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl mx-auto">
//             Choose your preferred box and get scheduled recurring delivery at your doorstep with guaranteed <strong>100% free delivery</strong>.
//           </p>

//           {/* Category Tabs (No "All Boxes", defaults to first/admin selected category) */}
//           {availableCategories.length > 0 && (
//             <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-gray-150/70 rounded-xl mt-6 border border-gray-200 shadow-2xs gap-1.5">
//               {availableCategories.map((cat) => {
//                 const isActive = activeTab === cat;
//                 return (
//                   <button
//                     key={cat}
//                     type="button"
//                     onClick={() => setActiveTab(cat)}
//                     className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
//                       isActive
//                         ? 'bg-[var(--color-primary)] text-white shadow-xs'
//                         : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'
//                     }`}
//                   >
//                     <FiBox size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
//                     <span>{cat}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Empty State */}
//         {displayedPackages.length === 0 ? (
//           <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto space-y-3 shadow-xs">
//             <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 mx-auto flex items-center justify-center text-2xl">
//               <FiPackage />
//             </div>
//             <h4 className="font-bold text-gray-800 text-base">No Subscription Boxes Available</h4>
//             <p className="text-xs text-gray-500">
//               There are currently no active subscription packages in this category. Please check back soon or explore other categories.
//             </p>
//           </div>
//         ) : (
//           /* Packages Cards Grid (3 cards per category, top image header style from design) */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
//             {displayedPackages.map((pkg, idx) => {
//               const isFeatured = pkg.isPinnedToHome || idx === 1;

//               return (
//                 <div
//                   key={pkg._id}
//                   className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden group ${
//                     isFeatured
//                       ? 'border-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/10 ring-1 ring-[var(--color-primary)]/30'
//                       : 'border-gray-200/90 shadow-xs hover:shadow-lg hover:border-gray-300'
//                   }`}
//                 >
//                   {/* Top Visual Section with Package Image Background */}
//                   <div
//                     onClick={() => handleOpenSubscribe(pkg)}
//                     className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900 cursor-pointer select-none"
//                     title="Click to view full details"
//                   >
//                     {/* Background Image */}
//                     {pkg.thumbnail ? (
//                       <img
//                         src={pkg.thumbnail}
//                         alt={pkg.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-gray-900" />
//                     )}

//                     {/* Gradient Dark Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

//                     {/* Top Badges */}
//                     <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
//                       <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
//                         {pkg.badge}
//                       </span>

//                       <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
//                         <FiRepeat size={11} className="text-emerald-300" />
//                         <span>{pkg.frequencyText}</span>
//                       </span>
//                     </div>

//                     {/* Bottom Title on Image */}
//                     <div className="absolute bottom-3.5 left-4 right-4 text-white">
//                       <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block mb-0.5">
//                         {pkg.category}
//                       </span>
//                       <h3 className="text-lg sm:text-xl font-black text-white line-clamp-1 drop-shadow-sm">
//                         {pkg.name}
//                       </h3>
//                     </div>
//                   </div>

//                   {/* Lower Card Body */}
//                   <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
//                     {/* Price Header */}
//                     <div className="border-b border-gray-100 pb-3.5">
//                       <div className="flex items-baseline gap-2 flex-wrap">
//                         <span className="text-2xl sm:text-3xl font-black text-gray-900">
//                           ৳{pkg.salePrice}
//                         </span>
//                         <span className="text-xs sm:text-sm text-gray-500 font-semibold">
//                           / {pkg.frequency === 'weekly' ? 'week' : 'month'}
//                         </span>
//                         {pkg.regularPrice > pkg.salePrice && (
//                           <span className="text-xs sm:text-sm text-gray-400 line-through">
//                             ৳{pkg.regularPrice}
//                           </span>
//                         )}
//                         {pkg.subscriptionDiscountPercent > 0 && (
//                           <span className="ml-auto text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-0.5 rounded-full">
//                             Save {pkg.subscriptionDiscountPercent}%
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-1">
//                         {pkg.idealFor}
//                       </p>
//                     </div>

//                     {/* Items Checklist */}
//                     <div className="space-y-2 flex-1">
//                       <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
//                         Included in this package:
//                       </p>
//                       <ul className="space-y-2">
//                         {pkg.items.slice(0, 5).map((item: any, itemIdx: number) => (
//                           <li
//                             key={itemIdx}
//                             className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
//                           >
//                             <FiCheckCircle
//                               className="text-[var(--color-primary)] shrink-0 mt-0.5 text-sm"
//                             />
//                             <span className="line-clamp-1">{item}</span>
//                           </li>
//                         ))}
//                         {pkg.items.length > 5 && (
//                           <li className="pt-0.5">
//                             <button
//                               type="button"
//                               onClick={() => handleOpenSubscribe(pkg)}
//                               className="text-xs text-[var(--color-primary)] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
//                             >
//                               <span>+ {pkg.items.length - 5} more items</span>
//                               <FiArrowRight size={12} />
//                             </button>
//                           </li>
//                         )}
//                       </ul>

//                       {/* Free Delivery Banner */}
//                       <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 border border-emerald-150 px-3 py-2 rounded-xl mt-3.5">
//                         <FiTruck size={14} className="text-[var(--color-primary)] shrink-0" />
//                         <span className="font-semibold">Guaranteed 100% Free Doorstep Delivery</span>
//                       </div>
//                     </div>

//                     {/* Dual Action Buttons */}
//                     <div className="grid grid-cols-2 gap-2.5 pt-2">
//                       <button
//                         type="button"
//                         onClick={() => handleOneTimeBuy(pkg)}
//                         className="py-2.5 px-3 rounded-xl border border-gray-250 hover:border-[var(--color-primary)] bg-white hover:bg-gray-50 text-gray-800 hover:text-[var(--color-primary)] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
//                       >
//                         <FiShoppingBag size={14} />
//                         <span>One-Time Buy</span>
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => handleOpenSubscribe(pkg)}
//                         className="py-2.5 px-3 rounded-xl bg-[var(--color-primary)] hover:bg-[#52861c] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[var(--color-primary)]/20 cursor-pointer active:scale-98"
//                       >
//                         <FiRepeat size={14} />
//                         <span>Subscribe Now</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Value Prop Banner */}
//         <div className="mt-12 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
//               <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-lg shrink-0">
//                 <FiRepeat />
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-sm">Automated Schedule</h4>
//                 <p className="text-xs text-gray-500 mt-0.5">
//                   Never worry about reordering daily essentials. Delivered directly to your home on time.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
//               <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-lg shrink-0">
//                 <FiTruck />
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-sm">100% Free Delivery</h4>
//                 <p className="text-xs text-gray-500 mt-0.5">
//                   Every recurring subscription box includes guaranteed free doorstep shipping.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
//               <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shrink-0">
//                 <FiShield />
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-sm">Skip or Pause Anytime</h4>
//                 <p className="text-xs text-gray-500 mt-0.5">
//                   Going out of town? You can pause, skip, or modify your delivery schedule with 1 click.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subscription Confirmation Modal */}
//       <SubscriptionModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         product={selectedSubProduct}
//       />
//     </section>
//   );
// }









'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FiRepeat,
  FiCheck,
  FiShield,
  FiTruck,
  FiShoppingBag,
  FiArrowRight,
  FiPackage,
  FiCalendar,
  FiPauseCircle,
  FiStar,
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import SubscriptionModal from '@/components/shared/SubscriptionModal';
import toast from 'react-hot-toast';

interface Props {
  initialPackages?: any[];
  initialProducts?: any[];
}

const VISIBLE_ITEMS = 4;

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

  // 2. Distinct categories ordered by admin priority (pinned first, then lowest sortOrder)
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

  useEffect(() => {
    if (defaultCategory && (!activeTab || !availableCategories.includes(activeTab))) {
      setActiveTab(defaultCategory);
    }
  }, [defaultCategory, availableCategories, activeTab]);

  // 4. Filter packages based on active category tab (sorted left to right from lowest to highest price)
  const displayedPackages = useMemo(() => {
    const selected = activeTab || defaultCategory;
    const pkgs = selected
      ? normalizedPackages.filter((p) => p.category === selected)
      : normalizedPackages;

    // Sort ascending by price (choto theke boro)
    return [...pkgs].sort((a, b) => {
      const priceA = Number(a.salePrice || a.subscriptionPrice || a.regularPrice) || 0;
      const priceB = Number(b.salePrice || b.subscriptionPrice || b.regularPrice) || 0;
      return priceA - priceB;
    });
  }, [normalizedPackages, activeTab, defaultCategory]);


  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    normalizedPackages.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [normalizedPackages]);

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

  const benefits = [
    {
      icon: <FiCalendar />,
      title: 'Automated Schedule',
      text: 'Never worry about reordering essentials. Delivered to your door on time, every cycle.',
    },
    {
      icon: <FiTruck />,
      title: '100% Free Delivery',
      text: 'Every recurring subscription box ships free to your doorstep, always.',
    },
    {
      icon: <FiPauseCircle />,
      title: 'Skip or Pause Anytime',
      text: 'Travelling? Pause, skip or modify your delivery schedule in one click.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-14 sm:py-20" id="subscriptions">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[var(--color-primary)]/[0.06] blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
            <FiRepeat size={12} />
            Auto-Delivery &amp; Subscriptions
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Curated Subscription{' '}
            <span className="text-[var(--color-primary)]">Packages</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Pick a box, set your schedule, and relax. Fresh essentials arrive at your door
            with <span className="font-semibold text-gray-800">free delivery</span>, every time.
          </p>

          {/* Category Tabs */}
          {availableCategories.length > 0 && (
            <div className="mt-7 flex justify-center">
              <div
                role="tablist"
                className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl bg-white p-1.5"
              >
                {availableCategories.map((cat) => {
                  const isActive = activeTab === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(cat)}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:px-5 sm:py-2.5 sm:text-sm ${isActive
                          ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/25'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                          }`}
                      >
                        {categoryCounts[cat] || 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {displayedPackages.length === 0 ? (
          <div className="mx-auto max-w-md space-y-3 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-400">
              <FiPackage />
            </div>
            <h4 className="text-base font-bold text-gray-800">No Subscription Boxes Available</h4>
            <p className="text-xs text-gray-500">
              There are currently no active subscription packages in this category. Please check
              back soon or explore other categories.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {displayedPackages.map((pkg, idx) => {
              // Only ONE card should ever have the "Most Popular" badge:
              // 1. If admin pinned exactly 1 package, that specific package gets it.
              // 2. Otherwise (if all or none are pinned), only the middle package (Smart Plan, idx 1) gets it.
              const pinnedCount = displayedPackages.filter((p) => p.isPinnedToHome).length;
              const isFeatured =
                pinnedCount === 1
                  ? Boolean(pkg.isPinnedToHome)
                  : idx === 1 || (displayedPackages.length < 3 && idx === 0);
              const cycle = pkg.frequency === 'weekly' ? 'week' : 'month';


              return (
                <article
                  key={pkg._id}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border-2 border-transparent bg-white transition-all duration-300 hover:border-[var(--color-primary)] ${isFeatured ? 'lg:-translate-y-2' : 'hover:-translate-y-1'
                    }`}
                >
                  {/* Image header */}
                  <button
                    type="button"
                    onClick={() => handleOpenSubscribe(pkg)}
                    aria-label={`View details of ${pkg.name}`}
                    className="relative block h-48 w-full cursor-pointer overflow-hidden bg-gray-100 text-left sm:h-52"                  >
                    {pkg.thumbnail ? (
                      <Image
                        src={pkg.thumbnail}
                        alt={pkg.name}
                        fill
                        sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[var(--color-primary)] to-gray-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                    {/* Top chips */}
                    <div className="absolute left-3.5 right-3.5 top-3.5 flex items-start justify-between gap-2">
                      <span className="bg-[#EA4335] text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-md shadow-sm tracking-wide">
                        {pkg.badge}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                        <FiRepeat size={11} />
                        {pkg.frequencyText}
                      </span>
                    </div>

                    {/* Bottom title */}
                    <div className="absolute bottom-3.5 left-4 right-4">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                        {pkg.category}
                      </span>
                      <h3 className="line-clamp-1 text-xl font-extrabold text-white drop-shadow">
                        {pkg.name}
                      </h3>
                    </div>
                  </button>

                  {isFeatured && (
                    <div className="absolute right-0 top-[11.25rem] z-10 hidden sm:top-[12.25rem] lg:block" />
                  )}

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {isFeatured && (
                      <div className="-mt-1 mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--color-primary)]">
                        <FiStar size={11} className="fill-current" />
                        Most Popular
                      </div>
                    )}

                    {/* Price */}
                    <div>
                      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                        <span className="text-3xl font-extrabold leading-none tracking-tight text-gray-900">
                          ৳{pkg.salePrice}
                        </span>
                        <span className="pb-0.5 text-sm font-medium text-gray-500">/ {cycle}</span>
                        {pkg.regularPrice > pkg.salePrice && (
                          <span className="pb-0.5 text-sm text-gray-400 line-through">
                            ৳{pkg.regularPrice}
                          </span>
                        )}
                        {pkg.subscriptionDiscountPercent > 0 && (
                          <span className="ml-auto rounded-md bg-[var(--color-primary)]/10 px-2 py-1 text-[11px] font-bold text-[var(--color-primary)]">
                            Save {pkg.subscriptionDiscountPercent}%
                          </span>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-gray-500">
                        {pkg.idealFor}
                      </p>
                    </div>

                    <div className="my-5 h-px bg-gray-100" />

                    {/* Items - Show ALL items without View More */}
                    <div className="flex-1">
                      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        What&apos;s inside
                      </p>
                      <ul className="space-y-2.5">
                        {pkg.items.map((item: string, itemIdx: number) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-2.5 text-[13px] font-medium text-gray-700"
                          >
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                              <FiCheck size={10} strokeWidth={3.5} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>


                    {/* Delivery note */}
                    <div className="mt-5 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-xs text-gray-600">
                      <FiTruck size={14} className="shrink-0 text-[var(--color-primary)]" />
                      <span className="font-medium">Free doorstep delivery included</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleOpenSubscribe(pkg)}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[var(--color-primary)]/25 transition-all hover:brightness-95 hover:shadow-lg active:scale-[0.98]"
                      >
                        <FiRepeat size={15} />
                        Subscribe Now
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOneTimeBuy(pkg)}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-gray-50 px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition-all hover:border-[var(--color-primary)] hover:bg-white hover:text-[var(--color-primary)] active:scale-[0.98]"
                      >
                        <FiShoppingBag size={14} />
                        Buy once · ৳{pkg.regularPrice}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Benefits strip */}
        <div className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border-2 border-transparent bg-white transition-all duration-300 hover:border-[var(--color-primary)]">
          <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4 p-6 sm:p-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-lg text-[var(--color-primary)]">
                  {b.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{b.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500">
            <FiShield size={13} className="text-[var(--color-primary)]" />
            Cancel anytime. No hidden charges, no lock-in.
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