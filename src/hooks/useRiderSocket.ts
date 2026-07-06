// hooks/useRiderSocket.ts
"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { initSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { useDispatch } from "react-redux";
import { orderApi } from "@/redux/api/orderApi";

interface NewOrderNotification {
  orderID: string;
  orderNumber: string;
  totalAmount: number;
  deliveryFee: number;
  deliveryAddress: {
    area: string;
    city: string;
    houseNo?: string;
    road?: string;
  };
  itemCount: number;
  paymentMethod: string;
  createdAt: string;
}

export const useRiderSocket = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    const userId = (session?.user as any)?.id;
    if (!userId || initialized.current) return;
    initialized.current = true;

    const socket = initSocket(userId);

    // ✅ backend এ io.to(`rider-${userID}`).emit("new-order-notification", data) হয়
    socket.on("new-order-notification", (data: NewOrderNotification) => {
      console.log("🔔 New order notification:", data);

      toast.success(
        `New Order: ${data.orderNumber} — ৳${data.totalAmount}`,
        { duration: 8000, icon: "📦" }
      );

      dispatch(orderApi.util.invalidateTags(["Orders"]));

      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch(() => {});
    });

    return () => {
      socket.off("new-order-notification");
    };
  }, [session, dispatch]);

  useEffect(() => {
    return () => {
      disconnectSocket();
      initialized.current = false;
    };
  }, []);
};