"use client";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResourceCategoryType } from "../../components/types/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type CategoryFormData = z.infer<typeof formSchema>;

type CategoryFormProps = {
  initialData?: Partial<ResourceCategoryType>;
  onSubmit: (data: CategoryFormData) => void;
};

const CategoryForm = forwardRef<
  { submitForm: () => Promise<void> },
  CategoryFormProps
>(({ initialData, onSubmit }, ref) => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const { handleSubmit, control, reset, formState: { isSubmitting } } = form;

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    if (initialData) {
      reset({ name: initialData.name || "" });
    }
  }, [initialData, reset]);

  return (
    <Form {...form}>
      <form id="datatable-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {initialData?.id ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Form>
  );
});

CategoryForm.displayName = "CategoryForm";
export default CategoryForm;
