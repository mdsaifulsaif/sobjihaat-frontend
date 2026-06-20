"use client";

import React from 'react';
import { FiTrash2, FiShoppingBag, FiInfo, FiChevronsRight } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux';
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    closeMiniCart
} from '@/redux/slices/cartSlice';
import Link from 'next/link';

const MiniCart = () => {
    const dispatch = useAppDispatch();
    const { items, totalPrice, isMiniCartOpen } = useAppSelector(state => state.cart);

    if (!isMiniCartOpen) return null;

    // No overlay, no outside-click-to-close.
    // Closes ONLY when the user clicks the collapse (>>) button.
    // Main page stays fully clickable/scrollable while this is open.
    return (
        <div
            className="fixed top-0 right-0 h-screen w-[340px] z-50 flex flex-col shadow-2xl"
            style={{ background: 'var(--color-background)' }}
        >
            {/* Top bar */}
            <div
                className="px-4 py-2 text-xs font-medium"
                style={{ background: 'var(--color-text-secondary)', color: 'var(--color-background)' }}
            >
                Delivery charge not needed
            </div>

            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                    <FiShoppingBag size={18} style={{ color: 'var(--color-primary)' }} />
                    <div>
                        <p className="font-bold text-sm italic" style={{ color: 'var(--color-text-primary)' }}>
                            {items.length} item{items.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                            Discounted Shipping Fee: ৳0
                            <FiInfo size={12} />
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => dispatch(closeMiniCart())}
                    className="p-1 rounded transition-colors"
                    style={{ color: 'var(--color-primary)' }}
                    aria-label="Collapse cart"
                >
                    <FiChevronsRight size={20} />
                </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                    <p className="text-center py-10 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Your cart is empty
                    </p>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 px-4 py-3 border-b">
                            <div className="w-10 h-10 relative flex-shrink-0 rounded overflow-hidden border" style={{ background: 'var(--color-surface)' }}>
                                {/* product image here */}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm leading-snug line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
                                    {item.name}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                <div
                                    className="flex items-center border rounded-full text-xs"
                                    style={{ borderColor: 'var(--color-text-muted)' }}
                                >
                                    <button
                                        onClick={() => dispatch(decreaseQuantity(item.id))}
                                        className="w-6 h-6 flex items-center justify-center hover:opacity-70"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        −
                                    </button>
                                    <span className="px-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => dispatch(increaseQuantity(item.id))}
                                        className="w-6 h-6 flex items-center justify-center hover:opacity-70"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-bold" style={{ color: 'var(--color-error)' }}>
                                        ৳{item.price}
                                    </span>
                                    {item.mrp > item.price && (
                                        <span className="text-xs line-through" style={{ color: 'var(--color-text-muted)' }}>
                                            ৳{item.mrp}
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="text-xs flex items-center gap-1 hover:opacity-70"
                                    style={{ color: 'var(--color-error)' }}
                                >
                                    <FiTrash2 size={11} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="border-t">
                <button
                    className="w-full py-3 text-xs flex items-center justify-center gap-1"
                    style={{ color: 'var(--color-text-secondary)', background: 'var(--color-surface)' }}
                >
                    ⌃ Enter special code
                </button>
                <Link href="/cart" onClick={() => dispatch(closeMiniCart())}>
                    <button
                        className="w-full py-4 font-semibold text-base flex items-center justify-between px-5"
                        style={{ background: 'var(--color-primary)', color: 'var(--color-background)' }}
                    >
                        <span>Checkout</span>
                        <span>৳{totalPrice.toLocaleString()}</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MiniCart;