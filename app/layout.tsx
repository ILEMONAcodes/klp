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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <ConditionalFooter />
      </body>
    </html>
  );
}