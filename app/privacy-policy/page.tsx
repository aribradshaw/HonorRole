'use client';

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {

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
            <h1 className="text-5xl md:text-6xl font-bold text-[#181619] mb-8">PRIVACY POLICY</h1>
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
      <Footer />
    </main>
  );
}
