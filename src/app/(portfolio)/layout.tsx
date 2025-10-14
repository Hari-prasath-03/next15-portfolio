import type { Metadata } from "next";
import { Comic_Relief } from "next/font/google";
import "../globals.css";

import Sidebar from "@/components/layouts/Sidebar";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Provider from "../provider";

const comic = Comic_Relief({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comic",
});

export const metadata: Metadata = {
  title: "Hari prasath K | Portfolio",
  description:
    "A portfolio website showcasing the projects and skills of Mee, a passionate developer and learner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comic.className} antialiased`}>
        <Sidebar />
        <Provider>
          <Navbar />
          {children}
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
