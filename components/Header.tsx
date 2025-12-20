'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface HeaderProps {
  showHamburger?: boolean;
  scrolledPastHero?: boolean;
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
}

export default function Header({ 
  showHamburger = false, 
  scrolledPastHero = true,
  menuOpen = false,
  setMenuOpen
}: HeaderProps) {
  const [overFooter, setOverFooter] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Find footer element
      const footer = document.querySelector('footer[id="contact"]') as HTMLElement;
      if (footer) {
        footerRef.current = footer;
        const footerTop = footer.offsetTop;
        const headerHeight = 100;
        const scrollY = window.scrollY;
        const headerBottom = scrollY + headerHeight;
        const isOverFooter = headerBottom >= footerTop;
        setOverFooter(isOverFooter);
        
        const transitionStart = footerTop - 200;
        const transitionEnd = footerTop;
        const transitionRange = transitionEnd - transitionStart;
        
        if (headerBottom >= transitionStart && headerBottom <= transitionEnd) {
          const progress = (headerBottom - transitionStart) / transitionRange;
          setLogoOpacity(Math.max(0, Math.min(1, progress)));
        } else if (headerBottom > transitionEnd) {
          setLogoOpacity(1);
        } else {
          setLogoOpacity(0);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolledPastHero 
          ? 'bg-transparent backdrop-blur-md border-b border-[#181619]/10' 
          : 'bg-transparent border-b-0'
      }`}
      style={{
        backdropFilter: scrolledPastHero ? 'blur(12px)' : 'none',
      }}
    >
      <nav className="w-full px-8 py-6 flex items-center justify-between relative">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: scrolledPastHero ? 1 : 0,
            x: scrolledPastHero ? 0 : -20
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={scrolledPastHero ? 'block' : 'pointer-events-none'}
        >
          <Link href="/" className="block relative">
            {/* Black logo (base layer) */}
            <div
              style={{
                opacity: 1 - logoOpacity,
                transition: 'opacity 0.3s ease-out',
              }}
              className="absolute inset-0"
            >
              <Image
                src="/logofiles/Honor-Role-Logo_Black.png"
                alt="Honor Role"
                width={200}
                height={60}
                className="h-8 w-auto"
                priority
                style={{ borderRadius: 0 }}
              />
            </div>
            {/* White logo (overlay layer) */}
            <div
              style={{
                opacity: logoOpacity,
                transition: 'opacity 0.3s ease-out',
              }}
              className="absolute inset-0"
            >
              <Image
                src="/logofiles/Honor-Role-Logo_Black.png"
                alt="Honor Role"
                width={200}
                height={60}
                className="h-8 w-auto"
                priority
                style={{ 
                  borderRadius: 0,
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </div>
            {/* Spacer to maintain layout */}
            <div className="invisible">
              <Image
                src="/logofiles/Honor-Role-Logo_Black.png"
                alt="Honor Role"
                width={200}
                height={60}
                className="h-8 w-auto"
                style={{ borderRadius: 0 }}
              />
            </div>
          </Link>
        </motion.div>

        {/* Hamburger menu - only on homepage when above hero */}
        {showHamburger && !scrolledPastHero && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: scrolledPastHero ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="block relative"
          >
            <div className="flex items-center gap-8">
              {/* Menu items that spill out to the left */}
              <motion.div
                className="flex items-center gap-8"
                initial={false}
                animate={{
                  width: menuOpen ? 'auto' : 0,
                  opacity: menuOpen ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                  <Link 
                    href="#about" 
                    onClick={() => setMenuOpen?.(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                >
                  <Link 
                    href="/work" 
                    onClick={() => setMenuOpen?.(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Work
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                  <Link 
                    href="/merch" 
                    onClick={() => setMenuOpen?.(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Merch
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                >
                  <Link 
                    href="/press" 
                    onClick={() => setMenuOpen?.(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Press
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
                  <Link 
                    href="/contact" 
                    onClick={() => setMenuOpen?.(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Hamburger/X button */}
              <button 
                onClick={() => setMenuOpen?.(!menuOpen)}
                className="text-white hover:text-[#ffbb71] transition-colors z-10 relative flex-shrink-0"
              >
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: menuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {menuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </motion.svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* Navigation links - shown after scrolling past hero or always on other pages */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolledPastHero ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`flex items-center gap-8 text-sm ${scrolledPastHero ? 'flex' : 'hidden pointer-events-none'}`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/#about" 
              className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              About
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/work" 
              className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Work
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/merch" 
              className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Merch
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/press" 
              className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Press
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/contact" 
              className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Contact
            </Link>
          </motion.div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
