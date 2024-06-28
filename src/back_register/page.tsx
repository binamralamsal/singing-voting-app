import { RegisterForm } from "@/components/register-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await auth();
  if (session) redirect("/profile");

  return <RegisterForm />;
}
