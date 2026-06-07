"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Lightbulb } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { SkillType } from '../../components/types/types';
import SkillForm from '../components/SkillForm';
import DataTable from '@/app/components/dashboard/DataTable';
import PageHeader from '../components/PageHeader';

const fetchSkills = async (): Promise<SkillType[]> => {
  const data = await fetchJSON<SkillType[]>("/api/skills");
  return data ?? [];
};

const skillColumns: ColumnDef<SkillType, any>[] = [
  { accessorKey: 'name', header: 'Name' },
  {
    id: 'category',
    header: 'Category',
    accessorFn: (row) => row.category?.name || 'N/A',
  },
  {
    accessorKey: 'proficiency',
    header: 'Proficiency',
    cell: ({ getValue }) => `${getValue()}%`,
  },
];

const SkillsAdmin = () => {
  const { isPending, isError, data: skills, error, refetch } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });

  return (
    <div className="space-y-6">
      <PageHeader icon={Lightbulb} title="Skills" description="Manage your technical skills and expertise" />
      <DataTable<SkillType>
        entityName="Skill"
        data={skills ?? []}
        columns={skillColumns}
        apiEndpoint="/api/skills"
        FormComponent={SkillForm}
        onDataUpdate={refetch}
        loading={isPending}
      />
    </div>
  );
};

export default SkillsAdmin;
