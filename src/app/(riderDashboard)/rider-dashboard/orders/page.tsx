// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   useGetAvailableOrdersQuery,
//   useGetMyAssignedOrdersQuery,
//   useAcceptOrderMutation,
//   useRejectOrderMutation,
//   useMarkOutForDeliveryMutation,
//   useMarkDeliveredMutation,
// } from "@/redux/api/orderApi";
// import {
//   useGetMyRiderProfileQuery,
//   useUpdateRiderStatusMutation,
//   useUpdateRiderLocationMutation,
// } from "@/redux/api/riderApi";
// import { toast } from "react-hot-toast";
// import {
//   FiPackage,
//   FiMapPin,
//   FiClock,
//   FiCheck,
//   FiX,
//   FiRefreshCw,
//   FiTruck,
//   FiPhone,
//   FiPower,
// } from "react-icons/fi";

// // ============ Types (matched to actual backend response) ============
// interface OrderItem {
//   productID: string;
//   variantID: string | null;
//   productType: string;
//   productName: string;
//   thumbnail: string;
//   sku: string;
//   quantity: number;
//   unit: string;
//   weightOrVolume: number;
//   unitPrice: number;
//   salePrice: number;
//   totalPrice: number;
// }

// interface DeliveryAddress {
//   name: string;
//   phone: string;
//   city: string;
//   area: string; // ObjectId reference - not populated by backend yet
//   label?: string;
// }

// interface RiderOrder {
//   _id: string;
//   orderNumber: string;
//   items: OrderItem[];
//   subtotal: number;
//   shippingCharge: number;
//   deliveryFee: number;
//   totalAmount: number;
//   deliveryAddress: DeliveryAddress;
//   paymentMethod: string;
//   status: string;
//   createdAt: string;
//   pendingExpiresAt: string;
// }

// type TabKey = "available" | "assigned";

// // ============ Small pieces ============
// const StatusBadge = ({ status }: { status: string }) => {
//   const map: Record<string, { label: string; cls: string }> = {
//     accepted: { label: "Accepted", cls: "bg-blue-50 text-blue-600" },
//     out_for_delivery: { label: "Out for Delivery", cls: "bg-purple-50 text-purple-600" },
//     delivered: { label: "Delivered", cls: "bg-green-50 text-green-600" },
//   };
//   const s = map[status] || { label: status, cls: "bg-gray-50 text-gray-600" };
//   return (
//     <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${s.cls}`}>
//       {s.label}
//     </span>
//   );
// };

// const getTimeLeft = (expiresAt: string) => {
//   const diff = new Date(expiresAt).getTime() - Date.now();
//   if (diff <= 0) return "Expired";
//   const minutes = Math.floor(diff / 60000);
//   const seconds = Math.floor((diff % 60000) / 1000);
//   return `${minutes}m ${seconds}s left`;
// };

// // ============ Main Page ============
// const RiderDashboardPage = () => {
//   const [tab, setTab] = useState<TabKey>("available");
//   const [showAllAreas, setShowAllAreas] = useState(false);
//   const [page, setPage] = useState(1);
//   const [actingOrderId, setActingOrderId] = useState<string | null>(null);

//   // ---------- Rider Profile / Online Status ----------
//   const {
//     data: profileData,
//     isLoading: isLoadingProfile,
//     refetch: refetchProfile,
//   } = useGetMyRiderProfileQuery(undefined);

//   const [updateRiderStatus, { isLoading: isUpdatingStatus }] =
//     useUpdateRiderStatusMutation();
//   const [updateRiderLocation] = useUpdateRiderLocationMutation();

//   const rider = profileData?.data;
//   const isOnline = rider?.status === "online";

//   const handleToggleStatus = async () => {
//     const nextStatus = isOnline ? "offline" : "online";
//     try {
//       await updateRiderStatus({ status: nextStatus }).unwrap();
//       toast.success(
//         nextStatus === "online" ? "You're online now" : "You're offline now"
//       );
//       refetchProfile();

//       if (nextStatus === "online" && typeof navigator !== "undefined" && navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (pos) => {
//             try {
//               await updateRiderLocation({
//                 lat: pos.coords.latitude,
//                 lng: pos.coords.longitude,
//               }).unwrap();
//             } catch (e) {
//               // silently ignore, location update is not blocking
//             }
//           },
//           () => {
//             toast.error("Location permission dile buyer live tracking dekhte parbe");
//           }
//         );
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Status update failed");
//     }
//   };

