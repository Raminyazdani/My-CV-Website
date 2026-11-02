import React from "react";

// Color config (same as yours)
const colors = [
  { gradient: "from-blue-700 to-indigo-600", accent: "border-blue-500", icon: "🪪" },
  { gradient: "from-violet-700 to-purple-500", accent: "border-violet-500", icon: "📜" },
  { gradient: "from-indigo-700 to-fuchsia-600", accent: "border-fuchsia-500", icon: "✅" },
  { gradient: "from-gray-700 to-blue-500", accent: "border-gray-400", icon: "🏢" },
  { gradient: "from-emerald-700 to-blue-400", accent: "border-emerald-500", icon: "🌟" },
];

export default function ReferenceCard({ reference, index }: { reference: any; index: number }) {
  const color = colors[index % colors.length];

  return (
    <div
      tabIndex={0}
      className={`
        relative group
        rounded-xl
        bg-white/75 dark:bg-gray-900/80
        shadow-lg border-2 ${color.accent} border-opacity-30
        overflow-visible
        p-5
        transition-all duration-300
        hover:shadow-2xl hover:border-opacity-80
        hover:-translate-y-1
        focus:ring-2 focus:ring-indigo-400
        min-h-[230px]
      `}
      aria-label={`Reference: ${reference.name}`}
    >
      {/* Floating Icon */}
      <div
        className={`
          absolute -top-8 left-1/2 -translate-x-1/2
          w-14 h-14 rounded-full bg-gradient-to-br ${color.gradient}
          flex items-center justify-center
          text-3xl text-white
          shadow-xl border-4 border-white dark:border-gray-900
          group-hover:scale-110 transition
          z-10
        `}
        aria-hidden="true"
      >
        {color.icon}
      </div>
      {/* Gradient bar for distinction */}
      <div
        className={`absolute top-0 left-0 w-full h-2 rounded-t-xl bg-gradient-to-r ${color.gradient} opacity-70`}
        aria-hidden="true"
      />
      {/* Name, position, department, institution, location */}
      <div className="mt-8 mb-1 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{reference.name}</h3>
        <div className="text-sm text-indigo-600 dark:text-indigo-200 font-medium">{reference.position}</div>
        {reference.department && (
          <div className="text-xs text-gray-500 dark:text-gray-300">{reference.department}</div>
        )}
        {reference.institution && (
          <div className="text-xs text-gray-600 dark:text-gray-200 font-semibold">{reference.institution}</div>
        )}
        {reference.location && (
          <div className="text-xs text-gray-400 dark:text-gray-400">{reference.location}</div>
        )}
      </div>
      {/* Contact */}
      <div className="mt-4 flex flex-col items-center gap-1">
        {reference.email && Array.isArray(reference.email) && reference.email.map((em: string) => (
          <a
            key={em}
            href={`mailto:${em}`}
            className="text-xs text-blue-700 dark:text-blue-300 hover:underline truncate max-w-[180px]"
            title={em}
          >
            {em}
          </a>
        ))}
        {reference.phone && Array.isArray(reference.phone) && reference.phone.map((ph: any, i: number) => (
          <a
            key={ph.formatted || ph.number || i}
            href={`tel:${ph.formatted ? ph.formatted.replace(/\s+/g, "") : ph.number}`}
            className="text-xs text-blue-700 dark:text-blue-300 hover:underline truncate max-w-[180px]"
            title={ph.formatted || ph.number}
          >
            {ph.formatted || ph.number}
          </a>
        ))}
        {reference.URL && (
          <a
            href={reference.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-purple-600 dark:text-purple-300 hover:underline truncate max-w-[180px]"
            title={reference.URL}
          >
            {reference.URL}
          </a>
        )}
      </div>
      {/* Optional tags */}
      {reference.type_key && (
        <div className="mt-4 flex flex-wrap gap-1 justify-center">
          {(Array.isArray(reference.type_key) ? reference.type_key : String(reference.type_key).split(",")).map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-200 dark:bg-gray-800 text-[10px] text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
