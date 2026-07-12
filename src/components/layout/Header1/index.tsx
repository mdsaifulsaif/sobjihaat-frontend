// import React from 'react';
// import TopHeader from './TopHeader';
// import MinHeader from './MinHeader';
// import Navbar from './Navbar';

// const Header: React.FC = () => {
//     return (
//         <header>
//             <TopHeader />
//             <MinHeader />
//             <Navbar />
//         </header>
//     );
// };

// export default Header;
// export { TopHeader, MinHeader, Navbar };


"use client";

import Link from "next/link";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { useAppSelector } from "@/redux";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function DashboardTopBar({ collapsed, onToggle }: Props) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 gap-3 sticky top-0 z-40 flex-shrink-0">
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
      >
        <FiMenu size={16} className="text-gray-500" />
      </button>

      {/* Logo */}
      <Link href="/dashboard/admin" className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">
          L
        </div>
        <span className="font-semibold text-gray-800 text-[15px] hidden sm:block">
          Lumiere <span className="text-[var(--color-primary)]">Admin</span>
        </span>
      </Link>

      <div className="flex-1" />

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center hover:bg-gray-50 rounded-md transition-all">
          <FiBell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-primary)] rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-md bg-pink-50 flex items-center justify-center text-[var(--color-primary)] font-semibold text-sm">
          {user?.name?.charAt(0).toUpperCase() ?? <FiUser size={15} />}
        </div>
      </div>
    </header>
  );
}