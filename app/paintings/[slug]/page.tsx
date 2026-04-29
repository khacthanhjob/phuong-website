import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaintingCard } from "@/components/PaintingCard";
import {
  getAllPaintings,
  getAllSlugs,
  getPaintingBySlug,
} from "@/lib/paintings";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";

type Params = Promise<{ slug: string }>;

const STATUS_LABEL: Record<string, string> = {
  available: "Available for Acquisition",
  sold: "In Private Collection",
  reserved: "Reserved",
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const painting = await getPaintingBySlug(slug);
  if (!painting) return { title: "Not found" };
  return {
    title: painting.title,
    description: painting.description,
  };
}

export default async function PaintingDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const painting = await getPaintingBySlug(slug);
  if (!painting) notFound();

  const all = await getAllPaintings();
  const sameCollection = painting.collectionSlug
    ? all.filter(
        (p) =>
          p.id !== painting.id && p.collectionSlug === painting.collectionSlug,
      )
    : [];
  const related =
    sameCollection.length > 0
      ? sameCollection.slice(0, 4)
      : all.filter((p) => p.id !== painting.id).slice(0, 4);

  const subject = encodeURIComponent(`Inquiry: ${painting.title}`);
  const body = encodeURIComponent(
    `Hi Phượng,\n\nI'm interested in "${painting.title}" (${painting.year}).\n\n— `,
  );
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-4">
        <nav className="flex items-center gap-4 flex-wrap">
          {painting.collectionSlug && painting.collectionName ? (
            <>
              <Link
                href="/collections"
                className="font-label text-[11px] tracking-[0.1em] uppercase text-outline hover:text-on-surface transition-colors"
              >
                Collections
              </Link>
              <div className="w-8 h-[1px] bg-outline-variant opacity-15" />
              <Link
                href={`/collections/${painting.collectionSlug}`}
                className="font-label text-[11px] tracking-[0.1em] uppercase text-outline hover:text-on-surface transition-colors"
              >
                {painting.collectionName}
              </Link>
            </>
          ) : (
            <Link
              href="/paintings"
              className="font-label text-[11px] tracking-[0.1em] uppercase text-outline hover:text-on-surface transition-colors"
            >
              Gallery
            </Link>
          )}
          <div className="w-8 h-[1px] bg-outline-variant opacity-15" />
          <span className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface">
            {painting.title}
          </span>
        </nav>
      </div>

      {/* Detail Grid */}
      <section className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-24 items-start">
        {/* Image */}
        <div className="lg:col-span-7 group">
          <div className="relative overflow-hidden bg-surface-container-low aspect-[4/5]">
            <Image
              src={painting.imageUrl}
              alt={painting.title}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div>
            <h1 className="font-headline text-5xl lg:text-7xl leading-tight tracking-tight text-on-surface">
              {painting.title}
            </h1>
          </div>

          {/* Specs */}
          <div className="flex flex-col gap-4 py-8 border-y border-outline-variant/15">
            {painting.medium && (
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-label text-[11px] tracking-[0.15em] uppercase text-outline">
                  Medium
                </span>
                <span className="font-body text-sm font-light text-right">
                  {painting.medium}
                </span>
              </div>
            )}
            {painting.dimensions && (
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-label text-[11px] tracking-[0.15em] uppercase text-outline">
                  Dimensions
                </span>
                <span className="font-body text-sm font-light text-right">
                  {painting.dimensions}
                </span>
              </div>
            )}
            <div className="flex justify-between items-baseline gap-4">
              <span className="font-label text-[11px] tracking-[0.15em] uppercase text-outline">
                Year
              </span>
              <span className="font-body text-sm font-light text-right">
                {painting.year}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-4 gap-4">
              <span className="font-label text-[11px] tracking-[0.15em] uppercase text-outline">
                Status
              </span>
              <span
                className={`font-body text-sm font-medium text-right ${
                  painting.status === "available"
                    ? "text-tertiary"
                    : "text-on-surface-variant"
                }`}
              >
                {STATUS_LABEL[painting.status]}
              </span>
            </div>
          </div>

          {/* Description */}
          {painting.description && (
            <div className="space-y-4">
              <span className="font-label text-[11px] tracking-[0.15em] uppercase text-on-surface">
                The Work
              </span>
              <p className="font-body text-base leading-relaxed font-light text-on-surface-variant whitespace-pre-line">
                {painting.description}
              </p>
            </div>
          )}

          {/* CTA */}
          {painting.status === "available" && (
            <div className="flex flex-col gap-4 mt-4">
              <a
                href={mailto}
                className="bg-primary text-on-primary font-label text-sm tracking-[0.2em] uppercase py-5 px-10 flex items-center justify-center gap-4 transition-all hover:bg-primary-dim active:scale-[0.98]"
              >
                Inquire about Work
                <span aria-hidden>→</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Related Works */}
      {related.length > 0 && (
        <section className="max-w-[1920px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
            <div>
              <span className="font-label text-[11px] tracking-[0.2em] uppercase text-outline mb-2 block">
                {sameCollection.length > 0
                  ? `More from ${painting.collectionName}`
                  : "Related Works"}
              </span>
              <h2 className="font-headline text-4xl text-on-surface">
                {sameCollection.length > 0
                  ? "Continue the Series"
                  : "From the Studio"}
              </h2>
            </div>
            <Link
              href={
                sameCollection.length > 0 && painting.collectionSlug
                  ? `/collections/${painting.collectionSlug}`
                  : "/paintings"
              }
              className="font-label text-[11px] tracking-[0.2em] uppercase text-on-surface border-b border-on-surface pb-1 self-start sm:self-end hover:text-tertiary hover:border-tertiary transition-colors"
            >
              {sameCollection.length > 0
                ? "View Full Collection"
                : "Back to Gallery"}
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {related.map((p) => (
              <PaintingCard key={p.id} painting={p} aspect="aspect-[3/4]" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
