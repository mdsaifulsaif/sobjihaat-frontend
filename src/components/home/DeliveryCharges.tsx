

'use client';

import React from 'react';
import Image from 'next/image';

/* Brand color: --color-primary: #619d23 */

interface DeliveryTier {
  id: number;
  icon: 'city' | 'pin' | 'road' | 'signpost';
  area: string;
  desc: string;
  charge: string;
  freeAbove: string;
}

const barisalDeliveryData: DeliveryTier[] = [
  {
    id: 1,
    icon: 'city',
    area: 'Barisal City',
    desc: 'All areas inside Barisal City',
    charge: '৳60',
    freeAbove: '৳599',
  },
  {
    id: 2,
    icon: 'pin',
    area: 'Nearby Areas',
    desc: 'Within 10 KM from Barisal City',
    charge: '৳120',
    freeAbove: '৳999',
  },
  {
    id: 3,
    icon: 'road',
    area: 'Suburban Areas',
    desc: '10 – 20 KM from Barisal City',
    charge: '৳150',
    freeAbove: '৳1,499',
  },
  {
    id: 4,
    icon: 'signpost',
    area: 'Remote Areas',
    desc: '20 KM+ from Barisal City',
    charge: '৳200',
    freeAbove: '৳1,999',
  },
];

/* ---------- dashed-circle wrapper for the per-row area icon ---------- */

const DashedIconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--color-primary)]/50">
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
      size === 'sm' ? 'h-10 w-10' : 'h-12 w-12'
    }`}
  >
    {children}
  </div>
);

/* ---------- area icons (solid fill, used inside dashed circle) ---------- */

const CityIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 21V10l4-2.5V10l4-2.5V21" fill="var(--color-primary)" />
    <path d="M6 21V10l4-2.5V10l4-2.5V21H6Z" stroke="var(--color-primary)" strokeWidth="0.5" />
    <rect x="7.2" y="12" width="1.6" height="2" fill="#fff" />
    <rect x="11.2" y="12" width="1.6" height="2" fill="#fff" />
    <rect x="7.2" y="16" width="1.6" height="2" fill="#fff" />
    <rect x="11.2" y="16" width="1.6" height="2" fill="#fff" />
    <path d="M3 21h18" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PinAreaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
      fill="var(--color-primary)"
    />
    <circle cx="12" cy="9" r="2.6" fill="#fff" />
  </svg>
);

const RoadAreaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21 11 3h2l2 18"
      stroke="var(--color-primary)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10.3 13h3.4" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SignpostAreaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M6 6h6l-1.5 2.5L12 11H6V6Z"
      fill="var(--color-primary)"
    />
    <path
      d="M12 9h6v3h-6"
      fill="var(--color-primary)"
    />
  </svg>
);

const renderTierIcon = (icon: DeliveryTier['icon'], size?: number) => {
  switch (icon) {
    case 'city':
      return <CityIcon size={size} />;
    case 'pin':
      return <PinAreaIcon size={size} />;
    case 'road':
      return <RoadAreaIcon size={size} />;
    case 'signpost':
      return <SignpostAreaIcon size={size} />;
  }
};

/* ---------- wallet / tag icons used per row ---------- */

const WalletIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M4 8 15 6" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="16" cy="13" r="1.4" fill="var(--color-primary)" />
  </svg>
);

const TagIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 12.5 11.2 4.3a1.5 1.5 0 0 1 1.06-.44L18 3.8a1.6 1.6 0 0 1 1.7 1.7l-.06 5.75a1.5 1.5 0 0 1-.44 1.05L11 20.5a1.5 1.5 0 0 1-2.1 0L3 14.6a1.5 1.5 0 0 1 0-2.1Z"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="15.5" cy="7.5" r="1.3" stroke="var(--color-primary)" strokeWidth="1.4" />
  </svg>
);

/* ---------- top feature icons (outline style, no card box) ---------- */

const ScooterOutlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="6.5" cy="18" r="2" stroke="var(--color-primary)" strokeWidth="1.6" />
    <circle cx="16" cy="18" r="2" stroke="var(--color-primary)" strokeWidth="1.6" />
    <path
      d="M3 18h2l1-6.5h5l3 2.6h2.3a1.8 1.8 0 0 1 1.7 1.8v2h-1.5"
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="5.6" y="11.5" width="5" height="2.6" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
    <rect x="6.7" y="8.5" width="2.8" height="2" rx="0.4" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M8.7 12.2l2.3 2.3 4.3-4.6"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PinOutlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.4" fill="var(--color-primary)" />
  </svg>
);

const TruckOutlineIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 16V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10M3 16h11M3 16a2 2 0 1 0 4 0M14 16a2 2 0 1 0 4 0M14 9h4l3 3v4h-3M14 9v7"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 10.5v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="7.3" r="1.1" fill="#fff" />
  </svg>
);

const features = [
  { icon: <ScooterOutlineIcon />, title: 'Fast Delivery', desc: 'On-time delivery you can trust' },
  { icon: <ShieldCheckIcon />, title: 'Safe Checkout', desc: 'Your order is safe with us' },
  { icon: <PinOutlineIcon />, title: 'Live Tracking', desc: 'Track your order in real-time' },
];

/* ---------- right panel: rider over a faint city skyline with one floating pin ---------- */

const RiderCityPanel: React.FC = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl">
    <svg
      aria-hidden
      viewBox="0 0 360 360"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
    >
      <g fill="var(--color-primary)" opacity="0.08">
        {/* cloud */}
        <ellipse cx="100" cy="60" rx="30" ry="16" />
        <ellipse cx="124" cy="52" rx="20" ry="13" />

        {/* skyline silhouette */}
        <rect x="40" y="160" width="26" height="120" />
        <rect x="70" y="130" width="34" height="150" />
        <rect x="108" y="175" width="22" height="105" />
        <rect x="230" y="150" width="30" height="130" />
        <rect x="264" y="185" width="24" height="95" />
        <rect x="292" y="140" width="32" height="140" />

        {/* window cut-outs */}
        <g fill="#fff" opacity="0.7">
          <rect x="47" y="172" width="5" height="7" />
          <rect x="57" y="172" width="5" height="7" />
          <rect x="47" y="190" width="5" height="7" />
          <rect x="57" y="190" width="5" height="7" />
          <rect x="78" y="145" width="5" height="7" />
          <rect x="90" y="145" width="5" height="7" />
          <rect x="78" y="163" width="5" height="7" />
          <rect x="90" y="163" width="5" height="7" />
          <rect x="238" y="165" width="5" height="7" />
          <rect x="250" y="165" width="5" height="7" />
          <rect x="300" y="155" width="5" height="7" />
          <rect x="312" y="155" width="5" height="7" />
        </g>

        {/* single tree */}
        <circle cx="200" cy="255" r="20" />
        <rect x="196" y="270" width="8" height="22" />
      </g>

      {/* faint ground line */}
      <path d="M0 285 H360" stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="1.5" />
    </svg>

    {/* single floating location pin, top-right, with dashed tail */}
    <svg
      viewBox="0 0 60 90"
      className="absolute right-4 top-2 h-16 w-12 sm:right-6 sm:top-4 sm:h-20 sm:w-14"
    >
      <path
        d="M30 24c-8.3 0-15 6.7-15 15 0 11.2 15 27 15 27s15-15.8 15-27c0-8.3-6.7-15-15-15Z"
        fill="#9fc97f"
      />
      <circle cx="30" cy="39" r="7" fill="#fff" />
      <path
        d="M22 66 Q14 76 5 80"
        fill="none"
        stroke="#9fc97f"
        strokeWidth="2"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
    </svg>

    {/* rider image */}
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
  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--color-primary)]/50">
      {renderTierIcon(tier.icon, 18)}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-bold text-gray-900">{tier.area}</p>
      <p className="text-xs text-gray-400">{tier.desc}</p>
    </div>
    <div className="text-right">
      <p className="text-base font-bold text-gray-900">{tier.charge}</p>
      <p className="text-xs text-gray-400">per order</p>
    </div>
    <div className="border-l border-gray-100 pl-2 text-right">
      <p className="text-base font-bold text-[var(--color-primary)]">{tier.freeAbove}</p>
      <p className="text-xs text-gray-400">free above</p>
    </div>
  </div>
);

/* ---------- main component ---------- */

const DeliveryCharges: React.FC = () => {
  return (
    <section className="bg-[#fbfcfa] px-3 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto container">
        {/* ---------- header ---------- */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-3 py-1 text-xs font-bold tracking-wide text-[var(--color-primary)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 4 5v6c0 6 3.5 9 8 11 4.5-2 8-5 8-11V5l-8-3Z"
                  fill="var(--color-primary)"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              FAST. SAFE. RELIABLE
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-5xl">
              Delivery Charges
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base lg:text-lg">
              Affordable delivery across Barisal City &amp; beyond
            </p>
          </div>

          <div className="  flex flex-wrap gap-x-6 gap-y-4 lg:flex-nowrap lg:divide-x lg:divide-gray-200">
            {features.map((f, i) => (
              <div key={f.title} className={`flex items-center gap-3 ${i > 0 ? 'lg:pl-6' : ''}`}>
                <SoftIconWrap>{f.icon}</SoftIconWrap>
                <div>
                  <p className="text-sm font-bold text-gray-900">{f.title}</p>
                  <p className="text-xs leading-snug text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- main row: table + rider panel ---------- */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* table (desktop) */}
          <div className="hidden flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
            <div className="divide-y divide-gray-100">
              {barisalDeliveryData.map((tier) => (
                <div key={tier.id} className="grid grid-cols-3 items-center px-8 py-6">
                  <div className="flex items-center gap-4">
                    <DashedIconWrap>{renderTierIcon(tier.icon)}</DashedIconWrap>
                    <div>
                      <p className="font-bold text-gray-900">{tier.area}</p>
                      <p className="text-sm text-gray-500">{tier.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
                    <SoftIconWrap>
                      <WalletIcon />
                    </SoftIconWrap>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{tier.charge}</p>
                      <p className="text-sm text-gray-400">Per Order</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
                    <SoftIconWrap>
                      <TagIcon />
                    </SoftIconWrap>
                    <div>
                      <p className="text-2xl font-bold text-[var(--color-primary)]">
                        {tier.freeAbove}
                      </p>
                      <p className="text-sm text-gray-400">
                        Minimum Order
                        <br />
                        (Free Delivery)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* mobile card list */}
          <div className="flex flex-col gap-3 lg:hidden">
            {barisalDeliveryData.map((tier) => (
              <MobileTierCard key={tier.id} tier={tier} />
            ))}
          </div>

          {/* right rider + city panel */}
          <div className="flex w-full flex-col gap-4 lg:w-[320px]">
            <div className="h-[260px] overflow-hidden rounded-2xl bg-[#fbfcfa] sm:h-[320px] lg:h-full lg:min-h-[360px]">
              <RiderCityPanel />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
              <TruckOutlineIcon />
              <div>
                <p className="font-bold text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-500">
                  On orders above{' '}
                  <span className="font-semibold text-[var(--color-primary)]">৳599</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- bottom note ---------- */}
        <div className="relative mt-6 flex items-start gap-3 overflow-hidden rounded-2xl px-1 py-4 sm:px-2">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]">
            <InfoIcon />
          </span>
          <p className="text-xs text-gray-700 sm:text-sm">
            <span className="font-bold">Please Note:</span> Delivery charges may vary for remote
            areas.
            <br />
            Our team will contact you if any additional charges apply.
          </p>

          {/* faint decorative truck, bottom-right */}
          <svg
            width="64"
            height="40"
            viewBox="0 0 64 40"
            className="absolute bottom-0 right-0 hidden opacity-15 sm:block"
          >
            <path d="M2 8h26 M2 16h20 M2 24h14" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(30,4)">
              <rect x="0" y="6" width="20" height="14" rx="1.5" stroke="var(--color-primary)" strokeWidth="1.6" fill="none" />
              <path d="M20 10h6l5 5v5h-11" stroke="var(--color-primary)" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
              <circle cx="6" cy="22" r="2.4" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
              <circle cx="24" cy="22" r="2.4" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCharges;