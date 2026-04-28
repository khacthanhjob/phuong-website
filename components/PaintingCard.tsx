import Image from "next/image";
import Link from "next/link";
import type { Painting } from "@/lib/types";

const STATUS_LABEL: Record<Painting["status"], string> = {
  available: "Available",
  sold: "In Private Collection",
  reserved: "Reserved",
};

const STATUS_TONE: Record<Painting["status"], string> = {
  available: "text-tertiary",
  sold: "text-outline-variant",
  reserved: "text-outline-variant",
};

export function PaintingCard({
  painting,
  aspect = "aspect-[4/5]",
}: {
  painting: Painting;
  aspect?: string;
}) {
  return (
    <Link
      href={`/paintings/${painting.slug}`}
      className="group cursor-pointer block focus:outline-none"
    >
      <div
        className={`relative overflow-hidden mb-6 ${aspect} bg-surface-container-low`}
      >
        <Image
          src={painting.imageUrl}
          alt={painting.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-on-surface/0 group-hover:bg-on-surface/5 transition-colors duration-500" />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-headline mb-1 group-hover:italic transition-all">
            {painting.title}
          </h3>
          <p className="text-[10px] font-label tracking-[0.15em] uppercase text-outline">
            {painting.year}
            {painting.medium ? ` · ${painting.medium}` : ""}
          </p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p
            className={`text-[10px] font-label tracking-widest uppercase ${STATUS_TONE[painting.status]}`}
          >
            {STATUS_LABEL[painting.status]}
          </p>
        </div>
      </div>
    </Link>
  );
}
