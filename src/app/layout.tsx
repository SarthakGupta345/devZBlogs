import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: "Main page to login and signup",
    description: "A website where user get latest update about techs and posted",
};

export default function MainLayout({
    children,

}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="main"
            >
                {children}
            </body>
        </html>
    );
}
