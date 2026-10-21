"use client";

import React, { useState } from "react";
import {
  useGetMyAssignedOrdersQuery,
  useMarkOutForDeliveryMutation,
  useMarkDeliveredMutation,
  useMarkReturnedMutation,
} from "@/redux/api/orderApi";
import { useGetMyRiderProfileQuery } from "@/redux/api/riderApi";
import { toast } from "react-hot-toast";
import {
  FiTruck,
  FiCheck,
  FiPhone,
  FiRefreshCw,
  FiCopy,
  FiRotateCcw,
  FiAlertCircle,
  FiEye,
  FiX,
} from "react-icons/fi";
import {
  RiderOrder,
  TERMINAL_STATUSES,
  getAreaLabel,
} from "../../../../../types/rider-order.types";
import RiderOrderDetailsModal from "./RiderOrderDetailsModal";

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
    returned: { label: "Returned", bg: "bg-orange-50", text: "text-orange-700" },
  };
  const s = map[status] || { label: status, bg: "bg-gray-50", text: "text-gray-600" };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}
    >
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
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const {
    data: assignedData,
    isLoading,
    isFetching,
    refetch,
  } = useGetMyAssignedOrdersQuery(undefined, { pollingInterval: 15000 });

  const { data: profileData } = useGetMyRiderProfileQuery(undefined);
  const isOnline = profileData?.data?.status === "online";

  const [markOutForDelivery, { isLoading: isMarkingOut }] = useMarkOutForDeliveryMutation();
  const [markDelivered, { isLoading: isMarkingDelivered }] = useMarkDeliveredMutation();
  const [markReturned, { isLoading: isMarkingReturned }] = useMarkReturnedMutation();

  const [returnModalOrder, setReturnModalOrder] = useState<RiderOrder | null>(null);
  const [returnReason, setReturnReason] = useState("Damaged Goods");
  const [returnCondition, setReturnCondition] = useState<"damaged" | "good" | "wrong_item">("damaged");
  const [returnNote, setReturnNote] = useState("");

  const allOrders: RiderOrder[] = Array.isArray(assignedData?.data)
    ? assignedData.data
    : Array.isArray(assignedData?.data?.orders)
      ? assignedData.data.orders
      : [];

  const orders = showCancelled
    ? allOrders
    : allOrders.filter((o) => o.status !== "cancelled" && o.status !== "returned");

  const isBusy = isMarkingOut || isMarkingDelivered || isMarkingReturned;

  const handleOutForDelivery = async (id: string) => {
    if (!isOnline) {
      toast.error("আগে অনলাইন হন! ডেলিভারি শুরু করার আগে অনলাইন হওয়া আবশ্যক।");
      return;
    }
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
    if (!isOnline) {
      toast.error("আগে অনলাইন হন! ডেলিভারি সম্পন্ন করার আগে অনলাইন হওয়া আবশ্যক।");
      return;
    }
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

  const handleConfirmReturn = async () => {
    if (!returnModalOrder) return;
    if (!isOnline) {
      toast.error("আগে অনলাইন হন!");
      return;
    }
    setActingOrderId(returnModalOrder._id);
    try {
      await markReturned({
        id: returnModalOrder._id,
        returnReason,
        returnCondition,
        returnNote,
      }).unwrap();
      toast.success("অর্ডার সফলভাবে রিটার্ন হিসেবে রিপোর্ট করা হয়েছে!");
      setReturnModalOrder(null);
      setReturnNote("");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "রিটার্ন আপডেট করতে ব্যর্থ হয়েছে");
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
      {/* Offline warning banner */}
      {!isOnline && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-3 rounded-sm shadow-xs">
          <FiAlertCircle size={16} className="text-amber-600 flex-shrink-0" />
          <span>
            আপনি এখন অফলাইনে আছেন। কোনো অ্যাকশন করতে দয়া করে উপরের টগল বাটনে ক্লিক করে আগে অনলাইন হন।
          </span>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-sm border border-gray-200 p-4 shadow-xs">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showCancelled}
            onChange={(e) => setShowCancelled(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
          />
          Show cancelled/returned
        </label>

        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
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
            <table className="w-full text-left min-w-[1050px]">
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
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[130px]">
                    Your Earning
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[140px]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[180px]">
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
                        <button
                          onClick={() => setSelectedOrderId(order._id)}
                          className="font-semibold text-left hover:underline cursor-pointer flex items-center gap-1.5"
                          style={{ color: BRAND }}
                          title="Click to view order details"
                        >
                          {order.orderNumber}
                          <FiEye size={13} className="opacity-70" />
                        </button>
                        <button
                          onClick={() => handleCopy(order.orderNumber)}
                          className="mt-1 text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-pointer"
                        >
                          <FiCopy size={11} /> Copy
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800">{order.deliveryAddress?.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {getAreaLabel(order.deliveryAddress)}
                        </p>
                        <a
                          href={`tel:${order.deliveryAddress?.phone}`}
                          className="flex items-center gap-1 text-xs text-blue-600 font-bold mt-1 w-fit"
                        >
                          <FiPhone size={11} />
                          {order.deliveryAddress?.phone}
                        </a>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        <ul className="space-y-0.5">
                          {order.items?.slice(0, 3).map((item: any, idx: number) => (
                            <li key={idx} className="whitespace-nowrap text-xs">
                              {item.productName}{" "}
                              <span className="text-gray-400">x{item.quantity}</span>
                            </li>
                          ))}
                          {order.items?.length > 3 && (
                            <li className="text-gray-400 text-xs">
                              +{order.items.length - 3} more
                            </li>
                          )}
                        </ul>
                      </td>

                      <td className="px-4 py-4 font-black text-gray-900 whitespace-nowrap">
                        ৳{order.totalAmount?.toLocaleString()}
                      </td>

                      {/* ✅ Your Earning / Rider Commission */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-md">
                          <p className="font-bold text-sm">
                            ৳{order.riderCommission ?? 0}
                          </p>
                          {order.commissionPercentage && (
                            <p className="text-[10px] text-emerald-600">
                              {order.commissionPercentage}% commission
                            </p>
                          )}
                        </span>
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
                        {order.status === "returned" && order.returnReason && (
                          <p className="text-xs text-orange-600 mt-1 max-w-[160px] font-medium">
                            {order.returnReason}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-2 items-end">
                          <button
                            onClick={() => setSelectedOrderId(order._id)}
                            className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-700 rounded-md text-xs font-bold hover:bg-gray-100 transition-all cursor-pointer w-full justify-center"
                          >
                            <FiEye size={14} /> Details
                          </button>

                          {/* ধাপ ১: Out for Delivery */}
                          {!isTerminal && !isOutForDelivery && !isDelivered && (
                            <button
                              onClick={() => handleOutForDelivery(order._id)}
                              disabled={isBusy}
                              className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-md text-xs font-bold hover:opacity-95 transition-all disabled:opacity-50 w-full justify-center cursor-pointer"
                            >
                              <FiTruck size={14} />
                              {actingOrderId === order._id && isMarkingOut ? "..." : "Out for Delivery"}
                            </button>
                          )}

                          {/* Mark Delivered */}
                          {!isTerminal && isOutForDelivery && (
                            <button
                              onClick={() => handleDelivered(order._id)}
                              disabled={isBusy}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-bold hover:opacity-95 transition-all disabled:opacity-50 w-full justify-center cursor-pointer"
                            >
                              <FiCheck size={14} />
                              {actingOrderId === order._id && isMarkingDelivered
                                ? "..."
                                : "Mark Delivered"}
                            </button>
                          )}

                          {/* Doorstep Return / Failed Delivery Report (Rider cannot Cancel) */}
                          {(isOutForDelivery || order.status === "assigned" || isDelivered) && !isTerminal && (
                            <button
                              onClick={() => {
                                if (!isOnline) {
                                  toast.error("আগে অনলাইন হন!");
                                  return;
                                }
                                setReturnModalOrder(order);
                              }}
                              disabled={isBusy}
                              className="flex items-center gap-1 px-3 py-1.5 bg-orange-600 text-white rounded-md text-xs font-bold hover:bg-orange-700 transition-all disabled:opacity-50 w-full justify-center cursor-pointer"
                              title="Customer doorstep return / failed delivery"
                            >
                              <FiRotateCcw size={14} />
                              {actingOrderId === order._id ? "..." : "Report Return"}
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

      {/* ✅ Order Details Modal */}
      {selectedOrderId && (
        <RiderOrderDetailsModal
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          isOnline={isOnline}
        />
      )}

      {/* ✅ Rider Return Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-orange-500 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <FiRotateCcw /> অর্ডার রিটার্ন রিপোর্ট
                </h3>
                <p className="text-xs text-orange-100 mt-0.5 font-mono">
                  #{returnModalOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={() => setReturnModalOrder(null)}
                className="text-white hover:bg-orange-600 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                <span className="font-bold">সতর্কতা:</span> রাইডার হিসেবে আপনি অর্ডার বাতিল করতে পারবেন না। কাস্টমার পণ্য গ্রহণে অস্বীকৃতি জানালে বা কোনো সমস্যা হলে নোট সহ রিটার্ন রিপোর্ট সাবমিট করুন।
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                  রিটার্নের প্রধান কারণ (Reason)
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="Customer refused delivery">কাস্টমার ডেলিভারি নিতে চাননি (Refused)</option>
                  <option value="Customer unreachable / Phone switched off">কাস্টমারের ফোন বন্ধ / যোগাযোগ করা যায়নি</option>
                  <option value="Damaged Goods">পণ্য ক্ষতিগ্রস্ত (Damaged)</option>
                  <option value="Wrong Item delivered">ভুল পণ্য এসেছে (Wrong Item)</option>
                  <option value="Customer requested delay">কাস্টমার পরে নিতে চেয়েছেন</option>
                  <option value="Other">অন্যান্য কারণ (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                  পণ্যের বর্তমান অবস্থা (Condition)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["good", "damaged", "wrong_item"] as const).map((cond) => (
                    <button
                      type="button"
                      key={cond}
                      onClick={() => setReturnCondition(cond)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all text-center capitalize cursor-pointer ${
                        returnCondition === cond
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cond === "good" ? "ভালো (Good)" : cond === "damaged" ? "নষ্ট (Damaged)" : "ভুল (Wrong)"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                  রাইডার নোট / বিস্তারিত বিবরণ
                </label>
                <textarea
                  rows={3}
                  value={returnNote}
                  onChange={(e) => setReturnNote(e.target.value)}
                  placeholder="কাস্টমারের সাথে কী কথা হয়েছে বা কেন রিটার্ন হচ্ছে তা সংক্ষেপে লিখুন..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReturnModalOrder(null)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-50 text-xs transition-colors cursor-pointer"
                >
                  বাতিল করুন
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReturn}
                  disabled={isBusy}
                  className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-xs shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  {actingOrderId === returnModalOrder._id ? "সাবমিট হচ্ছে..." : "কনফার্ম রিটার্ন"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedOrdersTable;