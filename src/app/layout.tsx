import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettingsRepository, getSiteContentRepository } from "@/lib/repositories";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://olenna.in"),
  title: {
    default: "Olenna — Everyday Elegance, Thoughtfully Curated",
    template: "%s | Olenna",
  },
  description:
    "Discover Olenna — a premium retail destination celebrating beauty, fashion, ethnic wear, imitation jewellery, accessories, personal care, and tailoring supplies.",
  keywords: [
    "Olenna",
    "premium retail",
    "ethnic wear",
    "beauty cosmetics",
    "imitation jewellery",
    "handbags accessories",
    "personal care",
    "tailoring supplies",
  ],
  openGraph: {
    title: "Olenna — Everyday Elegance, Thoughtfully Curated",
    description:
      "A premium multi-category retail brand celebrating beauty, timeless fashion, and lifestyle essentials.",
    url: "https://olenna.in",
    siteName: "Olenna",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo/olenna-logo-full.png",
        width: 1070,
        height: 657,
        alt: "Olenna — Luxury Beauty, Fashion & Lifestyle",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#493541",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsRepo = getSiteSettingsRepository();
  const contentRepo = getSiteContentRepository();

  const [settings, announcement] = await Promise.all([
    settingsRepo.getSiteSettings(),
    contentRepo.getAnnouncementBar(),
  ]);

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-ivory-50 text-brand-text-primary selection:bg-brand-mauve-200 selection:text-brand-plum-950 font-sans">
        <AnnouncementBar announcement={announcement} settings={settings} />
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
