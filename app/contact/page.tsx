'use client';

import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";

export default function ContactPage() {

  return (
    <CloudHeroLayout
      hero={
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-[0.3em] font-display">
            CONTACT US
          </h1>
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-10 w-full max-w-xl mx-auto space-y-6 text-left"
          >
            <div>
              <label className="block text-white text-lg mb-2" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="w-full rounded-2xl bg-white/90 text-[#181619] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>
            <div>
              <label className="block text-white text-lg mb-2" htmlFor="contact-email">
                Email <span className="text-white/70">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl bg-white/90 text-[#181619] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>
            <div>
              <label className="block text-white text-lg mb-2" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className="w-full rounded-2xl bg-white/90 text-[#181619] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/60 resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-white/90 px-8 py-3 text-[#181619] text-base md:text-lg font-light tracking-wide hover:bg-white transition-colors"
            >
              Send
            </button>
          </motion.form>
        </motion.div>
      }
    >
      <Footer />
    </CloudHeroLayout>
  );
}
