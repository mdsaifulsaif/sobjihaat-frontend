
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiPlus,
  FiTrendingUp,
} from "react-icons/fi";
import { useGetMyPayoutHistoryQuery } from "@/redux/api/payoutApi";

const PayoutHistory = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  
  const { data, isLoading, refetch } = useGetMyPayoutHistoryQuery({
    page,
    limit: 10,
    status: status || undefined,
  });

  const payouts = data?.data?.data || [];
  const meta = data?.data?.meta;
  const summary = data?.data?.summary;

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-blue-100 text-blue-700",
      paid: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      pending: FiClock,
      approved: FiCheckCircle,
      paid: FiCheckCircle,
      rejected: FiAlertCircle,
    };
    return icons[status] || FiClock;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payout History</h1>
          <p className="text-gray-500 mt-1">Track all your payout requests</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <FiRefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
          <Link
            href="/rider-dashboard/payout/request"
            className="px-5 py-2.5 bg-[#5CAF90] text-white rounded-lg text-sm font-semibold hover:bg-[#4A9A7D] transition-colors flex items-center gap-2"
          >
            <FiPlus size={18} />
            Request Payout
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-gray-400" size={16} />
              <p className="text-sm text-gray-500">Total Requested</p>
            </div>
            <p className="text-xl font-bold text-gray-800">৳{summary.totalRequested || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-green-500" size={16} />
              <p className="text-sm text-gray-500">Paid</p>
            </div>
            <p className="text-xl font-bold text-green-600">৳{summary.totalPaid || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <FiClock className="text-yellow-500" size={16} />
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <p className="text-xl font-bold text-yellow-600">৳{summary.totalPending || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <FiAlertCircle className="text-red-500" size={16} />
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
            <p className="text-xl font-bold text-red-600">৳{summary.totalRejected || 0}</p>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStatus("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !status ? "bg-[#5CAF90] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {["pending", "approved", "paid", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                status === s ? "bg-[#5CAF90] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Payouts List */}
      <div className="space-y-4">
        {payouts.length > 0 ? (
          payouts.map((payout: any) => {
            const StatusIcon = getStatusIcon(payout.status);
            return (
              <div
                key={payout._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        ৳{payout.amount}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1 ${getStatusBadge(
                          payout.status
                        )}`}
                      >
                        <StatusIcon size={12} />
                        {payout.status}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600">
                      <p>Method: {payout.paymentMethod?.toUpperCase() || "N/A"}</p>
                      <p>Account: {payout.accountNumber || "N/A"}</p>
                      <p className="text-xs text-gray-400">
                        Requested: {new Date(payout.requestedAt).toLocaleString()}
                      </p>
                      {payout.paidAt && (
                        <p className="text-xs text-green-600">
                          Paid: {new Date(payout.paidAt).toLocaleString()}
                        </p>
                      )}
                      {payout.rejectedReason && (
                        <p className="text-xs text-red-600 col-span-2">
                          Reason: {payout.rejectedReason}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {payout.status === "pending" && (
                      <span className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium border border-yellow-200">
                        ⏳ Waiting for approval
                      </span>
                    )}
                    {payout.status === "approved" && (
                      <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-200">
                        ✅ Approved - Payment pending
                      </span>
                    )}
                    {payout.status === "paid" && (
                      <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-200">
                        💰 Payment completed
                      </span>
                    )}
                    {payout.status === "rejected" && (
                      <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium border border-red-200">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <FiDollarSign size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">No Payouts Found</h3>
            <p className="text-gray-400 mt-1">You haven't requested any payouts yet</p>
            <Link
              href="/rider-dashboard/payout/request"
              className="mt-4 inline-block px-6 py-2 bg-[#5CAF90] text-white rounded-lg hover:bg-[#4A9A7D] transition-colors"
            >
              Request Payout
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page} of {meta.totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PayoutHistory;