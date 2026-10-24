'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  FiX,
  FiRepeat,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiUser,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiMessageSquare,
  FiLock,
  FiLogIn,
} from 'react-icons/fi';
import { useCreateSubscriptionMutation } from '@/redux/api/subscriptionApi';
import { useGetMeQuery } from '@/redux/api/authApi';
import toast from 'react-hot-toast';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    _id: string;
    name: string;
    thumbnail: string;
    regularPrice: number;
    salePrice?: number;
    subscriptionPrice?: number;
    subscriptionDiscountPercent?: number;
    subscriptionFrequency?: 'weekly' | 'monthly' | 'both';
    frequency?: 'weekly' | 'monthly' | 'both';
    variantID?: string;
    variantName?: string;
    items?: any[];
    idealFor?: string;
    category?: string;
  } | null;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  product,
}: SubscriptionModalProps) {
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const isAuthenticated = authStatus === 'authenticated' && !!session?.user;

  // Fetch full user profile if logged in
  const { data: meResponse } = useGetMeQuery(undefined, { skip: !isAuthenticated });
  const userProfile = meResponse?.data;

  // Fixed frequency based on package definition
  const frequency: 'weekly' | 'monthly' =
    product?.frequency === 'weekly' || product?.subscriptionFrequency === 'weekly'
      ? 'weekly'
      : 'monthly';

  const defaultDay =
    frequency === 'weekly' ? 'Every Friday (8 AM - 12 PM)' : '1st to 3rd of every month (Post-salary)';

  const [preferredDay, setPreferredDay] = useState(defaultDay);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  // Reset or pre-fill user info when modal opens
  useEffect(() => {
    if (isOpen) {
      setPreferredDay(defaultDay);
      if (userProfile) {
        const name = userProfile.fullName || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim();
        if (name) setCustomerName(name);
        if (userProfile.phoneNumber) setCustomerPhone(userProfile.phoneNumber);
        if (userProfile.shippingAddress?.addressLine) {
          setDeliveryAddress(userProfile.shippingAddress.addressLine);
        }
      } else if (session?.user) {
        const u: any = session.user;
        const name = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name || '';
        if (name) setCustomerName(name);
        if (u.phoneNumber) setCustomerPhone(u.phoneNumber);
      }
    }
  }, [isOpen, userProfile, session, defaultDay]);

  if (!isOpen || !product) return null;

  const basePrice = product.salePrice || product.subscriptionPrice || product.regularPrice;
  const totalPerDelivery = basePrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login first to subscribe');
      return;
    }

    if (!customerName.trim()) {
      return toast.error('Please enter your full name');
    }
    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      return toast.error('Please enter a valid 11-digit mobile number');
    }
    if (!deliveryAddress.trim()) {
      return toast.error('Please provide your complete delivery address');
    }

    try {
      const payload: any = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        deliveryInstructions: deliveryInstructions.trim(),
        productID: product._id,
        productName: product.name,
        productThumbnail: product.thumbnail,
        variantID: product.variantID,
        variantName: product.variantName,
        quantity: 1,
        regularPrice: product.regularPrice || basePrice,
        discountedPrice: totalPerDelivery,
        deliveryFee: 0,
        totalPerDelivery: totalPerDelivery,
        frequency: frequency,
        preferredDeliveryDay: preferredDay,
        paymentPreference: 'cod',
        userID: (session?.user as any)?.id || (session?.user as any)?._id,
      };

      await createSubscription(payload).unwrap();
      setIsSuccess(true);
      toast.success('Your subscription has been confirmed successfully!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create subscription, please try again');
    }
  };

  const handleWhatsAppConfirm = () => {
    const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801604321819';
    const message = encodeURIComponent(
      `Hello SobjiHaat! I have placed a recurring subscription order:\n\n` +
      `📦 Package: ${product.name} ${product.variantName ? `(${product.variantName})` : ''}\n` +
      `🔄 Schedule: ${frequency === 'weekly' ? 'Weekly' : 'Monthly'} (${preferredDay})\n` +
      `💰 Amount Per Delivery: ৳${totalPerDelivery} (Cash on Delivery)\n` +
      `👤 Name: ${customerName}\n` +
      `📱 Phone: ${customerPhone}\n` +
      `📍 Address: ${deliveryAddress}\n\n` +
      `Please confirm my subscription schedule. Thank you!`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank');
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const handleRedirectToLogin = () => {
    const returnUrl = typeof window !== 'undefined' ? window.location.href : '/';
    router.push(`/login?callbackUrl=${encodeURIComponent(returnUrl)}`);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-gray-200">
        {/* Clean Header Without Heavy Background */}
        <div className="px-6 py-5 border-b border-gray-150 flex items-center justify-between bg-white relative">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-gray-100 text-gray-800">
              <FiRepeat className="text-lg text-[var(--color-primary)]" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full inline-block mb-0.5">
                SobjiHaat Auto-Delivery
              </span>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">
                {isSuccess ? 'Subscription Confirmed!' : 'Set Up Your Subscription'}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all cursor-pointer"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                <FiCheckCircle />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">Congratulations {customerName}!</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your subscription for{' '}
                  <span className="font-bold text-[var(--color-primary)]">
                    &ldquo;{product.name}&rdquo;
                  </span>{' '}
                  has been scheduled successfully.
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-4 text-left space-y-2 text-xs text-gray-700 bg-gray-50">
                <div className="flex justify-between border-b border-gray-200/80 pb-2">
                  <span className="text-gray-500">Delivery Cycle:</span>
                  <span className="font-bold text-gray-900 capitalize">
                    {frequency === 'weekly' ? 'Weekly' : 'Monthly'} ({preferredDay})
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/80 pb-2">
                  <span className="text-gray-500">Amount Per Delivery:</span>
                  <span className="font-extrabold text-sm text-[var(--color-primary)]">
                    ৳{totalPerDelivery}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/80 pb-2">
                  <span className="text-gray-500">Delivery Charge:</span>
                  <span className="font-bold uppercase text-[var(--color-primary)]">
                    FREE (৳0)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="font-bold text-gray-900">
                    Cash on Delivery (COD)
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Our support team will contact you via WhatsApp / Call 24 hours prior to each delivery cycle.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppConfirm}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FiMessageSquare size={18} />
                  <span>Send WhatsApp Confirmation</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : !isAuthenticated ? (
            /* Auth Guard: User must be logged in to subscribe */
            <div className="text-center py-6 px-3 space-y-4">
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl bg-amber-50 text-amber-600 border border-amber-200">
                <FiLock />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  সাবস্ক্রিপশন নিতে লগইন করুন
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  সাবস্ক্রিপশন প্যাকেজ অর্ডার করতে এবং নিয়মিত মাসিক ডেলিভারি ও বিল ট্র্যাক করতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।
                </p>
              </div>

              {/* Compact Plan Preview */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200 max-w-sm mx-auto text-left">
                <img
                  src={product.thumbnail || '/images/monthly_cleaning_box.jpg'}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-xl border border-gray-200"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 text-xs truncate">{product.name}</h4>
                  <p className="text-xs font-black text-[var(--color-primary)]">
                    ৳{totalPerDelivery} / {frequency === 'weekly' ? 'week' : 'month'}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={handleRedirectToLogin}
                  className="flex-1 py-3 px-5 rounded-xl bg-[var(--color-primary)] hover:bg-[#52861c] text-white font-bold text-sm shadow-md shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FiLogIn size={16} />
                  <span>লগইন করুন / Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="py-3 px-5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  রেজিস্ট্রেশন
                </button>
              </div>
            </div>
          ) : (
            /* Setup Form for Authenticated User */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product preview strip */}
              <div className="flex items-center gap-3.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                <img
                  src={product.thumbnail || '/images/monthly_cleaning_box.jpg'}
                  alt={product.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                    {frequency === 'weekly' ? 'Weekly Delivery' : 'Monthly Delivery'} • Free Doorstep Delivery
                  </span>
                  <h4 className="font-extrabold text-gray-900 text-sm truncate">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-black text-gray-900">৳{totalPerDelivery}</span>
                    <span className="text-xs text-gray-500 font-medium">
                      / {frequency === 'weekly' ? 'week' : 'month'}
                    </span>
                    {product.regularPrice > totalPerDelivery && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{product.regularPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Window / Day */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 flex items-center gap-1.5">
                  <FiCalendar className="text-[var(--color-primary)]" /> Preferred Delivery Window / Day
                </label>
                <select
                  value={preferredDay}
                  onChange={(e) => setPreferredDay(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
                >
                  {frequency === 'monthly' ? (
                    <>
                      <option value="1st to 3rd of every month (Post-salary)">
                        1st to 3rd of every month (Post-salary)
                      </option>
                      <option value="5th to 7th of every month">5th to 7th of every month</option>
                      <option value="10th to 12th of every month">10th to 12th of every month</option>
                      <option value="Mid-Month (15th to 18th)">Mid-month (15th to 18th)</option>
                    </>
                  ) : (
                    <>
                      <option value="Every Friday (8 AM - 12 PM)">
                        Every Friday (8:00 AM – 12:00 PM)
                      </option>
                      <option value="Every Sunday (9 AM - 1 PM)">
                        Every Sunday (9:00 AM – 1:00 PM)
                      </option>
                      <option value="Every Tuesday (9 AM - 1 PM)">
                        Every Tuesday (9:00 AM – 1:00 PM)
                      </option>
                    </>
                  )}
                </select>
              </div>

              {/* Customer Information (Pre-filled from logged in user) */}
              <div className="space-y-3 pt-1 border-t border-gray-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                      <FiUser className="text-[var(--color-primary)]" /> Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saiful Islam"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                      <FiPhone className="text-[var(--color-primary)]" /> Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                    <FiMapPin className="text-[var(--color-primary)]" /> Complete Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Apartment no, Street, Area, Landmark"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Any specific instructions for rider (Optional)"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Payment Method - Simple Cash on Delivery */}
              <div className="pt-2 border-t border-gray-150">
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Payment Method (মূল্য পরিশোধ পদ্ধতি)
                </label>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-emerald-200 bg-emerald-50/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Cash on Delivery (COD) - ক্যাশ অন ডেলিভারি
                    </p>
                    <p className="text-[11px] text-gray-500">
                      প্রতিটি ডেলিভারির পর পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 px-1 pt-1">
                <span className="flex items-center gap-1">
                  <FiShield className="text-[var(--color-primary)]" /> Pause or cancel anytime
                </span>
                <span className="flex items-center gap-1">
                  <FiTruck className="text-[var(--color-primary)]" /> 100% Free Doorstep Delivery
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[var(--color-primary)] hover:bg-[#52861c] text-white font-extrabold text-sm shadow-md shadow-[var(--color-primary)]/20 transition-all transform active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiRepeat size={18} className={isLoading ? 'animate-spin' : ''} />
                <span>
                  {isLoading
                    ? 'সাবস্ক্রিপশন প্রসেসিং হচ্ছে...'
                    : `Confirm Subscription · ৳${totalPerDelivery}`}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
