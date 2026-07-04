


// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiChevronDown, FiMenu } from 'react-icons/fi';

// const MinHeader: React.FC = () => {
//     const { data: session, status } = useSession();
//     const isAuthenticated = status === "authenticated";
//     const user = session?.user;

//     const [searchQuery, setSearchQuery] = useState('');
//     const [showSearch, setShowSearch] = useState(false);

//     // Temporary cart count (আপনি Redux বা Context থেকে নিতে পারবেন)
//     const cartCount = 0;
//     const wishlistCount = 0;

//     return (
//         <div className="bg-white py-0 md:py-1 border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all duration-200">
//             <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
//                 <div className="flex items-center justify-between gap-8">
//                     {/* Logo Area */}
//                     <Link href="/" className="flex-shrink-0 group">
//                         <div className="flex items-center gap-3">
//                             <div className="w-11 h-11 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[var(--color-primary)]/20 group-hover:scale-105 transition-all duration-300">
//                                 K
//                             </div>
//                             <div className="hidden sm:block">
//                                 <h1 className="text-2xl font-bold tracking-tight leading-none text-gray-800">
//                                     Kinbo<span className="text-[var(--color-primary)]">Now</span>
//                                 </h1>
//                                 <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mt-1">Premium E-store</p>
//                             </div>
//                         </div>
//                     </Link>

//                     {/* Search Bar - Desktop */}
//                     <div className="hidden md:flex flex-1 max-w-2xl">
//                         <div className="relative w-full group">
//                             <input
//                                 type="text"
//                                 placeholder="Search products, brands and more..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full py-2.5 pl-6 pr-14 text-[14px] border-2 border-gray-100 rounded-md bg-gray-50/50 outline-none focus:border-[var(--color-primary)] focus:bg-white focus:shadow-xl focus:shadow-[var(--color-primary)]/5 transition-all duration-300"
//                             />
//                             <button className="absolute right-2 top-2 bottom-2 px-5 bg-[var(--color-primary)] text-white rounded-md hover:scale-95 transition-all active:scale-90 shadow-md shadow-[var(--color-primary)]/20">
//                                 <FiSearch size={20} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Actions Area */}
//                     <div className="flex items-center gap-1 sm:gap-2">
//                         {/* Mobile Search */}
//                         <button
//                             onClick={() => setShowSearch(!showSearch)}
//                             className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-md transition-all"
//                         >
//                             <FiSearch size={20} className="text-gray-600" />
//                         </button>

//                         {/* Wishlist */}
//                         <Link href="/wishlist" className="relative w-11 h-11 flex items-center justify-center hover:bg-gray-50 rounded-md transition-all group">
//                             <FiHeart size={21} className="text-gray-600 group-hover:text-red-500 transition-colors" />
//                             {wishlistCount > 0 && (
//                                 <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white">
//                                     {wishlistCount}
//                                 </span>
//                             )}
//                         </Link>

//                         {/* Cart */}
//                         <Link href="/cart" className="relative flex items-center gap-3 pl-2 pr-3 py-1.5 hover:bg-gray-50 rounded-md transition-all group border border-transparent hover:border-gray-100">
//                             <div className="relative">
//                                 <FiShoppingCart size={21} className="text-gray-600 group-hover:text-[var(--color-primary)] transition-colors" />
//                                 {cartCount > 0 && (
//                                     <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-primary)] text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white">
//                                         {cartCount}
//                                     </span>
//                                 )}
//                             </div>
//                             <div className="hidden lg:block">
//                                 <p className="text-[11px] font-semibold text-gray-400 uppercase leading-none">Cart</p>
//                                 <p className="text-[14px] font-bold text-gray-800 mt-1">৳0</p>
//                             </div>
//                         </Link>

//                         {/* Divider */}
//                         <div className="hidden lg:block w-px h-8 bg-gray-100 mx-2"></div>

//                         {/* User Account */}
//                         <div className="relative group">
//                             <button className="flex items-center gap-3 p-1.5 pr-2 hover:bg-gray-50 rounded-md transition-all">
//                                 <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center font-bold text-[var(--color-primary)]">
//                                     {isAuthenticated && user?.firstName 
//                                         ? user.firstName.charAt(0).toUpperCase() 
//                                         : <FiUser size={19} className="text-gray-600" />
//                                     }
//                                 </div>
//                                 <div className="hidden xl:block text-left">
//                                     <p className="text-[11px] font-semibold text-gray-400 uppercase leading-none">Account</p>
//                                     <p className="text-[14px] font-medium text-gray-700 mt-1 flex items-center gap-1">
//                                         {isAuthenticated && user?.firstName
//                                             ? user.firstName.split(' ')[0] 
//                                             : 'Login'
//                                         } 
//                                         <FiChevronDown size={14} />
//                                     </p>
//                                 </div>
//                             </button>

