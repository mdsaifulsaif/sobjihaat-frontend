"use client";

import React, { useEffect } from "react";
import {
  useGetMyRiderProfileQuery,
  useUpdateRiderStatusMutation,
  useUpdateRiderLocationMutation,
} from "@/redux/api/riderApi";
import { toast } from "react-hot-toast";
import { FiPower } from "react-icons/fi";

const RiderStatusToggle = () => {
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useGetMyRiderProfileQuery(undefined);

  const [updateRiderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateRiderStatusMutation();
  const [updateRiderLocation] = useUpdateRiderLocationMutation();

  const rider = profileData?.data;
  const isOnline = rider?.status === "online";

  const pushLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await updateRiderLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }).unwrap();
        } catch (e) {
          // ignore silently, location update should not block the flow
        }
      },
      () => {
        toast.error("Location permission dile buyer live tracking dekhte parbe");
      }
    );
  };

  const handleToggle = async () => {
    const nextStatus = isOnline ? "offline" : "online";
    try {
      await updateRiderStatus({ status: nextStatus }).unwrap();
      toast.success(nextStatus === "online" ? "You're online now" : "You're offline now");
      refetchProfile();
      if (nextStatus === "online") pushLocation();
    } catch (err: any) {
      toast.error(err?.data?.message || "Status update failed");
    }
  };

  // Auto location ping every 2 minutes while online
  useEffect(() => {
    if (!isOnline) return;
    const interval = setInterval(pushLocation, 120000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggle}
        disabled={isUpdatingStatus || isLoadingProfile}
        className={
          "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all disabled:opacity-50 " +
          (isOnline
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200")
        }
      >
        <FiPower size={16} />
        <span
          className={"w-2 h-2 rounded-full " + (isOnline ? "bg-green-500" : "bg-gray-400")}
        />
        {isUpdatingStatus ? "Updating..." : isOnline ? "Online" : "Offline"}
      </button>
    </div>
  );
};

export default RiderStatusToggle;