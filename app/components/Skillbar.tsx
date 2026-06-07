"use client"

import React, { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../providers/LanguageProvider';
import { SkillCategoryType } from './types/types';
import { ChevronDown, Cloud, Palette, Bot, Award } from 'lucide-react';

type SkillBarsProps = {
    skillCategories: SkillCategoryType[]
}

const categoryIcons: Record<string, React.ComponentType<any>> = {
    'backend': Cloud,
    'cloud': Cloud,
    'frontend': Palette,
    'ai': Bot,
    'languages': Award,
    'certifications': Award,
};

const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    for (const [key, Icon] of Object.entries(categoryIcons)) {
        if (lower.includes(key)) return Icon;
    }
    return Cloud;
};

const SkillBars: React.FC<SkillBarsProps> = ({ skillCategories }) => {
    const { t } = useLanguage();
    const reduce = useReducedMotion();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(
        skillCategories.length > 0 ? skillCategories[0].id : null
    );

    const toggleCategory = (id: string) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    const sortedCategories = [...skillCategories].sort((a, b) => a.order - b.order);
    const totalSkills = skillCategories.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-white/10">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider font-poiret">
                    {t.about.skills}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {totalSkills} skills across {skillCategories.length} categories
                </p>
            </div>

            {/* Categories */}
            <div className="divide-y divide-gray-100 dark:divide-white/10">
                {sortedCategories.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            No skills added yet.
                        </p>
                    </div>
                ) : (
                    sortedCategories.map((category) => {
                        const Icon = getCategoryIcon(category.name);
                        const isExpanded = expandedCategory === category.id;
                        const skills = category.skills || [];
                        const avgProficiency = skills.length > 0
                            ? Math.round(skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length)
                            : 0;

                        return (
                            <div key={category.id}>
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-md"
                                        style={{
                                            backgroundImage: category.color
                                                ? undefined
                                                : 'linear-gradient(to bottom right, #10b981, #059669)',
                                            ...(category.color ? { background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` } : {}),
                                            background: category.color
                                                ? undefined
                                                : undefined,
                                        }}
                                    >
                                        {category.icon ? (
                                            <span className="text-base">{category.icon}</span>
                                        ) : (
                                            <Icon className="h-4 w-4 text-white" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                            {category.name}
                                        </p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                            {skills.length} skills · {avgProficiency}% avg
                                        </p>
                                    </div>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Skills List */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-4 space-y-3">
                                                {skills
                                                    .sort((a, b) => a.order - b.order)
                                                    .map((skill, i) => (
                                                        <motion.div
                                                            key={skill.id}
                                                            initial={reduce ? false : { opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="space-y-1.5"
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                    {skill.name}
                                                                </span>
                                                                <span className="text-[10px] font-bold text-brand-green tabular-nums">
                                                                    {skill.proficiency}%
                                                                </span>
                                                            </div>
                                                            <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${skill.proficiency}%` }}
                                                                    transition={{
                                                                        duration: 0.8,
                                                                        delay: i * 0.05,
                                                                        ease: [0.21, 0.6, 0.35, 1]
                                                                    }}
                                                                    className="h-full rounded-full"
                                                                    style={{
                                                                        backgroundImage: category.color
                                                                            ? undefined
                                                                            : 'linear-gradient(to right, #10b981, #059669)',
                                                                    }}
                                                                >
                                                                    <div className="h-full w-full bg-gradient-to-r from-brand-green to-brand-medium rounded-full" />
                                                                </motion.div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default SkillBars;
