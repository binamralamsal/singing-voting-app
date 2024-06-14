import Link from "next/link";
import { navLinks } from "@/config/site";

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
      {navLinks.map((link) => (
        <Link href={link.href} key={link.label}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
