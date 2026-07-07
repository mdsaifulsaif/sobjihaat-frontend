'use client';

import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';
import { useGetMyRiderProfileQuery } from '@/redux/api/riderApi'; // adjust path to match your project

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  available: { bg: '#EAF4E0', text: 'var(--color-primary)', dot: 'var(--color-primary)' },
  busy: { bg: '#FEF3C7', text: '#92400E', dot: 'var(--color-warning)' },
  offline: { bg: '#F1F5F9', text: 'var(--color-text-muted)', dot: '#94A3B8' },
};

export default function RiderProfilePage() {
  const { data, isLoading, isError, refetch } = useGetMyRiderProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Profile load kora jayni. Abar try korun.
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-full px-5 py-2 font-medium text-white transition"
          style={{
            backgroundColor: 'var(--color-primary)',
            transition: 'var(--transition-base)',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const rider = data.data;
  const statusStyle = STATUS_STYLES[rider.status] ?? STATUS_STYLES.offline;
  const [lng, lat] = rider.currentLocation?.coordinates ?? [];

  return (
    <div
      className="mx-auto max-w-3xl px-4 py-8"
      style={{ fontFamily: 'var(--font-family)' }}
    >
      {/* ===== Header Card ===== */}
      <div
        className="mb-6 p-6"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid #E2E8F0',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white"
            style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
          >
            {rider.fullName?.charAt(0)?.toUpperCase() ?? 'R'}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <h1
                className="text-xl font-semibold"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                {rider.fullName}
              </h1>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: statusStyle.dot }}
                />
                {rider.status}
              </span>
              {!rider.isActive && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)' }}
                >
                  Inactive
                </span>
              )}
            </div>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {rider.phone} · {rider.vehicleType} · {rider.vehicleNumber}
            </p>
          </div>
        </div>

        {/* Live location, small & subtle */}
        {typeof lat === 'number' && typeof lng === 'number' && (
          <div
            className="mt-4 flex items-center justify-center gap-1.5 border-t pt-3 text-xs sm:justify-start"
            style={{ color: 'var(--color-text-muted)', borderColor: '#E2E8F0' }}
          >
            <FiMapPin size={13} style={{ color: 'var(--color-primary)' }} />
            <span>
              {lat.toFixed(5)}, {lng.toFixed(5)}
            </span>
            {rider.locationUpdatedAt && (
              <span>· updated {new Date(rider.locationUpdatedAt).toLocaleString()}</span>
            )}
          </div>
        )}
      </div>

      {/* ===== Stats Grid ===== */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Deliveries', value: rider.totalDeliveries },
          { label: 'Rating', value: `${rider.rating} ★` },
          { label: 'Total Earnings', value: `৳${rider.totalEarnings}` },
          { label: 'Pending Payout', value: `৳${rider.pendingPayout}` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 text-center"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <p
              className="text-lg font-semibold"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
            >
              {stat.value}
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ===== Assigned Areas ===== */}
      <div
        className="mb-6 p-5"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid #E2E8F0',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <h2
          className="mb-3 text-sm font-semibold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          Assigned Areas
        </h2>
        <div className="flex flex-wrap gap-2">
          {rider.assignedAreas?.length ? (
            rider.assignedAreas.map((area: { _id: string; name: string }) => (
              <span
                key={area._id}
                className="rounded-full px-3 py-1 text-sm"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid #E2E8F0',
                }}
              >
                {area.name}
              </span>
            ))
          ) : (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Kono area assign kora hoyni.
            </p>
          )}
        </div>
      </div>

      {/* ===== NID Info ===== */}
      <div
        className="p-5"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid #E2E8F0',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <h2
          className="mb-3 text-sm font-semibold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          NID Verification
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            className="relative h-36 w-full max-w-xs overflow-hidden"
            style={{ borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}
          >
            <Image src={rider.nidImage} alt="NID" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              NID Number
            </p>
            <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {rider.nidNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}