//   useEffect(() => {
//     if (!isOnline || typeof navigator === "undefined" || !navigator.geolocation) return;

//     const interval = setInterval(() => {
//       navigator.geolocation.getCurrentPosition(
//         async (pos) => {
//           try {
//             await updateRiderLocation({
//               lat: pos.coords.latitude,
//               lng: pos.coords.longitude,
//             }).unwrap();
//           } catch (e) {
//             // ignore
//           }
//         },
//         () => {}
//       );
//     }, 120000);

//     return () => clearInterval(interval);
//   }, [isOnline, updateRiderLocation]);

//   // ---------- Available Orders ----------
//   const {
//     data: availableData,
//     isLoading: isLoadingAvailable,
//     isFetching: isFetchingAvailable,
//     refetch: refetchAvailable,
//   } = useGetAvailableOrdersQuery(
//     { showAllAreas, page, limit: 10 },
//     { skip: tab !== "available", pollingInterval: tab === "available" ? 15000 : 0 }
//   );

//   // ---------- Assigned / My Orders ----------
//   const {
//     data: assignedData,
//     isLoading: isLoadingAssigned,
//     isFetching: isFetchingAssigned,
//     refetch: refetchAssigned,
//   } = useGetMyAssignedOrdersQuery(undefined, { skip: tab !== "assigned" });

//   // ---------- Order Mutations ----------
//   const [acceptOrder, { isLoading: isAccepting }] = useAcceptOrderMutation();
//   const [rejectOrder, { isLoading: isRejecting }] = useRejectOrderMutation();
//   const [markOutForDelivery, { isLoading: isMarkingOut }] =
//     useMarkOutForDeliveryMutation();
//   const [markDelivered, { isLoading: isMarkingDelivered }] =
//     useMarkDeliveredMutation();

//   const availableOrders: RiderOrder[] = Array.isArray(availableData?.data)
//     ? availableData.data
//     : [];
//   const meta = availableData?.meta;

//   // ✅ defensive: backend response shape confirm na howa porjonto
//   // shonvobbo shob shape handle kora hocche (data array, data.orders, or data direct)
//   const assignedOrders: RiderOrder[] = Array.isArray(assignedData?.data)
//     ? assignedData.data
//     : Array.isArray(assignedData?.data?.orders)
//     ? assignedData.data.orders
//     : Array.isArray(assignedData)
//     ? assignedData
//     : [];

//   const handleAccept = async (orderId: string) => {
//     setActingOrderId(orderId);
//     try {
//       await acceptOrder(orderId).unwrap();
//       toast.success("Order accepted! Check 'My Orders' tab.");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to accept order");
//     } finally {
//       setActingOrderId(null);
//     }
//   };

//   const handleReject = async (orderId: string) => {
//     setActingOrderId(orderId);
//     try {
//       await rejectOrder(orderId).unwrap();
//       toast.success("Order rejected");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to reject order");
//     } finally {
//       setActingOrderId(null);
//     }
//   };

//   const handleMarkOutForDelivery = async (orderId: string) => {
//     setActingOrderId(orderId);
//     try {
//       await markOutForDelivery(orderId).unwrap();
//       toast.success("Marked as out for delivery");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update order");
//     } finally {
//       setActingOrderId(null);
//     }
//   };

//   const handleMarkDelivered = async (orderId: string) => {
//     setActingOrderId(orderId);
//     try {
//       await markDelivered(orderId).unwrap();
//       toast.success("Order marked as delivered");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update order");
//     } finally {
//       setActingOrderId(null);
//     }
//   };

//   const isBusy = isAccepting || isRejecting || isMarkingOut || isMarkingDelivered;

//   const renderAddressLine = (addr: DeliveryAddress) => {
//     // "area" field is currently an ObjectId reference from backend (not populated).
//     // Showing city + label until backend populates the area name.
//     const parts = [addr.city, addr.label].filter(Boolean);
//     return parts.join(", ");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header + Online Toggle */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-black text-gray-900">Rider Dashboard</h1>
//             <p className="text-sm text-gray-500 font-medium mt-1">
//               {isLoadingProfile
//                 ? "Loading profile..."
//                 : rider?.name
//                 ? "Welcome back, " + rider.name
//                 : "Manage available and ongoing deliveries"}
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleToggleStatus}
//               disabled={isUpdatingStatus || isLoadingProfile}
//               className={
//                 "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all disabled:opacity-50 " +
//                 (isOnline
//                   ? "bg-green-50 text-green-700 hover:bg-green-100"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200")
//               }
//             >
//               <FiPower size={16} />
//               <span
//                 className={
//                   "w-2 h-2 rounded-full " + (isOnline ? "bg-green-500" : "bg-gray-400")
//                 }
//               />
//               {isUpdatingStatus ? "Updating..." : isOnline ? "Online" : "Offline"}
//             </button>

