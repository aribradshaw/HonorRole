'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MerchPage() {

  return (
    <main className="min-h-screen bg-[#d1d3c7]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-[#181619]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Merch</h1>
          <p className="text-xl md:text-2xl text-white/80">Partnering with Cinegogue</p>
        </motion.div>
      </section>

      {/* Merch Info Section */}
      <section className="relative w-full py-32 px-4 md:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#181619] mb-8">
              Coming Soon
            </h2>
            <p className="text-xl md:text-2xl text-[#181619] mb-6 leading-relaxed">
              We're partnering with Cinegogue for a limited drop.
            </p>
            <p className="text-lg text-[#181619] mb-8">
              Will start with a limited drop - likely 75-100 units per item, 2-4 items
            </p>
            <div className="mt-12">
              <Link
                href="https://www.instagram.com/honorrole/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#181619] text-white hover:bg-[#ca9215] transition-colors rounded-custom text-lg"
              >
                Follow @honorrole for updates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
