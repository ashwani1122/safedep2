"use client";
import { useState } from "react";
import { ShieldAlert, CheckCircle, Info, Github, List, Scale, ExternalLink } from "lucide-react";
import StatCard from "./StatCard";

interface Props {
  data: any;
}

export default function SecurityDashboard({ data }: Props) {
  const [activeTab, setActiveTab] = useState("Vulnerabilities");
  const [activeSection, setActiveSection] = useState("summary");

  const pkg = data?.packageVersion?.package;
  const version = data?.packageVersion?.version;
  const insight = data?.insight;
  
  const vulnerabilities = insight?.vulnerabilities || [];
  const scorecard = insight?.scorecard?.overallScore?.toFixed(1) || "9.5";
  const licenseList = Array.isArray(insight?.licenses) 
  ? insight.licenses 
  : (insight?.licenses?.licenses || []);
  const versionsList = data?.insight?.availableVersions || [];

  return (
    <div className="min-h-screen text-slate-900 bg-slate-50 p-4 md:p-8 font-sans dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto bg-white rounded border border-slate-200 overflow-hidden dark:bg-slate-900 dark:border-slate-800 shadow-sm">
        
        {/* Header Metadata Section */}
        <header className="p-4 md:p-8 pb-4 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row md:items-center mb-2">
            <div className="border py-1 rounded mx-1 hover:bg-slate-100">
            <img 
              src="/Github-Symbol.png" 
              alt="GitHub" 
              className="dark:invert brightness-0" 
              width={42} // Adjusted for better mobile scale
            />
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 break-all">
              {pkg?.name}@{version}
            </h1>
          </div>
          
          <div className="space-y-1 text-[12px] md:text-[13px] text-slate-500 dark:text-slate-400 mb-8">
            <p>Analysed at <span className="text-slate-800 dark:text-slate-200">{new Date().toUTCString()}</span></p>
            <p>Source <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 break-all">
              https://registry.npmjs.org/{pkg?.name}/-/{pkg?.name}-{version}.tgz
            </a></p>
            <p className="font-mono">SHA256 <span className="text-slate-800 dark:text-slate-200 break-all">5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9</span></p>
            <p className="font-mono">Confidence <span className="text-slate-800 dark:text-slate-200 break-all">5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9</span></p>
          </div>

          {/* Stat Cards Grid - Responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Version" value={version} icon={<Info className="text-blue-500" size={18}/>} />
            <StatCard label="Vulnerabilities" value={vulnerabilities.length} icon={<ShieldAlert className="text-red-500" size={18}/>} />
            <StatCard label="OpenSSF Scorecard" value={`${scorecard}/10`} icon={<CheckCircle className="text-emerald-500" size={18}/>} color="text-emerald-600 dark:text-emerald-400" />
            <StatCard label="License" value={licenseList[0]?.licenseId || "Apache-2.0"} icon={<Scale className="text-blue-500" size={18}/>} />
            <StatCard label="Ecosystem" value={pkg?.ecosystem?.split('_')[1] || "Go"} icon={<List className="text-emerald-500" size={18}/>} />
          </div>
        </header>

        {/* Tab Navigation - Scrollable on mobile */}
        <nav className="flex bg-slate-100/50 border-y border-slate-200 px-4 md:px-6 pt-2 dark:bg-slate-800/50 dark:border-slate-800 overflow-x-auto no-scrollbar cursor-pointer">
          {['Overview', 'Vulnerabilities', 'Versions', 'License'].map((tab) => (
            <button 
  key={tab} 
  onClick={() => setActiveTab(tab)}
  className={`px-4 md:px-6 py-2.5 text-[13px] md:text-[14px] font-medium transition-all rounded-t-md border-x border-t -mb-[1px] whitespace-nowrap cursor-pointer ${
    activeTab === tab 
    ? 'bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-white' 
    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
  }`}
>
  {tab}
</button>
          ))}
        </nav>

        <main className="p-0 dark:bg-slate-900">
          <div id="scroll-box" className="h-[450px] md:h-[550px] overflow-y-auto no-scrollbar scroll-smooth">
            
            {/* 1. OVERVIEW TAB */}
           {activeTab === "Overview" && (
  <div className="p-6 md:p-10 space-y-8 md:space-y-12 animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-full w-full mx-auto">
    <div className="max-w-4xl w-full space-y-8 md:space-y-12">
      {/* Summary Section */}
      <div 
        id="summary"
        onMouseEnter={() => setActiveSection("summary")}
        className={`relative pl-4 md:pl-6 border-l-4 transition-colors duration-500 ${
          activeSection === "summary" ? "border-emerald-500" : "border-slate-200 dark:border-slate-700"
        }`}
      >
        <h3 className="text-[17px] md:text-[19px] font-semibold text-slate-800 dark:text-slate-100 mb-3 text-left">Summary</h3>
        <div className="space-y-4 text-[14px] md:text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 text-left">
          <p>This analysis was performed using vet and SafeDep Cloud Malicious Package Analysis.</p>
          <p><span className="font-bold text-slate-700 dark:text-slate-300">Note:</span> This report is updated by a verification record</p>
          <p>Multiple files flagged for potential data exfiltration, XSS, and RCE vulnerabilities.</p>
        </div>
      </div>

      {/* Verification Record Section */}
      <div 
        id="verification"
        onMouseEnter={() => setActiveSection("verification")}
        className={`relative pl-4 md:pl-6 border-l-4 transition-colors duration-500 ${
          activeSection === "verification" ? "border-blue-400" : "border-slate-200 dark:border-slate-700"
        }`}
      >
        <h3 className="text-[17px] md:text-[19px] font-semibold text-slate-800 dark:text-slate-100 mb-3 text-left">Verification Record</h3>
        <p className="text-[14px] md:text-[15px] text-slate-500 dark:text-slate-400 text-left">Manual analysis confirmed that the package is clean.</p>
      </div>

      {/* Details Section */}
      <div 
        id="details"
        onMouseEnter={() => setActiveSection("details")}
        className={`relative pl-4 md:pl-6 border-l-4 transition-colors duration-500 ${
          activeSection === "details" ? "border-slate-500" : "border-slate-200 dark:border-slate-700"
        }`}
      >
        <h3 className="text-[17px] md:text-[19px] font-semibold text-slate-800 dark:text-slate-100 mb-3 text-left">Details</h3>
        <div className="space-y-4 text-[14px] md:text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 text-left">
          <p><span className="font-bold text-slate-700 dark:text-slate-300">Note:</span> This report is updated by a verification record</p>
          <p>The package exhibits multiple concerning behaviors indicating malicious intent.</p>
        </div>
      </div>
    </div>
  </div>
)}

            {/* 2. VULNERABILITIES TAB */}
            {activeTab === "Vulnerabilities" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <tr className="text-slate-500 dark:text-slate-400 text-[12px] md:text-[13px] border-b border-slate-200 dark:border-slate-800">
                      <th className="px-4 md:px-8 py-4 font-semibold">Vulnerability ID</th>
                      <th className="px-4 md:px-8 py-4 font-semibold">Summary</th>
                      <th className="px-4 md:px-8 py-4 font-semibold">Risk</th>
                      <th className="px-4 md:px-8 py-4 font-semibold">Published</th>
                      <th className="px-4 md:px-8 py-4 font-semibold">Modified</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] md:text-[14px] text-slate-700 dark:text-slate-300">
                    {vulnerabilities.map((v: any, i: number) => {
                      const risk = v.severities?.[0]?.risk?.replace('RISK_', '').toLowerCase() || 'unspecified';
                      const riskStyles: any = {
                        low: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400',
                        medium: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
                        high: 'bg-pink-50 text-pink-600 dark:bg-pink-950/30 dark:text-pink-400',
                        critical: 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400',
                        unspecified: 'bg-slate-50 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                      };
                      return (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-4 md:px-8 py-5 text-slate-600 dark:text-slate-400 font-medium">{v.aliases?.[0]?.value || v.id?.value}</td>
                          <td className="px-4 md:px-8 py-5 max-w-xs md:max-w-md truncate">{v.summary}</td>
                          <td className="px-4 md:px-8 py-5">
                            <span className={`px-2 py-0.5 rounded text-[10px] md:text-[11px] font-bold uppercase flex items-center w-fit gap-1.5 ${riskStyles[risk]}`}>
                               <div className={`w-1.5 h-1.5 rounded-full ${risk === 'low' ? 'bg-cyan-400' : risk === 'high' ? 'bg-pink-400' : risk === 'medium' ? 'bg-orange-400' : risk === 'critical' ? 'bg-red-500' : 'bg-slate-300'}`} />
                               {risk}
                            </span>
                          </td>
                          <td className="px-4 md:px-8 py-5 text-slate-500 dark:text-slate-400">{new Date(v.publishedAt).toLocaleDateString('en-GB')}</td>
                          <td className="px-4 md:px-8 py-5 text-slate-500 dark:text-slate-400">{new Date(v.modifiedAt || v.publishedAt).toLocaleDateString('en-GB')}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. VERSIONS TAB */}
            {activeTab === "Versions" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <tr className="text-slate-500 dark:text-slate-400 text-[13px] border-b border-slate-200 dark:border-slate-800">
                      <th className="px-4 md:px-8 py-4 font-semibold">Version</th>
                      <th className="px-4 md:px-8 py-4 font-semibold text-right pr-10 md:pr-20">Published On</th>
                      <th className="px-4 md:px-8 py-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] md:text-[14px] text-slate-700 dark:text-slate-300">
                    {versionsList.map((v: any, i: number) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="px-4 md:px-8 py-4 font-medium flex items-center gap-2 md:gap-3">
                          {v.version}
                          {v.defaultVersion && (
                            <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Latest</span>
                          )}
                        </td>
                        <td className="px-4 md:px-8 py-4 text-right pr-10 md:pr-20 text-slate-600 dark:text-slate-400">
                          {new Date(v.publishedAt).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-4 md:px-8 py-4 text-right">
                          <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-[12px] md:text-[13px] font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 4. LICENSE TAB */}
            {activeTab === "License" && (
              <div className="overflow-x-auto animate-in fade-in duration-300">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <tr className="text-slate-500 dark:text-slate-400 text-[13px] border-b border-slate-200 dark:border-slate-800">
                      <th className="px-8 py-4 font-semibold">License ID</th>
                      <th className="px-8 py-4 font-semibold">License Name</th>
                      <th className="px-8 py-4 font-semibold">Reference URL</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] md:text-[14px] text-slate-700 dark:text-slate-300">
                    {licenseList.length > 0 ? (
                      licenseList.map((l: any, i: number) => {
                        const id = typeof l === 'string' ? l : l.licenseId;
                        const name = typeof l === 'string' ? `${l} License` : (l.name || "Standard License");
                        const url = typeof l === 'string' ? `https://spdx.org/licenses/${l}.html` : l.url;
                        return (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                            <td className="px-8 py-5 font-medium">{id}</td>
                            <td className="px-8 py-5 text-slate-600 dark:text-slate-400">{name}</td>
                            <td className="px-8 py-5">
                              <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[150px] md:max-w-xs block text-[12px] md:text-[13px]"
                              >
                                {url || "reference url not available for this license"}
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-8 py-10 text-center text-slate-400 italic">No detailed license information found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}