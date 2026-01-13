'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";
import { films } from "@/data/films";

export default function WorkPage() {
  const projects = films;

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
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-custom-lg"
                  />

                  {project.imdbLink && (
                    <Link
                      href={project.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on IMDb`}
                      className="absolute top-4 right-4 rounded-md bg-white/90 backdrop-blur-sm p-2 shadow-lg hover:bg-white transition-colors"
                    >
                      <Image
                        src="/logofiles/IMDB_Logo_2016.svg"
                        alt="IMDb"
                        width={64}
                        height={32}
                        className="h-6 w-auto"
                        priority={false}
                      />
                    </Link>
                  )}
                </div>
              </div>
              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-[#181619] mb-4">
                  {project.title}
                </h2>
                <p className="text-xl text-[#ca9215] mb-4 font-semibold">{project.status}</p>
                <p className="text-lg text-[#181619] mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-4">
                  {project.links
                    .filter((link) => link.type !== "imdb")
                    .map((link) => (
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
