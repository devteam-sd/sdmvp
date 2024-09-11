import { Inter } from "next/font/google";
import "./globals.css";
import TopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Include TopLoader globally */}
          <TopLoader />

          <div className="flex h-screen">
            {/* Persistent Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col">
              {/* Persistent Navbar */}
              <Navbar />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
