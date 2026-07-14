// // hooks/useSocket.ts
// "use client";

// import { useEffect, useRef, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import toast from 'react-hot-toast';

// interface Notification {
//     id: string;
//     orderID: string;
//     orderNumber: string;
//     totalAmount: number;
//     deliveryFee: number;
//     riderCommission: number;
//     deliveryAddress: {
//         area: string;
//         city: string;
//         houseNo?: string;
//         road?: string;
//     };
//     itemCount: number;
//     paymentMethod: string;
//     createdAt: string;
//     read: boolean;
//     timestamp: string;
//     area?: string; // ✅ Area added
// }

// export const useSocket = () => {
//     const [isConnected, setIsConnected] = useState(false);
//     const [notifications, setNotifications] = useState<Notification[]>([]);
//     const [unreadCount, setUnreadCount] = useState(0);
//     const [riderArea, setRiderArea] = useState<string>(''); // ✅ Rider area state
//     const socketRef = useRef<Socket | null>(null);
//     const riderIdRef = useRef<string | null>(null);

//     // ✅ Get rider ID
//     const getRiderId = () => {
//         try {
//             const storedId = localStorage.getItem('riderID');
//             if (storedId) return storedId;

//             const token = localStorage.getItem('token');
//             if (token) {
//                 const decoded = JSON.parse(atob(token.split('.')[1]));
//                 if (decoded?.id) return decoded.id;
//             }
//         } catch (error) {
//             console.error('Error getting rider ID:', error);
//         }
//         return '6a4bd3fb517f2c941459a2fe';
//     };

//     // ✅ Get rider's assigned area
//     const getRiderArea = () => {
//         try {
//             // Try to get from localStorage first
//             const storedArea = localStorage.getItem('riderArea');
//             if (storedArea) return storedArea;
            
//             // Try to get from token
//             const token = localStorage.getItem('token');
//             if (token) {
//                 const decoded = JSON.parse(atob(token.split('.')[1]));
//                 if (decoded?.area) return decoded.area;
//             }
//         } catch (error) {
//             console.error('Error getting rider area:', error);
//         }
//         return '';
//     };

//     // ✅ Add notification with area filtering
//     const addNotification = (data: any) => {
//         // ✅ Get notification area
//         const notificationArea = data.area || data.deliveryAddress?.area || 'Unknown';
//         const riderCurrentArea = getRiderArea();
        
//         console.log(`📍 Notification Area: ${notificationArea}, Rider Area: ${riderCurrentArea || 'Not set'}`);
        
//         // ✅ ONLY show notifications for rider's area (if rider has area assigned)
//         if (riderCurrentArea && notificationArea && notificationArea !== riderCurrentArea) {
//             console.log(`⛔ Notification ignored - Area mismatch: ${notificationArea} (Rider area: ${riderCurrentArea})`);
//             return; // ✅ Skip notification
//         }

//         // ✅ If rider has no area assigned, show all notifications (admin)
//         if (!riderCurrentArea) {
//             console.log(`👨‍💼 Admin mode - Showing all notifications`);
//         }

//         const newNotification: Notification = {
//             id: data.orderID || data.orderId || Date.now().toString(),
//             orderID: data.orderID || data.orderId,
//             orderNumber: data.orderNumber || `ORD-${Date.now()}`,
//             totalAmount: data.totalAmount || data.amount || 0,
//             deliveryFee: data.deliveryFee || data.deliveryCharge || 0,
//             riderCommission: data.riderCommission || data.commission || 0,
//             deliveryAddress: data.deliveryAddress || { area: 'Unknown', city: 'Unknown' },
//             itemCount: data.itemCount || data.items || 0,
//             paymentMethod: data.paymentMethod || 'cod',
//             createdAt: data.createdAt || new Date().toISOString(),
//             read: false,
//             timestamp: new Date().toISOString(),
//             area: notificationArea, // ✅ Store area
//         };

//         setNotifications(prev => {
//             const exists = prev.some(n => n.id === newNotification.id);
//             if (exists) return prev;
//             return [newNotification, ...prev];
//         });
//         setUnreadCount(prev => prev + 1);

//         // ✅ Toast with area info
//         const areaText = riderCurrentArea ? ` in ${notificationArea}` : '';
//         toast.success(`🆕 New Order${areaText}! #${newNotification.orderNumber} - ${newNotification.totalAmount} TK`, {
//             duration: 5000,
//             position: 'top-right',
//         });

