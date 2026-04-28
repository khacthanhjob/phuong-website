import { PaintingCard } from "@/components/PaintingCard";
import { getAllPaintings } from "@/lib/paintings";

export const metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const paintings = await getAllPaintings();

  return (
    <>
      {/* Hero / Category Header */}
      <header className="pt-12 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <nav className="mb-6 flex items-center space-x-4">
              <span className="text-[10px] font-label tracking-[0.2em] uppercase text-outline">
                Gallery
              </span>
              <div className="h-[1px] w-8 bg-outline-variant opacity-30" />
              <span className="text-[10px] font-label tracking-[0.2em] uppercase text-on-surface">
                All Works
              </span>
            </nav>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline font-normal tracking-tight text-on-surface leading-tight">
              The <br />
              <span className="italic pl-12 md:pl-24">Collection</span>
            </h1>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-label tracking-[0.1em] uppercase text-outline mb-2">
              Total Works
            </p>
            <p className="text-3xl font-headline italic">{paintings.length}</p>
          </div>
        </div>
        <div className="mt-12 w-full h-[1px] bg-outline-variant opacity-15" />
      </header>

      {/* Art Grid (asymmetric vertical staggering) */}
      <main className="px-6 md:px-12 max-w-[1920px] mx-auto mb-24 md:mb-32">
        {paintings.length === 0 ? (
          <p className="font-body text-on-surface-variant text-center py-24">
            No paintings yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {paintings.map((painting, i) => {
              // Asymmetric vertical shift (mt-12 on every 2nd, mt-24 on every 5th)
              const stagger =
                i % 5 === 4
                  ? "lg:mt-24"
                  : i % 3 === 1
                    ? "lg:mt-12"
                    : "";
              return (
                <div key={painting.id} className={stagger}>
                  <PaintingCard painting={painting} />
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
