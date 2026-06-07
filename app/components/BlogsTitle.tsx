"use client";
import { useLanguage } from '../providers/LanguageProvider';
import { PageHeader } from './PageHeader';

export const BlogsTitle = () => {
    const { t } = useLanguage();

    return <PageHeader index="01" title={t.blogs.title} />;
};
