// app/rider-dashboard/payout/request/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiDollarSign,
  FiCreditCard,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiArrowLeft,
  FiInfo,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { useRequestPayoutMutation } from "@/redux/api/payoutApi";
import { useGetMyRiderProfileQuery } from "@/redux/api/riderApi";
import toast from "react-hot-toast";

const RequestPayout = () => {
  const router = useRouter();
  const { data: profileData, isLoading: profileLoading, refetch } = useGetMyRiderProfileQuery({});
  const [requestPayout, { isLoading: isSubmitting }] = useRequestPayoutMutation();

  const profile = profileData?.data;
  const pendingPayout = profile?.pendingPayout || 0;
  const totalEarnings = profile?.totalEarnings || 0;

  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "bkash",
    accountNumber: profile?.phone || "",
    accountHolderName: profile?.fullName || "",
    notes: "",
  });

  const [errors, setErrors] = useState<{ amount?: string; accountNumber?: string }>({});

  // Calculate max withdrawable amount
  const maxWithdraw = pendingPayout;
  const minWithdraw = 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors on change
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { amount?: string; accountNumber?: string } = {};
    
    const amount = parseFloat(formData.amount);
    
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (amount < minWithdraw) {
      newErrors.amount = `Minimum withdrawal is ${minWithdraw} TK`;
    } else if (amount > maxWithdraw) {
      newErrors.amount = `You have only ${maxWithdraw} TK available`;
    }
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const amount = parseFloat(formData.amount);
    
    try {
      await requestPayout({
        amount,
        paymentMethod: formData.paymentMethod,
        accountNumber: formData.accountNumber,
        accountHolderName: formData.accountHolderName,
        notes: formData.notes,
      }).unwrap();
      
      toast.success("✅ Payout request submitted successfully!");
      refetch();
      
      // Redirect after success
      setTimeout(() => {
        router.push("/rider-dashboard/payout");
      }, 1500);
      
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to request payout");
    }
  };

  // Quick amount presets
  const quickAmounts = [100, 200, 500, 1000].filter(amount => amount <= maxWithdraw);

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Request Payout</h1>
          <p className="text-gray-500 mt-1">Withdraw your earnings to your account</p>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-[#5CAF90] to-[#4A9A7D] rounded-2xl p-6 text-white">
          <p className="opacity-90 text-sm">Available Balance</p>
          <p className="text-3xl font-bold">৳{pendingPayout.toLocaleString()}</p>
          <p className="opacity-80 text-xs mt-1">Ready to withdraw</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-2xl font-bold text-gray-800">৳{totalEarnings.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Minimum Withdraw</p>
          <p className="text-2xl font-bold text-gray-800">৳{minWithdraw}</p>
          <p className="text-xs text-gray-400 mt-1">per transaction</p>
        </div>
      </div>

      {/* Quick Amounts */}
      {quickAmounts.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-3">Quick Select Amount</p>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium hover:bg-[#5CAF90]/10 hover:border-[#5CAF90] transition-all"
              >
                ৳{amount}
              </button>
            ))}
            <button
              onClick={() => setFormData(prev => ({ ...prev, amount: maxWithdraw.toString() }))}
              className="px-4 py-2 bg-[#5CAF90]/10 border border-[#5CAF90] rounded-lg text-sm font-medium text-[#5CAF90] hover:bg-[#5CAF90]/20 transition-all"
            >
              Max (৳{maxWithdraw})
            </button>
          </div>
        </div>
      )}

      {/* Payout Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (TK)
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder={`Enter amount (min ${minWithdraw})`}
                className={`w-full pl-10 pr-4 py-3 border ${errors.amount ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#5CAF90] focus:outline-none`}
                min={minWithdraw}
                max={maxWithdraw}
                required
              />
              {errors.amount && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <FiAlertCircle size={12} />
                  {errors.amount}
                </p>
              )}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Min: ৳{minWithdraw}</span>
              <span>Max: ৳{maxWithdraw.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="relative">
              <FiCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5CAF90] focus:outline-none appearance-none bg-white"
              >
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className={`w-full pl-10 pr-4 py-3 border ${errors.accountNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#5CAF90] focus:outline-none`}
                required
              />
              {errors.accountNumber && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <FiAlertCircle size={12} />
                  {errors.accountNumber}
                </p>
              )}
            </div>
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Enter account holder name"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5CAF90] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information for admin"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5CAF90] focus:outline-none resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <FiInfo size={18} className="text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Before you request:</p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>Minimum withdrawal amount is ৳{minWithdraw}</li>
                  <li>Your request will be reviewed by admin</li>
                  <li>Payment usually takes 24-48 hours</li>
                  <li>Make sure your account details are correct</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || pendingPayout < minWithdraw}
              className="flex-1 px-6 py-3 bg-[#5CAF90] text-white rounded-xl font-semibold hover:bg-[#4A9A7D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FiRefreshCw className="animate-spin" size={18} />
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheckCircle size={18} />
                  Submit Request
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {pendingPayout < minWithdraw && (
            <p className="text-center text-sm text-red-500 flex items-center justify-center gap-2">
              <FiAlertCircle size={16} />
              You need at least ৳{minWithdraw} to request a payout. Current balance: ৳{pendingPayout}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestPayout;