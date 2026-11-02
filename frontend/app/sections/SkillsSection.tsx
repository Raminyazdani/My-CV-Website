import React, { useEffect, useState } from "react";
import { fetchSkills } from "~/lib/api";
import SuperCategorySection from "./SuperCategorySection";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 2,
  1024: 2,
  640: 1,
};

interface Skill {
  id: number;
  long_name: string;
  short_name: string;
  type_key: string[];
  subcategory: number;
}

interface SkillsData {
  [superCategory: string]: {
    [subCategory: string]: Skill[];
  };
}

const COLOR_CLASSES: Record<string, string> = {
  indigo: "bg-indigo-600 text-indigo-500",
  blue: "bg-blue-600 text-blue-500",
  red: "bg-red-600 text-red-500",
  emerald: "bg-emerald-600 text-emerald-500",
  purple: "bg-purple-600 text-purple-500",
};

const COLORS = Object.keys(COLOR_CLASSES);

export default function SkillsSection(props: React.HTMLAttributes<HTMLElement>) {
  const [data, setData] = useState<SkillsData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills()
      .then((d) => setData(d.skills || {}))  // 🟢 fix here
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props}className="w-full max-w-10xl mx-auto  gap-px  p-6">
      <div className="mb-7">
        <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300 inline-flex items-center gap-2">
          <span className="text-2xl">🧠</span> Skills &amp; Expertise
        </h2>
        <span className="block h-1 w-16 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full mt-2 animate-pulse"></span>
        <p className="mt-4 text-gray-700 dark:text-gray-200 text-sm">
          Tools, languages, and technologies I've worked with across domains.
        </p>
      </div>

      <div className="rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-indigo-100 dark:border-indigo-800 backdrop-blur-xl px-3 py-6">

  <Masonry
    breakpointCols={breakpointColumnsObj}
    className="flex w-auto -ml-4"
    columnClassName="pl-4 space-y-4"
  >
    {Object.entries(data).map(([supercat, subcats], i) => (
      <div key={supercat}>
        <SuperCategorySection
          title={supercat}
          subcategories={subcats}
          color={COLORS[i % COLORS.length]}
        />
      </div>
    ))}
  </Masonry>
  
</div>

    </section>
  );
}
