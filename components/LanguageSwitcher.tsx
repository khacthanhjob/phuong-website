"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "en" ? "vi" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label="Switch language"
      className={`font-label text-[11px] tracking-[0.15em] uppercase border border-outline-variant/30 px-3 py-1.5 transition-all hover:border-on-surface hover:text-on-surface ${
        isPending ? "opacity-50" : "text-outline"
      }`}
    >
      {locale === "en" ? "VI" : "EN"}
    </button>
  );
}
