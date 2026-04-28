import Link from "next/link";

const NAV = [
  { href: "/paintings", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-[1920px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-normal tracking-tighter text-on-surface font-headline"
        >
          Phượng
        </Link>
        <div className="hidden md:flex items-center gap-12 font-headline tracking-widest uppercase text-xs">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-outline hover:text-on-surface transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex items-center gap-2 font-label tracking-widest uppercase text-[10px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-outline hover:text-on-surface transition-colors px-1"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
