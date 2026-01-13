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
  const placeholderVideoSrc = "/honorrolehero.mp4";

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
                  <div className="relative w-full aspect-[4/3] rounded-custom-lg overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover"
                      >
                        <source src={placeholderVideoSrc} type="video/mp4" />
                      </video>
                    )}

                    {project.trailerYouTubeUrl && (
                      <Link
                        href={project.trailerYouTubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${project.title} trailer`}
                        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/0 px-4 py-2 text-sm font-semibold tracking-wide text-white hover:bg-black/20 transition-colors"
                      >
                        <FaPlay className="text-sm" aria-hidden="true" />
                        <span>Watch trailer</span>
                      </Link>
                    )}
                  </div>

                  {project.imdbLink && (
                    <Link
                      href={project.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on IMDb`}
                      className="absolute top-4 right-4 hover:opacity-90 transition-opacity"
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
                <div className="flex items-start gap-4 mb-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#181619]">
                    {project.title}
                  </h2>

                  {project.instagram && (
                    <Link
                      href={project.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on Instagram`}
                      className="mt-2 text-[#181619]/70 hover:text-[#ca9215] transition-colors"
                    >
                      <FaInstagram className="text-3xl md:text-4xl" aria-hidden="true" />
                    </Link>
                  )}
                </div>
                <p className="text-xl text-[#ca9215] mb-4 font-semibold">{project.status}</p>
                <p className="text-lg text-[#181619] mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-4">
                  {project.links
                    .filter((link) => link.type !== "imdb" && link.type !== "instagram")
                    .map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        link.type === "apple-tv"
                          ? "Watch on Apple TV"
                          : link.type === "hulu"
                            ? "Stream on Hulu"
                            : link.label
                      }
                      className="px-6 py-3 bg-[#181619] text-white hover:bg-[#ca9215] transition-colors rounded-custom"
                    >
                      <span className="inline-flex items-center gap-2">
                        {link.type === "apple-tv" && (
                          <>
                            <FaApple aria-hidden="true" />
                            <span>TV</span>
                          </>
                        )}
                        {link.type === "hulu" && (
                          <Image
                            src="/logofiles/Hulu_logo_(2018).svg"
                            alt="Hulu"
                            width={48}
                            height={18}
                            className="h-4 w-auto rounded-none"
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
          ))}
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
