
// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useAppDispatch, useAppSelector } from '@/redux';
// import { clearCart } from '@/redux/slices/cartSlice';
// import { useCreateOrderMutation } from '@/redux/api/orderApi';
// import { useGetAllAreasQuery } from '@/redux/api/areaApi'; // ✅ Area API
// import {
//     FiMapPin,
//     FiCreditCard,
//     FiTruck,
//     FiCheckCircle,
//     FiChevronLeft,
//     FiShoppingBag,
//     FiLock,
//     FiClock,
//     FiCalendar
// } from 'react-icons/fi';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';

// interface Area {
//     _id: string;
//     name: string;
//     isActive: boolean;
// }

// const CheckoutPage = () => {
//     const { items, totalPrice } = useAppSelector((state) => state.cart);
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const dispatch = useAppDispatch();
//     const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

//     // ✅ Area list fetch করা (শুধু local delivery এর জন্য দরকার)
//     const { data: areasResponse, isLoading: isLoadingAreas } = useGetAllAreasQuery({});
//     const areas: Area[] = (areasResponse?.data || []).filter((a: Area) => a.isActive);

//     const [formData, setFormData] = useState({
//         fullName: session?.user?.firstName || '',
//         phone: (session?.user as any)?.phone || '',
//         deliveryType: 'local' as 'local' | 'nationwide',
//         city: '',
//         area: '', // ✅ dropdown থেকে Area _id বসবে
//         district: '',
//         upazila: '',
//         houseNo: '',
//         road: '',
//         block: '',
//         floor: '',
//         flatNo: '',
//         postalCode: '',
//         deliveryNotes: '',
//         label: 'home' as 'home' | 'work' | 'partner' | 'other',
//         paymentMethod: 'cod',
//         specialInstructions: '',
//     });

//     // ✅ Default: কোনো schedule selected থাকবে না (ASAP)
//     const [wantsScheduledDelivery, setWantsScheduledDelivery] = useState(false);
//     const [deliveryDate, setDeliveryDate] = useState('');
//     const [deliveryTime, setDeliveryTime] = useState('');

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//     ) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const todayStr = new Date().toISOString().split('T')[0];
//     const isDeliveryDateToday = deliveryDate === todayStr;
//     const currentTimeStr = new Date().toTimeString().slice(0, 5);

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

//         if (wantsScheduledDelivery && (!deliveryDate || !deliveryTime)) {
//             toast.error('Please select both date and time for scheduled delivery');
//             return;
//         }

//         const orderData: any = {
//             items: items.map((item) => ({
//                 productID: item.id,
//                 quantity: item.quantity,
//             })),
//             deliveryType: formData.deliveryType,
//             deliveryAddress: {
//                 name: formData.fullName,
//                 phone: formData.phone,
//                 city: formData.city,
//                 area: formData.area, // ✅ Area ObjectId dropdown থেকে
//                 district: formData.district || undefined,
//                 upazila: formData.upazila || undefined,
//                 houseNo: formData.houseNo || undefined,
//                 road: formData.road || undefined,
//                 block: formData.block || undefined,
//                 floor: formData.floor || undefined,
//                 flatNo: formData.flatNo || undefined,
//                 postalCode: formData.postalCode || undefined,
//                 deliveryNotes: formData.deliveryNotes || undefined,
//                 label: formData.label,
//             },
//             paymentMethod: formData.paymentMethod,
//             specialInstructions: formData.specialInstructions || undefined,
//         };

//         // ✅ শুধু user explicitly schedule করলে তবেই এই দুটো field payload এ যাবে
//         // Default অবস্থায় (checkbox off) এই if ব্লক স্কিপ হবে - deliveryDate/deliveryTime একদমই পাঠানো হবে না
//         if (wantsScheduledDelivery && deliveryDate && deliveryTime) {
//             orderData.deliveryDate = deliveryDate;
//             orderData.deliveryTime = deliveryTime;
//         }

