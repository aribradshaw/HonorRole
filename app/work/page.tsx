'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WorkPage() {
  const projects = [
    {
      title: "Griffin in Summer",
      status: "Released",
      description: "Watch on Apple TV and stream on Hulu",
      links: [
        { label: "Watch on Apple TV", href: "https://tv.apple.com" },
        { label: "Stream on Hulu", href: "https://www.hulu.com" },
        { label: "Instagram", href: "https://www.instagram.com/honorrole/" }
      ],
      image: "/421ba27c47b8b31a9860ee506e460070512aeff1-2880x1620.jpg"
    },
    {
      title: "Idiotka",
      status: "Releases in theaters February 2026",
      description: "Coming soon to theaters",
      links: [
        { label: "Instagram", href: "https://www.instagram.com/honorrole/" }
      ],
      image: "/ad80c19ac168a8c87633606f7e2966fcb94d8606-4320x2238.jpg"
    },
    {
      title: "DED",
      status: "In Post-Production",
      description: "Currently in post-production",
      links: [],
      image: "/c5edfa76e92c27af339b899f3169797c8878efcd-1124x1620.jpg"
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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Work</h1>
          <p className="text-xl md:text-2xl text-white/80">Our Films & Projects</p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="relative w-full py-32 px-4 md:px-8">
        <div className="w-full max-w-6xl mx-auto space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-custom-lg"
                />
              </div>
              <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-[#181619] mb-4">
                  {project.title}
                </h2>
                <p className="text-xl text-[#ca9215] mb-4 font-semibold">
                  {project.status}
                </p>
                <p className="text-lg text-[#181619] mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#181619] text-white hover:bg-[#ca9215] transition-colors rounded-custom"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
