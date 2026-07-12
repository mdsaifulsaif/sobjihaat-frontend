"use client";

import React, { useState } from "react";
import {
  useGetAvailableOrdersQuery,
  useAcceptOrderMutation,
  useRejectOrderMutation,
} from "@/redux/api/orderApi";
import { toast } from "react-hot-toast";
import { FiPackage, FiClock, FiCheck, FiX, FiRefreshCw } from "react-icons/fi";
import {RiderOrder, getAreaLabel, getTimeLeft} from "@/types/rider-order.types";
// import { RiderOrder, getAreaLabel, getTimeLeft } from "./types";

const AvailableOrdersTable = () => {
  const [showAllAreas, setShowAllAreas] = useState(false);
  const [page, setPage] = useState(1);
  const [actingOrderId, setActingOrderId] = useState<string | null>(null);

  const {
    data: availableData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAvailableOrdersQuery(
    { showAllAreas, page, limit: 10 },
    { pollingInterval: 15000 }
  );

  const [acceptOrder, { isLoading: isAccepting }] = useAcceptOrderMutation();
  const [rejectOrder, { isLoading: isRejecting }] = useRejectOrderMutation();

  const orders: RiderOrder[] = Array.isArray(availableData?.data)
    ? availableData.data
    : [];
  const meta = availableData?.meta;
  const isBusy = isAccepting || isRejecting;

  const handleAccept = async (id: string) => {
    setActingOrderId(id);
    try {
      await acceptOrder(id).unwrap();
      toast.success("Order accepted! Check 'My Orders' tab.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to accept order");
    } finally {
      setActingOrderId(null);
    }
  };

  const handleReject = async (id: string) => {
    setActingOrderId(id);
    try {
      await rejectOrder(id).unwrap();
      toast.success("Order rejected");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reject order");
    } finally {
      setActingOrderId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showAllAreas}
            onChange={(e) => setShowAllAreas(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          Show all areas
        </label>

        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
        >
          <FiRefreshCw className={isFetching ? "animate-spin" : ""} size={14} />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-md border border-gray-100 p-12 text-center">
          <FiPackage size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No available orders right now</p>
        </div>
      ) : (
        <div className="bg-white rounded-md border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Expires</th>
                <th className="px-4 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 last:border-0 align-top">
                  <td className="px-4 py-4 font-bold text-gray-800 whitespace-nowrap">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-gray-800">{order.deliveryAddress.name}</p>
                    <p className="text-xs text-gray-500">{getAreaLabel(order.deliveryAddress)}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-50 px-2 py-1 rounded-md text-gray-600 whitespace-nowrap"
                        >
                          {item.productName} x {item.quantity}
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-xs text-gray-400">+{order.items.length - 3} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-black text-gray-900 whitespace-nowrap">
                    ৳{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">
                    {order.paymentMethod === "cod" ? "COD" : order.paymentMethod}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full w-fit">
                      <FiClock size={12} />
                      {getTimeLeft(order.pendingExpiresAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleReject(order._id)}
                        disabled={isBusy}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                      >
                        <FiX size={14} />
                        {actingOrderId === order._id && isRejecting ? "..." : "Reject"}
                      </button>
                      <button
                        onClick={() => handleAccept(order._id)}
                        disabled={isBusy}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-md text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        <FiCheck size={14} />
                        {actingOrderId === order._id && isAccepting ? "..." : "Accept"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.totalPage > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={
                "w-9 h-9 rounded-md text-sm font-bold transition-all " +
                (p === page
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")
              }
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableOrdersTable;