import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from "@/components/layout/SessionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/providers/Providers";
import { Provider } from "@/context/Provider";
import { Toaster } from "sonner";
import { CheckoutProvider } from "@/context/CheckoutContext";

export const metadata: Metadata = {
  title: "Pidcommerce",
  description: "E-commerce developed by Pid",
  icons: {
    icon: "/pidcommerce-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <Provider>
          <Providers>
            <SessionProvider>
              <CheckoutProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Toaster position="top-right" />
              </CheckoutProvider>
            </SessionProvider>
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
