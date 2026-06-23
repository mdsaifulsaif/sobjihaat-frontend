"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  FiMenu, FiUser, FiSearch, FiHeart,
  FiChevronDown, FiX, FiMapPin,
} from "react-icons/fi";
import { useAppSelector } from "@/redux";

interface Props {
  onToggleDesktop: () => void;
  onToggleMobile: () => void;
}

export default function TopNavbar({ onToggleDesktop, onToggleMobile }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  /* ── Shared dropdown content ── */
  const UserDropdown = () => (
    <div className="absolute right-0 top-[110%] w-60 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden">
      {isAuthenticated ? (
        <div className="px-4 py-3 bg-[var(--color-surface)] border-b border-gray-100">
          <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            Signed in as
          </p>
          <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate mt-0.5">
            {user?.email}
          </p>
        </div>
      ) : (
        <div className="p-4">
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-0.5">
            Welcome!
          </h4>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">
            Access your account
          </p>
          <div className="flex gap-2">
            <Link
              href="/login"
              className="flex-1 py-2 text-center text-xs font-bold bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="flex-1 py-2 text-center text-xs font-bold border border-gray-200 text-[var(--color-text-secondary)] rounded-lg hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
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
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 transition-all border-b border-gray-100"
          >
            💎 Admin Dashboard
          </Link>
        )}
        {[
          { label: "My Profile", href: "/account" },
          { label: "Order History", href: "/orders" },
          { label: "Wishlist", href: "/wishlist" },
          { label: "Support", href: "#" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-all"
          >
            {item.label}
          </Link>
        ))}
        {isAuthenticated && (
          <>
            <div className="border-t border-gray-100 my-1" />
            <button className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-red-50 transition-all">
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 flex-shrink-0">

      {isHome ? (
        /* ══════════════════════════════════
           HOME ROUTE
           ══════════════════════════════════ */
        <>
          {/* Desktop */}
          <div className="container mx-auto px-4 h-[68px] hidden md:flex items-center gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">SH</span>
              </div>
              <span className="text-[16px] font-semibold text-[var(--color-text-primary)]">
                Sobji<span className="text-[var(--color-primary)]">Haat</span>
              </span>
            </Link>

            {/* Center: Location + Search + Search btn */}
            <div className="flex-1 flex items-center gap-3 max-w-[680px] mx-auto">
              <button className="flex items-center gap-1.5 px-4 h-[42px] border border-gray-200 rounded-lg bg-[var(--color-surface)] text-[13px] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] transition-colors flex-shrink-0 whitespace-nowrap">
                <FiMapPin size={14} className="text-[var(--color-primary)]" />
                Dhaka, BD
                <FiChevronDown size={12} />
              </button>

              <div className="flex-1 flex items-center gap-2.5 border border-gray-200 rounded-lg bg-[var(--color-surface)] px-4 h-[42px] focus-within:border-[var(--color-primary)] focus-within:bg-white transition-all">
                <FiSearch size={15} className="text-[var(--color-text-muted)] flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, orders..."
                  className="flex-1 bg-transparent text-[13px] outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] min-w-0"
                />
              </div>

              <button className="w-[42px] h-[42px] bg-[var(--color-primary)] rounded-lg flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity">
                <FiSearch size={16} className="text-white" />
              </button>
            </div>

            {/* Right: Login dropdown + Heart */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Login / Profile dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 h-[42px] border border-gray-200 rounded-lg text-[13px] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap">
                  {isAuthenticated ? (
                    <>
                      <div className="w-6 h-6 rounded-md bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-xs">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      {user?.name?.split(" ")[0]}
                    </>
                  ) : (
                    <>
                      <FiUser size={15} />
                      Login
                    </>
                  )}
                  <FiChevronDown size={12} />
                </button>
                <UserDropdown />
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="w-[42px] h-[42px] border border-gray-200 rounded-lg flex items-center justify-center hover:border-[var(--color-primary)] transition-colors relative group"
              >
                <FiHeart size={17} className="text-[var(--color-text-secondary)] group-hover:text-red-500 transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold border border-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Home */}
          <div className="flex md:hidden flex-col px-4 py-3 gap-2.5">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SB</span>
                </div>
                <span className="text-[15px] font-semibold text-[var(--color-text-primary)]">
                  Site<span className="text-[var(--color-primary)]">Bari</span>
                </span>
              </Link>

              <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
                <button className="flex items-center gap-1 px-3 h-[36px] border border-gray-200 rounded-lg bg-[var(--color-surface)] text-[12px] text-[var(--color-text-secondary)] whitespace-nowrap">
                  <FiMapPin size={12} className="text-[var(--color-primary)]" />
                  Dhaka
                  <FiChevronDown size={11} />
                </button>

                {/* Mobile login/profile — dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1 px-3 h-[36px] border border-gray-200 rounded-lg text-[12px] text-[var(--color-text-secondary)] whitespace-nowrap">
                    {isAuthenticated ? (
                      <div className="w-5 h-5 rounded bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-[10px]">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <FiUser size={13} />
                    )}
                    {isAuthenticated ? user?.name?.split(" ")[0] : "Login"}
                    <FiChevronDown size={11} />
                  </button>
                  <UserDropdown />
                </div>

                <Link
                  href="/wishlist"
                  className="w-[36px] h-[36px] border border-gray-200 rounded-lg flex items-center justify-center relative flex-shrink-0"
                >
                  <FiHeart size={15} className="text-[var(--color-text-secondary)]" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold border border-white">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Search row — সবসময় visible */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-[var(--color-surface)] px-3 h-[42px] focus-within:border-[var(--color-primary)] focus-within:bg-white transition-all">
              <FiSearch size={15} className="text-[var(--color-text-muted)] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, orders..."
                className="flex-1 bg-transparent text-[13px] outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
              />
              <button className="w-[32px] h-[32px] bg-[var(--color-primary)] rounded-md flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity">
                <FiSearch size={13} className="text-white" />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* ══════════════════════════════════
           DASHBOARD ROUTE
           ══════════════════════════════════ */
        <div className="w-full px-4 h-[60px] flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={onToggleMobile}
            className="md:hidden w-[38px] h-[38px] flex items-center justify-center border border-gray-200 rounded-lg hover:bg-[var(--color-surface)] transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <FiMenu size={18} className="text-[var(--color-text-secondary)]" />
          </button>

          {/* Desktop hamburger */}
          <button
            onClick={onToggleDesktop}
            className="hidden md:flex w-[38px] h-[38px] items-center justify-center border border-gray-200 rounded-lg hover:bg-[var(--color-surface)] transition-colors flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={18} className="text-[var(--color-text-secondary)]" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-[34px] h-[34px] rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-[13px]">SB</span>
            </div>
            <span className="text-[15px] font-semibold text-[var(--color-text-primary)] hidden sm:block">
              Site<span className="text-[var(--color-primary)]">Bari</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 flex items-center gap-2.5 border border-gray-200 rounded-lg bg-[var(--color-surface)] px-4 h-[40px] focus-within:border-[var(--color-primary)] focus-within:bg-white transition-all">
            <FiSearch size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, orders..."
              className="flex-1 bg-transparent text-[13px] outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] min-w-0"
            />
          </div>

          {/* User dropdown */}
          <div className="relative group flex-shrink-0">
            <button className="flex items-center gap-2.5 p-1.5 hover:bg-[var(--color-surface)] rounded-lg transition-colors">
              <div className="w-[34px] h-[34px] rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] text-[13px] font-semibold flex-shrink-0">
                {isAuthenticated ? user?.name?.charAt(0).toUpperCase() : <FiUser size={15} />}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase leading-none tracking-wide">
                  Account
                </p>
                <p className="text-[13px] font-semibold text-[var(--color-text-primary)] mt-0.5 flex items-center gap-1">
                  {isAuthenticated ? user?.name?.split(" ")[0] : "Login"}
                  <FiChevronDown size={12} />
                </p>
              </div>
            </button>
            <UserDropdown />
          </div>
        </div>
      )}
    </header>
  );
}