"use client";
import Image from "next/image";
import Link from "next/link";
import { HomeDataType, SocialLinkType } from "./types/types";
import SocialLink from "./SocialLink";
import { useCallback } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { saveAs } from "file-saver";
import { Download, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface ContentType {
  homeData: HomeDataType | null;
  socialLinks: SocialLinkType[];
}

const downloadPDF = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching PDF:", error);
    throw error;
  }
};

const BodyContent = ({ homeData, socialLinks }: ContentType) => {
  const userImage = homeData?.userImage || "";
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const handleViewAndDownload = useCallback(() => {
    if (!homeData?.cvFile) return;

    window.open(homeData.cvFile, "_blank");

    downloadPDF(homeData.cvFile).then((blob) => {
      const fileName = homeData.cvFile.split('/').pop() || 'CV.pdf';
      saveAs(blob, fileName);
    });
  }, [homeData?.cvFile]);

  // Split the headline so the final word carries the luminous mint accent.
  const headline = (homeData?.welcomeNote || "").trim();
  const parts = headline.split(/\s+/).filter(Boolean);
  const accentWord = parts.length > 1 ? parts.pop() : "";
  const leadWords = parts.join(" ");

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const rise = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.6, 0.35, 1] } },
      };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative z-10 grid min-h-[calc(100dvh-9rem)] grid-cols-1 items-center gap-12 py-10 lg:grid-cols-12 lg:gap-8"
    >
      {/* ── Left: copy ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-8 lg:col-span-7">
        {/* Status chip */}
        <motion.div
          variants={rise}
          className="flex w-fit items-center gap-2.5 rounded-full border border-brand-green/30 bg-white/40 px-4 py-2 shadow-sm backdrop-blur-md dark:border-brand-green/30 dark:bg-brand-green/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-medium dark:text-brand-green">
            {homeData?.welcomeTitle || t.home.availableForWork}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-poiret text-6xl font-bold leading-[0.95] tracking-tight text-gray-900 dark:text-white md:text-7xl lg:text-8xl"
        >
          {leadWords}
          {accentWord && (
            <>
              {" "}
              <span className="text-gradient animate-shimmer text-glow">
                {accentWord}
              </span>
            </>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={rise}
          className="max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl"
        >
          {homeData?.welcomeDescription}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={rise} className="flex flex-wrap items-center gap-4">
          {homeData?.cvFile && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleViewAndDownload}
              className="focus-ring sheen group relative flex items-center gap-3 overflow-hidden rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_-6px_hsl(var(--brand-green))] transition-shadow duration-300 hover:shadow-[0_0_50px_-4px_hsl(var(--brand-green))] dark:text-[#03100E]"
            >
              <span className="relative z-10">{t.common.downloadCV}</span>
              <Download className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </motion.button>
          )}

          <Link
            href="/projects"
            className="focus-ring group flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3.5 font-medium text-gray-700 transition-colors hover:border-brand-green hover:text-brand-medium dark:border-white/20 dark:text-gray-200 dark:hover:border-brand-green dark:hover:text-brand-green"
          >
            <span>{t.home.viewWork}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Social row */}
        <motion.div variants={rise} className="flex items-center gap-4 pt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
            {t.common.connect}
          </span>
          <span className="h-px w-8 bg-gray-300 dark:bg-white/15" />
          <div className="flex flex-wrap gap-2">
            {socialLinks?.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200/70 bg-white/60 backdrop-blur transition-colors hover:border-brand-green/50 focus-within:ring-2 focus-within:ring-brand-green dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-green/50"
              >
                <SocialLink item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right: glowing portrait ────────────────────────────── */}
      <motion.div variants={rise} className="relative lg:col-span-5">
        <div className="animate-float relative mx-auto aspect-[4/5] w-full max-w-sm">
          {/* Mint glow behind */}
          <div className="animate-glow-pulse absolute -inset-6 rounded-[2.5rem] bg-brand-green/25 blur-3xl dark:bg-brand-green/30" />
          {/* Portrait */}
          <div className="group relative h-full w-full overflow-hidden rounded-[2rem] border border-brand-green/20 shadow-2xl dark:border-brand-green/25">
            {userImage && (
              <Image
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                alt={homeData?.welcomeTitle || "profile"}
                src={userImage}
              />
            )}
            {/* Cinematic teal grade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03100E]/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-brand-dark/10 mix-blend-multiply dark:bg-brand-dark/20" />
          </div>
          {/* Corner meta tag */}
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-brand-green/20 bg-white/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-medium shadow-lg backdrop-blur-md dark:border-brand-green/25 dark:bg-[#03100E]/80 dark:text-brand-green">
            {t.home.availableForWork}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        variants={rise}
        className="pointer-events-none absolute -bottom-2 left-0 hidden items-center gap-3 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
          {t.home.scroll}
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-brand-green/60 to-transparent" />
      </motion.div>
    </motion.section>
  );
};

export default BodyContent;
