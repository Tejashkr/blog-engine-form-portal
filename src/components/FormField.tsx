"use client";

import type { FormField as FormFieldType } from "@/types/form";

interface FormFieldProps {
  field: FormFieldType;
  value: string | string[] | File | File[] | undefined;
  onChange: (key: string, value: string | string[] | File | File[]) => void;
  error?: string;
}

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function FormField({ field, value, onChange, error }: FormFieldProps) {
  const id = `field-${field.key}`;

  if (field.type === "hidden") {
    return (
      <input
        type="hidden"
        id={id}
        name={field.key}
        value={typeof value === "string" ? value : field.defaultValue ?? ""}
        readOnly
      />
    );
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {field.type === "textarea" && (
        <textarea
          id={id}
          name={field.key}
          rows={6}
          required={field.required}
          placeholder={field.placeholder}
          className={inputClassName}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      )}

      {field.type === "dropdown" && (
        <select
          id={id}
          name={field.key}
          required={field.required}
          className={inputClassName}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "radio" && (
        <fieldset className="space-y-2">
          {field.options?.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="radio"
                name={field.key}
                value={option.value}
                required={field.required}
                checked={value === option.value}
                onChange={() => onChange(field.key, option.value)}
                className="h-4 w-4 border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
              {option.label}
            </label>
          ))}
        </fieldset>
      )}

      {field.type === "checkbox" && (
        <fieldset className="space-y-2">
          {field.options?.map((option) => {
            const selected: string[] = Array.isArray(value)
              ? value.filter((v): v is string => typeof v === "string")
              : [];
            const checked = selected.includes(option.value);
            return (
              <label key={option.value} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  name={field.key}
                  value={option.value}
                  checked={checked}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selected, option.value]
                      : selected.filter((v) => v !== option.value);
                    onChange(field.key, next);
                  }}
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
                {option.label}
              </label>
            );
          })}
        </fieldset>
      )}

      {field.type === "file" && (
        <input
          id={id}
          name={field.key}
          type="file"
          required={field.required}
          accept={field.accept}
          multiple={field.multiple}
          className={`${inputClassName} file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100`}
          onChange={(e) => {
            const files = e.target.files;
            if (!files?.length) {
              onChange(field.key, field.multiple ? [] : "");
              return;
            }
            onChange(
              field.key,
              field.multiple ? Array.from(files) : files[0],
            );
          }}
        />
      )}

      {["text", "email", "number", "password", "date"].includes(field.type) && (
        <input
          id={id}
          name={field.key}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className={inputClassName}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
