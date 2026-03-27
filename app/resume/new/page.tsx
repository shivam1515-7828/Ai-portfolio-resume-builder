"use client";

import { useState } from "react";
import ResumeForm, { ResumeData } from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Download, Globe, Sparkles } from "lucide-react";

// Custom SVG Icon
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function NewResume() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [data, setData] = useState<ResumeData>({
    title: "",
    personalInfo: { fullName: "", email: "", phone: "", location: "", website: "", github: "", linkedin: "" },
    summary: "",
    skills: [],
    education: [],
    experience: [],
    projects: [],
    achievements: [],
  });
  
  const [saving, setSaving] = useState(false);
  const [generatingLinkedIn, setGeneratingLinkedIn] = useState(false);
  const [suggesting, setSuggesting] = useState(false);

  if (loading) return null;
  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post("/api/resume", data);
      toast.success("Resume saved successfully!");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("resume-content");
    if (!element) return;
    
    const loadingToast = toast.loading("Generating High-Quality PDF...");
    try {
        const canvas = await html2canvas(element, { 
           scale: 2,
           useCORS: true,
           windowWidth: element.scrollWidth,
           windowHeight: element.scrollHeight,
           backgroundColor: "#ffffff"
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        const position = 0;

        // If content height is larger than page, let it overflow onto a single long page or split.
        // Doing a simple single page dump for now since jsPDF takes care of it natively
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        pdf.save(`${data.personalInfo.fullName || "Resume"}.pdf`);
        toast.dismiss(loadingToast);
        toast.success("Resume Downloaded!");
    } catch (e) {
        console.error("PDF generation exception:", e);
        toast.dismiss(loadingToast);
        toast.error(`PDF Error: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const handleGeneratePortfolio = async () => {
    try {
        const { data: resumeRes } = await axios.post("/api/resume", data);
        const resumeId = resumeRes.resume._id;
        const slug = (data.personalInfo.fullName || 'user').toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

        await axios.post("/api/portfolio", { resumeId, slug });
        toast.success("Portfolio Generated!");
        window.open(`/portfolio/${slug}`, '_blank');
    } catch {
        toast.error("Failed to generate portfolio");
    }
  };

  const handleLinkedInGenerate = async () => {
    if (!data.personalInfo.fullName || data.experience.length === 0) {
      toast.error("Add your name and at least one experience entry first!");
      return;
    }
    setGeneratingLinkedIn(true);
    try {
      const response = await axios.post("/api/ai/linkedin", { userData: data, tone: "professional" });
      const summary = response.data.linkedinSummary;
      navigator.clipboard.writeText(summary);
      toast.success("LinkedIn Summary generated and copied to clipboard!");
    } catch {
      toast.error("Failed to generate LinkedIn summary");
    } finally {
      setGeneratingLinkedIn(false);
    }
  };

  const handleAiSuggest = async () => {
    setSuggesting(true);
    try {
      const { data: res } = await axios.post("/api/ai/generate", data);
      const ai = res.aiContent;
      
      const newSkills = Array.from(new Set([...data.skills, ...(ai.skills || [])]));
      const newExperience = data.experience.map((exp) => {
         const matchingAiExp = (ai.experience || []).find((a: { company: string, description: string }) => a.company === exp.company);
         return matchingAiExp ? { ...exp, description: matchingAiExp.description } : exp;
      });

      setData({ 
        ...data, 
        summary: ai.summary || data.summary,
        skills: newSkills,
        experience: newExperience
      });
      toast.success("AI Suggestions Applied!");
    } catch {
      toast.error("AI Suggester failed. Check API Key or Input.");
    } finally {
      setSuggesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-6">
           <Link href="/dashboard" className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
           </Link>
           <h1 className="text-xl font-display font-bold">New Resume Builder</h1>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={handleLinkedInGenerate}
             disabled={generatingLinkedIn}
             className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
           >
              <LinkedinIcon className="w-4 h-4" /> {generatingLinkedIn ? "Generating..." : "LinkedIn Generator"}
           </button>
           
           <button 
             onClick={handleDownload}
             className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-95"
           >
             <Download className="w-5 h-5" />
             Download
           </button>

           <button 
             onClick={handleSave}
             disabled={saving}
             className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
           >
             <Save className="w-5 h-5" />
             {saving ? "Saving..." : "Save Resume"}
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 p-8 overflow-y-auto">
           <ResumeForm initialData={data} onUpdate={setData} />
        </div>

        <div className="w-1/2 p-8 bg-[#0a0a0a] border-l border-white/5 overflow-y-auto relative">
           <div className="sticky top-0 h-[calc(100vh-160px)]">
              <ResumePreview data={data} />
              
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                 <button 
                  onClick={handleGeneratePortfolio}
                  className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-blue-600/20 transition-all text-white/40 hover:text-blue-400 group relative"
                 >
                    <Globe className="w-6 h-6" />
                    <span className="absolute right-full mr-4 bg-black/80 px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Generate Portfolio</span>
                 </button>
                 <button 
                  onClick={handleAiSuggest}
                  disabled={suggesting}
                  className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-purple-600/20 transition-all text-white/40 hover:text-purple-400 group relative disabled:opacity-50"
                 >
                    <Sparkles className="w-6 h-6" />
                    <span className="absolute right-full mr-4 bg-black/80 px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       {suggesting ? "Thinking..." : "AI Suggester"}
                    </span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
