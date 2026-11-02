import React from "react";
import { motion } from "framer-motion";

// Map for role “theme” colors
const gradients: string[] = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-green-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-blue-600",
  "from-red-500 to-rose-600",
  "from-indigo-500 to-violet-600",
];

function getGradient(index: number) {
  return gradients[index % gradients.length];
}

// Clean icon
function getRoleIcon(index: number) {
  const iconCommon = "w-6 h-6";
  // You can swap or randomize for more variety
  return (
    <svg className={iconCommon} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" className="stroke-2" />
      <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDuration(duration: string) {
  const [start, end] = duration.split(" - ");
  const format = (d: string) =>
    d === "Present" || d === "Recent"
      ? d
      : new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short" });
  return `${format(start)} – ${format(end)}`;
}

export interface Experience {
  id?: number;
  role: string;
  institution?: string;
  duration: string;
  primaryFocus?: string;
  primary_focus?: string; // backward compatible
  description: string;
}

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) => {
  // Use new or fallback for backward compat
  const focus = exp.primaryFocus || exp.primary_focus;

  return (
    <motion.div
      className="experience-card relative pl-16 pb-12 group"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.10, type: "spring", duration: 0.7 }}
    >
      {/* Timeline Dot & Connector */}
      <motion.div className="absolute left-0 top-2 flex flex-col items-center z-20">
        {/* Icon Dot */}
        <motion.div
          className={`w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-br ${getGradient(
            index
          )} flex items-center justify-center shadow-xl group-hover:scale-110 transition-all`}
          whileHover={{
            y: [0, -8, 0],
            scale: 1.13,
            transition: { duration: 0.7, repeat: Infinity, repeatType: "reverse" },
          }}
        >
          {getRoleIcon(index)}
        </motion.div>
        {/* Vertical connector below */}
        <div className="w-1 grow mt-1 bg-gradient-to-b from-blue-300/60 to-indigo-400/30 rounded-full min-h-[32px]" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-2xl p-6 border border-blue-100 dark:border-blue-950/40 backdrop-blur-xl
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-blue-400/20 "
        whileHover={{ scale: 1.025, boxShadow: "0 10px 36px 0 rgba(60,130,246,0.12)" }}
      >
        <div className="flex flex-wrap justify-between items-center mb-1 gap-y-1">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
              {exp.role}
            </h3>
            {exp.institution && (
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 flex items-center">
                <svg className="w-4 h-4 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <span>{exp.institution}</span>
              </p>
            )}
          </div>
          <div className="text-xs md:text-sm text-gray-400 font-mono mt-1 md:mt-0 whitespace-nowrap">
            {formatDuration(exp.duration)}
          </div>
        </div>

        {focus && (
          <div className="mb-2 mt-1">
            <span className="text-xs font-semibold text-blue-800 dark:text-blue-200 bg-blue-100/60 dark:bg-blue-800/40 rounded px-2 py-0.5 shadow-sm">
              {focus}
            </span>
          </div>
        )}

        <p className="text-gray-700 dark:text-gray-200 mt-1 text-sm leading-relaxed whitespace-pre-line">
          {exp.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;
