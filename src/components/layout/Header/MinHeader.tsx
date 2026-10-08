"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetProductsQuery } from "@/redux/api/productApi";

interface MinHeaderProps {
  onToggleMobile?: () => void;
}

const MinHeader = ({ onToggleMobile }: MinHeaderProps) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  const getQueryParamFromURL = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("q") || "";
    }
    return "";
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isUserTyping = useRef(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchDesktopRef = useRef<HTMLDivElement>(null);
  const searchMobileRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 250);

  // Fetch search suggestions live
  const { data: suggestionData, isFetching: isSearching } = useGetProductsQuery(
    { searchTerm: debouncedQuery.trim(), limit: 6 },
    { skip: !debouncedQuery.trim() }
  );

  const suggestedProducts = suggestionData?.data || [];
  const totalFound = suggestionData?.meta?.total || 0;

  const wishlistCount = 5;

  // Sync search input with URL when pathname is /search
  useEffect(() => {
    if (pathname === "/search") {
      const q = getQueryParamFromURL();
      if (!isUserTyping.current && q !== searchQuery) {
        setSearchQuery(q);
      }
    } else if (!isUserTyping.current) {
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  }, [pathname]);

  // When on /search, live-update the URL as user types or removes characters
  useEffect(() => {
    if (!isUserTyping.current || pathname !== "/search") return;

    const trimmed = debouncedQuery.trim();
    const currentQ = getQueryParamFromURL();

    if (trimmed !== currentQ) {
      if (trimmed) {
        router.replace(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false });
      } else {
        router.replace("/search", { scroll: false });
      }
    }
  }, [debouncedQuery, pathname, router]);

  // Outside click to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }

      const inDesktopSearch = searchDesktopRef.current?.contains(target);
      const inMobileSearch = searchMobileRef.current?.contains(target);
      if (!inDesktopSearch && !inMobileSearch) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUserTyping.current = true;
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  const clearSearch = () => {
    isUserTyping.current = false;
    setSearchQuery("");
    setIsSearchOpen(false);
    if (pathname === "/search") {
      router.replace("/search", { scroll: false });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isUserTyping.current = false;
    setIsSearchOpen(false);
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  };

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    isUserTyping.current = false;
    router.push(`/product/${productId}`);
  };

  const renderSuggestionsDropdown = () => {
    const trimmed = searchQuery.trim();
    if (!isSearchOpen || !trimmed) return null;

    return (
      <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-sm shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
        {/* Loading */}
        {isSearching && suggestedProducts.length === 0 && (
          <div className="p-6 text-center text-sm font-medium text-gray-500 flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-[var(--color-primary)] rounded-full animate-spin" />
            <span>খোঁজা হচ্ছে...</span>
          </div>
        )}

        {/* Results */}
        {!isSearching && suggestedProducts.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm font-semibold text-gray-700">
              &ldquo;{trimmed}&rdquo; এর সাথে কোনো প্রোডাক্ট মেলেনি
            </p>
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="mt-3 text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
            >
              সার্চ পেজে গিয়ে সব প্রোডাক্ট দেখুন <FiArrowRight size={13} />
            </button>
          </div>
        ) : (
          <div>
            <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
              <span>পণ্য পরামর্শ</span>
              {totalFound > 0 && <span>{totalFound} টি পাওয়া গেছে</span>}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {suggestedProducts.map((p: any) => {
                const currentPrice =
                  p.salePrice && p.salePrice > 0 ? p.salePrice : p.regularPrice || p.price || 0;
                const oldPrice =
                  p.salePrice && p.salePrice > 0 ? p.regularPrice : null;
                const img = p.thumbnail || p.image || "/placeholder.png";

                return (
                  <button
                    key={p._id}
                    type="button"
                    onClick={() => handleSelectProduct(p._id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-all text-left group"
                  >
                    <div className="w-12 h-12 rounded-sm bg-gray-100 overflow-hidden relative shrink-0 border border-gray-100 flex items-center justify-center">
                      {img ? (
                        <Image
                          src={img}
                          alt={p.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <FiShoppingBag className="text-gray-400" size={20} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[var(--color-primary)] transition-colors">
                        {p.name}
                      </p>
                      {p.categoryDetails?.name && (
                        <p className="text-xs text-gray-400 truncate">
                          {p.categoryDetails.name}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-gray-900">
                        ৳{currentPrice}
                      </p>
                      {oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          ৳{oldPrice}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* View all footer */}
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-[var(--color-primary)] transition-colors border-t border-gray-100 flex items-center justify-center gap-1.5"
            >
              <span>&ldquo;{trimmed}&rdquo; এর সকল ফলাফল দেখুন</span>
              <FiArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleMobile}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-all md:hidden"
              aria-label="Toggle Mobile Menu"
            >
              <FiMenu size={26} />
            </button>

            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white font-black text-3xl">
                S
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold tracking-tight">
                  Sobji<span className="text-[var(--color-primary)]">Haat</span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative" ref={searchDesktopRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="প্রোডাক্ট, ক্যাটাগরি সার্চ করুন..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={handleSearchChange}
                className="w-full py-3 pl-5 pr-14 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-sm bg-gray-50 transition-all"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-2.5 rounded-3xl hover:bg-gray-300 transition-all"
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-3xl hover:bg-opacity-90 transition-all"
                  aria-label="Search"
                >
                  <FiSearch size={18} />
                </button>
              )}
            </form>

            {renderSuggestionsDropdown()}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-3 hover:bg-gray-100 rounded-3xl transition-all"
            >
              <FiHeart size={23} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User / Login */}
            <div className="relative z-[9999]" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 p-2 pr-3 hover:bg-gray-100 rounded-3xl transition-all"
              >
                <div className="w-9 h-9 bg-gray-100 rounded-2xl flex items-center justify-center font-bold text-lg text-[var(--color-primary)]">
                  {isAuthenticated && user?.firstName ? (
                    user.firstName.charAt(0).toUpperCase()
                  ) : (
                    <FiUser size={20} />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs text-gray-500">Profile</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    {isAuthenticated && user?.firstName
                      ? user.firstName.split(" ")[0]
                      : "Login"}
                    <FiChevronDown
                      size={14}
                      className={`transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </p>
                </div>
              </button>

              {/* User Dropdown */}
              <div
                className={`absolute right-0 top-[110%] w-64 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all z-50 ${
                  isUserMenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2 pointer-events-none"
                }`}
              >
                {!isAuthenticated ? (
                  <div className="p-6">
                    <h4 className="text-lg font-bold">Welcome!</h4>
                    <p className="text-sm text-gray-500 mt-1 mb-5">
                      Sign in to access your account & orders
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signIn();
                        }}
                        className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:opacity-90 transition-all"
                      >
                        SIGN IN
                      </button>
                      <Link
                        href="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex-1 py-3 border border-gray-300 text-center rounded-xl font-medium hover:border-[var(--color-primary)] transition-all"
                      >
                        JOIN
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    <div className="px-6 py-2">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="font-medium truncate">{user?.email}</p>
                    </div>

                    {user?.role === "rider" && (
                      <Link
                        href="/rider-dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-6 py-3 hover:bg-gray-50 text-[var(--color-primary)] font-medium"
                      >
                        Rider Dashboard
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-6 py-3 hover:bg-gray-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/my-orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-6 py-3 hover:bg-gray-50"
                    >
                      Order History
                    </Link>

                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4 relative" ref={searchMobileRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="প্রোডাক্ট, ক্যাটাগরি সার্চ করুন..."
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={handleSearchChange}
              className="w-full py-3 pl-5 pr-12 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] outline-none text-sm bg-gray-50 transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-3xl"
                aria-label="Clear search"
              >
                <FiX size={18} />
              </button>
            ) : (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-3xl"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
            )}
          </form>

          {renderSuggestionsDropdown()}
        </div>
      </div>
    </header>
  );
};

export default MinHeader;