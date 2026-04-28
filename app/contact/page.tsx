import { AtSign, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact",
};

const EMAIL = "hello@example.com";
const PHONE = "+84 000 000 000";
const INSTAGRAM = "phuong.art";
const LOCATION = "City, Country";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-12 pb-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 text-black/70">
        For inquiries, commissions, or studio visits, reach out below.
      </p>

      {/* TODO: replace placeholder values with real contact info */}
      <ul className="mt-8 space-y-4 text-base">
        <li className="flex items-center gap-3">
          <Mail className="size-5 text-black/60" aria-hidden />
          <a className="hover:underline underline-offset-4" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Phone className="size-5 text-black/60" aria-hidden />
          <a className="hover:underline underline-offset-4" href={`tel:${PHONE.replace(/\s+/g, "")}`}>
            {PHONE}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <AtSign className="size-5 text-black/60" aria-hidden />
          <a
            className="hover:underline underline-offset-4"
            href={`https://instagram.com/${INSTAGRAM}`}
            target="_blank"
            rel="noreferrer"
          >
            @{INSTAGRAM}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <MapPin className="size-5 text-black/60" aria-hidden />
          <span>{LOCATION}</span>
        </li>
      </ul>
    </section>
  );
}
