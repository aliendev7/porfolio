"use client";
import { BlogType } from "./types/types";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export const BlogCard = ({ blog }: { blog: BlogType }) => {
    const { t } = useLanguage();
    const reduce = useReducedMotion();

    return (
        <motion.a
            href={blog.link}
            target="_blank"
            rel="noreferrer"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            whileHover={reduce ? undefined : { y: -8 }}
            className="focus-ring group relative block h-[420px] w-full overflow-hidden rounded-[1.75rem] border border-gray-200/70 shadow-lg transition-all duration-500 hover:border-brand-green/40 hover:shadow-[0_0_50px_-12px_hsl(var(--brand-green))] dark:border-white/10"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={blog.cover || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                {/* Cinematic teal grade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03100E]/95 via-[#03100E]/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Top Badge */}
                <div className="flex justify-end">
                    <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                        <span className="font-mono text-[10px] uppercase tracking-wide text-white/90">Article</span>
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="space-y-4">
                    <h3 className="line-clamp-2 font-poiret text-xl font-bold leading-tight text-white md:text-2xl">
                        {blog.title}
                    </h3>

                    <div className="flex items-center gap-4 font-mono text-[11px] text-gray-300">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            <span>5 min read</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-brand-light">
                            {t.common.readMore}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-green">
                            <ExternalLink className="h-5 w-5 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#03100E]" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};
