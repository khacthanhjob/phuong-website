import { getTranslations } from "next-intl/server";
import { PaintingCard } from "@/components/PaintingCard";
import { getAllPaintings } from "@/lib/paintings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return { title: t("breadcrumbLabel") };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const paintings = await getAllPaintings();

  return (
    <>
      <header className="pt-12 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <nav className="mb-6 flex items-center space-x-4">
              <span className="text-[10px] font-label tracking-[0.2em] uppercase text-outline">
                {t("breadcrumbLabel")}
              </span>
              <div className="h-[1px] w-8 bg-outline-variant opacity-30" />
              <span className="text-[10px] font-label tracking-[0.2em] uppercase text-on-surface">
                {t("breadcrumbAll")}
              </span>
            </nav>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline font-normal tracking-tight text-on-surface leading-tight">
              {t("heading")} <br />
              <span className="italic pl-12 md:pl-24">{t("headingItalic")}</span>
            </h1>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-label tracking-[0.1em] uppercase text-outline mb-2">
              {t("totalWorksLabel")}
            </p>
            <p className="text-3xl font-headline italic">{paintings.length}</p>
          </div>
        </div>
        <div className="mt-12 w-full h-[1px] bg-outline-variant opacity-15" />
      </header>

      <main className="px-6 md:px-12 max-w-[1920px] mx-auto mb-24 md:mb-32">
        {paintings.length === 0 ? (
          <p className="font-body text-on-surface-variant text-center py-24">
            {t("noWorks")}
          </p>
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
