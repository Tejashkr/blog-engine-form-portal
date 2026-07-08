"use client";

import type { FormField as FormFieldType } from "@/types/form";

interface FormFieldProps {
  field: FormFieldType;
  value: string | string[] | File | File[] | undefined;
  onChange: (key: string, value: string | string[] | File | File[]) => void;
  error?: string;
}

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
    <div className="group/field space-y-1.5">
      <label htmlFor={id} className="flex items-baseline gap-2">
        <span className="font-hand text-xl text-[#001b3d]">{field.label}</span>
        {field.required && <span className="font-hand text-lg text-[#ff7067]">*</span>}
      </label>

      {field.type === "textarea" && (
        <textarea
          id={id}
          name={field.key}
          rows={5}
          required={field.required}
          placeholder={field.placeholder}
          className="input-field min-h-[120px]"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      )}

      {field.type === "dropdown" && (
        <select
          id={id}
          name={field.key}
          required={field.required}
          className="input-field"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        >
          <option value="">— pick one —</option>
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
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#001b3d]/15 bg-white/40 px-3 py-2 text-sm text-[#001b3d]/80 transition hover:border-[#ff7067]/40"
            >
              <input
                type="radio"
                name={field.key}
                value={option.value}
                required={field.required}
                checked={value === option.value}
                onChange={() => onChange(field.key, option.value)}
                className="h-4 w-4 border-[#001b3d]/30 text-[#ff7067] focus:ring-[#ff7067]/30"
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
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#001b3d]/15 bg-white/40 px-3 py-2 text-sm text-[#001b3d]/80 transition hover:border-[#ff7067]/40"
              >
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
                  className="h-4 w-4 rounded border-[#001b3d]/30 text-[#ff7067] focus:ring-[#ff7067]/30"
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
          className="input-field file:mr-3 file:rounded-md file:border file:border-[#001b3d]/20 file:bg-[#fff9c4] file:px-3 file:py-1 file:font-hand file:text-sm file:text-[#001b3d]"
          onChange={(e) => {
            const files = e.target.files;
            if (!files?.length) {
              onChange(field.key, field.multiple ? [] : "");
              return;
            }
            onChange(field.key, field.multiple ? Array.from(files) : files[0]);
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
          className="input-field"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      )}

      {error && <p className="font-hand text-lg text-[#c62828]">{error}</p>}
    </div>
  );
}
