
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetMyOrdersQuery } from '@/redux/api/orderApi';
import { format } from 'date-fns';
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiEye,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiCreditCard,
} from 'react-icons/fi';

const statusTabs = [
  { key: 'all', label: 'All Orders' },
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

const MyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { data, isLoading, isFetching, refetch } = useGetMyOrdersQuery({
    page,
    limit,
    status: activeTab === 'all' ? undefined : activeTab,
  });

  const orders = data?.data?.orders || [];
  const totalOrders = data?.data?.total || 0;
  const totalPages = Math.ceil(totalOrders / limit);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
      processing: 'bg-purple-100 text-purple-700 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      out_for_delivery: 'bg-orange-100 text-orange-700 border-orange-200',
      delivered: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      returned: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <FiClock size={14} />;
      case 'delivered': return <FiCheckCircle size={14} />;
      case 'cancelled': return <FiXCircle size={14} />;
      case 'out_for_delivery':
      case 'shipped': return <FiTruck size={14} />;
      default: return <FiPackage size={14} />;
    }
  };

  const getPaymentBadge = (method: string) => {
    const colors: Record<string, string> = {
      cod: 'bg-green-50 text-green-700 border-green-200',
      bkash: 'bg-pink-50 text-pink-700 border-pink-200',
      nagad: 'bg-orange-50 text-orange-700 border-orange-200',
      online: 'bg-blue-50 text-blue-700 border-blue-200',
      bank: 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return colors[method] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">My Orders</h1>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-5 w-24 bg-gray-200 rounded" />
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                  <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                  <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
              My Orders
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              {totalOrders} {totalOrders === 1 ? 'order' : 'orders'} total
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <FiRefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-gray-200 shadow-sm mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {statusTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <FiPackage size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">No Orders Found</h3>
            <p className="text-[var(--color-text-muted)] mt-1">
              {activeTab === 'all' 
                ? "You haven't placed any orders yet." 
                : `No ${activeTab} orders found.`}
            </p>
            {activeTab !== 'all' && (
              <button
                onClick={() => setActiveTab('all')}
                className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white rounded-xl text-sm font-medium hover:bg-[#4A9A7D] transition-colors"
              >
                View All Orders
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-[var(--color-primary)]">
                        #{order.orderNumber || order._id?.slice(-8)?.toUpperCase()}
                      </p>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {format(new Date(order.createdAt), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status?.replace('_', ' ') || 'Pending'}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getPaymentBadge(order.paymentMethod)}`}>
                        <span className="flex items-center gap-1.5">
                          <FiCreditCard size={12} />
                          {order.paymentMethod?.toUpperCase() || 'COD'}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--color-text-muted)]">Total</p>
                    <p className="text-lg font-bold text-[var(--color-text-primary)]">
                      ৳{order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Order Items Images */}
                <div className="flex gap-2 mt-4">
                  {order.items?.slice(0, 4).map((item: any, i: number) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-xl border border-gray-200 overflow-hidden bg-[var(--color-surface)] flex-shrink-0"
                    >
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.productName}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <FiPackage size={20} />
                        </div>
                      )}
                    </div>
                  ))}
                  {order.items?.length > 4 && (
                    <div className="w-14 h-14 rounded-xl border border-gray-200 bg-[var(--color-surface)] flex items-center justify-center text-sm font-medium text-[var(--color-text-muted)]">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                {/* Order Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <FiMapPin size={14} />
                      {order.deliveryAddress?.city || 'N/A'}
                    </span>
                    <span className="hidden sm:block text-gray-300">|</span>
                    <span>{order.items?.length || 0} items</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/my-orders/${order._id}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl text-sm font-medium hover:bg-[#4A9A7D] transition-colors"
                    >
                      <FiEye size={16} />
                      Details
                    </Link>
                    {order.status === 'delivered' && (
                      <button className="flex items-center gap-1.5 px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl text-sm font-medium hover:bg-[var(--color-primary)]/5 transition-colors">
                        Order Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;