//         try {
//             await createOrder(orderData).unwrap();
//             dispatch(clearCart());
//             toast.success('Order placed successfully!', {
//                 duration: 5000,
//                 icon: '🛍️'
//             });
//             router.push('/checkout/success');
//         } catch (err: any) {
//             toast.error(err?.data?.message || 'Failed to place order. Please try again.');
//         }
//     };

//     const estimatedShipping = formData.deliveryType === 'local'
//         ? (totalPrice >= 1000 ? 0 : 60)
//         : 120;
//     const grandTotal = totalPrice + estimatedShipping;

//     if (status === 'loading') {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     if (status === 'unauthenticated') {
//         toast.error('Please login to proceed with checkout');
//         router.push('/login?redirect=/checkout');
//         return null;
//     }

//     if (!items || items.length === 0) {
//         router.push('/cart');
//         return null;
//     }

//     return (
//         <div className="bg-gray-50/50 min-h-screen pb-20">
//             <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-8">
//                 <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[var(--color-primary)] mb-8 transition-colors group">
//                     <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
//                     Back to Cart
//                 </Link>

//                 <h1 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Checkout</h1>

//                 <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
//                     <div className="lg:col-span-8 space-y-8">
//                         {/* Shipping Information */}
//                         <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
//                             <div className="flex items-center gap-3 mb-8">
//                                 <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
//                                     <FiMapPin size={20} />
//                                 </div>
//                                 <h2 className="text-xl font-black text-gray-800">Shipping Details</h2>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div className="md:col-span-2">
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         required
//                                         value={formData.fullName}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="Enter your full name"
//                                     />
//                                 </div>
//                                 <div className="md:col-span-2">
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Phone Number</label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         required
//                                         value={formData.phone}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="+880 1XXX-XXXXXX"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">City</label>
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         required
//                                         value={formData.city}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="Dhaka"
//                                     />
//                                 </div>

//                                 {/* ✅ Area Dropdown - real API data */}
//                                 {formData.deliveryType === 'local' && (
//                                     <div>
//                                         <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Area</label>
//                                         <select
//                                             name="area"
//                                             required
//                                             value={formData.area}
//                                             onChange={handleChange}
//                                             disabled={isLoadingAreas}
//                                             className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium appearance-none disabled:opacity-60"
//                                         >
//                                             <option value="">
//                                                 {isLoadingAreas ? 'Loading areas...' : 'Select your area'}
//                                             </option>
//                                             {areas.map((area) => (
//                                                 <option key={area._id} value={area._id}>
//                                                     {area.name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {!isLoadingAreas && areas.length === 0 && (
//                                             <p className="text-[10px] text-red-500 font-medium mt-1 px-1">
//                                                 No delivery areas available right now.
//                                             </p>
//                                         )}
//                                     </div>
//                                 )}

