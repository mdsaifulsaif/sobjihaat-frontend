

"use client";

import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux';
import { openMiniCart } from '@/redux/slices/cartSlice';

const FloatingCartButton = () => {
    const dispatch = useAppDispatch();
    const { totalPrice, items, isMiniCartOpen } = useAppSelector((state) => state.cart);

    if (isMiniCartOpen) return null;

    return (
        <>
            {/*  Desktop — right side floating button */}
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

            {/* ✅ Mobile — bottom bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center bg-white border-t border-gray-100 shadow-lg px-4 py-2 gap-3">
                {/* Left icon button */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex-shrink-0">
                    <FiShoppingBag size={18} />
                </button>

                {/* Place Order button */}
                <button
                    onClick={() => dispatch(openMiniCart())}
                    className="flex-1 py-3 bg-[var(--color-primary)] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    Place Order
                </button>

                {/* Right cart icon with badge */}
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