import Image from "next/image";
import Link from "next/link";
import type { Painting } from "@/lib/types";

const STATUS_LABEL: Record<Painting["status"], string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

const STATUS_STYLE: Record<Painting["status"], string> = {
  available: "bg-emerald-100 text-emerald-900",
  sold: "bg-neutral-200 text-neutral-700",
  reserved: "bg-amber-100 text-amber-900",
};

export function PaintingCard({ painting }: { painting: Painting }) {
  return (
    <Link
      href={`/paintings/${painting.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <Image
          src={painting.imageUrl}
          alt={painting.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {painting.status !== "available" && (
          <span
            className={`absolute top-3 left-3 text-xs px-2 py-1 rounded ${STATUS_STYLE[painting.status]}`}
          >
            {STATUS_LABEL[painting.status]}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-base font-medium">{painting.title}</h3>
        <p className="text-sm text-black/60">
          {painting.year}
          {painting.medium ? ` · ${painting.medium}` : ""}
        </p>
      </div>
    </Link>
  );
}
