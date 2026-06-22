"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid, FiShoppingBag, FiPackage, FiUsers,
  FiTag, FiTruck, FiBarChart2, FiSettings,
  FiImage, FiSliders, FiX,
} from "react-icons/fi";

interface Props {
  desktopOpen: boolean;   // md+ sidebar দেখানো/লুকানো
  mobileOpen: boolean;    // mobile drawer দেখানো/লুকানো
  onMobileClose: () => void;
}

const navItems = [
  {
    section: "Main",
    links: [
      { label: "Overview",    href: "/dashboard/admin",             icon: FiGrid },
      { label: "Orders",      href: "/dashboard/admin/orders",      icon: FiShoppingBag },
      { label: "Products",    href: "/dashboard/admin/products",    icon: FiPackage },
      { label: "Customers",   href: "/dashboard/admin/customers",   icon: FiUsers },
    ],
  },
  {
    section: "Store",
    links: [
      { label: "Categories",  href: "/dashboard/admin/categories",  icon: FiTag },
      { label: "Banners",     href: "/dashboard/admin/banners",     icon: FiImage },
      { label: "Shipping",    href: "/dashboard/admin/shipping",    icon: FiTruck },
      { label: "Analytics",   href: "/dashboard/admin/analytics",   icon: FiBarChart2 },
    ],
  },
  {
    section: "System",
    links: [
      { label: "Settings",    href: "/dashboard/admin/settings",    icon: FiSettings },
      { label: "Site Config", href: "/dashboard/admin/site-config", icon: FiSliders },
    ],
  },
];

// Sidebar content — desktop আর mobile দুইটাতেই same content ব্যবহার হবে
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Mobile close button */}
      {onClose && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 md:hidden">
          <span className="font-semibold text-gray-700 text-sm">Menu</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-md"
          >
            <FiX size={16} className="text-gray-500" />
          </button>
        </div>
      )}

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((group) => (
          <div key={group.section} className="mb-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 px-2 py-2">
              {group.section}
            </p>

            {group.links.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md
                    transition-all duration-150 mb-0.5 text-[13px] font-medium
                    ${isActive
                      ? "bg-pink-50 text-[var(--color-primary)]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }
                  `}
                >
                  <Icon size={17} className="flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SidebarCategories({ desktopOpen, mobileOpen, onMobileClose }: Props) {
  return (
    <>
      {/* ── DESKTOP SIDEBAR (md+) ── পুরো hide/show, কোনো icon-only state নেই */}
      <aside
        className={`
          hidden md:flex flex-col flex-shrink-0
          bg-white border-r border-gray-100
          w-[220px] h-full overflow-hidden
          transition-all duration-200
          ${desktopOpen ? "translate-x-0" : "-translate-x-full w-0 border-0"}
        `}
      >
        <SidebarContent />
      </aside>

      {/* ── MOBILE DRAWER ── fixed, overlay হিসেবে আসে */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[260px] z-40
          bg-white shadow-xl
          transition-transform duration-300 ease-in-out
          md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent onClose={onMobileClose} />
      </aside>
    </>
  );
}