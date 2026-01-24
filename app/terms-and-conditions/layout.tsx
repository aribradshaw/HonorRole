import type { Metadata } from "next";

const title = "TERMS & CONDITIONS";
const description = "Honor Role terms and conditions.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/terms-and-conditions",
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

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
