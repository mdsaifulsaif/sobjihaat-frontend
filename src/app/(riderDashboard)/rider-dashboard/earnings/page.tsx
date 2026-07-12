// app/dashboard/rider/earnings/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import {
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowRight,
  FiRefreshCw,
} from 'react-icons/fi';
import { useGetMyRiderProfileQuery } from '@/redux/api/riderApi';
import { useGetMonthlyPayoutSummaryQuery } from '@/redux/api/payoutApi';


const Earnings = () => {
  // ✅ Fix: Pass empty object {} as argument
  const { data: profileData, refetch: refetchProfile } = useGetMyRiderProfileQuery({});
  const { data: earningsData, isLoading, refetch: refetchEarnings } = useGetMonthlyPayoutSummaryQuery({});

  const profile = profileData?.data;
  const earnings = earningsData?.data;

  const handleRefresh = () => {
    refetchProfile();
    refetchEarnings();
  };

  const summaryCards = [
    {
      title: 'Total Earnings',
      value: `৳${profile?.totalEarnings || 0}`,
      icon: FiDollarSign,
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.15)',
    },
    {
      title: 'Pending Payout',
      value: `৳${profile?.pendingPayout || 0}`,
      icon: FiClock,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.15)',
    },
    {
      title: 'Total Paid',
      value: `৳${(profile?.totalEarnings || 0) - (profile?.pendingPayout || 0)}`,
      icon: FiCheckCircle,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'Total Deliveries',
      value: profile?.totalDeliveries || 0,
      icon: FiTrendingUp,
      color: '#EC4899',
      bgColor: 'rgba(236, 72, 153, 0.15)',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5CAF90]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Earnings</h1>
          <p className="text-gray-500 mt-1">Track your earnings and payouts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <FiRefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <Link
            href="/rider-dashboard/payout/request"
            className="px-5 py-2.5 bg-[#5CAF90] text-white rounded-lg text-sm font-semibold hover:bg-[#4A9A7D] transition-colors flex items-center gap-2"
          >
            <FiDollarSign size={18} />
            Request Payout
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-semibold text-gray-500">Month</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-500">Earnings</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-500">Deliveries</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-500">Paid</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-500">Pending</th>
              </tr>
            </thead>
            <tbody>
              {earnings?.monthlyData?.map((item: any, index: number) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-sm text-gray-700">{item.monthName}</td>
                  <td className="py-3 text-sm text-right font-medium text-gray-800">
                    ৳{item.earnings}
                  </td>
                  <td className="py-3 text-sm text-right text-gray-600">{item.deliveries}</td>
                  <td className="py-3 text-sm text-right text-green-600 font-medium">
                    ৳{item.paid}
                  </td>
                  <td className="py-3 text-sm text-right text-yellow-600 font-medium">
                    ৳{item.pending}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/rider-dashboard/payout"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all flex items-center justify-between" 
        >
          <div>
            <h3 className="font-semibold text-gray-800">Payout History</h3>
            <p className="text-sm text-gray-500">View all your payouts</p>
          </div>
          <FiArrowRight size={20} className="text-gray-400" />
        </Link>
        <Link
          href="/rider-dashboard/payout/request"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="font-semibold text-gray-800">Request Payout</h3>
            <p className="text-sm text-gray-500">Withdraw your earnings</p>
          </div>
          <FiArrowRight size={20} className="text-gray-400" />
        </Link>
      </div>
    </div>
  );
};

export default Earnings;