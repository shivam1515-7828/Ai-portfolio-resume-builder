"use client";

import { Mail, Phone, Globe, MapPin, Briefcase } from "lucide-react";

// Custom SVG Icons for Brands
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

import { ResumeData } from "./ResumeForm";

export default function ResumePreview({ data }: { data: ResumeData }) {
  if (!data.personalInfo.fullName) {
    return (
      <div className="h-full bg-white flex items-center justify-center p-20 text-center rounded-[32px] border border-white/5 shadow-inner">
        <div className="max-w-xs space-y-4">
           <div className="bg-slate-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
              <Briefcase className="text-slate-200 w-10 h-10" />
           </div>
           <h3 className="text-xl font-bold text-slate-800">Your Preview Awaits</h3>
           <p className="text-slate-400 text-sm leading-relaxed">Start filling in your profile and experience to see your professional resume take shape in real-time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white text-slate-900 rounded-[32px] overflow-y-auto custom-scrollbar shadow-2xl origin-top transition-all duration-500">
      <div id="resume-content" className="p-12 space-y-10 bg-white" style={{ color: "#0f172a" }}>
        {/* Header */}
        <header className="pb-10 flex justify-between items-end" style={{ borderBottom: "2px solid #0f172a" }}>
          <div className="space-y-3">
             <h1 className="text-5xl font-black tracking-tight uppercase" style={{ color: "#0f172a" }}>{data.personalInfo.fullName}</h1>
             <p className="text-lg font-medium" style={{ color: "#64748b" }}>Professional Experience & Skills</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-xs font-bold uppercase" style={{ color: "#475569" }}>
             {data.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {data.personalInfo.email}</div>}
             {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {data.personalInfo.phone}</div>}
             {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {data.personalInfo.location}</div>}
          </div>
        </header>

        {/* Links */}
        <div className="flex flex-wrap gap-8 py-2 text-[10px] font-black uppercase" style={{ color: "#94a3b8" }}>
           {data.personalInfo.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3" /> {data.personalInfo.website.replace('https://', '')}</div>}
           {data.personalInfo.github && <div className="flex items-center gap-2"><GithubIcon className="w-3 h-3" /> {data.personalInfo.github.replace('https://', '')}</div>}
           {data.personalInfo.linkedin && <div className="flex items-center gap-2"><LinkedinIcon className="w-3 h-3" /> {data.personalInfo.linkedin.replace('https://', '')}</div>}
        </div>

        {/* Summary */}
        {data.summary && (
        <section className="space-y-4">
           <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "#2563eb" }}>Profile Summary</h2>
           <p className="leading-relaxed text-[15px] font-medium max-w-3xl" style={{ color: "#334155" }}>{data.summary}</p>
        </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
        <section className="space-y-6">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Work Experience</h2>
           <div className="space-y-8">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="space-y-3 group">
                  <div className="flex justify-between items-baseline">
                     <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                     <span className="text-xs font-bold text-slate-400 uppercase">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-500 uppercase">
                     <span>{exp.company}</span>
                     <span>{exp.location}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line border-l-2 border-slate-100 pl-4 py-1">{exp.description}</p>
                </div>
              ))}
           </div>
        </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
        <section className="space-y-6">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Education</h2>
           <div className="space-y-6">
              {data.education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                     <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                     <span className="text-xs font-bold text-slate-400 uppercase">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-500 uppercase">{edu.institution}</div>
                  {edu.description && <p className="text-slate-600 text-[13px]">{edu.description}</p>}
                </div>
              ))}
           </div>
        </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
        <section className="space-y-6">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Key Projects</h2>
           <div className="space-y-6">
              {data.projects.map((proj, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                     <h3 className="text-lg font-bold text-slate-900">{proj.name}</h3>
                     {proj.link && <a href={proj.link} className="text-xs font-bold text-blue-500 hover:underline">{proj.link.replace('https://', '')}</a>}
                  </div>
                  <p className="text-slate-600 text-[13px]">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.technologies.map((tech: string, i: number) => (
                         <span key={i} className="text-[10px] font-black uppercase tracking-widest text-slate-400">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
           </div>
        </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
        <section className="space-y-4">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Technical Skills</h2>
           <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">{skill}</span>
              ))}
           </div>
        </section>
        )}
      </div>
    </div>
  );
}
