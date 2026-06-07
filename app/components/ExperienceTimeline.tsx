"use client"
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { ExperiencePathProps } from './experiencePath';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useLanguage } from '../providers/LanguageProvider';
import { Locale } from '../lib/dictionary';

interface TimelineProps {
    experiences: ExperiencePathProps[];
}

const formatDate = (dateString: string, lang: Locale) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const locale = lang === 'es' ? es : enUS;
    const formatted = format(date, 'MMM yyyy', { locale });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const TechBadge = ({ name }: { name: string }) => (
    <span className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green dark:bg-brand-green/20 dark:text-brand-green border border-brand-green/20">
        {name}
    </span>
);

const ExperienceCard = ({ item, index, isLast }: { item: ExperiencePathProps; index: number; isLast: boolean }) => {
    const reduce = useReducedMotion();
    const { lang, t } = useLanguage();

    const dateLabel = `${formatDate(item.startDate, lang)} — ${item.endDate ? formatDate(item.endDate, lang) : t.common.present}`;

    return (
        <div className="relative flex gap-6 sm:gap-10 group">
            {/* Timeline spine */}
            <div className="flex flex-col items-center shrink-0">
                {/* Dot */}
                <motion.div
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={reduce ? undefined : { scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-brand-green bg-white shadow-lg shadow-brand-green/20 dark:bg-[#03100E] dark:shadow-brand-green/10 group-hover:scale-110 transition-transform duration-300"
                >
                    {item.cover ? (
                        <img src={item.cover} alt={item.title} className="h-7 w-7 sm:h-8 sm:w-8 object-contain rounded-full" />
                    ) : (
                        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-brand-green" />
                    )}
                </motion.div>
                {/* Line */}
                {!isLast && (
                    <div className="w-px flex-1 bg-gradient-to-b from-brand-green/60 via-brand-green/30 to-transparent min-h-[60px]" />
                )}
            </div>

            {/* Card */}
            <motion.div
                initial={reduce ? false : { opacity: 0, x: 30 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.6, 0.35, 1] }}
                className="flex-1 pb-10 sm:pb-14"
            >
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/10 hover:border-brand-green/30 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-green/30">
                    {/* Top accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-brand-green via-brand-medium to-brand-green" />

                    <div className="p-5 sm:p-7">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-3.5 w-3.5 text-brand-green shrink-0" />
                                    <span className="text-xs font-medium text-brand-green uppercase tracking-wider">{dateLabel}</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-poiret mt-2">
                                    {item.position}
                                </h3>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-base font-semibold text-gray-700 dark:text-gray-300">{item.title}</span>
                                    {item.location && (
                                        <>
                                            <span className="text-gray-300 dark:text-gray-600">·</span>
                                            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {item.location}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {item.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                                {item.description}
                            </p>
                        )}

                        {/* Activities */}
                        {item.activities.length > 0 && (
                            <ul className="space-y-2.5 mb-5">
                                {item.activities.map((activity, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        <ChevronRight className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                                        <span>{activity}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-white/10">
                                {item.technologies.map((tech, i) => (
                                    <TechBadge key={i} name={tech} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ExperienceTimeline = ({ experiences }: TimelineProps) => {
    return (
        <div className="relative max-w-4xl mx-auto">
            {experiences.map((item, index) => (
                <ExperienceCard
                    key={index}
                    item={item}
                    index={index}
                    isLast={index === experiences.length - 1}
                />
            ))}
        </div>
    );
};

export default ExperienceTimeline;
