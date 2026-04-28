<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version is **Next.js 16** with **Cache Components enabled** (`cacheComponents: true` in `next.config.ts`). APIs and conventions differ from older Next.js — read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Key differences to keep in mind:

- **Caching**: use the `'use cache'` directive with `cacheLife()` and `cacheTag()` from `next/cache`. Do NOT use `export const revalidate = N` — that's the previous model.
- **Revalidation**: `revalidateTag(tag, 'max')` for stale-while-revalidate (route handlers + actions); `updateTag(tag)` for read-your-own-writes (server actions only).
- **Page params**: dynamic route params are `Promise<{...}>` and must be awaited: `const { slug } = await params`.
- **Prerendering**: with Cache Components on, dynamic routes need `generateStaticParams` returning sample params, OR access to `params` must be inside a `<Suspense>` boundary, OR the whole page wrapped in `'use cache'`.
- **Tailwind v4**: no `tailwind.config.ts`. Theme config lives in `app/globals.css` via `@theme inline { ... }`. PostCSS uses `@tailwindcss/postcss`.
<!-- END:nextjs-agent-rules -->

# Project context

`phuong-website` is a portfolio for painter Phượng. Customers browse paintings and contact her via static info (no e-commerce). Content (paintings + metadata) lives in a Google Sheet, images in Google Drive — Phượng updates them directly. The site fetches at build/cache time via `googleapis` + a service account.

Without the Google env vars, the site renders 3 stub paintings so dev/preview works without setup. See `.env.local.example` and `README.md` for setup steps.

The visual design comes from a Google Stitch export the user will paste into `stitch-export/`. Port that into the React components under `components/` and update the page layouts in `app/`.
