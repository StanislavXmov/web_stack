"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";
import { Button } from "./button";
import { ColorToken } from "./color-token";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import {
  Notice,
  NoticeAction,
  NoticeDescription,
  NoticeIndex,
  NoticeTitle,
} from "./notice";
import { MarathonUiProvider, useMarathonUi } from "./provider";
import { Eyebrow, SectionHead } from "./section-head";
import {
  SpecCard,
  SpecCardContent,
  SpecCardHeader,
  SpecCardMeta,
  SpecCardTitle,
} from "./spec-card";
import { StatePreview } from "./state-preview";
import { Status } from "./status";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const tokens = [
  {
    name: "signal / primary",
    css: "--signal",
    value: "#C8FF1A",
    color: "var(--signal)",
  },
  {
    name: "hazard / domain",
    css: "--hazard",
    value: "#FF5C35",
    color: "var(--hazard)",
  },
  {
    name: "void / 950",
    css: "--void",
    value: "#0A0D10",
    color: "var(--void)",
  },
  {
    name: "alloy / 100",
    css: "--alloy",
    value: "#E8EDF0",
    color: "var(--alloy)",
  },
  {
    name: "cyan / info",
    css: "--info",
    value: "#29D6E8",
    color: "var(--info)",
  },
  {
    name: "red / critical",
    css: "--critical",
    value: "#FF315A",
    color: "var(--critical)",
  },
] as const;

const nav = [
  { id: "overview", label: "Обзор" },
  { id: "color", label: "Цвет" },
  { id: "type", label: "Типографика" },
  { id: "space", label: "Интервалы" },
  { id: "components", label: "Компоненты" },
  { id: "patterns", label: "Паттерны" },
] as const;

const spaces = [4, 8, 16, 24, 32, 48, 64] as const;

