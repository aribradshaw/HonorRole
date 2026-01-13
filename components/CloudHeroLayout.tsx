"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

type CloudHeroLayoutProps = {
  hero: React.ReactNode;
  children: React.ReactNode;
};

export default function CloudHeroLayout({ hero, children }: CloudHeroLayoutProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolledPastHero(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
        <section className="relative w-full h-screen flex items-center justify-center px-4">
          {hero}
        </section>

        {/* Page content on paper background */}
        <div className="bg-[#d1d3c7]">{children}</div>
      </div>
    </main>
  );
}

