"use client";

import React, { useMemo } from 'react';
import { FiTrash2, FiShoppingBag, FiInfo, FiChevronsRight } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux';
import { useGetShippingConfigQuery } from '@/redux/api/shippingApi';
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    closeMiniCart
} from '@/redux/slices/cartSlice';
import Link from 'next/link';
import Image from 'next/image';

const MiniCart = () => {
    const dispatch = useAppDispatch();
    const { items, totalPrice, isMiniCartOpen } = useAppSelector(state => state.cart);
    const { data: shippingConfigData } = useGetShippingConfigQuery("local");

    const freeDeliveryThreshold = useMemo(() => {
        const tiers = shippingConfigData?.data?.tiers;
        if (tiers && Array.isArray(tiers) && tiers.length > 0) {
            const freeTier = tiers.find((t) => Number(t.charge) === 0);
            if (freeTier && freeTier.min !== undefined && Number(freeTier.min) > 0) {
                return Number(freeTier.min);
            }
        }
        return 5000;
    }, [shippingConfigData]);

    const isFreeShippingUnlocked = totalPrice >= freeDeliveryThreshold;

    if (!isMiniCartOpen) return null;

    return (
        <>
            {/* Mobile backdrop */}
            <div
                className="md:hidden fixed inset-0 bg-black/40 z-40"
                onClick={() => dispatch(closeMiniCart())}
            />

            {/* ✅ Desktop: top-0 right-0, Mobile: bottom sheet */}
            <div className="
                fixed z-50 flex flex-col shadow-2xl bg-white

                top-0 right-0 h-screen w-[340px]

                max-md:top-auto max-md:bottom-0 max-md:left-0 max-md:right-0
                max-md:h-[85vh] max-md:w-full max-md:rounded-t-2xl
            ">

                {/* Top bar */}
                <div className="px-4 py-2 text-xs font-medium text-center bg-gray-800 text-white max-md:rounded-t-2xl">
                    Delivery charge not included
                </div>

                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <FiShoppingBag size={18} className="text-[var(--color-primary)]" />
                        <div>
                            <p className="font-bold text-sm text-gray-800">
                                {items.length} Items
                            </p>
                            <p className="text-xs flex items-center gap-1 font-medium text-[var(--color-primary)]">
                                {isFreeShippingUnlocked ? (
                                    <>
                                        <span>Shipping: FREE</span>
                                        <FiInfo size={12} />
                                    </>
                                ) : (
                                    <>
                                        <span>Free shipping at ৳{freeDeliveryThreshold.toLocaleString()}</span>
                                        <FiInfo size={12} />
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => dispatch(closeMiniCart())}
                        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500"
                        aria-label="Collapse cart"
                    >
                        <FiChevronsRight size={20} />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                            <FiShoppingBag size={40} />
                            <p className="text-sm">Your cart is empty</p>
                        </div>
                    ) : (
                        items.map((item) => {
                            const itemImage = item.thumbnail || item.image;
                            return (
                                <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">

                                    {/* Image */}
                                    <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                        {itemImage ? (
                                            <Image
                                                src={itemImage}
                                                alt={item.name || 'Product'}
                                                fill
                                                sizes="56px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FiShoppingBag size={20} className="text-gray-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold leading-snug line-clamp-1 text-gray-800" title={item.name}>
                                            {item.name}
                                        </p>

                                        {/* Price & Quantity in one row */}
                                        <div className="flex items-center justify-between gap-2 mt-2">
                                            <div className="flex items-baseline gap-1.5 min-w-0">
                                                <span className="text-sm font-bold text-[var(--color-primary)]">
                                                    ৳{item.price}
                                                </span>
                                                {item.mrp > item.price && (
                                                    <span className="text-xs line-through text-gray-400">
                                                        ৳{item.mrp}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <div className="flex items-center border border-gray-200 rounded-full text-xs bg-white shadow-2xs">
                                                    <button
                                                        onClick={() => dispatch(decreaseQuantity(item.id))}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-600 font-bold cursor-pointer"
                                                        aria-label="Decrease quantity"
                                                    >−</button>
                                                    <span className="px-1.5 font-semibold text-gray-800 min-w-[20px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => dispatch(increaseQuantity(item.id))}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-600 font-bold cursor-pointer"
                                                        aria-label="Increase quantity"
                                                    >+</button>
                                                </div>
                                                <button
                                                    onClick={() => dispatch(removeFromCart(item.id))}
                                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                                    aria-label="Remove item"
                                                    title="Remove item"
                                                >
                                                    <FiTrash2 size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100">
                    <button className="w-full py-2.5 text-xs flex items-center justify-center gap-1 text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100">
                        ⌃ Enter special code
                    </button>
                    <Link
                        href="/checkout"
                        onClick={() => dispatch(closeMiniCart())}
                        className="w-full py-4 font-semibold text-base flex items-center justify-between px-5 bg-[var(--color-primary)] text-white hover:opacity-95 transition-opacity"
                    >
                        <span>Proceed to Checkout</span>
                        <span>৳{totalPrice}</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MiniCart;