'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const paragraphs = [
    "Founded in 2024 by actresses Camila Mendes and Rachel Matthews, Honor Role stands as a dynamic new force in the entertainment industry. The production company specializes in developing feature films and television projects with a deliberate focus on character-driven narratives crafted by innovative filmmakers with distinctive perspectives.",
    "Honor Role’s inaugural film, “GRIFFIN IN SUMMER,” marked the company’s entry into the production landscape. Building on this foundation, their sophomore project “IDIOTKA” premiered at SXSW in March 2025, where it garnered critical acclaim. Variety praised the film as a “sharp satire,” while Deadline recognized it as a “winning directorial debut.” The production also earned accolades for its impressive ensemble cast featuring Anna Baryshnikov, Julia Fox, Benito Skinner, Saweetie, Owen Thiele, and Camila Mendes herself.",
    "Prior to establishing Honor Role, Mendes and Matthews demonstrated their production acumen as executive producers on “UPGRADED,” a romantic comedy in which they starred alongside Academy Award winner Marisa Tomei. The film debuted on Amazon to considerable success, maintaining its position as the platform’s number one film globally for several consecutive weeks. Mendes further expanded her producer credentials by serving as an executive producer on Amazon’s critically acclaimed “MÚSICA,” where she starred opposite director Rudy Mancuso.",
    "Honor Role continues to pursue its mission of bringing compelling, character-driven stories to audiences worldwide through thoughtful collaboration with visionary filmmakers."
  ];

  const teamMembers = [
    {
      name: "Camila Mendes",
      role: "CEO + Co-founder",
      image: "/photos/camila-mendes.jpeg",
    },
    {
      name: "Rachel Matthews",
      role: "CEO + Co-founder",
      image: "/photos/Rachel Matthews 2.jpg",
    },
    {
      name: "Meredith Ditlow",
      role: "Senior Vice President",
      image: "/photos/meredith-ditlow.jpeg",
    },
    {
      name: "Natalie Gerber",
      role: "Creative Executive",
      image: "/photos/Natalie Gerber 2.jpeg",
    },
    {
      name: "Ashlyn Bradshaw",
      role: "Chief of Staff",
      image: "/photos/Ashlyn Bradshaw.jpeg",
    },
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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-display">About</h1>
          <p className="text-xl md:text-2xl text-white/85">Honor Role</p>
        </motion.div>
      }
    >
      <section className="relative w-full py-20 md:py-24 px-4 md:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">About Honor Role</h2>
          </motion.div>
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[3/4] rounded-custom-lg overflow-hidden"
            >
              <Image
                src="/photos/@cibellelevi Cibelle Levi__HonorRoleCamiRachel__FINAL.jpg"
                alt="Camila Mendes and Rachel Matthews"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative w-full pb-24 px-4 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Meet the Team</h2>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-custom-lg overflow-hidden bg-white/5 border border-white/10"
              >
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl text-white font-semibold">{member.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
