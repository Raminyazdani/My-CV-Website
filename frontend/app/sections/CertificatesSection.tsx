// CertificatesSection.tsx
import React, { useEffect, useState } from "react";
import { fetchCertificates } from "~/lib/api";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";
import CertificateCard from "../components/CertificateCard";
import Masonry from "react-masonry-css";
const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  640: 2,
};
interface Certification {
  name: string;
  date: string;
  duration: string;
  certificate: boolean;
  URL: string | null;
  type_key: string[];
}

interface CertificateIssuer {
  issuer: string;
  certifications: Certification[];
}

export default function CertificatesSection(props: React.HTMLAttributes<HTMLElement>) {
  const [data, setData] = useState<CertificateIssuer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCertificates()
      .then((res) => setData(res["certifications and courses"] || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props} className="w-full max-w-10xl mx-auto gap-px p-6">
      <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">
        📜 Certifications & Courses
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Documented skills and professional training across domains
      </p>
  
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 space-y-4"
      >
        {data.map((issuerBlock, i) => (
          <div
            key={issuerBlock.issuer}
            className="bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-5"
          >
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              {issuerBlock.issuer}
            </h3>
            <ul className="space-y-3">
              {issuerBlock.certifications.map((cert, index) => (
                <CertificateCard key={index} cert={cert} />
              ))}
            </ul>
          </div>
        ))}
      </Masonry>
    </section>
  );
}