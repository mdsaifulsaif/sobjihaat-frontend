"use client";

import React from "react";
import {
  FiX,
  FiMapPin,
  FiPhone,
  FiPackage,
  FiTruck,
  FiUser,
  FiDollarSign,
  FiCheck,
  FiClock,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";
import { useGetOrderDetailsQuery } from "@/redux/api/orderApi";
import { getAreaLabel } from "../../../../../types/rider-order.types";

const BRAND = "var(--color-primary, #5CAF90)";

interface Props {
  orderId: string;
  onClose: () => void;
  onAccept?: (orderId: string) => void;
  isAccepting?: boolean;
  isOnline?: boolean;
}

const statusBadge = (status?: string) => {
  const map: Record<string, { label: string; bg: string; text: string }> = {
    pending: { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-700" },
    confirmed: { label: "Confirmed", bg: "bg-blue-50", text: "text-blue-700" },
    processing: { label: "Processing", bg: "bg-blue-50", text: "text-blue-700" },
    shipped: { label: "Shipped", bg: "bg-purple-50", text: "text-purple-700" },
    out_for_delivery: { label: "Out for Delivery", bg: "bg-purple-50", text: "text-purple-700" },
    delivered: { label: "Delivered", bg: "bg-green-50", text: "text-green-700" },
    cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-red-700" },
    returned: { label: "Returned", bg: "bg-orange-50", text: "text-orange-700" },
  };
  const s = map[status || ""] || { label: status || "N/A", bg: "bg-gray-100", text: "text-gray-700" };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
};

export default function RiderOrderDetailsModal({
  orderId,
  onClose,
  onAccept,
  isAccepting,
  isOnline = true,
}: Props) {
  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const order = data?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                Order #{order?.orderNumber || "..."}
              </h2>
              {order?.status && statusBadge(order.status)}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Type: <span className="font-semibold uppercase">{order?.deliveryType || "Local"}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <div
                className="w-9 h-9 border-4 border-gray-200 rounded-full animate-spin"
                style={{ borderTopColor: BRAND }}
              />
              <p className="text-xs text-gray-400 font-medium">অর্ডার লোড হচ্ছে...</p>
            </div>
          ) : error || !order ? (
            <div className="py-12 text-center text-red-500">
              <FiAlertCircle size={36} className="mx-auto mb-2 text-red-400" />
              <p className="font-semibold">অর্ডার ডিটেইলস লোড করতে ব্যর্থ হয়েছে</p>
            </div>
          ) : (
            <>
              {/* Earning Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                    আপনার রাইডার কমিশন (Rider Earning)
                  </span>
                  <span className="text-2xl font-black text-emerald-700">
                    ৳{order.riderCommission ?? 0}
                  </span>
                  {order.commissionPercentage && (
                    <span className="text-xs text-emerald-600 ml-2 font-medium">
                      ({order.commissionPercentage}% commission)
                    </span>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <FiDollarSign size={24} />
                </div>
              </div>

              {/* Customer & Delivery Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <FiUser size={13} /> কাস্টমার তথ্য
                  </h3>
                  <p className="font-bold text-gray-900">{order.deliveryAddress?.name || "N/A"}</p>
                  <a
                    href={`tel:${order.deliveryAddress?.phone}`}
                    className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-xs mt-2 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <FiPhone size={13} /> Call {order.deliveryAddress?.phone}
                  </a>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <FiMapPin size={13} /> ডেলিভারি ঠিকানা
                  </h3>
                  <p className="font-semibold text-gray-800 text-xs leading-relaxed">
                    {[
                      order.deliveryAddress?.houseNo && `House: ${order.deliveryAddress.houseNo}`,
                      order.deliveryAddress?.road && `Road: ${order.deliveryAddress.road}`,
                      order.deliveryAddress?.flatNo && `Flat: ${order.deliveryAddress.flatNo}`,
                      getAreaLabel(order.deliveryAddress),
                    ]
                      .filter(Boolean)
                      .join(", ") || "ঠিকানা দেওয়া নেই"}
                  </p>
                  {order.deliveryAddress?.deliveryNotes && (
                    <p className="text-xs text-gray-500 mt-2 bg-white p-2 rounded border border-gray-100">
                      <span className="font-semibold">নোট:</span> {order.deliveryAddress.deliveryNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <FiPackage size={13} /> অর্ডারের পণ্যসমূহ ({order.items?.length || 0} টি)
                </h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-gray-800">{item.productName}</p>
                        {item.variantName && (
                          <p className="text-gray-400 text-[11px]">{item.variantName}</p>
                        )}
                        <p className="text-gray-500 mt-0.5">
                          ৳{item.price} x {item.quantity} {item.unit || ""}
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">
                        ৳{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>সাবটোটাল</span>
                  <span>৳{order.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ডেলিভারি চার্জ</span>
                  <span>৳{order.shippingCharge?.toLocaleString()}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>ডিসকাউন্ট</span>
                    <span>-৳{order.discountAmount?.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-gray-900">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-base font-black">৳{order.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 text-xs">
                  <span className="text-gray-500 font-medium">পেমেন্ট মেথড:</span>
                  <span className="font-bold uppercase text-gray-700">
                    {order.paymentMethod === "cod" ? "Cash On Delivery (ক্যাশ অন ডেলিভারি)" : order.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">পেমেন্ট স্ট্যাটাস:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus === "paid" ? "Paid (পরিশোধিত)" : "Unpaid (বাকি)"}
                  </span>
                </div>
              </div>

              {/* Special Instructions */}
              {order.specialInstructions && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
                  <FiFileText size={15} className="mt-0.5 flex-shrink-0 text-amber-600" />
                  <div>
                    <span className="font-bold">বিশেষ নির্দেশনা: </span>
                    {order.specialInstructions}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/70 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors"
          >
            বন্ধ করুন (Close)
          </button>

          {/* If unassigned and onAccept passed */}
          {onAccept && order && !order.assignedRider && (
            <button
              onClick={() => onAccept(order._id)}
              disabled={isAccepting || !isOnline}
              className="flex items-center gap-1.5 px-4 py-2 text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50"
              style={{ backgroundColor: BRAND }}
            >
              <FiCheck size={14} />
              {isAccepting ? "অ্যাকসেপ্ট হচ্ছে..." : "অর্ডার অ্যাকসেপ্ট করুন (Accept Order)"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
