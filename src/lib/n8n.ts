import type { FormField, FormValues } from "@/types/form";

/**
 * Builds multipart/form-data payload for n8n Form Trigger submission.
 * n8n expects Content-Type: multipart/form-data with field keys like field-0, field-1, etc.
 */
export function buildN8nFormData(fields: FormField[], values: FormValues): FormData {
  const formData = new FormData();

  for (const field of fields) {
    const value = values[field.key];

    if (value === undefined || value === null || value === "") {
      if (field.type === "hidden" && field.defaultValue) {
        formData.append(field.key, field.defaultValue);
      }
      continue;
    }

    switch (field.type) {
      case "file": {
        const files = Array.isArray(value) ? value : [value];
        for (const file of files) {
          if (file instanceof File && file.size > 0) {
            formData.append(field.key, file, file.name);
          }
        }
        break;
      }
      case "checkbox":
      case "radio": {
        const selected = Array.isArray(value) ? value : [value];
        formData.append(field.key, JSON.stringify(selected));
        break;
      }
      default:
        formData.append(field.key, String(value));
    }
  }

  return formData;
}

export interface N8nSubmitOptions {
  url: string;
  formData: FormData;
  username?: string;
  password?: string;
}

export async function submitToN8n({
  url,
  formData,
  username,
  password,
}: N8nSubmitOptions): Promise<{ ok: boolean; status: number; body: string }> {
  const headers: HeadersInit = {};

  if (username && password) {
    const credentials = Buffer.from(`${username}:${password}`).toString("base64");
    headers.Authorization = `Basic ${credentials}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });

  const body = await response.text();
  return { ok: response.ok, status: response.status, body };
}
