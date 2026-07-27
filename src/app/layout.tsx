import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sobjihaat.com"),

  title: "SobjiHaat | Barisal's Trusted Online Grocery & Fresh Food Delivery",

  description:
    "Shop fresh vegetables, fruits, fish, meat, groceries, daily essentials, and household products online from SobjiHaat. Fast and reliable home delivery across Barisal.",

  keywords: [
    "SobjiHaat",
    "Online Grocery",
    "Barisal",
    "Fresh Vegetables",
    "Fresh Fruits",
    "Fish",
    "Meat",
    "Groceries",
    "Home Delivery",
    "Bangladesh",
  ],

  openGraph: {
    title: "SobjiHaat | Fresh Grocery Delivered to Your Doorstep",
    description:
      "Order fresh groceries, vegetables, fruits, fish, meat, and daily essentials online with fast delivery in Barisal.",
    type: "website",
    locale: "en_US",
    siteName: "SobjiHaat",
  },

  twitter: {
    card: "summary_large_image",
    title: "SobjiHaat | Online Grocery in Barisal",
    description:
      "Fresh groceries and daily essentials delivered to your doorstep.",
  },
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <AuthSessionProvider >
        <ReduxProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </ReduxProvider>
          </AuthSessionProvider>
      </body>
    </html>
  );
}
