# Stitch design export

Paste the HTML / CSS / Tailwind export from Google Stitch into this folder.

Suggested layout (you don't need to follow this exactly — paste whatever Stitch gives you):

- `home.html` — Home page mockup
- `gallery.html` — Gallery page
- `detail.html` — Painting detail page
- `about.html` — About page
- `contact.html` — Contact page
- `assets/` — Any images, fonts, or icons exported alongside

When you're done, tell me and I'll port each section into a React component under `components/` and replace the placeholder layouts in `app/`.

## Why a separate folder?

The Stitch export is a static reference, not part of the running app. Keeping it isolated:

- Lets us diff the rendered React output against the original Stitch HTML side by side
- Keeps the Next.js build clean (this folder is excluded from compilation)
- Makes it easy to refresh later if you re-export from Stitch with changes
