'use client';

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import BoomerangCloudVideo from "@/components/BoomerangCloudVideo";

export default function Home() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inactivity detection for hamburger pulse animation
  useEffect(() => {
    const resetTimer = () => {
      setShowPulse(false);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        setShowPulse(true);
      }, 3000); // Show pulse after 3 seconds of inactivity
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Start the timer
    resetTimer();

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add newsletter signup API call here
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative bg-transparent">
      {/* Fixed cloud video background with boomerang effect */}
      <BoomerangCloudVideo />

      <div className="relative z-10">
        {/* Header */}
        <Header 
          showHamburger={true}
          scrolledPastHero={scrolledPastHero}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          showPulse={showPulse}
        />

        {/* Main content - centered vertically with equal spacing */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="-mt-10 mb-2 md:mt-0 md:mb-8"
          >
            <Image
              src="/logofiles/HR_Wordmark_Gold_Glow_v3.avif"
              alt="Honor Role"
              width={900}
              height={300}
              className="w-full max-w-[90vw] sm:max-w-[75vw] md:max-w-[900px] h-auto -mb-2 sm:-mb-16 md:-mb-24 scale-[1.5] sm:scale-100 origin-center"
              priority
            />
          </motion.div>

          {/* Company description text - centered between logo and form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12 md:mb-16 text-center"
          >
            <p className="text-white/90 text-[11px] sm:text-xs md:text-base tracking-wider uppercase font-semibold leading-snug sm:leading-relaxed">
              A PRODUCTION COMPANY CO-FOUNDED
              <br />
              BY CAMILA MENDES AND RACHEL MATTHEWS
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-custom text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white/90 backdrop-blur-md border border-white/60 text-[#181619] hover:bg-white transition-colors rounded-custom font-light tracking-wide whitespace-nowrap"
                >
                  {submitted ? "Subscribed!" : "Subscribe"}
                </button>
              </div>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/90 text-sm"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </motion.div>
          {/* Footer links - bottom left */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
            <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-xs text-white/70">
              <Link 
                href="/privacy-policy" 
                className="hover:text-white transition-colors hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-white/40">/</span>
              <Link 
                href="/terms-and-conditions" 
                className="hover:text-white transition-colors hover:underline"
              >
                Terms
              </Link>
              <span className="text-white/40">/</span>
              <Link 
                href="/california-privacy-rights" 
                className="hover:text-white transition-colors hover:underline"
              >
                CPR
              </Link>
              <span className="text-white/40">/</span>
              <Link 
                href="/sitemap.xml" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors hover:underline"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </section>

        <section className="relative w-full px-4 pb-24 md:pb-28">
          <div className="w-full max-w-5xl mx-auto grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[3/4] rounded-custom-lg overflow-hidden"
            >
              <Image
                src="/photos/@cibellelevi Cibelle Levi__HonorRoleCamiRachel__FINAL.jpg"
                alt="Camila Mendes and Rachel Matthews"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-semibold font-display">Camila Mendes + Rachel Matthews</h2>
              <p className="mt-4 text-white/80 text-lg md:text-xl leading-relaxed">
                Co-founders of Honor Role, building character-driven stories alongside bold new voices.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
