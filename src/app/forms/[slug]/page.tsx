import { DynamicForm } from "@/components/DynamicForm";
import { getFormBySlug } from "@/config/forms";
import Link from "next/link";
import { notFound } from "next/navigation";

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getAllForms } = await import("@/config/forms");
  return getAllForms().map((form) => ({ slug: form.slug }));
}

export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;
  const form = getFormBySlug(slug);

  if (!form) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        ← All forms
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {form.title}
        </h1>
        {form.description && (
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{form.description}</p>
        )}
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <DynamicForm form={form} />
      </div>
    </main>
  );
}
