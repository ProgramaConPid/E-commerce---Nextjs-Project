import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "NextAuth App",
  description: "Login con NextAuth y MongoDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
