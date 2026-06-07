"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { FolderTree } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { SkillCategoryType } from '../../components/types/types';
import SkillCategoryForm from '../components/SkillCategoryForm';
import DataTable from '@/app/components/dashboard/DataTable';
import PageHeader from '../components/PageHeader';

const fetchSkillCategories = async (): Promise<SkillCategoryType[]> => {
  const data = await fetchJSON<SkillCategoryType[]>("/api/skill-categories");
  return data ?? [];
};

const skillCategoryColumns: ColumnDef<SkillCategoryType, any>[] = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'icon',
    header: 'Icon',
    cell: ({ getValue }) => (getValue() as string) || '-',
  },
  {
    id: 'skillsCount',
    header: 'Skills Count',
    accessorFn: (row) => row.skills?.length || 0,
  },
];

const SkillCategoriesAdmin = () => {
  const { isPending, isError, data: categories, error, refetch } = useQuery({
    queryKey: ['skill-categories'],
    queryFn: fetchSkillCategories,
  });

  return (
    <div className="space-y-6">
      <PageHeader icon={FolderTree} title="Skill Categories" description="Organize your skills into categories" />
      <DataTable<SkillCategoryType>
        entityName="Skill Category"
        data={categories ?? []}
        columns={skillCategoryColumns}
        apiEndpoint="/api/skill-categories"
        FormComponent={SkillCategoryForm}
        onDataUpdate={refetch}
        loading={isPending}
      />
    </div>
  );
};

export default SkillCategoriesAdmin;
