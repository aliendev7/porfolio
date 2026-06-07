"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";
import { HomeDataType, SocialLinkType } from "../types/types";
import SocialLink from "../SocialLink";
import { useLanguage } from "../../providers/LanguageProvider";

interface ContactCTAProps {
  homeData: HomeDataType | null;
  socialLinks: SocialLinkType[];
}

export const ContactCTA = ({ homeData, socialLinks }: ContactCTAProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const cvFile = homeData?.cvFile;

  return (
    <section className="relative z-10 py-24 md:py-32">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] border border-brand-green/20 bg-white/60 px-8 py-16 text-center backdrop-blur-xl dark:border-brand-green/25 dark:bg-white/[0.03] md:px-16 md:py-24"
      >
        {/* Rotating aurora — echoes the hero canvas */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] dark:opacity-[0.20]">
          <div
            className="animate-aurora absolute left-1/2 top-1/2 h-full w-full rounded-full blur-[90px]"
            style={{
              backgroundImage:
                "conic-gradient(from 0deg, transparent 0deg, hsl(177 94% 21%) 80deg, hsl(177 70% 50%) 160deg, transparent 230deg, hsl(177 94% 14%) 310deg, transparent 360deg)",
            }}
          />
        </div>

        {/* Mint glow */}
        <div className="animate-glow-pulse pointer-events-none absolute left-1/2 top-[-30%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-green/15 blur-3xl dark:bg-brand-green/20" />

        <div className="relative">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-medium dark:text-brand-green">
            {t.home.letsConnect}
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl font-poiret text-5xl font-bold leading-[0.95] tracking-tight text-gray-900 dark:text-white md:text-7xl">
            {t.home.ctaTitle}
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base text-gray-600 dark:text-gray-300 md:text-lg">
            {t.home.ctaSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {cvFile && (
              <a
                href={cvFile}
                target="_blank"
                rel="noreferrer"
                className="focus-ring group flex items-center gap-3 rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_-6px_hsl(var(--brand-green))] transition-shadow duration-300 hover:shadow-[0_0_44px_-4px_hsl(var(--brand-green))] dark:text-[#03100E]"
              >
                <span>{t.common.downloadCV}</span>
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            )}
            <Link
              href="/about"
              className="focus-ring group flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3.5 font-medium text-gray-700 transition-colors hover:border-brand-green hover:text-brand-medium dark:border-white/20 dark:text-gray-200 dark:hover:border-brand-green dark:hover:text-brand-green"
            >
              <span>{t.about.sendEmail}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {socialLinks?.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              {socialLinks.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200/70 bg-white/70 backdrop-blur transition-colors hover:border-brand-green/50 focus-within:ring-2 focus-within:ring-brand-green dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-green/50"
                >
                  <SocialLink item={item} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
