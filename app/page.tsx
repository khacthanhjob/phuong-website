import Image from "next/image";
import Link from "next/link";
import { PaintingCard } from "@/components/PaintingCard";
import { getAllPaintings, getFeaturedPaintings } from "@/lib/paintings";

export default async function HomePage() {
  const featured = await getFeaturedPaintings(6);
  const all = await getAllPaintings();
  const hero = featured[0] ?? all[0];

  return (
    <>
      {/* Hero Section: The Masterpiece */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="z-10 max-w-2xl">
          <p className="font-label text-[11px] tracking-[0.3em] uppercase text-outline mb-4">
            Original Paintings
          </p>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-tighter mb-8">
            Silence <span className="italic text-tertiary">in</span> Motion
          </h1>
          <div className="flex gap-8 items-center">
            <Link
              href="/paintings"
              className="bg-primary text-on-primary px-8 py-4 font-label text-xs tracking-widest uppercase hover:bg-primary-dim transition-all duration-300"
            >
              View Gallery
            </Link>
            <Link
              href="/about"
              className="text-primary font-label text-xs tracking-widest uppercase border-b border-outline-variant/30 pb-1 hover:border-primary transition-all"
            >
              The Artist
            </Link>
          </div>
        </div>

        {hero && (
          <div className="absolute right-0 top-0 w-3/5 h-full hidden md:block">
            <Image
              src={hero.imageUrl}
              alt={hero.title}
              fill
              priority
              sizes="60vw"
              className="object-cover grayscale-[20%]"
            />
          </div>
        )}
      </section>

      {/* About teaser: asymmetric */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 px-6 md:px-12 lg:px-24 mb-32 md:mb-48 items-center">
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] bg-surface-container-low p-8 md:p-12">
            {/* TODO: replace with portrait of Phượng */}
            <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
              <p className="font-label text-[10px] tracking-widest uppercase text-outline">
                Portrait
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-40 h-40 md:w-48 md:h-48 bg-tertiary flex items-center justify-center p-6 md:p-8 text-on-primary">
            <p className="font-headline text-sm italic text-center">
              &ldquo;Painting is the architecture of stillness.&rdquo;
            </p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <h2 className="font-headline text-4xl mb-8 tracking-tight">
            The Hand Behind the Canvas
          </h2>
          <div className="space-y-6 font-body text-on-surface-variant leading-relaxed text-lg">
            {/* TODO: replace with Phượng's real bio */}
            <p>
              Phượng works in oil and watercolour, building quiet pieces from
              layered observation — light on water, the architecture of
              everyday rooms, the held breath of a held moment.
            </p>
            <p>
              Each work is shaped through patient revision, with materials
              selected for the long arc of the piece&apos;s life on a wall.
            </p>
          </div>
          <div className="mt-12">
            <Link
              href="/about"
              className="font-label text-xs tracking-widest uppercase border-b border-primary pb-1 text-primary hover:text-tertiary hover:border-tertiary transition-colors"
            >
              Read more
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="bg-surface-container-low py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-16">
          <div>
            <p className="font-label text-[11px] tracking-[0.2em] uppercase text-outline mb-2">
              Selected Works
            </p>
            <h2 className="font-headline text-4xl tracking-tight">
              From the Studio
            </h2>
          </div>
          <Link
            href="/paintings"
            className="font-label text-xs tracking-widest uppercase border-b border-primary pb-1 text-primary self-start sm:self-auto hover:text-tertiary hover:border-tertiary transition-colors"
          >
            Browse All
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="font-body text-on-surface-variant">
            No featured paintings yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {featured.map((p, i) => (
              <div key={p.id} className={i % 3 === 1 ? "lg:mt-12" : ""}>
                <PaintingCard painting={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Final Call to Action */}
      <section className="bg-on-surface text-on-primary py-24 md:py-32 px-6 md:px-12 text-center">
        <h2 className="font-headline text-4xl md:text-5xl mb-12 max-w-2xl mx-auto leading-tight">
          Begin Your Curated Collection
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link
            href="/contact"
            className="bg-tertiary text-on-primary px-10 md:px-12 py-5 font-label text-xs tracking-widest uppercase hover:bg-tertiary-dim transition-all"
          >
            Inquire about Work
          </Link>
          <Link
            href="/paintings"
            className="border border-outline-variant/30 px-10 md:px-12 py-5 font-label text-xs tracking-widest uppercase hover:bg-white/10 transition-all"
          >
            View Gallery
          </Link>
        </div>
      </section>
    </>
  );
}
