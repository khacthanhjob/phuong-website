import { cacheLife } from "next/cache";

export async function Footer() {
  "use cache";
  cacheLife("days");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/10 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-black/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>© {year} Phượng. All rights reserved.</span>
        <span>Original paintings · Available worldwide</span>
      </div>
    </footer>
  );
}
