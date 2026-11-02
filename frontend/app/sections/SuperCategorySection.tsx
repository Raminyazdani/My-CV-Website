import React from "react";
import SubCategoryCard from "./SubCategoryCard";

interface Skill {
  id: number;
  long_name: string;
  short_name: string;
}

interface SuperCategorySectionProps {
  title: string;
  subcategories: Record<string, Skill[]>;
  color: string;
}

export default function SuperCategorySection({ title, subcategories, color }: SuperCategorySectionProps) {
  return (
    <div className="rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-indigo-100 dark:border-indigo-800 backdrop-blur-xl">
      {/* Header */}
      <div className={`bg-${color}-600 px-6 py-4 rounded-t-2xl`}>
        <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
      </div>

      {/* Subcategories */}
      <div className="flex flex-col gap-4 p-4">
  {Object.entries(subcategories).map(([subcatTitle, skills], idx) => (
    <SubCategoryCard key={subcatTitle} title={subcatTitle} skills={skills} index={idx} color={color} />
  ))}
</div>


    </div>
  );
}