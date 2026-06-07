"use client"
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useLanguage } from '../providers/LanguageProvider';
import { Locale } from '../lib/dictionary';
import { EducationType } from './types/types';

interface EducationTimelineProps {
    educations: EducationType[];
}

const formatDate = (date: Date, lang: Locale) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const locale = lang === 'es' ? es : enUS;
    const formatted = format(d, 'MMM yyyy', { locale });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const EducationCard = ({ item, index, isLast }: { item: EducationType; index: number; isLast: boolean }) => {
    const reduce = useReducedMotion();
    const { lang, t } = useLanguage();

    const start = formatDate(item.startDate, lang);
    const end = item.endDate ? formatDate(item.endDate, lang) : t.common.present;
    const dateLabel = `${start} — ${end}`;

    return (
        <div className="relative flex gap-6 sm:gap-10 group">
            {/* Timeline spine */}
            <div className="flex flex-col items-center shrink-0">
                <motion.div
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={reduce ? undefined : { scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-brand-green bg-white shadow-lg shadow-brand-green/20 dark:bg-[#03100E] dark:shadow-brand-green/10 group-hover:scale-110 transition-transform duration-300"
                >
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-brand-green" />
                </motion.div>
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
                    <div className="h-1 w-full bg-gradient-to-r from-brand-green via-brand-medium to-brand-green" />

                    <div className="p-5 sm:p-7">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-3.5 w-3.5 text-brand-green shrink-0" />
                            <span className="text-xs font-medium text-brand-green uppercase tracking-wider">{dateLabel}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-poiret">
                            {item.institution}
                        </h3>

                        <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mt-1.5">
                            {item.degree} {item.field && <span className="text-gray-500 dark:text-gray-400">en {item.field}</span>}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const EducationTimeline = ({ educations }: EducationTimelineProps) => {
    if (!educations || educations.length === 0) return null;

    return (
        <div className="relative max-w-4xl mx-auto">
            {educations.map((item, index) => (
                <EducationCard
                    key={item.id}
                    item={item}
                    index={index}
                    isLast={index === educations.length - 1}
                />
            ))}
        </div>
    );
};

export default EducationTimeline;