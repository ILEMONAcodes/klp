"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Do not render Footer on login, signin, signup, or admin pages
  const isAuthOrAdminPage =
    pathname.includes("/login") ||
    pathname.includes("/signin") ||
    pathname.includes("/signup") ||
    pathname.startsWith("/admin");

  if (isAuthOrAdminPage) {
    return null;
  }

  return <Footer />;
}
