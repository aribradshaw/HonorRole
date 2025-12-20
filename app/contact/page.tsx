'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {

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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Contact</h1>
          <p className="text-xl md:text-2xl text-white/80">Get in touch</p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full py-32 px-4 md:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#181619] mb-6">Email</h2>
              <a
                href="mailto:hi@honorrole.com"
                className="text-2xl md:text-3xl text-[#ca9215] hover:text-[#ffbb71] transition-colors underline"
              >
                hi@honorrole.com
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#181619] mb-6">Follow</h2>
              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/honorrole/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-2xl md:text-3xl text-[#ca9215] hover:text-[#ffbb71] transition-colors underline"
                >
                  Instagram: @honorrole
                </a>
                <a
                  href="https://www.imdb.com/company/co1234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-2xl md:text-3xl text-[#ca9215] hover:text-[#ffbb71] transition-colors underline"
                >
                  IMDb: Honor Role
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
