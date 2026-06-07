"use client";
import React from 'react';
import { AboutType, SkillCategoryType } from './types/types';
import Skillbar from './Skillbar';
import { Mail, MapPin, Briefcase, Calendar, Code2, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';
import { motion, useReducedMotion } from 'framer-motion';
import { PageHeader } from './PageHeader';

interface ContentType {
    paragraphs: AboutType[]
    skillCategories: SkillCategoryType[]
}

const AboutBody = ({ paragraphs, skillCategories }: ContentType) => {
    const { t } = useLanguage();
    const reduce = useReducedMotion();

    const fade = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.6, 0.35, 1] } }
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
    };

    const quickFacts = [
        { icon: MapPin, label: 'Ubicación', value: 'Remoto / Perú', color: 'from-blue-500 to-cyan-500' },
        { icon: Briefcase, label: 'Experiencia', value: '4+ Años', color: 'from-brand-green to-emerald-500' },
        { icon: Code2, label: 'Proyectos', value: '20+ Completados', color: 'from-violet-500 to-purple-500' },
        { icon: Calendar, label: 'Disponibilidad', value: 'Abierto a trabajar', color: 'from-amber-500 to-orange-500' },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-16 sm:space-y-20"
        >
            {/* Header */}
            <PageHeader
                index="01"
                title={t.about.title}
                subtitle={t.about.subtitle || "Ingeniero de Software con más de 4 años de experiencia desarrollando soluciones escalables en entornos cloud."}
            />

            {/* Quick Facts */}
            <motion.div variants={fade}>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                    {quickFacts.map((fact, index) => (
                        <motion.div
                            key={index}
                            variants={fade}
                            whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
                            className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm p-5 sm:p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/10 hover:border-brand-green/30 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-green/30"
                        >
                            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${fact.color} mb-3 shadow-lg`}>
                                <fact.icon className="h-6 w-6 text-white" />
                            </div>
                            <p className="mb-1 text-[10px] sm:text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                {fact.label}
                            </p>
                            <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                                {fact.value}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

                {/* Left Column: Bio */}
                <motion.div variants={fade} className="space-y-6 lg:col-span-3">
                    {/* Bio header */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-medium shadow-lg shadow-brand-green/20">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poiret">
                            {t.about.title}
                        </h2>
                    </div>

                    {/* Paragraphs */}
                    <div className="space-y-4">
                        {paragraphs.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fade}
                                whileHover={reduce ? undefined : { x: 4 }}
                                className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/10 hover:border-brand-green/30 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-green/30 group"
                            >
                                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-green to-brand-medium rounded-l-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <p className="text-[15px] sm:text-[17px] leading-relaxed text-gray-700 dark:text-gray-300">
                                    {item.paragraph}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        variants={fade}
                        className="relative overflow-hidden rounded-2xl border border-brand-green/20 bg-gradient-to-br from-brand-green/5 to-brand-medium/5 p-6 sm:p-8 dark:from-brand-green/10 dark:to-brand-medium/10"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poiret mb-1">
                                    {t.about.ctaTitle || "¿Trabajamos juntos?"}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {t.about.ctaSubtitle || "¿Tienes un proyecto en mente? Hablemos."}
                                </p>
                            </div>
                            <a
                                href="mailto:cardenascode7@outlook.com"
                                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-medium px-6 py-3 font-semibold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30 hover:scale-105"
                            >
                                <Mail className="h-4 w-4" />
                                <span>{t.about.sendEmail}</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Skills */}
                <motion.div
                    variants={fade}
                    className="lg:col-span-2"
                >
                    <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/5">
                        <Skillbar skillCategories={skillCategories} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default AboutBody;
