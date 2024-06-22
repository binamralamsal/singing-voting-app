import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { UserAccountDropdown } from "./user-account-dropdown";

export async function SideNav() {
  const session = await auth();

  return (
    <div>
      {!session?.user ? (
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      ) : (
        <UserAccountDropdown
          avatarURL={session.user.image as string}
          fallbackName={
            session.user.name
              ?.split(" ")
              .map((part) => part.charAt(0).toUpperCase())
              .join("") as string
          }
        />
      )}
    </div>
  );
}
