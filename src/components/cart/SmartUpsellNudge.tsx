"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { FiTrendingUp, FiCheckCircle, FiTag, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useGetAvailableCouponsQuery } from "@/redux/api/couponApi";

interface SmartUpsellNudgeProps {
  currentSubtotal: number;
  onApplyCoupon?: (code: string) => void;
  appliedCouponCode?: string;
  freeShippingThreshold?: number; // e.g. 800 Tk
}

export default function SmartUpsellNudge({
  currentSubtotal,
  onApplyCoupon,
  appliedCouponCode,
  freeShippingThreshold = 800,
}: SmartUpsellNudgeProps) {
  const { data: couponsData } = useGetAvailableCouponsQuery();
  const availableCoupons = couponsData?.data || [];

  // Determine the best upcoming or unlocked deal
  const nudgeDeal = useMemo(() => {
    if (currentSubtotal <= 0) return null;

    // Filter coupons that have a minPurchase
    const validCoupons = availableCoupons
      .filter((c: any) => c.isActive !== false && c.minPurchase > 0)
      .sort((a: any, b: any) => a.minPurchase - b.minPurchase);

    // 1. Check if there's a coupon the user is close to unlocking (subtotal < minPurchase)
    const upcomingCoupon = validCoupons.find((c: any) => currentSubtotal < c.minPurchase);

    if (upcomingCoupon) {
      const remaining = Math.round(upcomingCoupon.minPurchase - currentSubtotal);
      const progressPercent = Math.min(
        100,
        Math.round((currentSubtotal / upcomingCoupon.minPurchase) * 100)
      );

      const discountLabel =
        upcomingCoupon.discountType === "percentage"
          ? `${upcomingCoupon.discountValue}% OFF`
          : `৳${upcomingCoupon.discountValue} OFF`;

      return {
        type: "upcoming" as const,
        code: upcomingCoupon.code,
        remaining,
        progressPercent,
        discountLabel,
        targetAmount: upcomingCoupon.minPurchase,
        message: `Add ৳${remaining.toLocaleString()} more to unlock ${discountLabel} with ${upcomingCoupon.code}!`,
      };
    }

    // 2. Check if a coupon is already unlocked but not yet applied
    const unlockedCoupon = validCoupons
      .filter((c: any) => currentSubtotal >= c.minPurchase)
      .reverse()
      .find((c: any) => !appliedCouponCode || appliedCouponCode.toUpperCase() !== c.code.toUpperCase());

    if (unlockedCoupon && !appliedCouponCode) {
      const discountLabel =
        unlockedCoupon.discountType === "percentage"
          ? `${unlockedCoupon.discountValue}% OFF`
          : `৳${unlockedCoupon.discountValue} OFF`;

      return {
        type: "unlocked" as const,
        code: unlockedCoupon.code,
        discountLabel,
        message: `🎉 You unlocked ${discountLabel}! Apply coupon ${unlockedCoupon.code} to save.`,
      };
    }

    // 3. Free Shipping threshold nudge
    if (freeShippingThreshold > 0 && currentSubtotal < freeShippingThreshold) {
      const remaining = Math.round(freeShippingThreshold - currentSubtotal);
      const progressPercent = Math.min(
        100,
        Math.round((currentSubtotal / freeShippingThreshold) * 100)
      );

      return {
        type: "shipping" as const,
        remaining,
        progressPercent,
        message: `Add ৳${remaining.toLocaleString()} more to get FREE Delivery!`,
      };
    }

    return null;
  }, [currentSubtotal, availableCoupons, appliedCouponCode, freeShippingThreshold]);

  if (!nudgeDeal) return null;

  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 border border-emerald-200/80 rounded-2xl p-4 shadow-xs transition-all animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#5CAF90]/15 text-[#5CAF90] flex items-center justify-center shrink-0">
            {nudgeDeal.type === "unlocked" ? (
              <FiCheckCircle size={18} className="text-[#5CAF90]" />
            ) : (
              <FiTrendingUp size={18} className="text-[#5CAF90]" />
            )}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
              {nudgeDeal.message}
            </p>
            {nudgeDeal.type !== "unlocked" && (
              <div className="flex items-center gap-2 mt-1.5 w-48 sm:w-64">
                <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5CAF90] rounded-full transition-all duration-500"
                    style={{ width: `${nudgeDeal.progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-500 font-mono">
                  {nudgeDeal.progressPercent}%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          {nudgeDeal.type === "unlocked" && onApplyCoupon ? (
            <button
              type="button"
              onClick={() => onApplyCoupon(nudgeDeal.code)}
              className="px-4 py-2 bg-[#5CAF90] hover:bg-[#4A9A7D] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
            >
              <FiTag size={13} />
              Apply {nudgeDeal.code}
            </button>
          ) : (
            <Link
              href="/"
              className="px-3.5 py-1.5 bg-white border border-emerald-200 hover:border-emerald-300 text-gray-800 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 hover:text-[#5CAF90] shrink-0"
            >
              Add Items <FiArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
