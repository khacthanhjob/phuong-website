import { fetchPaintings } from "./google-sheets";
import type { Painting } from "./types";

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
