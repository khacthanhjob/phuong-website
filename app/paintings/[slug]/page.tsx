import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPaintingBySlug } from "@/lib/paintings";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";

type Params = Promise<{ slug: string }>;

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

  const subject = encodeURIComponent(`Inquiry: ${painting.title}`);
  const body = encodeURIComponent(
    `Hi Phượng,\n\nI'm interested in "${painting.title}" (${painting.year}).\n\n— `,
  );
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <article className="mx-auto max-w-5xl px-6 pt-8 pb-16">
      <Link
        href="/paintings"
        className="text-sm text-black/60 hover:underline underline-offset-4"
      >
        ← Back to gallery
      </Link>

      <div className="mt-6 grid lg:grid-cols-[3fr,2fr] gap-10">
        <div className="relative w-full aspect-[4/5] bg-neutral-100">
          <Image
            src={painting.imageUrl}
            alt={painting.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-contain"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {painting.title}
          </h1>
          <p className="mt-1 text-black/60">{painting.year}</p>

          <dl className="mt-6 grid grid-cols-2 gap-y-2 text-sm">
            {painting.medium && (
              <>
                <dt className="text-black/50">Medium</dt>
                <dd>{painting.medium}</dd>
              </>
            )}
            {painting.dimensions && (
              <>
                <dt className="text-black/50">Dimensions</dt>
                <dd>{painting.dimensions}</dd>
              </>
            )}
            <dt className="text-black/50">Status</dt>
            <dd className="capitalize">{painting.status}</dd>
          </dl>

          {painting.description && (
            <p className="mt-6 text-base leading-relaxed text-black/80 whitespace-pre-line">
              {painting.description}
            </p>
          )}

          {painting.status === "available" && (
            <a
              href={mailto}
              className="mt-8 inline-flex items-center px-5 py-2.5 bg-neutral-900 text-white text-sm rounded hover:bg-neutral-800"
            >
              Inquire about this painting
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
