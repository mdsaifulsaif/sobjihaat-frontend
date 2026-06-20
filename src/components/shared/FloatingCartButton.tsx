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
        <button
            onClick={() => dispatch(openMiniCart())}
            className="fixed top-1/2 -translate-y-1/2 right-0 z-50 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]  text-white shadow-2xl rounded-l-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 w-20 py-4"
        >
            <FiShoppingBag size={26} />
            <p className="text-xs font-medium leading-tight">
                {items.length} Item{items.length !== 1 ? 's' : ''}
            </p>
            <p className="font-bold text-sm leading-tight">৳{totalPrice.toLocaleString()}</p>
        </button>
    );
};

export default FloatingCartButton;