'use client';

import { usePathname } from "next/navigation";
import BoomerangCloudVideo from "@/components/BoomerangCloudVideo";

const PAPER_PREFIXES = [
  "/privacy-policy",
  "/terms-and-conditions",
  "/california-privacy-rights",
  "/login",
];

export default function BackgroundMedia() {
  const pathname = usePathname();
  const isPaper = PAPER_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (isPaper) return null;

  return <BoomerangCloudVideo />;
}
