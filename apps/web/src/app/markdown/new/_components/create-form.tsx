"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import {
  getGetMarkdownListQueryKey,
  type MarkdownDto,
  useMarkdownControllerCreate,
} from "@/generated/api";
import { MarkdownControllerCreateBody } from "@/generated/api.zod";
import { ApiError } from "@/lib/api-fetch";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const create = useMarkdownControllerCreate({
    mutation: {
      onSuccess: async (result) => {
        await queryClient.invalidateQueries({
          queryKey: getGetMarkdownListQueryKey(),
        });
        const created = result.data as unknown as MarkdownDto | null;
        if (created?.id) {
          router.push(`/markdown/${created.id}`);
          return;
        }
        router.push("/markdown");
      },
      onError: (error) => {
        if (error instanceof ApiError) {
          setFormError(error.message);
          return;
        }
        setFormError(error instanceof Error ? error.message : "Create failed");
      },
    },
  });

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const parsed = MarkdownControllerCreateBody.safeParse({
      title,
      slug,
      content,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setFieldErrors(next);
      return;
    }

    create.mutate({ data: parsed.data });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="marathon-label">System {/* Compose */}</p>
          <h1 className="marathon-display text-[clamp(2.2rem,7vw,4.5rem)] text-white">
            New File
          </h1>
          <p className="max-w-md text-[color:var(--m-muted)] text-sm tracking-wide">
            Enter core parameters, paste markdown markup, then transmit.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/markdown" className="marathon-btn marathon-btn--ghost">
            Cancel
          </Link>
          <button
            type="submit"
            className="marathon-btn"
            disabled={create.isPending}
          >
            {create.isPending ? "Sending…" : "Transmit"}
          </button>
        </div>
      </header>

      {formError ? (
        <p className="border-2 border-[color:var(--m-ink)] bg-[color:var(--m-lime)] px-3 py-2 font-semibold text-[color:var(--m-ink)] text-sm tracking-wide">
          [SYSTEM STATUS: CRITICAL] {formError}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]">
        <aside className="marathon-frame space-y-5 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="marathon-label">Parameters</p>
            <div className="marathon-dots" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <label className="block space-y-2">
            <span className="marathon-label">Title</span>
            <input
              className="marathon-input"
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Getting Started"
              autoComplete="off"
              required
            />
            {fieldErrors.title ? (
              <span className="text-[color:var(--m-lime)] text-xs">
                {fieldErrors.title}
              </span>
            ) : null}
          </label>

          <label className="block space-y-2">
            <span className="marathon-label">Slug</span>
            <input
              className="marathon-input"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="getting-started"
              autoComplete="off"
              required
            />
            {fieldErrors.slug ? (
              <span className="text-[color:var(--m-lime)] text-xs">
                {fieldErrors.slug}
              </span>
            ) : null}
          </label>

          <dl className="space-y-2 border-[color:var(--m-line)] border-t border-dashed pt-4 text-[color:var(--m-muted)] text-xs uppercase tracking-[0.16em]">
            <div className="flex justify-between gap-3">
              <dt>Location</dt>
              <dd className="text-white">Draft sector</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Objective</dt>
              <dd className="text-white">Persist note</dd>
            </div>
          </dl>
        </aside>

        <section className="marathon-frame space-y-4 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="marathon-label">Markdown payload</p>
            <span className="text-[color:var(--m-muted)] text-xs uppercase tracking-[0.18em]">
              SDR37 {/* Terminal */}
            </span>
          </div>
          <label className="block space-y-2">
            <span className="sr-only">Markdown content</span>
            <textarea
              className="marathon-textarea"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={"# Heading\n\nWrite markdown here…"}
              required
            />
            {fieldErrors.content ? (
              <span className="text-[color:var(--m-lime)] text-xs">
                {fieldErrors.content}
              </span>
            ) : null}
          </label>
        </section>
      </div>
    </form>
  );
}
