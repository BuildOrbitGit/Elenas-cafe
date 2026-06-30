import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const heading = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Tiny Twin by Twinscafe | Matcha, Coffee & Sandwiches in Vancouver",
  description: "Tiny Twin is Vancouver's playful blue café for signature matcha, coffee, refreshers, soft serve, and fresh sandwiches.",
  keywords: ["Tiny Twin", "Twinscafe", "Vancouver cafe", "Vancouver matcha", "Granville cafe"],
  openGraph: {
    title: "Tiny place. Big flavour. | Tiny Twin",
    description: "Playful drinks and big blue energy in Vancouver.",
    type: "website",
    locale: "en_CA",
    siteName: "Tiny Twin by Twinscafe",
    images: ["/tiny-twin/drink.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${heading.variable} ${body.variable}`}><body>{children}</body></html>;
}
