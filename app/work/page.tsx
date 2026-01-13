'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
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
      image: "/films/griffininsummer.jpg"
    },
    {
      title: "Idiotka",
      status: "Releases in theaters February 2026",
      description: "Coming soon to theaters",
      links: [
        { label: "Instagram", href: "https://www.instagram.com/honorrole/" }
      ],
      image: "/films/idiotka.jpg"
    },
    {
      title: "DED",
      status: "In Post-Production",
      description: "Currently in post-production",
      links: [],
      image: "/15d34f62a49472ddeede119e708fe0dcc3e6e438-1280x816.jpg"
    }
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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Work</h1>
          <p className="text-xl md:text-2xl text-white/85">Our Films &amp; Projects</p>
        </motion.div>
      }
    >
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
              <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-custom-lg"
                />
              </div>
              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-[#181619] mb-4">
                  {project.title}
                </h2>
                <p className="text-xl text-[#ca9215] mb-4 font-semibold">{project.status}</p>
                <p className="text-lg text-[#181619] mb-6">{project.description}</p>
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

      <Footer />
    </CloudHeroLayout>
  );
}
