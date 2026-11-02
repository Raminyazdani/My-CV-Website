import React from "react";

interface Skill {
  id: number;
  long_name: string;
  short_name: string;
}

interface SkillListProps {
  skills: Skill[];
}

export default function SkillList({ skills }: SkillListProps) {
  if (!Array.isArray(skills)) {
    console.error("Skills is not an array:", skills);
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          {skill.long_name || skill.short_name}
        </span>
      ))}
    </div>
  );
}
