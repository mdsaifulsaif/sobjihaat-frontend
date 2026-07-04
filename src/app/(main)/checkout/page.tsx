// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '@/redux';
// import { clearCart } from '@/redux/slices/cartSlice';
// import { useCreateOrderMutation } from '@/redux/api/orderApi';
// import {
//     FiMapPin,
//     FiCreditCard,
//     FiTruck,
//     FiCheckCircle,
//     FiChevronLeft,
//     FiShoppingBag,
//     FiLock
// } from 'react-icons/fi';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';

// const CheckoutPage = () => {
//     const { items, totalPrice } = useAppSelector((state) => state.cart);
//     const { user, isAuthenticated } = useAppSelector((state) => state.auth);
//     const router = useRouter();
//     const dispatch = useAppDispatch();
//     const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

//     const [formData, setFormData] = useState({
//         fullName: user?.name || '',
//         email: user?.email || '',
//         phone: user?.phone || '',
//         street: user?.address?.street || '',
//         city: user?.address?.city || '',
//         state: user?.address?.state || '',
//         zipCode: user?.address?.zipCode || '',
//         country: user?.address?.country || 'Bangladesh',
//         paymentMethod: 'cod',
//         shippingMethod: 'standard'
//     });

//     // useEffect(() => {
//     //     if (items.length === 0) {
//     //         router.push('/cart');
//     //     }
//     //     if (!isAuthenticated) {
//     //         toast.error('Please login to proceed with checkout');
//     //         router.push('/login?redirect=/checkout');
//     //     }
//     // }, [items, isAuthenticated, router]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const orderData = {
//             shippingAddress: {
//                 fullName: formData.fullName,
//                 phone: formData.phone,
//                 email: formData.email,
//                 street: formData.street,
//                 city: formData.city,
//                 state: formData.state,
//                 zipCode: formData.zipCode,
//                 country: formData.country
//             },
//             paymentMethod: formData.paymentMethod,
//             shippingMethod: formData.shippingMethod
//         };

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

//     const shippingCost = formData.shippingMethod === 'express' ? 150 : (totalPrice >= 5000 ? 0 : 60);
//     const grandTotal = totalPrice + shippingCost;

//     if (items.length === 0 || !isAuthenticated) return null;

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
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         required
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="email@example.com"
//                                     />
//                                 </div>
//                                 <div>
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
//                                 <div className="md:col-span-2">
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Street Address</label>
//                                     <input
//                                         type="text"
//                                         name="street"
//                                         required
//                                         value={formData.street}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="House no, Street name, Area"
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
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">State / District</label>
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         required
//                                         value={formData.state}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="Dhaka"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Zip / Postal Code</label>
//                                     <input
//                                         type="text"
//                                         name="zipCode"
//                                         required
//                                         value={formData.zipCode}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
//                                         placeholder="1200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Country</label>
//                                     <select
//                                         name="country"
//                                         value={formData.country}
//                                         onChange={handleChange}
//                                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium appearance-none"
//                                     >
//                                         <option value="Bangladesh">Bangladesh</option>
//                                         <option value="International">International</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Shipping Method */}
//                         <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
//                             <div className="flex items-center gap-3 mb-8">
//                                 <div className="w-10 h-10 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
//                                     <FiTruck size={20} />
//                                 </div>
//                                 <h2 className="text-xl font-black text-gray-800">Shipping Method</h2>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <label className={`flex items-center justify-between p-5 border rounded-md cursor-pointer transition-all ${formData.shippingMethod === 'standard' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
//                                     <div className="flex items-center gap-4">
//                                         <input
//                                             type="radio"
//                                             name="shippingMethod"
//                                             value="standard"
//                                             checked={formData.shippingMethod === 'standard'}
//                                             onChange={handleChange}
//                                             className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
//                                         />
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-900">Standard Delivery</p>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">3-5 Business Days</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-sm font-black text-gray-900">{totalPrice >= 5000 ? 'FREE' : '৳60'}</span>
//                                 </label>
//                                 <label className={`flex items-center justify-between p-5 border rounded-md cursor-pointer transition-all ${formData.shippingMethod === 'express' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
//                                     <div className="flex items-center gap-4">
//                                         <input
//                                             type="radio"
//                                             name="shippingMethod"
//                                             value="express"
//                                             checked={formData.shippingMethod === 'express'}
//                                             onChange={handleChange}
//                                             className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
//                                         />
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-900">Express Delivery</p>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Next Day Delivery</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-sm font-black text-gray-900">৳150</span>
//                                 </label>
//                             </div>
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

//                                 <label className={`flex items-center gap-4 p-5 border rounded-md cursor-not-allowed opacity-50 bg-gray-50 transition-all`}>
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

