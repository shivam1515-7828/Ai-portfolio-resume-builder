"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Mail, 
  Globe, 
  ExternalLink, 
  User as UserIcon, 
} from "lucide-react";
import toast from "react-hot-toast";
import { ResumeData } from "@/components/resume/ResumeForm";

// Custom SVG Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Portfolio({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const [data, setData] = useState<{ resumeId: ResumeData, theme: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data: res } = await axios.get(`/api/portfolio?slug=${slug}`);
        setData(res.portfolio);
      } catch {
        toast.error("Portfolio not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40">Not Found</div>;

  const resume = data.resumeId;

  const themeClasses: Record<string, { bg: string, text: string, accent: string, orb: string, glass: string, border: string, sub: string }> = {
    "modern-dark": { bg: "bg-[#0a0a0a]", text: "text-white", accent: "from-blue-600 to-indigo-600", orb: "rgba(59,130,246,0.15)", glass: "bg-white/5", border: "border-white/10", sub: "text-white/40" },
    "clean-light": { bg: "bg-slate-50", text: "text-slate-900", accent: "from-indigo-500 to-purple-500", orb: "rgba(99,102,241,0.1)", glass: "bg-black/[0.03]", border: "border-black/5", sub: "text-slate-500" },
    "cyberpunk": { bg: "bg-[#050505]", text: "text-[#dcfce7]", accent: "from-emerald-400 to-cyan-500", orb: "rgba(52,211,153,0.15)", glass: "bg-[#dcfce7]/5", border: "border-[#dcfce7]/10", sub: "text-[#dcfce7]/50" }
  };

  const currentTheme = themeClasses[data.theme] || themeClasses["modern-dark"];

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} selection:bg-blue-500/30 font-sans tracking-tight transition-colors duration-700`}>
      <div className="fixed inset-0 -z-10 transition-colors duration-700" style={{ backgroundImage: `radial-gradient(circle at 50% 0%, ${currentTheme.orb}, transparent 60%)` }} />

      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div className={`${currentTheme.glass} px-8 py-3.5 rounded-2xl flex items-center gap-10 text-sm font-bold uppercase tracking-widest ${currentTheme.text} opacity-90 border ${currentTheme.border} backdrop-blur-xl shadow-2xl`}>
           <a href="#home" className="hover:text-white transition-colors">Home</a>
           <a href="#about" className="hover:text-white transition-colors">About</a>
           <a href="#projects" className="hover:text-white transition-colors">Projects</a>
           <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-32 h-32 rounded-[40px] bg-linear-to-tr ${currentTheme.accent} mb-10 flex items-center justify-center shadow-2xl shadow-blue-500/20`}
        >
          <UserIcon className="w-14 h-14 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tighter"
        >
          {resume.personalInfo.fullName}
        </motion.h1>
        <p className={`text-xs ${currentTheme.sub} font-bold uppercase tracking-widest`}>© 2026 {resume.personalInfo.fullName}. All rights reserved.</p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-lg md:text-xl max-w-2xl leading-relaxed ${currentTheme.sub}`}
        >
          {resume.summary?.substring(0, 150)}...
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-6 mt-12"
        >
          {resume.personalInfo.github && <a href={`https://${resume.personalInfo.github}`} className={`p-4 ${currentTheme.glass} rounded-2xl hover:bg-white/10 transition-colors`}><GithubIcon className="w-6 h-6" /></a>}
          {resume.personalInfo.linkedin && <a href={`https://${resume.personalInfo.linkedin}`} className={`p-4 ${currentTheme.glass} rounded-2xl hover:bg-white/10 transition-colors`}><LinkedinIcon className="w-6 h-6" /></a>}
          {resume.personalInfo.email && <a href={`mailto:${resume.personalInfo.email}`} className={`p-4 ${currentTheme.glass} rounded-2xl hover:bg-white/10 transition-colors`}><Mail className="w-6 h-6" /></a>}
        </motion.div>
      </section>

      <section id="about" className="py-32 px-4">
         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-32">
            <div>
               <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-8">About Me</h2>
               <p className="text-xl leading-relaxed opacity-80 font-medium">{resume.summary}</p>
               
               <div className="flex flex-wrap gap-4 mt-12">
                  {resume.skills.map((skill: string, idx: number) => (
                    <span key={idx} className={`${currentTheme.glass} border ${currentTheme.border} px-6 py-3 rounded-2xl text-sm font-bold shadow-sm`}>{skill}</span>
                  ))}
               </div>
            </div>

            <div className="space-y-12">
               <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-8">Professional Journey</h2>
               <div className={`space-y-12 border-l ${currentTheme.border} pl-12 mb-16`}>
                  {resume.experience.map((exp, idx) => (
                    <div key={idx} className="relative group">
                       <div className="absolute -left-[54px] top-0 w-3 h-3 rounded-full bg-blue-500 border-4 border-[#0a0a0a] ring-4 ring-blue-500/10" />
                       <div className="text-xs font-black uppercase text-white/30 mb-2 tracking-widest">{exp.startDate} - {exp.endDate}</div>
                       <h3 className="text-2xl font-bold group-hover:text-blue-500 transition-colors">{exp.role}</h3>
                       <div className="text-white/60 font-bold mb-4">{exp.company}</div>
                       <p className="text-white/40 leading-relaxed text-sm">{exp.description}</p>
                    </div>
                  ))}
               </div>

               {resume.education && resume.education.length > 0 && (
                 <>
                   <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-8">Education</h2>
                   <div className={`space-y-12 border-l ${currentTheme.border} pl-12`}>
                      {resume.education.map((edu, idx) => (
                        <div key={idx} className="relative group">
                           <div className="absolute -left-[54px] top-0 w-3 h-3 rounded-full bg-white/20 border-4 border-[#0a0a0a]" />
                           <div className="text-xs font-black uppercase text-white/30 mb-2 tracking-widest">{edu.startDate} - {edu.endDate}</div>
                           <h3 className="text-2xl font-bold group-hover:text-white transition-colors">{edu.degree}</h3>
                           {edu.link && <a href={edu.link} className="text-xs font-bold text-blue-500 hover:underline">{edu.link.replace('https://', '')}</a>}
                           <div className="text-white/60 font-bold mb-4">{edu.institution}</div>
                           {edu.description && <p className="text-white/40 leading-relaxed text-sm">{edu.description}</p>}
                        </div>
                      ))}
                   </div>
                 </>
               )}
            </div>
         </div>
      </section>

      <section id="projects" className={`py-32 px-4 ${currentTheme.glass} overflow-hidden border-y ${currentTheme.border}`} style={{ backgroundImage: `radial-gradient(circle at 50% 0%, ${currentTheme.orb}, transparent 60%)` }}>
         <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-20">
               <div>
                  <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">Crafted Work.</h2>
                  <p className="text-white/40">A collection of technical solutions and creative builds.</p>
               </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
               {resume.projects.map((proj, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ y: -10 }}
                   className={`${currentTheme.glass} rounded-3xl p-10 border ${currentTheme.border} flex flex-col items-start group shadow-lg`}
                 >
                    <div className="flex justify-between items-start mb-8">
                       <div className={`p-4 ${currentTheme.glass} rounded-[24px]`}><Globe className="w-8 h-8 text-blue-500" /></div>
                       <a href={proj.link} className={`p-3 ${currentTheme.glass} rounded-full hover:bg-white text-white hover:text-black transition-all`}><ExternalLink className="w-5 h-5" /></a>
                    </div>
                    <h3 className="text-3xl font-display font-black mb-4 group-hover:opacity-70 transition-opacity">{proj.name}</h3>
                    <p className={`${currentTheme.sub} leading-relaxed mb-10 text-sm`}>{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                       {proj.technologies?.map((tech, i) => (
                         <span key={i} className="text-[10px] font-black uppercase tracking-widest text-blue-500/60">{tech}</span>
                       ))}
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      <footer id="contact" className="py-20 px-4 text-center">
         <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-black">Let&apos;s connect.</h2>
            <p className={`${currentTheme.sub} max-w-lg mx-auto`}>Fill out the form below or reach out directly via my social channels.</p>
            
            <div className="grid lg:grid-cols-2 gap-16 mt-16 text-left">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`${currentTheme.glass} p-8 rounded-[32px] border ${currentTheme.border} shadow-2xl`}
                >
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      toast.success("Message sent! I'll get back to you soon.");
                      (e.target as HTMLFormElement).reset();
                    }} className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest opacity-30 px-1">Your Name</label>
                           <input type="text" required placeholder="John Doe" className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest opacity-30 px-1">Email Address</label>
                           <input type="email" required placeholder="john@example.com" className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest opacity-30 px-1">Message</label>
                           <textarea required rows={4} placeholder="Tell me about your project..." className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium resize-none" />
                        </div>
                        <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                           Send Message
                        </button>
                    </form>
                </motion.div>

                <div className="space-y-12 py-8">
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-blue-500">Contact Details</h3>
                        <div className="space-y-4">
                           {resume.personalInfo.email && (
                             <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`mailto:${resume.personalInfo.email}`)}>
                                <div className={`w-12 h-12 rounded-2xl ${currentTheme.glass} border ${currentTheme.border} flex items-center justify-center group-hover:bg-blue-600 transition-colors`}>
                                   <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Email Me</p>
                                   <p className="font-bold underline underline-offset-4">{resume.personalInfo.email}</p>
                                </div>
                             </div>
                           )}
                           {resume.personalInfo.location && (
                             <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${currentTheme.glass} border ${currentTheme.border} flex items-center justify-center`}>
                                   <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Location</p>
                                   <p className="font-bold">{resume.personalInfo.location}</p>
                                </div>
                             </div>
                           )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-blue-500">Social Connections</h3>
                        <div className="flex gap-4">
                           {resume.personalInfo.linkedin && (
                             <a href={`https://${resume.personalInfo.linkedin}`} target="_blank" className={`p-5 ${currentTheme.glass} rounded-3xl hover:bg-white/10 transition-all border ${currentTheme.border} hover:scale-110`}>
                                <LinkedinIcon className="w-6 h-6" />
                             </a>
                           )}
                           {resume.personalInfo.github && (
                             <a href={`https://${resume.personalInfo.github}`} target="_blank" className={`p-5 ${currentTheme.glass} rounded-3xl hover:bg-white/10 transition-all border ${currentTheme.border} hover:scale-110`}>
                                <GithubIcon className="w-6 h-6" />
                             </a>
                           )}
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
