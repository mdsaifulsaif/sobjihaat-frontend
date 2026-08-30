// "use client";

// import React, { useState } from "react";
// import {
//   useGetMyAssignedOrdersQuery,
//   useMarkOutForDeliveryMutation,
//   useMarkDeliveredMutation,
//   useRejectOrderMutation,
// } from "@/redux/api/orderApi";
// import { toast } from "react-hot-toast";
// import { FiTruck, FiCheck, FiPhone, FiRefreshCw, FiXCircle } from "react-icons/fi";
// import { RiderOrder, TERMINAL_STATUSES, getAreaLabel } from "../../../../../types/rider-order.types";

// const StatusBadge = ({ status }: { status: string }) => {
//   const map: Record<string, { label: string; cls: string }> = {
//     pending: { label: "Pending", cls: "bg-gray-50 text-gray-600" },
//     confirmed: { label: "Confirmed", cls: "bg-blue-50 text-blue-600" },
//     processing: { label: "Processing", cls: "bg-blue-50 text-blue-600" },
//     shipped: { label: "Shipped", cls: "bg-purple-50 text-purple-600" },
//     out_for_delivery: { label: "Out for Delivery", cls: "bg-purple-50 text-purple-600" },
//     delivered: { label: "Delivered", cls: "bg-green-50 text-green-600" },
//     cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600" },
//     returned: { label: "Returned", cls: "bg-red-50 text-red-600" },
//   };
//   const s = map[status] || { label: status, cls: "bg-gray-50 text-gray-600" };
//   return (
//     <span className={"text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap " + s.cls}>
//       {s.label}
//     </span>
//   );
// };

// const AssignedOrdersTable = () => {
//   const [actingOrderId, setActingOrderId] = useState<string | null>(null);
//   const [showCancelled, setShowCancelled] = useState(true);

//   const {
//     data: assignedData,
//     isLoading,
//     isFetching,
//     refetch,
//   } = useGetMyAssignedOrdersQuery(undefined, { pollingInterval: 15000 });

//   const [markOutForDelivery, { isLoading: isMarkingOut }] =
//     useMarkOutForDeliveryMutation();
//   const [markDelivered, { isLoading: isMarkingDelivered }] =
//     useMarkDeliveredMutation();
//   const [rejectOrder, { isLoading: isCancelling }] = useRejectOrderMutation();

//   // ✅ handles both shapes: { data: [...] } and { data: { orders: [...] } }
//   const allOrders: RiderOrder[] = Array.isArray(assignedData?.data)
//     ? assignedData.data
//     : Array.isArray(assignedData?.data?.orders)
//     ? assignedData.data.orders
//     : [];

//   const orders = showCancelled
//     ? allOrders
//     : allOrders.filter((o) => o.status !== "cancelled" && o.status !== "returned");

//   const isBusy = isMarkingOut || isMarkingDelivered || isCancelling;

//   const handleOutForDelivery = async (id: string) => {
//     setActingOrderId(id);
//     try {
//       await markOutForDelivery(id).unwrap();
//       toast.success("Marked as out for delivery");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update order");
//     } finally {
//       setActingOrderId(null);
//     }
//   };

//   const handleDelivered = async (id: string) => {
//     setActingOrderId(id);
//     try {
//       await markDelivered(id).unwrap();
//       toast.success("Order marked as delivered");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update order");
//     } finally {
//       setActingOrderId(null);
//     }
//   };

//   const handleCancel = async (id: string) => {
//     const confirmed = window.confirm("Ei order cancel korte chao? Ei kaj revert kora jabe na.");
//     if (!confirmed) return;

//     setActingOrderId(id);
//     try {
//       await rejectOrder(id).unwrap();
//       toast.success("Order cancelled");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to cancel order");
//     } finally {
//       setActingOrderId(null);
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={showCancelled}
//             onChange={(e) => setShowCancelled(e.target.checked)}
//             className="w-4 h-4 rounded"
//           />
//           Show cancelled/returned
//         </label>

