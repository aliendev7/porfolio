"use client";
import { useLanguage } from '../providers/LanguageProvider';
import { PageHeader } from './PageHeader';

export const ProjectsHeader = () => {
    const { t } = useLanguage();

    return (
        <PageHeader
            index="01"
            title={t.projects.title}
            subtitle={t.projects.description}
        />
    );
};
