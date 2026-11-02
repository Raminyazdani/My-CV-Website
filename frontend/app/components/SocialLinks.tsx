import { FaGithub, FaLinkedin, FaTwitter, FaOrcid, FaEnvelope, FaGlobe } from "react-icons/fa";

export interface Profile {
  network: string;
  username?: string;
  url?: string;
}

interface SocialLinksProps {
  profiles: Profile[];
}

const NETWORK_ICON_MAP: Record<string, React.ComponentType<any>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  orcid: FaOrcid,
  email: FaEnvelope,
  website: FaGlobe,
};

export default function SocialLinks({ profiles }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      {profiles.map((profile) => {
        const key = profile.network.toLowerCase();
        const Icon = NETWORK_ICON_MAP[key] || FaGlobe;
        if (!profile.url && key !== "email") return null;
        const href =
          key === "email"
            ? `mailto:${profile.username || profile.url}`
            : profile.url;

        // Show just the icon + network (short), username as tooltip on hover
        return (
          <a
            key={profile.network}
            href={href}
            target={key === "email" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            aria-label={profile.network}
            title={profile.username ? `${profile.network}: ${profile.username}` : profile.network}
            className="w-full justify-between px-8 flex items-center gap-1 px-2 py-1 text-base text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full shadow hover:text-blue-500 hover:scale-105 focus-visible:ring-2 ring-blue-400 transition-all duration-200 min-w-[44px] max-w-xs"
          >
            <span className="flex flex-row items-center gap-2">
              <Icon className="text-xl" />
              <span className="font-semibold truncate max-w-[100px]">{profile.network}</span>
              {/* Optionally, show short username (like only first 10 chars), else remove */}
            </span>
            {profile.username && (
              <span className="ml-1 text-xs text-gray-400 truncate max-w-[80px] hidden md:inline-block">
                {(() => {
                  const lastPart = profile.username.split('/').pop() || '';
                  return lastPart;
                })()}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