//                                 {formData.deliveryType === 'nationwide' && (
//                                     <>
//                                         <div>
//                                             <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">District</label>
//                                             <input
//                                                 type="text"
//                                                 name="district"
//                                                 required
//                                                 value={formData.district}
//                                                 onChange={handleChange}
//                                                 className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                                 placeholder="Rangpur"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Upazila</label>
//                                             <input
//                                                 type="text"
//                                                 name="upazila"
//                                                 value={formData.upazila}
//                                                 onChange={handleChange}
//                                                 className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                                 placeholder="Sadar"
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">House No</label>
//                                     <input
//                                         type="text"
//                                         name="houseNo"
//                                         value={formData.houseNo}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="12"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Road</label>
//                                     <input
//                                         type="text"
//                                         name="road"
//                                         value={formData.road}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="5"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Flat No (Optional)</label>
//                                     <input
//                                         type="text"
//                                         name="flatNo"
//                                         value={formData.flatNo}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="4B"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Postal Code</label>
//                                     <input
//                                         type="text"
//                                         name="postalCode"
//                                         value={formData.postalCode}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="1200"
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Delivery Notes (Optional)</label>
//                                     <textarea
//                                         name="deliveryNotes"
//                                         value={formData.deliveryNotes}
//                                         onChange={handleChange}
//                                         rows={2}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium resize-none"
//                                         placeholder="e.g. Call before arriving, leave at door, etc."
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Delivery Type + Schedule */}
//                         <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
//                             <div className="flex items-center gap-3 mb-8">
//                                 <div className="w-10 h-10 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
//                                     <FiTruck size={20} />
//                                 </div>
//                                 <h2 className="text-xl font-black text-gray-800">Delivery Options</h2>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                                 <label className={`flex items-center justify-between p-5 border rounded-md cursor-pointer transition-all ${formData.deliveryType === 'local' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
//                                     <div className="flex items-center gap-4">
//                                         <input
//                                             type="radio"
//                                             name="deliveryType"
//                                             value="local"
//                                             checked={formData.deliveryType === 'local'}
//                                             onChange={handleChange}
//                                             className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
//                                         />
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-900">Local Delivery</p>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Same Day (Dhaka)</p>
//                                         </div>
//                                     </div>
//                                 </label>
//                                 <label className={`flex items-center justify-between p-5 border rounded-md cursor-pointer transition-all ${formData.deliveryType === 'nationwide' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
//                                     <div className="flex items-center gap-4">
//                                         <input
//                                             type="radio"
//                                             name="deliveryType"
//                                             value="nationwide"
//                                             checked={formData.deliveryType === 'nationwide'}
//                                             onChange={handleChange}
//                                             className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
//                                         />
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-900">Nationwide Delivery</p>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">3 Business Days</p>
//                                         </div>
//                                     </div>
//                                 </label>
//                             </div>

//                             {/* ✅ শুধু local delivery হলে scheduled option দেখাবে, default এ off */}
//                             {formData.deliveryType === 'local' && (
//                                 <div className="pt-6 border-t border-gray-50">
//                                     <label className="flex items-center gap-3 cursor-pointer mb-4">
//                                         <input
//                                             type="checkbox"
//                                             checked={wantsScheduledDelivery}
//                                             onChange={(e) => {
//                                                 setWantsScheduledDelivery(e.target.checked);
//                                                 if (!e.target.checked) {
//                                                     setDeliveryDate('');
//                                                     setDeliveryTime('');
//                                                 }
//                                             }}
//                                             className="w-4 h-4 text-[var(--color-primary)] rounded focus:ring-0"
//                                         />
//                                         <span className="text-sm font-bold text-gray-900">Schedule a specific date & time</span>
//                                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">(Optional — Default: ASAP)</span>
//                                     </label>

//                                     {wantsScheduledDelivery && (
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                                             <div>
//                                                 <label className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
//                                                     <FiCalendar size={12} /> Delivery Date
//                                                 </label>
//                                                 <input
//                                                     type="date"
//                                                     value={deliveryDate}
//                                                     min={todayStr}
//                                                     onChange={(e) => setDeliveryDate(e.target.value)}
//                                                     required={wantsScheduledDelivery}
//                                                     className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
//                                                     <FiClock size={12} /> Delivery Time
//                                                 </label>
//                                                 <input
//                                                     type="time"
//                                                     value={deliveryTime}
//                                                     min={isDeliveryDateToday ? currentTimeStr : undefined}
//                                                     onChange={(e) => setDeliveryTime(e.target.value)}
//                                                     required={wantsScheduledDelivery}
//                                                     className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Payment Method */}
//                         <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
//                             <div className="flex items-center gap-3 mb-8">
//                                 <div className="w-10 h-10 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
//                                     <FiCreditCard size={20} />
//                                 </div>
//                                 <h2 className="text-xl font-black text-gray-800">Payment Method</h2>
//                             </div>

