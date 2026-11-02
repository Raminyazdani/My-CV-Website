// components/SoftSkillsSection.tsx
import React, { useEffect, useState } from "react";
import { fetchSoftSkills } from "~/lib/api";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";
import SoftSkillCard from "~/components/SoftSkillCard";

export default function SoftSkillsSection(props: React.HTMLAttributes<HTMLElement>) {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSoftSkills()
      .then((data) => setSkills(data.softSkills || []))

      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props} className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 relative inline-block">
          Soft Skills
          <span className="block h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2 animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
          Interpersonal and personal strengths powering my professional journey
        </p>
      </div>
      <ul className="space-y-3">
        {skills.map((skill, i) => (
          <li key={skill.id || skill.name}>
            <SoftSkillCard skill={skill} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
  
}
