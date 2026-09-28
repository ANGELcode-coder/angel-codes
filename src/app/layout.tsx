import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import { CursorTrailWrapper } from "@/components/layout/CursorTrailWrapper";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
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
  title: "Angel Codes | Angel Zee Ngoh - Software Engineer & Full-Stack Developer",
  description:
    "Building scalable software that solves real-world problems. Explore my portfolio of projects, certifications, and skills.",
  keywords: [
    "Angel Zee Ngoh",
    "Angel Ngoh",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "React Native",
    "Portfolio",
  ],
  authors: [{ name: "Angel Zee Ngoh" }],
  openGraph: {
    title: "Angel Codes | Angel Zee Ngoh",
    description:
      "Building scalable software that solves real-world problems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Codes | Angel Zee Ngoh",
    description:
      "Building scalable software that solves real-world problems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Angel Zee Ngoh",
  url: "https://angelcodes.vercel.app",
  jobTitle: "Software Engineer & Full-Stack Developer",
  email: "ngohangelzee@gmail.com",
  sameAs: [
    "https://github.com/ANGELcode-coder",
    "https://linkedin.com/in/angelngoh",
    "https://dev.to/angelngoh",
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
          <CursorTrailWrapper />
          {children}
          <ScanlineOverlay />
        </Providers>
      </body>
    </html>
  );
}
