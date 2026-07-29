


// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useSession, signIn, signOut } from "next-auth/react";
// import {
//   FiSearch,
//   FiHeart,
//   FiUser,
//   FiChevronDown,
//   FiMenu,
// } from "react-icons/fi";

// interface MinHeaderProps {
//   onToggleMobile?: () => void;
// }

// const MinHeader = ({ onToggleMobile }: MinHeaderProps) => {
//   const { data: session, status } = useSession();
//   const isAuthenticated = status === "authenticated";
//   const user = session?.user;

//   const [searchQuery, setSearchQuery] = useState("");

//   const wishlistCount = 5; // পরে Redux থেকে নেবেন

//   return (
//     <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between py-3 md:py-4">
//           {/* Left: Menu + Logo */}
//           <div className="flex items-center gap-4">
//             <button
//               onClick={onToggleMobile}
//               className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-all md:hidden"
//               aria-label="Toggle Mobile Menu"
//             >
//               <FiMenu size={26} />
//             </button>

//             <Link href="/" className="flex items-center gap-3">
//               <div className="w-11 h-11 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white font-black text-3xl">
//                 S
//               </div>
//               <div className="hidden sm:block">
//                 <h1 className="text-2xl font-bold tracking-tight">
//                   Sobji<span className="text-[var(--color-primary)]">Haat</span>
//                 </h1>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Search */}
//           <div className="hidden md:flex flex-1 max-w-xl mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search products, brands and more..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-3 pl-5 pr-14 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-sm bg-gray-50"
//               />
//               <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-3xl hover:bg-opacity-90 transition-all">
//                 <FiSearch size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-2 md:gap-3">
//             {/* Wishlist */}
//             <Link
//               href="/wishlist"
//               className="relative p-3 hover:bg-gray-100 rounded-3xl transition-all"
//             >
//               <FiHeart size={23} className="text-gray-700" />
//               {wishlistCount > 0 && (
//                 <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                   {wishlistCount}
//                 </span>
//               )}
//             </Link>

//             {/* User / Login */}
//             <div className="relative group z-[9999]">
//               <button className="flex items-center gap-2 p-2 pr-3 hover:bg-gray-100 rounded-3xl transition-all">
//                 <div className="w-9 h-9 bg-gray-100 rounded-2xl flex items-center justify-center font-bold text-lg text-[var(--color-primary)]">
//                   {isAuthenticated && user?.firstName ? (
//                     user.firstName.charAt(0).toUpperCase()
//                   ) : (
//                     <FiUser size={20} />
//                   )}
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <p className="text-xs text-gray-500">Profile</p>
//                   <p className="text-sm font-medium flex items-center gap-1">
//                     {isAuthenticated && user?.firstName
//                       ? user.firstName.split(" ")[0]
//                       : "Login"}
//                     <FiChevronDown size={14} />
//                   </p>
//                 </div>
//               </button>

//               {/* User Dropdown */}
//               <div className="absolute right-0 top-[110%] w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all z-50">
//                 {!isAuthenticated ? (
//                   <div className="p-6">
//                     <h4 className="text-lg font-bold">Welcome!</h4>
//                     <p className="text-sm text-gray-500 mt-1 mb-5">
//                       Sign in to access your account & orders
//                     </p>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => signIn()}
//                         className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:opacity-90 transition-all"
//                       >
//                         SIGN IN
//                       </button>
//                       <Link
//                         href="/register"
//                         className="flex-1 py-3 border border-gray-300 text-center rounded-xl font-medium hover:border-[var(--color-primary)] transition-all"
//                       >
//                         JOIN
//                       </Link>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="py-2">
//                     <div className="px-6 py-2">
//                       <p className="text-xs text-gray-500">Signed in as</p>
//                       <p className="font-medium truncate">{user?.email}</p>
//                     </div>

//                     {user?.role === "rider" && (
//                       <Link
//                         href="/rider-dashboard"
//                         className="block px-6 py-3 hover:bg-gray-50 text-[var(--color-primary)] font-medium"
//                       >
//                         Rider Dashboard
//                       </Link>
//                     )}

