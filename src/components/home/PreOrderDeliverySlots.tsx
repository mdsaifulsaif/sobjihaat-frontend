'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/* ---------- tiny SVG vegetable/leaf accents (replace plain leaf decorations) ---------- */

const TomatoIcon: React.FC<{ size?: number; className?: string; rotate?: number }> = ({
  size = 22,
  className = '',
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path
      d="M12 21c-4.4 0-7.5-3.4-7.5-7.6 0-4 3.2-6.9 7.5-6.9s7.5 2.9 7.5 6.9C19.5 17.6 16.4 21 12 21Z"
      fill="#e0432b"
    />
    <path
      d="M12 6.5c-.6-1.4-1.8-2.2-1.8-2.2s2 .2 2.6 1.3c.2-1.1 1.6-2.1 1.6-2.1s-.4 1.7-1.2 2.4c1.1-.2 2.4.5 2.4.5s-1.6.8-2.7.5"
      fill="#3f8f3f"
    />
  </svg>
);

const LeafSprigIcon: React.FC<{ size?: number; className?: string; rotate?: number }> = ({
  size = 20,
  className = '',
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
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

/* ---------- icon set ---------- */

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="var(--color-primary)" strokeWidth="2" />
    <path
      d="M8 12.5l2.5 2.5L16 9.5"
      stroke="var(--color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LeafBadgeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20 4C10 4 4 10 4 18c0 1 .1 1.6.3 2C8 12 14 6 20 4Z" fill="var(--color-primary)" />
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
  color = 'var(--color-primary)',
  size = 20,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.7" />
    <path
      d="M12 7v5l3.5 2"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckBadge = () => (
  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)]">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="var(--color-primary)" strokeWidth="1.6" />
    <path d="M12 10.5v5.5" stroke="var(--color-primary)" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="7.8" r="1" fill="var(--color-primary)" />
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
    <section className="bg-[#f8fbf7] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:rounded-3xl">
        {/* left column gets more real estate (3fr) than the right (2fr) on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* ==================== LEFT SIDE ==================== */}
          <div className="relative col-span-1 px-5 py-8 sm:px-8 sm:py-12 lg:col-span-3 lg:px-12 lg:py-16">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e8] px-3.5 py-1.5 text-xs font-medium text-[var(--color-primary)] sm:px-4 sm:text-sm">
                <LeafBadgeIcon />
                Fresh. Fast. Reliable.
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-[#1a3c1f] sm:mt-6 sm:text-4xl lg:text-5xl">
                Pre-Order &amp; Save More!
              </h1>

              <p className="mt-3 max-w-md text-base text-gray-600 sm:mt-4 sm:text-lg">
                Order in advance and get the best products at the lowest
                prices.
              </p>

              <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-sm text-gray-700 sm:text-[15px]"
                  >
                    <CheckIcon />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button className="mt-8 flex items-center gap-3 rounded-2xl bg-[var(--color-primary)] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110 sm:mt-10 sm:px-8 sm:py-4 sm:text-lg">
                <CartBoxIcon />
                Pre-Order Now
              </button>
            </div>

            {/* Vegetable Basket Image */}
            <div className="relative z-10 mx-auto mt-8 w-full max-w-[320px] sm:mt-10 sm:max-w-[380px] lg:absolute lg:right-[-60px] lg:bottom-[180px] lg:mt-0 lg:w-[460px] lg:max-w-none">
              <Image
                src="/box1.png"
                alt="GreenBasket fresh vegetables"
                width={620}
                height={520}
                className="h-auto w-full drop-shadow-2xl"
                priority
              />

              {/* small SVG vegetable / leaf accents around the basket */}
              <TomatoIcon className="absolute -left-3 top-2 hidden sm:block" size={26} rotate={-10} />
              <LeafSprigIcon className="absolute -top-4 left-1/3 hidden sm:block" size={22} rotate={-25} />
              <LeafSprigIcon className="absolute -bottom-3 right-6 hidden sm:block" size={26} rotate={50} />
              <TomatoIcon className="absolute right-70 bottom-10 hidden sm:block" size={20} rotate={15} />
            </div>
          </div>

          {/* ==================== RIGHT SIDE ==================== */}
          <div className="col-span-1 border-t border-gray-100 bg-[#fafdfc] px-5 py-8 sm:px-8 sm:py-12 lg:col-span-2 lg:border-l lg:border-t-0 lg:px-8 lg:py-16">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f5e8] sm:h-12 sm:w-12">
                <ClockIcon size={24} />
              </div>
              <h2 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Choose Your
                <br />
                Delivery Time
              </h2>
            </div>

            {/* Day Toggle */}
            <div className="mt-6 inline-flex w-full rounded-2xl bg-gray-100 p-1.5 sm:mt-8">
              <button
                onClick={() => setDay('today')}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all sm:py-3 ${
                  day === 'today'
                    ? 'bg-white text-[var(--color-primary)] shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDay('tomorrow')}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all sm:py-3 ${
                  day === 'tomorrow'
                    ? 'bg-white text-[var(--color-primary)] shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tomorrow
              </button>
            </div>

           {/* Time Slots */}
<div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
  {timeSlots.map((slot) => {
    const isSelected = selectedSlot === slot.id;
    return (
      <button
        key={slot.id}
        onClick={() => setSelectedSlot(slot.id)}
        className={`relative rounded-2xl border p-4 text-left transition-all hover:border-[var(--color-primary)] sm:p-5 ${
          isSelected
            ? 'border-[var(--color-primary)] bg-white shadow-md'
            : 'border-gray-200 bg-white'
        }`}
      >
        {isSelected && (
          <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
            <CheckBadge />
          </div>
        )}

        <div className="flex items-start gap-3">
          <ClockIcon 
            color={isSelected ? 'var(--color-primary)' : '#94a3b8'} 
            size={20} 
          />
          
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 sm:text-base">
              {slot.range}
            </p>
            <p className="text-xs text-gray-500 sm:text-sm mt-0.5">
              {slot.label}
            </p>
          </div>
        </div>
      </button>
    );
  })}
</div>

            {/* Info Box */}
            <div className="mt-6 flex gap-3 rounded-2xl bg-[#f0f9f0] p-4 sm:mt-8">
              <InfoIcon />
              <p className="text-xs text-[#2f6b34] sm:text-sm">
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