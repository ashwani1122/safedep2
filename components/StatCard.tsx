// components/StatCard.tsx
export default function StatCard({ label, value, icon, color = "text-slate-800" }: any) {
  return (
    <div className="flex flex-col p-4 border border-slate-200 rounded-md bg-white transition-colors duration-300 dark:bg-slate-900 dark:border-slate-800 justify-between">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-1 rounded bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          {icon}
        </span>
        <span className="text-[15px] text-slate-500 font-medium dark:text-slate-400">
          {label}
        </span>
      </div>
      <span className={`text-2xl font-semibold transition-colors duration-300 ${color} dark:text-slate-100`}>
        {value}
      </span>
    </div>
  );
}