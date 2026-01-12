"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "./touggle-theme";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  return (
<header className="sticky top-0 z-50 w-full transition-all duration-300
                   /* Background & Glassmorphism */
                   bg-slate-50/80 dark:bg-black/80 backdrop-blur-md 
                   /* Border for separation */
                   border-b border-slate-200/60 dark:border-white/10
                   /* Text Colors */
                   text-slate-900 dark:text-white 
                   /* Spacing */
                   ">      
                   <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center p-4 gap-4 md:gap-0">
        
        {/* Left Side: Logo Branding - Now Clickable */}
        <div 
          className="flex flex-col items-center md:items-start cursor-pointer group" 
          onClick={() => router.push("/")}
        >
          <span className="text-lg md:text-md text-slate-400 mb-1 tracking-wider group-hover:text-[#008f7a] transition-colors">
            POWERED BY
          </span>
          <div className="flex items-center gap-2">
            <div className="relative sm:w-6 md:w-8 rounded overflow-hidden">
              <img
                src="/115209633.png"
                alt="SafeDep Logo"
                className="object-contain rounded transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl font-medium font-sans dark:text-white text-slate-800 tracking-tight">
              SafeDep
            </span>
          </div>
        </div>

        {/* Right Side: Action Button & Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
          <button className="flex items-center gap-2 bg-[#008f7a] hover:bg-[#007a68] text-white px-3 md:px-4 py-2 rounded transition-all text-sm md:text-md font-semibold shadow-sm whitespace-nowrap">
            <Image 
                src="/githubsymbol.png" 
                alt="GitHub" 
                className="invert brightness-0" 
                width={25} 
                height={25} 
                />
            <span className="text-md">Install GitHub App</span>
          </button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}