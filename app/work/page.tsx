'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";
import { films } from "@/data/films";
import { FaInstagram } from "react-icons/fa";
import { FaApple, FaPlay } from "react-icons/fa";

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
          <h1 className="text-6xl md:text-8xl font-bold text-white font-display">PROJECTS</h1>
        </motion.div>
      }
    >
      {/* Projects Section */}
      <section className="relative w-full py-20 md:py-24 px-4 md:px-8">
        <div className="w-full max-w-6xl mx-auto space-y-32">
          {projects.map((project, index) => {
            const isIdiotka = project.title === "Idiotka";
            // For Idiotka: text on left (65%), poster on right (35%)
            // For others: alternate layout with poster/text based on index
            const posterOrder = isIdiotka ? "md:order-2" : (index % 2 === 0 ? "md:order-1" : "md:order-2");
            const textOrder = isIdiotka ? "md:order-1" : (index % 2 === 0 ? "md:order-2" : "md:order-1");
            const gridTemplateCols = isIdiotka ? "65% 35%" : "1fr 2fr";
            
            return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="grid gap-12 items-center md:grid-cols-[1fr_2fr]"
              style={isIdiotka ? { gridTemplateColumns: gridTemplateCols } : undefined}
            >
              <div className={posterOrder}>
                <div className="relative flex flex-col items-center">
                  <div className="relative w-full rounded-custom-lg overflow-hidden">
                    {project.poster ?? project.image ? (
                      <div className="relative w-full">
                        <Image
                          src={(project.poster ?? project.image) as string}
                          alt={project.title}
                          width={800}
                          height={1200}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-auto object-contain rounded-custom-lg"
                        />
                        {project.trailerYouTubeUrl && (
                          <Link
                            href={project.trailerYouTubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Watch ${project.title} trailer`}
                            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/0 px-4 py-2 text-sm font-semibold tracking-wide text-white hover:bg-black/20 transition-colors"
                          >
                            <FaPlay className="text-sm rounded-none" style={{ borderRadius: 0 }} aria-hidden="true" />
                            <span>Watch trailer</span>
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center bg-[#181619] min-h-[500px] rounded-custom-lg">
                        <span className="text-[#ca9215] text-xl md:text-2xl font-semibold tracking-wide uppercase">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={textOrder}>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
                    {project.title}
                  </h2>
                  {project.instagram && (
                    <Link
                      href={project.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on Instagram`}
                      className="text-white/70 hover:text-[#ca9215] transition-colors"
                    >
                      <FaInstagram className="text-3xl md:text-4xl" aria-hidden="true" />
                    </Link>
                  )}
                  {project.imdbLink && (
                    <Link
                      href={project.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on IMDb`}
                      className="text-white/70 hover:opacity-90 transition-opacity"
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
                <p className="text-xl text-gold-2 mb-4 font-semibold">{project.status}</p>
                {project.description && (
                  <p className="text-lg text-white/90 mb-6">{project.description}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  {project.links
                    .filter((link) => link.type !== "imdb" && link.type !== "instagram")
                    .map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.href === "#" ? undefined : "_blank"}
                      rel={link.href === "#" ? undefined : "noopener noreferrer"}
                      aria-disabled={link.href === "#" ? true : undefined}
                      onClick={
                        link.href === "#"
                          ? (event) => event.preventDefault()
                          : undefined
                      }
                      aria-label={
                        link.type === "apple-tv"
                          ? "Watch on Apple TV"
                          : link.type === "hulu"
                            ? "Stream on Hulu"
                            : link.label
                      }
                      className="px-6 py-3 bg-[#181619] text-white hover:bg-[#ca9215] transition-colors rounded-custom"
                    >
                      <span className="inline-flex items-center gap-2 leading-none">
                        {link.type === "apple-tv" && (
                          <>
                            <FaApple className="text-lg" aria-hidden="true" />
                            <span className="text-base font-semibold tracking-wide">TV</span>
                          </>
                        )}
                        {link.type === "hulu" && (
                          <img
                            src="/logofiles/Hulu_logo_(2018).svg"
                            alt="Hulu"
                            className="h-4 w-auto"
                            style={{ filter: "brightness(0) invert(1)", borderRadius: 0 }}
                          />
                        )}
                        {link.type !== "apple-tv" && link.type !== "hulu" && <span>{link.label}</span>}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
