// // "use client";

// // import React, { useState } from 'react';
// // import { useRouter }  from 'next/navigation';
// // import { FiUpload, FiArrowLeft, FiCheck, FiX, FiMapPin } from 'react-icons/fi';
// // import { toast } from 'react-hot-toast';
// // import { useApplyForRiderMutation } from '@/redux/api/riderApi';
// // import { useGetAllAreasQuery } from '@/redux/api/areaApi';

// // const RiderApplyForm = () => {
// //   const router = useRouter();
// //   const [applyForRider, { isLoading }] = useApplyForRiderMutation();
// //   const { data: areasResponse } = useGetAllAreasQuery({});

// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     phone: '',
// //     nidNumber: '',
// //     vehicleType: 'motorcycle',
// //     vehicleNumber: '',
// //     preferredAreas: [] as string[],
// //   });

// //   const [nidImage, setNidImage] = useState<File | null>(null);
// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
// //   const [areaSearch, setAreaSearch] = useState('');

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   // Toggle area selection instead of using multiple select
// //   const toggleArea = (area: any) => {
// //     const exists = selectedAreas.find(a => a._id === area._id);
// //     if (exists) {
// //       const updated = selectedAreas.filter(a => a._id !== area._id);
// //       setSelectedAreas(updated);
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         preferredAreas: updated.map(a => a._id) 
// //       }));
// //     } else {
// //       const updated = [...selectedAreas, area];
// //       setSelectedAreas(updated);
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         preferredAreas: updated.map(a => a._id) 
// //       }));
// //     }
// //   };

// //   const removeArea = (id: string) => {
// //     const updated = selectedAreas.filter(a => a._id !== id);
// //     setSelectedAreas(updated);
// //     setFormData(prev => ({ 
// //       ...prev, 
// //       preferredAreas: updated.map(a => a._id) 
// //     }));
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setNidImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!nidImage) return toast.error("NID Image is required");
// //     if (formData.preferredAreas.length === 0) return toast.error("Please select at least one area");

// //     const submitData = {
// //       body: formData,
// //       files: { nidImage: [nidImage] }
// //     };

// //     try {
// //       await applyForRider(submitData).unwrap();
// //       toast.success("Application submitted successfully!");
// //       router.push('/');
// //     } catch (error: any) {
// //       toast.error(error?.data?.message || "Failed to submit application");
// //     }
// //   };

// //   // Filter areas based on search
// //   const filteredAreas = areasResponse?.data?.filter((area: any) =>
// //     area.name.toLowerCase().includes(areaSearch.toLowerCase())
// //   ) || [];

// //   return (
// //     <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
// //       {/* Header with gradient background */}
// //       <div className="px-8 py-10 bg-gradient-to-r from-[var(--color-primary)] to-[#4a7c1c]">
// //         <div className="flex items-center gap-4">
// //           <button 
// //             onClick={() => router.back()} 
// //             className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all text-white"
// //           >
// //             <FiArrowLeft size={26} />
// //           </button>
// //           <div>
// //             <h1 className="text-3xl font-bold text-white">Apply as Rider</h1>
// //             <p className="text-white/80 mt-1">Join our delivery team and start earning</p>
// //           </div>
// //         </div>
// //       </div>

// //       <form onSubmit={handleSubmit} className="p-8 space-y-8">
// //         {/* Personal Information Section */}
// //         <div>
// //           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
// //             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
// //             Personal Information
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
// //               <input
// //                 type="text"
// //                 name="fullName"
// //                 value={formData.fullName}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
// //                 placeholder="Karim Hossain"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
// //               <input
// //                 type="tel"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
// //                 placeholder="01712345678"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-1.5">NID Number *</label>
// //               <input
// //                 type="text"
// //                 name="nidNumber"
// //                 value={formData.nidNumber}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
// //                 placeholder="1234567890123"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Vehicle Information Section */}
// //         <div>
// //           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
// //             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
// //             Vehicle Information
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Type *</label>
// //               <select
// //                 name="vehicleType"
// //                 value={formData.vehicleType}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
// //               >
// //                 <option value="motorcycle">Motorcycle</option>
// //                 <option value="bicycle">Bicycle</option>
// //                 <option value="van">Van</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Number *</label>
// //               <input
// //                 type="text"
// //                 name="vehicleNumber"
// //                 value={formData.vehicleNumber}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
// //                 placeholder="Dhaka-METRO-GA-12-3456"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* NID Image Section */}
// //         <div>
// //           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
// //             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
// //             Document Upload
// //           </h2>
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-1.5">NID Image (Front Side) *</label>
// //             <div 
// //               className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
// //                 preview ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-300 hover:border-[var(--color-primary)]'
// //               }`}
// //             >
// //               <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="nidImage" />
// //               <label htmlFor="nidImage" className="cursor-pointer flex flex-col items-center">
// //                 {preview ? (
// //                   <div className="relative w-full max-w-md mx-auto">
// //                     <img src={preview} alt="NID Preview" className="w-full h-48 object-cover rounded-xl" />
// //                     <div className="mt-3 text-sm text-gray-600">Click to change image</div>
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
// //                       <FiUpload className="text-3xl text-gray-400" />
// //                     </div>
// //                     <p className="font-semibold text-gray-700">Upload NID Photo</p>
// //                     <p className="text-sm text-gray-500 mt-1">PNG, JPG (Max 5MB)</p>
// //                   </>
// //                 )}
// //               </label>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Preferred Areas Section - Improved */}
// //         <div>
// //           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
// //             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
// //             Preferred Delivery Areas *
// //           </h2>
          
