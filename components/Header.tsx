"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "./touggle-theme";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300
            bg-slate-50/80 dark:bg-black/80 backdrop-blur-md 
            border-b border-slate-200/60 dark:border-white/10
            text-slate-900 dark:text-white">
      {/* Changed flex-col to flex-row for better mobile space usage */}
      <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-between items-center p-4">
        
        {/* -- LEFT: Logo Section -- */}
        <div
          className="flex flex-col items-start cursor-pointer group"
          onClick={() => router.push("/")}
        >
          {/* Hide 'POWERED BY' on very small screens to save space, or make it tiny */}
          <span className="text-[10px] md:text-xs text-slate-400 mb-0.5 tracking-wider group-hover:text-[#008f7a] transition-colors font-semibold">
            POWERED BY
          </span>
          
          <div className="flex items-center gap-2">
            {/* FIX: Added 'w-8' base class so it shows on mobile. Removed 'relative' as it's often not needed for simple img tags unless using fill */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded overflow-hidden flex-shrink-0">
              <img
                src="/115209633.png"
                alt="SafeDep Logo"
                className="w-full h-full object-contain transition-transform group-hover:scale-105 dark:invert"
              />
            </div>
            <span className="text-xl md:text-3xl font-bold font-sans dark:text-white text-slate-800 tracking-tight">
              SafeDep
            </span>
          </div>
        </div>

        {/* -- RIGHT: Actions -- */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="flex items-center gap-2 bg-[#008f7a] hover:bg-[#007a68] text-white px-3 py-2 md:px-4 rounded transition-all shadow-sm">
            <Image
              src="/githubsymbol.png"
              alt="GitHub"
              className="invert brightness-0 w-8  md:w-8"
              width={24}
              height={24}
            />
            {/* On mobile, hide text "Install..." if screen is too tight, or keep text-sm */}
            <span className="hidden sm:inline text-sm md:text-md font-semibold whitespace-nowrap">
              Install GitHub App
            </span>
            {/* Optional: Show shorter text on mobile */}
            <span className="inline sm:hidden text-sm font-semibold">
              Install
            </span>
          </button>
          
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}