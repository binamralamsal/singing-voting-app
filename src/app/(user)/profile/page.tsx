import { RegistrationForm } from "@/components/registration-form";
import { getCurrentPerson } from "@/services/person/get-current-person";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const currentPerson = await getCurrentPerson();

  return <RegistrationForm currentPerson={currentPerson} />;
}
