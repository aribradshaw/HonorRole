'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";
import { films } from "@/data/films";
import { useCallback, useState } from "react";
import { FaInstagram } from "react-icons/fa";

export default function WorkPage() {
  const projects = films;
  const [playingTrailerForTitle, setPlayingTrailerForTitle] = useState<string | null>(null);
  const placeholderVideoSrc = "/honorrolehero.mp4";

  const getYouTubeEmbedUrl = useCallback((url: string) => {
    try {
      const u = new URL(url);
      // youtube.com/watch?v=...
      const v = u.searchParams.get("v");
      // youtu.be/...
      const idFromPath = u.hostname.includes("youtu.be") ? u.pathname.replace("/", "") : null;
      const id = v ?? idFromPath;
      if (!id) return null;
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    } catch {
      return null;
    }
  }, []);

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
                  <div
                    className={`relative w-full aspect-[4/3] rounded-custom-lg overflow-hidden ${
                      project.trailerYouTubeUrl ? "cursor-pointer" : ""
                    }`}
                    role={project.trailerYouTubeUrl ? "button" : undefined}
                    tabIndex={project.trailerYouTubeUrl ? 0 : undefined}
                    aria-label={
                      project.trailerYouTubeUrl
                        ? `Play trailer for ${project.title}`
                        : undefined
                    }
                    onClick={() => {
                      if (!project.trailerYouTubeUrl) return;
                      setPlayingTrailerForTitle(project.title);
                    }}
                    onKeyDown={(e) => {
                      if (!project.trailerYouTubeUrl) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setPlayingTrailerForTitle(project.title);
                      }
                    }}
                  >
                    {playingTrailerForTitle === project.title && project.trailerYouTubeUrl ? (
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={getYouTubeEmbedUrl(project.trailerYouTubeUrl) ?? undefined}
                        title={`${project.title} Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <>
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
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                            <div className="rounded-full bg-white/90 backdrop-blur-sm px-5 py-3 shadow-lg text-[#181619] font-semibold">
                              Play Trailer
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {project.imdbLink && playingTrailerForTitle !== project.title && (
                    <Link
                      href={project.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on IMDb`}
                      className="absolute top-4 right-4 hover:opacity-90 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
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