function ShowcaseChrome() {
  const { theme, density, toggleTheme, toggleDensity } = useMarathonUi();
  const [notice, setNotice] = useState(true);
  const [tab, setTab] = useState<"idle" | "active" | "danger">("active");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-20 grid h-17.5 grid-cols-[260px_1fr_auto] items-center border-(--line) border-b",
          "bg-[color-mix(in_oklch,var(--bg)_90%,transparent)] backdrop-blur-lg",
          "max-sm:h-15 max-sm:grid-cols-[1fr_auto] max-[1050px]:grid-cols-[220px_1fr_auto]",
        )}
      >
        <a
          href="#overview"
          className="font-(family-name:--font-mu-mono) flex h-full items-center gap-3.5 border-(--line) border-r px-5.5 font-extrabold text-sm tracking-widest max-sm:border-0 max-sm:px-3.5"
          aria-label="VANTAGE UI — к обзору"
        >
          <BrandMark />
          <span className="max-sm:hidden">VANTAGE / UI</span>
        </a>
        <div className="font-(family-name:--font-mu-mono) justify-self-center text-[11px] text-muted tracking-[0.15em] max-sm:hidden">
          <span className="mr-2.5 inline-block size-1.75 rounded-full bg-(--signal) shadow-[0_0_0_5px_color-mix(in_srgb,var(--signal)_18%,transparent)]" />
          SYSTEM ONLINE <b className="ml-2.5 text-(--fg)">v0.8</b>
        </div>
        <div className="flex h-full">
          <button
            type="button"
            onClick={toggleDensity}
            className="font-(family-name:--font-mu-mono) min-w-20.5 cursor-pointer border-(--line) border-0 border-l bg-transparent font-bold text-[11px] tracking-[0.12em] hover:bg-(--signal) hover:text-(--void) focus-visible:bg-(--signal) focus-visible:text-(--void) max-sm:min-w-16.5"
          >
            {density === "field" ? "FIELD" : "DENSE"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="font-(family-name:--font-mu-mono) min-w-20.5 cursor-pointer border-(--line) border-0 border-l bg-transparent font-bold text-[11px] tracking-[0.12em] hover:bg-(--signal) hover:text-(--void) focus-visible:bg-(--signal) focus-visible:text-(--void) max-sm:min-w-16.5"
          >
            {theme === "light" ? "DARK" : "LIGHT"}
          </button>
        </div>
      </header>

      <aside
        className={cn(
          "fixed top-17.5 bottom-0 z-10 flex w-65 flex-col border-(--line) border-r bg-(--bg) px-5.5 py-9",
          "max-[1050px]:w-55",
          "max-sm:top-15 max-sm:right-0 max-sm:bottom-auto max-sm:left-0 max-sm:block max-sm:h-12 max-sm:w-auto max-sm:overflow-auto max-sm:border-r-0 max-sm:border-b max-sm:px-0 max-sm:py-0",
        )}
        aria-label="Навигация по разделам"
      >
        <div className="font-(family-name:--font-mu-mono) font-bold text-[11px] text-muted tracking-[0.14em] max-sm:hidden">
          INDEX / 06
        </div>
        <nav className="mt-8.5 grid max-sm:mt-0 max-sm:flex max-sm:w-max">
          {nav.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "grid grid-cols-[34px_1fr] items-center border-border border-b py-3.5 text-sm transition-[padding,color,border-color]",
                "hover:border-(--signal) hover:pl-2 hover:text-[color-mix(in_oklch,var(--fg)_80%,var(--accent))]",
                "max-sm:flex max-sm:h-11.75 max-sm:gap-2 max-sm:whitespace-nowrap max-sm:border-r max-sm:border-b-0 max-sm:px-3.75 max-sm:py-0 max-sm:text-xs max-sm:hover:pl-3.75",
              )}
            >
              <b className="font-(family-name:--font-mu-mono) font-bold text-[11px] text-muted">
                0{index + 1}
              </b>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="font-(family-name:--font-mu-mono) mt-auto text-[11px] text-muted leading-[1.7] max-sm:hidden">
          59.31° N
          <br />
          18.06° E
        </div>
      </aside>

      <div className="ml-65 pt-17.5 max-sm:ml-0 max-sm:pt-27 max-[1050px]:ml-55">
        <section
          id="overview"
          className="grid min-h-[calc(100vh-70px)] grid-cols-[1.45fr_0.55fr] border-(--line) border-b max-sm:min-h-0 max-[1050px]:grid-cols-1"
        >
          <div className="relative overflow-hidden px-(--pad) pt-[clamp(70px,9vw,132px)] pb-20 max-sm:px-5 max-sm:pt-16 max-sm:pb-17.5">
            <span
              aria-hidden
              className="font-(family-name:--font-mu-display) pointer-events-none absolute right-[-2vw] bottom-[-15vw] z-[-1] font-black text-(--signal) text-[clamp(320px,42vw,700px)] leading-[0.8] opacity-[0.62] max-sm:-bottom-12.5 max-sm:text-[300px]"
            >
              V
            </span>
            <Eyebrow>DESIGN SYSTEM / EXTRACTION INTERFACES</Eyebrow>
            <h1 className="font-(family-name:--font-mu-display) mt-8.5 mb-10.5 max-w-217.5 font-black text-[clamp(72px,9vw,150px)] uppercase leading-[0.78] tracking-[-0.055em] max-sm:text-[clamp(65px,22vw,96px)]">
              Интерфейс
              <br />
              <em className="text-transparent not-italic [-webkit-text-stroke:2px_var(--fg)]">
                полевого
              </em>
              <br />
              уровня.
            </h1>
            <p className="m-0 max-w-155 text-pretty text-[clamp(17px,1.5vw,22px)]">
              Компоненты для решений под давлением: высокая читаемость,
              мгновенная обратная связь и один сигнал действия на экран.
            </p>
          </div>
          <div
            className={cn(
              "flex flex-col justify-end border-(--line) border-l p-(--pad)",
              "bg-[repeating-linear-gradient(0deg,transparent_0_31px,var(--border)_32px)]",
              "max-[1050px]:grid max-[1050px]:min-h-107.5 max-[1050px]:grid-cols-2 max-[1050px]:items-center max-[1050px]:gap-8.75 max-[1050px]:border-t max-[1050px]:border-l-0",
              "max-sm:min-h-0 max-sm:grid-cols-1 max-sm:px-5 max-sm:py-10",
            )}
          >
            <div className="relative mx-auto grid aspect-square w-full max-w-[320px] place-items-center rounded-full border border-(--line) bg-[conic-gradient(from_220deg,color-mix(in_srgb,var(--signal)_50%,transparent),transparent_28%)] max-sm:max-w-60">
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-px bg-(--line)"
              />
              <span
                aria-hidden
                className="absolute inset-y-0 left-1/2 w-px bg-(--line)"
              />
              <span
                aria-hidden
                className="size-4 rounded-full bg-(--hazard) shadow-[46px_-62px_0_-4px_var(--signal),-72px_50px_0_-3px_var(--info)]"
              />
              <i className="font-(family-name:--font-mu-mono) absolute bottom-[17%] font-extrabold text-xs not-italic tracking-[0.2em]">
                READY
              </i>
            </div>
            <dl className="mt-11.25 mb-0 max-[1050px]:mt-0">
              {(
                [
                  ["GRID", "8 PX"],
                  ["RADIUS", "0–12"],
                  ["CONTRAST", "AA+"],
                  ["MOTION", "160 MS"],
                ] as const
              ).map(([dt, dd]) => (
                <div
                  key={dt}
                  className="font-(family-name:--font-mu-mono) flex justify-between border-(--line) border-t py-3 text-xs"
                >
                  <dt className="text-muted">{dt}</dt>
                  <dd className="m-0 font-extrabold">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="color"
          data-mu-block
          className="scroll-mt-17.5 border-(--line) border-b px-(--pad) py-[clamp(70px,8vw,120px)] max-sm:scroll-mt-27 max-sm:px-5 max-sm:py-17"
        >
          <SectionHead
            index="01"
            eyebrow="FOUNDATIONS"
            title="Сигнальная палитра"
            description="Нейтрали держат плотность. Цвет появляется только у действия, состояния или риска."
          />
          <div className="grid grid-cols-3 border-(--line) border-t border-l max-sm:grid-cols-1 max-[1050px]:grid-cols-2">
            {tokens.map((token) => (
              <ColorToken
                key={token.css}
                name={token.name}
                cssVar={token.css}
                value={token.value}
                color={token.color}
              />
            ))}
          </div>
        </section>

        <section
          id="type"
          data-mu-block
          className="grid scroll-mt-17.5 grid-cols-[minmax(280px,0.55fr)_1.45fr] gap-[6vw] border-(--line) border-b px-(--pad) py-[clamp(70px,8vw,120px)] max-sm:scroll-mt-27 max-sm:grid-cols-1 max-sm:px-5 max-sm:py-17"
        >
          <SectionHead
            vertical
            index="02"
            eyebrow="VOICE"
            title="Типографика"
            description="Узкий дисплейный голос для команд. Моноширинный — для данных. Системный — для чтения."
            className="max-sm:mb-9.5"
          />
          <div className="border-(--line) border-t">
            <div className="grid grid-cols-[130px_1fr] items-baseline gap-5.5 border-(--line) border-b py-6 max-sm:grid-cols-1 max-sm:py-4.5">
              <span className="font-(family-name:--font-mu-mono) text-[10px] text-muted">
                DISPLAY / 88
              </span>
              <strong className="font-(family-name:--font-mu-display) font-black text-[clamp(64px,9vw,130px)] leading-[0.8] tracking-tighter">
                EXTRACT
              </strong>
            </div>
            <div className="grid grid-cols-[130px_1fr] items-baseline gap-5.5 border-(--line) border-b py-6 max-sm:grid-cols-1 max-sm:py-4.5">
              <span className="font-(family-name:--font-mu-mono) text-[10px] text-muted">
                TITLE / 40
              </span>
              <strong className="font-(family-name:--font-mu-display) font-black text-[clamp(36px,5vw,64px)] leading-none">
                Сектор потерян
              </strong>
            </div>
            <div className="grid grid-cols-[130px_1fr] items-baseline gap-5.5 border-(--line) border-b py-6 max-sm:grid-cols-1 max-sm:py-4.5">
              <span className="font-(family-name:--font-mu-mono) text-[10px] text-muted">
                BODY / 16
              </span>
              <p className="m-0 max-w-140 text-[17px]">
                Маршрут пересчитан. До безопасной зоны 340 метров. Следующая
                проверка сигнала через 12 секунд.
              </p>
            </div>
            <div className="grid grid-cols-[130px_1fr] items-baseline gap-5.5 border-(--line) border-b py-6 max-sm:grid-cols-1 max-sm:py-4.5">
              <span className="font-(family-name:--font-mu-mono) text-[10px] text-muted">
                MONO / 13
              </span>
              <code className="text-[13px] tracking-[0.08em]">
                UNIT_84 · LAT 59.31 · PING 024MS
              </code>
            </div>
          </div>
        </section>

        <section
          id="space"
          data-mu-block
          className="scroll-mt-17.5 border-(--line) border-b px-(--pad) py-[clamp(70px,8vw,120px)] max-sm:scroll-mt-27 max-sm:px-5 max-sm:py-17"
        >
          <SectionHead
            index="03"
            eyebrow="RHYTHM"
            title="Сетка и интервалы"
            description="Базовый модуль 8 px. Исключения допускаются только для оптического выравнивания текста."
          />
          <div className="grid grid-cols-7 border border-(--line) max-sm:grid-cols-2 max-[1050px]:grid-cols-4">
            {spaces.map((n, i) => (
              <div
                key={n}
                className={cn(
                  "flex min-h-52.5 flex-col justify-end gap-2.5 border-(--line) border-r p-4.5 max-sm:min-h-37.5",
                  i === spaces.length - 1 && "border-r-0",
                  "max-sm:even:border-r-0 max-[1050px]:nth-4:border-r-0",
                )}
              >
                <span
                  className="block h-2.5 bg-(--signal)"
                  style={{ width: `${Math.max(8, n * 1.35)}px` }}
                />
                <b className="font-(family-name:--font-mu-display) font-black text-[32px] leading-none">
                  {n}
                </b>
                <code className="text-[10px] text-muted">space-{n / 4}</code>
              </div>
            ))}
          </div>
        </section>

        <section
          id="components"
          data-mu-block
          className="scroll-mt-17.5 border-(--line) border-b px-(--pad) py-[clamp(70px,8vw,120px)] max-sm:scroll-mt-27 max-sm:px-5 max-sm:py-17"
        >
          <SectionHead
            index="04"
            eyebrow="CONTROLS"
            title="Основные компоненты"
            description="Все цели касания от 44 px. Активное состояние считывается формой, цветом и подписью."
          />
          <div className="grid grid-cols-2 gap-4.5 max-sm:grid-cols-1">
            <SpecCard wide>
              <SpecCardHeader>
                <SpecCardTitle>BUTTON / 01</SpecCardTitle>
                <SpecCardMeta>4 STATES</SpecCardMeta>
              </SpecCardHeader>
              <SpecCardContent className="flex flex-wrap gap-3 max-sm:grid">
                <Button>
                  Начать поиск <span className="ml-4.5">↗</span>
                </Button>
                <Button variant="secondary">Сохранить</Button>
                <Button variant="ghost">Отмена</Button>
                <Button disabled>Недоступно</Button>
              </SpecCardContent>
            </SpecCard>

            <SpecCard>
              <SpecCardHeader>
                <SpecCardTitle>STATUS / 02</SpecCardTitle>
                <SpecCardMeta>SEMANTIC</SpecCardMeta>
              </SpecCardHeader>
              <SpecCardContent className="grid content-center gap-4.5">
                <Status variant="ok">Синхронизировано</Status>
                <Status variant="warn">Сигнал слабый</Status>
                <Status variant="fail">Контакт потерян</Status>
              </SpecCardContent>
            </SpecCard>

            <SpecCard>
              <SpecCardHeader>
                <SpecCardTitle>INPUT / 03</SpecCardTitle>
                <SpecCardMeta>VALIDATION</SpecCardMeta>
              </SpecCardHeader>
              <SpecCardContent className="grid gap-4.5">
                <Field>
                  <FieldLabel>Позывной</FieldLabel>
                  <Input defaultValue="NORTHSTAR_07" />
                </Field>
                <Field data-invalid>
                  <FieldLabel>Код доступа</FieldLabel>
                  <Input defaultValue="84-A" aria-invalid />
                  <FieldError>Нужно 6 символов</FieldError>
                </Field>
              </SpecCardContent>
            </SpecCard>

            <SpecCard wide>
              <SpecCardHeader>
                <SpecCardTitle>SEGMENT / 04</SpecCardTitle>
                <SpecCardMeta>INTERACTIVE</SpecCardMeta>
              </SpecCardHeader>
              <SpecCardContent>
                <Tabs
                  value={tab}
                  onValueChange={(v) =>
                    setTab(v as "idle" | "active" | "danger")
                  }
                >
                  <TabsList>
                    <TabsTrigger value="idle">Ожидание</TabsTrigger>
                    <TabsTrigger value="active">Активно</TabsTrigger>
                    <TabsTrigger value="danger">Угроза</TabsTrigger>
                  </TabsList>
                  <TabsContent value="idle">
                    <StatePreview
                      variant="idle"
                      title="Сканирование приостановлено"
                      description="Автоматическая проверка каждые 12 секунд."
                      code="IDLE_04"
                    />
                  </TabsContent>
                  <TabsContent value="active">
                    <StatePreview
                      variant="active"
                      title="Периметр стабилен"
                      description="Автоматическая проверка каждые 12 секунд."
                      code="ACTIVE_06"
                    />
                  </TabsContent>
                  <TabsContent value="danger">
                    <StatePreview
                      variant="danger"
                      title="Обнаружена угроза"
                      description="Смените маршрут и подтвердите новый сектор."
                      code="DANGER_06"
                    />
                  </TabsContent>
                </Tabs>
              </SpecCardContent>
            </SpecCard>
          </div>
        </section>

        <section
          id="patterns"
          data-mu-block
          className={cn(
            "scroll-mt-17.5 border-(--line) border-b px-(--pad) py-[clamp(70px,8vw,120px)]",
            "bg-(--void) text-[#f4f7f8] [--border:#242a2f] [--line:#323a40] [--muted:#9aa5ad] [--panel:#11161a]",
            "max-sm:scroll-mt-27 max-sm:px-5 max-sm:py-17",
          )}
        >
          <SectionHead
            index="05"
            eyebrow="PATTERNS"
            title="Обратная связь"
            description="Пользователь всегда видит результат действия, следующий шаг и способ отмены."
          />
          <div className="grid grid-cols-2 gap-8.5 max-[1050px]:grid-cols-1">
            <div>
              <Eyebrow className="mb-4">NOTIFICATION</Eyebrow>
              {notice ? (
                <Notice>
                  <NoticeIndex>01</NoticeIndex>
                  <div>
                    <NoticeTitle>Маршрут сохранён</NoticeTitle>
                    <NoticeDescription>
                      Точка R-14 доступна офлайн.
                    </NoticeDescription>
                  </div>
                  <NoticeAction className="relative top-0 right-0">
                    <button
                      type="button"
                      onClick={() => setNotice(false)}
                      aria-label="Закрыть"
                      className="cursor-pointer border-0 bg-transparent p-0 text-[23px] text-white leading-none"
                    >
                      ×
                    </button>
                  </NoticeAction>
                </Notice>
              ) : (
                <Button onClick={() => setNotice(true)}>Показать снова</Button>
              )}
            </div>
            <div>
              <Eyebrow className="mb-4">DATA ROW</Eyebrow>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сектор</TableHead>
                    <TableHead>Пинг</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>R-14</TableCell>
                    <TableCell>
                      <code className="text-muted">024 ms</code>
                    </TableCell>
                    <TableCell>
                      <Status variant="ok">online</Status>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>V-02</TableCell>
                    <TableCell>
                      <code className="text-muted">118 ms</code>
                    </TableCell>
                    <TableCell>
                      <Status variant="warn">unstable</Status>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>K-11</TableCell>
                    <TableCell>
                      <code className="text-muted">—</code>
                    </TableCell>
                    <TableCell>
                      <Status variant="fail">lost</Status>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <footer className="grid min-h-55 grid-cols-[1fr_1fr_auto] items-center gap-10 bg-(--signal) px-(--pad) py-12.5 text-(--void) max-sm:grid-cols-1 max-sm:gap-5.5 max-sm:px-5 max-sm:py-10.5">
          <div className="font-(family-name:--font-mu-mono) flex items-center gap-3 font-black text-base">
            <BrandMark size="small" />
            <b>VANTAGE UI</b>
          </div>
          <p className="m-0 font-bold">
            Токены → компоненты → паттерны.
            <br />
            Сначала задача. Затем сигнал.
          </p>
          <code className="text-[10px]">BUILD 0.8.14 / INTERNAL</code>
        </footer>
      </div>
    </>
  );
}

export function MarathonUiShowcase({ className }: { className?: string }) {
  return (
    <MarathonUiProvider className={cn("relative", className)}>
      <ShowcaseChrome />
    </MarathonUiProvider>
  );
}
