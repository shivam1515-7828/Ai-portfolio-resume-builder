"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, User as UserIcon } from "lucide-react";
import { ResumeData } from "@/components/resume/ResumeForm";

interface PortfolioDocument {
  _id: string;
  slug: string;
  theme: string;
  createdAt: string;
  resumeId: ResumeData;
}

export default function ExplorePortfolios() {
  const [portfolios, setPortfolios] = useState<PortfolioDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const { data } = await axios.get("/api/portfolio");
      setPortfolios(data.portfolios || []);
    } catch {
      console.error("Failed to load portfolios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* Header */}
      <header className="pt-32 pb-20 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >

          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">Explore Portfolios.</h1>
          <p className="text-xl text-white/40 leading-relaxed font-medium">Discover how professionals around the world are showcasing their careers using AI-powered templates.</p>
        </motion.div>
      </header>

      {/* Grid */}
      <section className="pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-32 text-white/40 glass rounded-3xl">
              <UserIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-xl font-bold">No portfolios found.</p>
              <p>Be the first to generate a portfolio!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio, idx) => (
                <motion.div
                  key={portfolio._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass rounded-3xl p-8 group relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                  
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                      <span className="text-2xl font-black">{portfolio.resumeId?.personalInfo?.fullName?.charAt(0) || "U"}</span>
                    </div>
                    <Link href={`/portfolio/${portfolio.slug}`} target="_blank" className="hover:text-blue-400 transition-colors inline-block">
                       <h3 className="text-2xl font-black font-display mb-2">{portfolio.resumeId?.personalInfo?.fullName || "Anonymous User"}</h3>
                    </Link>
                    <p className="text-blue-400 text-sm font-bold uppercase tracking-widest">{portfolio.resumeId?.experience?.[0]?.role || "Professional"}</p>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed grow mb-8 line-clamp-3">
                    {portfolio.resumeId?.summary || "A seasoned professional leveraging AI to boost their career trajectory and project management."}
                  </p>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-white/30 font-bold tracking-widest uppercase">{portfolio.theme.replace('-', ' ')} Theme</span>
                    <Link href={`/portfolio/${portfolio.slug}`} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
