'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PressPage() {

  const articles = [
    {
      title: "Camila Mendes & Rachel Matthews Launch Production Company Honor Role",
      publication: "DEADLINE",
      date: "2024",
      href: "https://deadline.com"
    },
    {
      title: "How Camila Mendes and Rachel Matthews Turned an NYU Meet-Cute Into a Production Company",
      publication: "INTERVIEW MAG",
      date: "2024",
      href: "https://www.interviewmagazine.com"
    }
  ];

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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Press</h1>
          <p className="text-xl md:text-2xl text-white/80">News & Features</p>
        </motion.div>
      </section>

      {/* Articles Section */}
      <section className="relative w-full py-32 px-4 md:px-8">
        <div className="w-full max-w-4xl mx-auto space-y-16">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="border-b border-[#181619]/20 pb-12 last:border-b-0"
            >
              <Link
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[#ca9215] uppercase tracking-wide">
                    {article.publication}
                  </span>
                  <span className="text-sm text-[#181619]/60 ml-4">
                    {article.date}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#181619] mb-4 group-hover:text-[#ca9215] transition-colors">
                  {article.title}
                </h2>
                <span className="text-lg text-[#181619] underline group-hover:text-[#ca9215] transition-colors">
                  Read Article →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
