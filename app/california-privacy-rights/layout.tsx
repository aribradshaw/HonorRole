import type { Metadata } from "next";

const title = "CALIFORNIA PRIVACY RIGHTS";
const description = "Honor Role California privacy rights information.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/california-privacy-rights",
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

export default function CaliforniaPrivacyRightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
