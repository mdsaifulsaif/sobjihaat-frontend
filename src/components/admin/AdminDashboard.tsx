
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiTruck,
  FiDollarSign,
  FiPackage,
  FiClock,
  FiArrowRight,
  FiTrendingUp,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiCalendar,
  FiUser,
  FiStar,
  FiCreditCard,
  FiPhone,
} from 'react-icons/fi';
import { useGetDashboardOverviewQuery } from '@/redux/api/dashboardApi';


type RangeType = 'today' | 'weekly' | 'monthly' | 'yearly' | 'all';

const RiderDashboardPage = () => {
  const [range, setRange] = useState<RangeType>('weekly');
  
  const { 
    data, 
    isLoading, 
    isFetching,
    refetch 
  } = useGetDashboardOverviewQuery({ range });

  const dashboard = data?.data;
  const rider = dashboard?.rider;
  const summary = dashboard?.summary;
  const earnings = dashboard?.earnings;
  const chart = dashboard?.chart;
  const recentOrders = dashboard?.recentOrders || [];

  // Stats Cards
  const stats = [
    {
      title: 'Total Deliveries',
      value: summary?.totalDeliveries || 0,
      icon: FiTruck,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.12)',
      subtitle: `${summary?.rangeDeliveries || 0} this period`,
    },
    {
      title: 'Total Earnings',
      value: `৳${earnings?.total || 0}`,
      icon: FiDollarSign,
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.12)',
      subtitle: `৳${earnings?.range || 0} this period`,
    },
    {
      title: 'Pending Payout',
      value: `৳${earnings?.pendingPayout || 0}`,
      icon: FiClock,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.12)',
      subtitle: 'Awaiting approval',
    },
    {
      title: 'Pending Orders',
      value: summary?.pendingDeliveries || 0,
      icon: FiPackage,
      color: '#EC4899',
      bgColor: 'rgba(236, 72, 153, 0.12)',
      subtitle: `${summary?.outForDelivery || 0} out for delivery`,
    },
  ];

  // Quick Actions
  const quickActions = [
    {
      label: 'Available Orders',
      icon: FiPackage,
      href: '/rider-dashboard/orders/available',
      color: '#3B82F6',
    },
    {
      label: 'My Orders',
      icon: FiTruck,
      href: '/rider-dashboard/orders',
      color: '#8B5CF6',
    },
    {
      label: 'Request Payout',
      icon: FiDollarSign,
      href: '/rider-dashboard/payout/request',
      color: '#22C55E',
    },
    {
      label: 'Earnings',
      icon: FiTrendingUp,
      href: '/rider-dashboard/earnings',
      color: '#F59E0B',
    },
  ];

  // Range options
  const rangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'yearly', label: 'This Year' },
    { value: 'all', label: 'All Time' },
  ];

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      processing: 'bg-purple-100 text-purple-700',
      shipped: 'bg-indigo-100 text-indigo-700',
      out_for_delivery: 'bg-orange-100 text-orange-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      returned: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // Max value for chart
  const maxEarning = Math.max(...(chart?.earnings || [0]), 1);
  const maxDelivery = Math.max(...(chart?.deliveries || [0]), 1);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#5CAF90]/20 border-t-[#5CAF90]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FiTruck className="text-[#5CAF90] text-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full mx-auto px-4 py-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-[#5CAF90]/10 p-2 rounded-xl">
              <FiTruck className="text-[#5CAF90]" size={20} />
            </span>
            Rider Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, {rider?.fullName || 'Rider'}! 🏍️
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Badge */}
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
              rider?.status === 'online'
                ? 'bg-green-100 text-green-700'
                : rider?.status === 'busy'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                rider?.status === 'online'
                  ? 'bg-green-500'
                  : rider?.status === 'busy'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
              }`}
            />
            {rider?.status || 'Offline'}
          </span>

          {/* Refresh Button */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <FiRefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* ===== Profile Card ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5CAF90] to-[#4A9A7D] flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-[#5CAF90]/20">
              {rider?.fullName?.charAt(0)?.toUpperCase() || 'R'}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{rider?.fullName}</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FiPhone size={12} />
                  {rider?.phone || 'N/A'}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1 capitalize">
                  <FiTruck size={12} />
                  {rider?.vehicleType || 'N/A'}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1">
                  <FiStar size={12} className="text-yellow-500" />
                  {rider?.rating || 5}.0
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            {rider?.assignedAreas?.map((area: any) => (
              <span
                key={area._id}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium flex items-center gap-1 border border-blue-100"
              >
                <FiMapPin size={12} />
                {area.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Range Filter ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
        <div className="flex flex-wrap gap-2">
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setRange(option.value as RangeType)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                range === option.value
                  ? 'bg-[#5CAF90] text-white shadow-md shadow-[#5CAF90]/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
            <FiCalendar size={12} />
            {new Date(dashboard?.filter?.startDate).toLocaleDateString()} - {new Date(dashboard?.filter?.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.subtitle}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Chart + Quick Actions Row ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <FiTrendingUp className="text-[#5CAF90]" />
                Earnings Overview
              </h3>
              <p className="text-xs text-gray-400">
                {rangeOptions.find(o => o.value === range)?.label} earnings breakdown
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#5CAF90]" />
                <span className="text-xs text-gray-500">Earnings (৳)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-xs text-gray-500">Deliveries</span>
              </div>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-2">
            {chart?.labels?.map((label: string, index: number) => {
              const earn = chart.earnings[index] || 0;
              const deliver = chart.deliveries[index] || 0;
              const earnPercent = (earn / maxEarning) * 100;
              const deliverPercent = (deliver / maxDelivery) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex items-end justify-center gap-1 h-48">
                    {/* Earnings Bar */}
                    <div
                      className="w-6 rounded-t-md transition-all duration-500 group-hover:opacity-80"
                      style={{
                        height: `${Math.max(earnPercent, 2)}%`,
                        backgroundColor: '#5CAF90',
                        minHeight: earn > 0 ? '4px' : '0px',
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ৳{earn}
                      </div>
                    </div>
                    {/* Deliveries Bar */}
                    <div
                      className="w-6 rounded-t-md transition-all duration-500 group-hover:opacity-80"
                      style={{
                        height: `${Math.max(deliverPercent, 2)}%`,
                        backgroundColor: '#60A5FA',
                        minHeight: deliver > 0 ? '4px' : '0px',
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {deliver} orders
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium truncate w-full text-center">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiPackage className="text-[#5CAF90]" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#5CAF90] hover:shadow-md transition-all group bg-gray-50/50"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <Icon size={22} style={{ color: action.color }} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#5CAF90]">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Earnings Summary */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Total Earnings</span>
              <span className="font-bold text-gray-800">৳{earnings?.total || 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-500">Pending Payout</span>
              <span className="font-bold text-yellow-600">৳{earnings?.pendingPayout || 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-500">This Period</span>
              <span className="font-bold text-green-600">৳{earnings?.range || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Recent Orders ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FiClock className="text-[#5CAF90]" />
              Recent Orders
            </h3>
            <p className="text-xs text-gray-400">Latest {recentOrders.length} deliveries</p>
          </div>
          <Link
            href="/rider-dashboard/orders"
            className="text-sm font-medium text-[#5CAF90] hover:underline flex items-center gap-1"
          >
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order: any) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#5CAF90]">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{order.deliveryAddress?.name || 'Guest'}</p>
                    <p className="text-xs text-gray-400">{order.deliveryAddress?.phone || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">৳{order.totalAmount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status?.replace('_', ' ') || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboardPage;