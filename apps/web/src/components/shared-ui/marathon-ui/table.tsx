import type { ComponentProps } from "react";
import {
  Table as UiTable,
  TableBody as UiTableBody,
  TableCell as UiTableCell,
  TableHead as UiTableHead,
  TableHeader as UiTableHeader,
  TableRow as UiTableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: ComponentProps<typeof UiTable>) {
  return (
    <UiTable
      className={cn(
        "border border-[#39434a] text-[13px] **:data-[slot=table-container]:overflow-visible",
        className,
      )}
      {...props}
    />
  );
}

export function TableHeader({
  className,
  ...props
}: ComponentProps<typeof UiTableHeader>) {
  return (
    <UiTableHeader
      className={cn("[&_tr]:border-b-[#39434a] [&_tr]:bg-[#11161a]", className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: ComponentProps<typeof UiTableBody>) {
  return (
    <UiTableBody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: ComponentProps<typeof UiTableRow>) {
  return (
    <UiTableRow
      className={cn(
        "min-h-12 border-[#39434a] hover:bg-transparent data-[state=selected]:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: ComponentProps<typeof UiTableHead>) {
  return (
    <UiTableHead
      className={cn(
        "font-(family-name:--font-mu-mono) h-12 px-3.75 font-bold text-[10px] text-muted tracking-normal",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: ComponentProps<typeof UiTableCell>) {
  return (
    <UiTableCell className={cn("h-12 px-3.75 py-0", className)} {...props} />
  );
}
