import React from "react";
import SkillList from "./SkillList";

interface Skill {
  id: number;
  long_name: string;
  short_name: string;
}

interface SubCategoryCardProps {
  title: string;
  skills: Skill[];
  index: number;
  color: string;
}

const iconPaths = [
  "M4 6h16M4 12h16M4 18h16",
  "M5 13l4 4L19 7",
  "M12 4v16M4 12h16",
  "M3 7h18M3 12h18M3 17h18",
  "M12 8v4l3 3",
  "M13 16h-1v-4h-1m1-4h.01",
  "M4 4h16v16H4z",
  "M5 12h14",
];

const getIconPath = (index: number) => iconPaths[index % iconPaths.length];

export default function SubCategoryCard({ title, skills, index, color }: SubCategoryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all">
      <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 mr-2 text-${color}-500`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={getIconPath(index)} />
        </svg>
        {title}
      </h4>
      <SkillList skills={skills} />
    </div>
  );
}
