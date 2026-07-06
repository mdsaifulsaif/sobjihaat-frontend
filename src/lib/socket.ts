// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: string): Socket => {
  if (socket?.connected) return socket;

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket?.id);
    // ✅ backend এ socket.on("rider-join", (data: { userID: string })) আছে
    // তাই object পাঠাতে হবে, plain string না
    socket?.emit("rider-join", { userID: userId });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("🔴 Socket connect_error:", err.message);
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};