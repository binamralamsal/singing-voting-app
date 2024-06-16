import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold">CAC 3.0</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="text-gray-400 hover:text-white transition-colors"
            href="#about"
          >
            About
          </Link>
          <Link
            className="text-gray-400 hover:text-white transition-colors"
            href="#prizes"
          >
            Prizes
          </Link>
          <Link
            className="text-gray-400 hover:text-white transition-colors"
            href="#register"
          >
            Register
          </Link>
          <Link
            className="text-gray-400 hover:text-white transition-colors"
            href="#faq"
          >
            FAQ
          </Link>
        </div>
        <div className="text-gray-400 text-sm">
          © 2024 Cosmo Concepts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
