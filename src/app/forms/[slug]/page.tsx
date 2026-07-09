import { DateStamp } from "@/components/DateStamp";
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

  const visibleFields = form.fields.filter((f) => f.type !== "hidden");

  return (
    <main className="mx-auto max-w-xl px-6 pb-12 pl-14 pt-4 sm:pl-20 sm:pr-8">
      <Link
        href="/"
        className="animate-fade-up mb-6 inline-flex items-center gap-1.5 font-hand text-lg text-[#001b3d]/55 transition hover:text-[#ff7067]"
      >
        ← back to desk
      </Link>

      <header className="animate-fade-up animate-fade-up-delay-1 mb-8">
        <DateStamp />
        <h1 className="font-display mt-3 text-4xl font-bold text-[#001b3d] sm:text-5xl">
          {form.title}
        </h1>
        {form.description && (
          <p className="mt-2 text-sm leading-relaxed text-[#001b3d]/65">{form.description}</p>
        )}
        <p className="mt-3 font-hand text-xl text-[#c62828]/70">
          fill in the blanks below ↓
        </p>
      </header>

      <div className="form-sheet animate-fade-up animate-fade-up-delay-2 p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-dashed border-[#001b3d]/15 pb-4">
          <p className="font-hand text-lg text-[#001b3d]/60">
            {visibleFields.length} field{visibleFields.length !== 1 ? "s" : ""} to scribble
          </p>
          <p className="text-xs text-[#001b3d]/45">
            <span className="text-[#ff7067]">*</span> required
          </p>
        </div>
        <DynamicForm form={form} />
      </div>

      {/* Doodle corner */}
      <p className="mt-6 text-right font-hand text-2xl text-[#001b3d]/20" aria-hidden>
        ~ fin ~
      </p>
    </main>
  );
}
