'use client';

import React from 'react';

/* ─── feature data ─── */
const features = [
  {
    id: 1,
    icon: (
      /* Delivery truck */
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <rect x="2" y="14" width="28" height="20" rx="3" fill="var(--color-primary)" />
        <path d="M30 20h8l6 7v7H30V20Z" fill="var(--color-primary)" />
        <circle cx="11" cy="36" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
        <circle cx="37" cy="36" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
        <path d="M6 22l4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 26h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Super Fast Delivery',
    desc: 'Get your order delivered to your doorstep as fast as 45 mins.',
    badge: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.5 13H12L11 22L19.5 11H12L13 2Z" fill="var(--color-primary)" />
      </svg>
    ),
    badgeText: '45 mins Delivery',
  },
  {
    id: 2,
    icon: (
      /* Basket with veggies */
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        {/* basket body */}
        <path d="M8 22h32l-4 16H12L8 22Z" fill="var(--color-primary)" />
        {/* basket handle */}
        <path d="M14 22C14 14 18 10 24 10C30 10 34 14 34 22" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* carrot */}
        <path d="M22 8C22 8 21 4 24 3C27 4 26 8 26 8" fill="#e07b39" />
        <path d="M24 3C24 3 22.5 1.5 21 2" stroke="#619d23" strokeWidth="1.5" strokeLinecap="round" />
        {/* leaf sprout left */}
        <path d="M18 10C18 10 16 7 18 5C20 7 18 10 18 10Z" fill="#619d23" />
        {/* leaf sprout right */}
        <path d="M30 10C30 10 32 7 30 5C28 7 30 10 30 10Z" fill="#619d23" />
        {/* basket weave lines */}
        <path d="M10 28h28M11 32h26M13 36h22" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'Fresh & Safe',
    desc: 'Fresh fruits & vegetables directly from farms to you.',
    badge: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 2 6 6 6 13C6 17 9 21 12 22C15 21 18 17 18 13C18 6 12 2 12 2Z" fill="var(--color-primary)" />
        <path d="M12 22V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 16C12 16 9 14 9 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    badgeText: 'Farm Fresh',
  },
  {
    id: 3,
    icon: (
      /* Medal / badge */
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="28" r="14" fill="var(--color-primary)" />
        <circle cx="24" cy="28" r="10" stroke="white" strokeWidth="2" fill="none" />
        <path d="M24 22l1.8 3.6 4 .6-2.9 2.8.7 4L24 31l-3.6 1.9.7-4-2.9-2.8 4-.6L24 22Z" fill="white" />
        {/* ribbon left */}
        <path d="M16 14L13 6l5 3 4-5" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* ribbon right */}
        <path d="M32 14L35 6l-5 3-4-5" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: 'Best Price Compliancy',
    desc: 'We ensure the best quality products at affordable prices.',
    badge: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z" fill="var(--color-primary)" />
      </svg>
    ),
    badgeText: 'Best Prices',
  },
  {
    id: 4,
    icon: (
      /* Lock */
      <svg width="38" height="40" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="22" width="32" height="22" rx="4" fill="var(--color-primary)" />
        <path d="M14 22V16C14 10 34 10 34 16V22" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="32" r="4" fill="white" />
        <rect x="22" y="33" width="4" height="5" rx="2" fill="white" />
        {/* keyhole */}
        <path d="M22 32a2 2 0 1 1 4 0c0 1-1 2-1 2h-2s-1-1-1-2Z" fill="var(--color-primary)" />
      </svg>
    ),
    title: 'Secure Payment',
    desc: '100% safe & secure payments with multiple trusted options.',
    badge: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L19 5V11C19 15.5 15.5 19 12 21C8.5 19 5 15.5 5 11V5L12 2Z" fill="var(--color-primary)" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeText: 'Secure & Encrypted',
  },
  {
    id: 5,
    icon: (
      /* Return / refresh box */
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        {/* box */}
        <path d="M14 18h20l2 16H12L14 18Z" fill="var(--color-primary)" />
        <path d="M10 18h28" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 18V14h12v4" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
        {/* return arrows */}
        <path d="M20 28c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M28 26l2-2-2-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 22l-2 2 2 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Easy Returns',
    desc: 'Not satisfied with your order? We offer easy & hassle free returns.',
    badge: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M9 15L4 10l5-5" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 10h10a6 6 0 0 1 0 12h-2" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    badgeText: 'Hassle Free',
  },
  {
    id: 6,
    icon: (
      /* Headset support */
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        {/* head arc */}
        <path d="M10 26C10 16 16 10 24 10C32 10 38 16 38 26" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* left ear cup */}
        <rect x="7" y="24" width="7" height="11" rx="3.5" fill="var(--color-primary)" />
        {/* right ear cup */}
        <rect x="34" y="24" width="7" height="11" rx="3.5" fill="var(--color-primary)" />
        {/* mic arm */}
        <path d="M38 33C38 33 40 36 38 39" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="37" cy="40" r="2" fill="var(--color-primary)" />
        {/* chat bubble */}
        <path d="M19 24h10v6l-2-2h-8a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" fill="white" />
        <circle cx="21.5" cy="27" r="1" fill="var(--color-primary)" />
        <circle cx="24" cy="27" r="1" fill="var(--color-primary)" />
        <circle cx="26.5" cy="27" r="1" fill="var(--color-primary)" />
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Our support team is available round the clock to help you.',
    badge: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" fill="var(--color-primary)" />
      </svg>
    ),
    badgeText: 'Always Here',
  },
];

