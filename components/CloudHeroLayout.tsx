"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

type CloudHeroLayoutProps = {
  hero: React.ReactNode;
  children: React.ReactNode;
};

export default function CloudHeroLayout({ hero, children }: CloudHeroLayoutProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.getBoundingClientRect().height ?? window.innerHeight;
      setScrolledPastHero(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen text-[#181619] overflow-x-hidden relative bg-transparent">
      <div className="relative z-10">
        <Header
          showHamburger={true}
          scrolledPastHero={scrolledPastHero}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          disableScrollTransition={true}
        />

        {/* Honor Role logo - top left, clickable */}
        <div className="absolute top-0 left-0 md:top-6 md:left-6 md:right-auto z-[60] pointer-events-auto -mt-2 -ml-8">
          <Link href="/" className="block">
            <Image
              src="/logofiles/HR_Wordmark_Gold_Glow_v3.avif"
              alt="Honor Role"
              width={200}
              height={67}
              className="w-auto h-20 md:h-20 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              priority={false}
            />
          </Link>
        </div>

        {/* Hero content lives over the fixed background */}
        <section
          ref={heroRef}
          className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center px-4"
        >
          {hero}
        </section>

        {/* Page content stays over the video background */}
        <div className="bg-transparent">{children}</div>
      </div>
    </main>
  );
}

