"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Search, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Loader2, 
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    ecosystem: "pypi",
    name: "",
    version: "",
  });

  const handleRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.version) {
      setIsLoading(true);
      router.push(`/p/${formData.ecosystem}/${formData.name}/${formData.version}`);
    }
  };

  const ecosystems = [
    { id: "pypi", label: "PyPI" },
    { id: "npm", label: "NPM" },
    { id: "cargo", label: "Cargo" },
    { id: "go", label: "Go" },
    { id: "maven", label: "Maven" },
    { id: "rubygems", label: "RubyGems" },
    { id: "nuget", label: "NuGet" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-200 selection:bg-emerald-500/30 overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 dark:opacity-100" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group cursor-default mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium tracking-tight hover:border-emerald-500/40 transition-colors"
        >
          <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
          <span>v2.0: AI-Powered Supply Chain Security</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold text-slate-950 dark:text-white mb-8 tracking-tighter text-center"
        >
          Secure your stack <br /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-emerald-500 to-emerald-800 dark:from-emerald-300 dark:to-emerald-600">
            at the source.
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-16 leading-relaxed text-center"
        >
          Instant deep-scan of packages for vulnerabilities and malicious intent. 
          The engineering standard for modern dependency management.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-5xl"
        >
          <div className="relative group p-[1px] rounded-2xl bg-slate-200 dark:bg-gradient-to-b dark:from-slate-700 dark:to-transparent focus-within:ring-2 ring-emerald-500/50 transition-all duration-500 shadow-lg">
            <div className="bg-white dark:bg-[#0c0c0c] rounded-[15px] p-3 md:p-4 flex flex-col md:flex-row items-stretch gap-3">
              <div className="flex-none md:w-48">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full h-14 justify-between px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 dark:hover:text-white transition-all group/btn"
                    >
                      <span className="flex items-center gap-3">
                        <Globe size={18} className="text-emerald-500" />
                        <span className="text-slate-900 dark:text-slate-200">
                          {ecosystems.find(e => e.id === formData.ecosystem)?.label}
                        </span>
                      </span>
                      <ChevronDown size={14} className="opacity-50 group-hover/btn:rotate-180 transition-transform duration-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 bg-white dark:bg-[#0c0c0c] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 backdrop-blur-xl">
                    {ecosystems.map((eco) => (
                      <DropdownMenuItem 
                        key={eco.id}
                        onClick={() => setFormData({...formData, ecosystem: eco.id})}
                        className="focus:bg-emerald-500/10 focus:text-emerald-600 dark:focus:text-emerald-400 cursor-pointer py-2.5"
                      >
                        {eco.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex-grow relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within/input:text-emerald-500 transition-colors">
                  <Package size={20} />
                </div>
                <input 
                  disabled={isLoading}
                  type="text"
                  placeholder="Package Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:bg-white dark:focus:bg-white/[0.08] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-slate-900 dark:text-white"
                />
              </div>
              <div className="md:w-40 relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within/input:text-emerald-500 transition-colors">
                  <Zap size={20} />
                </div>
                <input 
                  disabled={isLoading}
                  type="text"
                  placeholder="Version"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:bg-white dark:focus:bg-white/[0.08] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-slate-900 dark:text-white"
                />
              </div>
              <Button 
                onClick={handleRoute}
                disabled={isLoading}
                className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center gap-3 font-bold group/submit disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Analyze
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
        >
          <span className="opacity-50">Quick Check:</span>
          {[
            { eco: 'pypi', name: 'jinja2', ver: '2.11.2' },
            { eco: 'npm', name: 'next', ver: '15.5.4' }
          ].map((item) => (
            <button 
              key={item.name}
              onClick={() => setFormData({ecosystem: item.eco, name: item.name, version: item.ver})}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border-b border-transparent hover:border-emerald-500/50 pb-0.5"
            >
              {item.name}@{item.ver}
            </button>
          ))}
        </motion.div>
      </main>
      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 text-[10px] tracking-widest uppercase flex items-center gap-4">
        <span>Cloud Native</span>
        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-800" />
        <span>Enterprise Grade</span>
        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-800" />
        <span>Open Source Scorecard</span>
      </footer>
    </div>
  );
}