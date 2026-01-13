'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
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
    <footer id="contact" ref={footerRef} className="relative w-full py-32 px-4 md:px-8 bg-black text-[#fce2ef]">
      <div className="w-full max-w-6xl mx-auto">
        {/* Logo */}
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
        
        {/* Contact & Follow */}
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
              className="inline-flex items-center gap-4 text-2xl hover:text-[#ffbb71] transition-colors hover:underline"
              aria-label="Email Honor Role"
            >
              <FiMail className="text-3xl flex-shrink-0" aria-hidden="true" />
              <span>hi@honorrole.com</span>
            </a>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="font-semibold mb-4 text-2xl">Follow</h3>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://www.instagram.com/honorrole/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-2xl hover:text-[#ffbb71] transition-colors hover:underline"
                aria-label="Honor Role on Instagram"
              >
                <FaInstagram className="text-3xl flex-shrink-0" aria-hidden="true" />
                <span>@honorrole</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Movie Poster Style Credits */}
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
                className="hover:text-[#ffbb71] transition-colors hover:underline"
              >
                PRIVACY POLICY
              </Link>
              <span className="text-[#fce2ef]/40">|</span>
              <Link 
                href="/terms-and-conditions" 
                className="hover:text-[#ffbb71] transition-colors hover:underline"
              >
                TERMS & CONDITIONS
              </Link>
              <span className="text-[#fce2ef]/40">|</span>
              <Link 
                href="/california-privacy-rights" 
                className="hover:text-[#ffbb71] transition-colors hover:underline"
              >
                CALIFORNIA PRIVACY RIGHTS
              </Link>
              <span className="text-[#fce2ef]/40">|</span>
              <Link 
                href="/sitemap.xml" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffbb71] transition-colors hover:underline"
              >
                SITEMAP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
