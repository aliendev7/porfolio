"use client";
import { motion, useReducedMotion } from "framer-motion";

interface PageHeaderProps {
  /** Small mono index, e.g. "01". Optional. */
  index?: string;
  /** Localized page title (rendered in Poiret display). */
  title: string;
  /** Optional localized subtitle / description. */
  subtitle?: string;
  /** Center the header instead of the default editorial left alignment. */
  center?: boolean;
}

/**
 * Shared editorial page header for all public pages: a mono index + mint accent
 * rule, an oversized Poiret title, and an optional subtitle. Matches the home
 * page's section headers so every surface reads as one design system.
 */
export const PageHeader = ({ index, title, subtitle, center }: PageHeaderProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
      className={`mb-14 w-full md:mb-20 ${center ? "flex flex-col items-center text-center" : ""}`}
    >
      <div className="mb-5 flex items-center gap-4">
        {index && (
          <span className="font-mono text-xs font-medium text-brand-medium dark:text-brand-green">
            {index}
          </span>
        )}
        <span className="h-px w-12 bg-brand-green/50" />
      </div>

      <h1 className="font-poiret text-5xl font-bold leading-[0.95] tracking-tight text-gray-900 dark:text-white md:text-6xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
};

export default PageHeader;
