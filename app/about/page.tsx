'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const paragraphs = [
    "Founded in 2024 by actresses Camila Mendes and Rachel Matthews, Honor Role is a media company dedicated to championing character-driven stories. Rooted in the co-founders’ shared passion for acting – forged during their early days at NYU’s Tisch School of the Arts – Honor Role was born out of a desire to balance art and commerce, creating high-quality productions that \"honor the role\" and uplift actors.",
    "Honor Role’s inaugural film, GRIFFIN IN SUMMER, starred breakout talent Everett Blunck alongside Melanie Lynskey, Owen Teague, and Katherine Newton. The film won Best Narrative Feature and Best Screenplay at the 2024 Tribeca Film Festival and is now streaming on Hulu. The company’s sophomore feature, IDIOTKA, premiered to critical acclaim at the 2025 SXSW Festival and was acquired by Utopia for theatrical release in 2026. Written and directed by first-time filmmaker Nastasya Popov, IDIOTKA boasts a buzzy ensemble including Camila Mendes, Anna Baryshnikov, Julia Fox, Benito Skinner, Saweetie, and Owen Thiele.",
    "Prior to launching Honor Role, Mendes and Matthews honed their producing sensibilities as executive producers on Amazon’s hit romantic comedy, UPGRADED, which they also starred in opposite Academy Award winner Marisa Tomei.",
    "Now a dynamic new force in the entertainment industry, Honor Role is collaborating with innovative storytellers to produce film and television projects with distinctive perspectives. Balancing commercial appeal with emotional depth, Honor Role continues to take creative risks and reach for a global audience through bold, original content."
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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-display">ABOUT</h1>
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[3/4] rounded-custom-lg overflow-hidden order-1 md:order-2"
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
            <div className="space-y-8 order-2 md:order-1">
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
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
              {teamMembers.slice(0, 2).map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-[260px] rounded-custom-lg overflow-hidden bg-white/5 border border-white/10"
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
                  <div className="p-4">
                    <h3 className="text-base md:text-lg text-white font-semibold">{member.name}</h3>
                    <p className="text-white/70 text-xs md:text-sm mt-1">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.slice(2).map((member) => (
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
                <div className="p-4">
                  <h3 className="text-base md:text-lg text-white font-semibold">{member.name}</h3>
                  <p className="text-white/70 text-xs md:text-sm mt-1">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
