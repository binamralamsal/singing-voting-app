import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db-connect";
import { Person } from "@/models/person";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

export default async function UploadVideo() {
  const session = await auth();
  if (!session || !session.user) return redirect("/")


  await dbConnect();
  const person = await Person.findOne({email: session.user.email})

  if (!person) return redirect("/profile")

  return <div>UPload Video</div>;
}
