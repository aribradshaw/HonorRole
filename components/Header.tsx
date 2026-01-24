'use client';

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface HeaderProps {
  showHamburger?: boolean;
  scrolledPastHero?: boolean;
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
  showPulse?: boolean;
  disableScrollTransition?: boolean;
}

export default function Header({ 
  showHamburger = false, 
  scrolledPastHero = true,
  menuOpen = false,
  setMenuOpen,
  showPulse = false,
  disableScrollTransition = false
}: HeaderProps) {
  const [overFooter, setOverFooter] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const effectiveScrolledPastHero = disableScrollTransition ? false : scrolledPastHero;

  const navItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/work" },
      { label: "Shop", href: "/merch" },
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
        effectiveScrolledPastHero
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
            opacity: effectiveScrolledPastHero ? 1 : 0,
            x: effectiveScrolledPastHero ? 0 : -20
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`hidden md:block ${effectiveScrolledPastHero ? 'md:block' : 'pointer-events-none'}`}
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
        {showHamburger && !effectiveScrolledPastHero && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: effectiveScrolledPastHero ? 0 : 1 }}
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
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap uppercase tracking-wider text-[11px] font-semibold"
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
                    href="/about" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap uppercase tracking-wider text-[11px] font-semibold"
                  >
                    About
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
                    href="/work" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap uppercase tracking-wider text-[11px] font-semibold"
                  >
                    Projects
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
                    href="/merch" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap uppercase tracking-wider text-[11px] font-semibold"
                  >
                    Shop
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
                    href="/press" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap uppercase tracking-wider text-[11px] font-semibold"
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
                  transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                >
                  <Link 
                    href="/contact" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap uppercase tracking-wider text-[11px] font-semibold"
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Hamburger/X button */}
              <div className="relative h-[60px] w-[60px] md:h-[72px] md:w-[72px]">
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
                      className="h-[60px] w-[60px] md:h-[72px] md:w-[72px] rounded-full border-2"
                      style={{
                        borderColor: '#ffbb71',
                        boxShadow: '0 0 20px rgba(255, 187, 113, 0.5)'
                      }}
                    />
                  </motion.div>
                )}
                <button 
                  onClick={() => setOpen(!isOpen)}
                  className="absolute inset-0 flex items-center justify-center text-white hover:text-[#ffbb71] transition-colors md:scale-125"
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
              effectiveScrolledPastHero ? (overFooter ? "text-white" : "text-[#181619]") : "text-white"
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
          animate={{ opacity: effectiveScrolledPastHero ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`hidden md:flex items-center gap-8 text-sm ${effectiveScrolledPastHero ? 'md:flex' : 'hidden pointer-events-none'}`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/" 
              className={`hover:text-[#ca9215] transition-colors uppercase tracking-wider text-[11px] font-semibold ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/about" 
              className={`hover:text-[#ca9215] transition-colors uppercase tracking-wider text-[11px] font-semibold ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              About
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/work" 
              className={`hover:text-[#ca9215] transition-colors uppercase tracking-wider text-[11px] font-semibold ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Projects
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/merch" 
              className={`hover:text-[#ca9215] transition-colors uppercase tracking-wider text-[11px] font-semibold ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Shop
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/press" 
              className={`hover:text-[#ca9215] transition-colors uppercase tracking-wider text-[11px] font-semibold ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Press
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/contact" 
              className={`hover:text-[#ca9215] transition-colors uppercase tracking-wider text-[11px] font-semibold ${overFooter ? 'text-white' : 'text-[#181619]'}`}
            >
              Contact
            </Link>
          </motion.div>
        </motion.div>
      </nav>

      {/* Mobile vertical menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full right-0 mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="px-2 pt-0 pb-1 flex flex-col gap-1 items-end text-right">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.05, duration: 0.2 }
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    transition: {
                      delay: (navItems.length - 1 - index) * 0.05,
                      duration: 0.2
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-white text-[11px] font-semibold uppercase tracking-wider transition-colors px-2 py-1 rounded-md hover:bg-black/30"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
