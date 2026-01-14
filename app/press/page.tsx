'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import CloudHeroLayout from "@/components/CloudHeroLayout";
import Footer from "@/components/Footer";

export default function PressPage() {

  const articles = [
    {
      title: "How Camila Mendes and Rachel Matthews Turned an NYU Meet-Cute Into a Production Company",
      publication: "INTERVIEW MAG",
      date: "March 21, 2025",
      href: "https://www.interviewmagazine.com/film/how-camila-mendes-and-rachel-matthews-turned-an-nyu-meet-cute-into-a-production-company"
    },
    {
      title: "How Camila Mendes Proved to Herself and Others ‘I Actually Really Know What I’m Talking About’",
      publication: "INDIEWIRE",
      date: "June 12, 2024",
      href: "https://www.indiewire.com/awards/consider-this/camila-mendes-interview-musica-upgraded-tv-movie-emmy-1235015581/"
    },
    {
      title: "‘Riverdale’ star Camila Mendes and Rachel Matthews launch production company Honor Role",
      publication: "NEWSBYTES",
      date: "June 4, 2024",
      href: "https://www.newsbytesapp.com/news/entertainment/camila-mendes-enters-production-domain-launches-honor-role/story"
    },
    {
      title: "Camila Mendes & Rachel Matthews Launch Production Company Honor Role",
      publication: "DEADLINE",
      date: "June 3, 2024",
      href: "https://deadline.com/2024/06/camila-mendes-rachel-matthews-honor-role-1235958128/"
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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Press</h1>
          <p className="text-xl md:text-2xl text-white/85">News &amp; Features</p>
        </motion.div>
      }
    >
      {/* Articles Section */}
      <section className="relative w-full py-32 px-4 md:px-8">
        <div className="w-full max-w-4xl mx-auto space-y-16">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="border-b border-white/20 pb-12 last:border-b-0"
            >
              <Link
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[#ffbb71] uppercase tracking-wide">
                    {article.publication}
                  </span>
                  <span className="text-sm text-white/70 ml-4">{article.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#ffbb71] transition-colors">
                  {article.title}
                </h2>
                <span className="text-lg text-white underline group-hover:text-[#ffbb71] transition-colors">
                  Read Article →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </CloudHeroLayout>
  );
}
