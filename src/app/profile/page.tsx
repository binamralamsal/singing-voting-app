import { RegistrationForm } from "@/components/registration-form";
import { getCurrentPerson } from "@/services/person/get-current-person";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const currentPerson = await getCurrentPerson();

  return <RegistrationForm currentPerson={currentPerson} />;
}
