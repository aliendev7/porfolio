"use client";
import { ResourceType } from "./types/types";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export const ResourceCard = ({ resource }: { resource: ResourceType }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-gray-200/70 bg-white/70 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-brand-green/40 hover:shadow-[0_0_45px_-14px_hsl(var(--brand-green))] dark:border-white/10 dark:bg-white/5"
    >
      {/* Cover */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={resource.coverImage || "/placeholder-resource.jpg"}
          alt={resource.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03100E]/80 to-transparent" />

        {/* Type Badge */}
        <div className="absolute right-4 top-4">
          <div className="rounded-full bg-brand-green px-3 py-1.5 shadow-lg">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-white dark:text-[#03100E]">
              {resource.type}
            </span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-wide text-white">
              {resource.category.name}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[calc(100%-12rem)] flex-col p-6">
        <h3 className="mb-3 line-clamp-2 font-poiret text-xl font-bold text-gray-900 transition-colors group-hover:text-brand-green dark:text-white">
          {resource.title}
        </h3>

        <p className="mb-4 line-clamp-2 flex-grow text-sm text-gray-600 dark:text-gray-400">
          {resource.description}
        </p>

        <div className="mb-4 space-y-2 font-mono text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(resource.publishedAt).toLocaleDateString()}</span>
            {resource.readTimeMinutes && (
              <>
                <span>•</span>
                <Clock className="h-3.5 w-3.5" />
                <span>{resource.readTimeMinutes} {t.resources?.minRead || "min read"}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span>By {resource.author}</span>
          </div>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-gray-200/70 bg-gray-100/70 px-2 py-0.5 font-mono text-[10px] text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="rounded-md border border-gray-200/70 bg-gray-100/70 px-2 py-0.5 font-mono text-[10px] text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <a
          href={resource.link || "#"}
          target="_blank"
          rel="noreferrer"
          className="focus-ring group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 font-semibold text-white shadow-[0_0_24px_-8px_hsl(var(--brand-green))] transition-shadow hover:shadow-[0_0_36px_-6px_hsl(var(--brand-green))] dark:text-[#03100E]"
        >
          <span>{t.resources?.viewResource || "View Resource"}</span>
          <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
};
