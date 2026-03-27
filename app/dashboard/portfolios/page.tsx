"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Globe, 
  Settings, 
  User as UserIcon, 
  LogOut,
  Sparkles,
  ArrowRight
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

interface PortfolioData {
  _id: string;
  slug: string;
  theme: string;
  resumeId: {
    _id: string;
    personalInfo?: {
      fullName?: string;
    }
  };
}

export default function Portfolios() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchPortfolios();
    }
  }, [user, loading, router]);

  const fetchPortfolios = async () => {
    try {
      const { data } = await axios.get("/api/user/portfolios");
      setPortfolios(data.portfolios || []);
    } catch {
      console.error("Failed to fetch portfolios");
    } finally {
      setFetching(false);
    }
  };

  const handleUpdateTheme = async (resumeId: string, slug: string, theme: string) => {
    try {
      await axios.post("/api/portfolio", { resumeId, slug, theme });
      setPortfolios((prev) => prev.map((p) => p.slug === slug ? { ...p, theme } : p));
      toast.success("Template Updated successfully!");
    } catch {
      toast.error("Failed to update template");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex selection:bg-blue-500/30">
      {/* Sidebar - Reusing styles */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 fixed h-full bg-[#0a0a0a] z-10">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => router.push("/")}>
          <div className="bg-linear-to-tr from-blue-600 to-purple-600 p-2 rounded-xl">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold">CareerAI</span>
        </div>

        <nav className="flex-1 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/50 hover:bg-white/5 hover:text-white transition-all"><FileText className="w-5 h-5" /> Resumes</Link>
            <Link href="/dashboard/portfolios" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Globe className="w-5 h-5" /> Portfolios</Link>
            <Link href="/dashboard/settings" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/50 hover:bg-white/5 hover:text-white transition-all"><Settings className="w-5 h-5" /> Settings</Link>
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
      <main className="flex-1 ml-72 p-12 relative z-0">
        <header className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-2">My Portfolios</h1>
            <p className="text-white/40">Manage your generated portfolio websites and control their templates.</p>
        </header>

        {fetching ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 glass rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <div className="glass rounded-[40px] p-20 flex flex-col items-center text-center">
              <div className="bg-white/5 p-6 rounded-full mb-6">
                  <Globe className="w-12 h-12 text-white/20" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Active Portfolios</h3>
              <p className="text-white/40 max-w-sm mb-8">
                  Generate a portfolio website directly from the Resume Editor to see it listed here.
              </p>
              <Link href="/resume/new" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-colors">Create New Resume</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {portfolios.map((portfolio, idx) => (
              <motion.div
                key={portfolio._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-3xl p-8 group relative overflow-hidden flex flex-col h-full hover:border-blue-500/30 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                
                <div className="mb-8">
                  <div className="flex items-center justify-end mb-4">
                     <Link href={`/portfolio/${portfolio.slug}`} target="_blank" className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white/50 hover:text-white" />
                     </Link>
                  </div>
                  <Link href={`/portfolio/${portfolio.slug}`} target="_blank" className="hover:text-blue-400 transition-colors inline-block">
                     <h3 className="text-2xl font-black font-display mb-1 truncate">{portfolio.slug}.careerai.com</h3>
                  </Link>
                  <p className="text-white/40 text-sm">Linked to: <strong>{portfolio.resumeId?.personalInfo?.fullName || "A saved resume"}</strong></p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-auto">
                   <p className="text-xs text-white/30 font-bold tracking-widest uppercase mb-3">Portfolio Template Theme</p>
                   <select 
                     value={portfolio.theme || "modern-dark"}
                     onChange={(e) => handleUpdateTheme(portfolio.resumeId._id, portfolio.slug, e.target.value)}
                     className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                   >
                      <option value="modern-dark">Modern Dark (Default)</option>
                      <option value="clean-light">Clean Light</option>
                      <option value="cyberpunk">Cyberpunk Neon</option>
                   </select>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
