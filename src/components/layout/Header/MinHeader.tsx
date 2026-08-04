


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







// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { useSession, signIn, signOut } from "next-auth/react";
// import {
//   FiSearch,
//   FiHeart,
//   FiUser,
//   FiChevronDown,
//   FiMenu,
//   FiX,
// } from "react-icons/fi";
// import { useDebounce } from "@/hooks/useDebounce";

// interface MinHeaderProps {
//   onToggleMobile?: () => void;
// }

// const MinHeader = ({ onToggleMobile }: MinHeaderProps) => {
//   const { data: session, status } = useSession();
//   const isAuthenticated = status === "authenticated";
//   const user = session?.user;

//   const router = useRouter();
//   const pathname = usePathname();

//   const getQueryParamFromURL = () => {
//     if (typeof window !== "undefined") {
//       const params = new URLSearchParams(window.location.search);
//       return params.get("q") || "";
//     }
//     return "";
//   };

//   const [searchQuery, setSearchQuery] = useState(getQueryParamFromURL());
  
//   // ইউজার নিজে টাইপ করছে কিনা তা ট্র্যাক করার জন্য রেফ
//   const isUserTyping = useRef(false);

//   // ৪০০ মিলি সেকেন্ড (0.4 সেকেন্ড) থামলেই কেবল ডেবাউন্স ভ্যালু আপডেট হবে
//   const debouncedQuery = useDebounce(searchQuery, 400);

//   const wishlistCount = 5;

//   // URL বা pathname পরিবর্তন হলে ইনপুট সিঙ্ক রাখা
//   useEffect(() => {
//     if (pathname === "/search") {
//       const q = getQueryParamFromURL();
//       if (!isUserTyping.current && q !== searchQuery) {
//         setSearchQuery(q);
//       }
//     } else if (!isUserTyping.current) {
//       setSearchQuery("");
//     }
//   }, [pathname]);

//   // ডেবাউন্সড কুয়েরি অনুযায়ী রাউটিং
//   useEffect(() => {
//     const trimmed = debouncedQuery.trim();
//     const currentUrlQ = getQueryParamFromURL();

//     if (isUserTyping.current) {
//       // যদি ইনপুট ফিল্ড একদম খালি করে দেয় (length === 0) এবং আমরা অলরেডি সার্চ পেজে থাকি
//       if (trimmed === "" && pathname === "/search" && currentUrlQ !== "") {
//         router.push("/search"); // কুয়েরি ছাড়া শুধু /search এ পাঠাবে যাতে সব প্রোডাক্ট দেখায়
//       } 
//       // অথবা নতুন কোনো কুয়েরি টাইপ করলে
//       else if (trimmed.length >= 2 && trimmed !== currentUrlQ) {
//         router.push(`/search?q=${encodeURIComponent(trimmed)}`);
//       }
//     }
//   }, [debouncedQuery, pathname, router]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     isUserTyping.current = true; // ইউজার টাইপ শুরু করলেই ফ্ল্যাগ ট্রু হবে
//     setSearchQuery(e.target.value);
//   };

//   const clearSearch = () => {
//     isUserTyping.current = false;
//     setSearchQuery("");
//     if (pathname === "/search") {
//       router.push("/search");
//     }
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     isUserTyping.current = false;
//     const trimmed = searchQuery.trim();
//     if (trimmed) {
//       router.push(`/search?q=${encodeURIComponent(trimmed)}`);
//     } else {
//       router.push("/search");
//     }
//   };

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
//             <form onSubmit={handleSearchSubmit} className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search products, brands and more..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 className="w-full py-3 pl-5 pr-14 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-sm bg-gray-50"
//               />
//               {searchQuery ? (
//                 <button
//                   type="button"
//                   onClick={clearSearch}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-2.5 rounded-3xl hover:bg-gray-300 transition-all"
//                   aria-label="Clear search"
//                 >
//                   <FiX size={18} />
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-3xl hover:bg-opacity-90 transition-all"
//                 >
//                   <FiSearch size={18} />
//                 </button>
//               )}
//             </form>
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
//           <form onSubmit={handleSearchSubmit} className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full py-3 pl-5 pr-12 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] outline-none text-sm bg-gray-50"
//             />
//             {searchQuery ? (
//               <button
//                 type="button"
//                 onClick={clearSearch}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-3xl"
//               >
//                 <FiX size={18} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-3xl"
//               >
//                 <FiSearch size={18} />
//               </button>
//             )}
//           </form>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default MinHeader;


"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
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

  const getQueryParamFromURL = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("q") || "";
    }
    return "";
  };

  const [searchQuery, setSearchQuery] = useState(getQueryParamFromURL());
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // ← NEW

  const isUserTyping = useRef(false);
  const userMenuRef = useRef<HTMLDivElement>(null); // ← NEW

  const debouncedQuery = useDebounce(searchQuery, 300);

  const wishlistCount = 5;

  // Outside click → close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // URL বা pathname পরিবর্তন হলে ইনপুট সিঙ্ক রাখা
  useEffect(() => {
    if (pathname === "/search") {
      const q = getQueryParamFromURL();
      if (!isUserTyping.current && q !== searchQuery) {
        setSearchQuery(q);
      }
    } else if (!isUserTyping.current) {
      setSearchQuery("");
    }
  }, [pathname]);

  // ডেবাউন্সড কুয়েরি অনুযায়ী রাউটিং
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    const currentUrlQ = getQueryParamFromURL();

    if (isUserTyping.current) {
      if (trimmed === "" && pathname === "/search" && currentUrlQ !== "") {
        router.push("/search");
      } else if (trimmed.length >= 1 && trimmed !== currentUrlQ) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    }
  }, [debouncedQuery, pathname, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUserTyping.current = true;
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    isUserTyping.current = false;
    setSearchQuery("");
    if (pathname === "/search") {
      router.push("/search");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isUserTyping.current = false;
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
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
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands and more..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-3 pl-5 pr-14 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-sm bg-gray-50"
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
                >
                  <FiSearch size={18} />
                </button>
              )}
            </form>
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

            {/* User / Login — CLICK based */}
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
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-3 pl-5 pr-12 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] outline-none text-sm bg-gray-50"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-3xl"
              >
                <FiX size={18} />
              </button>
            ) : (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-3xl"
              >
                <FiSearch size={18} />
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default MinHeader;