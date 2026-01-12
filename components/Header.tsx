"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "./touggle-theme";
import { motion } from "framer-motion";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
        
        {/* Left Side: Logo Branding */}
        <motion.div 
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-4 cursor-pointer group" 
          onClick={() => router.push("/")}
        >
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
            <img
              src="/115209633.png"
              alt="SafeDep Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
              Powered by
            </span>
            <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
              SafeDep
            </span>
          </div>
        </motion.div>

        {/* Right Side: Action Button & Toggle */}
        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Documentation</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">API</a>
          </nav>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <button className="group relative flex items-center gap-2.5 bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full transition-all text-sm font-bold shadow-md hover:shadow-lg active:scale-95 overflow-hidden">
              {/* Subtle hover shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

              <img src="/githubsymbol.png" className="w-10 object-contain invert brightness-0" alt="" />
              <span className="relative">Install App</span>
            </button>
            
            <div className="scale-90 md:scale-100">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}