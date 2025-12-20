'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const footerRef = useRef<HTMLElement>(null);

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
      
      // Check if header is over footer
      if (footerRef.current) {
        const footerTop = footerRef.current.offsetTop;
        const headerHeight = 100; // Approximate header height
        const scrollY = window.scrollY;
        setOverFooter(scrollY + headerHeight >= footerTop);
      }
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
    <main className="min-h-screen bg-[#d1d3c7] text-[#181619] overflow-x-hidden">
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

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolledPastHero 
            ? 'bg-transparent backdrop-blur-md border-b border-[#181619]/10' 
            : 'bg-transparent border-b-0'
        }`}
        style={{
          backdropFilter: scrolledPastHero ? 'blur(12px)' : 'none',
        }}
      >
        <nav className="w-full px-8 py-6 flex items-center justify-between relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: scrolledPastHero ? 1 : 0,
              x: scrolledPastHero ? 0 : -20
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={scrolledPastHero ? 'block' : 'pointer-events-none'}
          >
            <Link href="/" className="block">
              <Image
                src="/logofiles/Honor-Role-Logo_Black.png"
                alt="Honor Role"
                width={200}
                height={60}
                className="h-8 w-auto"
                priority
                style={{ 
                  borderRadius: 0,
                  filter: overFooter ? 'brightness(0) invert(1)' : 'none'
                }}
              />
            </Link>
          </motion.div>
          {/* Hamburger menu - shown before scrolling past hero */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: scrolledPastHero ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={scrolledPastHero ? 'pointer-events-none hidden' : 'block relative'}
          >
            <div className="flex items-center gap-8">
              {/* Menu items that spill out to the left */}
              <motion.div
                className="flex items-center gap-8"
                initial={false}
                animate={{
                  width: menuOpen ? 'auto' : 0,
                  opacity: menuOpen ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                  <Link 
                    href="#about" 
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                >
                  <Link 
                    href="#work" 
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Work
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: menuOpen ? 0 : 20,
                    opacity: menuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                  <Link 
                    href="#contact" 
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-[#ffbb71] transition-colors whitespace-nowrap"
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Hamburger/X button */}
              <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[#ffbb71] transition-colors z-10 relative flex-shrink-0"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </motion.svg>
            </button>
            </div>
          </motion.div>

          {/* Navigation links - shown after scrolling past hero */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: scrolledPastHero ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`flex items-center gap-12 text-sm ${scrolledPastHero ? 'flex' : 'hidden pointer-events-none'}`}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link 
                href="#about" 
                className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
              >
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link 
                href="#work" 
                className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
              >
                Work
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link 
                href="#contact" 
                className={`hover:text-[#ca9215] transition-colors ${overFooter ? 'text-white' : 'text-[#181619]'}`}
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section - Video */}
      <section className="relative w-full h-screen overflow-hidden bg-[#181619]">
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
      </section>

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
            <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
              Merging the founder&apos;s academic roots with a focus on character-driven stories that &quot;honor&quot; the role and uplift actors — Honor Role distills both ideas into one holistic, fresh identity.
            </p>
            
            <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
              The identity premiered at the{" "}
              <motion.a
                href="https://tribecafilm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#729bd9] transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Tribeca Film Festival
              </motion.a>{" "}
              in June, where the company won best narrative for their first film,{" "}
              <motion.a
                href="https://tribecafilm.com/films/griffin-in-summer-2024"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#729bd9] transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Griffin in Summer
              </motion.a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Identity Section */}
      <section id="work" className="relative w-full py-32 px-4 md:px-8">
        <div className="w-full max-w-[1920px] mx-auto space-y-32">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center w-full"
          >
            <div className="space-y-6 bg-[#a6bef6]/30 backdrop-blur-sm rounded-custom-xl p-8 md:p-12">
              <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                Drawing inspiration from a scholastic vernacular and the undulating curves of Honor Roll ribbon motifs, the identity celebrates the company&apos;s merging of art and academia.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative aspect-[4/5] w-full rounded-custom-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/image1.jpg"
                alt="Honor Role Brand Identity"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center w-full"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative aspect-[4/5] w-full rounded-custom-xl overflow-hidden shadow-2xl order-2 md:order-1"
            >
              <Image
                src="/image2.jpg"
                alt="Honor Role Wordmark"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="space-y-6 bg-[#ffbb71]/30 backdrop-blur-sm rounded-custom-xl p-8 md:p-12 order-1 md:order-2">
              <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                The wordmark is coupled by a golden bow, symbolic of the ribbon that ties a graduation certificate.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed text-[#181619]">
                We worked closely with{" "}
                <motion.a
                  href="https://nicolobianchino.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#729bd9] transition-colors font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  Nicolo Bianchino
                </motion.a>{" "}
                to perfectly bring wordmark to life in animation, exactly as we&apos;d dreamt it.
              </p>
            </div>
          </motion.div>

          {/* Logo Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center py-16 w-full"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-custom-xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm p-8"
            >
              <Image
                src="/logofiles/Honor-Role-Logo_Black.png"
                alt="Honor Role Logo"
                width={865}
                height={573}
                className="max-w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="relative w-full py-32 px-4 md:px-8 border-t border-[#181619]/10">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 bg-[#729bd9]/20 backdrop-blur-sm rounded-custom-xl p-12 md:p-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, x: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="font-semibold mb-3 text-2xl text-[#181619]">Wordmark Motion</p>
              <p className="text-xl text-[#181619]">
                <a
                  href="https://nicolobianchino.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#ca9215] transition-colors"
                >
                  Nicolo Bianchino
                </a>
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, x: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="font-semibold mb-3 text-2xl text-[#181619]">Supplemental Motion</p>
              <p className="text-xl text-[#181619]">
                <a
                  href="https://www.codymarian.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#ca9215] transition-colors"
                >
                  Cody Turple
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" ref={footerRef} className="relative w-full py-32 px-4 md:px-8 bg-black text-[#fce2ef]">
        <div className="w-full max-w-6xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex justify-center"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Image
                  src="/15d34f62a49472ddeede119e708fe0dcc3e6e438-1280x816.jpg"
                  alt="Honor Role"
                  width={300}
                  height={191}
                  className="w-auto h-24 object-contain cursor-pointer"
                  style={{ borderRadius: 0 }}
                />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="font-semibold mb-4 text-2xl">Contact</h3>
              <a
                href="mailto:hi@honorrole.com"
                className="text-2xl underline hover:text-[#ffbb71] transition-colors"
              >
                hi@honorrole.com
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="font-semibold mb-4 text-2xl">Follow</h3>
              <a
                href="https://www.instagram.com/honorrole/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl underline hover:text-[#ffbb71] transition-colors"
              >
                @honorrole
              </a>
            </motion.div>
          </motion.div>
          <div className="text-sm text-[#fce2ef]/70 pt-8 border-t border-[#fce2ef]/20">
            <p>© {new Date().getFullYear()} Honor Role. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