//                             {/* Dropdown Card */}
//                             <div className="absolute right-0 top-[110%] w-64 bg-white rounded-md shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
//                                 {!isAuthenticated ? (
//                                     <div className="p-6">
//                                         <h4 className="text-lg font-bold text-gray-800 mb-1">Welcome!</h4>
//                                         <p className="text-xs text-gray-500 mb-4">Access your account & orders</p>
//                                         <div className="flex gap-2">
//                                             <button
//                                                 onClick={() => signIn()}
//                                                 className="flex-1 py-2.5 text-center text-xs font-bold bg-[var(--color-primary)] text-white rounded-md hover:opacity-90 transition-all"
//                                             >
//                                                 SIGN IN
//                                             </button>
//                                             <Link href="/register" className="flex-1 py-2.5 text-center text-xs font-bold border border-gray-200 text-gray-700 rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
//                                                 JOIN
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="p-6 bg-gray-50 border-b border-gray-100">
//                                         <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Signed in as</p>
//                                         <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
//                                     </div>
//                                 )}
//                                 <div className="py-2">
//                                     {isAuthenticated && (
//                                         <>
//                                             <Link href="/account" className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-all">
//                                                 My Profile
//                                             </Link>
//                                             <Link href="/orders" className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-all">
//                                                 Order History
//                                             </Link>
//                                             <Link href="/wishlist" className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-all">
//                                                 Wishlist
//                                             </Link>
//                                             <div className="border-t border-gray-100 my-1" />
//                                             <button 
//                                                 onClick={() => signOut({ callbackUrl: '/' })}
//                                                 className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-red-50 transition-all"
//                                             >
//                                                 Sign out
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Search */}
//                 {showSearch && (
//                     <div className="md:hidden mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 placeholder="Search products..."
//                                 className="w-full py-3.5 px-6 border-2 border-gray-100 rounded-md bg-gray-50 outline-none focus:border-[var(--color-primary)]"
//                             />
//                             <button className="absolute right-2 top-2 bottom-2 px-5 bg-[var(--color-primary)] text-white rounded-md">
//                                 <FiSearch size={18} />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MinHeader;


"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FiSearch, FiHeart, FiUser, FiChevronDown, FiMenu } from 'react-icons/fi';

const MinHeader = ({ onToggleMobile }: { onToggleMobile: () => void }) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const wishlistCount = 5; // পরে Redux থেকে নেবেন

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleMobile}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-all md:hidden"
            >
              <FiMenu size={26} />
            </button>

            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white font-black text-3xl">
                K
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold tracking-tight">
                  Kinbo<span className="text-[var(--color-primary)]">Now</span>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-5 pr-14 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-sm bg-gray-50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-3xl hover:bg-opacity-90 transition-all">
                <FiSearch size={18} />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-3 hover:bg-gray-100 rounded-3xl transition-all">
              <FiHeart size={23} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User / Login */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 pr-3 hover:bg-gray-100 rounded-3xl transition-all">
                <div className="w-9 h-9 bg-gray-100 rounded-2xl flex items-center justify-center font-bold text-lg text-[var(--color-primary)]">
                  {isAuthenticated && user?.firstName 
                    ? user.firstName.charAt(0).toUpperCase() 
                    : <FiUser size={20} />}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs text-gray-500">Account</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    {isAuthenticated && user?.firstName ? user.firstName.split(' ')[0] : 'Login'}
                    <FiChevronDown size={14} />
                  </p>
                </div>
              </button>

              {/* Login Modal / Dropdown - আগের মতোই */}
              <div className="absolute right-0 top-[110%] w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all z-50">
                {!isAuthenticated ? (
                  <div className="p-6">
                    <h4 className="text-lg font-bold">Welcome!</h4>
                    <p className="text-sm text-gray-500 mt-1 mb-5">Sign in to access your account & orders</p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => signIn()} 
                        className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:opacity-90 transition-all"
                      >
                        SIGN IN
                      </button>
                      <Link href="/register" className="flex-1 py-3 border border-gray-300 text-center rounded-xl font-medium hover:border-[var(--color-primary)] transition-all">
                        JOIN
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    <div className="px-6 py-4 border-b">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="font-medium truncate">{user?.email}</p>
                    </div>
                    <Link href="/account" className="block px-6 py-3 hover:bg-gray-50">My Profile</Link>
                    <Link href="/orders" className="block px-6 py-3 hover:bg-gray-50">Order History</Link>
                    <Link href="/wishlist" className="block px-6 py-3 hover:bg-gray-50">Wishlist</Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
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
              className="w-full py-3 pl-5 pr-12 border border-gray-200 rounded-3xl focus:border-[var(--color-primary)] outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-3xl">
              <FiSearch size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MinHeader;