"use client";

import { useEffect, useRef, useState } from "react";
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
      {/* Fixed cloud hero background */}
      <div className="fixed inset-0 z-0 cloud-hero-bg">
        {/* subtle dark overlay so white hero text + hamburger reads cleanly */}
        <div className="absolute inset-0 bg-[#181619]/15" />
      </div>

      <div className="relative z-10">
        <Header
          showHamburger={true}
          scrolledPastHero={scrolledPastHero}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

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

