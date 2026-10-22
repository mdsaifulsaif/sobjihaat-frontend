


import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MinHeader from "@/components/layout/Header/MinHeader";
import Navbar from "@/components/layout/Header/Navbar";
import MiniCart from "@/components/shared/MiniCart";
import FloatingCartButton from "@/components/shared/FloatingCartButton";
import ComplainModal from "@/components/modals/ComplainModal";
import WhatsAppLiveChat from "@/components/chat/WhatsAppLiveChat";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>

           <Header />
           
            <main className=" pt-3">
                {children}
            </main>
                <MiniCart/>
                <FloatingCartButton />
                <ComplainModal />
                <WhatsAppLiveChat />
            <Footer />
        </>
    );
}
