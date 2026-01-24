import type { Metadata } from "next";

const title = "ABOUT";
const description =
  "Learn about Honor Role and its mission to develop character-driven stories by visionary filmmakers.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/about",
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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
