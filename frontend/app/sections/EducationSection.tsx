import { useEffect, useState } from "react";
import EducationCard from "~/components/EducationCard";
import type { Education } from "~/components/EducationCard";
import { fetchEducation } from "~/lib/api";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";

export default function EducationSection(props: React.HTMLAttributes<HTMLElement>) {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  fetchEducation()
    .then((data) =>
      setEducations(
        (data.education || []).map((edu: any) => ({
          ...edu,
          start_date: edu.startDate,
          end_date: edu.endDate,
          study_type: edu.studyType,
        }))
      )
    )
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));
}, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props} className="w-full max-w-10xl mx-auto gap-px p-6">
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold mb-2 text-blue-800 dark:text-blue-200 tracking-tight flex items-center gap-2">
          <span className="text-2xl">🎓</span> Education
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-2 animate-pulse" />
        <p className="mt-2 text-gray-700 dark:text-gray-200 text-base">
          My academic journey in Bioinformatics, Biotechnology, and Science.
        </p>
      </div>
      <div className="relative pl-7 timeline-container">
        <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200/60 via-indigo-300/40 to-indigo-400/40 rounded-full z-0" />
        <div className="relative z-10">
          {educations.map((edu, i) => (
            <EducationCard key={`${edu.institution}-${i}`} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
