import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { InPageNavigation } from "@/components/InPageNavigation";
import { RevealObserver } from "@/components/RevealObserver";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Freelance Frontend Developer",
    "React.js Developer",
    "WordPress Developer",
    "Frontend Developer for Hire",
    "Figma to React Developer",
    "Responsive Website Development",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    locale: siteConfig.locale,
    firstName: "Saumya",
    lastName: "Majumder",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark light",
};

const inlineHeadScript =
  "var d=document.documentElement;d.setAttribute('data-js','');if(location.hash)d.setAttribute('data-cv-off','')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Runs before first paint:
            - data-js: scroll-reveal content is only hidden when JS is
              available to reveal it ("Scroll reveal" in globals.css);
            - data-cv-off: a URL with a #hash scrolls on load, so render every
              section at its real size up front ("cv-auto" in globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: inlineHeadScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <RevealObserver />
        <InPageNavigation />
      </body>
    </html>
  );
}
