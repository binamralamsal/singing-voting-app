import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db-connect";
import crypto from "crypto";
import fs from "fs/promises";
import { Person } from "@/models/person";
import { revalidatePath } from "next/cache";
import { videoQueue } from "@/services/person/video-queue";

export async function POST(request: Request) {
  const formData = await request.formData();

  const session = await auth();
  if (!session || !session.user)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  await dbConnect();

  const currentPerson = await Person.findOne({ email: session.user.email });
  if (!currentPerson)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return Response.json({ error: "No file uploaded" }, { status: 401 });
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

    return Response.json(
      {
        message: "Video Uploaded successfully. We are now processing video",
      },
      { status: 200 }
    );
  } catch (err) {
    await Person.updateOne(
      { email: currentPerson.email },
      { $set: { fileProcessing: false, fileURL: "" } }
    );

    return Response.json(
      { error: `Error occured while uploading. Please try again.` },
      { status: 401 }
    );
  }
}
