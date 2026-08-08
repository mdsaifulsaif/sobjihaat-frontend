


// "use client";

// import React, { useState, useEffect } from 'react';
// import { FiShoppingBag } from 'react-icons/fi';
// import { useAppDispatch, useAppSelector } from '@/redux';
// import { openMiniCart } from '@/redux/slices/cartSlice';

// const FloatingCartButton = () => {
//     const dispatch = useAppDispatch();
//     const { totalPrice, items, isMiniCartOpen } = useAppSelector((state) => state.cart);

//     // ✅ Hydration fix - প্রথম render এ (server + client দুই জায়গাতেই) false থাকবে
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     // ✅ mount না হওয়া পর্যন্ত কিছুই render করব না (server এর সাথে মিলে যাবে)
//     if (!mounted) return null;

//     if (isMiniCartOpen) return null;

//     return (
//         <>
//             {/* Desktop — right side floating button */}
//             <button
//                 onClick={() => dispatch(openMiniCart())}
//                 className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-0 z-50 bg-[var(--color-primary)] text-white shadow-2xl rounded-l-2xl flex-col items-center justify-center gap-1 transition-all active:scale-95 w-20 py-4"
//             >
//                 <FiShoppingBag size={26} />
//                 <p className="text-xs font-medium leading-tight">
//                     {items.length} Item{items.length !== 1 ? 's' : ''}
//                 </p>
//                 <p className="font-bold text-sm leading-tight">৳{totalPrice.toLocaleString()}</p>
//             </button>

//             {/* ✅ Mobile — bottom bar */}
//             <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center bg-white border-t border-gray-100 shadow-lg px-4 py-2 gap-3">
//                 <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex-shrink-0">
//                     <FiShoppingBag size={18} />
//                 </button>

//                 <button
//                     onClick={() => dispatch(openMiniCart())}
//                     className="flex-1 py-3 bg-[var(--color-primary)] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-2 active:scale-95 transition-all"
//                 >
//                     Place Order
//                 </button>

//                 <button
//                     onClick={() => dispatch(openMiniCart())}
//                     className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex-shrink-0"
//                 >
//                     <FiShoppingBag size={18} className="text-[var(--color-primary)]" />
//                     {items.length > 0 && (
//                         <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
//                             {items.length}
//                         </span>
//                     )}
//                 </button>
//             </div>
//         </>
//     );
// };

// export default FloatingCartButton;








"use client";

import React, { useState, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux';
import { openMiniCart } from '@/redux/slices/cartSlice';

// ✅ আপনার আসল WhatsApp business নাম্বার দিয়ে replace করুন (দেশের কোড সহ, + বা 00 ছাড়া)
const WHATSAPP_NUMBER = '8801XXXXXXXXX';
const WHATSAPP_MESSAGE = 'হ্যালো, আমি একটি অর্ডার নিয়ে জানতে চাচ্ছি।';

const FloatingCartButton = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const { totalPrice, items, isMiniCartOpen, placingOrder } = useAppSelector((state) => state.cart);

    const isCheckoutPage = pathname === '/checkout';

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (isMiniCartOpen) return null;

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {/* Desktop — checkout page-এ hide */}
            {!isCheckoutPage && (
                <button
                    onClick={() => dispatch(openMiniCart())}
                    className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-0 z-50 bg-[var(--color-primary)] text-white shadow-2xl rounded-l-2xl flex-col items-center justify-center gap-1 transition-all active:scale-95 w-20 py-4"
                >
                    <FiShoppingBag size={26} />
                    <p className="text-xs font-medium leading-tight">
                        {items.length} Item{items.length !== 1 ? 's' : ''}
                    </p>
                    <p className="font-bold text-sm leading-tight">৳{totalPrice.toLocaleString()}</p>
                </button>
            )}

            {/* Mobile — bottom bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center bg-white border-t border-gray-100 shadow-lg px-4 py-2 gap-3">

                {/* ✅ Left icon — এখন WhatsApp direct message বাটন */}
                <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600 hover:bg-green-100 active:scale-95 transition-all flex-shrink-0"
                    aria-label="WhatsApp এ মেসেজ করুন"
                >
                    <FaWhatsapp size={20} />
                </button>

                {isCheckoutPage ? (
                    // ✅ checkout page → form submit করবে, লেখা "Confirm Order"
                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={placingOrder}
                        className="flex-1 py-3 bg-[var(--color-primary)] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {placingOrder ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Confirming...
                            </>
                        ) : (
                            'Confirm Order'
                        )}
                    </button>
                ) : (
                    // ✅ initial state (cart-এ) → লেখা "Order Now"
                    <button
                        onClick={() => dispatch(openMiniCart())}
                        className="flex-1 py-3 bg-[var(--color-primary)] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        Order Now
                    </button>
                )}

                <button
                    onClick={() => dispatch(openMiniCart())}
                    className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex-shrink-0"
                >
                    <FiShoppingBag size={18} className="text-[var(--color-primary)]" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {items.length}
                        </span>
                    )}
                </button>
            </div>
        </>
    );
};

export default FloatingCartButton;