# Infinity Gems & Minerals

Built with **Vite + React 18 + TypeScript + Tailwind CSS + React Router v6**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Routes

| Path | Page |
|---|---|
| `/` | Landing — hero, about, featured specimens |
| `/collection` | Full gallery with gem type & availability filters |
| `/item/:id` | Specimen detail — images, specs, inquiry button |
| `/contact` | Contact form |
| `/admin` | Hidden admin dashboard (not linked in nav) |

## Admin

Navigate directly to `/admin`.

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `vault2024` |

## Stack

- **Vite 5** — instant dev server, no SSR overhead
- **React Router v6** — client-side routing via `<Routes>`
- **Tailwind CSS 3** — utility classes + custom design tokens
- **No backend** — all data is mock JSON in `src/data/ores.ts`
