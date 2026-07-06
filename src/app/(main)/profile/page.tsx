'use client';

import React, { useState, useEffect } from 'react';
import { useGetMeQuery, useUpdateProfileMutation } from '@/redux/api/authApi';
import { FiUser, FiPhone, FiMapPin, FiCamera, FiSave, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetMeQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const user = data?.data;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Load data when user is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        addressLine: user.shippingAddress?.addressLine || '',
        city: user.shippingAddress?.city || '',
        state: user.shippingAddress?.state || '',
        postalCode: user.shippingAddress?.postalCode || '',
      });
      setPreviewUrl(user.avatar?.url || '');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
    if (avatarFile) form.append('avatar', avatarFile);

    try {
      await updateProfile(form).unwrap();
      alert('Profile updated successfully!');
      refetch(); // Refresh user data
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-2xl">
            <FiArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Avatar Section */}
          <div className="h-40 bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 relative">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-28 h-28 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-white">
                  <img
                    src={previewUrl || '/default-avatar.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-1 right-1 bg-white w-8 h-8 rounded-2xl shadow flex items-center justify-center cursor-pointer hover:bg-gray-100">
                  <FiCamera size={18} className="text-gray-600" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl py-3 px-4 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl py-3 px-4 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl py-3 pl-11 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">Address</label>
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="House No, Road, Block"
                  className="w-full border border-gray-200 rounded-2xl py-3 px-4 focus:border-[var(--color-primary)] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl py-3 px-4 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1.5">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl py-3 px-4 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1.5">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl py-3 px-4 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full mt-8 bg-[var(--color-primary)] hover:bg-opacity-90 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                <FiSave size={18} />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;