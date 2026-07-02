

// import Footer from "@/components/layout/Footer";
// import LayoutShell from "@/components/layout/LayoutShell";
// import FloatingCartButton from "@/components/shared/FloatingCartButton";
// import MiniCart from "@/components/shared/MiniCart";


// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <>
//   <LayoutShell>
//     {children}
//     <MiniCart />
//      <FloatingCartButton />
    
//   </LayoutShell>;
   
//   </>
// }



import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
