'use client';

import React from 'react';

/* =========================================================================
   Brand color: --color-primary: #619d23
   Expects the CSS variable defined globally:
     :root { --color-primary: #619d23; }

   NOTE ON LOGOS:
   Real brand marks (PRAN, ACI, Nestlé, Unilever, Coca-Cola, P&G, etc.) are
   trademarked artwork and can't be reproduced here. Each brand below renders
   as a clean placeholder badge (initials on a soft tinted circle) using the
   `accent` color from the data. Drop in real logo files later by swapping
   <BrandPlaceholder /> for an <Image src={brand.logo} .../> per brand —
   the data shape (id, name, productCount, logo) already supports it.
   ========================================================================= */

/* ---------------------------------------------------------------------------
   JSON-style data
--------------------------------------------------------------------------- */

interface Brand {
  id: string;
  name: string;
  initials: string;
  productCount: string;
  accent: string;
  logo?: string; // populate with a real logo path/URL when available
}

const brandsData: Brand[] = [
  { id: 'pran', name: 'PRAN', initials: 'PR', productCount: '120+ Products', accent: '#e0312f' },
  { id: 'aci', name: 'ACI', initials: 'ACI', productCount: '150+ Products', accent: '#1c9b6b' },
  { id: 'bashundhara', name: 'Bashundhara', initials: 'B', productCount: '200+ Products', accent: '#c0392b' },
  { id: 'citygroup', name: 'City Group', initials: 'CG', productCount: '100+ Products', accent: '#e0432b' },
  { id: 'square', name: 'Square', initials: 'SQ', productCount: '80+ Products', accent: '#2f7d32' },
  { id: 'fresh', name: 'Fresh', initials: 'F', productCount: '60+ Products', accent: '#d62828' },
  { id: 'nestle', name: 'Nestlé', initials: 'N', productCount: '120+ Products', accent: '#1b4f9c' },
  { id: 'unilever', name: 'Unilever', initials: 'U', productCount: '150+ Products', accent: '#1b4f9c' },
  { id: 'danone', name: 'Danone', initials: 'D', productCount: '80+ Products', accent: '#1b4f9c' },
  { id: 'cocacola', name: 'Coca-Cola', initials: 'CC', productCount: '50+ Products', accent: '#d62828' },
  { id: 'pg', name: 'Procter & Gamble', initials: 'P&G', productCount: '100+ Products', accent: '#1565a8' },
  { id: 'marico', name: 'Marico', initials: 'M', productCount: '70+ Products', accent: '#1b4f9c' },
];

interface TrustPoint {
  id: string;
  icon: 'shield' | 'medal' | 'heart' | 'tag';
  title: string;
  subtitle: string;
}

const trustPointsData: TrustPoint[] = [
  { id: 'authentic', icon: 'shield', title: '100% Authentic', subtitle: 'Genuine products only' },
  { id: 'quality', icon: 'medal', title: 'Top Quality', subtitle: 'Premium brands' },
  { id: 'trusted', icon: 'heart', title: 'Trusted by Thousands', subtitle: 'Loved by our customers' },
  { id: 'prices', icon: 'tag', title: 'Best Prices', subtitle: 'Great value always' },
];

/* ---------------------------------------------------------------------------
   Decorative leaf-branch doodle (bottom corners)
--------------------------------------------------------------------------- */

const LeafBranchDoodle: React.FC<{ className?: string; flip?: boolean }> = ({
  className = '',
  flip = false,
}) => (
  <svg
    viewBox="0 0 160 200"
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    fill="none"
    aria-hidden
  >
    <path d="M20 190 L120 30" stroke="#bcd9a8" strokeWidth="2.4" strokeLinecap="round" />
    {[
      [34, 168, -28],
      [50, 142, 18],
      [66, 116, -24],
      [82, 90, 20],
      [98, 64, -22],
      [112, 40, 16],
    ].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
        <path d="M0 0C8 -4 16 -2 20 6C12 9 4 7 0 0Z" fill="#bcd9a8" opacity="0.85" />
      </g>
    ))}
  </svg>
);

/* ---------------------------------------------------------------------------
   Trust point icons
--------------------------------------------------------------------------- */

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

const MedalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="9" r="6" stroke="var(--color-primary)" strokeWidth="1.7" />
    <path
      d="M9 8.6l1.4-2.8 1.6 2.8 3 .4-2.2 2.1.5 3-2.9-1.5-2.9 1.5.5-3-2.2-2.1Z"
      fill="var(--color-primary)"
    />
    <path d="M9 14.5 7.5 21l4.5-2.3L16.5 21 15 14.5" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const HeartOutlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 20.3S3.5 15.3 3.5 9.4A4.9 4.9 0 0 1 12 6.3a4.9 4.9 0 0 1 8.5 3.1c0 5.9-8.5 10.9-8.5 10.9Z"
      stroke="var(--color-primary)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const TagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 12.5 11.2 4.3a1.5 1.5 0 0 1 1.06-.44L18 3.8a1.6 1.6 0 0 1 1.7 1.7l-.06 5.75a1.5 1.5 0 0 1-.44 1.05L11 20.5a1.5 1.5 0 0 1-2.1 0L3 14.6a1.5 1.5 0 0 1 0-2.1Z"
      stroke="var(--color-primary)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="15.5" cy="7.5" r="1.3" stroke="var(--color-primary)" strokeWidth="1.4" />
  </svg>
);

