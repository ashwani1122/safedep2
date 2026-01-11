"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "./touggle-theme";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full text-slate-900 dark:bg-black dark:text-white bg-slate-50 border-b border-slate-100 pt-6 md:pt-10 transition-colors">
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
            <div className="relative w-9 sm:w-10 md:w-12 rounded overflow-hidden">
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
            <img
               
              src="Github-Symbol.png" 
              alt="GitHub" 
              className="invert brightness-0" 
              width={25} 
            />
            <span className="text-md">Install GitHub App</span>
          </button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}