//                     <Link href="/profile" className="block px-6 py-3 hover:bg-gray-50">
//                       My Profile
//                     </Link>
//                     <Link href="/my-orders" className="block px-6 py-3 hover:bg-gray-50">
//                       Order History
//                     </Link>
                 

//                     <div className="border-t border-gray-100 my-1" />
//                     <button
//                       onClick={() => signOut({ callbackUrl: "/" })}
//                       className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50"
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="md:hidden pb-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full py-3 pl-5 pr-12 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] outline-none text-sm bg-gray-50"
//             />
//             <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-3xl">
//               <FiSearch size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default MinHeader;





"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";

interface MinHeaderProps {
  onToggleMobile?: () => void;
}

const MinHeader = ({ onToggleMobile }: MinHeaderProps) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 400);

  // আগের পেজ মনে রাখার জন্য (search এ ঢোকার আগের পেজ)
  const previousPathRef = useRef<string | null>(null);

  const wishlistCount = 5; // পরে Redux থেকে নেবেন

  // যখন সার্চ পেজে না থেকেও ইউজার টাইপ শুরু করে
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // প্রথমবার টাইপ করার সময় আগের পেজ সেভ করে রাখি
    if (pathname !== "/search" && previousPathRef.current === null) {
      previousPathRef.current = pathname;
    }
  };

  // Debounced value অনুযায়ী নেভিগেশন/URL আপডেট
  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed) {
      const params = new URLSearchParams();
      params.set("q", trimmed);

      if (pathname === "/search") {
        router.replace(`/search?${params.toString()}`);
      } else {
        router.push(`/search?${params.toString()}`);
      }
    } else if (pathname === "/search" && debouncedQuery === "") {
      if (previousPathRef.current) {
        router.push(previousPathRef.current);
        previousPathRef.current = null;
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // সার্চ পেজে থাকা অবস্থায় URL এর q প্যারাম দিয়ে input sync রাখা
  useEffect(() => {
    if (pathname === "/search") {
      const q = searchParams.get("q") || "";
      setSearchQuery((prev) => (prev !== q ? q : prev));
    }
  }, [pathname, searchParams]);

  const clearSearch = () => {
    setSearchQuery("");
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
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands and more..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-3 pl-5 pr-14 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-sm bg-gray-50"
              />
              {searchQuery ? (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-2.5 rounded-3xl hover:bg-gray-300 transition-all"
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              ) : (
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-3xl hover:bg-opacity-90 transition-all">
                  <FiSearch size={18} />
                </button>
              )}
            </div>
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
            <div className="relative group z-[9999]">
              <button className="flex items-center gap-2 p-2 pr-3 hover:bg-gray-100 rounded-3xl transition-all">
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
                    <FiChevronDown size={14} />
                  </p>
                </div>
              </button>

              {/* User Dropdown */}
              <div className="absolute right-0 top-[110%] w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all z-50">
                {!isAuthenticated ? (
                  <div className="p-6">
                    <h4 className="text-lg font-bold">Welcome!</h4>
                    <p className="text-sm text-gray-500 mt-1 mb-5">
                      Sign in to access your account & orders
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => signIn()}
                        className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:opacity-90 transition-all"
                      >
                        SIGN IN
                      </button>
                      <Link
                        href="/register"
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
                        className="block px-6 py-3 hover:bg-gray-50 text-[var(--color-primary)] font-medium"
                      >
                        Rider Dashboard
                      </Link>
                    )}

                    <Link href="/profile" className="block px-6 py-3 hover:bg-gray-50">
                      My Profile
                    </Link>
                    <Link href="/my-orders" className="block px-6 py-3 hover:bg-gray-50">
                      Order History
                    </Link>

                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
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
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-3 pl-5 pr-12 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] outline-none text-sm bg-gray-50"
            />
            {searchQuery ? (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-3xl"
              >
                <FiX size={18} />
              </button>
            ) : (
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-3xl">
                <FiSearch size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MinHeader;