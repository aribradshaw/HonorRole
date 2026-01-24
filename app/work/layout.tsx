import type { Metadata } from "next";

const title = "PROJECTS";
const description =
  "Explore Honor Role projects, including feature films and television productions.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/work",
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

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
