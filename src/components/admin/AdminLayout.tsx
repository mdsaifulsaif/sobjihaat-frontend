// components/AdminLayout.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiCreditCard,
  FiTruck,
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiPackage,
  FiPower,
} from "react-icons/fi";
import { useSocket } from "@/lib/socket";
import { useGetMyRiderProfileQuery, useUpdateRiderStatusMutation } from "@/redux/api/riderApi";
import { toast } from "react-hot-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  badge: string | null;
  badgeColor?: string;
  submenu?: { name: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/rider-dashboard",
    icon: FiHome,
    badge: null,
  },
  {
    name: "Orders",
    href: "/rider-dashboard/orders",
    icon: FiShoppingCart,
    badge: "12",
    badgeColor: "bg-red-500",
  },
  {
    name: "Profile",
    href: "/rider-dashboard/profile",
    icon: FiUsers,
    badge: null,
  },
  {
    name: "Earnings",
    href: "/rider-dashboard/earnings",
    icon: FiDollarSign,
    badge: null,
  },
  {
    name: "Payout History",
    href: "/rider-dashboard/payout",
    icon: FiClock,
    badge: null,
  },
  {
    name: "Request Payout",
    href: "/rider-dashboard/payout/request",
    icon: FiCreditCard,
    badge: "5",
    badgeColor: "bg-yellow-500",
  },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement>(null);

  const {
    isConnected,
    notifications,
    unreadCount,
    riderAreas,
    isLoading,
    markAsRead,
    markAllAsRead,
  } = useSocket();

  // ✅ Rider Online Status State & Mutation
  const { data: riderProfileData, refetch: refetchRiderProfile } = useGetMyRiderProfileQuery(undefined);
  const [updateRiderStatus, { isLoading: isUpdatingStatus }] = useUpdateRiderStatusMutation();

  const riderProfile = riderProfileData?.data;
  const isOnline = riderProfile?.status === "online";

  const handleToggleOnline = async () => {
    const nextStatus = isOnline ? "offline" : "online";
    try {
      await updateRiderStatus({ status: nextStatus }).unwrap();
      toast.success(
        nextStatus === "online"
          ? "আপনি এখন অনলাইন আছেন! 🛵"
          : "আপনি এখন অফলাইনে আছেন। 💤"
      );
      refetchRiderProfile();
    } catch (err: any) {
      toast.error(err?.data?.message || "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে");
    }
  };

  // ✅ Request notification permission
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Debug logs
  useEffect(() => {
    console.log("🔔 Notifications:", notifications);
    console.log("📍 Rider Areas:", riderAreas);
  }, [notifications, riderAreas]);

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    setShowNotifications(false);
    router.push(`/rider-dashboard/orders/${notification.orderID}`);
  };

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch (e) {
      return "Just now";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("riderID");
    localStorage.removeItem("riderAreas");
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/rider-dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // ✅ Get display text for areas
  const getAreaDisplayText = () => {
    if (!riderAreas || riderAreas.length === 0) {
      return "No Area";
    }
    if (riderAreas.length === 1) {
      return riderAreas[0];
    }
    return `${riderAreas.length} Areas`;
  };

  // ✅ Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#619d23] border-r-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading rider data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-[#1E293B] text-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-72" : "w-20"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700/50">
          {sidebarOpen && (
            <Link href="/rider-dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#619d23] to-[#548a1e] flex items-center justify-center font-bold text-lg shadow-md">
                <FiTruck className="text-white" size={22} />
              </div>
              <div>
                <span className="font-bold text-lg">Rider Panel</span>
                <p className="text-xs text-gray-400">Delivery Dashboard</p>
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-2 hover:bg-white/10 rounded-md transition-colors"
          >
            <FiMenu size={20} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-md"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-10rem)] custom-scrollbar">
          {sidebarOpen && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">Main Menu</p>
          )}

          {menuItems.map((item) => {
            const active = isActive(item.href);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenu === item.name;

            return (
              <div key={item.name}>
                <Link
                  href={hasSubmenu ? "#" : item.href}
                  onClick={(e) => {
                    if (hasSubmenu) {
                      e.preventDefault();
                      setExpandedMenu(isExpanded ? null : item.name);
                    }
                  }}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200
                    ${active ? "bg-[#619d23] text-white shadow-md shadow-[#619d23]/25" : "text-gray-300 hover:bg-white/10 hover:text-white"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    {sidebarOpen && <span className="font-medium">{item.name}</span>}
                  </div>
                  {sidebarOpen && (
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 text-xs font-bold rounded-full ${item.badgeColor || "bg-gray-600"}`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {hasSubmenu && (
                        <FiChevronDown
                          size={16}
                          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  )}
                </Link>

                {hasSubmenu && isExpanded && sidebarOpen && item.submenu && (
                  <div className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`
                          block px-4 py-2 rounded-md text-sm transition-colors
                          ${pathname === sub.href ? "text-[#619d23] bg-[#619d23]/10" : "text-gray-400 hover:text-white hover:bg-white/5"}
                        `}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50 bg-[#1E293B]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shadow-sm">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
            >
              <FiMenu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-md px-4 py-2.5">
              <FiSearch className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders, deliveries..."
                className="bg-transparent outline-none w-72 text-sm"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* ✅ Areas Display */}
            {riderAreas && riderAreas.length > 0 ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                <FiMapPin size={14} className="text-blue-600" />
                <span className="text-xs font-medium text-blue-700">
                  {getAreaDisplayText()}
                </span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full">
                <FiMapPin size={14} className="text-yellow-600" />
                <span className="text-xs font-medium text-yellow-700">No Area</span>
              </div>
            )}

            {/* Rider Online / Offline Toggle Button */}
            <button
              onClick={handleToggleOnline}
              disabled={isUpdatingStatus}
              title={isOnline ? "অনলাইন আছেন (ক্লিক করে অফলাইন হন)" : "অফলাইন আছেন (ক্লিক করে অনলাইন হন)"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-60 border ${
                isOnline
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOnline ? "bg-emerald-500 animate-pulse ring-2 ring-emerald-300" : "bg-gray-400"
                }`}
              />
              <span className="font-bold">
                {isUpdatingStatus ? "Updating..." : isOnline ? "Online" : "Offline"}
              </span>
              <span
                className={`text-[10px] font-mono px-1 py-0.2 rounded-xs font-black uppercase ${
                  isOnline ? "bg-emerald-200 text-emerald-800" : "bg-gray-200 text-gray-700"
                }`}
              >
                {isOnline ? "Active" : "Off"}
              </span>
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  console.log("Current notifications:", notifications);
                }}
                className="relative p-2.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FiBell size={22} className="text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 max-h-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#619d23]/5 to-[#548a1e]/5">
                    <div>
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <p className="text-xs text-gray-500">
                        {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
                      </p>
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-[#619d23] hover:text-[#548a1e] font-medium hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div className="overflow-y-auto max-h-[400px]">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FiBell size={24} className="text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">No notifications yet</p>
                        <p className="text-xs text-gray-400">New orders will appear here</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            !notification.read ? "bg-[#619d23]/5 border-l-4 border-l-[#619d23]" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notification.paymentMethod === "cod" ? "bg-green-100" : "bg-blue-100"
                              }`}
                            >
                              <FiPackage
                                className={notification.paymentMethod === "cod" ? "text-green-600" : "text-blue-600"}
                                size={18}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-gray-800">
                                  New Order
                                  <span className="ml-1 text-xs font-normal text-gray-500">
                                    #{notification.orderNumber}
                                  </span>
                                </p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-[#619d23] rounded-full flex-shrink-0 mt-1.5"></span>
                                )}
                              </div>

                              <div className="mt-1 space-y-1">
                                <p className="text-xs text-gray-600">
                                  <span className="font-medium text-[#619d23]">{notification.totalAmount} TK</span>
                                  {" • "}
                                  {notification.itemCount} item{notification.itemCount > 1 ? "s" : ""}
                                  {" • "}
                                  <span className="capitalize">{notification.paymentMethod}</span>
                                </p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <FiMapPin size={12} className="text-blue-500" />
                                  <span className="font-medium text-blue-600">
                                    {notification.area || notification.deliveryAddress?.area || "N/A"}
                                  </span>
                                  {notification.deliveryAddress?.city && (
                                    <span className="text-gray-400">, {notification.deliveryAddress.city}</span>
                                  )}
                                </p>
                                <p className="text-xs font-medium text-green-600">
                                  💰 Commission: {notification.riderCommission} TK
                                </p>
                                {notification.type === "admin-order" && notification.availableRiders && notification.availableRiders.length > 0 && (
                                  <div className="mt-1 p-1.5 bg-blue-50 rounded-md">
                                    <p className="text-[10px] font-semibold text-blue-700">
                                      🏍️ {notification.availableRiders.length} rider(s) available
                                    </p>
                                  </div>
                                )}
                              </div>

                              <p className="text-xs text-gray-400 mt-1.5">{formatTime(notification.timestamp)}</p>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-100 bg-gray-50">
                      <Link
                        href="/rider-dashboard/orders"
                        className="block text-center text-sm text-[#619d23] hover:text-[#548a1e] font-medium"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all orders →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <Link
              href="/rider-dashboard/profile"
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2 transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#619d23] to-[#548a1e] flex items-center justify-center text-white font-bold shadow-md">
                <FiTruck className="text-white" size={18} />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {riderProfile?.fullName || "Rider User"}
                </p>
                <p className="text-xs text-gray-500">Delivery Rider</p>
              </div>
              <FiChevronDown className="hidden sm:block text-gray-400" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;