import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";
const PHONE = "+84 000 000 000";
const INSTAGRAM = "phuong.art";
const LOCATION = "City, Country";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("label") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const ITEMS = [
    { icon: Mail, label: t("emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: t("phoneLabel"), value: PHONE, href: `tel:${PHONE.replace(/\s+/g, "")}` },
    { icon: AtSign, label: t("instagramLabel"), value: `@${INSTAGRAM}`, href: `https://instagram.com/${INSTAGRAM}` },
    { icon: MapPin, label: t("studioLabel"), value: LOCATION, href: null },
  ];

  return (
    <>
      {/* Hero */}
      <header className="pt-12 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <p className="text-[11px] font-label tracking-[0.2em] uppercase text-outline mb-6">
          {t("label")}
        </p>
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-tighter max-w-3xl">
          {t("heading")}{" "}
          <span className="italic text-tertiary">{t("headingItalic")}</span>
        </h1>
        <p className="mt-8 max-w-xl font-body text-lg text-on-surface-variant leading-relaxed">
          {t("intro")}
        </p>
      </header>

      {/* Contact details */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 px-6 md:px-12 max-w-[1920px] mx-auto pb-24 md:pb-32">
        <div className="md:col-span-7 md:col-start-2">
          <ul className="divide-y divide-outline-variant/15 border-y border-outline-variant/15">
            {ITEMS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="py-6 flex items-center gap-6">
                <Icon className="size-5 text-outline shrink-0" aria-hidden strokeWidth={1.25} />
                <span className="font-label text-[11px] tracking-[0.15em] uppercase text-outline w-28 shrink-0">
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="font-body text-base text-on-surface hover:text-tertiary transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="font-body text-base text-on-surface">{value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
