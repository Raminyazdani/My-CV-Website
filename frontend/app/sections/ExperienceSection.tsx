import React, { useEffect, useState } from "react";
import { fetchExperiences } from "~/lib/api";
import ExperienceCard from "~/components/ExperienceCard";
import type { Experience } from "~/components/ExperienceCard";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";

export default function ExperienceSection(props: React.HTMLAttributes<HTMLElement>) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences()
    .then((data) => setExperiences(data.experiences || []))
    .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props}className="w-full max-w-10xl mx-auto gap-px  p-6">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-1 text-gray-800 dark:text-gray-100">
          Professional Experience
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded" />
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl">
          My journey across biotechnology, software development, research, and entrepreneurship.
        </p>
      </div>
      {/* Timeline vertical line */}
      <div className="relative pl-7 timeline-container">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200/60 via-indigo-300/40 to-indigo-400/40 rounded-full z-0" />
        {/* Experience cards */}
        <div className="relative z-10">
          {experiences.map((exp, i) => (
            <ExperienceCard exp={exp} key={exp.role + i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
