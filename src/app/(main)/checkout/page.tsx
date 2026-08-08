// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useAppDispatch, useAppSelector } from '@/redux';
// import { clearCart } from '@/redux/slices/cartSlice';
// import { useCreateOrderMutation } from '@/redux/api/orderApi';
// import { useGetAllAreasQuery } from '@/redux/api/areaApi';
// import {
//     FiMapPin, FiCreditCard, FiTruck, FiChevronLeft, FiLock, FiClock,
//     FiCalendar, FiTag, FiChevronDown, FiPackage, FiHome, FiBriefcase,
//     FiHeart, FiMoreHorizontal,
// } from 'react-icons/fi';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';

// interface Area {
//     _id: string;
//     name: string;
//     isActive: boolean;
// }

// // ===== Section Header =====
// const SectionHeader = ({ icon, title, subtitle }: {
//     icon: React.ReactNode;
//     title: string;
//     subtitle?: string;
// }) => (
//     <div className="flex items-center gap-3 mb-5">
//         <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
//             {icon}
//         </div>
//         <div>
//             <h2 className="text-base font-bold text-[var(--color-text-primary)]">{title}</h2>
//             {subtitle && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{subtitle}</p>}
//         </div>
//     </div>
// );

// // ===== Input Field =====
// const InputField = ({ label, required, children }: {
//     label: string;
//     required?: boolean;
//     children: React.ReactNode;
// }) => (
//     <div>
//         <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1.5">
//             {label} {required && <span className="text-red-400">*</span>}
//         </label>
//         {children}
//     </div>
// );

// const inputClass = "w-full px-4 py-2.5 bg-[var(--color-surface)] border border-gray-200 rounded-xl outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]";

// const CheckoutPage = () => {
//     const { items, totalPrice } = useAppSelector((state) => state.cart);
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const dispatch = useAppDispatch();
//     const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

//     const { data: areasResponse, isLoading: isLoadingAreas } = useGetAllAreasQuery({});
//     const areas: Area[] = (areasResponse?.data || []).filter((a: Area) => a.isActive);

//     const [showCoupon, setShowCoupon] = useState(false);
//     const [couponCode, setCouponCode] = useState('');

//     // ✅ Delivery Time state
//     // normal: date default e kichu jabe na (ASAP), chaile custom time set kora jabe
//     // preorder: tomorrow fixed (date picker nai), time বাধ্যতামূলক
//     const [orderMode, setOrderMode] = useState<'normal' | 'preorder'>('normal');
//     const [wantsCustomTime, setWantsCustomTime] = useState(false);
//     const [customTime, setCustomTime] = useState(''); // "HH:mm" — native time input থেকে

//     const [formData, setFormData] = useState({
//         fullName: (session?.user as any)?.firstName || '',
//         phone: (session?.user as any)?.phone || '',
//         email: '',
//         deliveryType: 'local' as 'local' | 'nationwide',
//         city: '',
//         area: '',
//         district: '',
//         upazila: '',
//         houseNo: '',
//         road: '',
//         flatNo: '',
//         postalCode: '',
//         deliveryNotes: '',
//         label: 'home' as 'home' | 'work' | 'partner' | 'other',
//         paymentMethod: 'cod',
//         specialInstructions: '',
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const todayStr = new Date().toISOString().split('T')[0];
//     const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

//     // Mode বদলালে আগের time reset হবে
//     useEffect(() => {
//         setCustomTime('');
//         setWantsCustomTime(false);
//     }, [orderMode]);

//     const estimatedShipping = formData.deliveryType === 'local'
//         ? (totalPrice >= 1000 ? 0 : 60)
//         : 120;
//     const grandTotal = totalPrice + estimatedShipping;

