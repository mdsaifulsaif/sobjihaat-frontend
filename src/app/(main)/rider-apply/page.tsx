"use client";

import React, { useState } from 'react';
import { useRouter }  from 'next/navigation';
import { FiUpload, FiArrowLeft, FiCheck, FiX, FiMapPin } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useApplyForRiderMutation } from '@/redux/api/riderApi';
import { useGetAllAreasQuery } from '@/redux/api/areaApi';

const RiderApplyForm = () => {
  const router = useRouter();
  const [applyForRider, { isLoading }] = useApplyForRiderMutation();
  const { data: areasResponse } = useGetAllAreasQuery({});

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    nidNumber: '',
    vehicleType: 'motorcycle',
    vehicleNumber: '',
    preferredAreas: [] as string[],
  });

  const [nidImage, setNidImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
  const [areaSearch, setAreaSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle area selection instead of using multiple select
  const toggleArea = (area: any) => {
    const exists = selectedAreas.find(a => a._id === area._id);
    if (exists) {
      const updated = selectedAreas.filter(a => a._id !== area._id);
      setSelectedAreas(updated);
      setFormData(prev => ({ 
        ...prev, 
        preferredAreas: updated.map(a => a._id) 
      }));
    } else {
      const updated = [...selectedAreas, area];
      setSelectedAreas(updated);
      setFormData(prev => ({ 
        ...prev, 
        preferredAreas: updated.map(a => a._id) 
      }));
    }
  };

  const removeArea = (id: string) => {
    const updated = selectedAreas.filter(a => a._id !== id);
    setSelectedAreas(updated);
    setFormData(prev => ({ 
      ...prev, 
      preferredAreas: updated.map(a => a._id) 
    }));
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

    if (!nidImage) return toast.error("NID Image is required");
    if (formData.preferredAreas.length === 0) return toast.error("Please select at least one area");

    const submitData = {
      body: formData,
      files: { nidImage: [nidImage] }
    };

    try {
      await applyForRider(submitData).unwrap();
      toast.success("Application submitted successfully!");
      router.push('/dashboard/rider/my-application');
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit application");
    }
  };

  // Filter areas based on search
  const filteredAreas = areasResponse?.data?.filter((area: any) =>
    area.name.toLowerCase().includes(areaSearch.toLowerCase())
  ) || [];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header with gradient background */}
      <div className="px-8 py-10 bg-gradient-to-r from-[var(--color-primary)] to-[#4a7c1c]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all text-white"
          >
            <FiArrowLeft size={26} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Apply as Rider</h1>
            <p className="text-white/80 mt-1">Join our delivery team and start earning</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Personal Information Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                placeholder="Karim Hossain"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                placeholder="01712345678"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">NID Number *</label>
              <input
                type="text"
                name="nidNumber"
                value={formData.nidNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                placeholder="1234567890123"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Information Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
            Vehicle Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Type *</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
              >
                <option value="motorcycle">Motorcycle</option>
                <option value="bicycle">Bicycle</option>
                <option value="van">Van</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Number *</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                placeholder="Dhaka-METRO-GA-12-3456"
              />
            </div>
          </div>
        </div>

        {/* NID Image Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
            Document Upload
          </h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">NID Image (Front Side) *</label>
            <div 
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                preview ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-300 hover:border-[var(--color-primary)]'
              }`}
            >
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="nidImage" />
              <label htmlFor="nidImage" className="cursor-pointer flex flex-col items-center">
                {preview ? (
                  <div className="relative w-full max-w-md mx-auto">
                    <img src={preview} alt="NID Preview" className="w-full h-48 object-cover rounded-xl" />
                    <div className="mt-3 text-sm text-gray-600">Click to change image</div>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                      <FiUpload className="text-3xl text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-700">Upload NID Photo</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG (Max 5MB)</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Preferred Areas Section - Improved */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
            Preferred Delivery Areas *
          </h2>
          
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={areaSearch}
                onChange={(e) => setAreaSearch(e.target.value)}
                placeholder="Search for areas..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Area Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
              {filteredAreas.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  {areaSearch ? 'No areas found' : 'No areas available'}
                </div>
              ) : (
                filteredAreas.map((area: any) => {
                  const isSelected = selectedAreas.some(a => a._id === area._id);
                  return (
                    <button
                      key={area._id}
                      type="button"
                      onClick={() => toggleArea(area)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                        isSelected
                          ? 'bg-[var(--color-primary)] text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{area.name}</span>
                        {isSelected && <FiCheck size={16} className="flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Selected Areas Chips */}
            {selectedAreas.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Selected Areas ({selectedAreas.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedAreas.map((area) => (
                    <div 
                      key={area._id}
                      className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                    >
                      <FiMapPin size={14} />
                      {area.name}
                      <button 
                        type="button" 
                        onClick={() => removeArea(area._id)} 
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors ml-1"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#4a7c1c] hover:from-[#4a7c1c] hover:to-[var(--color-primary)] text-white font-semibold rounded-2xl text-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Application...
            </>
          ) : (
            <>
              Submit Rider Application
              <FiCheck size={22} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RiderApplyForm;