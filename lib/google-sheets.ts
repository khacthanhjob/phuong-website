import { google } from "googleapis";
import { cacheLife, cacheTag } from "next/cache";
import { driveImageUrl } from "./google-drive";
import { slugify } from "./slug";
import { STUB_PAINTINGS } from "./stub-paintings";
import type { Painting, PaintingStatus } from "./types";

const SHEET_RANGE = "paintings!A:K";
const VALID_STATUSES: PaintingStatus[] = ["available", "sold", "reserved"];

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY env var",
    );
  }
  return new google.auth.JWT({
    email,
    key: rawKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

export async function fetchPaintings(): Promise<Painting[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("paintings");

  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    console.warn(
      "[paintings] GOOGLE_SHEET_ID not set — using stub data. " +
        "See README for setup.",
    );
    return STUB_PAINTINGS;
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: SHEET_RANGE,
  });

  const rows = res.data.values ?? [];
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => String(h).trim().toLowerCase());
  const col = (name: string) => headers.indexOf(name);

  const iId = col("id");
  const iTitle = col("title");
  const iDesc = col("description");
  const iYear = col("year");
  const iMedium = col("medium");
  const iDim = col("dimensions");
  const iImg = col("image_drive_id");
  const iStatus = col("status");
  const iFeat = col("featured");
  const iOrder = col("order");
  const iCollection = col("collection");

  const paintings: Painting[] = [];
  for (const row of rows.slice(1)) {
    const id = row[iId]?.toString().trim();
    const title = row[iTitle]?.toString().trim();
    const imageDriveId = row[iImg]?.toString().trim();
    if (!id || !title || !imageDriveId) continue;

    const rawStatus = (
      row[iStatus]?.toString().trim().toLowerCase() || "available"
    ) as PaintingStatus;
    const status: PaintingStatus = VALID_STATUSES.includes(rawStatus)
      ? rawStatus
      : "available";

    const collectionName =
      iCollection >= 0
        ? row[iCollection]?.toString().trim() || undefined
        : undefined;

    paintings.push({
      id,
      slug: slugify(title),
      title,
      description: row[iDesc]?.toString().trim() ?? "",
      year: Number(row[iYear]) || new Date().getFullYear(),
      medium: row[iMedium]?.toString().trim() || undefined,
      dimensions: row[iDim]?.toString().trim() || undefined,
      imageDriveId,
      imageUrl: driveImageUrl(imageDriveId),
      status,
      featured: String(row[iFeat] ?? "").toLowerCase() === "true",
      order: Number(row[iOrder]) || 0,
      collectionName,
      collectionSlug: collectionName ? slugify(collectionName) : undefined,
    });
  }

  paintings.sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );
  return paintings;
}
