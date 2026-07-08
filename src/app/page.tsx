import { DateStamp, HandUnderline, SketchBox } from "@/components/NotebookDecor";
import { StickyNote } from "@/components/StickyNote";
import { getAllForms } from "@/config/forms";
import Link from "next/link";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

export default function HomePage() {
  const forms = getAllForms();
  const formCount = forms.length;

  return (
    <main className="mx-auto max-w-2xl px-6 pb-8 pl-14 sm:pl-20 sm:pr-8">
      {/* Hero greeting */}
      <section className="animate-fade-up mb-10 pt-2">
        <div className="mb-3">
          <DateStamp />
        </div>
        <h1 className="font-display text-4xl font-bold leading-tight text-[#001b3d] sm:text-[2.75rem]">
          {getGreeting()}, writer.
        </h1>
        <p className="mt-3 text-base text-[#001b3d]/65">
          You have{" "}
          <HandUnderline>
            <span className="font-hand text-2xl text-[#001b3d]">{formCount} form{formCount !== 1 ? "s" : ""}</span>
          </HandUnderline>{" "}
          ready to fill.
        </p>
      </section>

      {forms.length === 0 ? (
        <SketchBox className="animate-fade-up animate-fade-up-delay-1 text-center text-[#001b3d]/60">
          Nothing scribbled yet. Add forms in{" "}
          <code className="font-hand text-lg text-[#ff7067]">forms.ts</code>
        </SketchBox>
      ) : (
        <div className="space-y-8">
          {forms.map((form, index) => {
            const isYellow = index % 2 === 0;
            return (
              <Link
                key={form.slug}
                href={`/forms/${form.slug}`}
                className="block animate-drop-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StickyNote
                  color={isYellow ? "yellow" : "blue"}
                  rotation={isYellow ? "rotate-[2deg]" : "rotate-[-1.5deg]"}
                  tapeColor={isYellow ? "grey" : "pink"}
                  className="transition hover:scale-[1.02] hover:shadow-[4px_6px_18px_rgba(0,27,61,0.15)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-2xl" aria-hidden>
                      {isYellow ? "📝" : "📋"}
                    </span>
                    <div className="flex-1">
                      <h2 className="font-hand text-2xl font-bold text-[#001b3d]">{form.title}</h2>
                      {form.description && (
                        <p className="mt-1 text-sm leading-relaxed text-[#001b3d]/70">{form.description}</p>
                      )}
                      <ul className="mt-4 space-y-1.5">
                        {form.fields
                          .filter((f) => f.type !== "hidden")
                          .slice(0, 4)
                          .map((field) => (
                            <li
                              key={field.key}
                              className="flex items-center gap-2 text-sm text-[#001b3d]/75"
                            >
                              <span className="h-2 w-2 rounded-full border-2 border-[#001b3d]/40" />
                              {field.label}
                            </li>
                          ))}
                      </ul>
                      <p className="mt-4 font-hand text-lg text-[#c62828]">tap to open →</p>
                    </div>
                  </div>
                </StickyNote>
              </Link>
            );
          })}

          {/* Info sticky — blue note style */}
          <StickyNote
            color="blue"
            rotation="rotate-[1deg]"
            tapeColor="pink"
            className="animate-fade-up animate-fade-up-delay-2"
          >
            <p className="font-hand text-3xl font-bold text-[#c62828]/80">n8n</p>
            <p className="mt-1 text-sm text-[#001b3d]/70">
              Every submission goes straight to your workflow. No copy-paste, no mess (except this notebook).
            </p>
          </StickyNote>
        </div>
      )}

      {/* CTA sketch box */}
      {forms.length > 0 && (
        <SketchBox className="animate-fade-up animate-fade-up-delay-3 mt-10 text-center">
          <p className="font-hand text-2xl text-[#001b3d]">Start something new?</p>
          <Link
            href={`/forms/${forms[0].slug}`}
            className="btn-primary mt-4 inline-flex items-center justify-center px-8 py-3 text-sm"
          >
            New Blank Sheet
          </Link>
        </SketchBox>
      )}

      {/* Activity-style feed */}
      <section className="animate-fade-up animate-fade-up-delay-3 mt-12 border-l-2 border-[#001b3d]/15 pl-5">
        <p className="mb-4 font-hand text-xl text-[#001b3d]/80">Recent activity</p>
        <ul className="space-y-4">
          {[
            { icon: "✏️", text: "Weekly Blogs form is live", tag: "#ready" },
            { icon: "✅", text: "Connected to n8n workflow", tag: "#synced" },
            { icon: "🔗", text: "Share the form link with your team", tag: "#share" },
          ].map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#001b3d]/15 bg-white/60 text-sm">
                {item.icon}
              </span>
              <div>
                <p className="text-sm text-[#001b3d]/80">{item.text}</p>
                <span className="mt-1 inline-block rounded-full bg-[#001b3d]/8 px-2 py-0.5 text-[10px] text-[#001b3d]/50">
                  {item.tag}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
