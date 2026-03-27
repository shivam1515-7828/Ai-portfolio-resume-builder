"use client";

import { useState } from "react";
import { Plus, Trash2, Sparkles, Wand2, FileText, User as UserIcon, Briefcase, GraduationCap } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
    link?: string;
}

interface Experience {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Project {
    name: string;
    description: string;
    technologies: string[];
    link: string;
}

export interface ResumeData {
    title: string;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        github: string;
        linkedin: string;
    };
    summary: string;
    skills: string[];
    education: Education[];
    experience: Experience[];
    projects: Project[];
    achievements: string[];
}

export default function ResumeForm({ initialData, onUpdate }: { initialData: ResumeData, onUpdate: (data: ResumeData) => void }) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [activeTab, setActiveTab] = useState("personal");
  const [generating, setGenerating] = useState(false);

  const updateTitle = (value: string) => {
    const newData = { ...data, title: value };
    setData(newData);
    onUpdate(newData);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    const newData = { ...data, personalInfo: { ...data.personalInfo, [field]: value } };
    setData(newData);
    onUpdate(newData);
  };

  const updateSummary = (value: string) => {
    const newData = { ...data, summary: value };
    setData(newData);
    onUpdate(newData);
  };

  const addSkill = (skill: string) => {
    if (!skill.trim() || data.skills.includes(skill)) return;
    const newData = { ...data, skills: [...data.skills, skill.trim()] };
    setData(newData);
    onUpdate(newData);
  };

  const removeSkill = (index: number) => {
    const newData = { ...data, skills: data.skills.filter((_, i) => i !== index) };
    setData(newData);
    onUpdate(newData);
  };

  const addExperience = () => {
    const newData = { ...data, experience: [...data.experience, { company: "", role: "", location: "", startDate: "", endDate: "", description: "" }] };
    setData(newData);
    onUpdate(newData);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    const newData = { ...data, experience: newExperience };
    setData(newData);
    onUpdate(newData);
  };

  const deleteExperience = (index: number) => {
    const newData = { ...data, experience: data.experience.filter((_, i) => i !== index) };
    setData(newData);
    onUpdate(newData);
  };

  const addEducation = () => {
    const newData = { ...data, education: [...data.education, { institution: "", degree: "", startDate: "", endDate: "", description: "" }] };
    setData(newData);
    onUpdate(newData);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    const newData = { ...data, education: newEducation };
    setData(newData);
    onUpdate(newData);
  };

  const deleteEducation = (index: number) => {
    const newData = { ...data, education: data.education.filter((_, i) => i !== index) };
    setData(newData);
    onUpdate(newData);
  };

  const addProject = () => {
    const newData = { ...data, projects: [...data.projects, { name: "", description: "", technologies: [], link: "" }] };
    setData(newData);
    onUpdate(newData);
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    const newData = { ...data, projects: newProjects };
    setData(newData);
    onUpdate(newData);
  };

  const deleteProject = (index: number) => {
    const newData = { ...data, projects: data.projects.filter((_, i) => i !== index) };
    setData(newData);
    onUpdate(newData);
  };

  const handleAiGenerate = async () => {
    setGenerating(true);
    try {
      const { data: res } = await axios.post("/api/ai/generate", data);
      const ai = res.aiContent;
      
      const newSkills = Array.from(new Set([...data.skills, ...(ai.skills || [])]));
      
      const newExperience = data.experience.map(exp => {
         const matchingAiExp = (ai.experience || []).find((a: { company: string, description: string }) => a.company === exp.company);
         return matchingAiExp ? { ...exp, description: matchingAiExp.description } : exp;
      });

      const newData = { 
        ...data, 
        summary: ai.summary || data.summary,
        skills: newSkills,
        experience: newExperience
      };
      
      setData(newData);
      onUpdate(newData);
      toast.success("AI Content Generated & Applied!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "AI Generation failed. Check API Key or Input Data.");
    } finally {
      setGenerating(false);
    }
  };

  const tabs = [
    { id: "personal", label: "Profile", icon: <UserIcon className="w-4 h-4" /> },
    { id: "experience", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Sparkles className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#121212]/50 border border-white/5 rounded-[32px] overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-white/5 p-2 gap-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-white/40 hover:bg-white/5'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === "personal" && (
            <motion.div 
               key="personal"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }} 
               exit={{ opacity: 0, x: 10 }}
               className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                   <InputGroup label="Resume Title" placeholder="e.g. Senior Frontend Developer" value={data.title} onChange={updateTitle} />
                </div>
                <InputGroup label="Full Name" placeholder="John Doe" value={data.personalInfo.fullName} onChange={(val) => updatePersonalInfo('fullName', val)} />
                <InputGroup label="Email" placeholder="john@example.com" value={data.personalInfo.email} onChange={(val) => updatePersonalInfo('email', val)} />
                <InputGroup label="Phone" placeholder="+1 (555) 000-0000" value={data.personalInfo.phone} onChange={(val) => updatePersonalInfo('phone', val)} />
                <InputGroup label="Location" placeholder="San Francisco, CA" value={data.personalInfo.location} onChange={(val) => updatePersonalInfo('location', val)} />
                <InputGroup label="Website" placeholder="https://portfolio.com" value={data.personalInfo.website} onChange={(val) => updatePersonalInfo('website', val)} />
                <InputGroup label="GitHub" placeholder="github.com/johndoe" value={data.personalInfo.github} onChange={(val) => updatePersonalInfo('github', val)} />
                <InputGroup label="LinkedIn" placeholder="linkedin.com/in/johndoe" value={data.personalInfo.linkedin} onChange={(val) => updatePersonalInfo('linkedin', val)} />
              </div>

              <div className="pt-6">
                 <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-white/70">Professional Summary</label>
                    <button 
                      onClick={handleAiGenerate}
                      disabled={generating}
                      className="text-xs flex items-center gap-1.5 text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full hover:bg-blue-400/20 transition-all font-bold"
                    >
                      {generating ? "AI Thinking..." : (
                        <><Wand2 className="w-3 h-3" /> Magic Write</>
                      )}
                    </button>
                 </div>
                 <textarea 
                   rows={5}
                   value={data.summary}
                   onChange={(e) => updateSummary(e.target.value)}
                   placeholder="Describe your career highlights and goals..."
                   className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-colors text-white/80"
                 />
              </div>
            </motion.div>
          )}

          {activeTab === "experience" && (
             <motion.div 
               key="experience"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }} 
               exit={{ opacity: 0, x: 10 }}
               className="space-y-8"
             >
                {data.experience.map((exp, idx) => (
                   <div key={idx} className="relative glass p-6 rounded-3xl group border border-white/10">
                      <button 
                        onClick={() => deleteExperience(idx)}
                        className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 transition-colors"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                         <InputGroup label="Company" value={exp.company} onChange={(val) => updateExperience(idx, 'company', val)} />
                         <InputGroup label="Role" value={exp.role} onChange={(val) => updateExperience(idx, 'role', val)} />
                         <InputGroup label="Location" value={exp.location} onChange={(val) => updateExperience(idx, 'location', val)} />
                         <div className="grid grid-cols-2 gap-4">
                            <InputGroup label="Start Date" placeholder="MM/YYYY" value={exp.startDate} onChange={(val) => updateExperience(idx, 'startDate', val)} />
                            <InputGroup label="End Date" placeholder="Present" value={exp.endDate} onChange={(val) => updateExperience(idx, 'endDate', val)} />
                         </div>
                      </div>
                      <textarea 
                         rows={4}
                         value={exp.description}
                         onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                         placeholder="Job achievements and responsibilities..."
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-colors text-white/80"
                      />
                   </div>
                ))}
                
                <button 
                  onClick={addExperience}
                  className="w-full flex items-center justify-center gap-2 py-6 border-2 border-dashed border-white/10 rounded-[32px] text-white/40 hover:text-white hover:border-white/20 transition-all font-bold"
                >
                   <Plus className="w-5 h-5" /> Add Experience
                </button>
             </motion.div>
          )}

          {activeTab === "education" && (
             <motion.div 
               key="education"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }} 
               exit={{ opacity: 0, x: 10 }}
               className="space-y-8"
             >
                {data.education.map((edu, idx) => (
                   <div key={idx} className="relative glass p-6 rounded-3xl group border border-white/10">
                      <button 
                        onClick={() => deleteEducation(idx)}
                        className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 transition-colors"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                         <InputGroup label="Institution" value={edu.institution} onChange={(val) => updateEducation(idx, 'institution', val)} />
                         <InputGroup label="Degree" value={edu.degree} onChange={(val) => updateEducation(idx, 'degree', val)} />
                         <div className="grid grid-cols-2 gap-4">
                            <InputGroup label="Start Date" placeholder="MM/YYYY" value={edu.startDate} onChange={(val) => updateEducation(idx, 'startDate', val)} />
                            <InputGroup label="End Date" placeholder="Present" value={edu.endDate} onChange={(val) => updateEducation(idx, 'endDate', val)} />
                         </div>
                      </div>
                      <textarea 
                         rows={2}
                         value={edu.description}
                         onChange={(e) => updateEducation(idx, 'description', e.target.value)}
                         placeholder="Academic highlights, honours, etc."
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-colors text-white/80"
                      />
                   </div>
                ))}
                
                <button 
                  onClick={addEducation}
                  className="w-full flex items-center justify-center gap-2 py-6 border-2 border-dashed border-white/10 rounded-[32px] text-white/40 hover:text-white hover:border-white/20 transition-all font-bold"
                >
                   <Plus className="w-5 h-5" /> Add Education
                </button>
             </motion.div>
          )}

          {activeTab === "projects" && (
             <motion.div 
               key="projects"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }} 
               exit={{ opacity: 0, x: 10 }}
               className="space-y-8"
             >
                {data.projects.map((proj, idx) => (
                   <div key={idx} className="relative glass p-6 rounded-3xl group border border-white/10">
                      <button 
                        onClick={() => deleteProject(idx)}
                        className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 transition-colors"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                         <InputGroup label="Project Name" value={proj.name} onChange={(val) => updateProject(idx, 'name', val)} />
                         <InputGroup label="Live Link" placeholder="https://" value={proj.link} onChange={(val) => updateProject(idx, 'link', val)} />
                      </div>
                      <textarea 
                         rows={3}
                         value={proj.description}
                         onChange={(e) => updateProject(idx, 'description', e.target.value)}
                         placeholder="Describe the problem, solution, and impact..."
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-colors text-white/80"
                      />
                      <div className="mt-4">
                         <label className="text-xs font-bold text-white/30 mb-2 block">Technologies (Comma separated)</label>
                         <input 
                           type="text" 
                           value={proj.technologies.join(", ")}
                           onChange={(e) => updateProject(idx, 'technologies', e.target.value.split(",").map(t => t.trim()))}
                           placeholder="React, AWS, Python..."
                           className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-colors text-white/80"
                         />
                      </div>
                   </div>
                ))}
                
                <button 
                  onClick={addProject}
                  className="w-full flex items-center justify-center gap-2 py-6 border-2 border-dashed border-white/10 rounded-[32px] text-white/40 hover:text-white hover:border-white/20 transition-all font-bold"
                >
                   <Plus className="w-5 h-5" /> Add Project
                </button>
             </motion.div>
          )}

          {activeTab === "skills" && (
             <motion.div 
               key="skills"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }} 
               className="space-y-8"
             >
                <div>
                   <label className="text-sm font-bold text-white/70 block mb-4">Core Skills</label>
                   <div className="flex flex-wrap gap-2 mb-6">
                      {data.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2.5 rounded-xl border border-blue-500/20 font-bold group">
                           {skill}
                           <button onClick={() => removeSkill(idx)} className="opacity-40 group-hover:opacity-100 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-2">
                       <input 
                         type="text" 
                         placeholder="Add skill (e.g. React, Python)"
                         onKeyDown={(e) => {
                            if(e.key === 'Enter') {
                                const target = e.target as HTMLInputElement;
                                addSkill(target.value);
                                target.value = '';
                            }
                         }}
                         className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-colors"
                       />
                       <button className="bg-white text-black px-6 rounded-2xl font-bold hover:bg-white/90">Add</button>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, value, onChange }: { label: string, placeholder?: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="space-y-1.5 flex flex-col">
       <label className="text-[12px] font-bold text-white/40 px-1">{label}</label>
       <input 
         type="text" 
         placeholder={placeholder}
         value={value}
         onChange={(e) => onChange(e.target.value)}
         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-colors text-white/90"
       />
    </div>
  );
}
