# Phượng — Portfolio Website

Portfolio site for painter Phượng. Customers browse the gallery and contact Phượng via the static info on the Contact page. Content is managed from a Google Sheet (metadata) + Google Drive (images), so Phượng can add or edit paintings without touching code.

Built with Next.js 16, Tailwind CSS v4, and the Google Sheets/Drive API.

## Stack

- **Next.js 16** (App Router, Cache Components, Server Components by default)
- **Tailwind CSS v4** (theme in `app/globals.css`, no `tailwind.config.ts`)
- **TypeScript**
- **googleapis** (Sheets read-only)
- **lucide-react** (icons)

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Without the Google env vars set, the site renders 3 stub paintings so you can see the layout immediately.

## Setting up the real content (Google Sheet + Drive)

### 1. Make the Sheet

Create a new Google Sheet with a tab named `paintings` and these column headers in row 1:

| Column | Required | Example | Notes |
|---|---|---|---|
| `id` | yes | `p001` | Stable identifier — never change it once set |
| `title` | yes | `Morning Lotus` | Used as display title and to build the URL slug |
| `description` | yes | `Oil on canvas, inspired by…` | Long-form description |
| `year` | yes | `2024` | Integer |
| `medium` | no | `Oil on canvas` | |
| `dimensions` | no | `60 x 80 cm` | |
| `image_drive_id` | yes | `1aBcDeFgH…` | The file ID from the Drive image's share URL |
| `status` | no | `available` | One of: `available`, `sold`, `reserved` (default `available`) |
| `featured` | no | `TRUE` | `TRUE` to show on Home page |
| `order` | no | `1` | Lower numbers appear first; ties broken alphabetically |
| `collection` | no | `Quiet Realism` | Free-text series name. Paintings sharing the same value group into a collection page (e.g. `/collections/quiet-realism`). Leave blank to keep a painting unfiled |

Add one row per painting.

Tip: collections are derived automatically from this column — type the same name (e.g. `Quiet Realism`) on every row that belongs to that series and the site will build a `/collections/quiet-realism` page showing them all. To rename a collection, find-replace the name across all rows.

### 2. Upload images to Drive

Create a Drive folder (e.g. `Phượng — Paintings`) and upload each image. For each painting, copy the file's share URL — it looks like:

```
https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view
```

The chunk between `/d/` and `/view` is the **file ID**. Paste that into the `image_drive_id` column.

### 3. Make a service account

In Google Cloud Console:

1. Create a project (or pick an existing one).
2. Enable **Google Sheets API** and **Google Drive API**.
3. Create a **service account** with the `Viewer` role.
4. Generate a **JSON key** and download it.

### 4. Share the Sheet and the Drive folder

In both the Sheet and the Drive folder, click **Share** and add the service account's email (`xxx@xxx.iam.gserviceaccount.com`) with **Viewer** access.

### 5. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in the values from the JSON key:

```bash
cp .env.local.example .env.local
```

| Variable | Source |
|---|---|
| `GOOGLE_SHEET_ID` | Sheet URL — between `/d/` and `/edit` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON key |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | `private_key` from the JSON key — keep the literal `\n` escapes |
| `REVALIDATE_SECRET` | Any random string (e.g. `openssl rand -hex 32`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email used in mailto links on painting detail pages |

Restart the dev server after editing `.env.local`.

## Refreshing the site after editing the Sheet

Cached painting data revalidates automatically every hour. To force an immediate refresh:

```bash
curl -X POST "https://your-domain.com/api/revalidate?secret=<REVALIDATE_SECRET>&tag=paintings"
```

(Replace `your-domain.com` and the secret with your real values.)

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. In the **Environment Variables** step, paste the same values from your `.env.local`.
4. Deploy.

Vercel will rebuild on every push to `main`.

## Project layout

```
app/
  layout.tsx               Root layout (header, footer, metadata)
  page.tsx                 Home (hero + featured paintings)
  paintings/
    page.tsx               Gallery grid
    [slug]/page.tsx        Painting detail
  about/page.tsx           Bio
  contact/page.tsx         Contact info
  api/revalidate/route.ts  Manual cache flush webhook

components/
  Header.tsx
  Footer.tsx
  PaintingCard.tsx

lib/
  types.ts                 Painting type
  google-sheets.ts         fetchPaintings() — reads & parses the Sheet
  google-drive.ts          driveImageUrl() — builds public thumbnail URL
  paintings.ts             Higher-level helpers (featured, by-slug, all-slugs)
  slug.ts                  slugify()
  stub-paintings.ts        Fallback data when env vars are missing

stitch-export/             Paste the Stitch HTML/CSS export here (see folder README)
```

## Caching model

This project uses **Next.js 16 Cache Components**. The `fetchPaintings()` function is annotated with `'use cache'`, `cacheLife('hours')`, and `cacheTag('paintings')`, so:

- All visitors share the same cached snapshot of the Sheet.
- The cache auto-refreshes on the `'hours'` profile.
- `POST /api/revalidate?secret=…&tag=paintings` calls `revalidateTag('paintings', 'max')` to force a refresh on the next request.

If you ever need to disable Cache Components, flip `cacheComponents: false` in `next.config.ts` and remove the `'use cache'` directives — but expect to lose the cache-tag webhook flow.
