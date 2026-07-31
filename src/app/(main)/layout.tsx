


import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MinHeader from "@/components/layout/Header/MinHeader";
import Navbar from "@/components/layout/Header/Navbar";
import MiniCart from "@/components/shared/MiniCart";
import FloatingCartButton from "@/components/shared/FloatingCartButton";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>

           <Header />
           
            <main className="min-h-screen pt-3">
                {children}
            </main>
                <MiniCart/>
                <FloatingCartButton />
            <Footer />
        </>
    );
}
