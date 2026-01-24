import type { Metadata } from "next";

const title = "CONTACT";
const description = "Get in touch with Honor Role.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/contact",
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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
