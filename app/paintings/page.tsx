import { PaintingCard } from "@/components/PaintingCard";
import { getAllPaintings } from "@/lib/paintings";

export const metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const paintings = await getAllPaintings();

  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 pb-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Gallery</h1>
        <p className="mt-2 text-black/60">
          {paintings.length} {paintings.length === 1 ? "painting" : "paintings"}
        </p>
      </header>

      {paintings.length === 0 ? (
        <p className="text-black/60">No paintings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paintings.map((p) => (
            <PaintingCard key={p.id} painting={p} />
          ))}
        </div>
      )}
    </section>
  );
}
