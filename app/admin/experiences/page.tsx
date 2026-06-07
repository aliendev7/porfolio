"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Briefcase } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { formatTableDate } from '../../../lib/date-utils';
import DataTable from '@/app/components/dashboard/DataTable';
import { ExperienceType } from '../../components/types/types';
import ExperienceForm from '../components/ExperienceForm';
import PageHeader from '../components/PageHeader';

const fetchExperiences = async (): Promise<ExperienceType[]> => {
  const data = await fetchJSON<ExperienceType[]>("/api/experiences");
  return data ?? [];
};

const experienceColumns: ColumnDef<ExperienceType, any>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'company', header: 'Company' },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ getValue }) => formatTableDate(getValue() as string),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ getValue }) => {
      const value = getValue() as string | null;
      return value ? formatTableDate(value) : 'Present';
    },
  },
];

const ExperiencesAdmin = () => {
  const { isPending, isError, data: experiences, error, refetch } = useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences,
  });

  return (
    <div className="space-y-6">
      <PageHeader icon={Briefcase} title="Experiences" description="Manage your work history and professional experience" />
      <DataTable<ExperienceType>
        entityName="Experience"
        data={experiences ?? []}
        columns={experienceColumns}
        apiEndpoint="/api/experiences"
        FormComponent={ExperienceForm}
        onDataUpdate={refetch}
        loading={isPending}
      />
    </div>
  );
};

export default ExperiencesAdmin;
