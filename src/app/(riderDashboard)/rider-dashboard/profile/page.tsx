

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FiMapPin,
  FiTruck,
  FiStar,
  FiDollarSign,
  FiClock,
  FiEdit2,
  FiRefreshCw,
  FiUser,
  FiPhone,
  FiCreditCard,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronRight,
  FiHome,
  FiMail,
  FiCalendar,
  FiAward,
  FiActivity,
} from 'react-icons/fi';
import { useGetMyRiderProfileQuery } from '@/redux/api/riderApi';
import { useUpdateRiderStatusMutation } from '@/redux/api/riderApi';

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  online: {
    bg: '#DCFCE7',
    text: '#166534',
    dot: '#22C55E',
    label: 'Online',
  },
  busy: {
    bg: '#FEF3C7',
    text: '#92400E',
    dot: '#F59E0B',
    label: 'Busy',
  },
  offline: {
    bg: '#F1F5F9',
    text: '#64748B',
    dot: '#94A3B8',
    label: 'Offline',
  },
};

export default function RiderProfilePage() {
  const { data, isLoading, isError, refetch } = useGetMyRiderProfileQuery({});
  const [updateStatus, { isLoading: isUpdating }] = useUpdateRiderStatusMutation();
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#5CAF90]/20 border-t-[#5CAF90]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FiTruck className="text-[#5CAF90] text-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <FiAlertCircle className="text-red-500 text-4xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Profile Load Error</h3>
        <p className="text-gray-500 max-w-sm">
          Profile load kora jayni. Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2.5 bg-[#5CAF90] text-white rounded-xl font-medium hover:bg-[#4A9A7D] transition-all shadow-lg shadow-[#5CAF90]/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  const rider = data.data;
  const statusStyle = STATUS_STYLES[rider.status] ?? STATUS_STYLES.offline;
  const [lng, lat] = rider.currentLocation?.coordinates ?? [];

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus({ status: newStatus }).unwrap();
      refetch();
      setShowStatusMenu(false);
    } catch (error) {
      // Error handled by toast
    }
  };

  const stats = [
    {
      label: 'Total Deliveries',
      value: rider.totalDeliveries || 0,
      icon: FiTruck,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.12)',
    },
    {
      label: 'Rating',
      value: `${rider.rating || 5}.0 ★`,
      icon: FiStar,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.12)',
    },
    {
      label: 'Earnings',
      value: `৳${rider.totalEarnings || 0}`,
      icon: FiDollarSign,
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.12)',
    },
    {
      label: 'Pending Payout',
      value: `৳${rider.pendingPayout || 0}`,
      icon: FiClock,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.12)',
    },
  ];

  const quickActions = [
    { label: 'Dashboard', href: '/rider-dashboard', icon: FiHome, color: '#3B82F6' },
    { label: 'Orders', href: '/rider-dashboard/orders', icon: FiTruck, color: '#8B5CF6' },
    { label: 'Earnings', href: '/rider-dashboard/earnings', icon: FiDollarSign, color: '#22C55E' },
    { label: 'Payout', href: '/rider-dashboard/payout', icon: FiCreditCard, color: '#F59E0B' },
  ];

  return (
    <div className=" mx-auto px-4 py-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-[#5CAF90]/10 p-2 rounded-xl">
              <FiUser className="text-[#5CAF90]" size={20} />
            </span>
            My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">View and manage your rider profile</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            <FiRefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <Link
            href="/rider-dashboard/settings"
            className="flex items-center gap-2 px-4 py-2 bg-[#5CAF90] text-white rounded-xl text-sm font-medium hover:bg-[#4A9A7D] transition-all shadow-md shadow-[#5CAF90]/20"
          >
            <FiEdit2 size={16} />
            Edit Profile
          </Link>
        </div>
      </div>

      {/* ===== Profile Card ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        {/* Cover */}
        <div className="relative h-28 bg-gradient-to-r from-[#5CAF90] to-[#4A9A7D]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-center gap-4 -mt-12 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#5CAF90] to-[#4A9A7D] flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-[#5CAF90]/30 border-4 border-white">
                {rider.fullName?.charAt(0)?.toUpperCase() ?? 'R'}
              </div>
              {rider.isActive && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <FiCheckCircle className="text-white text-xs" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {rider.fullName}
                </h2>

                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusMenu(!showStatusMenu)}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all hover:shadow-md"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: statusStyle.dot }}
                    />
                    {isUpdating ? 'Updating...' : statusStyle.label}
                  </button>

                  {showStatusMenu && (
                    <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 z-10 min-w-[160px] bg-white rounded-xl shadow-xl border border-gray-200 p-1.5">
                      {['online', 'busy', 'offline'].map((status) => {
                        const s = STATUS_STYLES[status];
                        return (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-50"
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: s.dot }}
                            />
                            <span className="capitalize">{s.label}</span>
                            {rider.status === status && (
                              <FiCheckCircle className="ml-auto text-[#5CAF90]" size={14} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiPhone size={14} className="text-gray-400" />
                  {rider.phone || 'N/A'}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1.5 capitalize">
                  <FiTruck size={14} className="text-gray-400" />
                  {rider.vehicleType || 'N/A'}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <FiCreditCard size={14} className="text-gray-400" />
                  {rider.vehicleNumber || 'N/A'}
                </span>
              </div>

              {/* Rider ID Badge */}
              <div className="mt-2 inline-flex items-center gap-1.5 bg-gray-100 px-3 py-0.5 rounded-full text-xs text-gray-500">
                <FiUser size={12} />
                Rider ID: {rider._id?.slice(-8)?.toUpperCase() || 'N/A'}
              </div>
            </div>

            {/* Member Since */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
              <FiCalendar size={14} />
              Joined {new Date(rider.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>

          {/* Location */}
          {typeof lat === 'number' && typeof lng === 'number' && (
            <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-400 sm:justify-start">
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                <FiMapPin size={14} className="text-blue-500" />
                <span>
                  {lat.toFixed(6)}, {lng.toFixed(6)}
                </span>
              </div>
              {rider.locationUpdatedAt && (
                <span className="text-gray-400">
                  · Updated {new Date(rider.locationUpdatedAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Two Column Section ===== */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Assigned Areas */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <FiMapPin className="text-blue-500" size={18} />
            </div>
            <h3 className="font-semibold text-gray-800">Assigned Areas</h3>
            <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {rider.assignedAreas?.length || 0}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {rider.assignedAreas?.length ? (
              rider.assignedAreas.map((area: { _id: string; name: string }) => (
                <span
                  key={area._id}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-blue-100"
                >
                  <FiMapPin size={12} />
                  {area.name}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">No areas assigned yet</p>
            )}
          </div>
        </div>

        {/* NID Info */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-50 rounded-lg">
              <FiCreditCard className="text-purple-500" size={18} />
            </div>
            <h3 className="font-semibold text-gray-800">NID Verification</h3>
            <span className="ml-auto inline-flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
              <FiCheckCircle size={12} />
              Verified
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-32 h-24 rounded-xl overflow-hidden border border-gray-200 shrink-0">
              <Image
                src={rider.nidImage}
                alt="NID"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">NID Number</p>
              <p className="font-medium text-gray-800">{rider.nidNumber || 'N/A'}</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-green-600">
                  <FiCheckCircle size={14} />
                  Verified
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">
                  Uploaded {new Date(rider.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Quick Actions ===== */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiActivity className="text-[#5CAF90]" size={18} />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-[#5CAF90] hover:shadow-md transition-all group bg-gray-50/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <Icon size={16} style={{ color: action.color }} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </div>
                <FiChevronRight size={16} className="text-gray-400 group-hover:text-[#5CAF90] transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}