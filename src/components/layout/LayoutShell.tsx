"use client";

import TopNavbar from "@/components/layout/Header/TopNavber";
import SidebarCategories from "@/components/shared/SidebarCategories";
import { useState } from "react";


export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <TopNavbar
        onToggleDesktop={() => setDesktopOpen(!desktopOpen)}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <SidebarCategories
          desktopOpen={desktopOpen}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}