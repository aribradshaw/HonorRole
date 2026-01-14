"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import BoomerangCloudVideo from "@/components/BoomerangCloudVideo";

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
      {/* Fixed cloud hero background with boomerang video */}
      <BoomerangCloudVideo />

      <div className="relative z-10">
        <Header
          showHamburger={true}
          scrolledPastHero={scrolledPastHero}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        {/* Honor Role logo - top right */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
          <Image
            src="/logofiles/HR_Wordmark_Gold_Glow_v3.avif"
            alt="Honor Role"
            width={200}
            height={67}
            className="w-auto h-8 md:h-12 opacity-90 hover:opacity-100 transition-opacity"
            priority={false}
          />
        </div>

        {/* Hero content lives over the fixed background */}
        <section
          ref={heroRef}
          className="relative w-full h-[55vh] md:h-screen flex items-center justify-center px-4"
        >
          {hero}
        </section>

        {/* Page content on paper background */}
        <div className="bg-[#d1d3c7]">{children}</div>
      </div>
    </main>
  );
}

