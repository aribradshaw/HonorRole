'use client';

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsAndConditionsPage() {

  return (
    <main className="min-h-screen bg-[#d1d3c7]">
      {/* Header */}
      <Header />

      {/* Content */}
      <section className="relative w-full py-32 px-4 md:px-8 pt-40">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#181619] mb-8">TERMS & CONDITIONS</h1>
            <div className="text-sm text-[#181619]/60 mb-12 font-mono">
              Last Updated: December 20, 2025
            </div>
            
            <div className="prose prose-lg max-w-none text-[#181619] space-y-6">
              <p>
                Please read these Terms and Conditions ("Terms") carefully before using the Honor Role 
                Productions website operated by Honor Role Productions ("us," "we," or "our").
              </p>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using our website, you agree to be bound by these Terms. If you disagree 
                with any part of these terms, you may not access the website.
              </p>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">Use License</h2>
              <p>
                Permission is granted to temporarily view the materials on our website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                of title, and under this license you may not modify or copy the materials.
              </p>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at{' '}
                <a href="mailto:hi@honorrole.com" className="text-[#ca9215] hover:text-[#ffbb71] underline">
                  hi@honorrole.com
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
