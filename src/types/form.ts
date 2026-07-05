export type FormFieldType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "textarea"
  | "date"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "file"
  | "hidden";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  /** n8n form field key — typically field-0, field-1, … matching field order in the Form Trigger node */
  key: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  options?: FormFieldOption[];
  /** For checkbox fields — exact number of selections required */
  exactSelections?: number;
  /** For file fields */
  accept?: string;
  multiple?: boolean;
}

export interface FormDefinition {
  slug: string;
  title: string;
  description?: string;
  /** n8n Form Trigger production URL (e.g. https://your-n8n.com/form/blog-submission) */
  n8nUrl: string;
  fields: FormField[];
  successMessage?: string;
}

export interface FormsConfig {
  forms: FormDefinition[];
}

export type FormValues = Record<string, string | string[] | File | File[]>;

export interface SubmitResult {
  success: boolean;
  message: string;
}
