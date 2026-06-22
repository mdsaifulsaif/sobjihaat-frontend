
// "use client";

// import { useState } from "react";
// import TopNavber from "@/components/layout/Header/TopNavber";
// import SidebarCategories from "@/components/shared/SidebarCategories";
// import MiniCart from "@/components/shared/MiniCart";
// import FloatingCartButton from "@/components/shared/FloatingCartButton";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [desktopOpen, setDesktopOpen] = useState(true); // md+ এ default open
//   const [mobileOpen, setMobileOpen] = useState(false); // mobile এ default hidden

//   return (
//     <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
//       <TopNavber
//         onToggleDesktop={() => setDesktopOpen(!desktopOpen)}
//         onToggleMobile={() => setMobileOpen(!mobileOpen)}
//       />

//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Desktop sidebar */}
//         <SidebarCategories
//           desktopOpen={desktopOpen}
//           mobileOpen={mobileOpen}
//           onMobileClose={() => setMobileOpen(false)}
//         />
//         {/* Mobile overlay backdrop */}
//         {mobileOpen && (
//           <div
//             className="fixed inset-0 bg-black/40 z-30 md:hidden"
//             onClick={() => setMobileOpen(false)}
//           />
//         )}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
//         <MiniCart />
//          <FloatingCartButton />
//       </div>
//     </div>
//   );
// }


import LayoutShell from "@/components/layout/LayoutShell";
import FloatingCartButton from "@/components/shared/FloatingCartButton";
import MiniCart from "@/components/shared/MiniCart";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutShell>
    {children}
    <MiniCart />
     <FloatingCartButton />
  </LayoutShell>;
}