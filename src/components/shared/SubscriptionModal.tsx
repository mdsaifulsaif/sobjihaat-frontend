'use client';

import React, { useState } from 'react';
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
} from 'react-icons/fi';
import { useCreateSubscriptionMutation } from '@/redux/api/subscriptionApi';
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
  const initialFreq =
    product?.frequency === 'weekly' || product?.subscriptionFrequency === 'weekly'
      ? 'weekly'
      : 'monthly';

  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>(initialFreq);
  const [preferredDay, setPreferredDay] = useState(
    initialFreq === 'weekly' ? 'Every Friday (8 AM - 12 PM)' : '1st – 3rd of the Month'
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'cod' | 'bkash'>('cod');
  const [isSuccess, setIsSuccess] = useState(false);

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  if (!isOpen || !product) return null;

  const basePrice = product.salePrice || product.regularPrice;
  const discountPercent = product.subscriptionDiscountPercent || 8;
  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const discountedPrice = basePrice - discountAmount;
  const deliveryFee = 0; // Free delivery for subscribers
  const totalPerDelivery = discountedPrice + deliveryFee;

  const handleFrequencyChange = (newFreq: 'weekly' | 'monthly') => {
    setFrequency(newFreq);
    if (newFreq === 'weekly') {
      setPreferredDay('Every Friday (8 AM - 12 PM)');
    } else {
      setPreferredDay('1st – 3rd of the Month');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      return toast.error('Please enter your full name');
    }
    if (!customerPhone.trim() || customerPhone.replace(/[^0-9]/g, '').length < 11) {
      return toast.error('Please enter a valid 11-digit phone number');
    }
    if (!deliveryAddress.trim()) {
      return toast.error('Please provide your complete delivery address');
    }

    try {
      const payload = {
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
        regularPrice: basePrice,
        discountedPrice: discountedPrice,
        deliveryFee: 0,
        totalPerDelivery: totalPerDelivery,
        frequency: frequency,
        preferredDeliveryDay: preferredDay,
        paymentPreference: paymentPreference,
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
      `Hello SobjiHut! I have placed a recurring subscription order:\n\n` +
      `📦 Package: ${product.name} ${product.variantName ? `(${product.variantName})` : ''}\n` +
      `🔄 Schedule: ${frequency === 'weekly' ? 'Weekly' : 'Monthly'} (${preferredDay})\n` +
      `💰 Amount Per Delivery: ৳${totalPerDelivery} (Free Shipping)\n` +
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

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border"
        style={{ borderColor: 'color-mix(in srgb, var(--color-primary, #619d23) 25%, transparent)' }}
      >
        {/* Header Strip */}
        <div 
          className="p-5 text-white relative shadow-sm"
          style={{ background: 'linear-gradient(135deg, var(--color-primary, #619d23), color-mix(in srgb, var(--color-primary, #619d23) 80%, black))' }}
        >
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <FiX size={20} />
          </button>

          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <FiRepeat className="text-white text-lg animate-spin-slow" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-0.5">
                SobjiHut Auto-Delivery
              </span>
              <h2 className="text-xl font-black text-white">
                {isSuccess ? 'Subscription Confirmed!' : 'Set Up Your Subscription'}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div 
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl shadow-inner"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary, #619d23) 12%, transparent)',
                  color: 'var(--color-primary, #619d23)'
                }}
              >
                <FiCheckCircle />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">Congratulations {customerName}!</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your subscription for <span className="font-bold" style={{ color: 'var(--color-primary, #619d23)' }}>"{product.name}"</span> has been scheduled successfully.
                </p>
              </div>

              <div 
                className="border rounded-2xl p-4 text-left space-y-2 text-xs text-gray-700"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary, #619d23) 8%, white)',
                  borderColor: 'color-mix(in srgb, var(--color-primary, #619d23) 22%, transparent)'
                }}
              >
                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Delivery Cycle:</span>
                  <span className="font-bold text-gray-900 capitalize">
                    {frequency === 'weekly' ? 'Weekly' : 'Monthly'} ({preferredDay})
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Amount Per Delivery:</span>
                  <span className="font-extrabold text-sm" style={{ color: 'var(--color-primary, #619d23)' }}>৳{totalPerDelivery}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Delivery Charge:</span>
                  <span className="font-bold uppercase" style={{ color: 'var(--color-primary, #619d23)' }}>FREE (৳0)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="font-bold text-gray-900 uppercase">
                    {paymentPreference === 'cod' ? 'Cash on Delivery' : 'bKash on Delivery'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Our support team will notify you via SMS or WhatsApp 24 hours prior to each delivery.
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
          ) : (
            /* Setup Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product preview strip */}
              <div className="flex items-center gap-3.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <img
                  src={product.thumbnail || '/placeholder.png'}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-gray-900 text-sm truncate">{product.name}</h4>
                  {product.variantName && (
                    <span className="text-xs font-bold block" style={{ color: 'var(--color-primary, #619d23)' }}>
                      Size: {product.variantName}
                    </span>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black" style={{ color: 'var(--color-primary, #619d23)' }}>৳{discountedPrice}</span>
                    <span className="text-xs text-gray-400 line-through">৳{basePrice}</span>
                    <span 
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-primary, #619d23) 12%, transparent)',
                        color: 'var(--color-primary, #619d23)'
                      }}
                    >
                      {discountPercent}% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Package Items Checklist (if available) */}
              {product.items && product.items.length > 0 && (
                <div 
                  className="border rounded-2xl p-3.5 space-y-2"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-primary, #619d23) 8%, white)',
                    borderColor: 'color-mix(in srgb, var(--color-primary, #619d23) 22%, transparent)'
                  }}
                >
                  <span className="text-[11px] font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FiCheckCircle style={{ color: 'var(--color-primary, #619d23)' }} />
                    Items Included in this Box ({product.items.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {product.items.map((it: any, idx: number) => {
                      const itemText =
                        typeof it === "string"
                          ? it
                          : it.quantity
                          ? `${it.itemName} (${it.quantity})`
                          : it.itemName;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs text-gray-700 bg-white/90 px-2 py-1 rounded-lg border"
                          style={{ borderColor: 'color-mix(in srgb, var(--color-primary, #619d23) 18%, transparent)' }}
                        >
                          <span 
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: 'var(--color-primary, #619d23)' }}
                          ></span>
                          <span className="truncate">{itemText}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 1: Frequency Selector */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2 flex items-center gap-1.5">
                  <FiRepeat style={{ color: 'var(--color-primary, #619d23)' }} /> How often would you like delivery?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleFrequencyChange('monthly')}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      frequency === 'monthly'
                        ? 'shadow-xs'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    style={frequency === 'monthly' ? {
                      borderColor: 'var(--color-primary, #619d23)',
                      backgroundColor: 'color-mix(in srgb, var(--color-primary, #619d23) 8%, white)'
                    } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">Monthly</span>
                      {frequency === 'monthly' && <FiCheckCircle style={{ color: 'var(--color-primary, #619d23)' }} />}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">1 automated delivery per month</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFrequencyChange('weekly')}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      frequency === 'weekly'
                        ? 'shadow-xs'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    style={frequency === 'weekly' ? {
                      borderColor: 'var(--color-primary, #619d23)',
                      backgroundColor: 'color-mix(in srgb, var(--color-primary, #619d23) 8%, white)'
                    } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">Weekly</span>
                      {frequency === 'weekly' && <FiCheckCircle style={{ color: 'var(--color-primary, #619d23)' }} />}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Fresh items delivered weekly</p>
                  </button>
                </div>
              </div>

              {/* Step 2: Preferred Delivery Time/Day */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2 flex items-center gap-1.5">
                  <FiCalendar style={{ color: 'var(--color-primary, #619d23)' }} /> Preferred Delivery Window / Day
                </label>
                <select
                  value={preferredDay}
                  onChange={(e) => setPreferredDay(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 outline-none focus:ring-2 focus:ring-primary"
                >
                  {frequency === 'monthly' ? (
                    <>
                      <option value="1st – 3rd of the Month">1st to 3rd of every month (Post-salary)</option>
                      <option value="5th – 7th of the Month">5th to 7th of every month</option>
                      <option value="10th – 12th of the Month">10th to 12th of every month</option>
                      <option value="Mid-Month (15th – 18th)">Mid-month (15th to 18th)</option>
                    </>
                  ) : (
                    <>
                      <option value="Every Friday (8 AM - 12 PM)">Every Friday (8:00 AM – 12:00 PM)</option>
                      <option value="Every Sunday (9 AM - 1 PM)">Every Sunday (9:00 AM – 1:00 PM)</option>
                      <option value="Every Tuesday (9 AM - 1 PM)">Every Tuesday (9:00 AM – 1:00 PM)</option>
                    </>
                  )}
                </select>
              </div>

              {/* Step 3: Customer Information */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                      <FiUser style={{ color: 'var(--color-primary, #619d23)' }} /> Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saiful Islam"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                      <FiPhone style={{ color: 'var(--color-primary, #619d23)' }} /> Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                    <FiMapPin style={{ color: 'var(--color-primary, #619d23)' }} /> Complete Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Apartment no, Street, Area, Landmark"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary bg-white"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Any specific instructions for our delivery rider (Optional)"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Step 4: Payment preference */}
              <div className="pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Payment Method (Pay Upon Each Delivery)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentPreference === 'cod'}
                      onChange={() => setPaymentPreference('cod')}
                      style={{ accentColor: 'var(--color-primary, #619d23)' }}
                    />
                    <span className="text-xs font-bold text-gray-800">Cash on Delivery (COD)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentPreference === 'bkash'}
                      onChange={() => setPaymentPreference('bkash')}
                      style={{ accentColor: 'var(--color-primary, #619d23)' }}
                    />
                    <span className="text-xs font-bold text-gray-800">bKash (On Delivery)</span>
                  </label>
                </div>
              </div>

              {/* Price Calculation Summary Strip */}
              <div 
                className="border rounded-2xl p-3.5 space-y-1.5 text-xs"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary, #619d23) 8%, white)',
                  borderColor: 'color-mix(in srgb, var(--color-primary, #619d23) 22%, transparent)'
                }}
              >
                <div className="flex justify-between text-gray-600">
                  <span>Regular Package Price:</span>
                  <span>৳{basePrice}</span>
                </div>
                <div className="flex justify-between font-bold" style={{ color: 'var(--color-primary, #619d23)' }}>
                  <span>Subscriber Discount ({discountPercent}%):</span>
                  <span>-৳{discountAmount}</span>
                </div>
                <div className="flex justify-between font-bold" style={{ color: 'var(--color-primary, #619d23)' }}>
                  <span>Delivery Charge:</span>
                  <span className="uppercase">FREE (৳0)</span>
                </div>
                <div 
                  className="border-t pt-1.5 flex justify-between items-center text-gray-900 font-black text-sm"
                  style={{ borderColor: 'color-mix(in srgb, var(--color-primary, #619d23) 20%, transparent)' }}
                >
                  <span>Total Amount per Delivery:</span>
                  <span className="text-base" style={{ color: 'var(--color-primary, #619d23)' }}>৳{totalPerDelivery}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
                <span className="flex items-center gap-1">
                  <FiShield style={{ color: 'var(--color-primary, #619d23)' }} /> Pause, skip, or cancel anytime
                </span>
                <span className="flex items-center gap-1">
                  <FiTruck style={{ color: 'var(--color-primary, #619d23)' }} /> 100% Free Doorstep Delivery
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl text-white font-extrabold text-sm shadow-lg transition-all transform active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-primary, #619d23)',
                  boxShadow: '0 10px 25px -5px color-mix(in srgb, var(--color-primary, #619d23) 35%, transparent)'
                }}
              >
                <FiRepeat size={18} className={isLoading ? 'animate-spin' : ''} />
                <span>{isLoading ? 'Processing Subscription...' : 'Confirm Subscription'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
