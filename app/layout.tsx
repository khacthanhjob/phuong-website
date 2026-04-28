import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
