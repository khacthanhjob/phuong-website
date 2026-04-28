export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-12 pb-16">
      <h1 className="text-3xl font-semibold tracking-tight">About Phượng</h1>

      {/* TODO: replace with Phượng's real bio */}
      <div className="mt-6 space-y-4 text-base leading-relaxed text-black/80">
        <p>
          Phượng is a painter based in [city]. Her work explores [themes],
          working primarily in [media].
        </p>
        <p>
          Her paintings have been shown at [exhibition / gallery / year].
          She has been painting full-time since [year].
        </p>
        <p>
          {/* Placeholder — replace with artist statement */}
          [Artist statement: a short paragraph about your approach, what you
          care about in your work, and what you hope viewers feel.]
        </p>
      </div>
    </section>
  );
}
