"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  FiMenu, FiUser, FiSearch,
  FiHeart, FiChevronDown, FiX,
} from "react-icons/fi";
import { useAppSelector } from "@/redux";

interface Props {
  onToggleDesktop: () => void;
  onToggleMobile: () => void;
}

export default function TopNavbar({ onToggleDesktop, onToggleMobile }: Props) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 flex-shrink-0">
      <div className="h-20 flex items-center px-4 gap-2 sm:gap-3">

        {/* Mobile menu toggle */}
        <button
          onClick={onToggleMobile}
          className="md:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-all"
        >
          <FiMenu size={18} className="text-gray-600" />
        </button>

        {/* Desktop menu toggle */}
        <button
          onClick={onToggleDesktop}
          className="hidden md:flex flex-shrink-0 w-9 h-9 items-center justify-center rounded-md hover:bg-gray-100 transition-all"
        >
          <FiMenu size={18} className="text-gray-600" />
        </button>

        {/* Logo */}
        <Link
          href="/dashboard/admin"
          className="flex-shrink-0 flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">
            L
          </div>
          {/* mobile তে শুধু icon, sm+ এ text */}
          <span className="font-semibold text-gray-800 text-[15px] hidden sm:block">
            Lumiere <span className="text-[var(--color-primary)]">Admin</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 px-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products, orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-5 pr-14 text-[13px] border-2 border-gray-100 rounded-lg bg-gray-50 outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all duration-200"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[var(--color-primary)] text-white rounded-md hover:opacity-90 transition-opacity flex items-center justify-center">
              <FiSearch size={16} />
            </button>
          </div>
        </div>

        {/* ✅ Mobile: search flex-1 যাতে বাকি জায়গা নেয় */}
        <div className="flex md:hidden flex-1">
          <div
            className="relative w-full cursor-pointer"
            onClick={() => {
              setShowSearch(true);
              setTimeout(() => searchRef.current?.focus(), 100);
            }}
          >
            <div className="w-full h-9 pl-4 pr-10 text-[13px] border border-gray-200 rounded-lg bg-gray-50 flex items-center text-gray-400">
              Search...
            </div>
            <FiSearch size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex-shrink-0 flex items-center gap-1">

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-md transition-all group"
          >
            <FiHeart size={18} className="text-gray-600 group-hover:text-red-500 transition-colors" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold border border-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <div className="w-px h-5 bg-gray-200 mx-1" />

          {/* User Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-md transition-all">
              <div className="w-8 h-8 rounded-md bg-pink-50 flex items-center justify-center text-[var(--color-primary)] font-semibold text-sm flex-shrink-0">
                {isAuthenticated
                  ? user?.name?.charAt(0).toUpperCase()
                  : <FiUser size={16} className="text-gray-500" />
                }
              </div>
              {/* desktop এ name দেখায় */}
              <div className="hidden lg:block text-left">
                <p className="text-[10px] font-semibold text-gray-400 uppercase leading-none">
                  Account
                </p>
                <p className="text-[13px] font-medium text-gray-700 mt-0.5 flex items-center gap-1">
                  {isAuthenticated ? user?.name?.split(" ")[0] : "Login"}
                  <FiChevronDown size={12} />
                </p>
              </div>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 top-[110%] w-60 bg-white rounded-md shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden">
              {isAuthenticated ? (
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Signed in as
                  </p>
                  <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">
                    {user?.email}
                  </p>
                </div>
              ) : (
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-0.5">Welcome!</h4>
                  <p className="text-xs text-gray-400 mb-3">Access your account</p>
                  <div className="flex gap-2">
                    <Link
                      href="/login"
                      className="flex-1 py-2 text-center text-xs font-bold bg-[var(--color-primary)] text-white rounded-md hover:opacity-90 transition-all"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="flex-1 py-2 text-center text-xs font-bold border border-gray-200 text-gray-600 rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
                    >
                      Join
                    </Link>
                  </div>
                </div>
              )}

              <div className="py-1">
                {isAuthenticated && user?.role === "admin" && (
                  <Link
                    href="/dashboard/admin"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 transition-all border-b border-gray-50"
                  >
                    💎 Admin Dashboard
                  </Link>
                )}
                {[
                  { label: "My Profile",    href: "/account" },
                  { label: "Order History", href: "/orders" },
                  { label: "Wishlist",      href: "/wishlist" },
                  { label: "Support",       href: "#" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <>
                    <div className="border-t border-gray-100 my-1" />
                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all">
                      Sign out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Search — full screen overlay */}
      {showSearch && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
          <div className="h-16 flex items-center px-4 gap-3 border-b border-gray-100">
            <div className="relative flex-1">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-5 pr-14 text-[13px] border-2 border-gray-100 rounded-lg bg-gray-50 outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[var(--color-primary)] text-white rounded-md hover:opacity-90 transition-opacity flex items-center justify-center">
                <FiSearch size={15} />
              </button>
            </div>
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-all text-gray-500"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}