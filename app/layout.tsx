import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter" 
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  title: "AI Resume & Portfolio Builder — Professional, AI-powered Resume Creation.",
  description: "Generate professional resumes and matching portfolio websites in minutes using advanced AI. Export to PDF and share your career story.",
  keywords: ["resume builder", "portfolio builder", "ai resume", "ai portfolio", "resume generator", "linkedin summary generator"],
};

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#0a0a0a] min-h-screen selection:bg-purple-500/30`}>
        <AuthProvider>
          <div className="gradient-bg fixed inset-0 -z-10" />
          <main className="relative z-10">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
