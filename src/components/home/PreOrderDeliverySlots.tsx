"use client"

import React, { useState } from 'react';
import Image from 'next/image'; // If using Next.js, otherwise use an <img> tag

// Mock Icons to represent the ones in the image.
// In a real project, you'd use your own SVG files or a library like 'lucide-react'
const CheckCircleIcon = ({ isChecked }: { isChecked: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={`w-5 h-5 ${isChecked ? 'text-theme-primary' : 'text-theme-text-muted'}`}
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-12 h-12 text-theme-text-muted"
    strokeWidth="1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-10 h-10 text-theme-primary"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

interface DeliverySlot {
  id: string;
  timeRange: string;
  type: 'Fast Delivery' | 'Standard Delivery';
}

const PreOrderDeliverySlots: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow'>('Today');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot1'); // Default select first slot

  const deliverySlots: DeliverySlot[] = [
    { id: 'slot1', timeRange: '8:00 AM - 10:00 AM', type: 'Fast Delivery' },
    { id: 'slot2', timeRange: '10:00 AM - 12:00 PM', type: 'Fast Delivery' },
    { id: 'slot3', timeRange: '2:00 PM - 4:00 PM', type: 'Standard Delivery' },
    { id: 'slot4', timeRange: '6:00 PM - 8:00 PM', type: 'Standard Delivery' },
  ];

  const preOrderFeatures = [
    'Next Morning Delivery',
    'Bulk & Festival Orders',
    'Fresh from Market Collection',
    'Best Price Guaranteed',
  ];

  return (
    <div className="font-poppins bg-theme-surface p-6 md:p-10 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Pre-Order Info */}
        <div className="flex flex-col md:flex-row lg:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            <h2 className="font-heading text-4xl font-bold text-theme-text-primary">
              Pre-Order & Save More at Sobjihaat!
            </h2>
            <p className="text-base text-theme-text-secondary leading-relaxed">
              Order in advance and get the best products at the lowest prices.
            </p>

            <ul className="space-y-3.5 pt-2">
              {preOrderFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircleIcon isChecked={true} />
                  <span className="text-sm font-medium text-theme-text-primary">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <button
                className="btn hover-lift text-white transition-all duration-300"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Pre-Order Now
              </button>
            </div>
          </div>

          <div className="w-full md:w-[280px] lg:w-[280px] flex-shrink-0 relative">
            <div className="relative aspect-[3/4] p-4 bg-theme-background border border-slate-100 rounded-xl shadow-sm">
              <Image
                src="/path/to/your/bag-and-veg-image.png" // Replace with your image path
                alt="GreenBasket Delivery Bag with Vegetables"
                layout="fill"
                objectFit="contain"
                className="p-3"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Delivery Time Selection */}
        <div className="space-y-6">
          <h3 className="font-heading text-3xl font-bold text-theme-text-primary">
            Choose Your Delivery Time
          </h3>

          {/* Day Selection (Today/Tomorrow) */}
          <div className="flex items-center gap-4 border border-slate-100 rounded-xl p-2 bg-theme-background w-fit">
            {(['Today', 'Tomorrow'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  selectedDay === day
                    ? 'text-white'
                    : 'text-theme-text-primary bg-theme-surface hover:bg-slate-100'
                }`}
                style={
                  selectedDay === day
                    ? { backgroundColor: 'var(--color-primary)' }
                    : {}
                }
              >
                {day}
              </button>
            ))}
          </div>

          {/* Time Slot Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverySlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlotId(slot.id)}
                className={`relative p-5 rounded-xl border transition-all text-left ${
                  selectedSlotId === slot.id
                    ? 'border-theme-primary bg-white'
                    : 'border-slate-200 bg-theme-surface hover:border-theme-primary/30'
                }`}
              >
                {selectedSlotId === slot.id && (
                  <div className="absolute top-3 right-3 text-theme-primary">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                )}
                <p className="text-xl font-bold text-theme-text-primary">
                  {slot.timeRange}
                </p>
                <p className="text-sm font-medium text-theme-text-muted mt-1">
                  {slot.type}
                </p>
              </button>
            ))}
          </div>

          {/* 3D Icons Group (Calendar & Clock) */}
          <div className="relative pt-6 flex flex-col items-center gap-10">
            {/* These would be images of the 3D icons, placed absolutely to match your layout */}
            <div className="absolute -left-10 top-10 flex gap-4 items-center">
              <CalendarIcon />
              <div className="flex flex-col items-center -rotate-12 translate-y-10">
                <ClockIcon />
              </div>
            </div>

            {/* If using Next.js for absolute placed 3D icons as in image, it would be something like: */}
            {/*
            <div className="absolute -left-20 top-10 w-32 h-32">
                <Image src="/path/to/3d-calendar.png" alt="3D Calendar" layout="fill" />
            </div>
            <div className="absolute left-10 bottom-0 w-24 h-24">
                <Image src="/path/to/3d-clock.png" alt="3D Clock" layout="fill" />
            </div>
            */}
          </div>
        </div>
      </div>

      {/* Confirmation Text */}
      <div className="mt-10 flex items-center gap-2.5">
        <CheckCircleIcon isChecked={true} />
        <p className="text-sm font-medium text-theme-text-primary">
          We'll deliver your order in your selected time slot
        </p>
      </div>
    </div>
  );
};

export default PreOrderDeliverySlots;