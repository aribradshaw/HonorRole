'use client';

import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const paragraphs = [
    "Founded in 2024 by actresses Camila Mendes and Rachel Matthews, Honor Role stands as a dynamic new force in the entertainment industry. The production company specializes in developing feature films and television projects with a deliberate focus on character-driven narratives crafted by innovative filmmakers with distinctive perspectives.",
    "Honor Role’s inaugural film, “Griffin in Summer,” marked the company’s entry into the production landscape. Building on this foundation, their sophomore project “Idiotka” premiered at SXSW in March 2025, where it garnered critical acclaim. Variety praised the film as a “sharp satire,” while Deadline recognized it as a “winning directorial debut.” The production also earned accolades for its impressive ensemble cast featuring Anna Baryshnikov, Julia Fox, Benito Skinner, Saweetie, Owen Thiele, and Camila Mendes herself.",
    "Prior to establishing Honor Role, Mendes and Matthews demonstrated their production acumen as executive producers on “Upgraded,” a romantic comedy in which they starred alongside Academy Award winner Marisa Tomei. The film debuted on Amazon to considerable success, maintaining its position as the platform’s number one film globally for several consecutive weeks. Mendes further expanded her producer credentials by serving as an executive producer on Amazon’s critically acclaimed “Música,” where she starred opposite director Rudy Mancuso.",
    "Honor Role continues to pursue its mission of bringing compelling, character-driven stories to audiences worldwide through thoughtful collaboration with visionary filmmakers."
  ];

  return (
    <CloudHeroLayout
      hero={
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">About</h1>
          <p className="text-xl md:text-2xl text-white/85">Honor Role</p>
        </motion.div>
      }
    >
      <section className="relative w-full py-28 md:py-32 px-4 md:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">About Honor Role</h2>
          </motion.div>
          <div className="space-y-8">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="text-lg md:text-xl text-white/85 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