// //           <div className="space-y-4">
// //             {/* Search Input */}
// //             <div className="relative">
// //               <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
// //               <input
// //                 type="text"
// //                 value={areaSearch}
// //                 onChange={(e) => setAreaSearch(e.target.value)}
// //                 placeholder="Search for areas..."
// //                 className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
// //               />
// //             </div>

// //             {/* Area Grid */}
// //             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
// //               {filteredAreas.length === 0 ? (
// //                 <div className="col-span-full text-center py-8 text-gray-500">
// //                   {areaSearch ? 'No areas found' : 'No areas available'}
// //                 </div>
// //               ) : (
// //                 filteredAreas.map((area: any) => {
// //                   const isSelected = selectedAreas.some(a => a._id === area._id);
// //                   return (
// //                     <button
// //                       key={area._id}
// //                       type="button"
// //                       onClick={() => toggleArea(area)}
// //                       className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
// //                         isSelected
// //                           ? 'bg-[var(--color-primary)] text-white shadow-md'
// //                           : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
// //                       }`}
// //                     >
// //                       <div className="flex items-center justify-between gap-2">
// //                         <span>{area.name}</span>
// //                         {isSelected && <FiCheck size={16} className="flex-shrink-0" />}
// //                       </div>
// //                     </button>
// //                   );
// //                 })
// //               )}
// //             </div>

// //             {/* Selected Areas Chips */}
// //             {selectedAreas.length > 0 && (
// //               <div className="mt-4">
// //                 <p className="text-sm text-gray-600 mb-2">
// //                   Selected Areas ({selectedAreas.length}):
// //                 </p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {selectedAreas.map((area) => (
// //                     <div 
// //                       key={area._id}
// //                       className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
// //                     >
// //                       <FiMapPin size={14} />
// //                       {area.name}
// //                       <button 
// //                         type="button" 
// //                         onClick={() => removeArea(area._id)} 
// //                         className="hover:bg-white/20 rounded-full p-0.5 transition-colors ml-1"
// //                       >
// //                         <FiX size={16} />
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           disabled={isLoading}
// //           className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#4a7c1c] hover:from-[#4a7c1c] hover:to-[var(--color-primary)] text-white font-semibold rounded-2xl text-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
// //         >
// //           {isLoading ? (
// //             <>
// //               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //               </svg>
// //               Submitting Application...
// //             </>
// //           ) : (
// //             <>
// //               Submit Rider Application
// //               <FiCheck size={22} />
// //             </>
// //           )}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default RiderApplyForm;


// "use client";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { FiUpload, FiArrowLeft, FiCheck, FiX, FiMapPin, FiMail, FiClock } from 'react-icons/fi';
// import { toast } from 'react-hot-toast';
// import { useApplyForRiderMutation } from '@/redux/api/riderApi';
// import { useGetAllAreasQuery } from '@/redux/api/areaApi';

// const RiderApplyForm = () => {
//   const router = useRouter();
//   const [applyForRider, { isLoading }] = useApplyForRiderMutation();
//   const { data: areasResponse } = useGetAllAreasQuery({});
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phone: '',
//     nidNumber: '',
//     vehicleType: 'motorcycle',
//     vehicleNumber: '',
//     preferredAreas: [] as string[],
//   });
  
//   const [nidImage, setNidImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
//   const [areaSearch, setAreaSearch] = useState('');
  
