import { Timeline, type TimelineYear } from "@/app/widget/_components/timeline";

const timelineItems = [
  {
    year: 2005,
    events: [
      {
        id: "marketplace-launch",
        text: "Создание крупнейшей электронной площадки TEST",
      },
    ],
  },
  {
    year: 2006,
    events: [
      {
        id: "temporary-2006",
        text: "Временное событие за 2006 год",
      },
    ],
  },
  {
    year: 2008,
    events: [
      {
        id: "rosatom-integration",
        text: "TEST интегрирован с системой SAP",
      },
    ],
  },
  {
    year: 2009,
    events: [
      {
        id: "temporary-2009",
        text: "Временное событие за 2009 год",
      },
    ],
  },
  {
    year: 2010,
    events: [
      {
        id: "temporary-2010",
        text: "Временное событие за 2010 год",
      },
    ],
  },
  {
    year: 2011,
    events: [
      {
        id: "temporary-2011",
        text: "Временное событие за 2011 год",
      },
    ],
  },
  {
    year: 2012,
    events: [
      {
        id: "section-223-fz",
        text: "Создание специальной секции TEST",
      },
    ],
  },
  {
    year: 2013,
    events: [
      {
        id: "section-1",
        text: "Создание специальной секции 223-ФЗ для закупок товаров, работ, услуг отдельными видами юридических лиц",
      },
    ],
  },
  {
    year: 2014,
    events: [
      {
        id: "section-2",
        text: "Создание специальной секции 223-ФЗ для закупок товаров, работ, услуг отдельными видами юридических лиц",
      },
    ],
  },
  {
    year: 2015,
    events: [
      {
        id: "section-3",
        text: "Создание специальной секции",
      },
    ],
  },
  {
    year: 2016,
    events: [
      {
        id: "section-4",
        text: "Создание специальной секции",
      },
    ],
  },
  {
    year: 2017,
    events: [
      {
        id: "section-5",
        text: "Создание специальной секции",
      },
    ],
  },
  {
    year: 2018,
    events: [
      {
        id: "section-6",
        text: "Создание специальной секции",
      },
    ],
  },
  {
    year: 2019,
    events: [
      {
        id: "section-7",
        text: "Создание специальной секции",
      },
    ],
  },
] as const satisfies readonly TimelineYear[];

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white sm:py-4">
      <Timeline
        title="Гордимся каждым годом"
        items={timelineItems}
        initialYear={2005}
      />
    </main>
  );
}
