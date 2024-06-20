"use server";

import fs from "node:fs/promises";

import { z } from "zod";
import { profileSchema } from "@/validators/person.schema";
import { Person } from "@/models/person";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db-connect";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { videoQueue } from "./video-queue";

export async function updateCurrentPerson(
  person: z.infer<typeof profileSchema>
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

  revalidatePath("/profile");

  return { success: true, message: "User Updated Successfully" };
}

export async function removeVideo() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();

  const currentPerson = await Person.findOne({ email: session.user.email });
  if (!currentPerson) return redirect("/profile");

  await Person.updateOne(
    { email: currentPerson.email },
    { $set: { fileProcessing: false, fileURL: "" } }
  );

  if (currentPerson.fileURL) {
    const filePath = currentPerson.fileURL.replace("/api", ".");
    await fs.unlink(filePath);
  }

  revalidatePath("/profile/upload");

  return { message: "Video removed successfully!" };
}
