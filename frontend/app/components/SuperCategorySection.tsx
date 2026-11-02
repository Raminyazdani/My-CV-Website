import React from "react";
import SkillList from "~/sections/SkillList";

interface SuperCategorySectionProps {
  title: string;
  subcategories: Record<string, any[]>;
}

export default function SuperCategorySection({ title, subcategories }: SuperCategorySectionProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(subcategories).map(([subcat, skills]) => (
          <div key={subcat} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">{subcat}</h3>
            <SkillList skills={skills} />
          </div>
        ))}
      </div>
    </div>
  );
} 