//             <button
//               onClick={() => {
//                 if (tab === "available") {
//                   refetchAvailable();
//                 } else {
//                   refetchAssigned();
//                 }
//               }}
//               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
//             >
//               <FiRefreshCw
//                 className={
//                   (tab === "available" ? isFetchingAvailable : isFetchingAssigned)
//                     ? "animate-spin"
//                     : ""
//                 }
//                 size={16}
//               />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {!isLoadingProfile && !isOnline && (
//           <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium rounded-md px-4 py-3 mb-6 flex items-center gap-2">
//             <FiPower size={16} />
//             <span>তুমি এখন Offline — নতুন কোনো order notification পাবে না। Online হতে উপরের বাটনে ক্লিক করো।</span>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-md border border-gray-100 w-fit">
//           <button
//             onClick={() => setTab("available")}
//             className={
//               "px-5 py-2 rounded-md text-sm font-bold transition-all " +
//               (tab === "available"
//                 ? "bg-[var(--color-primary)] text-white"
//                 : "text-gray-500 hover:bg-gray-50")
//             }
//           >
//             Available Orders
//             {meta && meta.total ? (
//               <span className="ml-2 text-xs opacity-80">({meta.total})</span>
//             ) : null}
//           </button>
//           <button
//             onClick={() => setTab("assigned")}
//             className={
//               "px-5 py-2 rounded-md text-sm font-bold transition-all " +
//               (tab === "assigned"
//                 ? "bg-[var(--color-primary)] text-white"
//                 : "text-gray-500 hover:bg-gray-50")
//             }
//           >
//             My Orders
//             {assignedOrders.length ? (
//               <span className="ml-2 text-xs opacity-80">({assignedOrders.length})</span>
//             ) : null}
//           </button>
//         </div>

//         {/* ===================== AVAILABLE TAB ===================== */}
//         {tab === "available" && (
//           <div>
//             <div className="flex justify-end mb-4">
//               <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={showAllAreas}
//                   onChange={(e) => setShowAllAreas(e.target.checked)}
//                   className="w-4 h-4 rounded"
//                 />
//                 Show all areas
//               </label>
//             </div>

//             {isLoadingAvailable ? (
//               <div className="flex justify-center py-20">
//                 <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
//               </div>
//             ) : availableOrders.length === 0 ? (
//               <div className="bg-white rounded-md border border-gray-100 p-12 text-center">
//                 <FiPackage size={40} className="mx-auto text-gray-300 mb-4" />
//                 <p className="text-gray-500 font-medium">No available orders right now</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {availableOrders.map((order) => (
//                   <div key={order._id} className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//                           {order.orderNumber}
//                         </p>
//                         <p className="text-lg font-black text-gray-900 mt-1">
//                           ৳{order.totalAmount.toLocaleString()}
//                         </p>
//                       </div>
//                       <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full">
//                         <FiClock size={12} />
//                         {getTimeLeft(order.pendingExpiresAt)}
//                       </span>
//                     </div>

//                     <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
//                       <FiMapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
//                       <div>
//                         <p className="font-bold text-gray-800">{order.deliveryAddress.name}</p>
//                         <p>{renderAddressLine(order.deliveryAddress)}</p>
//                       </div>
//                     </div>

