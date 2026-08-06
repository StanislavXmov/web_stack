import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const markdowns = [
  {
    title: "Getting Started",
    slug: "getting-started",
    content: `# Getting Started

Welcome to the markdown notes app.

## Setup

1. Clone the repository
2. Copy \`.env.example\` to \`.env\`
3. Run \`bun install\`
4. Start the API with \`bun run dev:api\`

## Next steps

- Create your first note
- Explore the REST endpoints under \`/markdown\`
`,
  },
  {
    title: "API Overview",
    slug: "api-overview",
    content: `# API Overview

Base path: \`/markdown\`

| Method | Path | Description |
|--------|------|-------------|
| GET | /markdown | List all notes |
| GET | /markdown/:id | Get one note |
| POST | /markdown | Create a note |
| PATCH | /markdown/:id | Update a note |
| DELETE | /markdown/:id | Delete a note |

All responses are JSON.
`,
  },
  {
    title: "Markdown Cheatsheet",
    slug: "markdown-cheatsheet",
    content: `# Markdown Cheatsheet

## Emphasis

*italic* and **bold** and \`inline code\`

## Lists

- Item one
- Item two
  - Nested item

## Code block

\`\`\`ts
const hello = (name: string) => \`Hello, \${name}\`;
\`\`\`

## Quote

> Notes are stored as plain markdown strings.
`,
  },
  {
    title: "Project Roadmap",
    slug: "project-roadmap",
    content: `# Project Roadmap

## Now

- [x] Prisma schema for Markdown
- [x] NestJS CRUD scaffold
- [ ] Wire DTOs to Prisma

## Next

- [ ] Auth / ownership
- [ ] Search by title and slug
- [ ] Soft delete

## Later

- [ ] Version history
- [ ] Collaborative editing
`,
  },
  {
    title: "Meeting Notes — Kickoff",
    slug: "meeting-notes-kickoff",
    content: `# Kickoff Meeting

**Date:** 2026-08-06  
**Attendees:** Product, Engineering

## Decisions

- Use PostgreSQL + Prisma 7
- Seed local DB with sample markdown docs
- Prefer slug-based URLs on the web app

## Action items

1. Finish markdown CRUD service
2. Generate OpenAPI for the web client
3. Add e2e tests for create/list
`,
  },
] as const;

async function main() {
  for (const note of markdowns) {
    await prisma.markdown.upsert({
      where: { slug: note.slug },
      create: note,
      update: {
        title: note.title,
        content: note.content,
      },
    });
  }

  console.log(`Seeded ${markdowns.length} markdown notes`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
