import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Kayceelaw Properties",
  description: "Redefining Luxury Living & Smart Real Estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} overflow-x-hidden`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
        <div className="flex-1 w-full overflow-x-hidden">{children}</div>
        <ConditionalFooter />
      </body>
    </html>
  );
}