//     const labelIcons: Record<string, React.ReactNode> = {
//         home: <FiHome size={13} />,
//         work: <FiBriefcase size={13} />,
//         partner: <FiHeart size={13} />,
//         other: <FiMoreHorizontal size={13} />,
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!formData.fullName || !formData.phone || !formData.city) {
//             toast.error('Please fill in all required fields');
//             return;
//         }
//         if (formData.deliveryType === 'local' && !formData.area) {
//             toast.error('Please select your delivery area');
//             return;
//         }
//         if (formData.deliveryType === 'nationwide' && !formData.district) {
//             toast.error('Please provide your district');
//             return;
//         }
//         if (formData.deliveryType === 'local') {
//             if (orderMode === 'preorder' && !customTime) {
//                 toast.error('Pre-order এর জন্য ডেলিভারি সময় নির্বাচন করুন');
//                 return;
//             }
//             if (orderMode === 'normal' && wantsCustomTime && !customTime) {
//                 toast.error('অনুগ্রহ করে ডেলিভারি সময় নির্বাচন করুন');
//                 return;
//             }
//         }

//      const orderData: any = {
//  items: items.map((item) => ({
//     productID: item.productID,
//     variantID: item.variantID || undefined,
//     quantity: item.quantity,
// })),
//             deliveryType: formData.deliveryType,
//             deliveryAddress: {
//                 name: formData.fullName,
//                 phone: formData.phone,
//                 email: formData.email || undefined,
//                 city: formData.city,
//                 area: formData.area,
//                 district: formData.district || undefined,
//                 upazila: formData.upazila || undefined,
//                 houseNo: formData.houseNo || undefined,
//                 road: formData.road || undefined,
//                 flatNo: formData.flatNo || undefined,
//                 postalCode: formData.postalCode || undefined,
//                 deliveryNotes: formData.deliveryNotes || undefined,
//                 label: formData.label,
//             },
//             paymentMethod: formData.paymentMethod,
//             specialInstructions: formData.specialInstructions || undefined,
//         };

//         if (formData.deliveryType === 'local') {
//             if (orderMode === 'preorder') {
//                 orderData.deliveryDate = tomorrowStr;
//                 orderData.deliveryTime = customTime;
//             } else if (wantsCustomTime && customTime) {
//                 orderData.deliveryDate = todayStr;
//                 orderData.deliveryTime = customTime;
//             }
//             // normal order + no custom time → deliveryDate/deliveryTime পাঠানো হবে না (ASAP)
//         }

//         try {
//             await createOrder(orderData).unwrap();
//             dispatch(clearCart());
//             toast.success('Order placed successfully! 🛍️', { duration: 5000 });
//             router.push('/checkout/success');
//         } catch (err: any) {
//             toast.error(err?.data?.message || 'Failed to place order. Please try again.');
//         }
//     };

//     if (status === 'loading') {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
//             </div>
//         );
//     }

//     if (status === 'unauthenticated') {
//         router.push('/login?redirect=/checkout');
//         return null;
//     }

//     if (!items || items.length === 0) {
//         router.push('/cart');
//         return null;
//     }

//     return (
//         <div className="min-h-screen bg-[var(--color-surface)] pb-20">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 max-w-6xl">

//                 {/* Back */}
//                 <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-6 transition-colors group">
//                     <FiChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
//                     Back to Cart
//                 </Link>

//                 <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Checkout</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* ===== ROW 1: Customer Info + Order Summary ===== */}
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

//                         {/* ── Customer Information ── */}
//                         <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
//                             <SectionHeader icon={<FiMapPin size={17} />} title="Customer Information" />

//                             <div className="space-y-5">
//                                 {/* Contact Information */}
//                                 <div>
//                                     <p className="text-xs font-bold text-[var(--color-text-primary)] mb-3">Contact Information</p>
//                                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                                         <InputField label="Full Name" required>
//                                             <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Your full name" />
//                                         </InputField>
//                                         <InputField label="Phone Number" required>
//                                             <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="01XXXXXXXXX" />
//                                         </InputField>
//                                         <InputField label="Email">
//                                             <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@email.com" />
//                                         </InputField>
//                                     </div>
//                                 </div>

//                                 {/* Delivery Type */}
//                                 <div>
//                                     <p className="text-xs font-bold text-[var(--color-text-primary)] mb-3">Delivery Type</p>
//                                     <div className="grid grid-cols-2 gap-3">
//                                         {[
//                                             { value: 'local', label: 'Local', sub: 'Barisal city', icon: <FiMapPin size={16} /> },
//                                             { value: 'nationwide', label: 'Nationwide', sub: '3 business days', icon: <FiPackage size={16} /> },
//                                         ].map((opt) => (
//                                             <label
//                                                 key={opt.value}
//                                                 className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all ${
//                                                     formData.deliveryType === opt.value
//                                                         ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
//                                                         : 'border-gray-200 hover:border-gray-300'
//                                                 }`}
//                                             >
//                                                 <input type="radio" name="deliveryType" value={opt.value} checked={formData.deliveryType === opt.value} onChange={handleChange} className="sr-only" />
//                                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${formData.deliveryType === opt.value ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-400'}`}>
//                                                     {opt.icon}
//                                                 </div>
//                                                 <div className="min-w-0">
//                                                     <p className="text-sm font-bold text-[var(--color-text-primary)]">{opt.label}</p>
//                                                     <p className="text-[11px] text-[var(--color-text-muted)]">{opt.sub}</p>
//                                                 </div>
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Delivery Address */}
//                                 <div>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <p className="text-xs font-bold text-[var(--color-text-primary)]">Delivery Address</p>
//                                         <div className="flex gap-1.5">
//                                             {(['home', 'work', 'partner', 'other'] as const).map((lbl) => (
//                                                 <button
//                                                     key={lbl}
//                                                     type="button"
//                                                     onClick={() => setFormData({ ...formData, label: lbl })}
//                                                     title={lbl}
//                                                     className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
//                                                         formData.label === lbl
//                                                             ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
//                                                             : 'border-gray-200 text-gray-400 hover:border-gray-300'
//                                                     }`}
//                                                 >
//                                                     {labelIcons[lbl]}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div className="space-y-3">
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                             <InputField label="City" required>
//                                                 <input type="text" name="city" required value={formData.city} onChange={handleChange} className={inputClass} placeholder="Dhaka" />
//                                             </InputField>

