import Link from "next/link";
import { Menu, Package, SquareArrowOutUpRight, MicVocal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { SideNav } from "@/components/side-nav";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block sticky top-0 left-0 bottom-0 h-screen">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <Logo className="h-6 w-6" />
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  "bg-muted text-primary"
                )}
              >
                <MicVocal className="h-4 w-4" />
                Participants
              </Link>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                )}
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
                Go to Live Website
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo className="h-6 w-6" />
                  <span className="sr-only">Dashboard</span>
                </Link>
                <Link
                  href="/admin"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <MicVocal className="h-5 w-5" />
                  Participants
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Go to Live Website
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold md:hidden"
            >
              <Logo className="h-6 w-6" />
              <span>Dashboard</span>
            </Link>
          </div>

          <SideNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