//                             <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500 font-medium">Subtotal</span>
//                                     <span className="font-bold text-gray-900">৳{totalPrice.toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500 font-medium">Shipping Cost</span>
//                                     <span className="font-bold text-gray-900">৳{shippingCost.toLocaleString()}</span>
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
import { useAppDispatch, useAppSelector } from '@/redux';
import { clearCart } from '@/redux/slices/cartSlice';
import { useCreateOrderMutation } from '@/redux/api/orderApi';
// ⚠️ তোমার actual area fetching hook দিয়ে replace করো
// import { useGetAreasQuery } from '@/redux/api/areaApi';
import {
    FiMapPin,
    FiCreditCard,
    FiTruck,
    FiCheckCircle,
    FiChevronLeft,
    FiShoppingBag,
    FiLock,
    FiClock,
    FiCalendar
} from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
    const { items, totalPrice } = useAppSelector((state) => state.cart);
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

    // ⚠️ তোমার actual area API দিয়ে বদলাও
    // const { data: areas } = useGetAreasQuery();

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        deliveryType: 'local' as 'local' | 'nationwide',
        city: user?.address?.city || '',
        area: '', // Area ObjectId (dropdown থেকে সিলেক্ট হবে)
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

    // ✅ Delivery Date/Time - default এ কিছুই selected থাকবে না (ASAP)
    const [wantsScheduledDelivery, setWantsScheduledDelivery] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ আজকের তারিখ - date input এর min attribute এর জন্য (past date সিলেক্ট করা UI লেভেলেই ব্লক)
    const todayStr = new Date().toISOString().split('T')[0];

    // ✅ যদি আজকের তারিখ সিলেক্ট করা হয়, time input এর min ও এখনকার সময় হওয়া উচিত
    const isDeliveryDateToday = deliveryDate === todayStr;
    const currentTimeStr = new Date().toTimeString().slice(0, 5); // "HH:mm"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.deliveryType === 'local' && !formData.area) {
            toast.error('Please select your delivery area');
            return;
        }

        if (wantsScheduledDelivery && (!deliveryDate || !deliveryTime)) {
            toast.error('Please select both date and time for scheduled delivery');
            return;
        }

        const orderData: any = {
            items: items.map((item: any) => ({
                productID: item.id,
                // variantID: item.variantId || undefined,
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

        // ✅ user schedule করলে তবেই deliveryDate/deliveryTime পাঠাবে, না করলে কিছুই পাঠাবে না (ASAP)
        if (wantsScheduledDelivery && deliveryDate && deliveryTime) {
            orderData.deliveryDate = deliveryDate;
            orderData.deliveryTime = deliveryTime;
        }

        try {
            await createOrder(orderData).unwrap();
            dispatch(clearCart());
            toast.success('Order placed successfully!', {
                duration: 5000,
                icon: '🛍️'
            });
            router.push('/checkout/success');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to place order. Please try again.');
        }
    };

    // ⚠️ Frontend এ shipping charge শুধু estimate/preview - আসল হিসাব backend করবে
    const estimatedShipping = formData.deliveryType === 'local'
        ? (totalPrice >= 1000 ? 0 : 60)
        : 120;
    const grandTotal = totalPrice + estimatedShipping;

    if (items.length === 0 || !isAuthenticated) return null;

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-8">
                <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[var(--color-primary)] mb-8 transition-colors group">
                    <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Cart
                </Link>

                <h1 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Checkout</h1>

                <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Shipping Information */}
                        <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <FiMapPin size={20} />
                                </div>
                                <h2 className="text-xl font-black text-gray-800">Shipping Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                        placeholder="+880 1XXX-XXXXXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                        placeholder="Dhaka"
                                    />
                                </div>

                                {/* ✅ Area - dropdown হওয়া উচিত (Area model থেকে ObjectId) - শুধু local delivery হলে required */}
                                {formData.deliveryType === 'local' && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Area</label>
                                        <select
                                            name="area"
                                            required
                                            value={formData.area}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium appearance-none"
                                        >
                                            <option value="">Select your area</option>
                                            {/* ⚠️ areas?.map((a) => <option key={a._id} value={a._id}>{a.name}</option>) */}
                                        </select>
                                    </div>
                                )}

                                {/* ✅ Nationwide হলে district/upazila দেখাবে */}
                                {formData.deliveryType === 'nationwide' && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">District</label>
                                            <input
                                                type="text"
                                                name="district"
                                                required
                                                value={formData.district}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                                placeholder="Rangpur"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Upazila</label>
                                            <input
                                                type="text"
                                                name="upazila"
                                                value={formData.upazila}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                                placeholder="Sadar"
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">House No</label>
                                    <input
                                        type="text"
                                        name="houseNo"
                                        value={formData.houseNo}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                        placeholder="12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Road</label>
                                    <input
                                        type="text"
                                        name="road"
                                        value={formData.road}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                        placeholder="5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Flat No (Optional)</label>
                                    <input
                                        type="text"
                                        name="flatNo"
                                        value={formData.flatNo}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                        placeholder="4B"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                        placeholder="1200"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Delivery Notes (Optional)</label>
                                    <textarea
                                        name="deliveryNotes"
                                        value={formData.deliveryNotes}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium resize-none"
                                        placeholder="e.g. Call before arriving, leave at door, etc."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Type + Schedule */}
                        <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <FiTruck size={20} />
                                </div>
                                <h2 className="text-xl font-black text-gray-800">Delivery Options</h2>
                            </div>

                            {/* ✅ Delivery Type: local / nationwide */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <label className={`flex items-center justify-between p-5 border rounded-md cursor-pointer transition-all ${formData.deliveryType === 'local' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="radio"
                                            name="deliveryType"
                                            value="local"
                                            checked={formData.deliveryType === 'local'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Local Delivery</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Same Day (Dhaka)</p>
                                        </div>
                                    </div>
                                </label>
                                <label className={`flex items-center justify-between p-5 border rounded-md cursor-pointer transition-all ${formData.deliveryType === 'nationwide' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="radio"
                                            name="deliveryType"
                                            value="nationwide"
                                            checked={formData.deliveryType === 'nationwide'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Nationwide Delivery</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">3 Business Days</p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* ✅ শুধু Local delivery হলে scheduled date/time দেখাবে, Nationwide এ লাগবে না */}
                            {formData.deliveryType === 'local' && (
                                <div className="pt-6 border-t border-gray-50">
                                    <label className="flex items-center gap-3 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            checked={wantsScheduledDelivery}
                                            onChange={(e) => {
                                                setWantsScheduledDelivery(e.target.checked);
                                                if (!e.target.checked) {
                                                    setDeliveryDate('');
                                                    setDeliveryTime('');
                                                }
                                            }}
                                            className="w-4 h-4 text-[var(--color-primary)] rounded focus:ring-0"
                                        />
                                        <span className="text-sm font-bold text-gray-900">Schedule a specific date & time</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">(Optional — Default: ASAP)</span>
                                    </label>

                                    {wantsScheduledDelivery && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-1">
                                                    <FiCalendar size={12} /> Delivery Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={deliveryDate}
                                                    min={todayStr} // 🔒 past date UI লেভেলেই ব্লক
                                                    onChange={(e) => setDeliveryDate(e.target.value)}
                                                    required={wantsScheduledDelivery}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-1">
                                                    <FiClock size={12} /> Delivery Time
                                                </label>
                                                <input
                                                    type="time"
                                                    value={deliveryTime}
                                                    min={isDeliveryDateToday ? currentTimeStr : undefined} // 🔒 আজকের তারিখ হলে past time ব্লক
                                                    onChange={(e) => setDeliveryTime(e.target.value)}
                                                    required={wantsScheduledDelivery}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <FiCreditCard size={20} />
                                </div>
                                <h2 className="text-xl font-black text-gray-800">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                <label className={`flex items-center gap-4 p-5 border rounded-md cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
                                    />
                                    <div className="flex-1 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Cash on Delivery</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pay when you receive</p>
                                        </div>
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                            <FiShoppingBag size={18} />
                                        </div>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-4 p-5 border rounded-md cursor-not-allowed opacity-50 bg-gray-50 transition-all`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="online"
                                        disabled
                                        className="w-4 h-4 text-[var(--color-primary)] focus:ring-0"
                                    />
                                    <div className="flex-1 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Online Payment (Coming Soon)</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">bKash, Nagad, Card</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-white rounded-md border border-gray-100 shadow-xl shadow-gray-200/20 p-8">
                            <h2 className="text-xl font-black text-gray-900 mb-8 pb-4 border-b border-gray-50">Order Review</h2>

                            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item: any) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 p-1">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-gray-900 truncate uppercase tracking-tight">{item.name}</h4>
                                            <p className="text-xs text-gray-400 mt-1 font-medium italic">Qty: {item.quantity}</p>
                                            <p className="text-sm font-black text-gray-900 mt-1">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ✅ Selected delivery schedule summary দেখানো */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery Schedule</p>
                                <p className="text-sm font-bold text-gray-900">
                                    {wantsScheduledDelivery && deliveryDate && deliveryTime
                                        ? `${deliveryDate} at ${deliveryTime}`
                                        : 'As soon as possible (Default)'}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-bold text-gray-900">৳{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Shipping Cost (Est.)</span>
                                    <span className="font-bold text-gray-900">৳{estimatedShipping.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-[var(--color-primary)]">
                                    <span className="font-bold italic">Promo Discount</span>
                                    <span className="font-bold">-৳0</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grand Total</span>
                                        <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">৳{grandTotal.toLocaleString()}</p>
                                    </div>
                                    <FiCheckCircle className="text-emerald-500 mb-1" size={24} />
                                </div>
                                <p className="text-[10px] text-gray-400 italic">
                                    * Final shipping cost will be confirmed after order review
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isPlacingOrder}
                                className="w-full flex items-center justify-center gap-3 py-5 bg-gray-900 text-white rounded-md font-bold text-sm tracking-widest hover:bg-[var(--color-primary)] transition-all shadow-xl shadow-gray-200 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPlacingOrder ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        PLACING ORDER...
                                    </>
                                ) : (
                                    <>
                                        CONFIRM ORDER
                                        <FiLock className="group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-gray-400 text-center mt-6 font-bold uppercase tracking-widest leading-relaxed">
                                By placing order, you agree to our <br />Terms & Conditions
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;