import type { Metadata } from "next";
import BackgroundMedia from "@/components/BackgroundMedia";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Honor Role | Production Company",
  description: "A production company from Camila Mendes and Rachel Matthews. Character-driven stories that honor the role and uplift actors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <BackgroundMedia />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
