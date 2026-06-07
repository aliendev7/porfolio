"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectType } from "./types/types";
import { useLanguage } from "../providers/LanguageProvider";

interface FeaturedProjectsProps {
  projects: ProjectType[];
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const featuredProjects = (projects || []).slice(0, 3);

  if (featuredProjects.length === 0) return null;

  return (
    <section id="featured" className="scroll-anchor relative z-10 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <div className="mb-3 flex items-center gap-4">
            <span className="font-mono text-xs font-medium text-brand-medium dark:text-brand-green">
              02
            </span>
            <span className="h-px w-12 bg-brand-green/50" />
          </div>
          <h2 className="font-poiret text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {t.home.selectedWork}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t.home.recentProjects}
          </p>
        </div>
        <Link
          href="/projects"
          className="focus-ring group flex shrink-0 items-center gap-2 rounded-full px-1 font-mono text-xs uppercase tracking-[0.15em] text-brand-medium transition-colors hover:text-brand-dark dark:text-brand-green dark:hover:text-white"
        >
          <span>{t.home.viewAll}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {featuredProjects.map((project, index) => {
          const cover = project.cover || project.coverImage || "";
          const description = project.about || project.description || "";
          const href = project.link || project.liveUrl || `/projects/${project.slug}` || "#";
          const isExternal = /^https?:\/\//.test(href);
          const tags = [
            ...((project.tools || []).map((tool) => tool?.name) ?? []),
            ...(project.technologies || []),
          ]
            .filter(Boolean)
            .slice(0, 3);

          return (
            <motion.article
              key={project.id || index}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.21, 0.6, 0.35, 1] }}
            >
              <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="focus-ring group block rounded-[1.75rem]"
              >
                <div className="sheen relative overflow-hidden rounded-[1.75rem] border border-gray-200/70 shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-green/40 group-hover:shadow-[0_0_50px_-12px_hsl(var(--brand-green))] dark:border-white/10">
                  <div className="relative aspect-[16/11] overflow-hidden bg-gray-100 dark:bg-white/5">
                    {cover && (
                      <Image
                        src={cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03100E]/95 via-[#03100E]/35 to-transparent" />

                    {/* Top row: index + arrow */}
                    <span className="absolute left-5 top-5 font-mono text-xs text-white/70">
                      0{index + 1}
                    </span>
                    <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-[#03100E]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>

                    {/* Bottom content */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="mb-1.5 font-poiret text-2xl font-bold text-white md:text-3xl">
                        {project.title}
                      </h3>
                      {description && (
                        <p className="line-clamp-2 text-sm text-gray-300/90">
                          {description}
                        </p>
                      )}
                      {tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-white/80 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
