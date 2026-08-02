

// "use client";

// import React, { useEffect, useRef } from "react";
// import MinHeader from "./MinHeader";
// import Navbar from "./Navbar";
// import TopHeader from "./TopHeader";

// // Header ta -top-10 (-40px) offset diye sticky, mane scroll korle
// // upore 40px uthe giye atke jay (TopHeader hide hoye MinHeader+Navbar dekha jay).
// // Ei component actual "visible" height ta measure kore
// // document root e --header-height CSS variable hishebe set kore dey,
// // jeta SidebarCategories (ba onno kono sticky element) use korte parbe.
// const HEADER_STICKY_OFFSET = 0; // -top-10 = -40px, tailwind class change korle ei number o update korben

// const Header: React.FC = () => {
//   const headerRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     const el = headerRef.current;
//     if (!el) return;

//     const updateHeaderHeight = () => {
//       const fullHeight = el.offsetHeight;
//       const visibleHeight = Math.max(fullHeight - HEADER_STICKY_OFFSET, 0);
//       document.documentElement.style.setProperty(
//         "--header-height",
//         `${visibleHeight}px`
//       );
//     };

//     updateHeaderHeight();

//     const resizeObserver = new ResizeObserver(updateHeaderHeight);
//     resizeObserver.observe(el);

//     window.addEventListener("resize", updateHeaderHeight);

//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener("resize", updateHeaderHeight);
//     };
//   }, []);

//   return (
//     <header ref={headerRef} className="sticky top-0 z-50 bg-white">
//       <TopHeader />
//       <MinHeader />
//       {/* <Navbar /> */}
//     </header>
//   );
// };

// export default Header;




// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import MinHeader from "./MinHeader";
// import TopHeader from "./TopHeader";
// import MobileNav from "./MobileNav"; // নতুন তৈরি করা কম্পোনেন্ট
// import { FiX } from "react-icons/fi";

// const HEADER_STICKY_OFFSET = 0;

// const Header: React.FC = () => {
//   const headerRef = useRef<HTMLElement | null>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // বডি স্ক্রল লক করার জন্য যখন মেনু ওপেন থাকে
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMobileMenuOpen]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     const el = headerRef.current;
//     if (!el) return;

//     const updateHeaderHeight = () => {
//       const fullHeight = el.offsetHeight;
//       const visibleHeight = Math.max(fullHeight - HEADER_STICKY_OFFSET, 0);
//       document.documentElement.style.setProperty(
//         "--header-height",
//         `${visibleHeight}px`
//       );
//     };

//     updateHeaderHeight();

//     const resizeObserver = new ResizeObserver(updateHeaderHeight);
//     resizeObserver.observe(el);

//     window.addEventListener("resize", updateHeaderHeight);

//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener("resize", updateHeaderHeight);
//     };
//   }, []);

//   return (
//     <>
//       <header ref={headerRef} className="sticky top-0 z-50 bg-white">
//         <TopHeader />
//         <MinHeader onToggleMobile={toggleMobileMenu} />
//       </header>

//       {/* Mobile Menu Drawer / Sidebar */}
//       <div
//         className={`fixed inset-0 z-[100] flex md:hidden transition-all duration-300 ease-in-out ${
//           isMobileMenuOpen
//             ? "visible opacity-100"
//             : "invisible opacity-0 delay-300"
//         }`}
//       >
//         {/* Backdrop Overlay */}
//         <div
//           className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
//             isMobileMenuOpen ? "opacity-100" : "opacity-0"
//           }`}
//           onClick={toggleMobileMenu}
//           aria-hidden="true"
//         />

//         {/* Drawer Content - বাম দিক থেকে স্মুথলি স্লাইড হবে */}
//         <aside
//           className={`relative w-[85%] max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
//             isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
//             <h2 className="text-xl font-bold">Menu</h2>
//             <button
//               onClick={toggleMobileMenu}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               aria-label="Close Menu"
//             >
//               <FiX size={24} />
//             </button>
//           </div>

//           {/* Separate Mobile Navigation Component */}
//           <MobileNav onClose={toggleMobileMenu} />
//         </aside>
//       </div>
//     </>
//   );
// };

// export default Header;


"use client";

import React, { useEffect, useRef, useState } from "react";
import MinHeader from "./MinHeader";
import TopHeader from "./TopHeader";
import MobileNav from "./MobileNav";
import { FiX } from "react-icons/fi";

const HEADER_STICKY_OFFSET = 0;

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateHeaderHeight = () => {
      const fullHeight = el.offsetHeight;
      const visibleHeight = Math.max(fullHeight - HEADER_STICKY_OFFSET, 0);
      document.documentElement.style.setProperty(
        "--header-height",
        `${visibleHeight}px`
      );
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(el);

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 bg-white">
        <TopHeader />
        <MinHeader onToggleMobile={toggleMobileMenu} />
      </header>

      <div
        className={`fixed inset-0 z-[100] flex md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 delay-300"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />

        <aside
          className={`relative w-[85%] max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close Menu"
            >
              <FiX size={24} />
            </button>
          </div>

          <MobileNav onClose={toggleMobileMenu} />
        </aside>
      </div>
    </>
  );
};

export default Header;