
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import SubHeader from "@/components/subHeader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogs About Latest Techs",
  description: "A website to get updated with latest techs and news about it",
};

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=" w-full">
          <Header />
          <SubHeader />
          <div className="flex  relative h-full w-full bg-white">
            {/* <Sidebar /> */}
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
