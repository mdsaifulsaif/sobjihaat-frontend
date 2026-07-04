import React from 'react';
import Header from "@/components/layout/Header";
import SidebarCategories from "@/components/shared/SidebarCategories";
import MiniCart from '@/components/shared/MiniCart';
import FloatingCartButton from '@/components/shared/FloatingCartButton';

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Static Sidebar (Desktop) */}
            {/* <div className="hidden md:block w-[240px] lg:w-[260px] flex-shrink-0 border-r border-gray-100 bg-white sticky top-0 h-screen overflow-y-auto custom-scrollbar z-40">
                <SidebarCategories />
            </div> */}

            {/* Main Content */}
            <div className="flex-1 min-w-0 ">
                <Header />
                <div>
                    {children}
                </div>
                  <MiniCart/>
                <FloatingCartButton />
            </div>
        </div>
    );
}