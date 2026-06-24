'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/* ---------- decorative leaf SVG (reused at different sizes/rotations) ---------- */

const Leaf: React.FC<{
  className?: string;
  size?: number;
  rotate?: number;
  flip?: boolean;
}> = ({ className = '', size = 22, rotate = 0, flip = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{
      transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
    }}
  >
    <path
      d="M21 3C13 3 4 8 4 17c0 1.5.3 2.7.8 3.7C7 14 12 8 21 3Z"
      fill="#7fc77f"
    />
    <path
      d="M21 3C13 3 4 8 4 17"
      stroke="#5da85d"
      strokeWidth="1"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ---------- check icon for benefit list ---------- */

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#2f9e44" strokeWidth="1.6" />
    <path
      d="M8 12.5l2.5 2.5L16 9.5"
      stroke="#2f9e44"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LeafBadgeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 4C10 4 4 10 4 18c0 1 .1 1.6.3 2C8 12 14 6 20 4Z"
      fill="#2f9e44"
    />
  </svg>
);

const CartBoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="18" height="13" rx="1.5" stroke="#fff" strokeWidth="1.8" />
    <path d="M3 11h18" stroke="#fff" strokeWidth="1.8" />
    <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ClockIcon: React.FC<{ color?: string; size?: number }> = ({
  color = '#2f9e44',
  size = 20,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6" />
    <path
      d="M12 7v5l3.5 2"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckBadge = () => (
  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2f9e44]">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4.5 4.5L19 7"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#2f9e44" strokeWidth="1.6" />
    <path d="M12 10.5v5.5" stroke="#2f9e44" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="7.8" r="0.9" fill="#2f9e44" />
  </svg>
);

/* ---------- data ---------- */

const benefits = [
  'Fresh from Local Markets',
  'Hand Picked Quality',
  'Best Price Guaranteed',
  'Priority Delivery',
];

interface TimeSlot {
  id: number;
  range: string;
  label: string;
}

const timeSlots: TimeSlot[] = [
  { id: 1, range: '8:00 AM – 10:00 AM', label: 'Fast Delivery' },
  { id: 2, range: '10:00 AM – 12:00 PM', label: 'Fast Delivery' },
  { id: 3, range: '2:00 PM – 4:00 PM', label: 'Standard Delivery' },
  { id: 4, range: '6:00 PM – 8:00 PM', label: 'Standard Delivery' },
];

/* ---------- main component ---------- */

const PreOrderDeliveryTime: React.FC = () => {
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');
  const [selectedSlot, setSelectedSlot] = useState<number>(1);

  return (
    <section className="bg-[#fbfcfa] px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ---------------- LEFT: Pre-Order panel ---------------- */}
          <div className="relative overflow-hidden px-6 py-10 sm:px-10 lg:py-14">
            {/* soft radial backdrop behind the basket */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-10%] top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-[#e3f3e3] sm:h-[340px] sm:w-[340px] lg:right-[2%]"
            />

            {/* scattered decorative leaves */}
            <Leaf className="pointer-events-none absolute left-[6%] top-[12%]" size={20} rotate={-15} />
            <Leaf className="pointer-events-none absolute left-[2%] top-[55%]" size={16} rotate={40} flip />
            <Leaf className="pointer-events-none absolute left-[18%] top-[78%]" size={18} rotate={-30} />
            <Leaf className="pointer-events-none absolute right-[28%] top-[8%]" size={18} rotate={20} />
            <Leaf className="pointer-events-none absolute right-[6%] top-[30%]" size={16} rotate={60} />
            <Leaf className="pointer-events-none absolute right-[16%] bottom-[10%]" size={20} rotate={-50} flip />
            <Leaf className="pointer-events-none absolute left-[34%] bottom-[4%]" size={14} rotate={10} />

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
              {/* copy */}
              <div>
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#e7f5e8] px-3.5 py-1 text-xs font-semibold text-[#2f9e44]">
                  <LeafBadgeIcon />
                  Fresh. Fast. Reliable.
                </span>

                <h2 className="text-3xl font-extrabold leading-tight text-[#163a1d] sm:text-[2.15rem]">
                  Pre-Order &amp; Save More!
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-[15px]">
                  Order in advance and get the best products at the lowest
                  prices.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckIcon />
                      {b}
                    </li>
                  ))}
                </ul>

                <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#2f9e44] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#278039]">
                  <CartBoxIcon />
                  Pre-Order Now
                </button>
              </div>

              {/* basket image */}
              <div className="relative flex items-center justify-center">
                <Image
                  src="/dtime.png"
                  alt="GreenBasket crate filled with fresh vegetables"
                  width={640}
                  height={2300}
                  className="relative z-10 h-auto w-full max-w-[300px] select-none drop-shadow-xl sm:max-w-[840px]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT: Delivery time panel ---------------- */}
          <div className="relative border-t border-gray-100 px-6 py-10 sm:px-10 lg:border-l lg:border-t-0 lg:py-14">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7f5e8]">
                <ClockIcon size={22} />
              </span>
              <h3 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                Choose Your
                <br />
                Delivery Time
              </h3>
            </div>

            {/* day toggle */}
            <div className="mt-6 inline-flex w-full rounded-xl bg-gray-100 p-1 sm:w-auto">
              <button
                onClick={() => setDay('today')}
                className={`flex-1 rounded-lg px-6 py-2 text-sm font-semibold transition sm:flex-none ${
                  day === 'today'
                    ? 'bg-[#2f9e44] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDay('tomorrow')}
                className={`flex-1 rounded-lg px-6 py-2 text-sm font-semibold transition sm:flex-none ${
                  day === 'tomorrow'
                    ? 'bg-[#2f9e44] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tomorrow
              </button>
            </div>

            {/* time slot grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`relative rounded-xl border px-4 py-3.5 text-left transition ${
                      isSelected
                        ? 'border-[#2f9e44] bg-white ring-1 ring-[#2f9e44]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-3 top-3">
                        <CheckBadge />
                      </span>
                    )}
                    <ClockIcon color={isSelected ? '#2f9e44' : '#9ca3af'} size={18} />
                    <p className="mt-2 text-sm font-bold text-gray-900">{slot.range}</p>
                    <p className="text-xs text-gray-400">{slot.label}</p>
                  </button>
                );
              })}
            </div>

            {/* info footer */}
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#eef8ee] px-4 py-3">
              <InfoIcon />
              <p className="text-xs font-medium text-[#2f6b34] sm:text-sm">
                We&apos;ll deliver your order in your selected time slot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreOrderDeliveryTime;