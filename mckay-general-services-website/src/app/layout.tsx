import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const heading = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "McKay General Services | Moving, Hauling & General Labour in Kelowna",
  description:
    "McKay General Services provides reliable moving, hauling, junk removal, yard cleanup, property maintenance and general labour services across Kelowna and surrounding areas. Free estimates available.",
  keywords: [
    "Kelowna moving services",
    "Junk removal Kelowna",
    "General labour Kelowna",
    "Property cleanup",
    "Hauling services",
    "Moving company Kelowna",
  ],
  openGraph: {
    title: "McKay General Services | Moving, Hauling & General Labour in Kelowna",
    description:
      "Reliable moving, hauling, junk removal, property cleanup and general labour services across Kelowna and surrounding areas.",
    type: "website",
    locale: "en_CA",
    siteName: "McKay General Services",
    images: ["/brand/mckay-business-card.png"],
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
