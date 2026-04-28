import Link from "next/link";
import { cacheLife } from "next/cache";

export async function Footer() {
  "use cache";
  cacheLife("days");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-low w-full mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 py-12 w-full max-w-[1920px] mx-auto">
        <div className="font-headline text-lg text-on-surface">Phượng</div>

        <div className="flex flex-wrap justify-center gap-8 font-label text-[11px] tracking-[0.1em] uppercase text-outline">
          <Link
            href="/paintings"
            className="hover:text-on-surface underline-offset-4 hover:underline transition-all"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="hover:text-on-surface underline-offset-4 hover:underline transition-all"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-on-surface underline-offset-4 hover:underline transition-all"
          >
            Contact
          </Link>
        </div>

        <div className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant">
          © {year} Phượng. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
