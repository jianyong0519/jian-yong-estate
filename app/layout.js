import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | New Property Launches in KL & Selangor`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "New launch condos and landed homes in Kuala Lumpur and Selangor: SPA prices, layouts, locations and MM2H guidance from Yap Jian Yong.",
  openGraph: { siteName: SITE.name, locale: "en_MY", type: "website" },
  robots: SITE.live ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-MY">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap"
        />
      </head>
      <body>
        <Header />
        <main className="wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
