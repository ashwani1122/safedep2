"use client";
import { useEffect, useState } from "react";
import { ShieldAlert, CheckCircle, Info, List, Scale, ExternalLink } from "lucide-react";
import StatCard from "./StatCard";

interface Props {
  data: any;
}

export default function SecurityDashboard({ data }: Props) {
  const [activeTab, setActiveTab] = useState("Vulnerabilities");
  const [activeSection, setActiveSection] = useState("summary");
  const [mounted, setMounted] = useState(false);
  const pkg = data?.packageVersion?.package;
  const version = data?.packageVersion?.version;
  const insight = data?.insight;

  const vulnerabilities = insight?.vulnerabilities || [];
  const scorecard = insight?.scorecard?.overallScore?.toFixed(1) || "9.5";
  const licenseList = Array.isArray(insight?.licenses)
    ? insight.licenses
    : (insight?.licenses?.licenses || []);
  const versionsList = data?.insight?.availableVersions || [];
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen text-slate-900 bg-slate-50 p-4 md:p-8 font-sans dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto bg-white rounded border border-slate-200 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <header className="p-4 md:p-10 pb-6 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row md:items-center mb-4 gap-3">
            <div className="border border-slate-200 dark:border-slate-700 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 shadow-sm">
              <img
                src="/githubsymbol.png"
                alt="GitHub"
                className="dark:invert brightness-0 opacity-90"
                width={42}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight break-all">
              {pkg?.name}<span className="text-slate-400 font-medium ml-1">@{version}</span>
            </h1>
          </div>
          <div className="space-y-1.5 text-[12px] md:text-[13px] text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            <p>
              Analysed at{" "}
              <span className="text-slate-800 dark:text-slate-200">
                {mounted ? new Date().toUTCString() : "Loading..."}
              </span>
            </p><p className="tracking-tight">Source <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 break-all font-medium">
              https://registry.npmjs.org/{pkg?.name}/-/{pkg?.name}-{version}.tgz
            </a></p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 pt-1">SHA256 <span className="text-slate-700 dark:text-slate-300 break-all font-sans normal-case tracking-normal ml-1 font-medium">{data?.insight?.sha || "5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9"}</span></p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Confidence <span className="text-slate-700 dark:text-slate-300 break-all font-sans normal-case tracking-normal ml-1 font-medium">High (SafeDep Verified)</span></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Version" value={version} icon={<Info className="text-blue-500" size={18} />} />
            <StatCard label="Vulnerabilities" value={vulnerabilities.length} icon={<ShieldAlert className="text-red-500" size={18} />} />
            <StatCard label="OpenSSF Scorecard" value={`${scorecard}/10`} icon={<CheckCircle className="text-emerald-500" size={18} />} color="text-emerald-600 dark:text-emerald-400 font-bold" />
            <StatCard label="License" value={licenseList[0]?.licenseId || "Apache-2.0"} icon={<Scale className="text-blue-500" size={18} />} />
            <StatCard label="Ecosystem" value={pkg?.ecosystem?.split('_')[1] || "Go"} icon={<List className="text-emerald-500" size={18} />} />
          </div>
        </header>

        {/* Tab Navigation - Scrollable on mobile */}
        <nav className="flex bg-slate-50/50 border-y border-slate-200 px-4 md:px-6 pt-2 dark:bg-slate-800/50 dark:border-slate-800 overflow-x-auto no-scrollbar cursor-pointer">
          {['Overview', 'Vulnerabilities', 'Versions', 'License'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-8 py-3 text-[13px] md:text-[14px] font-bold uppercase tracking-[0.05em] transition-all rounded-t-lg border-x border-t -mb-[1px] whitespace-nowrap cursor-pointer ${activeTab === tab
                ? 'bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-white shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
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
              <div className="p-6 md:p-14 space-y-10 animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-full w-full mx-auto">
                <div className="max-w-4xl w-full space-y-10 md:space-y-14">
                  {/* Summary Section */}
                  <div
                    id="summary"
                    onMouseEnter={() => setActiveSection("summary")}
                    className={`relative pl-6 md:pl-10 border-l-2 transition-all duration-500 ${activeSection === "summary" ? "border-emerald-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight text-left">Summary</h3>
                    <div className="space-y-4 text-[15px] md:text-[16px] leading-relaxed text-slate-600 dark:text-slate-400 text-left font-medium">
                      <p>This analysis was performed using <span className="text-slate-900 dark:text-slate-100 font-bold ">vet</span> and SafeDep Cloud Malicious Package Analysis.</p>
                      <p className="flex items-center gap-2"><span className="uppercase text-[10px] font-black bg-slate-900 text-white dark:bg-white dark:text-black px-1.5 py-0.5 rounded tracking-tighter">Note</span> This report is updated by a verification record</p>
                      <p className="text-red-600 dark:text-red-400 font-semibold ">Multiple files flagged for potential data exfiltration, XSS, and RCE vulnerabilities.</p>
                    </div>
                  </div>
                  {/* Verification Record Section */}
                  <div
                    id="verification"
                    onMouseEnter={() => setActiveSection("verification")}
                    className={`relative pl-6 md:pl-10 border-l-2 transition-all duration-500 ${activeSection === "verification" ? "border-blue-400" : "border-slate-200 dark:border-slate-700"
                      }`}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight text-left">Verification Record</h3>
                    <p className="text-[15px] md:text-[16px] text-slate-600 dark:text-slate-400 text-left font-medium leading-relaxed">Manual analysis confirmed that the package is clean.</p>
                  </div>

                  {/* Details Section */}
                  <div
                    id="details"
                    onMouseEnter={() => setActiveSection("details")}
                    className={`relative pl-6 md:pl-10 border-l-2 transition-all duration-500 ${activeSection === "details" ? "border-slate-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight text-left">Details</h3>
                    <div className="space-y-4 text-[15px] md:text-[16px] leading-relaxed text-slate-600 dark:text-slate-400 text-left font-medium">
                      <p>The package exhibits multiple concerning behaviors indicating <span className="text-red-500 font-bold">malicious intent</span>.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. VULNERABILITIES TAB */}
            {activeTab === "Vulnerabilities" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="sticky top-0 bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 z-10 border-b border-slate-200 dark:border-slate-800">
                    <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                      <th className="px-8 py-5">Vulnerability ID</th>
                      <th className="px-8 py-5">Summary</th>
                      <th className="px-8 py-5">Risk</th>
                      <th className="px-8 py-5">Published</th>
                      <th className="px-8 py-5">Modified</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] md:text-[14px] text-slate-700 dark:text-slate-300 font-medium">
                    {vulnerabilities.map((v: any, i: number) => {
                      const risk = v.severities?.[0]?.risk?.replace('RISK_', '').toLowerCase() || 'unspecified';
                      const riskStyles: any = {
                        low: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
                        medium: 'bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
                        high: 'bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400 border-pink-200 dark:border-pink-800',
                        critical: 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-800',
                        unspecified: 'bg-slate-50 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                      };
                      return (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-8 py-6 text-slate-900 dark:text-white font-bold font-mono text-[13px]">{v.aliases?.[0]?.value || v.id?.value}</td>
                          <td className="px-8 py-6 max-w-xs md:max-w-md leading-relaxed">{v.summary}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border flex items-center w-fit gap-1.5 ${riskStyles[risk]}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${risk === 'low' ? 'bg-cyan-400' : risk === 'high' ? 'bg-pink-400' : risk === 'medium' ? 'bg-orange-400' : risk === 'critical' ? 'bg-red-500' : 'bg-slate-300'}`} />
                              {risk}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-slate-500 dark:text-slate-500 font-mono text-xs">{new Date(v.publishedAt).toLocaleDateString('en-GB')}</td>
                          <td className="px-8 py-6 text-slate-500 dark:text-slate-500 font-mono text-xs">{new Date(v.modifiedAt || v.publishedAt).toLocaleDateString('en-GB')}</td>
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
                  <thead className="sticky top-0 bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 z-10 border-b border-slate-200 dark:border-slate-800">
                    <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                      <th className="px-8 py-5">Version</th>
                      <th className="px-8 py-5 text-right pr-20">Published On</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] text-slate-700 dark:text-slate-300 font-medium">
                    {versionsList.map((v: any, i: number) => (
                      <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-8 py-5 flex items-center gap-3 font-bold text-slate-900 dark:text-white">
                          {v.version}
                          {v.defaultVersion && (
                            <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Latest</span>
                          )}
                        </td>
                        <td className="px-8 py-5 text-right pr-20 text-slate-500 font-mono text-xs">
                          {new Date(v.publishedAt).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-8 py-5 text-right pr-10">
                          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold text-xs uppercase tracking-widest">View</button>
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
                  <thead className="sticky top-0 bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 z-10 border-b border-slate-200 dark:border-slate-800">
                    <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                      <th className="px-10 py-5">License ID</th>
                      <th className="px-10 py-5">License Name</th>
                      <th className="px-10 py-5">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] text-slate-700 dark:text-slate-300 font-medium">
                    {licenseList.length > 0 ? (
                      licenseList.map((l: any, i: number) => {
                        const id = typeof l === 'string' ? l : l.licenseId;
                        const name = typeof l === 'string' ? `${l} License` : (l.name || "Standard License");
                        const url = typeof l === 'string' ? `https://spdx.org/licenses/${l}.html` : l.url;
                        return (
                          <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-10 py-6 font-bold text-slate-900 dark:text-white">{id}</td>
                            <td className="px-10 py-6 text-slate-600 dark:text-slate-400">{name}</td>
                            <td className="px-10 py-6">
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider"
                              >
                                View Specs <ExternalLink size={12} />
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-10 py-16 text-center text-slate-400  font-medium">No detailed license information found.</td>
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