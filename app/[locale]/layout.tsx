import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Manrope, Noto_Serif } from "next/font/google";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { IntlProviderClient } from "@/components/IntlProviderClient";
import { routing } from "@/i18n/routing";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Phượng — Original Paintings",
    template: "%s · Phượng",
  },
  description:
    "Original paintings by Phượng. A curated gallery of contemporary work — browse the collection or get in touch.",
};

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body">
        <IntlProviderClient locale={locale} messages={messages}>
          <Suspense>
            <Header locale={locale} />
            <main className="flex-1 pt-20">{children}</main>
            <Footer locale={locale} />
          </Suspense>
        </IntlProviderClient>
      </body>
    </html>
  );
}