//                                             {formData.deliveryType === 'local' ? (
//                                                 <InputField label="Area" required>
//                                                     <div className="relative">
//                                                         <select
//                                                             name="area"
//                                                             required
//                                                             value={formData.area}
//                                                             onChange={handleChange}
//                                                             disabled={isLoadingAreas}
//                                                             className={`${inputClass} appearance-none pr-10 disabled:opacity-60`}
//                                                         >
//                                                             <option value="">{isLoadingAreas ? 'Loading...' : 'Select area'}</option>
//                                                             {areas.map((area) => (
//                                                                 <option key={area._id} value={area._id}>{area.name}</option>
//                                                             ))}
//                                                         </select>
//                                                         <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
//                                                     </div>
//                                                 </InputField>
//                                             ) : (
//                                                 <InputField label="District" required>
//                                                     <input type="text" name="district" required value={formData.district} onChange={handleChange} className={inputClass} placeholder="Rangpur" />
//                                                 </InputField>
//                                             )}
//                                         </div>

//                                         {formData.deliveryType === 'nationwide' && (
//                                             <InputField label="Upazila">
//                                                 <input type="text" name="upazila" value={formData.upazila} onChange={handleChange} className={inputClass} placeholder="Sadar" />
//                                             </InputField>
//                                         )}

//                                         <div className="grid grid-cols-3 gap-3">
//                                             <InputField label="House No">
//                                                 <input type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} className={inputClass} placeholder="12" />
//                                             </InputField>
//                                             <InputField label="Road">
//                                                 <input type="text" name="road" value={formData.road} onChange={handleChange} className={inputClass} placeholder="5" />
//                                             </InputField>
//                                             <InputField label="Flat No">
//                                                 <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} className={inputClass} placeholder="4B" />
//                                             </InputField>
//                                         </div>

//                                         <InputField label="Additional Notes">
//                                             <textarea name="deliveryNotes" value={formData.deliveryNotes} onChange={handleChange} rows={2} className={`${inputClass} resize-none`} placeholder="Enter area, street or house no..." />
//                                         </InputField>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ── Order Summary ── */}
//                         <div className="lg:col-span-5">
//                             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-6">
//                                 <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
//                                     <h2 className="text-base font-bold text-[var(--color-text-primary)]">Order Summary</h2>
//                                     <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full">
//                                         {items.length} item{items.length > 1 ? 's' : ''}
//                                     </span>
//                                 </div>

//                                 <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1 mb-5">
//                                     {items.map((item) => (
//                                         <div key={item.id} className="flex gap-3 items-start">
//                                             <div className="w-14 h-14 bg-[var(--color-surface)] rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
//                                                 <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
//                                             </div>
//                                             <div className="flex-1 min-w-0">
//                                                 <p className="text-xs font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-snug">{item.name}</p>
//                                                 <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">Qty: {item.quantity}</p>
//                                             </div>
//                                             <p className="text-sm font-bold text-[var(--color-text-primary)] flex-shrink-0">৳{(item.price * item.quantity).toLocaleString()}</p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Coupon */}
//                                 <div className="mb-4">
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowCoupon(!showCoupon)}
//                                         className="flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors w-full"
//                                     >
//                                         <FiTag size={13} />
//                                         {showCoupon ? 'Hide coupon' : 'Have a coupon code?'}
//                                         <FiChevronDown size={13} className={`ml-auto transition-transform ${showCoupon ? 'rotate-180' : ''}`} />
//                                     </button>

