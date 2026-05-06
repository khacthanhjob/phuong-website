import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PaintingCard } from "@/components/PaintingCard";
import { getAllCollectionSlugs, getCollectionBySlug, getPaintingsByCollection } from "@/lib/paintings";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Not found" };
  const t = await getTranslations({ locale, namespace: "collectionDetail" });
  return {
    title: collection.name,
    description: `${collection.paintingCount} ${t("worksLabel")} — ${collection.name}`,
  };
}

export default async function CollectionDetailPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const t = await getTranslations({ locale, namespace: "collectionDetail" });
  const paintings = await getPaintingsByCollection(slug);

  return (
    <>
      <header className="pt-12 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <nav className="mb-6 flex items-center space-x-4">
              <Link
                href="/collections"
                className="text-[10px] font-label tracking-[0.2em] uppercase text-outline hover:text-on-surface transition-colors"
              >
                {t("breadcrumbParent")}
              </Link>
              <div className="h-[1px] w-8 bg-outline-variant opacity-30" />
              <span className="text-[10px] font-label tracking-[0.2em] uppercase text-on-surface">
                {collection.name}
              </span>
            </nav>
            <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-normal tracking-tight text-on-surface leading-tight">
              {collection.name.split(" ").slice(0, -1).join(" ") || collection.name}
              {collection.name.split(" ").length > 1 && (
                <>
                  {" "}
                  <br />
                  <span className="italic pl-12 md:pl-24">
                    {collection.name.split(" ").slice(-1).join(" ")}
                  </span>
                </>
              )}
            </h1>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-label tracking-[0.1em] uppercase text-outline mb-2">
              {collection.paintingCount === 1 ? t("workLabel") : t("worksLabel")}
            </p>
            <p className="text-3xl font-headline italic">{collection.paintingCount}</p>
          </div>
        </div>
        <div className="mt-12 w-full h-[1px] bg-outline-variant opacity-15" />
      </header>

      <main className="px-6 md:px-12 max-w-[1920px] mx-auto mb-24 md:mb-32">
        {paintings.length === 0 ? (
          <p className="font-body text-on-surface-variant text-center py-24">{t("noWorks")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {paintings.map((painting, i) => {
              const stagger =
                i % 5 === 4 ? "lg:mt-24" : i % 3 === 1 ? "lg:mt-12" : "";
              return (
                <div key={painting.id} className={stagger}>
                  <PaintingCard painting={painting} locale={locale} />
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
