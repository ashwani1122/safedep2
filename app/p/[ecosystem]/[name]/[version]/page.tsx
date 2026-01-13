// app/p/[ecosystem]/[name]/[version]/page.tsx
import { getPackageInsight } from "@/app/actions/safedep";
import SecurityDashboard from "@/components/Body";

export default async function InsightPage({ 
  params 
}: { 
  params: Promise<{ ecosystem: string; name: string; version: string }> 
}) {
  const resolvedParams = await params;
  const { ecosystem, name, version } = resolvedParams;

  const { data, error } = await getPackageInsight(ecosystem, name, version);
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md border border-red-100">
          <h1 className="text-red-600 font-bold text-xl mb-2">API Error</h1>
          <p className="text-slate-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }
  return <SecurityDashboard data={data} />;
}