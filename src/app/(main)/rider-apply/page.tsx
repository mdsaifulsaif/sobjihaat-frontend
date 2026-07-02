'use client';

import React, { useState } from 'react';
import { useApplyForRiderMutation } from '@/redux/api/riderApi';
import toast from 'react-hot-toast';
import { FiUpload, FiMapPin, FiUser, FiPhone, FiCreditCard, FiTruck } from 'react-icons/fi';

const RiderApplyForm = () => {
  const [applyForRider, { isLoading }] = useApplyForRiderMutation();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    nidNumber: '',
    vehicleType: '',
    vehicleNumber: '',
    preferredAreas: [] as string[],
  });

  const [nidImage, setNidImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNidImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nidImage) {
      toast.error("NID ছবি আপলোড করুন");
      return;
    }

    const formPayload = {
      fullName: formData.fullName,
      phone: formData.phone,
      nidNumber: formData.nidNumber,
      vehicleType: formData.vehicleType,
      vehicleNumber: formData.vehicleNumber,
      preferredAreas: JSON.stringify(formData.preferredAreas),
    };

    const files = { nidImage: [nidImage] };

    try {
      await applyForRider({ body: formPayload, files }).unwrap();
      toast.success("আপনার আবেদন সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করবো।");
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        nidNumber: '',
        vehicleType: '',
        vehicleNumber: '',
        preferredAreas: [],
      });
      setNidImage(null);
      setPreview(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "আবেদন জমা দিতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Become a Rider</h2>
        <p className="text-gray-600 mt-2">Join our delivery team and earn with us</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[var(--color-primary)] transition">
            <FiUser className="text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="flex-1 bg-transparent outline-none text-gray-900"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[var(--color-primary)] transition">
            <FiPhone className="text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="flex-1 bg-transparent outline-none text-gray-900"
              placeholder="01XXXXXXXXX"
            />
          </div>
        </div>

        {/* NID Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[var(--color-primary)] transition">
            <FiCreditCard className="text-gray-400" />
            <input
              type="text"
              name="nidNumber"
              value={formData.nidNumber}
              onChange={handleInputChange}
              required
              className="flex-1 bg-transparent outline-none text-gray-900"
              placeholder="Enter NID number"
            />
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[var(--color-primary)] transition"
            >
              <option value="">Select Vehicle</option>
              <option value="bike">Bike</option>
              <option value="bicycle">Bicycle</option>
              <option value="van">Van</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[var(--color-primary)] transition"
              placeholder="e.g. Dhaka Metro-GA-1234"
            />
          </div>
        </div>

        {/* NID Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload NID Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[var(--color-primary)] transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="nid-upload"
            />
            <label htmlFor="nid-upload" className="cursor-pointer">
              {preview ? (
                <img src={preview} alt="NID Preview" className="mx-auto h-40 object-contain" />
              ) : (
                <div>
                  <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-600">Click to upload NID image</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[var(--color-primary)] hover:bg-[#4a7c1c] text-white py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985] disabled:opacity-70"
        >
          {isLoading ? "Submitting Application..." : "Submit Rider Application"}
        </button>
      </form>
    </div>
  );
};

export default RiderApplyForm;