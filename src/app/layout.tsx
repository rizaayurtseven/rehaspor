import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { PublicShell } from "@/components/layout/PublicShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const title = "Reha Spor | Profesyonel Zemin ve Ekipman Çözümleri";
const description =
  "Spor tesisleri için profesyonel zemin kaplamaları, saha uygulamaları, spor ekipmanları ve padel kort çözümleri.";

export function generateMetadata(): Metadata {
  const origin = process.env.APP_ORIGIN || "http://localhost:3000";
  const baseUrl = new URL(origin);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: {
      default: title,
      template: "%s | Reha Spor",
    },
    description,
    applicationName: "Reha Spor",
    keywords: ["spor zeminleri", "spor ekipmanları", "padel court", "saha uygulamaları", "Reha Spor"],
    alternates: { canonical: "./" },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Reha Spor",
      url: baseUrl,
      title,
      description,
      images: [{ url: socialImage, width: 1734, height: 908, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${jetBrainsMono.variable} bg-brand-cream text-brand-ink antialiased`}>
        <ThemeProvider />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
