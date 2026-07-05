import { getAllForms } from "@/config/forms";
import Link from "next/link";

export default function HomePage() {
  const forms = getAllForms();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Form Portal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Blog Engine Forms
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          Fill out a form below. Submissions are forwarded to your n8n workflow automatically.
        </p>
      </div>

      {forms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          No forms configured yet. Add forms in <code className="text-sm">src/config/forms.ts</code>.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {forms.map((form) => (
            <li key={form.slug}>
              <Link
                href={`/forms/${form.slug}`}
                className="group block rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700"
              >
                <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100">
                  {form.title}
                </h2>
                {form.description && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{form.description}</p>
                )}
                <span className="mt-4 inline-flex text-sm font-medium text-indigo-600">
                  Open form →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
