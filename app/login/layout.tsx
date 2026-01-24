import type { Metadata } from "next";

const title = "LOGIN";
const description = "Honor Role login.";

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title,
    description,
    url: "https://honorrole.com/login",
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

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