//   // Success state track korar jonno
//   const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const toggleArea = (area: any) => {
//     const exists = selectedAreas.find(a => a._id === area._id);
//     if (exists) {
//       const updated = selectedAreas.filter(a => a._id !== area._id);
//       setSelectedAreas(updated);
//       setFormData(prev => ({
//         ...prev,
//         preferredAreas: updated.map(a => a._id)
//       }));
//     } else {
//       const updated = [...selectedAreas, area];
//       setSelectedAreas(updated);
//       setFormData(prev => ({
//         ...prev,
//         preferredAreas: updated.map(a => a._id)
//       }));
//     }
//   };

//   const removeArea = (id: string) => {
//     const updated = selectedAreas.filter(a => a._id !== id);
//     setSelectedAreas(updated);
//     setFormData(prev => ({
//       ...prev,
//       preferredAreas: updated.map(a => a._id)
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setNidImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!nidImage) return toast.error("NID Image is required");
//     if (formData.preferredAreas.length === 0) return toast.error("Please select at least one area");

//     const submitData = {
//       body: formData,
//       files: { nidImage: [nidImage] }
//     };

//     try {
//       await applyForRider(submitData).unwrap();
//       toast.success("Application submitted successfully!");
//       // Form submit successful hole success view dekhaben
//       setIsSubmittedSuccessfully(true);
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to submit application");
//     }
//   };

//   const filteredAreas = areasResponse?.data?.filter((area: any) =>
//     area.name.toLowerCase().includes(areaSearch.toLowerCase())
//   ) || [];

//   // Jodi application successfully submit hoy, tahole ei Success UI dekhabe
//   if (isSubmittedSuccessfully) {
//     return (
//       <div className="max-w-2xl  mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 text-center space-y-6">
//         <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
//           <FiCheck size={40} />
//         </div>
        
//         <div className="space-y-2">
//           <h2 className="text-2xl font-bold text-gray-900">Application Submitted Successfully!</h2>
//           <p className="text-gray-600 max-w-md mx-auto">
//             Thank you for applying as a rider. Your application is now under review.
//           </p>
//         </div>

//         <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left space-y-3">
//           <div className="flex items-center gap-3 text-amber-800 font-semibold">
//             <FiClock size={20} className="flex-shrink-0" />
//             <span>What happens next?</span>
//           </div>
//           <p className="text-sm text-amber-700 leading-relaxed">
//             We will verify the information and NID card you provided within  <strong>24 hours.</strong> Afterward, we will contact you via your email or phone number.
//           </p>
//         </div>

//         <button
//           onClick={() => router.push('/')}
//           className="w-full py-3.5 bg-[var(--color-primary)] text-white font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all"
//         >
//           Go Back to Home
//         </button>
//       </div>
//     );
//   }

//   // Normal Form UI
//   return (
//     <div className="max-w-3xl mx-auto my-10 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
//       <div className="bg-gradient-to-r from-[var(--color-primary)] to-[#4a7c1c] p-6 text-white flex items-center justify-between">
//         <button
//           onClick={() => router.back()}
//           className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all text-white"
//         >
//           <FiArrowLeft size={20} />
//         </button>
//         <div>
//           <h1 className="text-xl font-bold">Apply as Rider</h1>
//           <p className="text-sm text-white/80">Join our delivery team and start earning</p>
//         </div>
//         <div className="w-10"></div>
//       </div>

//       <form onSubmit={handleSubmit} className="p-8 space-y-8">
//         {/* Personal Information Section */}
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
//             Personal Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
//                 placeholder="Karim Hossain"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
//                 placeholder="01712345678"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">NID Number *</label>
//               <input
//                 type="text"
//                 name="nidNumber"
//                 value={formData.nidNumber}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
//                 placeholder="1234567890123"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Information Section */}
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
//             Vehicle Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Type *</label>
//               <select
//                 name="vehicleType"
//                 value={formData.vehicleType}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
//               >
//                 <option value="motorcycle">Motorcycle</option>
//                 <option value="bicycle">Bicycle</option>
//                 <option value="van">Van</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Number *</label>
//               <input
//                 type="text"
//                 name="vehicleNumber"
//                 value={formData.vehicleNumber}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
//                 placeholder="Dhaka-METRO-GA-12-3456"
//               />
//             </div>
//           </div>
//         </div>

