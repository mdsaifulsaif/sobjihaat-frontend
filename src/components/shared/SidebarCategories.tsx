
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";

interface Props {
  desktopOpen: boolean;   // md+ sidebar দেখানো/লুকানো
  mobileOpen: boolean;    // mobile drawer দেখানো/লুকানো
  onMobileClose: () => void;
}

// Sidebar content — desktop আর mobile দুইটাতেই same content ব্যবহার হবে
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const { data, isLoading, error } = useGetCategoriesQuery({
    limit: 50,
  });

  const categories = data?.data || [];

  return (
    <div className="flex flex-col h-full">
      {/* Mobile close button */}
      {onClose && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 md:hidden">
          <span className="font-semibold text-gray-700 text-sm">Categories</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-md"
          >
            <FiX size={16} className="text-gray-500" />
          </button>
        </div>
      )}

      {/* Category List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 custom-scrollbar">
        {isLoading && (
          <div className="space-y-1 px-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-11 bg-gray-100 rounded-md animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-xs text-gray-400 text-center py-4">
            ক্যাটাগরি লোড করা যায়নি
          </p>
        )}

        {!isLoading && !error && categories.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">
            কোনো ক্যাটাগরি নেই
          </p>
        )}

        {!isLoading &&
          !error &&
          categories.map((cat: any) => {
            const isActive = pathname === `/${cat.slug}`;

            return (
              <Link
                key={cat._id}
                href={`/${cat.slug}`}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md
                  transition-all duration-150 mb-0.5 text-[13px] font-medium
                  border-b border-gray-50 last:border-b-0
                  ${
                    isActive
                      ? "bg-pink-50 text-[var(--color-primary)]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                  }
                `}
              >
                <span className="w-7 h-7 flex-shrink-0 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                  {cat.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm">🛒</span>
                  )}
                </span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

// export default function SidebarCategories({ desktopOpen, mobileOpen, onMobileClose }: Props) {
//   return (
//     <>
//       {/* ── DESKTOP SIDEBAR (md+) ── পুরো hide/show, কোনো icon-only state নেই */}
//       <aside
//         className={`
//           hidden md:flex flex-col flex-shrink-0
//           bg-white border-r border-gray-100
//           h-full overflow-hidden
//           transition-all duration-200
//           ${desktopOpen ? "w-[220px] border-r" : "w-0 border-0"}
//         `}
//       >
//         <SidebarContent />
//       </aside>

//       {/* ── MOBILE DRAWER ── fixed, overlay হিসেবে আসে */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-[260px] z-40
//           bg-white shadow-xl
//           transition-transform duration-300 ease-in-out
//           md:hidden
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <SidebarContent onClose={onMobileClose} />
//       </aside>
//     </>
//   );
// }



export default function SidebarCategories({ desktopOpen, mobileOpen, onMobileClose }: Props) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col flex-shrink-0 bg-white border-r border-gray-100 h-full transition-all duration-300 ${desktopOpen ? "w-[220px]" : "w-0"}`}
      >
        <div className="flex-1 overflow-y-auto h-full custom-scrollbar">
            <SidebarContent />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] z-40 bg-white shadow-xl transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto custom-scrollbar">
            <SidebarContent onClose={onMobileClose} />
        </div>
      </aside>
    </>
  );
}