"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Globe, 
  Settings, 
  User as UserIcon, 
  Sparkles,
  LogOut,
  Save,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserSettings() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notifications: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      setFormData({ name: user.name, email: user.email, notifications: true });
    }
  }, [user, loading]);

  if (loading || !user) return null;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar - Reusing styles */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 fixed h-full bg-[#0a0a0a]">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => router.push("/")}>
          <div className="bg-linear-to-tr from-blue-600 to-purple-600 p-2 rounded-xl">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold">CareerAI</span>
        </div>

        <nav className="flex-1 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/50 hover:bg-white/5 hover:text-white transition-all"><FileText className="w-5 h-5" /> Resumes</Link>
            <Link href="/dashboard/portfolios" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/50 hover:bg-white/5 hover:text-white transition-all"><Globe className="w-5 h-5" /> Portfolios</Link>
            <Link href="/dashboard/settings" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Settings className="w-5 h-5" /> Settings</Link>
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
        <header className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-2">Settings</h1>
            <p className="text-white/40">Manage your account preferences and application settings.</p>
        </header>

        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
        >
            <div className="glass rounded-3xl p-8 mb-8 space-y-6">
                <div>
                   <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><UserIcon className="w-5 h-5 text-blue-500" /> Personal Information</h2>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="text-xs font-bold uppercase tracking-widest text-white/30 block mb-2">Full Name</label>
                       <input 
                         type="text" 
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                       />
                     </div>
                     <div>
                       <label className="text-xs font-bold uppercase tracking-widest text-white/30 block mb-2">Email Address</label>
                       <input 
                         type="email" 
                         value={formData.email}
                         disabled
                         className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-white/50 opacity-70 cursor-not-allowed"
                       />
                       <p className="text-xs text-white/30 mt-2">Email address cannot be changed.</p>
                     </div>
                   </div>
                </div>
            </div>

            <div className="glass rounded-3xl p-8 mb-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-purple-500" /> Application Preferences</h2>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                   <div>
                     <p className="font-bold mb-1">Email Notifications</p>
                     <p className="text-sm text-white/40">Receive updates on AI generation features and new templates.</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.notifications} onChange={(e) => setFormData({...formData, notifications: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                </div>
            </div>

            <div className="flex items-center gap-4">
               <button 
                 onClick={handleSave}
                 disabled={saving}
                 className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
               >
                 {saving ? "Saving..." : <><Save className="w-5 h-5" /> Save Changes</>}
               </button>
               {saved && (
                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                   <CheckCircle2 className="w-5 h-5" /> Saved successfully
                 </motion.div>
               )}
            </div>
        </motion.div>
      </main>
    </div>
  );
}