//         {/* NID Image Section */}
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
//             Document Upload
//           </h2>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">NID Image (Front Side) *</label>
//             <div 
//               className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
//                 preview ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-300 hover:border-[var(--color-primary)]'
//               }`}
//             >
//               <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="nidImage" />
//               <label htmlFor="nidImage" className="cursor-pointer flex flex-col items-center">
//                 {preview ? (
//                   <div className="relative w-full max-w-md mx-auto">
//                     <img src={preview} alt="NID Preview" className="w-full h-48 object-cover rounded-xl" />
//                     <div className="mt-3 text-sm text-gray-600">Click to change image</div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
//                       <FiUpload className="text-3xl text-gray-400" />
//                     </div>
//                     <p className="font-semibold text-gray-700">Upload NID Photo</p>
//                     <p className="text-sm text-gray-500 mt-1">PNG, JPG (Max 5MB)</p>
//                   </>
//                 )}
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Preferred Areas Section */}
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></span>
//             Preferred Delivery Areas *
//           </h2>
          
//           <div className="space-y-4">
//             <div className="relative">
//               <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 value={areaSearch}
//                 onChange={(e) => setAreaSearch(e.target.value)}
//                 placeholder="Search for areas..."
//                 className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
//               />
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
//               {filteredAreas.length === 0 ? (
//                 <div className="col-span-full text-center py-8 text-gray-500">
//                   {areaSearch ? 'No areas found' : 'No areas available'}
//                 </div>
//               ) : (
//                 filteredAreas.map((area: any) => {
//                   const isSelected = selectedAreas.some(a => a._id === area._id);
//                   return (
//                     <button
//                       key={area._id}
//                       type="button"
//                       onClick={() => toggleArea(area)}
//                       className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
//                         isSelected
//                           ? 'bg-[var(--color-primary)] text-white shadow-md'
//                           : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between gap-2">
//                         <span>{area.name}</span>
//                         {isSelected && <FiCheck size={16} className="flex-shrink-0" />}
//                       </div>
//                     </button>
//                   );
//                 })
//               )}
//             </div>

