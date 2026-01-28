'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";

export default function PressPage() {

  const articles = [
    {
      title: "How Camila Mendes and Rachel Matthews Turned an NYU Meet-Cute Into a Production Company",
      publication: "INTERVIEW MAG",
      date: "March 21, 2025",
      href: "https://www.interviewmagazine.com/film/how-camila-mendes-and-rachel-matthews-turned-an-nyu-meet-cute-into-a-production-company",
      image: "/photos/R0001860.jpeg"
    },
    {
      title: "How Camila Mendes Proved to Herself and Others ‘I Actually Really Know What I’m Talking About’",
      publication: "INDIEWIRE",
      date: "June 12, 2024",
      href: "https://www.indiewire.com/awards/consider-this/camila-mendes-interview-musica-upgraded-tv-movie-emmy-1235015581/",
      image: "/photos/camila-mendes.jpeg"
    },
    {
      title: "Camila Mendes & Rachel Matthews Launch Production Company Honor Role",
      publication: "DEADLINE",
      date: "June 3, 2024",
      href: "https://deadline.com/2024/06/camila-mendes-rachel-matthews-honor-role-1235958128/",
      image: "/photos/R0002007.jpeg"
    }
  ];

  const [articleImages, setArticleImages] = useState<Record<string, string>>({});

  const articleUrls = useMemo(() => articles.map((article) => article.href), [articles]);

  useEffect(() => {
    let active = true;
    async function loadImages() {
      try {
        const res = await fetch("/api/press-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: articleUrls }),
        });
        if (!res.ok) return;
        const data = (await res.json().catch(() => null)) as { images?: Record<string, string> } | null;
        if (!active || !data?.images) return;
        setArticleImages(data.images);
      } catch {
        // Silent fallback to local images
      }
    }

    if (articleUrls.length) {
      loadImages();
    }

    return () => {
      active = false;
    };
  }, [articleUrls]);

  return (
    <CloudHeroLayout
      hero={
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-display">PRESS</h1>
          <p className="text-xl md:text-2xl text-white/85">News &amp; Features</p>
        </motion.div>
      }
    >
      {/* Articles Section */}
      <section className="relative w-full py-20 md:py-24 px-4 md:px-8">
        <div className="w-full max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => {
            const coverImage = articleImages[article.href] ?? article.image;
            return (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <Link
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-custom-lg overflow-hidden border border-white/10 bg-black/20 hover:border-white/30 transition-colors"
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    src={coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide">
                    <span className="text-[#ffbb71] font-semibold">{article.publication}</span>
                    <span className="text-white/70">{article.date}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[#ffbb71] transition-colors font-display">
                    {article.title}
                  </h2>
                  <span className="text-sm text-white/80 group-hover:text-[#ffbb71] transition-colors">
                    Read Article →
                  </span>
                </div>
              </Link>
            </motion.div>
          )})}
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
