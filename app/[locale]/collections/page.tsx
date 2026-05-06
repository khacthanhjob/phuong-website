import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllCollections } from "@/lib/paintings";

const LAYOUT = [
  { span: "md:col-span-8", aspect: "aspect-[16/9]", mt: "" },
  { span: "md:col-span-4", aspect: "aspect-[3/4]", mt: "md:mt-48" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]", mt: "" },
  { span: "md:col-span-6 md:col-start-7", aspect: "aspect-square", mt: "md:mt-24" },
  { span: "md:col-span-12", aspect: "aspect-[21/9]", mt: "mt-12" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  return { title: t("label") };
}

export default async function CollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  const collections = await getAllCollections();

  return (
    <main className="pt-12 md:pt-24 px-6 md:px-12 max-w-[1920px] mx-auto">
      <header className="mb-16 md:mb-24 flex flex-col md:flex-row items-baseline gap-8 md:gap-24">
        <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-light tracking-tighter max-w-3xl">
          {t("heading")}{" "}
          <span className="italic font-normal">{t("headingItalic")}</span>
        </h1>
        <p className="font-body text-sm tracking-widest uppercase text-outline max-w-xs leading-loose">
          {t("tagline")}
        </p>
      </header>

      {collections.length === 0 ? (
        <p className="font-body text-on-surface-variant py-16">{t("noCollections")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-32 gap-x-12">
          {collections.map((collection, i) => {
            const layout = LAYOUT[i % LAYOUT.length];
            const isFullWidth = layout.span.includes("col-span-12");
            const isPlinth = layout.span.includes("col-span-6");

            return (
              <Link
                href={`/collections/${collection.slug}`}
                key={collection.slug}
                className={`group cursor-pointer ${layout.span} ${layout.mt}`}
              >
                {isPlinth ? (
                  <div className="bg-surface-container-lowest p-8 md:p-12 transition-all duration-500 group-hover:bg-surface-container-high relative">
                    <div className="absolute inset-0 shadow-[0_12px_48px_rgba(47,51,49,0.04)] pointer-events-none" />
                    <div className={`overflow-hidden ${layout.aspect} bg-surface-container-low relative`}>
                      <Image src={collection.coverImageUrl} alt={collection.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="mt-8">
                      <span className="font-label text-[11px] tracking-[0.2em] uppercase text-tertiary mb-2 block">
                        {collection.paintingCount}{" "}
                        {collection.paintingCount === 1 ? t("workLabel") : t("worksLabel")} ·{" "}
                        {collection.earliestYear === collection.latestYear
                          ? collection.earliestYear
                          : `${collection.earliestYear}–${collection.latestYear}`}
                      </span>
                      <h3 className="font-headline text-3xl font-light tracking-tight">{collection.name}</h3>
                      <div className="h-px w-12 bg-outline-variant/30 my-6" />
                      <p className="font-body text-sm text-outline-variant max-w-sm">{t("explore")}</p>
                    </div>
                  </div>
                ) : isFullWidth ? (
                  <div className={`overflow-hidden mb-6 ${layout.aspect} bg-surface-container-low relative`}>
                    <Image src={collection.coverImageUrl} alt={collection.name} fill sizes="100vw" className="object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent" />
                    <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12">
                      <span className="font-label text-[11px] tracking-[0.3em] uppercase text-white/70 mb-2 block">
                        {collection.paintingCount}{" "}
                        {collection.paintingCount === 1 ? t("workLabel") : t("worksLabel")}
                      </span>
                      <h3 className="font-headline text-4xl md:text-5xl font-light tracking-tight text-white">{collection.name}</h3>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`overflow-hidden mb-6 ${layout.aspect} bg-surface-container-low relative`}>
                      <Image src={collection.coverImageUrl} alt={collection.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex justify-between items-start gap-6">
                      <div>
                        <span className="font-label text-[11px] tracking-[0.2em] uppercase text-tertiary mb-2 block">
                          {collection.paintingCount}{" "}
                          {collection.paintingCount === 1 ? t("workLabel") : t("worksLabel")} ·{" "}
                          {collection.earliestYear === collection.latestYear
                            ? collection.earliestYear
                            : `${collection.earliestYear}–${collection.latestYear}`}
                        </span>
                        <h3 className="font-headline text-3xl font-light tracking-tight">{collection.name}</h3>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {/* Curatorial Note */}
      <section className="my-32 md:my-48 grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-start-7 md:col-span-5">
          <span className="font-label text-[11px] tracking-[0.2em] uppercase text-tertiary mb-8 block">
            {t("inquiryLabel")}
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-light tracking-tighter leading-tight mb-8">
            {t.rich("inquiryHeading", {
              italic: (chunks) => <span className="italic">{chunks}</span>,
            })}
          </h2>
          <p className="font-body text-lg text-outline-variant leading-relaxed mb-12">
            {t("inquiryBody")}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-on-primary px-10 py-5 font-label text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-primary-dim active:scale-95"
          >
            {t("getInTouch")}
          </Link>
        </div>
      </section>
    </main>
  );
}