//                                     {showCoupon && (
//                                         <div className="mt-2.5 flex gap-2">
//                                             <input
//                                                 type="text"
//                                                 value={couponCode}
//                                                 onChange={(e) => setCouponCode(e.target.value)}
//                                                 placeholder="Enter coupon code"
//                                                 className={`${inputClass} flex-1`}
//                                             />
//                                             <button type="button" className="px-4 py-2.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity flex-shrink-0">
//                                                 Apply
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Selected delivery time summary */}
//                                 {formData.deliveryType === 'local' && customTime && (orderMode === 'preorder' || wantsCustomTime) && (
//                                     <div className="mb-4 p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl flex items-center gap-2">
//                                         <FiClock className="text-[var(--color-primary)] flex-shrink-0" size={15} />
//                                         <div>
//                                             <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">
//                                                 {orderMode === 'preorder' ? 'Pre-order · আগামীকাল' : 'নির্ধারিত সময় · আজ'}
//                                             </p>
//                                             <p className="text-xs font-semibold text-[var(--color-text-primary)]">{customTime}</p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Pricing breakdown */}
//                                 <div className="space-y-2.5 pt-4 border-t border-gray-100">
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-[var(--color-text-muted)]">Subtotal</span>
//                                         <span className="font-semibold text-[var(--color-text-primary)]">৳{totalPrice.toLocaleString()}</span>
//                                     </div>
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-[var(--color-text-muted)]">Delivery charge</span>
//                                         <span className="font-semibold text-[var(--color-text-primary)]">
//                                             {estimatedShipping === 0 ? (
//                                                 <span className="text-[var(--color-primary)] font-bold">FREE</span>
//                                             ) : `৳${estimatedShipping}`}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-[var(--color-text-muted)]">Discount</span>
//                                         <span className="font-semibold text-green-600">-৳0</span>
//                                     </div>
//                                     <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                                         <span className="text-sm font-bold text-[var(--color-text-primary)]">Total</span>
//                                         <span className="text-xl font-black text-[var(--color-text-primary)]">৳{grandTotal.toLocaleString()}</span>
//                                     </div>
//                                     <p className="text-[10px] text-[var(--color-text-muted)]">
//                                         * Final delivery charge confirmed after review
//                                     </p>
//                                 </div>

//                                 {/* Submit */}
//                                 <button
//                                     type="submit"
//                                     disabled={isPlacingOrder}
//                                     className="mt-5 w-full flex items-center justify-center gap-2.5 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold text-sm tracking-wide hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-[var(--color-primary)]/25 disabled:opacity-60 disabled:cursor-not-allowed"
//                                 >
//                                     {isPlacingOrder ? (
//                                         <>
//                                             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                             Placing order...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <FiLock size={15} />
//                                             Place Order • ৳{grandTotal.toLocaleString()}
//                                         </>
//                                     )}
//                                 </button>

//                                 <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-3 leading-relaxed">
//                                     By placing your order, you agree to our{' '}
//                                     <Link href="/terms" className="underline hover:text-[var(--color-primary)]">Terms & Conditions</Link>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ===== ROW 2: Delivery Time (full width, local delivery only) ===== */}
//                     {formData.deliveryType === 'local' && (
//                         <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
//                             <SectionHeader icon={<FiTruck size={17} />} title="Delivery Time" subtitle="আপনার অর্ডার কখন ডেলিভারি চান?" />

//                             {/* Mode tabs */}
//                             <div className="flex gap-2 mb-4 border-b border-gray-100">
//                                 {(['normal', 'preorder'] as const).map((mode) => (
//                                     <button
//                                         key={mode}
//                                         type="button"
//                                         onClick={() => setOrderMode(mode)}
//                                         className={`px-4 py-2.5 text-sm font-bold border-b-2 -mb-px transition-all flex items-center gap-1.5 ${
//                                             orderMode === mode
//                                                 ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
//                                                 : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
//                                         }`}
//                                     >
//                                         {mode === 'normal' ? 'Normal Order' : 'Pre-order'}
//                                         {mode === 'preorder' && (
//                                             <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
//                                                 Tomorrow
//                                             </span>
//                                         )}
//                                     </button>
//                                 ))}
//                             </div>

//                             {orderMode === 'normal' ? (
//                                 <div>
//                                     {/* Optional custom time toggle */}
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-sm font-semibold text-[var(--color-text-primary)]">নির্দিষ্ট সময়ে ডেলিভারি চান?</p>
//                                             <p className="text-xs text-[var(--color-text-muted)]">না দিলে যত দ্রুত সম্ভব ডেলিভারি হবে</p>
//                                         </div>
//                                         <button
//                                             type="button"
//                                             onClick={() => setWantsCustomTime(!wantsCustomTime)}
//                                             className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${wantsCustomTime ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}
//                                         >
//                                             <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${wantsCustomTime ? 'left-5' : 'left-0.5'}`} />
//                                         </button>
//                                     </div>

