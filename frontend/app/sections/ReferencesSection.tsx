import React, { useEffect, useState } from "react";
import { fetchReferences } from "~/lib/api";
import ReferenceCard from "~/components/ReferenceCard";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";

interface Reference {
  id: number;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
}

export default function ReferencesSection(props: React.HTMLAttributes<HTMLElement>) {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReferences()
    .then((data) => setReferences(data.references || []))

      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props} className="w-full max-w-10xl mx-auto  gap-px  p-6">
      <div className="mb-7">
        <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300 inline-flex items-center gap-2">
          <span className="text-2xl">🪪</span> References
        </h2>
        <span className="block h-1 w-16 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full mt-2 animate-pulse"></span>
        <p className="mt-4 text-gray-700 dark:text-gray-200 text-sm">
          Trusted professionals who can vouch for my work ethic and expertise.
        </p>
      </div>
      <div className="rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-indigo-100 dark:border-indigo-800 backdrop-blur-xl px-3 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-8">
          {references.map((reference, i) => (
            <ReferenceCard key={`${reference.name}-${i}`} reference={reference} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
