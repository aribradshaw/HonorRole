'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";
import { FiMail } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Contact</h1>
          <p className="text-xl md:text-2xl text-white/85">Get in touch</p>
        </motion.div>
      }
    >
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
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#181619] mb-6">Email</h2>
              <a
                href="mailto:hi@honorrole.com"
                className="inline-flex items-center gap-4 text-2xl md:text-3xl text-[#ca9215] hover:text-[#181619] transition-colors hover:underline"
                aria-label="Email Honor Role"
              >
                <FiMail className="text-3xl md:text-4xl flex-shrink-0" aria-hidden="true" />
                <span>hi@honorrole.com</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#181619] mb-6">Follow</h2>
              <div className="space-y-6">
                <a
                  href="https://www.instagram.com/honorrole/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-2xl md:text-3xl text-[#ca9215] hover:text-[#181619] transition-colors hover:underline"
                  aria-label="Honor Role on Instagram"
                >
                  <FaInstagram className="text-3xl md:text-4xl flex-shrink-0" aria-hidden="true" />
                  <span>@honorrole</span>
                </a>
                <a
                  href="https://www.imdb.com/company/co1234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-2xl md:text-3xl text-[#ca9215] hover:text-[#181619] transition-colors hover:underline"
                  aria-label="Honor Role on IMDb"
                >
                  <Image
                    src="/logofiles/IMDB_Logo_2016.svg"
                    alt="IMDb"
                    width={64}
                    height={32}
                    className="h-7 md:h-8 w-auto flex-shrink-0"
                    priority={false}
                  />
                  <span>Honor Role</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
