import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import "@/app/globals.css";
import { PublicShell } from "@/components/layout/PublicShell";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const title = "Reha Spor | Profesyonel Zemin ve Ekipman Çözümleri";
const description =
  "Spor tesisleri için profesyonel zemin kaplamaları, saha uygulamaları, spor ekipmanları ve padel kort çözümleri.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const host = forwardedHost ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
    ? forwardedProtocol
    : host.startsWith("localhost")
      ? "http"
      : "https";
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: {
      default: title,
      template: "%s | Reha Spor"
    },
    description,
    applicationName: "Reha Spor",
    alternates: { canonical: baseUrl },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Reha Spor",
      url: baseUrl,
      title,
      description,
      images: [{ url: socialImage, width: 1734, height: 908, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage]
    },
    robots: { index: true, follow: true }
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${hanken.variable} ${jetBrainsMono.variable} bg-brand-cream text-brand-ink antialiased`}>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
