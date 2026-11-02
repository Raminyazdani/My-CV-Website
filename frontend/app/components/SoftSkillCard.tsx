// components/SoftSkillCard.tsx
import React from "react";

const icons = [
  { gradient: "from-blue-400 to-indigo-500", icon: "🌟" },
  { gradient: "from-purple-400 to-pink-500", icon: "🧠" },
  { gradient: "from-emerald-400 to-teal-500", icon: "🤝" },
  { gradient: "from-amber-400 to-orange-500", icon: "🗂️" },
  { gradient: "from-cyan-400 to-blue-500", icon: "✍️" },
  { gradient: "from-fuchsia-400 to-pink-500", icon: "🔄" },
  { gradient: "from-red-400 to-orange-500", icon: "⏰" },
  { gradient: "from-violet-400 to-purple-500", icon: "🔗" },
  { gradient: "from-green-400 to-emerald-500", icon: "🔬" },
  { gradient: "from-indigo-400 to-blue-500", icon: "🚀" },
];

export default function SoftSkillCard({
  skill,
  index,
}: {
  skill: { name: string; description?: string };
  index: number;
}) {
  const { gradient, icon } = icons[index % icons.length] ?? icons[0];
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
        {skill.name}
      </span>
      {skill.description && (
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 sm:ml-4">
          {skill.description}
        </span>
      )}
    </div>
  );
}
