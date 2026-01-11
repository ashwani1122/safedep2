"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Package, 
  Search, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Loader2, 
  ChevronDown 
} from "lucide-react";
import { ModeToggle } from "@/components/touggle-theme";
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
      // Construct dynamic route based on ecosystem, name, and version
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
    <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300 font-sans">
      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-6 uppercase tracking-wider">
          <ShieldCheck size={14} /> Next-Gen Software Supply Chain Security
        </div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          Secure your dependencies <br /> 
          <span className="text-[#008f7a]">before they reach production.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Instantly analyze packages across multiple ecosystems for vulnerabilities, 
          malicious intent, and scorecard health.
        </p>

        {/* Input Card */}
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 md:p-4 rounded-2xl shadow-xl">
          <form onSubmit={handleRoute} className="flex flex-col md:flex-row items-center gap-2">
            
            {/* Shadcn Ecosystem Dropdown */}
            <div className="w-full md:w-1/4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    disabled={isLoading}
                    className="w-full justify-between py-6 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="text-slate-400" size={18} />
                      {ecosystems.find(e => e.id === formData.ecosystem)?.label}
                    </div>
                    <ChevronDown size={16} className="text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 dark:bg-slate-900 dark:border-slate-800">
                  {ecosystems.map((eco) => (
                    <DropdownMenuItem 
                      key={eco.id}
                      onClick={() => setFormData({...formData, ecosystem: eco.id})}
                      className="cursor-pointer dark:text-slate-300 dark:focus:bg-slate-800"
                    >
                      {eco.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Name Input */}
            <div className="relative w-full md:w-2/4">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                disabled={isLoading}
                type="text"
                required
                placeholder="Package Name (e.g. django)"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-[#008f7a] font-medium disabled:opacity-50"
              />
            </div>

            {/* Version Input */}
            <div className="relative w-full md:w-1/4">
              <Zap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                disabled={isLoading}
                type="text"
                required
                placeholder="Version"
                value={formData.version}
                onChange={(e) => setFormData({...formData, version: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-[#008f7a] font-medium disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <Button 
              disabled={isLoading}
              type="submit"
              className="cursor-pointer w-full md:w-auto bg-[#008f7a] hover:bg-[#007a68] text-white px-10 py-6 rounded-xl transition-all shadow-md flex items-center gap-2  font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : (
                <>
                  Get Started
                  <Search size={18} />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-slate-400 font-medium">
          <span>Popular:</span>
          <button 
            disabled={isLoading}
            onClick={() => setFormData({ecosystem: 'pypi', name: 'jinja2', version: '2.11.2'})} 
            className="hover:text-[#008f7a] transition-colors disabled:opacity-50"
          >
            jinja2@2.11.2
          </button>
          <button 
            disabled={isLoading}
            onClick={() => setFormData({ecosystem: 'npm', name: 'next', version: '15.5.4'})} 
            className="hover:text-[#008f7a] transition-colors disabled:opacity-50"
          >
            next@15.5.4
          </button>
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#008f7a] to-transparent blur-[120px]" />
      </div>
    </div>
  );
}