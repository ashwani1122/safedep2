// components/ContentSection.tsx
export default function ContentSection({ 
  title, 
  children, 
  accent 
}: { 
  title: string; 
  children: React.ReactNode; 
  accent: string 
}) {
  return (
    <div className={`border-l-4 ${accent} pl-6 py-1 transition-colors duration-300`}>
      <h2 className="text-[19px] font-semibold mb-3 text-slate-800 dark:text-slate-100 tracking-tight">
        {title}
      </h2>
      <div className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
}