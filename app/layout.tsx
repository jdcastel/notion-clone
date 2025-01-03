import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


export const metadata: Metadata = {
  title: "Notion clone App",
  description: "A Notion clone app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 bg-gray-100 overflow-y-auto scrollbar-hide p-4">
            {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
