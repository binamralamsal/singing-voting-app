"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileLayoutNav({ fileURL }: { fileURL: string | undefined }) {
  const pathname = usePathname();

  const activeClass = "font-semibold text-primary";

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link
        href="/profile"
        className={cn(pathname === "/profile" && activeClass)}
      >
        Profile
      </Link>
      <Link
        href="/profile/upload"
        className={cn(pathname === "/profile/upload" && activeClass)}
      >
        {fileURL ? "Edit" : "Upload"} Video
      </Link>
    </nav>
  );
}
