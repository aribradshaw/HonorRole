'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface HeaderProps {
  showHamburger?: boolean;
  scrolledPastHero?: boolean;
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
  showPulse?: boolean;
}

export default function Header({ 
  showHamburger = false, 
  scrolledPastHero = true,
  menuOpen = false,
  setMenuOpen,
  showPulse = false
}: HeaderProps) {
  const [overFooter, setOverFooter] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Merch", href: "/merch" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" }
    ],
    []
  );

  const isMenuControlled = typeof setMenuOpen === "function";
  const isOpen = isMenuControlled ? menuOpen : internalMenuOpen;
  const setOpen = (open: boolean) => {
    if (isMenuControlled) setMenuOpen?.(open);
    else setInternalMenuOpen(open);
  };

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
          ? 'bg-transparent border-b-0 md:backdrop-blur-md md:border-b md:border-[#181619]/10'
          : 'bg-transparent border-b-0'
      }`}
    >
      <nav className="w-full px-4 py-4 md:px-8 md:py-6 flex items-center justify-end md:justify-between relative">
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
          className={`hidden md:block ${scrolledPastHero ? 'md:block' : 'pointer-events-none'}`}
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
        {/* Desktop-only hamburger (existing behavior) */}
        {showHamburger && !scrolledPastHero && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: scrolledPastHero ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            // Anchor to top-right so it doesn't drift when the logo is hidden above the hero
            className="hidden md:block absolute right-8 top-6"
          >
            <div className="flex items-center gap-8">
              {/* Menu items that spill out to the left */}
              <motion.div
                className="flex items-center gap-8"
                initial={false}
                animate={{
                  width: isOpen ? 'auto' : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: isOpen ? 0 : 20,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                  <Link 
                    href="/" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: isOpen ? 0 : 20,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                >
                  <Link 
                    href="/work" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Work
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: isOpen ? 0 : 20,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                  <Link 
                    href="/merch" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Merch
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: isOpen ? 0 : 20,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                >
                  <Link 
                    href="/press" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Press
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: isOpen ? 0 : 20,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
                  <Link 
                    href="/contact" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Hamburger/X button */}
              <div className="relative h-[60px] w-[60px]">
                {showPulse && !isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 1.4]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none hidden md:flex"
                  >
                    <div
                      className="h-[60px] w-[60px] rounded-full border-2"
                      style={{
                        borderColor: '#ffbb71',
                        boxShadow: '0 0 20px rgba(255, 187, 113, 0.5)'
                      }}
                    />
                  </motion.div>
                )}
                <button 
                  onClick={() => setOpen(!isOpen)}
                  className="absolute inset-0 flex items-center justify-center text-white hover:text-[#ffbb71] transition-colors"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
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
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
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
            </div>
          </motion.div>
        )}

        {/* Mobile hamburger (always visible on mobile, no scroll transition) */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!isOpen)}
            className={`${
              scrolledPastHero ? (overFooter ? "text-white" : "text-[#181619]") : "text-white"
            } hover:text-[#ffbb71] transition-colors z-10 relative`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <motion.svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
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

        {/* Navigation links - shown after scrolling past hero or always on other pages */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolledPastHero ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`hidden md:flex items-center gap-8 text-sm ${scrolledPastHero ? 'md:flex' : 'hidden pointer-events-none'}`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/" 
              className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Home
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

      {/* Mobile vertical menu panel */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#181619]/90 backdrop-blur-md border-t border-white/10">
          <div className="px-8 py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white text-xl font-semibold tracking-wide hover:text-[#ffbb71] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
