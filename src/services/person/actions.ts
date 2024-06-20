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
import ffmpeg from "fluent-ffmpeg";
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
    await fs.unlink(`./public/${currentPerson.fileURL}`);
  }

  revalidatePath("/profile/upload");

  return { message: "Video removed successfully!" };
}

export async function saveVideo(
  previousState: null | Object,
  formData: FormData
) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();

  const currentPerson = await Person.findOne({ email: session.user.email });
  if (!currentPerson) return redirect("/profile");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { error: "No file uploaded" };
  }

  const hash = crypto.randomBytes(10).toString("hex");
  const fileName = `${hash}-${file.name}`;
  const uploadedFilePath = `./public/uploads/tmp/${fileName}`;
  const compressedFilePath = `./public/uploads/${hash}-${file.name}`;

  try {
    const data = await file.arrayBuffer();
    await fs.writeFile(uploadedFilePath, Buffer.from(data));

    await Person.updateOne(
      { email: currentPerson.email },
      { $set: { fileProcessing: true } }
    );

    revalidatePath("/profile/upload");

    await videoQueue.add({
      filePath: compressedFilePath,
      uploadedFilePath: uploadedFilePath,
      email: currentPerson.email,
      fileName,
    });

    return {
      message: "Video Uploaded successfully. We are now processing video",
    };
  } catch (err) {
    await Person.updateOne(
      { email: currentPerson.email },
      { $set: { fileProcessing: false, fileURL: "" } }
    );

    return { error: `Error occured while uploading. Please try again.` };
  }
}