/* ─── decorative leaf SVG ─── */
const LeafDecor = ({ className }: { className: string }) => (
  <svg
    className={className}
    viewBox="0 0 120 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 130C60 130 10 100 10 50C10 20 35 5 60 5C85 5 110 20 110 50C110 100 60 130 60 130Z"
      fill="#619d23"
      opacity="0.13"
    />
    <path
      d="M60 130V5"
      stroke="#619d23"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      opacity="0.2"
    />
    <path
      d="M35 40C35 40 60 30 85 45"
      stroke="#619d23"
      strokeWidth="1.2"
      opacity="0.18"
      strokeLinecap="round"
    />
    <path
      d="M25 65C25 65 60 52 95 68"
      stroke="#619d23"
      strokeWidth="1.2"
      opacity="0.15"
      strokeLinecap="round"
    />
    {/* second smaller leaf */}
    <path
      d="M60 130C60 130 30 115 28 85C26 60 42 48 60 48C78 48 94 60 92 85C90 115 60 130 60 130Z"
      fill="#619d23"
      opacity="0.09"
    />
  </svg>
);

/* ─── Dot grid decor ─── */
const DotGrid = ({ className }: { className: string }) => (
  <svg className={className} width="52" height="72" viewBox="0 0 52 72" fill="none">
    {[0,1,2,3,4,5].map((row) =>
      [0,1,2,3].map((col) => (
        <circle
          key={`${row}-${col}`}
          cx={col * 14 + 6}
          cy={row * 14 + 6}
          r="2.5"
          fill="#619d23"
          opacity="0.18"
        />
      ))
    )}
  </svg>
);

/* ─── Main ─── */
const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#f6faf2] px-4 py-14 sm:px-6 sm:py-20">

      {/* decorative leaves */}
      <LeafDecor className="pointer-events-none absolute -left-6 top-16 w-28 rotate-[-20deg] sm:w-36" />
      <LeafDecor className="pointer-events-none absolute -right-6 bottom-16 w-28 rotate-[160deg] sm:w-36" />

      {/* dot grids */}
      <DotGrid className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block" />
      <DotGrid className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block" />

      <div className="relative mx-auto container">

        {/* ── Section heading ── */}
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-3 flex items-center justify-center gap-2">
            {/* tiny leaf icons flanking the eyebrow */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C12 22 4 16 4 9C4 5 7.5 2 12 2C16.5 2 20 5 20 9C20 16 12 22 12 22Z" fill="#619d23" opacity="0.7" />
              <path d="M12 22V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              className="text-xs font-extrabold tracking-widest uppercase"
              style={{ color: 'var(--color-primary)' }}
            >
              WHY CHOOSE US
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C12 22 4 16 4 9C4 5 7.5 2 12 2C16.5 2 20 5 20 9C20 16 12 22 12 22Z" fill="#619d23" opacity="0.7" />
              <path d="M12 22V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Why Choose{' '}
            <span style={{ color: 'var(--color-primary)' }}>SobjiHaat?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            We are committed to providing the best grocery shopping experience
            with quality, convenience and care.
          </p>
        </div>

        {/* ── Feature cards grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.id}
              className="flex flex-col items-center rounded-2xl border border-white bg-white px-6 py-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              {/* icon circle */}
              <div
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, white)' }}
              >
                {f.icon}
              </div>

              {/* green dash separator */}
              <div
                className="mb-4 h-0.5 w-8 rounded-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />

              <h3 className="mb-2 text-base font-extrabold text-gray-900 sm:text-lg">
                {f.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">{f.desc}</p>

              {/* badge pill */}
              <div
                className="mt-auto inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold"
                style={{
                  borderColor: 'color-mix(in srgb, var(--color-primary) 30%, white)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, white)',
                }}
              >
                {f.badge}
                {f.badgeText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;