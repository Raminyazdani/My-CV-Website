import React, { useEffect, useState } from "react";
import { fetchLanguages } from "~/lib/api";
import LanguageCard from "~/components/LanguageCard";
import type { LanguageData } from "~/components/LanguageCard";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";





const CEFR_LEGEND = [
  { level: "C2", color: "bg-green-500", desc: "Proficient - Mastery" },
  { level: "C1", color: "bg-blue-500", desc: "Proficient - Advanced" },
  { level: "B2", color: "bg-indigo-500", desc: "Independent - Upper Intermediate" },
  { level: "B1", color: "bg-purple-500", desc: "Independent - Intermediate" },
  { level: "A2", color: "bg-orange-500", desc: "Basic - Elementary" },
  { level: "A1", color: "bg-yellow-500", desc: "Basic - Beginner" },
];

export default function LanguageSection(props: React.HTMLAttributes<HTMLElement>) {
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLanguages()
    .then((data) => setLanguages(data.languages || []))
    .catch(() => setError("Failed to fetch languages"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props} className="w-full max-w-10xl mx-auto   gap-px  p-6 ">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">Languages</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          My language proficiencies and certifications.
        </p>
      </div>

      <div className="flex flex-wrap gap-8 justify-center">
  {languages.map((lang, i) => (
    <div key={lang.language} className="flex-shrink-0 basis-72 max-w-xs w-full">
      <LanguageCard lang={lang} index={i} />
    </div>
  ))}
</div>

      {/* CEFR Legend */}
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">CEFR Language Proficiency Scale</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CEFR_LEGEND.map((item) => (
            <div key={item.level} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
              <span className="text-sm font-medium mr-2">{item.level}:</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
