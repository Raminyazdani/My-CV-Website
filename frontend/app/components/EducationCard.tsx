import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

export interface Education {
  id?: number;
  institution: string;
  location: string;
  area: string;
  study_type: string;
  start_date: string;
  end_date: string | null;
  gpa?: string;
  logo_url?: string;
  type_key?: string[] | string;
}

function getInitials(name: string) {
  return name.match(/\b\w/g)?.join("").slice(0, 3).toUpperCase();
}

function getYear(dateStr: string | null | undefined): string {
  if (!dateStr) return "?";
  const lower = dateStr.toLowerCase();
  if (lower === "present") return "Present";
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? "?" : parsed.getFullYear().toString();
}

const GRADIENTS = [
  "from-blue-500 to-indigo-500",
  "from-teal-400 to-green-500",
  "from-purple-500 to-fuchsia-500",
  "from-cyan-500 to-sky-500",
  "from-amber-500 to-orange-500",
];

export default function EducationCard({
  edu,
  index,
  isLast = false,
}: {
  edu: Education;
  index: number;
  isLast?: boolean;
}) {
  if (!edu) return null;

  const tags =
    Array.isArray(edu.type_key)
      ? edu.type_key
      : typeof edu.type_key === "string"
      ? edu.type_key.split(",").map((t) => t.trim())
      : [];

  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      className="education-card relative pl-16 pb-2 group"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.13, type: "spring", duration: 0.7 }}
    >
      <motion.div className="absolute left-0 top-2 flex flex-col items-center z-20">
        <motion.div
          className={`w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-tr ${gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-all`}
          whileHover={{
            y: [0, -8, 0],
            scale: 1.15,
            transition: { duration: 0.7, repeat: Infinity, repeatType: "reverse" },
          }}
        >
          {edu.logo_url ? (
            <img
              src={edu.logo_url}
              alt={edu.institution + " logo"}
              className="w-8 h-8 object-contain rounded-full"
            />
          ) : (
            <span className="text-white text-xl font-bold tracking-tight">
              {getInitials(edu.institution ?? "")}
            </span>
          )}
        </motion.div>
        <div className="w-1 grow mt-1 bg-gradient-to-b from-blue-300/60 to-indigo-500/30 rounded-full min-h-[32px]" />
      </motion.div>

      <motion.div
        className={`bg-white/90 dark:bg-gray-900/85 rounded-xl shadow-2xl p-6 border border-blue-100 dark:border-blue-950/50 
        backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-blue-400/20`}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 40px 0 rgba(59,130,246,0.09)" }}
      >
        <div className="flex flex-wrap justify-between items-center mb-1 gap-y-1">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight">
              {edu.institution}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 flex items-center mt-0.5 text-xs">
              <FaMapMarkerAlt className="w-3 h-3 mr-1" />
              {edu.location}
            </p>
          </div>
          <span className="date-badge text-blue-700 dark:text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 shadow-sm">
            {getYear(edu.start_date)} – {getYear(edu.end_date)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-2 mt-1">
          <span className="degree-badge bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <FaGraduationCap className="w-3 h-3" /> {edu.study_type}
          </span>
          {edu.area && edu.area.length > 0 && (
            <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
              {edu.area}
            </span>
          )}
        </div>

        {edu.gpa && edu.gpa.length > 0 && (
          <div className="flex items-center mt-1 text-gray-700 dark:text-gray-200 text-xs font-medium">
            <span className="mr-1">📊</span> <span>GPA: {edu.gpa}</span>
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-[10px] font-semibold px-2 py-0.5 rounded shadow"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
