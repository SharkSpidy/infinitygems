# Infinity Gems & Minerals

An exclusive luxury collectible ore website — built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, about, featured specimens |
| `/collection` | Full gallery with Sapphire/Ruby filters |
| `/item/[id]` | Item detail with specs & inquiry button |
| `/contact` | General contact form |
| `/admin` | **Hidden** admin dashboard (not linked anywhere) |

---

## Admin Access

Navigate directly to `/admin` — it is never linked in the site header or footer.

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `vault2024` |

### Admin Features
- **Inventory list** — view, filter, edit, delete specimens
- **Add Specimen** — full form with all fields
- **Edit Specimen** — inline editing panel
- Live stats: Total / Available / Reserved / Sold

---

## Design System

- **Palette:** Obsidian dark (`#0A0A0B`), Charcoal, Gold accents (`#C9A84C`)
- **Headings:** Cormorant Garamond (elegant serif)
- **Body:** DM Sans (clean, light weight)
- **No prices ever displayed** — all purchases via "Inquire for Valuation"

---

## Tech Stack

- Next.js 14 App Router
- React 18 + TypeScript
- Tailwind CSS 3
- Google Fonts (Cormorant Garamond + DM Sans)
- Unsplash placeholder images
- All state is mock/local (no backend required)
