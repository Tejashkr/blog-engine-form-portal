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
      setStatus({ type: "error", message: "Oops — network hiccup. Try again?" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {form.fields
        .filter((field) => field.type !== "hidden")
        .map((field, index) => (
          <div
            key={field.key}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <FormField field={field} value={values[field.key]} onChange={handleChange} />
          </div>
        ))}

      {status && (
        <div
          role="alert"
          className={`rounded-lg border-2 px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-[#81c784] bg-[#e8f5e9] text-[#2e7d32]"
              : "border-[#ef9a9a] bg-[#ffebee] text-[#c62828]"
          }`}
          style={{
            borderRadius: status.type === "success" ? "4px 14px 6px 12px" : "12px 4px 14px 6px",
          }}
        >
          <p className="font-hand text-xl">
            {status.type === "success" ? "✓ " : "✗ "}
            {status.message}
          </p>
        </div>
      )}

      <div className="border-t border-dashed border-[#001b3d]/15 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 text-sm sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending to n8n…
            </>
          ) : (
            <>
              <span className="font-hand text-lg">Submit entry</span>
              <span aria-hidden>→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
