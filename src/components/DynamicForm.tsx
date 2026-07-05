"use client";

import { FormField } from "@/components/FormField";
import type { FormDefinition, FormValues } from "@/types/form";
import { useState } from "react";

interface DynamicFormProps {
  form: FormDefinition;
}

function getInitialValues(form: FormDefinition): FormValues {
  const values: FormValues = {};
  for (const field of form.fields) {
    if (field.type === "checkbox") {
      values[field.key] = [];
    } else if (field.type === "file") {
      values[field.key] = field.multiple ? [] : "";
    } else {
      values[field.key] = field.defaultValue ?? "";
    }
  }
  return values;
}

export function DynamicForm({ form }: DynamicFormProps) {
  const [values, setValues] = useState<FormValues>(() => getInitialValues(form));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function handleChange(key: string, value: string | string[] | File | File[]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const body = new FormData();

      for (const field of form.fields) {
        const value = values[field.key];
        if (value === undefined || value === null || value === "") continue;

        if (field.type === "file") {
          const files = Array.isArray(value) ? value : [value];
          for (const file of files) {
            if (file instanceof File && file.size > 0) {
              body.append(field.key, file, file.name);
            }
          }
        } else if (field.type === "checkbox") {
          const selected = Array.isArray(value) ? value : [];
          for (const item of selected) {
            body.append(field.key, item);
          }
        } else {
          body.append(field.key, String(value));
        }
      }

      const response = await fetch(`/api/submit/${form.slug}`, {
        method: "POST",
        body,
      });

      const result = (await response.json()) as { success: boolean; message: string };

      if (result.success) {
        setStatus({ type: "success", message: result.message });
        setValues(getInitialValues(form));
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {form.fields
        .filter((field) => field.type !== "hidden")
        .map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={handleChange}
          />
        ))}

      {status && (
        <div
          role="alert"
          className={`rounded-lg border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
              : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
