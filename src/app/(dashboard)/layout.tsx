import type { Metadata } from "next";
import { Comic_Relief } from "next/font/google";
import "../globals.css";

import Footer from "@/components/layouts/Footer";
import Provider from "../provider";

const comic = Comic_Relief({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comic",
});

export const metadata: Metadata = {
  title: "Hari prasath K | Dashboard",
  description:
    "A dashboard for managing projects and tasks and managing content.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comic.className} antialiased`}>
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
