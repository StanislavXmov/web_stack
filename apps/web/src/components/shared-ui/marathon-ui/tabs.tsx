"use client";

import type { ComponentProps } from "react";
import {
  Tabs as UiTabs,
  TabsContent as UiTabsContent,
  TabsList as UiTabsList,
  TabsTrigger as UiTabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function Tabs({ className, ...props }: ComponentProps<typeof UiTabs>) {
  return <UiTabs className={cn("gap-0", className)} {...props} />;
}

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof UiTabsList>) {
  return (
    <UiTabsList
      variant="line"
      className={cn(
        "mb-7.5 h-auto w-full justify-start gap-0 rounded-none border-(--line) border-b bg-transparent p-0",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof UiTabsTrigger>) {
  return (
    <UiTabsTrigger
      className={cn(
        "font-(family-name:--font-mu-mono) min-h-11 flex-none rounded-none border-0 border-transparent border-b-[3px] bg-transparent px-4.5 py-0 font-bold text-(--fg) text-[11px] tracking-normal shadow-none",
        "hover:bg-transparent hover:text-(--fg) data-active:border-(--signal) data-active:bg-[color-mix(in_srgb,var(--signal)_12%,transparent)] data-active:text-(--fg) data-active:shadow-none",
        "after:hidden focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof UiTabsContent>) {
  return <UiTabsContent className={cn(className)} {...props} />;
}
