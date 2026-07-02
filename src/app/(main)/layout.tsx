

import Footer from "@/components/layout/Footer";
import LayoutShell from "@/components/layout/LayoutShell";
import FloatingCartButton from "@/components/shared/FloatingCartButton";
import MiniCart from "@/components/shared/MiniCart";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <LayoutShell>
    {children}
    <MiniCart />
     <FloatingCartButton />
    
  </LayoutShell>;
     
  </>
}



