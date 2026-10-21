'use client';

import React from 'react';
import Image from 'next/image';
import {
  TbTruckDelivery,
  TbShieldCheck,
  TbMapPin,
  TbSparkles,
  TbClock,
  TbInfoCircle,
} from 'react-icons/tb';
import { BiLeaf } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import SectionHeader from '../shared/SectionHeader';

interface DeliveryChargesProps {
  initialData?: any;
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

interface FormattedTier {
  id: number;
  orderRange: string;
  isFree: boolean;
  chargeFormatted: string;
  isLast: boolean;
}

const DEFAULT_TIERS = [
  { min: 0, max: 499, charge: 30 },
  { min: 500, max: 999, charge: 50 },
  { min: 1000, max: 1999, charge: 40 },
  { min: 2000, max: 4999, charge: 30 },
  { min: 5000, max: 99999, charge: 0 },
];

const DeliveryCharges: React.FC<DeliveryChargesProps> = ({
  initialData,
  title = 'Delivery Charges & Rates',
  subtitle = 'Affordable delivery rates based on your order value',
}) => {
  const router = useRouter();

  const shippingConfig = Array.isArray(initialData)
    ? initialData.find((c: any) => c?.type === 'local') || initialData[0]
    : initialData;

  const rawTiers: Array<{ min: number; max: number; charge: number }> =
    shippingConfig?.tiers && shippingConfig.tiers.length > 0
      ? shippingConfig.tiers
      : DEFAULT_TIERS;

  const formatCurrency = (amount: number) => `৳${amount.toLocaleString('en-IN')}`;

  const formattedTiers: FormattedTier[] = rawTiers.map((tier, index: number) => {
    const isMaxUnlimited = tier.max >= 99999 || tier.max >= 999999;
    const orderRange = isMaxUnlimited
      ? `${formatCurrency(tier.min)}+`
      : `${formatCurrency(tier.min)} – ${formatCurrency(tier.max)}`;
    const isFree = tier.charge === 0;

    return {
      id: index,
      orderRange,
      isFree,
      chargeFormatted: isFree ? 'Free' : formatCurrency(tier.charge),
      isLast: index === rawTiers.length - 1,
    };
  });

  return (
    <section className="py-4 sm:py-6 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          icon={<BiLeaf size={18} />}
          description={subtitle}
          actionLabel="View Details"
          onAction={() => router.push('/terms')}
        />

        {/* Compact & Professional Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-[#fbfdfa] shadow-xs">
          
          {/* Header Banner: 1st Order Free Promo + Trust Badges */}
          <div className="flex flex-col gap-3.5 border-b border-gray-100/90 bg-gradient-to-r from-[#f0f6e9]/90 via-[#f7faf3]/60 to-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            
            {/* Promo Info with compact illustration */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white p-1 border border-[var(--color-primary)]/20 shadow-xs flex items-center justify-center">
                <Image
                  src="/bike1.png"
                  alt="Delivery Rider"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                    <TbSparkles size={11} /> 1st Order Free
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    100% Free Delivery
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  Enjoy zero delivery fee on your very first order at SobjiHaat!
                </p>
              </div>
            </div>

            {/* Micro Trust Chips */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium text-gray-600 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200/60 bg-white/80 px-2.5 py-1 text-gray-700 shadow-2xs">
                <TbClock size={14} className="text-[var(--color-primary)]" />
                <span>60-Min Delivery</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200/60 bg-white/80 px-2.5 py-1 text-gray-700 shadow-2xs">
                <TbShieldCheck size={14} className="text-[var(--color-primary)]" />
                <span>100% Fresh</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200/60 bg-white/80 px-2.5 py-1 text-gray-700 shadow-2xs">
                <TbMapPin size={14} className="text-[var(--color-primary)]" />
                <span>Live Tracking</span>
              </span>
            </div>
          </div>

          {/* Slabs Grid */}
          <div className="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <TbTruckDelivery size={15} className="text-[var(--color-primary)]" />
                <span>Standard Delivery Slabs</span>
              </div>
              <span className="text-[11px] font-medium text-gray-400">
                Applied automatically at checkout
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {formattedTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`group relative flex flex-col justify-between rounded-xl p-3 sm:p-3.5 transition-all duration-200 ${
                    tier.isFree
                      ? 'col-span-2 sm:col-span-1 border-2 border-[var(--color-primary)]/70 bg-gradient-to-b from-[#f3f8ec] to-[#eaf4df] shadow-xs'
                      : 'border border-gray-200/80 bg-white hover:border-[var(--color-primary)]/50 hover:shadow-xs'
                  }`}
                >
                  {tier.isFree && (
                    <span className="absolute -top-2.5 right-2 rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider shadow-xs">
                      Free Delivery
                    </span>
                  )}

                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Order Value
                    </span>
                    <p className="mt-0.5 text-sm font-bold text-gray-900">
                      {tier.orderRange}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-[11px] font-medium text-gray-400">
                      Charge:
                    </span>
                    <span
                      className={`text-sm font-extrabold ${
                        tier.isFree
                          ? 'text-[var(--color-primary)]'
                          : 'text-gray-900 group-hover:text-[var(--color-primary)]'
                      }`}
                    >
                      {tier.chargeFormatted}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro Footer Note */}
            <div className="mt-3.5 flex items-center gap-2 pt-2 text-[11px] text-gray-500">
              <TbInfoCircle size={14} className="shrink-0 text-[var(--color-primary)]" />
              <span>
                First order is <strong className="font-semibold text-[var(--color-primary)]">100% Free</strong>. Regular orders above ৳5,000 also qualify for free delivery.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeliveryCharges;