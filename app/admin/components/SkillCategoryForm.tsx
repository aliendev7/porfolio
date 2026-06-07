"use client";

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
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

type SkillCategoryFormProps = {
  initialData?: Partial<SkillCategoryFormData>;
  onSubmit: (data: SkillCategoryFormData) => void;
};

const skillCategoryFormDataSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  order: z.coerce.number().optional(),
});

export type SkillCategoryFormData = z.infer<typeof skillCategoryFormDataSchema>;

export type SkillCategoryFormRef = {
    submitForm: () => Promise<void>;
};

const SkillCategoryForm = forwardRef<
  SkillCategoryFormRef,
  SkillCategoryFormProps
>(({ initialData, onSubmit }, ref) => {
  const form = useForm<SkillCategoryFormData>({
    resolver: zodResolver(skillCategoryFormDataSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      color: "",
      order: 0,
      id: undefined,
    },
  });

  const { handleSubmit, trigger, control, reset, formState: { isValid, isSubmitting, errors }, getValues } = form;

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      trigger();
    }
  }, [initialData, reset, trigger]);

  const onSubmitHandler: SubmitHandler<SkillCategoryFormData> = (data) => {
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
                <Input placeholder="e.g., Frontend Development" {...field} />
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
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description of this category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., ⚛️ or 🚀" {...field} />
              </FormControl>
              <FormDescription>Emoji or icon identifier to display</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., from-blue-400 to-blue-600" {...field} />
              </FormControl>
              <FormDescription>Tailwind gradient classes for skill bars</FormDescription>
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
          {initialData?.id ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Form>
  );
});

SkillCategoryForm.displayName = "SkillCategoryForm";

export default SkillCategoryForm;
