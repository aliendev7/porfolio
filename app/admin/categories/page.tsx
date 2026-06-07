"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { FolderTree } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { ResourceCategoryType } from '../../components/types/types';
import CategoryForm from '../components/CategoryForm';
import DataTable from '@/app/components/dashboard/DataTable';
import PageHeader from '../components/PageHeader';

const fetchCategories = async (): Promise<ResourceCategoryType[]> => {
  const data = await fetchJSON<ResourceCategoryType[]>("/api/categories");
  return data ?? [];
};

const categoryColumns: ColumnDef<ResourceCategoryType, any>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'slug', header: 'Slug' },
];

const CategoriesAdmin = () => {
  const { isPending, isError, data: categories, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="space-y-6">
      <PageHeader icon={FolderTree} title="Categories" description="Organize your learning resources into categories" />
      <DataTable<ResourceCategoryType>
        entityName="Category"
        data={categories ?? []}
        columns={categoryColumns}
        apiEndpoint="/api/categories"
        FormComponent={CategoryForm}
        onDataUpdate={refetch}
        loading={isPending}
      />
    </div>
  );
};

export default CategoriesAdmin;
