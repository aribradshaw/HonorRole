import type { Metadata } from "next";

const title = "SHOP";
const description = "Shop Honor Role merchandise and get updates on new drops.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/merch",
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

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