const renderTrustIcon = (icon: TrustPoint['icon']) => {
  switch (icon) {
    case 'shield':
      return <ShieldCheckIcon />;
    case 'medal':
      return <MedalIcon />;
    case 'heart':
      return <HeartOutlineIcon />;
    case 'tag':
      return <TagIcon />;
  }
};

/* ---------------------------------------------------------------------------
   Small UI icons
--------------------------------------------------------------------------- */

const StarBadgeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="var(--color-primary)" />
    <path
      d="M12 6.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.6 3.6-.5L12 6.5Z"
      fill="#fff"
    />
  </svg>
);

const ArrowRightIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="var(--color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" fill="var(--color-primary)" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Brand placeholder badge (swap for a real <Image> once logo files exist)
--------------------------------------------------------------------------- */

const BrandPlaceholder: React.FC<{ brand: Brand }> = ({ brand }) =>
  brand.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={brand.logo} alt={brand.name} className="h-12 max-w-[80%] object-contain" />
  ) : (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-full text-base font-extrabold tracking-tight text-white sm:h-16 sm:w-16 sm:text-lg"
      style={{ backgroundColor: brand.accent }}
    >
      {brand.initials}
    </div>
  );

/* ---------------------------------------------------------------------------
   Brand card
--------------------------------------------------------------------------- */

const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => (
  <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm transition hover:shadow-md">
    <div className="flex h-16 items-center justify-center">
      <BrandPlaceholder brand={brand} />
    </div>
    <h3 className="mt-4 text-center text-[15px] font-bold text-gray-900">{brand.name}</h3>
    <p className="mt-1 text-center text-sm font-medium text-[var(--color-primary)]">
      {brand.productCount}
    </p>
  </div>
);

/* ---------------------------------------------------------------------------
   Main component
--------------------------------------------------------------------------- */

const TrustedBrands: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#fbfcfa] px-4 py-12 sm:px-6 lg:py-16">
      <div className="relative mx-auto max-w-6xl">
        {/* ---------- heading ---------- */}
        <div className="text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef3e6] px-4 py-1.5 text-xs font-bold tracking-wide text-[var(--color-primary)]">
            <StarBadgeIcon />
            TOP BRANDS
          </span>

          <h2 className="text-3xl font-extrabold leading-tight text-[#173321] sm:text-4xl lg:text-[2.6rem]">
            Trusted Brands, Quality You Can Trust
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500 sm:text-base">
            We partner with the best brands to bring you authentic products
            every day.
          </p>
          <span className="mx-auto mt-1 block h-[2px] w-20 rounded-full bg-[var(--color-primary)]" />
        </div>

        {/* ---------- trust points row ---------- */}
        <div className="mt-8 flex flex-col gap-y-6 rounded-2xl sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 lg:flex-nowrap lg:divide-x lg:divide-gray-200">
          {trustPointsData.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-3 ${i > 0 ? 'lg:pl-8' : ''}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef3e6]">
                {renderTrustIcon(p.icon)}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900 sm:text-base">{p.title}</p>
                <p className="text-xs text-gray-500 sm:text-sm">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- brands grid panel ---------- */}
        <div className="mt-8 rounded-3xl border border-gray-100 bg-white/60 p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {brandsData.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>

        {/* ---------- view all brands ---------- */}
        <div className="mt-8 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 px-6 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-[#eef3e6]"
          >
            <GridIcon />
            View All Brands
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* decorative leaf branches, bottom corners */}
      <LeafBranchDoodle className="pointer-events-none absolute bottom-0 left-0 h-40 w-32 sm:h-52 sm:w-40" />
      <LeafBranchDoodle
        flip
        className="pointer-events-none absolute bottom-0 right-0 h-40 w-32 sm:h-52 sm:w-40"
      />

      {/* faint rolling ground wave at the very bottom */}
      <svg
        aria-hidden
        viewBox="0 0 1400 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full sm:h-16"
      >
        <path
          d="M0 50 C 300 10, 700 70, 1000 30 S 1300 10, 1400 40 V80 H0 Z"
          fill="var(--color-primary)"
          opacity="0.05"
        />
      </svg>
    </section>
  );
};

export default TrustedBrands;