"use server";

import { z } from "zod";
import { profileSchema } from "@/validators/person.schema";
import { Person } from "@/models/person";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db-connect";

export async function updateCurrentPerson(
  person: z.infer<typeof profileSchema>,
) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();
  const dbPerson = await Person.findOne({ email: session.user.email });

  if (!dbPerson) {
    await Person.create({ email: session.user.email, ...person });
  } else {
    await Person.updateOne({ email: session.user.email }, person);
  }

  return { success: true, message: "User Updated Successfully" };
}
