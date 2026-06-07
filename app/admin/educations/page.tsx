"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { GraduationCap } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { EducationType } from '../../components/types/types';
import EducationForm from '../components/EducationForm';
import DataTable from '@/app/components/dashboard/DataTable';
import PageHeader from '../components/PageHeader';

const fetchEducations = async (): Promise<EducationType[]> => {
  const data = await fetchJSON<EducationType[]>("/api/educations");
  return data ?? [];
};

const educationColumns: ColumnDef<EducationType, any>[] = [
  { accessorKey: 'institution', header: 'Institution' },
  { accessorKey: 'degree', header: 'Degree' },
  { accessorKey: 'field', header: 'Field' },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ getValue }) => {
      const d = new Date(getValue() as string);
      return isNaN(d.getTime()) ? '' : d.toLocaleDateString();
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ getValue }) => {
      const v = getValue();
      if (!v) return 'Present';
      const d = new Date(v as string);
      return isNaN(d.getTime()) ? '' : d.toLocaleDateString();
    },
  },
];

const EducationsAdmin = () => {
  const { isPending, data: educations, refetch } = useQuery({
    queryKey: ['educations'],
    queryFn: fetchEducations,
  });

  return (
    <div className="space-y-6">
      <PageHeader icon={GraduationCap} title="Education" description="Manage your educational background" />
      <DataTable<EducationType>
        entityName="Education"
        data={educations ?? []}
        columns={educationColumns}
        apiEndpoint="/api/educations"
        FormComponent={EducationForm}
        onDataUpdate={refetch}
        loading={isPending}
      />
    </div>
  );
};

export default EducationsAdmin;
