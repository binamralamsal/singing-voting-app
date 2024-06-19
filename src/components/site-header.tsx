import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import Link from "next/link";
import { Logo } from "./logo";
import { SideNav } from "./side-nav";

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex content-between h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-9 w-9" />
          <span className="hidden font-bold sm:inline-block">
            Cosmo Acoustic Challenge 3.0
          </span>
        </Link>

        <MainNav />
        <MobileNav />

        <SideNav />
      </div>
    </header>
  );
}
