import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elena's Cafe | Cozy Local Cafe, Coffee, Brunch & Comfort Food",
  description:
    "Elena's Cafe is a cozy green-themed local cafe serving fresh coffee, baked goods, paninis, breakfast bowls, brunch favourites, comfort food, and warm hospitality.",
  keywords: [
    "Elena's Cafe",
    "local cafe",
    "coffee shop",
    "brunch cafe",
    "chicken panini",
    "hot chocolate",
    "breakfast bowls",
    "baked goods",
    "perogies",
    "cabbage rolls",
    "cozy cafe",
    "halal friendly cafe",
  ],
  openGraph: {
    title: "Elena's Cafe | Cozy Local Cafe, Coffee, Brunch & Comfort Food",
    description:
      "Fresh coffee, baked goods, paninis, breakfast bowls, brunch favourites, comfort food, and warm hospitality.",
    type: "website",
    locale: "en_CA",
    siteName: "Elena's Cafe",
    images: ["/elena/background/exterior-1.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
