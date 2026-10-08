import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import { CursorTrailWrapper } from "@/components/layout/CursorTrailWrapper";
import { ScrollMotion } from "@/components/layout/ScrollMotion";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import {
  SITE_URL,
  SITE_NAME,
  AUTHOR_NAME,
} from "@/lib/site";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | ${AUTHOR_NAME} - Software Engineer & Full-Stack Developer`,
  description:
    "Software engineer building practical digital products — full-stack development, fintech and digital financial services, APIs, databases, and open-source tools.",
  keywords: [
    "Angel Zee Ngoh",
    "Angel Codes",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Fintech",
    "Digital Identity",
    "Open Source",
    "Yaounde Cameroon",
    "Portfolio",
  ],
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${AUTHOR_NAME}`,
    description:
      "Software engineer building practical digital products — full-stack, fintech, APIs and open-source tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${AUTHOR_NAME}`,
    description:
      "Software engineer building practical digital products — full-stack, fintech, APIs and open-source tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  url: SITE_URL,
  jobTitle: "Software Engineer & Full-Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yaoundé",
    addressCountry: "CM",
  },
  email: "ngohangelzee@gmail.com",
  sameAs: [
    "https://github.com/ANGELcode-coder",
    "https://www.linkedin.com/in/angel-zee-ngoh",
    "https://dev.to/angel_zeengoh_0fc1818af4",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Angel Codes Blog"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <ScrollMotion>
            <CursorTrailWrapper />
            {children}
            <ScanlineOverlay />
          </ScrollMotion>
        </Providers>
      </body>
    </html>
  );
}
