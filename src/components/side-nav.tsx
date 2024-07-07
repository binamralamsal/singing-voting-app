import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { UserAccountDropdown } from "./user-account-dropdown";
import { getLoggedInUserDetail } from "@/services/person/get-current-person";

export async function SideNav() {
  const { session, user } = await getLoggedInUserDetail();

  return (
    <div>
      {!session?.user ? (
        <Button asChild>
          <Link href="/#register">Register / Sign In</Link>
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
          fileURL={user?.fileURL}
        />
      )}
    </div>
  );
}
