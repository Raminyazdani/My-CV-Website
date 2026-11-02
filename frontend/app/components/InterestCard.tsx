import React from "react";

// Central gradient palette – can be extended
const gradients = [
  "from-green-400 to-emerald-500",
  "from-blue-400 to-indigo-500",
  "from-purple-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-teal-500",
  "from-fuchsia-400 to-rose-400",
  "from-lime-400 to-green-500",
  "from-yellow-400 to-amber-500"
];

interface Interest {
  id?: number;
  name: string;
  icon?: string;
  gradient?: string;
  description?: string;
}

export default function InterestCard({ interest, index }: { interest: Interest; index: number }) {
  // If API sends gradient, use it, else fallback by index
  const gradient = interest.gradient || gradients[index % gradients.length];
  const icon = interest.icon || "✨";
  const description = interest.description || "";

  return (
    <div
      tabIndex={0}
      className={`
        group relative
        overflow-visible
        rounded-xl
        bg-white/80 dark:bg-gray-900/80
        shadow-lg border border-gray-100 dark:border-gray-800
        px-5 pt-8 pb-5
        backdrop-blur-md
        hover:shadow-2xl hover:scale-[1.04] hover:-rotate-2
        transition-all duration-300
        min-h-[170px]
        focus:ring-2 focus:ring-emerald-400
      `}
      aria-label={interest.name}
    >
      {/* Floating Icon */}
      <div
        className={`
          absolute -top-7 left-1/2 -translate-x-1/2
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-gradient-to-br ${gradient}
          shadow-xl border-4 border-white dark:border-gray-900
          text-3xl text-white
          group-hover:animate-bounce
          z-10
        `}
        aria-hidden="true"
      >
        {icon}
      </div>
      {/* Gradient bar as visual accent */}
      <div
        className={`absolute top-0 left-0 w-full h-2 rounded-t-xl bg-gradient-to-r ${gradient} opacity-60`}
        aria-hidden="true"
      />
      {/* Content */}
      <h3 className="mt-8 mb-2 text-center text-lg font-semibold italic text-gray-800 dark:text-gray-100">
        {interest.name}
      </h3>
      {description && (
        <p className="text-xs text-center text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 px-2 py-1 rounded-md mt-2 shadow-sm">
          {description}
        </p>
      )}
    </div>
  );
}