//                                     {wantsCustomTime && (
//                                         <div className="mt-4 max-w-xs">
//                                             <InputField label="Delivery Time (9 AM - 5 PM)" required>
//                                                 <div className="relative">
//                                                     <FiClock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] pointer-events-none" />
//                                                     <input
//                                                         type="time"
//                                                         min="09:00"
//                                                         max="17:00"
//                                                         value={customTime}
//                                                         onChange={(e) => setCustomTime(e.target.value)}
//                                                         required={wantsCustomTime}
//                                                         className={`${inputClass} pl-9`}
//                                                     />
//                                                 </div>
//                                             </InputField>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <div className="mb-3 p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl flex items-center gap-2">
//                                         <FiCalendar className="text-[var(--color-primary)] flex-shrink-0" size={15} />
//                                         <p className="text-sm font-semibold text-[var(--color-text-primary)]">
//                                             আগামীকাল, {new Date(tomorrowStr).toLocaleDateString('en-BD', { weekday: 'long', day: 'numeric', month: 'short' })}
//                                         </p>
//                                     </div>
//                                     <div className="max-w-xs">
//                                         <InputField label="Delivery Time (9 AM - 5 PM)" required>
//                                             <div className="relative">
//                                                 <FiClock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] pointer-events-none" />
//                                                 <input
//                                                     type="time"
//                                                     min="09:00"
//                                                     max="17:00"
//                                                     value={customTime}
//                                                     onChange={(e) => setCustomTime(e.target.value)}
//                                                     required
//                                                     className={`${inputClass} pl-9`}
//                                                 />
//                                             </div>
//                                         </InputField>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* ===== ROW 3: Payment Method (full width) ===== */}
//                     <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
//                         <SectionHeader icon={<FiCreditCard size={17} />} title="Payment Method" subtitle="How would you like to pay?" />

//                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                             {[
//                                 { value: 'cod', label: 'Cash on Delivery', sub: 'Pay on receive', icon: '💵', available: true },
//                                 { value: 'bkash', label: 'bKash', sub: 'Coming soon', icon: '📱', available: false },
//                                 { value: 'nagad', label: 'Nagad', sub: 'Coming soon', icon: '💳', available: false },
//                                 { value: 'card', label: 'Card', sub: 'Coming soon', icon: '💳', available: false },
//                             ].map((method) => (
//                                 <label
//                                     key={method.value}
//                                     className={`flex flex-col items-center text-center gap-0.5 p-2.5 border rounded-lg transition-all ${
//                                         !method.available
//                                             ? 'opacity-40 cursor-not-allowed border-gray-100 bg-gray-50'
//                                             : formData.paymentMethod === method.value
//                                                 ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 cursor-pointer'
//                                                 : 'border-gray-200 hover:border-gray-300 cursor-pointer'
//                                     }`}
//                                 >
//                                     <input
//                                         type="radio"
//                                         name="paymentMethod"
//                                         value={method.value}
//                                         checked={formData.paymentMethod === method.value}
//                                         onChange={handleChange}
//                                         disabled={!method.available}
//                                         className="sr-only"
//                                     />
//                                     <span className="text-lg leading-none">{method.icon}</span>
//                                     <p className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">{method.label}</p>
//                                     <p className="text-[10px] text-[var(--color-text-muted)] leading-tight">{method.sub}</p>
//                                 </label>
//                             ))}
//                         </div>

//                         <div className="mt-4">
//                             <InputField label="Special Instructions (Optional)">
//                                 <textarea
//                                     name="specialInstructions"
//                                     value={formData.specialInstructions}
//                                     onChange={handleChange}
//                                     rows={2}
//                                     className={`${inputClass} resize-none`}
//                                     placeholder="Any special requests for your order..."
//                                 />
//                             </InputField>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { clearCart, setPlacingOrder } from "@/redux/slices/cartSlice";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useGetAllAreasQuery } from "@/redux/api/areaApi";
import {
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiChevronLeft,
  FiLock,
  FiClock,
  FiCalendar,
  FiTag,
  FiChevronDown,
  FiPackage,
  FiHome,
  FiBriefcase,
  FiHeart,
  FiMoreHorizontal,
} from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Area {
  _id: string;
  name: string;
  isActive: boolean;
}

// ===== Section Header =====
const SectionHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h2 className="text-base font-bold text-[var(--color-text-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

// ===== Input Field =====
const InputField = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-4 py-2.5 bg-[var(--color-surface)] border border-gray-200 rounded-xl outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]";

