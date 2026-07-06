'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetMyOrderByIdQuery } from '@/redux/api/orderApi';
import { format } from 'date-fns';
import {
  FiArrowLeft, FiRefreshCw, FiMapPin, FiPhone,
  FiPackage, FiClock, FiCheckCircle, FiTruck,
  FiShoppingBag, FiAlertCircle
} from 'react-icons/fi';

const statusSteps = [
  { key: 'pending', label: 'Order Confirmed', icon: <FiCheckCircle size={16} /> },
  { key: 'confirmed', label: 'Packed', icon: <FiPackage size={16} /> },
  { key: 'processing', label: 'Shipped', icon: <FiTruck size={16} /> },
  { key: 'shipped', label: 'Out for Delivery', icon: <FiShoppingBag size={16} /> },
  { key: 'delivered', label: 'Delivered', icon: <FiCheckCircle size={16} /> },
];

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  processing: 'bg-purple-100 text-purple-700 border-purple-200',
  shipped: 'bg-orange-100 text-orange-700 border-orange-200',
  out_for_delivery: 'bg-orange-100 text-orange-700 border-orange-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-600 border-red-200',
  returned: 'bg-gray-100 text-gray-600 border-gray-200',
};

const paymentStatusColor: Record<string, string> = {
  unpaid: 'text-red-500',
  paid: 'text-[var(--color-primary)]',
  refunded: 'text-blue-500',
  partially_paid: 'text-yellow-600',
};

const OrderDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetMyOrderByIdQuery(id as string);
  const order = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
          <p className="text-sm text-[var(--color-text-muted)]">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle size={40} className="text-[var(--color-error)] mx-auto mb-3" />
          <p className="text-[var(--color-text-primary)] font-semibold">Order not found</p>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(s => s.key === order.status);
  const timeline = order.statusTimeline || [];
  const progressPct = currentStatusIndex < 0 ? 0 : (currentStatusIndex / (statusSteps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24">
      <div className="container mx-auto px-4 pt-6 space-y-4">

        {/* ── Header ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors flex-shrink-0"
              >
                <FiArrowLeft size={16} className="text-[var(--color-text-secondary)]" />
              </button>
              <div>
                <h1 className="text-base font-bold text-[var(--color-text-primary)]">Order Details</h1>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5 font-mono">#{order.orderNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Status badge */}
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border capitalize ${statusColor[order.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                {order.status.replace('_', ' ')}
              </span>
              <button className="flex items-center gap-1.5 bg-[var(--color-primary)] text-white px-3 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                <FiRefreshCw size={12} />
                Reorder
              </button>
            </div>
          </div>

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <FiClock size={12} />
              Placed {order.createdAt ? format(new Date(order.createdAt), 'dd MMM yyyy, h:mm a') : '—'}
            </span>
            <span className="flex items-center gap-1.5">
              <FiPackage size={12} />
              {order.items.length} item{order.items.length > 1 ? 's' : ''}
            </span>
            <span className={`flex items-center gap-1.5 font-semibold ${paymentStatusColor[order.paymentStatus] || ''}`}>
              {order.paymentStatus === 'paid' ? '✓' : '○'} {order.paymentStatus.replace('_', ' ')} • {order.paymentMethod?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Track Order ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-6">Track Order</h3>

          {/* Steps */}
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-[3px] bg-gray-100 rounded-full mx-5">
              <div
                className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-700"
                style={{ width: order.status === 'cancelled' ? '0%' : `${progressPct}%` }}
              />
            </div>

            <div className="relative flex justify-between">
              {statusSteps.map((step, idx) => {
                const isCompleted = idx < currentStatusIndex;
                const isActive = idx === currentStatusIndex;
                const isPending = idx > currentStatusIndex;

                const timelineEntry = timeline.find((t: any) => t.status === step.key);

                return (
                  <div key={step.key} className="flex flex-col items-center text-center z-10 flex-1">
                    {/* Icon circle */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all ${
                      isCompleted
                        ? 'bg-[var(--color-primary)] text-white'
                        : isActive
                          ? 'bg-[var(--color-primary)] text-white ring-4 ring-[var(--color-primary)]/20'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.icon}
                    </div>

                    {/* Label */}
                    <p className={`text-[10px] font-semibold mt-2 leading-tight ${
                      isCompleted || isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'
                    }`}>
                      {step.label}
                    </p>

                    {/* Time */}
                    <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5 font-mono">
                      {timelineEntry?.changedAt
                        ? format(new Date(timelineEntry.changedAt), 'dd MMM, h:mm a')
                        : isPending ? '—' : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cancelled notice */}
          {order.status === 'cancelled' && (
            <div className="mt-5 flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-xl">
              <FiAlertCircle size={16} className="text-[var(--color-error)] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[var(--color-error)]">Order Cancelled</p>
                {order.cancelReason && (
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{order.cancelReason}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Order Items ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Order Items</h3>
            <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full">
              {order.items.length} items
            </span>
          </div>

          <div className="space-y-3">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-xl">
                <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.productName}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-1">{item.productName}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {item.weightOrVolume && `${item.weightOrVolume} ${item.unit} • `}
                    Qty: {item.quantity}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    ৳{item.salePrice || item.unitPrice} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold text-[var(--color-text-primary)] flex-shrink-0">
                  ৳{item.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Summary + Address ── */}
        <div className="grid sm:grid-cols-2 gap-4">

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4">Order Summary</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Subtotal</span>
                <span className="font-semibold text-[var(--color-text-primary)]">৳{order.subtotal}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">Discount</span>
                  <span className="font-semibold text-green-600">-৳{order.discountAmount}</span>
                </div>
              )}
              {order.couponCode && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">Coupon ({order.couponCode})</span>
                  <span className="font-semibold text-green-600">-৳{order.couponDiscount || 0}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Delivery charge</span>
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {order.shippingCharge === 0 ? (
                    <span className="text-[var(--color-primary)] font-bold">FREE</span>
                  ) : `৳${order.shippingCharge}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="text-sm font-bold text-[var(--color-text-primary)]">Total Paid</span>
                <span className="text-lg font-black text-[var(--color-text-primary)]">৳{order.totalAmount}</span>
              </div>

              {/* Payment method badge */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-gray-100">
                  💳 {order.paymentMethod?.toUpperCase()} •
                  <span className={`capitalize font-bold ${paymentStatusColor[order.paymentStatus]}`}>
                    {order.paymentStatus.replace('_', ' ')}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4">Delivery Address</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMapPin size={13} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">{order.deliveryAddress.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">
                    {[
                      order.deliveryAddress.houseNo && `House ${order.deliveryAddress.houseNo}`,
                      order.deliveryAddress.road && `Road ${order.deliveryAddress.road}`,
                      order.deliveryAddress.city,
                    ].filter(Boolean).join(', ')}
                  </p>
                  {order.deliveryAddress.deliveryNotes && (
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-1 italic">
                      Note: {order.deliveryAddress.deliveryNotes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <FiPhone size={13} className="text-[var(--color-primary)]" />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] font-medium">{order.deliveryAddress.phone}</p>
              </div>

              {/* Delivery type badge */}
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-gray-100">
                  <FiTruck size={11} className="text-[var(--color-primary)]" />
                  {order.deliveryType === 'local' ? 'Local Delivery' : 'Nationwide Delivery'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Special Instructions (if any) ── */}
        {order.specialInstructions && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Special Instructions</h3>
            <p className="text-sm text-[var(--color-text-muted)] italic">"{order.specialInstructions}"</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderDetailsPage;