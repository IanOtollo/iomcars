import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "IOMCars | Premium Automotive Marketplace & Showroom",
  description: "Experience excellence in automotive acquisition. IOMCars is the premier destination for verified luxury sedans, SUVs, superbikes, and commercial trucks in Nairobi, Kenya.",
  keywords: ["Luxury Cars Kenya", "IOMCars", "Premium Vehicles Nairobi", "Car Rental Nairobi", "Vehicle Marketplace"],
  openGraph: {
    title: "IOMCars | The Ultimate Standard",
    description: "Verified luxury assets for the discerning collector.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
