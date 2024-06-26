import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) redirect("/profile");

  return <LoginForm />;
}