//             {selectedAreas.length > 0 && (
//               <div className="mt-4">
//                 <p className="text-sm text-gray-600 mb-2">
//                   Selected Areas ({selectedAreas.length}):
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedAreas.map((area) => (
//                     <div 
//                       key={area._id}
//                       className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
//                     >
//                       <FiMapPin size={14} />
//                       {area.name}
//                       <button 
//                         type="button" 
//                         onClick={() => removeArea(area._id)} 
//                         className="hover:bg-white/20 rounded-full p-0.5 transition-colors ml-1"
//                       >
//                         <FiX size={16} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#4a7c1c] hover:from-[#4a7c1c] hover:to-[var(--color-primary)] text-white font-semibold rounded-2xl text-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
//         >
//           {isLoading ? (
//             <>
//               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Submitting Application...
//             </>
//           ) : (
//             <>
//               Submit Rider Application
//               <FiCheck size={22} />
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RiderApplyForm;


"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiArrowLeft, FiCheck, FiX, FiMapPin, FiClock, FiDollarSign, FiShield, FiTrendingUp } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useApplyForRiderMutation } from '@/redux/api/riderApi';
import { useGetAllAreasQuery } from '@/redux/api/areaApi';
import Image from 'next/image';

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
  
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
      setIsSubmittedSuccessfully(true);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit application");
    }
  };

  const filteredAreas = areasResponse?.data?.filter((area: any) =>
    area.name.toLowerCase().includes(areaSearch.toLowerCase())
  ) || [];

  if (isSubmittedSuccessfully) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <FiCheck size={40} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Application Submitted Successfully!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Thank you for applying as a rider. Your application is now under review.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left space-y-3">
          <div className="flex items-center gap-3 text-amber-800 font-semibold">
            <FiClock size={20} className="flex-shrink-0" />
            <span>What happens next?</span>
          </div>
          <p className="text-sm text-amber-700 leading-relaxed">
            We will verify the information and NID card you provided within <strong>24 hours.</strong> Afterward, we will contact you via your email or phone number.
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full py-3.5 bg-[var(--color-primary)] text-white font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Top Back Option */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-all"
        >
          <FiArrowLeft size={18} />
          Back to Home
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side: Form Section (7 Columns) */}
        <div className="lg:col-span-7 p-8 lg:p-10">
          
          {/* Header Title */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Apply to be a Rider</h1>
            <p className="text-sm text-gray-500 mt-1">Join Sobjihaat and earn with flexible delivery jobs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">NID Number *</label>
                  <input
                    type="text"
                    name="nidNumber"
                    value={formData.nidNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter your NID number"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">
                Vehicle Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Type *</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm"
                  >
                    <option value="motorcycle">Motorcycle</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="van">Van</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Number *</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Dhaka-METRO-GA-12-3456"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">
                Document Upload
              </h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">NID Image (Front Side) *</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                    preview ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-300 hover:border-[var(--color-primary)]'
                  }`}
                >
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="nidImage" />
                  <label htmlFor="nidImage" className="cursor-pointer flex flex-col items-center">
                    {preview ? (
                      <div className="relative w-full max-w-xs mx-auto">
                        <img src={preview} alt="NID Preview" className="w-full h-36 object-cover rounded-xl" />
                        <div className="mt-2 text-xs text-gray-600 font-medium">Click to change image</div>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3 text-gray-400">
                          <FiUpload size={24} />
                        </div>
                        <p className="font-semibold text-gray-700 text-sm">Upload NID Photo</p>
                        <p className="text-xs text-gray-400 mt-0.5">PNG, JPG (Max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Preferred Delivery Areas Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">
                Preferred Delivery Areas *
              </h2>
              
              <div className="space-y-3">
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={areaSearch}
                    onChange={(e) => setAreaSearch(e.target.value)}
                    placeholder="Search for areas..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                  {filteredAreas.length === 0 ? (
                    <div className="col-span-full text-center py-6 text-gray-400 text-sm">
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
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                            isSelected
                              ? 'bg-[var(--color-primary)] text-white shadow-sm'
                              : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="truncate">{area.name}</span>
                            {isSelected && <FiCheck size={14} className="flex-shrink-0" />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                {selectedAreas.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      Selected Areas ({selectedAreas.length}):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAreas.map((area) => (
                        <div 
                          key={area._id}
                          className="flex items-center gap-1.5 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                        >
                          <FiMapPin size={12} />
                          <span>{area.name}</span>
                          <button 
                            type="button" 
                            onClick={() => removeArea(area._id)} 
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#4a7c1c] hover:opacity-90 text-white font-semibold rounded-2xl text-base transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 shadow-md"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Rider Application
                    <FiCheck size={20} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Right Side: Rider Banner with exact matching SVG background style (5 Columns) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#f2f8ed] to-[#eaf4e2] p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-100">
          
          {/* Exact Reference-Matched Custom SVG Background + Image Container */}
          <div className="relative w-full h-80 rounded-3xl overflow-hidden mb-8 shadow-sm flex items-end justify-center">
            
            {/* Custom SVG Background matching reference image scenery */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 380" preserveAspectRatio="none">
              <defs>
                <linearGradient id="refSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#eaf5e3" />
                  <stop offset="100%" stopColor="#d4ebd0" />
                </linearGradient>
              </defs>
              <rect width="500" height="380" fill="url(#refSkyGrad)" />
              
              {/* Back Soft Hills */}
              <path d="M0,240 Q150,180 320,230 T500,210 L500,380 L0,380 Z" fill="#bfe1b6" opacity="0.6" />
              
              {/* Front Soft Hills with dashed route line paths */}
              <path d="M0,280 Q200,220 500,270 L500,380 L0,380 Z" fill="#a7d69c" opacity="0.4" />
              
              {/* Dotted Delivery route path curves */}
              <path d="M40,230 Q150,140 280,210 T460,180" fill="none" stroke="#7ac16b" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.6" />
            </svg>

            {/* Map Pin indicators positioned like reference image */}
            <div className="absolute top-8 left-10 text-emerald-600 drop-shadow-sm">
              <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <FiMapPin size={16} className="text-[var(--color-primary)]" />
              </div>
            </div>

            <div className="absolute top-12 right-12 text-emerald-600 drop-shadow-sm">
              <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <FiMapPin size={16} className="text-[var(--color-primary)]" />
              </div>
            </div>

            {/* Rider Image from public/img/rider.png perfectly aligned */}
            <div className="relative w-full h-full z-10">
              <Image 
                src="/img/rider.png" 
                alt="Sobjihaat Rider" 
                fill 
                className="object-contain object-bottom scale-105"
                priority
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Why Join Sobjihaat as a Rider?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
                  <FiDollarSign size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Earn More</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Competitive earnings with bonuses and incentives</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
                  <FiClock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Flexible Time</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Work on your own schedule, earn when you're free</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
                  <FiShield size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Safety First</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Your safety is our priority with insurance coverage</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
                  <FiTrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Regular Payouts</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Weekly payments directly to your account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Support Footer inside sidebar */}
          <div className="mt-8 pt-6 border-t border-gray-200/60 text-xs text-gray-600 space-y-1">
            <p className="font-semibold text-gray-900">Need Help?</p>
            <p>Call us: <span className="font-medium text-gray-800">09678-123456</span></p>
            <p>Email: <span className="font-medium text-gray-800">support@sobjihaat.com</span></p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RiderApplyForm;