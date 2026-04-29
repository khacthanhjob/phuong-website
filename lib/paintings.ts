import { fetchPaintings } from "./google-sheets";
import type { Collection, Painting } from "./types";

export async function getAllPaintings(): Promise<Painting[]> {
  return fetchPaintings();
}

export async function getFeaturedPaintings(limit = 6): Promise<Painting[]> {
  const all = await fetchPaintings();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getPaintingBySlug(
  slug: string,
): Promise<Painting | undefined> {
  const all = await fetchPaintings();
  return all.find((p) => p.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const all = await fetchPaintings();
  return all.map((p) => p.slug);
}

export async function getAllCollections(): Promise<Collection[]> {
  const all = await fetchPaintings();
  const grouped = new Map<string, Painting[]>();

  for (const p of all) {
    if (!p.collectionSlug || !p.collectionName) continue;
    const existing = grouped.get(p.collectionSlug);
    if (existing) {
      existing.push(p);
    } else {
      grouped.set(p.collectionSlug, [p]);
    }
  }

  const collections: Collection[] = [];
  for (const [slug, paintings] of grouped) {
    const cover =
      paintings.find((p) => p.featured) ??
      paintings.find((p) => p.status === "available") ??
      paintings[0];
    const years = paintings.map((p) => p.year).sort((a, b) => a - b);
    collections.push({
      slug,
      name: paintings[0].collectionName!,
      paintingCount: paintings.length,
      coverImageUrl: cover.imageUrl,
      earliestYear: years[0],
      latestYear: years[years.length - 1],
    });
  }

  collections.sort((a, b) => a.name.localeCompare(b.name));
  return collections;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | undefined> {
  const all = await getAllCollections();
  return all.find((c) => c.slug === slug);
}

export async function getPaintingsByCollection(
  slug: string,
): Promise<Painting[]> {
  const all = await fetchPaintings();
  return all.filter((p) => p.collectionSlug === slug);
}

export async function getAllCollectionSlugs(): Promise<string[]> {
  const all = await getAllCollections();
  return all.map((c) => c.slug);
}