//                             <div className="space-y-4">
//                                 <label className={`flex items-center gap-4 p-5 border rounded-md cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
//                                     <input
//                                         type="radio"
//                                         name="paymentMethod"
//                                         value="cod"
//                                         checked={formData.paymentMethod === 'cod'}
//                                         onChange={handleChange}
//                                         className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
//                                     />
//                                     <div className="flex-1 flex items-center justify-between">
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-900">Cash on Delivery</p>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pay when you receive</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
//                                             <FiShoppingBag size={18} />
//                                         </div>
//                                     </div>
//                                 </label>

//                                 <label className="flex items-center gap-4 p-5 border rounded-md cursor-not-allowed opacity-50 bg-gray-50 transition-all">
//                                     <input
//                                         type="radio"
//                                         name="paymentMethod"
//                                         value="online"
//                                         disabled
//                                         className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
//                                     />
//                                     <div className="flex-1 flex items-center justify-between">
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-900">Online Payment (Coming Soon)</p>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">bKash, Nagad, Card</p>
//                                         </div>
//                                         <div className="flex gap-2">
//                                             <div className="w-8 h-5 bg-gray-200 rounded"></div>
//                                             <div className="w-8 h-5 bg-gray-200 rounded"></div>
//                                         </div>
//                                     </div>
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Order Summary Sidebar */}
//                     <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
//                         <div className="bg-white rounded-md border border-gray-100 shadow-xl shadow-gray-200/20 p-8">
//                             <h2 className="text-xl font-black text-gray-900 mb-8 pb-4 border-b border-gray-50">Order Review</h2>

//                             <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//                                 {items.map((item) => (
//                                     <div key={item.id} className="flex gap-4">
//                                         <div className="w-16 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 p-1">
//                                             <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
//                                         </div>
//                                         <div className="flex-1 min-w-0">
//                                             <h4 className="text-xs font-bold text-gray-900 truncate uppercase tracking-tight">{item.name}</h4>
//                                             <p className="text-xs text-gray-400 mt-1 font-medium italic">Qty: {item.quantity}</p>
//                                             <p className="text-sm font-black text-gray-900 mt-1">৳{(item.price * item.quantity).toLocaleString()}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-100">
//                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery Schedule</p>
//                                 <p className="text-sm font-bold text-gray-900">
//                                     {wantsScheduledDelivery && deliveryDate && deliveryTime
//                                         ? `${deliveryDate} at ${deliveryTime}`
//                                         : 'As soon as possible (Default)'}
//                                 </p>
//                             </div>

//                             <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500 font-medium">Subtotal</span>
//                                     <span className="font-bold text-gray-900">৳{totalPrice.toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500 font-medium">Shipping Cost (Est.)</span>
//                                     <span className="font-bold text-gray-900">৳{estimatedShipping.toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm text-[var(--color-primary)]">
//                                     <span className="font-bold italic">Promo Discount</span>
//                                     <span className="font-bold">-৳0</span>
//                                 </div>
//                                 <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
//                                     <div>
//                                         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grand Total</span>
//                                         <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">৳{grandTotal.toLocaleString()}</p>
//                                     </div>
//                                     <FiCheckCircle className="text-emerald-500 mb-1" size={24} />
//                                 </div>
//                                 <p className="text-[10px] text-gray-400 italic">
//                                     * Final shipping cost will be confirmed after order review
//                                 </p>
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={isPlacingOrder}
//                                 className="w-full flex items-center justify-center gap-3 py-5 bg-gray-900 text-white rounded-md font-bold text-sm tracking-widest hover:bg-[var(--color-primary)] transition-all shadow-xl shadow-gray-200 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-70 disabled:cursor-not-allowed"
//                             >
//                                 {isPlacingOrder ? (
//                                     <>
//                                         <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
//                                         PLACING ORDER...
//                                     </>
//                                 ) : (
//                                     <>
//                                         CONFIRM ORDER
//                                         <FiLock className="group-hover:scale-110 transition-transform" />
//                                     </>
//                                 )}
//                             </button>

