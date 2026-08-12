import Link from "next/link";
import List from "./_components/list";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="marathon-label">System {/* Index */}</p>
          <h1 className="marathon-display text-[clamp(2.5rem,8vw,5rem)] text-white">
            Markdown
          </h1>
          <p className="max-w-md text-(--m-muted) text-sm tracking-wide">
            Operational notes archive. Select a file or open a new transmission.
          </p>
        </div>
        <Link href="/markdown/new" className="marathon-btn">
          Create
        </Link>
      </header>

      <section className="marathon-frame p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="marathon-label">Response queue</p>
          <div className="marathon-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
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
        <List />
      </section>
    </div>
  );
}