//                     <div className="border-t border-gray-50 pt-4 mb-4">
//                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {order.items.length} Item{order.items.length !== 1 ? "s" : ""}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {order.items.slice(0, 4).map((item, idx) => (
//                           <span key={idx} className="text-xs bg-gray-50 px-2 py-1 rounded-md text-gray-600">
//                             {item.productName} x {item.quantity}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t border-gray-50">
//                       <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
//                         {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
//                       </span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleReject(order._id)}
//                           disabled={isBusy}
//                           className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-md text-sm font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
//                         >
//                           <FiX size={16} />
//                           {actingOrderId === order._id && isRejecting ? "..." : "Reject"}
//                         </button>
//                         <button
//                           onClick={() => handleAccept(order._id)}
//                           disabled={isBusy}
//                           className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50"
//                         >
//                           <FiCheck size={16} />
//                           {actingOrderId === order._id && isAccepting ? "..." : "Accept"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {meta && meta.totalPage > 1 && (
//               <div className="flex justify-center gap-2 mt-6">
//                 {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={
//                       "w-9 h-9 rounded-md text-sm font-bold transition-all " +
//                       (p === page
//                         ? "bg-[var(--color-primary)] text-white"
//                         : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")
//                     }
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ===================== ASSIGNED / MY ORDERS TAB ===================== */}
//         {tab === "assigned" && (
//           <div>
//             {isLoadingAssigned ? (
//               <div className="flex justify-center py-20">
//                 <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
//               </div>
//             ) : assignedOrders.length === 0 ? (
//               <div className="bg-white rounded-md border border-gray-100 p-12 text-center">
//                 <FiTruck size={40} className="mx-auto text-gray-300 mb-4" />
//                 <p className="text-gray-500 font-medium">
//                   No assigned orders yet. Accept one from Available Orders.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {assignedOrders.map((order) => (
//                   <div key={order._id} className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//                           {order.orderNumber}
//                         </p>
//                         <p className="text-lg font-black text-gray-900 mt-1">
//                           ৳{order.totalAmount.toLocaleString()}
//                         </p>
//                       </div>
//                       <StatusBadge status={order.status} />
//                     </div>

//                     <div className="flex items-start gap-2 mb-2 text-sm text-gray-600">
//                       <FiMapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
//                       <div>
//                         <p className="font-bold text-gray-800">{order.deliveryAddress.name}</p>
//                         <p>{renderAddressLine(order.deliveryAddress)}</p>
//                       </div>
//                     </div>

//                     <a
//                       href={"tel:" + order.deliveryAddress.phone}
//                       className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4 w-fit"
//                     >
//                       <FiPhone size={14} />
//                       <span>{order.deliveryAddress.phone}</span>
//                     </a>

//                     <div className="border-t border-gray-50 pt-4 mb-4">
//                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {order.items.length} Item{order.items.length !== 1 ? "s" : ""}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {order.items.slice(0, 4).map((item, idx) => (
//                           <span key={idx} className="text-xs bg-gray-50 px-2 py-1 rounded-md text-gray-600">
//                             {item.productName} x {item.quantity}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t border-gray-50">
//                       <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
//                         {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
//                       </span>

//                       {order.status === "accepted" && (
//                         <button
//                           onClick={() => handleMarkOutForDelivery(order._id)}
//                           disabled={isBusy}
//                           className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50"
//                         >
//                           <FiTruck size={16} />
//                           {actingOrderId === order._id && isMarkingOut ? "..." : "Out for Delivery"}
//                         </button>
//                       )}

//                       {order.status === "out_for_delivery" && (
//                         <button
//                           onClick={() => handleMarkDelivered(order._id)}
//                           disabled={isBusy}
//                           className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50"
//                         >
//                           <FiCheck size={16} />
//                           {actingOrderId === order._id && isMarkingDelivered ? "..." : "Mark Delivered"}
//                         </button>
//                       )}

//                       {order.status === "delivered" && (
//                         <span className="text-sm font-bold text-green-600">Completed</span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RiderDashboardPage;


"use client";

import React, { useState } from "react";
import RiderStatusToggle from "./_components/Riderstatustoggle";
import AvailableOrdersTable from "./_components/Availableorderstable";
import AssignedOrdersTable from "./_components/Assignedorderstable";


type TabKey = "available" | "assigned";

const RiderDashboardPage = () => {
  const [tab, setTab] = useState<TabKey>("available");

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-black text-gray-900">Rider Dashboard</h1>
          <RiderStatusToggle />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-md border border-gray-100 w-fit">
          <button
            onClick={() => setTab("available")}
            className={
              "px-5 py-2 rounded-md text-sm font-bold transition-all " +
              (tab === "available"
                ? "bg-[var(--color-primary)] text-white"
                : "text-gray-500 hover:bg-gray-50")
            }
          >
            Available Orders
          </button>
          <button
            onClick={() => setTab("assigned")}
            className={
              "px-5 py-2 rounded-md text-sm font-bold transition-all " +
              (tab === "assigned"
                ? "bg-[var(--color-primary)] text-white"
                : "text-gray-500 hover:bg-gray-50")
            }
          >
            My Orders
          </button>
        </div>

        {tab === "available" ? <AvailableOrdersTable /> : <AssignedOrdersTable />}
      </div>
    </div>
  );
};

export default RiderDashboardPage;