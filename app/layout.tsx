import type { Metadata } from "next";
import Script from "next/script";
import BackgroundMedia from "@/components/BackgroundMedia";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://honorrole.com"),
  title: {
    default: "Honor Role | Production Company",
    template: "%s | Honor Role",
  },
  description:
    "A production company from Camila Mendes and Rachel Matthews. Character-driven stories that honor the role and uplift actors.",
  openGraph: {
    type: "website",
    url: "https://honorrole.com",
    title: "Honor Role | Production Company",
    description:
      "A production company from Camila Mendes and Rachel Matthews. Character-driven stories that honor the role and uplift actors.",
    images: [
      {
        url: "/logofiles/Honor Role Original.JPG",
        width: 1600,
        height: 900,
        alt: "Honor Role",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Honor Role | Production Company",
    description:
      "A production company from Camila Mendes and Rachel Matthews. Character-driven stories that honor the role and uplift actors.",
    images: ["/logofiles/Honor Role Original.JPG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Honor Role",
                  url: "https://honorrole.com",
                  logo: "https://honorrole.com/logofiles/Honor%20Role%20Original.JPG",
                  sameAs: ["https://www.instagram.com/honorrole/"],
                },
                {
                  "@type": "WebSite",
                  name: "Honor Role",
                  url: "https://honorrole.com",
                },
              ],
            }),
          }}
        />
        <BackgroundMedia />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
