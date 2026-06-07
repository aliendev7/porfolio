"use client";
import React, { useState, useMemo } from 'react';
import { ResourceCard } from '../components/ResourceCard';
import { ResourceType, ResourceCategoryType } from '../components/types/types';
import { useLanguage } from '../providers/LanguageProvider';
import { motion } from 'framer-motion';
import { Filter, BookOpen } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

interface ResourcesContentProps {
    initialResources: ResourceType[];
    categories: ResourceCategoryType[];
}

const ResourcesContent: React.FC<ResourcesContentProps> = ({ initialResources, categories }) => {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');

    const resourceTypes = ['Article', 'Video', 'Ebook', 'Tutorial', 'Tool', 'Case Study'];

    const filteredResources = useMemo(() => {
        return initialResources.filter(resource => {
            const matchesCategory = selectedCategory === 'all' || resource.category.id === selectedCategory;
            const matchesType = selectedType === 'all' || resource.type === selectedType;
            return matchesCategory && matchesType;
        });
    }, [initialResources, selectedCategory, selectedType]);

    return (
        <div className="flex flex-col w-full py-8">
            {/* Header Section */}
            <PageHeader
                index="01"
                title={t.resources.title}
                subtitle={t.resources.description}
            />

            {/* Filters Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-10 w-full rounded-3xl border border-gray-200/70 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
                <div className="mb-5 flex items-center gap-2.5">
                    <Filter className="h-4 w-4 text-brand-green" />
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-medium dark:text-brand-green">Filter Resources</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Filter */}
                    <div>
                        <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                            {t.resources.filterByCategory}
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full rounded-xl border border-gray-200/70 bg-white/70 px-4 py-3 text-gray-800 transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green dark:border-white/10 dark:bg-white/5 dark:text-gray-100"
                        >
                            <option value="all">{t.resources.allCategories}</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                            {t.resources.filterByType}
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full rounded-xl border border-gray-200/70 bg-white/70 px-4 py-3 text-gray-800 transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green dark:border-white/10 dark:bg-white/5 dark:text-gray-100"
                        >
                            <option value="all">{t.resources.allTypes}</option>
                            {resourceTypes.map((type) => (
                                <option key={type} value={type}>
                                    {t.resources.types[type.toLowerCase().replace(' ', '') as keyof typeof t.resources.types] || type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mt-5 border-t border-gray-200/70 pt-4 dark:border-white/10">
                    <div className="flex items-center gap-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                        <BookOpen className="h-4 w-4 text-brand-green" />
                        <span>
                            {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredResources.map((resource, i) => (
                        <motion.div
                            key={resource.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <ResourceCard resource={resource} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-auto max-w-md rounded-3xl border border-gray-200/70 bg-white/60 p-12 text-center shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                >
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-green/10">
                        <BookOpen className="h-9 w-9 text-brand-green" />
                    </div>
                    <h3 className="mb-2 font-poiret text-2xl font-bold text-gray-900 dark:text-white">No resources found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your filters to find more resources
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ResourcesContent;
