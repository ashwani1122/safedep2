"use client";
import { useEffect, useState } from "react";
import {
  ShieldAlert,
  CheckCircle,
  Info,
  List,
  Scale,
} from "lucide-react";

interface Props {
  data: any;
}

// Updated StatBox to support Dark Mode
const StatBox = ({
  label,
  value,
  icon,
  valueColor = "text-slate-900 dark:text-white",
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  valueColor?: string;
}) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-4 flex flex-col justify-between h-24 transition-colors">
    <div className="flex items-center gap-2 mb-1">
      <div className="text-slate-400 dark:text-slate-500">{icon}</div>
      <span className="text-slate-500 dark:text-slate-400 text-[13px] font-medium">{label}</span>
    </div>
    <div className={`text-2xl font-medium ${valueColor}`}>{value}</div>
  </div>
);

export default function SecurityDashboard({ data }: Props) {
  const [activeTab, setActiveTab] = useState("Vulnerabilities");
  const [mounted, setMounted] = useState(false);

  // Safely extract data
  const pkg = data?.packageVersion?.package;
  const version = data?.packageVersion?.version;
  const insight = data?.insight;
  const vulnerabilities = insight?.vulnerabilities || [];
  const scorecard = insight?.scorecard?.overallScore?.toFixed(1) || "9.5";
  
  // Normalize license data
  const licenseList = Array.isArray(insight?.licenses)
    ? insight.licenses
    : insight?.licenses?.licenses || [];

  const versionsList = data?.insight?.availableVersions || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Helper Renderers ---

  const renderOverview = () => (
    <div className="p-8 md:p-12 max-w-5xl">
      {/* Summary Section - Thick Teal Border */}
      <div className="flex gap-6 mb-10">
        <div className="w-1.5 bg-teal-600 rounded-full shrink-0"></div>
        <div className="pt-1">
          <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-4">Summary</h3>
          <div className="space-y-4 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
            <p>
              This analysis was performed using <span className="text-slate-900 dark:text-white font-medium">vet</span> and SafeDep Cloud Malicious Package Analysis. Integrate with GitHub using vet-action GitHub Action.
            </p>
            <p>
              <span className="font-bold text-slate-700 dark:text-slate-300">Note:</span> This report is updated by a verification record
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Multiple files flagged for potential data exfiltration, XSS, and RCE vulnerabilities. <span className="text-slate-600 dark:text-slate-400">High confidence of malicious intent due to combined factors.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Verification Record - Thin Gray Border */}
      <div className="flex gap-6 mb-10">
        <div className="w-1 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0 ml-0.5"></div>
        <div className="pt-1">
          <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-4">Verification Record</h3>
          <p className="text-[15px] text-slate-600 dark:text-slate-400">
            Manual analysis confirmed that the package is clean.
          </p>
        </div>
      </div>

      {/* Details - Thin Gray Border */}
      <div className="flex gap-6">
        <div className="w-1 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0 ml-0.5"></div>
        <div className="pt-1">
          <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-4">Details</h3>
          <p className="mb-4 text-[15px] text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-700 dark:text-slate-300">Note:</span> This report is updated by a verification record</p>
          <div className="text-[15px] leading-7 text-slate-600 dark:text-slate-400">
            The package exhibits multiple concerning behaviors. Several files match the 'sys_net_recon_exfil' YARA rule, suggesting potential system and network information exfiltration. Additionally, the code constructs javascript: URLs and assigns them to formAction attributes, which can lead to XSS or RCE if user-controlled data is involved.
          </div>
        </div>
      </div>
    </div>
  );

  const renderVulnerabilities = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <tr className="text-slate-500 dark:text-slate-400 text-[12px] font-medium">
            <th className="px-6 py-4 font-medium w-64">Vulnerability ID</th>
            <th className="px-6 py-4 font-medium">Summary</th>
            <th className="px-6 py-4 font-medium w-32">Risk</th>
            <th className="px-6 py-4 font-medium w-32">Published</th>
            <th className="px-6 py-4 font-medium w-32">Modified</th>
          </tr>
        </thead>
        <tbody className="text-[14px] text-slate-700 dark:text-slate-300">
          {vulnerabilities.map((v: any, i: number) => {
            const risk = v.severities?.[0]?.risk?.replace("RISK_", "").toLowerCase() || "unspecified";
            
            // Badge Styles with Dark Mode Support
            const badgeBase = "px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1.5 w-fit border";
            let badgeStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";
            let iconColor = "bg-slate-400";
            let label = "Unspecified";

            if (risk === "low") {
              badgeStyle = "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/50";
              iconColor = "bg-cyan-400";
              label = "Low";
            } else if (risk === "medium") {
              badgeStyle = "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/50";
              iconColor = "bg-yellow-400";
              label = "Medium";
            } else if (risk === "high") {
              badgeStyle = "bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 border-pink-100 dark:border-pink-900/50";
              iconColor = "bg-pink-400";
              label = "High";
            } else if (risk === "critical") {
              badgeStyle = "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/50";
              iconColor = "bg-red-500";
              label = "Critical";
            }

            return (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-slate-900 dark:text-slate-100 align-top">{v.aliases?.[0]?.value || v.id?.value}</td>
                <td className="px-6 py-4 text-slate-900 dark:text-slate-300 align-top">{v.summary}</td>
                <td className="px-6 py-4 align-top">
                  <div className={badgeStyle + " " + badgeBase}>
                    <div className={`w-1.5 h-1.5 rounded-full ${iconColor}`} />
                    {label}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-500 align-top text-[13px]">08/10/2024</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-500 align-top text-[13px]">08/10/2024</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderVersions = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <tr className="text-slate-500 dark:text-slate-400 text-[13px] font-medium">
            <th className="px-6 py-4 w-1/3">Version</th>
            <th className="px-6 py-4 w-1/3">Published On</th>
            <th className="px-6 py-4 w-1/3 text-right"></th>
          </tr>
        </thead>
        <tbody className="text-[14px]">
          {versionsList.map((v: any, i: number) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-sm font-medium">{v.version}</span>
                    {v.defaultVersion && (
                        <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded text-[11px] font-medium">Latest</span>
                    )}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-900 dark:text-slate-300">
                 08/10/2024
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-[13px] font-medium">View Version</button>
              </td>
            </tr>
          ))}
          {[1,2,3,4].map((_, idx) => (
             <tr key={`fill-${idx}`} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4"><span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-sm font-medium">5.0.{idx}</span></td>
                <td className="px-6 py-4 text-slate-900 dark:text-slate-300">08/1{idx}/2024</td>
                <td className="px-6 py-4 text-right"><button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-[13px] font-medium">View Version</button></td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLicense = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <tr className="text-slate-500 dark:text-slate-400 text-[13px] font-medium">
            <th className="px-6 py-4 w-1/4">License ID</th>
            <th className="px-6 py-4 w-1/4">License Name</th>
            <th className="px-6 py-4 w-1/2">Reference URL</th>
          </tr>
        </thead>
        <tbody className="text-[14px]">
            <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">Apache-2.0</td>
                <td className="px-6 py-4 text-slate-900 dark:text-slate-300">Apache License 2.0</td>
                <td className="px-6 py-4 text-slate-900 dark:text-slate-400">https://www.apache.org/licenses/LICENSE-2.0</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">BSD-3-Clause</td>
                <td className="px-6 py-4 text-slate-900 dark:text-slate-300">BSD 3-Clause "New" or "Revised" License</td>
                <td className="px-6 py-4 text-slate-900 dark:text-slate-400">https://opensource.org/licenses/BSD-3-Clause</td>
            </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-slate-950 font-sans pb-10 pt-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          
          {/* Header Content */}
          <div className="p-8 pb-6">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded">
                 <img src="/githubsymbol.png" alt="Icon" width={32} className="opacity-80 dark:invert dark:opacity-90" />
               </div>
               <h1 className="text-3xl text-slate-900 dark:text-white font-medium">
                 {pkg?.name || "next"}
                 <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">@{version || "15.5.4"}</span>
               </h1>
            </div>

            {/* Metadata Lines */}
            <div className="space-y-1 mb-8">
                <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                    <span className="min-w-[80px]">Analysed at</span>
                    <span className="text-slate-900 dark:text-slate-200">24 Oct 2025, 10:06</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                    <span className="min-w-[80px]">Source</span>
                    <a href="#" className="text-slate-900 dark:text-slate-200 hover:underline truncate">
                       https://registry.npmjs.org/next/-/next-15.5.4.tgz
                    </a>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                    <span className="min-w-[80px]">SHA256</span>
                    <span className="font-mono text-xs text-slate-900 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1 rounded">5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                    <span className="min-w-[80px]">Confidence</span>
                    <span className="text-slate-900 dark:text-slate-200">5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9</span> 
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <StatBox label="Version" value={version || "1.2.4"} icon={<Info size={16} />} />
                <StatBox label="Vulnerabilities" value={vulnerabilities.length || "5"} icon={<ShieldAlert size={16} />} />
                <StatBox 
                    label="OpenSSF Scorecard" 
                    value={`${scorecard}/10`} 
                    valueColor="text-teal-500 dark:text-teal-400"
                    icon={<CheckCircle size={16} />} 
                />
                <StatBox label="License" value={licenseList[0]?.licenseId || "Apache-2.0"} icon={<Scale size={16} />} />
                <StatBox label="Ecosystem" value="Go" icon={<List size={16} />} />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-end bg-slate-50 dark:bg-slate-950/30 border-t border-slate-200 dark:border-slate-800 px-8">
            {["Overview", "Vulnerabilities", "Versions", "License"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                           px-6 py-3 text-[14px] font-medium mr-1 rounded-t transition-all
                           ${isActive 
                             ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-x border-t border-slate-200 dark:border-slate-800 translate-y-[1px] shadow-[0_-2px_5px_rgba(0,0,0,0.02)]" 
                             : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}
                        `}
                    >
                        {tab}
                    </button>
                )
            })}
          </div>

          {/* Tab Content Area */}
          <div className="bg-white dark:bg-slate-900 min-h-[400px] border-t border-slate-200 dark:border-slate-800 transition-colors">
             {activeTab === "Overview" && renderOverview()}
             {activeTab === "Vulnerabilities" && renderVulnerabilities()}
             {activeTab === "Versions" && renderVersions()}
             {activeTab === "License" && renderLicense()}
          </div>

        </div>
      </div>
    </div>
  );
}