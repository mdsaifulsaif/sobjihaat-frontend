

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