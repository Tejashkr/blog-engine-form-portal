import { PageShell } from "@/components/PageShell";
import { caveat, karla, libreBaskerville } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Form Portal · Messy Notebook",
  description: "Submit weekly blogs — scribbled on paper, synced to n8n",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${libreBaskerville.variable} ${caveat.variable} antialiased`}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