//         <button
//           onClick={() => refetch()}
//           className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
//         >
//           <FiRefreshCw className={isFetching ? "animate-spin" : ""} size={14} />
//           Refresh
//         </button>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center py-20">
//           <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="bg-white rounded-md border border-gray-100 p-12 text-center">
//           <FiTruck size={40} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500 font-medium">
//             No assigned orders yet. Accept one from Available Orders.
//           </p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-md border border-gray-100 overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-100 text-left">
//                 <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Order</th>
//                 <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Customer</th>
//                 <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Items</th>
//                 <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Amount</th>
//                 <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
//                 <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => {
//                 const isTerminal = TERMINAL_STATUSES.includes(order.status);
//                 const isOutForDelivery =
//                   order.status === "out_for_delivery" || order.status === "shipped";

//                 return (
//                   <tr key={order._id} className="border-b border-gray-50 last:border-0 align-top">
//                     <td className="px-4 py-4 font-bold text-gray-800 whitespace-nowrap">
//                       {order.orderNumber}
//                     </td>
//                     <td className="px-4 py-4">
//                       <p className="font-bold text-gray-800">{order.deliveryAddress.name}</p>
//                       <p className="text-xs text-gray-500">{getAreaLabel(order.deliveryAddress)}</p>
//                       <a
//                         href={"tel:" + order.deliveryAddress.phone}
//                         className="flex items-center gap-1 text-xs text-blue-600 font-bold mt-1 w-fit"
//                       >
//                         <FiPhone size={12} />
//                         {order.deliveryAddress.phone}
//                       </a>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex flex-wrap gap-1 max-w-xs">
//                         {order.items.slice(0, 3).map((item, idx) => (
//                           <span
//                             key={idx}
//                             className="text-xs bg-gray-50 px-2 py-1 rounded-md text-gray-600 whitespace-nowrap"
//                           >
//                             {item.productName} x {item.quantity}
//                           </span>
//                         ))}
//                         {order.items.length > 3 && (
//                           <span className="text-xs text-gray-400">+{order.items.length - 3} more</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 font-black text-gray-900 whitespace-nowrap">
//                       ৳{order.totalAmount.toLocaleString()}
//                     </td>
//                     <td className="px-4 py-4">
//                       <StatusBadge status={order.status} />
//                       {order.status === "cancelled" && order.cancelReason && (
//                         <p className="text-xs text-gray-400 mt-1 max-w-[160px]">{order.cancelReason}</p>
//                       )}
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex flex-col gap-2 items-end">
//                         {!isTerminal && !isOutForDelivery && (
//                           <button
//                             onClick={() => handleOutForDelivery(order._id)}
//                             disabled={isBusy}
//                             className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-md text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50 w-full justify-center"
//                           >
//                             <FiTruck size={14} />
//                             {actingOrderId === order._id && isMarkingOut ? "..." : "Out for Delivery"}
//                           </button>
//                         )}

//                         {!isTerminal && isOutForDelivery && (
//                           <button
//                             onClick={() => handleDelivered(order._id)}
//                             disabled={isBusy}
//                             className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50 w-full justify-center"
//                           >
//                             <FiCheck size={14} />
//                             {actingOrderId === order._id && isMarkingDelivered ? "..." : "Mark Delivered"}
//                           </button>
//                         )}

//                         {!isTerminal && (
//                           <button
//                             onClick={() => handleCancel(order._id)}
//                             disabled={isBusy}
//                             className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-md text-xs font-bold hover:bg-red-50 transition-all disabled:opacity-50 w-full justify-center"
//                           >
//                             <FiXCircle size={14} />
//                             {actingOrderId === order._id && isCancelling ? "..." : "Cancel"}
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignedOrdersTable;


"use client";

import React, { useState } from "react";
import {
  useGetMyAssignedOrdersQuery,
  useMarkOutForDeliveryMutation,
  useMarkDeliveredMutation,
  useRejectOrderMutation,
  // useMarkReturnedMutation, // আপনার API-তে রিটার্ন করার কোনো Mutation থাকলে এখানে ইমপোর্ট করে নিবেন
} from "@/redux/api/orderApi";
import { toast } from "react-hot-toast";
import { FiTruck, FiCheck, FiPhone, FiRefreshCw, FiXCircle, FiCopy, FiRotateCcw } from "react-icons/fi";
import { RiderOrder, TERMINAL_STATUSES, getAreaLabel } from "../../../../../types/rider-order.types";

