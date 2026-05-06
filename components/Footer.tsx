import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const CURRENT_YEAR = new Date().getFullYear();

export async function Footer({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const year = CURRENT_YEAR;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="bg-surface-container-low w-full mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 py-12 w-full max-w-[1920px] mx-auto">
        <div className="font-headline text-lg text-on-surface">Phượng</div>

        <div className="flex flex-wrap justify-center gap-8 font-label text-[11px] tracking-[0.1em] uppercase text-outline">
          <Link
            href="/collections"
            className="hover:text-on-surface underline-offset-4 hover:underline transition-all"
          >
            {tNav("collections")}
          </Link>
          <Link
            href="/paintings"
            className="hover:text-on-surface underline-offset-4 hover:underline transition-all"
          >
            {tNav("gallery")}
          </Link>
          <Link
            href="/about"
            className="hover:text-on-surface underline-offset-4 hover:underline transition-all"
          >
            {tNav("about")}
          </Link>
          <Link
            href="/contact"
            className="hover:text-on-surface underline-offset-4 hover:underline transition-all"
          >
            {tNav("contact")}
          </Link>
        </div>

        <div className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant">
          © {year} Phượng. {tFooter("rights")}
        </div>
      </div>
    </footer>
  );
}
