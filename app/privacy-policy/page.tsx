'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function PrivacyPolicyPage() {
  const [overFooter, setOverFooter] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.offsetTop;
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
    <main className="min-h-screen bg-[#d1d3c7]">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-[#181619]/10"
        style={{
          backdropFilter: 'blur(12px)',
        }}
      >
        <nav className="w-full px-8 py-6 flex items-center justify-between relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Link href="/" className="block relative">
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

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center gap-8 text-sm"
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

      {/* Content */}
      <section className="relative w-full py-32 px-4 md:px-8 pt-40">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#181619] mb-8">Privacy Policy</h1>
            <div className="text-sm text-[#181619]/60 mb-12 font-mono">
              Last Updated: December 20, 2025
            </div>
            
            <div className="prose prose-lg max-w-none text-[#181619] space-y-6">
              <p>
                Honor Role Productions ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website.
              </p>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">Information We Collect</h2>
              <p>
                We may collect information that you provide directly to us, including but not limited to 
                your name, email address, and any other information you choose to provide when contacting us.
              </p>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect to respond to your inquiries, send you updates about 
                our productions, and improve our website and services.
              </p>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:hi@honorrole.com" className="text-[#ca9215] hover:text-[#ffbb71] underline">
                  hi@honorrole.com
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" ref={footerRef} className="relative w-full py-32 px-4 md:px-8 bg-black text-[#fce2ef]">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex justify-center"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Image
                  src="/15d34f62a49472ddeede119e708fe0dcc3e6e438-1280x816.jpg"
                  alt="Honor Role"
                  width={300}
                  height={191}
                  className="w-auto h-24 object-contain cursor-pointer"
                  style={{ borderRadius: 0 }}
                />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="font-semibold mb-4 text-2xl">Contact</h3>
              <a
                href="mailto:hi@honorrole.com"
                className="text-2xl underline hover:text-[#ffbb71] transition-colors"
              >
                hi@honorrole.com
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="font-semibold mb-4 text-2xl">Follow</h3>
              <a
                href="https://www.instagram.com/honorrole/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl underline hover:text-[#ffbb71] transition-colors"
              >
                @honorrole
              </a>
            </motion.div>
          </motion.div>
          <div className="pt-8 border-t border-[#fce2ef]/20">
            <div className="text-xs text-[#fce2ef]/60 space-y-1 font-mono tracking-wider leading-relaxed">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <span>© {new Date().getFullYear()} HONOR ROLE PRODUCTIONS</span>
                <span className="text-[#fce2ef]/40">|</span>
                <span>ALL RIGHTS RESERVED</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3">
                <Link 
                  href="/privacy-policy" 
                  className="hover:text-[#ffbb71] transition-colors underline"
                >
                  PRIVACY POLICY
                </Link>
                <span className="text-[#fce2ef]/40">|</span>
                <Link 
                  href="/terms-and-conditions" 
                  className="hover:text-[#ffbb71] transition-colors underline"
                >
                  TERMS & CONDITIONS
                </Link>
                <span className="text-[#fce2ef]/40">|</span>
                <Link 
                  href="/california-privacy-rights" 
                  className="hover:text-[#ffbb71] transition-colors underline"
                >
                  CALIFORNIA PRIVACY RIGHTS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