const BRAND = "var(--color-primary)";

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; bg: string; text: string }> = {
    pending: { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-700" },
    confirmed: { label: "Confirmed", bg: "bg-blue-50", text: "text-blue-700" },
    processing: { label: "Processing", bg: "bg-blue-50", text: "text-blue-700" },
    shipped: { label: "Shipped", bg: "bg-purple-50", text: "text-purple-700" },
    out_for_delivery: { label: "Out for Delivery", bg: "bg-purple-50", text: "text-purple-700" },
    delivered: { label: "Delivered", bg: "bg-green-50", text: "text-green-700" },
    cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-red-700" },
    returned: { label: "Returned", bg: "bg-red-50", text: "text-red-700" },
  };
  const s = map[status] || { label: status, bg: "bg-gray-50", text: "text-gray-600" };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
};

const PaymentBadge = ({ method, status }: { method: string; status: string }) => (
  <div className="text-xs">
    <p className="font-bold uppercase text-gray-600">{method === "cod" ? "COD" : method}</p>
    <p
      className={`text-[10px] font-semibold mt-0.5 ${
        status === "paid" ? "text-green-600" : "text-yellow-600"
      }`}
    >
      {status === "paid" ? "Paid" : "Unpaid"}
    </p>
  </div>
);

const AssignedOrdersTable = () => {
  const [actingOrderId, setActingOrderId] = useState<string | null>(null);
  const [showCancelled, setShowCancelled] = useState(true);

  const {
    data: assignedData,
    isLoading,
    isFetching,
    refetch,
  } = useGetMyAssignedOrdersQuery(undefined, { pollingInterval: 15000 });

  const [markOutForDelivery, { isLoading: isMarkingOut }] = useMarkOutForDeliveryMutation();
  const [markDelivered, { isLoading: isMarkingDelivered }] = useMarkDeliveredMutation();
  const [rejectOrder, { isLoading: isCancelling }] = useRejectOrderMutation();
  // const [markReturned] = useMarkReturnedMutation(); // রিটার্ন API থাকলে এখানে ব্যবহার করবেন

  const allOrders: RiderOrder[] = Array.isArray(assignedData?.data)
    ? assignedData.data
    : Array.isArray(assignedData?.data?.orders)
      ? assignedData.data.orders
      : [];

  const orders = showCancelled
    ? allOrders
    : allOrders.filter((o) => o.status !== "cancelled" && o.status !== "returned");

  const isBusy = isMarkingOut || isMarkingDelivered || isCancelling;

  const handleOutForDelivery = async (id: string) => {
    setActingOrderId(id);
    try {
      await markOutForDelivery(id).unwrap();
      toast.success("Marked as out for delivery");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update order");
    } finally {
      setActingOrderId(null);
    }
  };

  const handleDelivered = async (id: string) => {
    setActingOrderId(id);
    try {
      await markDelivered(id).unwrap();
      toast.success("Order marked as delivered");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update order");
    } finally {
      setActingOrderId(null);
    }
  };

  const handleReturn = async (id: string) => {
    const confirmed = window.confirm("Ei order ki return hisebe mark korte chao?");
    if (!confirmed) return;

    setActingOrderId(id);
    try {
      // await markReturned(id).unwrap(); // API কল এখানে হবে
      toast.success("Order marked as returned");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to mark as returned");
    } finally {
      setActingOrderId(null);
    }
  };

  const handleCancel = async (id: string) => {
    const confirmed = window.confirm("Ei order cancel korte chao? Ei kaj revert kora jabe na.");
    if (!confirmed) return;

    setActingOrderId(id);
    try {
      await rejectOrder(id).unwrap();
      toast.success("Order cancelled");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel order");
    } finally {
      setActingOrderId(null);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showCancelled}
            onChange={(e) => setShowCancelled(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          Show cancelled/returned
        </label>

        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
        >
          <FiRefreshCw className={isFetching ? "animate-spin" : ""} size={14} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"
              style={{ borderTopColor: BRAND }}
            />
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <FiTruck size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">
              No assigned orders yet. Accept one from Available Orders.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[140px]">
                    Order
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[170px]">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[180px]">
                    Items
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[150px]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[160px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order: any) => {
                  const isTerminal = TERMINAL_STATUSES.includes(order.status);
                  const isOutForDelivery =
                    order.status === "out_for_delivery" || order.status === "shipped";
                  const isDelivered = order.status === "delivered";

                  return (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors align-top">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="font-semibold" style={{ color: BRAND }}>
                          {order.orderNumber}
                        </p>
                        <button
                          onClick={() => handleCopy(order.orderNumber)}
                          className="mt-1 text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1"
                        >
                          <FiCopy size={11} /> Copy
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800">{order.deliveryAddress.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {getAreaLabel(order.deliveryAddress)}
                        </p>
                        <a
                          href={`tel:${order.deliveryAddress.phone}`}
                          className="flex items-center gap-1 text-xs text-blue-600 font-bold mt-1 w-fit"
                        >
                          <FiPhone size={11} />
                          {order.deliveryAddress.phone}
                        </a>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        <ul className="space-y-0.5">
                          {order.items.slice(0, 3).map((item: any, idx: number) => (
                            <li key={idx} className="whitespace-nowrap text-xs">
                              {item.productName}{" "}
                              <span className="text-gray-400">x{item.quantity}</span>
                            </li>
                          ))}
                          {order.items.length > 3 && (
                            <li className="text-gray-400 text-xs">
                              +{order.items.length - 3} more
                            </li>
                          )}
                        </ul>
                      </td>

                      <td className="px-4 py-4 font-black text-gray-900 whitespace-nowrap">
                        ৳{order.totalAmount.toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <PaymentBadge method={order.paymentMethod} status={order.paymentStatus} />
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={order.status} />
                        {order.status === "cancelled" && order.cancelReason && (
                          <p className="text-xs text-gray-400 mt-1 max-w-[160px]">
                            {order.cancelReason}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-2 items-end">
                          {/* ধাপ ১: Out for Delivery */}
                          {!isTerminal && !isOutForDelivery && !isDelivered && (
                            <button
                              onClick={() => handleOutForDelivery(order._id)}
                              disabled={isBusy}
                              className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-md text-xs font-bold hover:opacity-95 transition-all disabled:opacity-50 w-full justify-center"
                            >
                              <FiTruck size={14} />
                              {actingOrderId === order._id && isMarkingOut ? "..." : "Out for Delivery"}
                            </button>
                          )}

                          {/* ধাপ ২: Mark Delivered */}
                          {!isTerminal && isOutForDelivery && (
                            <button
                              onClick={() => handleDelivered(order._id)}
                              disabled={isBusy}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-bold hover:opacity-95 transition-all disabled:opacity-50 w-full justify-center"
                            >
                              <FiCheck size={14} />
                              {actingOrderId === order._id && isMarkingDelivered
                                ? "..."
                                : "Mark Delivered"}
                            </button>
                          )}

                          {/* ধাপ ৩: Delivered হওয়ার পর Return অপশন এনাবল হবে */}
                          {isDelivered && (
                            <button
                              onClick={() => handleReturn(order._id)}
                              disabled={isBusy}
                              className="flex items-center gap-1 px-3 py-1.5 bg-orange-600 text-white rounded-md text-xs font-bold hover:opacity-95 transition-all disabled:opacity-50 w-full justify-center"
                            >
                              <FiRotateCcw size={14} />
                              {actingOrderId === order._id ? "..." : "Mark Returned"}
                            </button>
                          )}

                          {/* ক্যান্সেল বাটন (রাইডারকে রাখতে চাইলে) */}
                          {!isTerminal && !isDelivered && (
                            <button
                              onClick={() => handleCancel(order._id)}
                              disabled={isBusy}
                              className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-md text-xs font-bold hover:bg-red-50 transition-all disabled:opacity-50 w-full justify-center"
                            >
                              <FiXCircle size={14} />
                              {actingOrderId === order._id && isCancelling ? "..." : "Cancel"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedOrdersTable;