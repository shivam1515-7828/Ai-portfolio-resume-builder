"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  FileText, 
  Globe, 
  Settings, 
  LogOut, 
  User as UserIcon, 
  Briefcase, 
  Clock, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchResumes();
    }
  }, [user, loading, router]);

  const fetchResumes = async () => {
    try {
      const { data } = await axios.get("/api/resume");
      setResumes(data.resumes || []);
    } catch {
      console.error("Failed to fetch resumes");
    } finally {
      setFetching(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 fixed h-full bg-[#0a0a0a]">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => router.push("/")}>
          <div className="bg-linear-to-tr from-blue-600 to-purple-600 p-2 rounded-xl">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold">CareerAI</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { name: "Resumes", icon: <FileText className="w-5 h-5" />, active: true, href: "/dashboard" },
            { name: "Portfolios", icon: <Globe className="w-5 h-5" />, href: "/dashboard/portfolios" },
            { name: "Settings", icon: <Settings className="w-5 h-5" />, href: "/dashboard/settings" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
           <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <UserIcon className="w-5 h-5 text-white/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-xs text-white/40 truncate">{user.email}</p>
              </div>
           </div>
           <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-medium"
           >
             <LogOut className="w-5 h-5" />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">My Resumes</h1>
            <p className="text-white/40">Manage and update your professional resumes.</p>
          </div>
          <Link 
            href="/resume/new" 
            className="flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-2xl font-bold hover:bg-white/90 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            <Plus className="w-5 h-5" />
            Create New
          </Link>
        </header>

        {fetching ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 glass rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="glass rounded-[40px] p-20 flex flex-col items-center text-center border-dashed border-2 border-white/5">
            <div className="bg-white/5 p-6 rounded-full mb-6">
              <FileText className="w-12 h-12 text-white/20" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No resumes found</h3>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              Start by creating your first AI-powered resume. It only takes a few minutes.
            </p>
            <Link 
              href="/resume/new"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all"
            >
              Create your First Resume
            </Link>
          </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume: { _id: string, title: string, summary: string, updatedAt: string }) => (
              <motion.div 
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl p-8 group hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden relative"
                onClick={() => router.push(`/resume/${resume._id}`)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-600/10 transition-colors">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <Clock className="w-3 h-3" />
                    Edited {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{resume.title}</h3>
                <p className="text-sm text-white/40 mb-8 line-clamp-2">{resume.summary || "No summary added yet."}</p>
                
                <div className="flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-7 h-7 rounded-sm border-2 border-[#121212] bg-white/10" />
                      ))}
                   </div>
                   <Link href={`/resume/${resume._id}`} className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <ChevronRight className="w-5 h-5 text-white/50" />
                   </Link>
                </div>

                {/* Decorative element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-all" />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
