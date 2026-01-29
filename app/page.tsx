'use client';

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { films } from "@/data/films";
import { FaApple, FaPlay } from "react-icons/fa";

const griffinSlides = [
  { src: "/films/griffininsummer.jpg", alt: "Griffin in Summer still 1" },
  { src: "/films/griffininsummer2.jpg", alt: "Griffin in Summer still 2" },
  { src: "/films/griffininsummer3.jpg", alt: "Griffin in Summer still 3" },
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
            animate={isActive ? { opacity: 1, scale: [1, 1.08], x: [0, 12], y: [0, -8] } : { opacity: 0, scale: 1, x: 0, y: 0 }}
            transition={isActive ? { duration: 6, ease: "linear", opacity: { duration: 0.6, ease: "easeInOut" } } : { duration: 0.6, ease: "easeInOut" }}
          >
            <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority={index === 0} />
          </motion.div>
        );
      })}
    </>
  );
}

export default function Home() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inactivity detection for hamburger pulse animation
  useEffect(() => {
    const resetTimer = () => {
      setShowPulse(false);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        setShowPulse(true);
      }, 3000); // Show pulse after 3 seconds of inactivity
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Start the timer
    resetTimer();

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add newsletter signup API call here
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const aboutBlurb =
    "Founded in 2024 by actresses Camila Mendes and Rachel Matthews, Honor Role is a media company dedicated to championing character-driven stories. Rooted in the co-founders’ shared passion for acting – forged during their early days at NYU’s Tisch School of the Arts – Honor Role was born out of a desire to balance art and commerce, creating high-quality productions that \"honor the role\" and uplift actors.";

  const featuredProjects = films.filter((project) =>
    ["Griffin in Summer", "Idiotka"].includes(project.title)
  );

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative bg-transparent">
      <div className="relative z-10">
        {/* Header */}
        <Header 
          showHamburger={true}
          scrolledPastHero={scrolledPastHero}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          showPulse={showPulse}
          forceLightTheme={true}
        />

        {/* Main content - centered vertically with equal spacing */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="-mt-10 mb-2 md:mt-0 md:mb-8"
          >
            <Image
              src="/logofiles/HR_Wordmark_Gold_Glow_v3.avif"
              alt="Honor Role"
              width={900}
              height={300}
              className="w-full max-w-[90vw] sm:max-w-[75vw] md:max-w-[900px] h-auto -mb-2 sm:-mb-16 md:-mb-24 scale-[1.5] sm:scale-100 origin-center"
              priority
            />
          </motion.div>

          {/* Company description text - centered between logo and form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12 md:mb-16 text-center"
          >
            <p className="text-white/90 text-[11px] sm:text-xs md:text-base tracking-wider uppercase font-semibold leading-snug sm:leading-relaxed">
              A PRODUCTION COMPANY CO-FOUNDED
              <br />
              BY CAMILA MENDES AND RACHEL MATTHEWS
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-custom text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white/90 backdrop-blur-md border border-white/60 text-[#181619] hover:bg-white transition-colors rounded-custom font-light tracking-wide whitespace-nowrap"
                >
                  {submitted ? "Subscribed!" : "Subscribe"}
                </button>
              </div>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/90 text-sm"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </motion.div>
          </div>
        </section>

        <section className="relative w-full py-20 md:py-24 px-4 md:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white font-display">
                ABOUT
              </h2>
              <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed">
                {aboutBlurb}
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex text-sm uppercase tracking-wider text-[#ffbb71]"
              >
                View full about →
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="relative w-full py-16 md:py-20 px-4 md:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white font-display">
                PROJECTS
              </h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-custom-lg border border-white/15 bg-black/20 p-6 md:p-8"
                >
                  {/* Poster on top */}
                  <div className="relative w-full aspect-[2/3] rounded-custom-lg overflow-hidden">
                    {project.poster ?? project.image ? (
                      <Image
                        src={(project.poster ?? project.image) as string}
                        alt={`${project.title} poster`}
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
                  </div>

                  <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-white font-display uppercase tracking-wide">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-wider text-[#ffbb71]">
                    {project.status}
                  </p>
                  {project.description && (
                    <p className="mt-3 text-white/75 text-base md:text-lg">
                      {project.description}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-3">
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
                          className="px-5 py-2 bg-[#181619] text-white hover:bg-[#ca9215] transition-colors rounded-custom text-sm font-semibold"
                        >
                          <span className="inline-flex items-center gap-2 leading-none">
                            {link.type === "apple-tv" && (
                              <>
                                <FaApple className="text-base" aria-hidden="true" />
                                <span className="text-sm font-semibold tracking-wide">TV</span>
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
                            {link.type !== "apple-tv" && link.type !== "hulu" && (
                              <span>{link.label}</span>
                            )}
                          </span>
                        </Link>
                      ))}
                  </div>

                    {/* Photos/slideshow below text — trailer + IMDb on this block */}
                    <div className="relative w-full aspect-[4/3] rounded-custom-lg overflow-hidden mt-6">
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
                </motion.div>
              ))}
            </div>
            <Link
              href="/work"
              className="mt-8 inline-flex text-sm uppercase tracking-wider text-[#ffbb71]"
            >
              View all projects →
            </Link>
          </div>
        </section>

        <section className="relative w-full py-20 md:py-24 px-4 md:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white font-display">
                CONTACT US
              </h2>
              <p className="mt-4 text-white/80 text-base md:text-lg">
                Questions, inquiries, or collaboration opportunities? We’d love to hear from you.
              </p>
              <form className="mt-10 w-full max-w-xl mx-auto space-y-6 text-left">
                <div>
                  <label className="block text-white text-lg mb-2" htmlFor="contact-name-home">
                    Name
                  </label>
                  <input
                    id="contact-name-home"
                    name="name"
                    type="text"
                    className="w-full rounded-2xl bg-white/90 text-[#181619] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </div>
                <div>
                  <label className="block text-white text-lg mb-2" htmlFor="contact-email-home">
                    Email <span className="text-white/70">*</span>
                  </label>
                  <input
                    id="contact-email-home"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-2xl bg-white/90 text-[#181619] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </div>
                <div>
                  <label className="block text-white text-lg mb-2" htmlFor="contact-message-home">
                    Message
                  </label>
                  <textarea
                    id="contact-message-home"
                    name="message"
                    rows={5}
                    className="w-full rounded-2xl bg-white/90 text-[#181619] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/60 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/90 px-8 py-3 text-[#181619] text-base md:text-lg font-light tracking-wide hover:bg-white transition-colors"
                >
                  Send
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        <section className="relative w-full pb-12 px-4 md:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-xs text-white/70">
              <Link 
                href="/privacy-policy" 
                className="hover:text-white transition-colors hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-white/40">/</span>
              <Link 
                href="/terms-and-conditions" 
                className="hover:text-white transition-colors hover:underline"
              >
                Terms
              </Link>
              <span className="text-white/40">/</span>
              <Link 
                href="/california-privacy-rights" 
                className="hover:text-white transition-colors hover:underline"
              >
                CPR
              </Link>
              <span className="text-white/40">/</span>
              <Link 
                href="/sitemap.xml" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors hover:underline"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
