import Link from "next/link";
import { PaintingCard } from "@/components/PaintingCard";
import { getFeaturedPaintings } from "@/lib/paintings";

export default async function HomePage() {
  const featured = await getFeaturedPaintings(6);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Phượng
        </h1>
        <p className="mt-4 max-w-xl text-lg text-black/70">
          Original paintings — quiet observations of light, water, and the
          everyday. Browse the gallery or get in touch.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/paintings"
            className="inline-flex items-center px-5 py-2.5 bg-neutral-900 text-white text-sm rounded hover:bg-neutral-800"
          >
            View gallery
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 border border-neutral-300 text-sm rounded hover:bg-neutral-50"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <Link href="/paintings" className="text-sm hover:underline underline-offset-4">
            See all →
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-black/60">No featured paintings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <PaintingCard key={p.id} painting={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
