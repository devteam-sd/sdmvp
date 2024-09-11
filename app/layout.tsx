"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import TopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define the routes where you don't want the Sidebar and Navbar
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Include TopLoader globally */}
          <TopLoader />

          {/* Conditional Layout */}
          {isAuthRoute ? (
            <main className="h-screen flex items-center justify-center">
              {children}
            </main>
          ) : (
            <div className="flex h-screen">
              {/* Persistent Sidebar */}
              <Sidebar />

              <div className="flex-1 flex flex-col">
                {/* Persistent Navbar */}
                <Navbar />
                <main className="flex-1 p-4">{children}</main>
              </div>
            </div>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
