"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillCategoryType } from "../../components/types/types";
import { fetchJSON } from "../../../lib/request-util";

type SkillFormProps = {
  initialData?: Partial<SkillFormData>;
  onSubmit: (data: SkillFormData) => void;
};

const skillFormDataSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),
  proficiency: z.coerce.number().min(0).max(100, "Proficiency must be between 0-100"),
  order: z.coerce.number().optional(),
});

export type SkillFormData = z.infer<typeof skillFormDataSchema>;

const fetchSkillCategories = async (): Promise<SkillCategoryType[] | []> => {
  const data = await fetchJSON<SkillCategoryType[]>("/api/skill-categories");
  return data ?? [];
};

export type SkillFormRef = {
    submitForm: () => Promise<void>;
};

const SkillForm = forwardRef<
  SkillFormRef,
  SkillFormProps
>(({ initialData, onSubmit }, ref) => {
  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillFormDataSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      proficiency: 50,
      order: 0,
      id: undefined,
    },
  });

  const { handleSubmit, trigger, control, reset, formState: { isValid, isSubmitting, errors }, getValues } = form;
  const [categories, setCategories] = useState<SkillCategoryType[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchSkillCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      trigger();
    }
  }, [initialData, reset, trigger]);

  const onSubmitHandler: SubmitHandler<SkillFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form id="datatable-form" onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Skill Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon && `${category.icon} `}{category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency (0-100)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g., 90"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order (optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {initialData?.id ? "Update Skill" : "Create Skill"}
        </Button>
      </form>
    </Form>
  );
});

SkillForm.displayName = "SkillForm";

export default SkillForm;
