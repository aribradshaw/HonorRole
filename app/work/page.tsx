'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";
import { films } from "@/data/films";
import { FaInstagram } from "react-icons/fa";
import { FaApple, FaPlay } from "react-icons/fa";

const griffinSlides = [
  {
    src: "/films/griffininsummer.jpg",
    alt: "Griffin in Summer still 1",
  },
  {
    src: "/films/griffininsummer2.jpg",
    alt: "Griffin in Summer still 2",
  },
  {
    src: "/films/griffininsummer3.jpg",
    alt: "Griffin in Summer still 3",
  },
];

function GriffinKenBurnsSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % griffinSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {griffinSlides.map((slide, index) => {
        const isActive = index === activeSlide;
        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={false}
            animate={
              isActive
                ? {
                    opacity: 1,
                    scale: [1, 1.08],
                    x: [0, 12],
                    y: [0, -8],
                  }
                : { opacity: 0, scale: 1, x: 0, y: 0 }
            }
            transition={
              isActive
                ? {
                    duration: 6,
                    ease: "linear",
                    opacity: { duration: 0.6, ease: "easeInOut" },
                  }
                : { duration: 0.6, ease: "easeInOut" }
            }
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        );
      })}
    </>
  );
}

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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-display">PROJECTS</h1>
          <p className="text-xl md:text-2xl text-white/85">Our Films &amp; Projects</p>
        </motion.div>
      }
    >
      {/* Projects Section */}
      <section className="relative w-full py-20 md:py-24 px-4 md:px-8">
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
                    {project.title === "Griffin in Summer" ? (
                      <GriffinKenBurnsSlideshow />
                    ) : project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#181619]">
                        <span className="text-[#ca9215] text-xl md:text-2xl font-semibold tracking-wide uppercase">
                          Coming Soon
                        </span>
                      </div>
                    )}

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
                  <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
                    {project.title}
                  </h2>

                  {project.instagram && (
                    <Link
                      href={project.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on Instagram`}
                    className="mt-2 text-white/70 hover:text-[#ca9215] transition-colors"
                    >
                      <FaInstagram className="text-3xl md:text-4xl" aria-hidden="true" />
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
          ))}
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
