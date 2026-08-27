// src/components/modals/ComplainModal.tsx
"use client";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import { closeComplainModal, showNotification } from "@/redux/features/ui/uiSlice";
import { useCreateComplaintMutation } from "@/redux/api/complainApi";
import { X, Upload, Loader2 } from "lucide-react";
import { showNotification } from "@/redux";
import { closeComplainModal } from "@/redux/slices/uiSlice";

const SUBJECTS = [
  "Product Quality Issue",
  "Delivery Problem",
  "Wrong Item Received",
  "Payment Issue",
  "Customer Service",
  "Other",
];

export default function ComplainModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isComplainModalOpen);
  const [createComplaint, { isLoading }] = useCreateComplaintMutation();

  const [orderId, setOrderId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // চাইলে localStorage / user data থেকে preload করতে পারো
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      dispatch(
        showNotification({
          type: "error",
          message: "Image size must be less than 5MB",
        })
      );
      return;
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      dispatch(
        showNotification({
          type: "error",
          message: "Only JPG/PNG allowed",
        })
      );
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !description.trim()) {
      dispatch(
        showNotification({
          type: "error",
          message: "Subject and Description are required",
        })
      );
      return;
    }

    // Postman অনুযায়ী form-data
    const formData = new FormData();
    formData.append("phoneNumber", phoneNumber || "01700000000"); // real user phone দাও
    formData.append("text", description.trim());

    // Subject + Order ID একসাথে text-এ পাঠাতে পারো, অথবা backend support করলে আলাদা field
    // এখানে simple রাখলাম — চাইলে text-এর সাথে subject যোগ করতে পারো
    if (orderId) {
      formData.append("text", `[Order: ${orderId}] [${subject}] ${description.trim()}`);
    } else {
      formData.append("text", `[${subject}] ${description.trim()}`);
    }

    if (image) {
      formData.append("images", image); // Postman-এ key = "images"
    }

    try {
      await createComplaint(formData).unwrap();
      dispatch(
        showNotification({
          type: "success",
          message: "Your feedback has been submitted successfully!",
        })
      );
      // reset
      setOrderId("");
      setSubject("");
      setDescription("");
      setImage(null);
      setPreview(null);
      dispatch(closeComplainModal());
    } catch (err: any) {
      dispatch(
        showNotification({
          type: "error",
          message: err?.data?.message || "Something went wrong. Please try again.",
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => dispatch(closeComplainModal())}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Complain / Feedback
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              We're sorry to hear that! Please let us know the details.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeComplainModal())}
            className="p-1.5 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Order ID + Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Order ID <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. #SH12345"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Select a subject</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Please describe your issue in detail..."
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Phone (optional - চাইলে hide করতে পারো) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Attach Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Attach Image <span className="text-gray-400">(Optional)</span>
            </label>

            {!preview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Choose File</p>
                  <p className="text-xs text-gray-400">Max size: 5MB (jpg, png)</p>
                </div>
              </div>
            ) : (
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => dispatch(closeComplainModal())}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 transition"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}