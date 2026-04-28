import { AtSign, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact",
};

// TODO: replace placeholder values with real contact info
const EMAIL = "hello@example.com";
const PHONE = "+84 000 000 000";
const INSTAGRAM = "phuong.art";
const LOCATION = "City, Country";

const ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: PHONE,
    href: `tel:${PHONE.replace(/\s+/g, "")}`,
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: `@${INSTAGRAM}`,
    href: `https://instagram.com/${INSTAGRAM}`,
  },
  {
    icon: MapPin,
    label: "Studio",
    value: LOCATION,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero / page header */}
      <header className="pt-12 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <p className="text-[11px] font-label tracking-[0.2em] uppercase text-outline mb-6">
          Contact
        </p>
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-tighter max-w-3xl">
          A Quiet <span className="italic text-tertiary">Conversation</span>
        </h1>
        <p className="mt-8 max-w-xl font-body text-lg text-on-surface-variant leading-relaxed">
          For inquiries about available work, commissions, or studio visits —
          please reach out using one of the channels below.
        </p>
      </header>

      {/* Contact details, asymmetric */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 px-6 md:px-12 max-w-[1920px] mx-auto pb-24 md:pb-32">
        <div className="md:col-span-7 md:col-start-2">
          <ul className="divide-y divide-outline-variant/15 border-y border-outline-variant/15">
            {ITEMS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="py-6 flex items-center gap-6">
                <Icon
                  className="size-5 text-outline shrink-0"
                  aria-hidden
                  strokeWidth={1.25}
                />
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
                  <span className="font-body text-base text-on-surface">
                    {value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
