'use client';

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CaliforniaPrivacyRightsPage() {

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
            <h1 className="text-5xl md:text-6xl font-bold text-[#181619] mb-8">CALIFORNIA PRIVACY RIGHTS</h1>
            <div className="text-sm text-[#181619]/60 mb-12 font-mono">
              Last Updated: December 20, 2025
            </div>
            
            <div className="prose prose-lg max-w-none text-[#181619] space-y-6">
              <p>
                If you are a California resident, you have certain rights under the California Consumer 
                Privacy Act (CCPA) regarding your personal information.
              </p>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">Your Rights</h2>
              <p>
                As a California resident, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Know what personal information we collect about you</li>
                <li>Know whether your personal information is sold or disclosed and to whom</li>
                <li>Say no to the sale of your personal information</li>
                <li>Access your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Receive equal service and price, even if you exercise your privacy rights</li>
              </ul>
              
              <h2 className="text-3xl font-bold text-[#181619] mt-8 mb-4">How to Exercise Your Rights</h2>
              <p>
                To exercise any of these rights, please contact us at{' '}
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
