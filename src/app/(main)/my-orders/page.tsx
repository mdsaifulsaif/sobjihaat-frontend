'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGetMyOrdersQuery } from '@/redux/api/orderApi';
import { format } from 'date-fns';

const statusTabs = [
  { key: 'all', label: 'All Orders' },
  { key: 'processing', label: 'Processing' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

const MyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [page] = useState(1);

  const { data, isLoading } = useGetMyOrdersQuery({
    page,
    limit: 10,
    status: activeTab === 'all' ? undefined : activeTab,
  });

  const orders = data?.data?.orders || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {/* Status Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 mb-6 shadow-sm">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-[var(--color-primary)] text-white shadow'
                  : 'hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            আপনার এখনো কোনো অর্ডার নেই।
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Link
                key={order._id}
                href={`/my-orders/${order._id}`}
                className="block bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                    <p className="font-medium mt-0.5">{order.items.length} items</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="flex gap-3 mt-4">
                  {order.items.slice(0, 3).map((item: any, i: number) => (
                    <img
                      key={i}
                      src={item.thumbnail}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total: </span>
                    <span className="font-bold">৳{order.totalAmount}</span>
                  </div>
                  <span className="text-[var(--color-primary)] font-medium flex items-center gap-1">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;