//                             <p className="text-[10px] text-gray-400 text-center mt-6 font-bold uppercase tracking-widest leading-relaxed">
//                                 By placing order, you agree to our <br />Terms & Conditions
//                             </p>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;




"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { clearCart } from '@/redux/slices/cartSlice';
import { useCreateOrderMutation } from '@/redux/api/orderApi';
import { useGetAllAreasQuery } from '@/redux/api/areaApi';
import {
    FiMapPin, FiCreditCard, FiTruck, FiCheckCircle,
    FiChevronLeft, FiShoppingBag, FiLock, FiClock,
    FiCalendar, FiTag, FiChevronDown, FiPackage,
    FiHome, FiBriefcase, FiHeart, FiMoreHorizontal
} from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface Area {
    _id: string;
    name: string;
    isActive: boolean;
}

// ===== Step Indicator =====
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    const steps = [
        { id: 1, label: 'Address' },
        { id: 2, label: 'Delivery' },
        { id: 3, label: 'Payment' },
    ];
    return (
        <div className="flex items-center justify-center gap-0 mb-10">
            {steps.map((step, idx) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            currentStep > step.id
                                ? 'bg-[var(--color-primary)] text-white'
                                : currentStep === step.id
                                    ? 'bg-[var(--color-primary)] text-white ring-4 ring-[var(--color-primary)]/20'
                                    : 'bg-gray-100 text-gray-400'
                        }`}>
                            {currentStep > step.id ? '✓' : step.id}
                        </div>
                        <span className={`text-[10px] font-bold mt-1 ${
                            currentStep >= step.id ? 'text-[var(--color-primary)]' : 'text-gray-400'
                        }`}>{step.label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                        <div className={`h-[2px] w-16 sm:w-24 mb-4 transition-all ${
                            currentStep > step.id ? 'bg-[var(--color-primary)]' : 'bg-gray-100'
                        }`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// ===== Section Header =====
const SectionHeader = ({ icon, title, subtitle }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
}) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <div>
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">{title}</h2>
            {subtitle && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{subtitle}</p>}
        </div>
    </div>
);

// ===== Input Field =====
const InputField = ({ label, required, children }: {
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

const inputClass = "w-full px-4 py-2.5 bg-[var(--color-surface)] border border-gray-200 rounded-xl outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]";

const CheckoutPage = () => {
    const { items, totalPrice } = useAppSelector((state) => state.cart);
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

    const { data: areasResponse, isLoading: isLoadingAreas } = useGetAllAreasQuery({});
    const areas: Area[] = (areasResponse?.data || []).filter((a: Area) => a.isActive);

    const [currentStep, setCurrentStep] = useState(1);
    const [showCoupon, setShowCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [showSchedule, setShowSchedule] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');

    const [formData, setFormData] = useState({
        fullName: (session?.user as any)?.firstName || '',
        phone: (session?.user as any)?.phone || '',
        deliveryType: 'local' as 'local' | 'nationwide',
        city: '',
        area: '',
        district: '',
        upazila: '',
        houseNo: '',
        road: '',
        block: '',
        floor: '',
        flatNo: '',
        postalCode: '',
        deliveryNotes: '',
        label: 'home' as 'home' | 'work' | 'partner' | 'other',
        paymentMethod: 'cod',
        specialInstructions: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const todayStr = new Date().toISOString().split('T')[0];
    const isDeliveryDateToday = deliveryDate === todayStr;
    const currentTimeStr = new Date().toTimeString().slice(0, 5);

    const estimatedShipping = formData.deliveryType === 'local'
        ? (totalPrice >= 1000 ? 0 : 60)
        : 120;
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
            toast.error('Please fill in all required fields');
            return;
        }
        if (formData.deliveryType === 'local' && !formData.area) {
            toast.error('Please select your delivery area');
            return;
        }
        if (formData.deliveryType === 'nationwide' && !formData.district) {
            toast.error('Please provide your district');
            return;
        }
        if (showSchedule && (!deliveryDate || !deliveryTime)) {
            toast.error('Please select both date and time for scheduled delivery');
            return;
        }

        const orderData: any = {
            items: items.map((item) => ({
                productID: item.id,
                quantity: item.quantity,
            })),
            deliveryType: formData.deliveryType,
            deliveryAddress: {
                name: formData.fullName,
                phone: formData.phone,
                city: formData.city,
                area: formData.area,
                district: formData.district || undefined,
                upazila: formData.upazila || undefined,
                houseNo: formData.houseNo || undefined,
                road: formData.road || undefined,
                block: formData.block || undefined,
                floor: formData.floor || undefined,
                flatNo: formData.flatNo || undefined,
                postalCode: formData.postalCode || undefined,
                deliveryNotes: formData.deliveryNotes || undefined,
                label: formData.label,
            },
            paymentMethod: formData.paymentMethod,
            specialInstructions: formData.specialInstructions || undefined,
        };

        if (showSchedule && deliveryDate && deliveryTime) {
            orderData.deliveryDate = deliveryDate;
            orderData.deliveryTime = deliveryTime;
        }

        try {
            await createOrder(orderData).unwrap();
            dispatch(clearCart());
            toast.success('Order placed successfully! 🛍️', { duration: 5000 });
            router.push('/checkout/success');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to place order. Please try again.');
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/login?redirect=/checkout');
        return null;
    }

    if (!items || items.length === 0) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--color-surface)] pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 max-w-6xl">

                {/* Back */}
                <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8 transition-colors group">
                    <FiChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    Back to Cart
                </Link>

                {/* Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Complete Your Order</h1>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
                </div>

                {/* Step Indicator */}
                <StepIndicator currentStep={currentStep} />

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* ===== LEFT ===== */}
                        <div className="lg:col-span-7 space-y-4">

                            {/* ── Section 1: Delivery Address ── */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <SectionHeader
                                    icon={<FiMapPin size={17} />}
                                    title="Delivery Address"
                                    subtitle="Where should we deliver your order?"
                                />

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField label="Full Name" required>
                                            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Your full name" />
                                        </InputField>
                                        <InputField label="Phone Number" required>
                                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="01XXXXXXXXX" />
                                        </InputField>
                                    </div>

                                    {/* Address label tabs */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">Address Type</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {(['home', 'work', 'partner', 'other'] as const).map((lbl) => (
                                                <button
                                                    key={lbl}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, label: lbl })}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                                        formData.label === lbl
                                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                                            : 'border-gray-200 text-[var(--color-text-muted)] hover:border-gray-300'
                                                    }`}
                                                >
                                                    {labelIcons[lbl]}
                                                    {lbl.charAt(0).toUpperCase() + lbl.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField label="City" required>
                                            <input type="text" name="city" required value={formData.city} onChange={handleChange} className={inputClass} placeholder="Dhaka" />
                                        </InputField>

                                        {formData.deliveryType === 'local' ? (
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
                                                        <option value="">{isLoadingAreas ? 'Loading...' : 'Select area'}</option>
                                                        {areas.map((area) => (
                                                            <option key={area._id} value={area._id}>{area.name}</option>
                                                        ))}
                                                    </select>
                                                    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                                                </div>
                                            </InputField>
                                        ) : (
                                            <InputField label="District" required>
                                                <input type="text" name="district" required value={formData.district} onChange={handleChange} className={inputClass} placeholder="Rangpur" />
                                            </InputField>
                                        )}
                                    </div>

                                    {formData.deliveryType === 'nationwide' && (
                                        <InputField label="Upazila">
                                            <input type="text" name="upazila" value={formData.upazila} onChange={handleChange} className={inputClass} placeholder="Sadar" />
                                        </InputField>
                                    )}

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <InputField label="House No">
                                            <input type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} className={inputClass} placeholder="12" />
                                        </InputField>
                                        <InputField label="Road">
                                            <input type="text" name="road" value={formData.road} onChange={handleChange} className={inputClass} placeholder="5" />
                                        </InputField>
                                        <InputField label="Flat No">
                                            <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} className={inputClass} placeholder="4B" />
                                        </InputField>
                                        <InputField label="Postal Code">
                                            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClass} placeholder="1200" />
                                        </InputField>
                                    </div>

                                    <InputField label="Delivery Notes">
                                        <textarea name="deliveryNotes" value={formData.deliveryNotes} onChange={handleChange} rows={2} className={`${inputClass} resize-none`} placeholder="e.g. Call before arriving, leave at door..." />
                                    </InputField>
                                </div>
                            </div>

                            {/* ── Section 2: Delivery Options ── */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <SectionHeader
                                    icon={<FiTruck size={17} />}
                                    title="Delivery Options"
                                    subtitle="Choose how you want your order delivered"
                                />

                                {/* Delivery Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                                    {[
                                        { value: 'local', label: 'Local Delivery', sub: 'Same day • Barisal city', icon: <FiMapPin size={18} /> },
                                        { value: 'nationwide', label: 'Nationwide', sub: '3 business days', icon: <FiPackage size={18} /> },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                                                formData.deliveryType === opt.value
                                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                                    : 'border-gray-200 hover:border-gray-300'
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
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                formData.deliveryType === opt.value
                                                    ? 'bg-[var(--color-primary)] text-white'
                                                    : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                {opt.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-[var(--color-text-primary)]">{opt.label}</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">{opt.sub}</p>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                                                formData.deliveryType === opt.value
                                                    ? 'border-[var(--color-primary)]'
                                                    : 'border-gray-300'
                                            }`}>
                                                {formData.deliveryType === opt.value && (
                                                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {/* ✅ Schedule toggle — local delivery only */}
                                {formData.deliveryType === 'local' && (
                                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                                        {/* Toggle header */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowSchedule(!showSchedule);
                                                if (showSchedule) {
                                                    setDeliveryDate('');
                                                    setDeliveryTime('');
                                                }
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${showSchedule ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-gray-100 text-gray-400'}`}>
                                                    <FiCalendar size={14} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">Schedule Delivery</p>
                                                    <p className="text-xs text-[var(--color-text-muted)]">
                                                        {showSchedule && deliveryDate && deliveryTime
                                                            ? `📅 ${deliveryDate} at ${deliveryTime}`
                                                            : 'Default: Deliver as soon as possible'}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Toggle pill */}
                                            <div className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${showSchedule ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${showSchedule ? 'left-5' : 'left-0.5'}`} />
                                            </div>
                                        </button>

                                        {/* ✅ Schedule content — slide down */}
                                        {showSchedule && (
                                            <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50/50">
                                                <p className="text-xs text-[var(--color-text-muted)] mb-3">Pick a date and time for your delivery</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <InputField label="Delivery Date" required>
                                                        <div className="relative">
                                                            <FiCalendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] pointer-events-none" />
                                                            <input
                                                                type="date"
                                                                value={deliveryDate}
                                                                min={todayStr}
                                                                onChange={(e) => setDeliveryDate(e.target.value)}
                                                                required={showSchedule}
                                                                className={`${inputClass} pl-9`}
                                                            />
                                                        </div>
                                                    </InputField>
                                                    <InputField label="Delivery Time" required>
                                                        <div className="relative">
                                                            <FiClock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] pointer-events-none" />
                                                            <input
                                                                type="time"
                                                                value={deliveryTime}
                                                                min={isDeliveryDateToday ? currentTimeStr : undefined}
                                                                onChange={(e) => setDeliveryTime(e.target.value)}
                                                                required={showSchedule}
                                                                className={`${inputClass} pl-9`}
                                                            />
                                                        </div>
                                                    </InputField>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* ── Section 3: Payment ── */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <SectionHeader
                                    icon={<FiCreditCard size={17} />}
                                    title="Payment Method"
                                    subtitle="How would you like to pay?"
                                />

                                <div className="space-y-3">
                                    {[
                                        { value: 'cod', label: 'Cash on Delivery', sub: 'Pay when you receive', icon: '💵', available: true },
                                        { value: 'bkash', label: 'bKash', sub: 'Coming soon', icon: '📱', available: false },
                                        { value: 'nagad', label: 'Nagad', sub: 'Coming soon', icon: '💳', available: false },
                                    ].map((method) => (
                                        <label
                                            key={method.value}
                                            className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${
                                                !method.available
                                                    ? 'opacity-40 cursor-not-allowed border-gray-100 bg-gray-50'
                                                    : formData.paymentMethod === method.value
                                                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 cursor-pointer'
                                                        : 'border-gray-200 hover:border-gray-300 cursor-pointer'
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
                                            <span className="text-xl flex-shrink-0">{method.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-[var(--color-text-primary)]">{method.label}</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">{method.sub}</p>
                                            </div>
                                            {method.available && (
                                                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                                                    formData.paymentMethod === method.value
                                                        ? 'border-[var(--color-primary)]'
                                                        : 'border-gray-300'
                                                }`}>
                                                    {formData.paymentMethod === method.value && (
                                                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                                                    )}
                                                </div>
                                            )}
                                        </label>
                                    ))}
                                </div>

                                {/* Special instructions */}
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
                        </div>

                        {/* ===== RIGHT: Order Summary ===== */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-24">

                                {/* Header */}
                                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                                    <h2 className="text-base font-bold text-[var(--color-text-primary)]">Order Summary</h2>
                                    <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full">
                                        {items.length} item{items.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                {/* Items */}
                                <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1 mb-5">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3 items-start">
                                            <div className="w-14 h-14 bg-[var(--color-surface)] rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-snug">{item.name}</p>
                                                <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold text-[var(--color-text-primary)] flex-shrink-0">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* ✅ Coupon — toggle hidden */}
                                <div className="mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowCoupon(!showCoupon)}
                                        className="flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors w-full"
                                    >
                                        <FiTag size={13} />
                                        {showCoupon ? 'Hide coupon' : 'Have a coupon code?'}
                                        <FiChevronDown
                                            size={13}
                                            className={`ml-auto transition-transform ${showCoupon ? 'rotate-180' : ''}`}
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

                                {/* ✅ Schedule summary */}
                                {showSchedule && deliveryDate && deliveryTime && (
                                    <div className="mb-4 p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl">
                                        <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">Scheduled Delivery</p>
                                        <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                                            📅 {new Date(deliveryDate).toLocaleDateString('en-BD', { weekday: 'short', day: 'numeric', month: 'short' })} at {deliveryTime}
                                        </p>
                                    </div>
                                )}

                                {/* Pricing breakdown */}
                                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-muted)]">Subtotal</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">৳{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-muted)]">Delivery charge</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">
                                            {estimatedShipping === 0 ? (
                                                <span className="text-[var(--color-primary)] font-bold">FREE</span>
                                            ) : `৳${estimatedShipping}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-muted)]">Discount</span>
                                        <span className="font-semibold text-green-600">-৳0</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                        <span className="text-sm font-bold text-[var(--color-text-primary)]">Total</span>
                                        <span className="text-xl font-black text-[var(--color-text-primary)]">৳{grandTotal.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[10px] text-[var(--color-text-muted)]">
                                        * Final delivery charge confirmed after review
                                    </p>
                                </div>

                                {/* Submit button */}
                                <button
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
                                </button>

                                <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-3 leading-relaxed">
                                    By placing your order, you agree to our{' '}
                                    <Link href="/terms" className="underline hover:text-[var(--color-primary)]">Terms & Conditions</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;