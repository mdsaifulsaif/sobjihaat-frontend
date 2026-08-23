

'use client';

import React from 'react';
import Image from 'next/image';
import {
  TbTruckDelivery,
  TbWallet,
  TbTag,
  TbShieldCheck,
  TbMapPin,
  TbTruck,
  TbInfoCircle,
} from 'react-icons/tb';
import { MdOutlineElectricScooter } from 'react-icons/md';
import { useRouter } from "next/navigation";
import SectionHeader from '../shared/SectionHeader';
import { BiLeaf } from 'react-icons/bi';
/* Brand color: --color-primary: #619d23 */

interface DeliveryTier {
  id: number;
  orderRange: string;
  charge: string;
  freeCondition: string;
}

interface DeliveryChargesProps {
  initialData?: any; // page.tsx থেকে আসা initialData props
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

/* ---------- dashed-circle wrapper for the per-row area icon ---------- */
const DashedIconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--color-primary)]/50">
    {children}
  </div>
);

/* ---------- filled light-bg wrapper for wallet / tag icons ---------- */
const SoftIconWrap: React.FC<{ children: React.ReactNode; size?: 'sm' | 'md' }> = ({
  children,
  size = 'md',
}) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full bg-[#eef3e6] ${
      size === 'sm' ? 'h-10 w-10' : 'h-11 w-11'
    }`}
  >
    {children}
  </div>
);

const features = [
  { icon: <MdOutlineElectricScooter size={22} color="var(--color-primary)" />, title: 'Fast delivery', desc: 'On-time delivery you can trust' },
  { icon: <TbShieldCheck size={22} color="var(--color-primary)" />, title: 'Safe checkout', desc: 'Your order is safe with us' },
  { icon: <TbMapPin size={22} color="var(--color-primary)" />, title: 'Live tracking', desc: 'Track your order in real-time' },
];

/* ---------- right panel ---------- */
const RiderCityPanel: React.FC = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl">
    <svg
      aria-hidden
      viewBox="0 0 360 360"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
    >
      <g fill="var(--color-primary)" opacity="0.08">
        <ellipse cx="100" cy="60" rx="30" ry="16" />
        <ellipse cx="124" cy="52" rx="20" ry="13" />
        <rect x="40" y="160" width="26" height="120" />
        <rect x="70" y="130" width="34" height="150" />
        <rect x="108" y="175" width="22" height="105" />
        <rect x="230" y="150" width="30" height="130" />
        <rect x="264" y="185" width="24" height="95" />
        <rect x="292" y="140" width="32" height="140" />
      </g>
      <path d="M0 285 H360" stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="1.5" />
    </svg>

    <div className="relative z-10 flex h-full items-end justify-center">
      <Image
        src="/bike1.png"
        alt="Delivery rider on a green scooter"
        width={320}
        height={320}
        className="h-auto w-[78%] max-w-[300px] select-none drop-shadow-2xl sm:w-[85%]"
        priority
      />
    </div>
  </div>
);

/* ---------- mobile compact tier card ---------- */
const MobileTierCard: React.FC<{ tier: DeliveryTier }> = ({ tier }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--color-primary)]/50">
      <TbTruckDelivery size={17} color="var(--color-primary)" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-gray-900">{tier.orderRange}</p>
      <p className="text-xs text-gray-400">Order amount</p>
    </div>
    <div className="text-right">
      <p className={`text-sm font-semibold ${tier.charge === 'Free' ? 'text-green-600' : 'text-gray-900'}`}>
        {tier.charge}
      </p>
      <p className="text-xs text-gray-400">per order</p>
    </div>
    <div className="border-l border-gray-100 pl-2 text-right">
      <p className="text-xs font-semibold text-[var(--color-primary)]">{tier.freeCondition}</p>
      <p className="text-[10px] text-gray-400">Status</p>
    </div>
  </div>
);

/* ---------- main component ---------- */
const DeliveryCharges: React.FC<DeliveryChargesProps> = ({
  initialData,
  title = 'Delivery charges',
  subtitle = 'Affordable delivery rates based on your order value',
  badgeText = 'Fast. Safe. Reliable',
}) => {
  const shippingConfig = Array.isArray(initialData) ? initialData[0] : initialData;
  const apiTiers = shippingConfig?.tiers || [];



  const formatCurrency = (amount: number) => `৳${amount.toLocaleString('en-IN')}`;

  const buildDeliveryData = (): DeliveryTier[] => {
    const list: DeliveryTier[] = [
      {
        id: 0,
        orderRange: 'First order offer',
        charge: 'Free',
        freeCondition: '✓ 1st order special',
      },
    ];

    apiTiers.forEach((tier: { min: number; max: number; charge: number }, idx: number) => {
      const isMaxUnlimited = tier.max >= 99999;
      const orderRange = isMaxUnlimited
        ? `${formatCurrency(tier.min)}+`
        : `${formatCurrency(tier.min)} – ${formatCurrency(tier.max)}`;

      const isFree = tier.charge === 0;

      list.push({
        id: idx + 1,
        orderRange,
        charge: isFree ? 'Free' : formatCurrency(tier.charge),
        freeCondition: isFree
          ? '✓ Free delivery'
          : `Orders above ${formatCurrency(tier.min)}`,
      });
    });

    return list;
  };

  const deliveryData = buildDeliveryData();

  const router = useRouter();

  return (
    <section className="bg-[#fbfcfa] px-3 py-10 sm:px-6 sm:py-12">
      <div className="container mx-auto">
        {/* Header */}
        {/* <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-primary)]">
              <TbShieldCheck size={14} />
              {badgeText.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold leading-tight text-[#173321] sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-4 lg:flex-nowrap lg:divide-x lg:divide-gray-200">
            {features.map((f, i) => (
              <div key={f.title} className={`flex items-center gap-3 ${i > 0 ? 'lg:pl-6' : ''}`}>
                <SoftIconWrap>{f.icon}</SoftIconWrap>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                  <p className="text-xs leading-snug text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <SectionHeader title="Delevary Coverage" icon={<BiLeaf size={18} />} actionLabel="See all" onAction={() => router.push("/vegetables")} />

        {/* Content row */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Desktop table */}
          <div className="hidden flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
            <div className="divide-y divide-gray-100">
              {deliveryData.map((tier) => (
                <div key={tier.id} className="grid grid-cols-3 items-center px-6 py-4">
                  <div className="flex items-center gap-3">
                    <DashedIconWrap>
                      <TbTruckDelivery size={18} color="var(--color-primary)" />
                    </DashedIconWrap>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Order value</p>
                      <p className="text-sm font-semibold text-gray-900">{tier.orderRange}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
                    <SoftIconWrap size="sm">
                      <TbWallet size={18} color="var(--color-primary)" />
                    </SoftIconWrap>
                    <div>
                      <p className={`text-base font-semibold ${tier.charge === 'Free' ? 'text-green-600' : 'text-gray-900'}`}>
                        {tier.charge}
                      </p>
                      <p className="text-xs text-gray-400">Delivery charge</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
                    <SoftIconWrap size="sm">
                      <TbTag size={18} color="var(--color-primary)" />
                    </SoftIconWrap>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">
                        {tier.freeCondition}
                      </p>
                      <p className="text-xs text-gray-400">Policy / eligibility</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile tier list */}
          <div className="flex flex-col gap-3 lg:hidden">
            {deliveryData.map((tier) => (
              <MobileTierCard key={tier.id} tier={tier} />
            ))}
          </div>

          {/* Right panel */}
          <div className="flex w-full flex-col gap-4 lg:w-[320px]">
            <div className="h-[260px] overflow-hidden rounded-2xl bg-[#fbfcfa] sm:h-[320px] lg:h-full lg:min-h-[360px]">
              <RiderCityPanel />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
              <TbTruck size={22} color="var(--color-primary)" />
              <div>
                <p className="text-sm font-semibold text-gray-900">First order free!</p>
                <p className="text-sm text-gray-500">
                  Enjoy <span className="font-semibold text-[var(--color-primary)]">100% free delivery</span> on your 1st order.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="relative mt-6 flex items-start gap-3 overflow-hidden rounded-2xl px-1 py-4 sm:px-2">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]">
            <TbInfoCircle size={14} color="#fff" />
          </span>
          <p className="text-xs text-gray-700 sm:text-sm">
            <span className="font-semibold">Please note:</span> First order delivery charge is completely free.
            Subsequent charges apply based on order ranges shown above.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCharges;