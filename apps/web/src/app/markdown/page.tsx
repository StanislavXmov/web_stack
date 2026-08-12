import { ButtonLink } from "./_components/button";
import { Display } from "./_components/display";
import { Dots } from "./_components/dots";
import { Frame } from "./_components/frame";
import { Label } from "./_components/label";
import List from "./_components/list";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <Label>System {/* Index */}</Label>
          <Display className="text-[clamp(2.5rem,8vw,5rem)] text-white">
            Markdown
          </Display>
          <p className="max-w-md text-(--m-muted) text-sm tracking-wide">
            Operational notes archive. Select a file or open a new transmission.
          </p>
        </div>
        <ButtonLink href="/markdown/new">Create</ButtonLink>
      </header>

      <Frame className="p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Label>Response queue</Label>
          <Dots />
        </div>
        <List />
      </Frame>
    </div>
  );
}