//         // Browser notification with area info
//         if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
//             new Notification(`🆕 New Order${areaText}!`, {
//                 body: `Order #${newNotification.orderNumber} - ${newNotification.totalAmount} TK\n📍 Area: ${notificationArea}`,
//                 icon: '/rider-icon.png',
//             });
//         }

//         // Play sound
//         try {
//             const audio = new Audio('/notification.mp3');
//             audio.play().catch(() => {});
//         } catch (e) {}
//     };

//     useEffect(() => {
//         const riderId = getRiderId();
//         const area = getRiderArea();
        
//         riderIdRef.current = riderId;
//         setRiderArea(area);
        
//         console.log('🏍️ Rider ID for socket:', riderId);
//         console.log('📍 Rider Area:', area || 'Not assigned (Admin mode)');

//         const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';
//         console.log('🔌 Connecting to socket server:', socketUrl);

//         const socket = io(socketUrl, {
//             transports: ['websocket', 'polling'],
//             withCredentials: true,
//             reconnection: true,
//             reconnectionAttempts: 10,
//             reconnectionDelay: 1000,
//             reconnectionDelayMax: 5000,
//         });

//         socketRef.current = socket;

//         socket.on('connect', () => {
//             console.log('✅ Socket connected with ID:', socket.id);
//             setIsConnected(true);
            
//             // ✅ Send rider join with area
//             socket.emit('rider-join', { 
//                 userID: riderId,
//                 area: area || '' // ✅ Send area if available
//             });
//             console.log(`🏍️ Emitted rider-join with ID: ${riderId}, Area: ${area || 'Not set'}`);
//         });

//         socket.on('disconnect', (reason) => {
//             console.log('❌ Socket disconnected. Reason:', reason);
//             setIsConnected(false);
//             if (reason === 'io server disconnect' || reason === 'transport close') {
//                 socket.connect();
//             }
//         });

//         socket.on('connect_error', (error) => {
//             console.error('🔴 Socket connect_error:', error);
//         });

//         socket.onAny((event, ...args) => {
//             console.log(`📡 Socket event received: ${event}`, args);
//         });

//         // ✅ Rider join acknowledgment with area
//         socket.on('rider-join-ack', (data: any) => {
//             console.log('✅ Rider join acknowledgment:', data);
//             if (data.area) {
//                 setRiderArea(data.area);
//                 localStorage.setItem('riderArea', data.area);
//                 console.log(`📍 Area saved: ${data.area}`);
//             }
//         });

//         // ✅ New order notification (with area filtering)
//         socket.on('new-order-notification', (data: any) => {
//             console.log('📢 New order notification received:', data);
//             addNotification(data);
//         });

//         // ✅ Alternative event
//         socket.on('new-order-available', (data: any) => {
//             console.log('📢 New order available (alternative):', data);
//         });

//         // ✅ Test notification
//         socket.on('test-notification', (data: any) => {
//             console.log('🧪 Test notification received:', data);
//             toast.success('🧪 Test notification received!');
//         });

//         return () => {
//             if (socket) {
//                 socket.disconnect();
//             }
//         };
//     }, []);

//     // ✅ Update rider area manually
//     const updateRiderArea = (newArea: string) => {
//         setRiderArea(newArea);
//         localStorage.setItem('riderArea', newArea);
        
//         // ✅ Notify server about area change
//         if (socketRef.current && socketRef.current.connected) {
//             const riderId = getRiderId();
//             socketRef.current.emit('update-rider-area', {
//                 riderID: riderId,
//                 area: newArea
//             });
//             console.log(`📍 Rider area updated to: ${newArea}`);
//         }
//     };

//     const markAsRead = (notificationId: string) => {
//         setNotifications(prev =>
//             prev.map(notif =>
//                 notif.id === notificationId ? { ...notif, read: true } : notif
//             )
//         );
//         setUnreadCount(prev => Math.max(0, prev - 1));
//     };

//     const markAllAsRead = () => {
//         setNotifications(prev =>
//             prev.map(notif => ({ ...notif, read: true }))
//         );
//         setUnreadCount(0);
//     };

//     return {
//         isConnected,
//         notifications,
//         unreadCount,
//         riderArea, // ✅ Return rider area
//         updateRiderArea, // ✅ Function to update area
//         markAsRead,
//         markAllAsRead,
//         setNotifications,
//         setUnreadCount,
//     };
// };