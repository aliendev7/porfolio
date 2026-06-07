'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { FolderKanban, Code2, Tag } from 'lucide-react';
import DataTable from '../../components/dashboard/DataTable';
import { ProjectType } from '../../../app/components/types/types';
import { fetchJSON } from '../../../lib/request-util';
import ProjectForm from '../../admin/components/ProjectForm';
import PageHeader from '../components/PageHeader';
import StatsCard from '../../components/ui/stats-card';

const fetchProjects = async (): Promise<ProjectType[] | []> => {
  const data = await fetchJSON<ProjectType[]>("/api/projects");
  return data ?? [];
};

const projectColumns: ColumnDef<ProjectType, any>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'category', header: 'Category' },
  {
    id: 'technologies',
    header: 'Technologies',
    accessorFn: (row) => {
      const techs = row.technologies?.length ? row.technologies : row.tools?.map(t => t.name);
      return techs ? techs.join(', ') : '';
    },
  },
];

const ProjectsAdmin = () => {
  const { isPending, isError, data: projects, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const stats = useMemo(() => {
    if (!projects) return { total: 0, categories: 0, technologies: 0 };
    const categories = new Set(projects.map(p => p.category).filter(Boolean)).size;
    const technologies = new Set(
      projects.flatMap(p => p.technologies?.length ? p.technologies : (p.tools ? p.tools.map(t => t.name) : []))
    ).size;
    return { total: projects.length, categories, technologies };
  }, [projects]);

  return (
    <div className="space-y-6">
      <PageHeader icon={FolderKanban} title="Projects" description="Manage your portfolio projects and showcase your work" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Projects" value={stats.total} icon={FolderKanban} description="All portfolio projects" color="blue" />
        <StatsCard title="Categories" value={stats.categories} icon={Tag} description="Project categories" color="purple" />
        <StatsCard title="Technologies" value={stats.technologies} icon={Code2} description="Unique technologies used" color="green" />
      </div>
      <DataTable<ProjectType>
        entityName="Project"
        data={projects ?? []}
        columns={projectColumns}
        apiEndpoint="/api/projects"
        FormComponent={ProjectForm}
        onDataUpdate={refetch}
        loading={isPending}
      />
    </div>
  );
};

export default ProjectsAdmin;
