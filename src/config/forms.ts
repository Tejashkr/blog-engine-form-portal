import type { FormsConfig } from "@/types/form";

/**
 * Form definitions for the portal.
 *
 * IMPORTANT: The `key` on each field must match the n8n Form Trigger field index.
 * Open your n8n Form Trigger node — fields are submitted as field-0, field-1, field-2, etc.
 * in the same order they appear in the node configuration.
 */
const formsConfig: FormsConfig = {
  forms: [
    {
      slug: "weekly-blogs",
      title: "Weekly Blogs",
      description: "Submit your weekly blog entry. Fields map directly to your n8n Form Trigger workflow.",
      n8nUrl: process.env.N8N_WEEKLY_BLOGS_URL ?? "",
      successMessage: "Your weekly blog has been submitted successfully!",
      fields: [
        {
          key: "field-0",
          label: "Blog Title",
          type: "text",
          required: true,
          placeholder: "Enter the blog title",
        },
        {
          key: "field-1",
          label: "Week Number",
          type: "number",
          required: true,
          placeholder: "e.g. 12",
        },
        {
          key: "field-2",
          label: "Reading Duration (in minutes)",
          type: "number",
          required: true,
          placeholder: "e.g. 5",
        },
      ],
    },
  ],
};

export function getAllForms() {
  return formsConfig.forms;
}

export function getFormBySlug(slug: string) {
  return formsConfig.forms.find((form) => form.slug === slug);
}

export default formsConfig;
