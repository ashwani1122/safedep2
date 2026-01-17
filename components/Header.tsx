"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "./touggle-theme";
import Image from "next/image";
import { Github } from "lucide-react"; // Using Lucide icon for consistency if you have it, else keep Image

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300
            bg-[#F1F5F9]/80 dark:bg-slate-950/80 backdrop-blur-md 
            border-b border-slate-200 dark:border-slate-800">
      
      {/* Container aligned with the Dashboard's max-w-7xl */}
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center px-4 md:px-8 py-4">

        {/* -- LEFT: Logo Section -- */}
        <div
          className="flex flex-col items-start cursor-pointer group"
          onClick={() => router.push("/")}
        >
          {/* Matches the 'Powered By' style from the dashboard exactly */}
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            POWERED BY
          </span>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded overflow-hidden flex-shrink-0">
               {/* Note: If you want to use the Box icon like the dashboard, replace this Image with:
                 <div className="w-full h-full bg-emerald-500 rounded-sm flex items-center justify-center text-white"><Box size={20} strokeWidth={3} /></div>
               */}
              <img
                src="/115209633.png"
                alt="SafeDep Logo"
                className="w-full h-full object-contain dark:invert opacity-90 group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold font-sans text-slate-700 dark:text-white tracking-tight">
              SafeDep
            </span>
          </div>
        </div>

        {/* -- RIGHT: Actions -- */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white px-3 py-2 md:px-4 rounded shadow-sm transition-all">
            {/* Switched to Image to match your request, but handled invert for dark mode if needed */}
            <div className="w-5 h-5 relative">
                <Image
                src="/githubsymbol.png"
                alt="GitHub"
                fill
                className="object-contain invert brightness-0"
                />
            </div>
            
            <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
              Install GitHub App
            </span>
            <span className="inline sm:hidden text-sm font-medium">
              Install
            </span>
          </button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}