import type { Metadata } from "next";

const title = "PRESS";
const description = "Press coverage and news about Honor Role.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/press",
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
    title,
    description,
    images: ["/logofiles/Honor Role Original.JPG"],
  },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