const CheckoutPage = () => {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

  const { data: areasResponse, isLoading: isLoadingAreas } =
    useGetAllAreasQuery({});
  const areas: Area[] = (areasResponse?.data || []).filter(
    (a: Area) => a.isActive,
  );

  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // ✅ Delivery Time state
  const [orderMode, setOrderMode] = useState<"normal" | "preorder">("normal");
  const [wantsCustomTime, setWantsCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState("");

  const [formData, setFormData] = useState({
    fullName: (session?.user as any)?.firstName || "",
    phone: (session?.user as any)?.phone || "",
    email: "",
    deliveryType: "local" as "local" | "nationwide",
    city: "",
    area: "",
    district: "",
    upazila: "",
    houseNo: "",
    road: "",
    flatNo: "",
    postalCode: "",
    deliveryNotes: "",
    label: "home" as "home" | "work" | "partner" | "other",
    paymentMethod: "cod",
    specialInstructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = new Date(Date.now() + 86400000)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    setCustomTime("");
    setWantsCustomTime(false);
  }, [orderMode]);

  // ✅ Component unmount হওয়ার সময় flag reset করে দিন (safety)
  useEffect(() => {
    return () => {
      dispatch(setPlacingOrder(false));
    };
  }, [dispatch]);

  const estimatedShipping =
    formData.deliveryType === "local" ? (totalPrice >= 1000 ? 0 : 60) : 120;
  const grandTotal = totalPrice + estimatedShipping;

  const labelIcons: Record<string, React.ReactNode> = {
    home: <FiHome size={13} />,
    work: <FiBriefcase size={13} />,
    partner: <FiHeart size={13} />,
    other: <FiMoreHorizontal size={13} />,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (formData.deliveryType === "local" && !formData.area) {
      toast.error("Please select your delivery area");
      return;
    }
    if (formData.deliveryType === "nationwide" && !formData.district) {
      toast.error("Please provide your district");
      return;
    }
    if (formData.deliveryType === "local") {
      if (orderMode === "preorder" && !customTime) {
        toast.error("Pre-order এর জন্য ডেলিভারি সময় নির্বাচন করুন");
        return;
      }
      if (orderMode === "normal" && wantsCustomTime && !customTime) {
        toast.error("অনুগ্রহ করে ডেলিভারি সময় নির্বাচন করুন");
        return;
      }
    }

    const orderData: any = {
      items: items.map((item) => ({
        productID: item.productID,
        variantID: item.variantID || undefined,
        quantity: item.quantity,
      })),
      deliveryType: formData.deliveryType,
      deliveryAddress: {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        city: formData.city,
        area: formData.area,
        district: formData.district || undefined,
        upazila: formData.upazila || undefined,
        houseNo: formData.houseNo || undefined,
        road: formData.road || undefined,
        flatNo: formData.flatNo || undefined,
        postalCode: formData.postalCode || undefined,
        deliveryNotes: formData.deliveryNotes || undefined,
        label: formData.label,
      },
      paymentMethod: formData.paymentMethod,
      specialInstructions: formData.specialInstructions || undefined,
    };

    if (formData.deliveryType === "local") {
      if (orderMode === "preorder") {
        orderData.deliveryDate = tomorrowStr;
        orderData.deliveryTime = customTime;
      } else if (wantsCustomTime && customTime) {
        orderData.deliveryDate = todayStr;
        orderData.deliveryTime = customTime;
      }
    }

    dispatch(setPlacingOrder(true));
    try {
      await createOrder(orderData).unwrap();
      dispatch(clearCart());
      toast.success("Order placed successfully! 🛍️", { duration: 5000 });
      router.push("/checkout/success");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to place order. Please try again.",
      );
    } finally {
      dispatch(setPlacingOrder(false));
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login?redirect=/checkout");
    return null;
  }

  if (!items || items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    // ✅ pb-28 দেওয়া হলো যাতে mobile floating bar page content কে ঢেকে না ফেলে
    <div className="min-h-screen bg-[var(--color-surface)] pb-28 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 max-w-6xl">
        {/* Back */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-6 transition-colors group"
        >
          <FiChevronLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Cart
        </Link>

        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
          Checkout
        </h1>

        {/* ✅ ফর্মে id দেওয়া হলো — এই id দিয়েই FloatingCartButton থেকে ফর্ম submit করা হবে */}
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
          {/* ===== ROW 1: Customer Info + Order Summary ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* ── Customer Information ── */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <SectionHeader
                icon={<FiMapPin size={17} />}
                title="Customer Information"
              />

              <div className="space-y-5">
                {/* Contact Information */}
                <div>
                  <p className="text-xs font-bold text-[var(--color-text-primary)] mb-3">
                    Contact Information
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <InputField label="Full Name" required>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your full name"
                      />
                    </InputField>
                    <InputField label="Phone Number" required>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="01XXXXXXXXX"
                      />
                    </InputField>
                    <InputField label="Email">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@email.com"
                      />
                    </InputField>
                  </div>
                </div>

                {/* Delivery Type */}
                <div>
                  <p className="text-xs font-bold text-[var(--color-text-primary)] mb-3">
                    Delivery Type
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        value: "local",
                        label: "Local",
                        sub: "Barisal city",
                        icon: <FiMapPin size={16} />,
                      },
                      {
                        value: "nationwide",
                        label: "Nationwide",
                        sub: "3 business days",
                        icon: <FiPackage size={16} />,
                      },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all ${
                          formData.deliveryType === opt.value
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryType"
                          value={opt.value}
                          checked={formData.deliveryType === opt.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${formData.deliveryType === opt.value ? "bg-[var(--color-primary)] text-white" : "bg-gray-100 text-gray-400"}`}
                        >
                          {opt.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[var(--color-text-primary)]">
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-[var(--color-text-muted)]">
                            {opt.sub}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-[var(--color-text-primary)]">
                      Delivery Address
                    </p>
                    <div className="flex gap-1.5">
                      {(["home", "work", "partner", "other"] as const).map(
                        (lbl) => (
                          <button
                            key={lbl}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, label: lbl })
                            }
                            title={lbl}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                              formData.label === lbl
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                : "border-gray-200 text-gray-400 hover:border-gray-300"
                            }`}
                          >
                            {labelIcons[lbl]}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputField label="City" required>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Dhaka"
                        />
                      </InputField>

                      {formData.deliveryType === "local" ? (
                        <InputField label="Area" required>
                          <div className="relative">
                            <select
                              name="area"
                              required
                              value={formData.area}
                              onChange={handleChange}
                              disabled={isLoadingAreas}
                              className={`${inputClass} appearance-none pr-10 disabled:opacity-60`}
                            >
                              <option value="">
                                {isLoadingAreas ? "Loading..." : "Select area"}
                              </option>
                              {areas.map((area) => (
                                <option key={area._id} value={area._id}>
                                  {area.name}
                                </option>
                              ))}
                            </select>
                            <FiChevronDown
                              size={14}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
                            />
                          </div>
                        </InputField>
                      ) : (
                        <InputField label="District" required>
                          <input
                            type="text"
                            name="district"
                            required
                            value={formData.district}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Rangpur"
                          />
                        </InputField>
                      )}
                    </div>

                    {formData.deliveryType === "nationwide" && (
                      <InputField label="Upazila">
                        <input
                          type="text"
                          name="upazila"
                          value={formData.upazila}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Sadar"
                        />
                      </InputField>
                    )}

                    <div className="grid grid-cols-3 gap-3">
                      <InputField label="House No">
                        <input
                          type="text"
                          name="houseNo"
                          value={formData.houseNo}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="12"
                        />
                      </InputField>
                      <InputField label="Road">
                        <input
                          type="text"
                          name="road"
                          value={formData.road}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="5"
                        />
                      </InputField>
                      <InputField label="Flat No">
                        <input
                          type="text"
                          name="flatNo"
                          value={formData.flatNo}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="4B"
                        />
                      </InputField>
                    </div>

                    <InputField label="Additional Notes">
                      <textarea
                        name="deliveryNotes"
                        value={formData.deliveryNotes}
                        onChange={handleChange}
                        rows={2}
                        className={`${inputClass} resize-none`}
                        placeholder="Enter area, street or house no..."
                      />
                    </InputField>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                  <h2 className="text-base font-bold text-[var(--color-text-primary)]">
                    Order Summary
                  </h2>
                  <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full">
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <div className="w-14 h-14 bg-[var(--color-surface)] rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-snug">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)] flex-shrink-0">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setShowCoupon(!showCoupon)}
                    className="flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors w-full"
                  >
                    <FiTag size={13} />
                    {showCoupon ? "Hide coupon" : "Have a coupon code?"}
                    <FiChevronDown
                      size={13}
                      className={`ml-auto transition-transform ${showCoupon ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showCoupon && (
                    <div className="mt-2.5 flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className={`${inputClass} flex-1`}
                      />
                      <button
                        type="button"
                        className="px-4 py-2.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Selected delivery time summary */}
                {formData.deliveryType === "local" &&
                  customTime &&
                  (orderMode === "preorder" || wantsCustomTime) && (
                    <div className="mb-4 p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl flex items-center gap-2">
                      <FiClock
                        className="text-[var(--color-primary)] flex-shrink-0"
                        size={15}
                      />
                      <div>
                        <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">
                          {orderMode === "preorder"
                            ? "Pre-order · আগামীকাল"
                            : "নির্ধারিত সময় · আজ"}
                        </p>
                        <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                          {customTime}
                        </p>
                      </div>
                    </div>
                  )}

                {/* Pricing breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">
                      Subtotal
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      ৳{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">
                      Delivery charge
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {estimatedShipping === 0 ? (
                        <span className="text-[var(--color-primary)] font-bold">
                          FREE
                        </span>
                      ) : (
                        `৳${estimatedShipping}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">
                      Discount
                    </span>
                    <span className="font-semibold text-green-600">-৳0</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">
                      Total
                    </span>
                    <span className="text-xl font-black text-[var(--color-text-primary)]">
                      ৳{grandTotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-[var(--color-text-muted)]">
                    * Final delivery charge confirmed after review
                  </p>
                </div>

                {/* Submit (Desktop / normal in-page button) */}
                {/* <button
                                    type="submit"
                                    disabled={isPlacingOrder}
                                    className="mt-5 w-full flex items-center justify-center gap-2.5 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold text-sm tracking-wide hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-[var(--color-primary)]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isPlacingOrder ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Placing order...
                                        </>
                                    ) : (
                                        <>
                                            <FiLock size={15} />
                                            Place Order • ৳{grandTotal.toLocaleString()}
                                        </>
                                    )}
                                </button> */}




                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="mt-5 hidden md:block w-full flex items-center justify-center gap-2.5 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold text-sm tracking-wide hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-[var(--color-primary)]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPlacingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Confirming order...
                    </>
                  ) : (
                    <>
                      <FiLock size={15} />
                      Confirm Order • ৳{grandTotal.toLocaleString()}
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-3 leading-relaxed">
                  By placing your order, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="underline hover:text-[var(--color-primary)]"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* ===== ROW 2: Delivery Time (full width, local delivery only) ===== */}
          {formData.deliveryType === "local" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <SectionHeader
                icon={<FiTruck size={17} />}
                title="Delivery Time"
                subtitle="আপনার অর্ডার কখন ডেলিভারি চান?"
              />

              {/* Mode tabs */}
              <div className="flex gap-2 mb-4 border-b border-gray-100">
                {(["normal", "preorder"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setOrderMode(mode)}
                    className={`px-4 py-2.5 text-sm font-bold border-b-2 -mb-px transition-all flex items-center gap-1.5 ${
                      orderMode === mode
                        ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                        : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {mode === "normal" ? "Normal Order" : "Pre-order"}
                    {mode === "preorder" && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        Tomorrow
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {orderMode === "normal" ? (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        নির্দিষ্ট সময়ে ডেলিভারি চান?
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        না দিলে যত দ্রুত সম্ভব ডেলিভারি হবে
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWantsCustomTime(!wantsCustomTime)}
                      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${wantsCustomTime ? "bg-[var(--color-primary)]" : "bg-gray-200"}`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${wantsCustomTime ? "left-5" : "left-0.5"}`}
                      />
                    </button>
                  </div>

                  {wantsCustomTime && (
                    <div className="mt-4 max-w-xs">
                      <InputField label="Delivery Time (9 AM - 5 PM)" required>
                        <div className="relative">
                          <FiClock
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] pointer-events-none"
                          />
                          <input
                            type="time"
                            min="09:00"
                            max="17:00"
                            value={customTime}
                            onChange={(e) => setCustomTime(e.target.value)}
                            required={wantsCustomTime}
                            className={`${inputClass} pl-9`}
                          />
                        </div>
                      </InputField>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-3 p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl flex items-center gap-2">
                    <FiCalendar
                      className="text-[var(--color-primary)] flex-shrink-0"
                      size={15}
                    />
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      আগামীকাল,{" "}
                      {new Date(tomorrowStr).toLocaleDateString("en-BD", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div className="max-w-xs">
                    <InputField label="Delivery Time (9 AM - 5 PM)" required>
                      <div className="relative">
                        <FiClock
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] pointer-events-none"
                        />
                        <input
                          type="time"
                          min="09:00"
                          max="17:00"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          required
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </InputField>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== ROW 3: Payment Method (full width) ===== */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <SectionHeader
              icon={<FiCreditCard size={17} />}
              title="Payment Method"
              subtitle="How would you like to pay?"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                {
                  value: "cod",
                  label: "Cash on Delivery",
                  sub: "Pay on receive",
                  icon: "💵",
                  available: true,
                },
                {
                  value: "bkash",
                  label: "bKash",
                  sub: "Coming soon",
                  icon: "📱",
                  available: false,
                },
                {
                  value: "nagad",
                  label: "Nagad",
                  sub: "Coming soon",
                  icon: "💳",
                  available: false,
                },
                {
                  value: "card",
                  label: "Card",
                  sub: "Coming soon",
                  icon: "💳",
                  available: false,
                },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex flex-col items-center text-center gap-0.5 p-2.5 border rounded-lg transition-all ${
                    !method.available
                      ? "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50"
                      : formData.paymentMethod === method.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 cursor-pointer"
                        : "border-gray-200 hover:border-gray-300 cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={formData.paymentMethod === method.value}
                    onChange={handleChange}
                    disabled={!method.available}
                    className="sr-only"
                  />
                  <span className="text-lg leading-none">{method.icon}</span>
                  <p className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">
                    {method.label}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] leading-tight">
                    {method.sub}
                  </p>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <InputField label="Special Instructions (Optional)">
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows={2}
                  className={`${inputClass} resize-none`}
                  placeholder="Any special requests for your order..."
                />
              </InputField>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
