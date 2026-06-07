'use client';

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import CustomDatePicker from "@/app/components/dashboard/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/app/components/ui/image-upload";

type ProjectFormProps = {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => void;
};

const projectFormDataSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Must be a valid URL").min(1, "Cover Image URL is required"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  technologies: z.string().min(1, "Technologies are required (comma-separated)"),
  publishedAt: z.date().optional().nullable(),
});

export type ProjectFormData = z.infer<typeof projectFormDataSchema>;

export type ProjectFormRef = {
    submitForm: () => Promise<void>;
};

const ProjectForm = forwardRef<
  ProjectFormRef,
  ProjectFormProps
>(({ initialData, onSubmit }, ref) => {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormDataSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      coverImage: "",
      githubUrl: "",
      liveUrl: "",
      category: "",
      technologies: "",
      publishedAt: null,
      id: undefined,
    },
  });

  const { handleSubmit, trigger, control, reset, formState: { isValid, isSubmitting, errors }, getValues } = form;

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    if (initialData) {
      const convertedData = {
        ...initialData,
        publishedAt: initialData.publishedAt ? new Date(initialData.publishedAt) : null,
        technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : initialData.technologies || "",
      };
      reset(convertedData);
      trigger();
    }
  }, [initialData, reset, trigger]);

  const onSubmitHandler: SubmitHandler<ProjectFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form id="datatable-form" onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description of the project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Full content of the project" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/your-project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="liveUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://your-project.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="React, Next.js, TypeScript" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="publishedAt"
          render={({ field }) => (
            <CustomDatePicker
              value={field.value ?? null}
              onChange={field.onChange}
              label="Published Date"
            />
          )}
        />
        <Button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? "opacity-50" : ""}`}
          disabled={!isValid || isSubmitting}
        >
          Save Project
        </Button>
      </form>
    </Form>
  );
});

ProjectForm.displayName = "ProjectForm";

export default ProjectForm;
