"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileText, 
  Globe, 
  TrendingUp, 
  CheckCircle2,
  Zap
} from "lucide-react";
import Link from "next/link";

// Custom SVG Icons for Brands
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Home() {
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Templates", href: "/explore" },
    { name: "Portfolio", href: "/explore" }
  ];

  return (
    <div className="flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <div className="glass flex items-center justify-between w-full max-w-5xl px-8 py-4 rounded-2xl">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-linear-to-tr from-blue-600 to-purple-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">CareerAI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-white transition-colors">{item.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Sign In</Link>
            <Link href="/signup" className="flex items-center gap-2 bg-white text-black text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/10">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">

          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-8xl font-display font-extrabold leading-[1.1] mb-8 tracking-tighter"
          >
            Build your dream <br />
            <span className="gradient-text">Future with AI.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Create professional resumes, polish your LinkedIn presence, and generate a personal portfolio website in minutes using advanced Grok AI models.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 group hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
              Build your Resume Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/explore" className="w-full sm:w-auto px-8 py-4 glass rounded-2xl font-medium hover:bg-white/10 transition-colors">
              Explore Portfolios
            </Link>
          </motion.div>
        </div>

        {/* Abstract Background Blur Nodes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-[800px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Revolutionize your career path.</h2>
            <p className="text-white/50 max-w-xl">Everything you need to stand out to recruiters and land your next role at top companies.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8 text-blue-400" />,
                title: "AI Resume Generator",
                description: "Simply enter your details and our AI generates professional, impact-driven content for every section of your resume."
              },
              {
                icon: <Globe className="w-8 h-8 text-purple-400" />,
                title: "Portfolio Website",
                description: "Automatically turn your resume into a stunning, responsive portfolio website with pre-built hosting options."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
                title: "LinkedIn Optimizer",
                description: "Generate a compelling LinkedIn summary tailored to your experience and career goals with professional tone control."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-10 rounded-3xl group"
              >
                <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Preview Section */}
      <section className="py-32 bg-white/5 relative border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4 block">AI Efficiency</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">From Zero to Hired <br /> in under 5 minutes.</h2>
              <div className="space-y-6 mb-10">
                {[
                  "Intelligent data parsing for faster input",
                  "AI-suggested bullet points with action verbs",
                  "One-click PDF export with clean formatting",
                  "Live portfolio preview before deployment"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0" />
                    <span className="text-white/80">{text}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup" className="text-blue-400 flex items-center gap-2 font-bold group">
                Start Building <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
            
            <motion.div 
              style={{ perspective: 1000 }}
              className="relative"
            >
              <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">AI Editor View</div>
                </div>
                <div className="p-8 h-[400px] overflow-hidden bg-black/40">
                  <div className="space-y-6">
                    <div className="w-1/3 h-8 bg-blue-500/20 rounded-lg animate-pulse" />
                    <div className="w-2/3 h-4 bg-white/5 rounded-full" />
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-white/10 rounded-xl" />
                      <div className="flex-1 space-y-3">
                        <div className="w-full h-3 bg-white/5 rounded-full" />
                        <div className="w-5/6 h-3 bg-white/5 rounded-full" />
                        <div className="w-4/6 h-3 bg-white/5 rounded-full" />
                      </div>
                    </div>
                    <div className="pt-8 space-y-4">
                      <div className="w-1/2 h-8 bg-emerald-500/10 rounded-lg" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 glass rounded-xl" />
                        <div className="h-20 glass rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 animate-bounce">
                <div className="bg-linear-to-tr from-violet-600 to-indigo-600 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2">
                  <LinkedinIcon className="w-5 h-5 text-white" />
                  <span className="text-xs font-bold text-white">Summary Generated</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Zap className="text-blue-500 w-6 h-6" />
              <span className="text-xl font-display font-bold">CareerAI</span>
            </div>
            <p className="text-white/40 text-sm">Empowering professionals with state-of-the-art AI technology.</p>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="https://github.com" className="text-white/40 hover:text-white transition-colors"><GithubIcon className="w-6 h-6" /></Link>
            <Link href="https://linkedin.com" className="text-white/40 hover:text-white transition-colors"><LinkedinIcon className="w-6 h-6" /></Link>
          </div>
          
          <p className="text-white/40 text-xs text-center">© 2026 CareerAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
