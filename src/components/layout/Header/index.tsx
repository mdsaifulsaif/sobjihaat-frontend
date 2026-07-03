

"use client";

import React, { useEffect, useRef } from "react";
import MinHeader from "./MinHeader";
import Navbar from "./Navbar";
import TopHeader from "./TopHeader";

// Header ta -top-10 (-40px) offset diye sticky, mane scroll korle
// upore 40px uthe giye atke jay (TopHeader hide hoye MinHeader+Navbar dekha jay).
// Ei component actual "visible" height ta measure kore
// document root e --header-height CSS variable hishebe set kore dey,
// jeta SidebarCategories (ba onno kono sticky element) use korte parbe.
const HEADER_STICKY_OFFSET = 0; // -top-10 = -40px, tailwind class change korle ei number o update korben

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement | null>(null);

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
    <header ref={headerRef} className="sticky top-0 z-50 bg-white">
      <TopHeader />
      <MinHeader />
      {/* <Navbar /> */}
    </header>
  );
};

export default Header;