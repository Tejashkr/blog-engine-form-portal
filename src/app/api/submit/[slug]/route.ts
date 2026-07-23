import { isRequestAuthenticated, SESSION_COOKIE } from "@/lib/auth";
import { getFormBySlug } from "@/config/forms";
import { buildN8nFormData, submitToN8n } from "@/lib/n8n";
import type { FormField, FormValues } from "@/types/form";
import { NextRequest, NextResponse } from "next/server";

function parseFieldValue(field: FormField, raw: FormDataEntryValue | null): FormValues[string] {
  if (raw === null) return field.type === "checkbox" ? [] : "";

  if (field.type === "file") {
    return raw instanceof File ? raw : "";
  }

  if (field.type === "checkbox") {
    const value = String(raw);
    return value ? value.split(",").filter(Boolean) : [];
  }

  return String(raw);
}

function formDataToValues(formData: FormData, fields: FormField[]): FormValues {
  const values: FormValues = {};

  for (const field of fields) {
    if (field.type === "file") {
      const files = formData.getAll(field.key).filter((entry) => entry instanceof File) as File[];
      values[field.key] = field.multiple ? files : (files[0] ?? "");
      continue;
    }

    if (field.type === "checkbox") {
      values[field.key] = formData.getAll(field.key).map(String);
      continue;
    }

    values[field.key] = parseFieldValue(field, formData.get(field.key));
  }

  return values;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const form = getFormBySlug(slug);

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!(await isRequestAuthenticated(session))) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please sign in." },
      { status: 401 },
    );
  }

  if (!form) {
    return NextResponse.json({ success: false, message: "Form not found." }, { status: 404 });
  }

  const n8nUrl = form.n8nUrl || process.env.N8N_FORM_URL;
  if (!n8nUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "n8n form URL is not configured. Set N8N_FORM_URL or n8nUrl in the form config.",
      },
      { status: 500 },
    );
  }

  try {
    const incoming = await request.formData();
    const values = formDataToValues(incoming, form.fields);

    for (const field of form.fields) {
      if (!field.required) continue;
      const value = values[field.key];
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (value instanceof File && value.size === 0);

      if (isEmpty) {
        return NextResponse.json(
          { success: false, message: `"${field.label}" is required.` },
          { status: 400 },
        );
      }
    }

    const n8nFormData = buildN8nFormData(form.fields, values);
    const result = await submitToN8n({
      url: n8nUrl,
      formData: n8nFormData,
      username: process.env.N8N_BASIC_AUTH_USER,
      password: process.env.N8N_BASIC_AUTH_PASSWORD,
    });

    if (!result.ok) {
      console.error("n8n submission failed:", result.status, result.body);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit to n8n. Check that the workflow is active and the URL is correct.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: form.successMessage ?? "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
