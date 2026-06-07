"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AboutType, HomeDataType } from "../types/types";
import { useLanguage } from "../../providers/LanguageProvider";

interface AboutTeaserProps {
  homeData: HomeDataType | null;
  about?: AboutType[];
}

export const AboutTeaser = ({ homeData, about }: AboutTeaserProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  // Prefer a real About paragraph; gracefully fall back to the hero blurb.
  const statement =
    about?.find((p) => p?.paragraph?.trim())?.paragraph ||
    homeData?.welcomeDescription ||
    "";

  if (!statement) return null;

  return (
    <section id="about" className="scroll-anchor relative z-10 py-24 md:py-32">
      {/* Index label */}
      <div className="mb-10 flex items-center gap-4">
        <span className="font-mono text-xs font-medium text-brand-medium dark:text-brand-green">
          01
        </span>
        <span className="h-px w-12 bg-brand-green/50" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
          {t.home.aboutIndex}
        </span>
      </div>

      <motion.blockquote
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
        className="max-w-4xl font-poiret text-3xl font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white md:text-5xl"
      >
        <span className="text-glow text-brand-green">“</span>
        {statement}
        <span className="text-glow text-brand-green">”</span>
      </motion.blockquote>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10"
      >
        <Link
          href="/about"
          className="focus-ring group inline-flex items-center gap-2 rounded-full px-1 font-mono text-sm uppercase tracking-[0.15em] text-brand-medium transition-colors hover:text-brand-dark dark:text-brand-green dark:hover:text-white"
        >
          <span>{t.common.readMore}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </section>
  );
};
