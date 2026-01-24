'use client';

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";

export default function MerchPage() {
  return (
    <CloudHeroLayout
      hero={
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-display">SHOP</h1>
          <p className="text-xl md:text-2xl text-white/85 mb-8">Coming soon</p>
          <a
            href="https://www.instagram.com/honorrole/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-white/80 text-white hover:bg-white/10 transition-colors text-base md:text-lg font-semibold tracking-wide"
          >
            <FaInstagram className="text-lg md:text-xl" aria-hidden="true" />
            Follow Honor Role for updates
          </a>
        </motion.div>
      }
    >
      <Footer />
    </CloudHeroLayout>
  );
}
