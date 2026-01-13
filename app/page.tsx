'use client';

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolledPastHero(window.scrollY > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      console.log('Video element found, setting up event listeners');
      console.log('Video source:', video.currentSrc || video.src);
      console.log('Video readyState:', video.readyState);
      
      const handleLoadStart = () => {
        console.log('Video load started');
      };
      
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded');
        console.log('Video duration:', video.duration);
        console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);
      };
      
      const handleLoadedData = () => {
        console.log('Video data loaded');
      };
      
      const handleCanPlay = () => {
        console.log('Video can play');
        video.play().catch(err => {
          console.error('Play failed:', err);
        });
      };
      
      const handleCanPlayThrough = () => {
        console.log('Video can play through');
      };
      
      const handleError = (e: Event) => {
        console.error('Video error event:', e);
        if (video.error) {
          console.error('Video error code:', video.error.code);
          console.error('Video error message:', video.error.message);
          switch (video.error.code) {
            case 1:
              console.error('MEDIA_ERR_ABORTED - The video download was aborted');
              break;
            case 2:
              console.error('MEDIA_ERR_NETWORK - A network error occurred');
              break;
            case 3:
              console.error('MEDIA_ERR_DECODE - The video decoding failed');
              break;
            case 4:
              console.error('MEDIA_ERR_SRC_NOT_SUPPORTED - The video source is not supported');
              break;
            default:
              console.error('Unknown error');
          }
        }
      };
      
      const handleWaiting = () => {
        console.log('Video waiting for data');
      };
      
      const handlePlaying = () => {
        console.log('Video is playing');
      };
      
      const handlePause = () => {
        console.log('Video paused');
      };
      
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('canplaythrough', handleCanPlayThrough);
      video.addEventListener('error', handleError);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('playing', handlePlaying);
      video.addEventListener('pause', handlePause);
      
      // Force load
      console.log('Calling video.load()');
      video.load();
      
      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('error', handleError);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('pause', handlePause);
      };
    } else {
      console.error('Video ref is null!');
    }
  }, []);

  return (
    <main className="min-h-screen text-[#181619] overflow-x-hidden relative bg-transparent">
      {/* Fixed hero video background (pinned) */}
      <div className="fixed inset-0 z-0 bg-[#181619]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%', backgroundColor: '#181619' }}
          onError={(e) => {
            const video = e.currentTarget;
            console.error('=== VIDEO ERROR ===');
            console.error('Video src:', video.currentSrc);
            console.error('Video networkState:', video.networkState, '(3 = NETWORK_NO_SOURCE)');
            console.error('Video readyState:', video.readyState);
            
            if (video.error) {
              console.error('Error Code:', video.error.code);
              console.error('Error Message:', video.error.message);
            } else {
              console.error('No error object - networkState 3 means file not found');
              console.error('File should be at: public/honorrolehero.mp4');
              console.error('Try accessing: http://localhost:3000/honorrolehero.mp4');
            }
            console.error('==================');
          }}
          onLoadStart={() => console.log('onLoadStart fired')}
          onLoadedData={() => console.log('onLoadedData fired')}
        >
          <source src="/honorrolehero.mp4" type="video/mp4" />
          <p>Your browser does not support the video tag. Video source: /honorrolehero.mp4</p>
        </video>
        {/* Subtle dark overlay for legibility */}
        <div className="absolute inset-0 bg-[#181619]/20" />
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-96 h-96 bg-[#a6bef6] opacity-20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 10,
            y: mousePosition.y / 10,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#ffbb71] opacity-20 rounded-full blur-3xl right-0 bottom-0"
          animate={{
            x: -mousePosition.x / 15,
            y: -mousePosition.y / 15,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <Header 
          showHamburger={true}
          scrolledPastHero={scrolledPastHero}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        {/* Hero spacer (keeps the fixed video as the hero) */}
        <section className="w-full h-screen" aria-label="Hero" />

        <div className="bg-[#d1d3c7]">
          {/* About Section */}
          <section id="about" className="relative w-full py-32 px-4 md:px-8">
            <div className="w-full max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-12 bg-[#fce2ef]/50 backdrop-blur-sm rounded-custom-xl p-12 md:p-16 shadow-lg"
              >
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181619]">
                    Honor Role
                  </h2>
                  <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                    Honor Role is a production company founded by Camila Mendes and Rachel Matthews,
                    focused on character-driven film and television — work that treats performance as
                    the engine of story and builds worlds actors can fully inhabit.
                  </p>
                  <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                    We partner with sharp filmmakers with distinct points of view, aiming to strike a
                    balance between art and commerce.
                  </p>
                  <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                    Our first film,{" "}
                    <motion.a
                      href="https://tribecafilm.com/films/griffin-in-summer-2024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#729bd9] transition-colors font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      Griffin in Summer
                    </motion.a>
                    , premiered at the{" "}
                    <motion.a
                      href="https://tribecafilm.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#729bd9] transition-colors font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      Tribeca Film Festival
                    </motion.a>{" "}
                    and won Best Narrative.
                  </p>
                  <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                    We produce with an actor-first mindset — prioritizing rehearsal, collaboration, and
                    a process that serves the story from development through post.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Upcoming Works Section */}
          <section id="work" className="relative w-full py-32 px-4 md:px-8">
            <div className="w-full max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181619]">
                    Upcoming Works
                  </h2>
                  <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                    New projects are in active development. We’ll share titles and talent as soon as we can.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="rounded-custom-xl bg-[#a6bef6]/30 backdrop-blur-sm p-8 shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-semibold tracking-wider text-[#181619]/70 uppercase">
                        Feature Film
                      </div>
                      <span className="text-xs font-semibold tracking-wider uppercase rounded-full bg-white/50 px-3 py-1 text-[#181619]">
                        Aiming to Shoot 2026
                      </span>
                    </div>
                    <div className="mt-4 text-2xl font-semibold text-[#181619]">Title TBA</div>
                    <div className="mt-3 text-lg leading-relaxed text-[#181619]">
                      One of two Latin-forward projects currently in development. Details to be announced.
                    </div>
                  </div>

                  <div className="rounded-custom-xl bg-[#ffbb71]/30 backdrop-blur-sm p-8 shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-semibold tracking-wider text-[#181619]/70 uppercase">
                        Feature Film
                      </div>
                      <span className="text-xs font-semibold tracking-wider uppercase rounded-full bg-white/50 px-3 py-1 text-[#181619]">
                        Mexico City (July/Aug)
                      </span>
                    </div>
                    <div className="mt-4 text-2xl font-semibold text-[#181619]">Title TBA</div>
                    <div className="mt-3 text-lg leading-relaxed text-[#181619]">
                      A Latin-forward project aiming to shoot in Mexico City. More info coming soon.
                    </div>
                  </div>

                  <div className="rounded-custom-xl bg-white/50 backdrop-blur-sm p-8 shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-semibold tracking-wider text-[#181619]/70 uppercase">
                        Development Slate
                      </div>
                      <span className="text-xs font-semibold tracking-wider uppercase rounded-full bg-[#181619] px-3 py-1 text-white">
                        Announcing Soon
                      </span>
                    </div>
                    <div className="mt-4 text-2xl font-semibold text-[#181619]">More to come</div>
                    <div className="mt-3 text-lg leading-relaxed text-[#181619]">
                      Additional film and TV projects are in the works — we’ll share details when they’re public.
                    </div>
                  </div>
                </div>

                <div className="rounded-custom-xl bg-[#181619] text-white p-10 md:p-12 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold tracking-wider uppercase text-white/70">
                      Partnerships & inquiries
                    </div>
                    <div className="text-xl md:text-2xl leading-relaxed">
                      For collaborators, press, or production inquiries, reach out anytime.
                    </div>
                  </div>
                  <a
                    href="mailto:hi@honorrole.com"
                    className="inline-flex items-center justify-center rounded-full bg-white/90 text-[#181619] px-6 py-3 text-sm font-semibold tracking-wide hover:bg-white transition-colors"
                  >
                    hi@honorrole.com
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

      {/* Footer */}
      <Footer />
        </div>
      </div>
    </main>
  );
}
