import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bella Bags of Boston | Luxury Designer Handbags",
  description: "Boston's premier destination for authentic luxury handbags. Shop Chanel, Louis Vuitton, Hermes, Dior, and more. Authenticity guaranteed.",
  keywords: "luxury handbags, designer bags, Chanel, Louis Vuitton, Hermes, Boston, authentic bags",
  openGraph: {
    title: "Bella Bags of Boston | Luxury Designer Handbags",
    description: "Boston's premier destination for authentic luxury handbags.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfair.variable + " " + cormorant.variable + " antialiased"}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-pink-500 focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
