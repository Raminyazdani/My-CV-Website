// app/components/ProfileCard.tsx

import { Card } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { motion } from "framer-motion";
import ParallaxTilt from "react-parallax-tilt";

export interface BasicInfo {
  name: string;
  label: string; // e.g. "Bioinformatician,Developer"
  summary: string;
  profile_picture_url: string;
  cover_picture_url?: string;
  email?: string;
  phone?: {
    formatted?: string;
    number?: string;
    country_code?: string;
  };
  locations?: {
    city?: string;
    country?: string;
  }[];
}

export default function ProfileCard({ basicInfo }: { basicInfo: BasicInfo }) {
  const {
    name = "",
    label = "",
    summary = "",
    profile_picture_url = "",
    cover_picture_url = "",
  } = basicInfo || {};

  return (
    <ParallaxTilt
      glareEnable
      glareMaxOpacity={0.15}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.03}
      className="w-full flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, type: "spring", delay: 0.15 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-card/70 dark:bg-card/40 backdrop-blur-lg shadow-2xl p-8 border border-border flex flex-col items-center relative overflow-hidden">
          {/* Optional Cover Image (blurred background) */}
          {cover_picture_url && (
            <img
              src={cover_picture_url}
              alt="Cover"
              className="absolute inset-0 w-full h-44 object-cover rounded-t-2xl opacity-40 blur-[2px] -z-10"
              style={{ top: 0, left: 0, objectFit: "cover" }}
            />
          )}

          {/* Avatar/Profile Picture */}
          <Avatar className="mb-4 border-4 border-background shadow-lg w-40 h-40 md:w-48 md:h-48">
            <AvatarImage src={profile_picture_url} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground drop-shadow">
            {name}
          </h1>

          {/* Labels / Titles */}
          <div className="flex flex-wrap gap-2 mb-2">
            {label &&
              label.split(",").map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/80 text-primary-foreground rounded-full text-base font-medium shadow"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>

          {/* Summary */}
          <p className="text-foreground/90 text-center font-light text-sm md:text-base">
            {summary}
          </p>
        </Card>
      </motion.div>
    </ParallaxTilt>
  );
}
