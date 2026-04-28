export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero / page header */}
      <header className="pt-12 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <p className="text-[11px] font-label tracking-[0.2em] uppercase text-outline mb-6">
          About
        </p>
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-tighter max-w-4xl">
          The Hand Behind <span className="italic text-tertiary">the</span>{" "}
          Canvas
        </h1>
      </header>

      {/* Asymmetric: portrait + bio */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 px-6 md:px-12 max-w-[1920px] mx-auto pb-24 md:pb-32 items-start">
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

        <div className="md:col-span-6 md:col-start-7 mt-16 md:mt-0">
          {/* TODO: replace with Phượng's real bio */}
          <div className="space-y-6 font-body text-on-surface-variant leading-relaxed text-lg">
            <p>
              Phượng is a painter based in [city]. Her work explores quiet
              observations of light, water, and architectural forms — pieces
              built through patient layering and revision.
            </p>
            <p>
              Working primarily in oil on canvas and watercolour on paper, she
              has been making work full time since [year]. Her paintings have
              been shown at [exhibition / gallery / year].
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-12 max-w-md">
            <div>
              <p className="font-headline text-3xl">15+</p>
              <p className="font-label text-[10px] tracking-widest uppercase text-outline">
                Exhibitions
              </p>
            </div>
            <div>
              <p className="font-headline text-3xl">200</p>
              <p className="font-label text-[10px] tracking-widest uppercase text-outline">
                Private Works
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement section (tonal shift) */}
      <section className="bg-surface-container-low py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <span className="font-label text-[11px] tracking-[0.2em] uppercase text-tertiary block mb-6">
            Artist Statement
          </span>
          <blockquote className="font-headline italic text-2xl md:text-3xl leading-relaxed text-primary border-l-2 border-tertiary/30 pl-6 md:pl-8">
            {/* TODO: replace with real statement */}
            &ldquo;A short paragraph in the artist&apos;s own voice — what she
            cares about in her work, the questions she returns to, what she
            hopes a viewer feels in front of a finished piece.&rdquo;
          </blockquote>
        </div>
      </section>
    </>
  );
}
