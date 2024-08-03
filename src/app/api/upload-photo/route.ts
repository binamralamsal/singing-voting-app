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
  const id = formData.get("id");

  if (!id || typeof id !== "string")
    return Response.json({ error: "No id assigned" }, { status: 401 });

  if (!file || file.size === 0) {
    return Response.json({ error: "No file uploaded" }, { status: 401 });
  }

  const hash = crypto.randomBytes(10).toString("hex");
  const fileName = `${hash}-${file.name}`;
  const uploadedFilePath = `./public/uploads/${fileName}`;

  try {
    const data = await file.arrayBuffer();
    await fs.writeFile(uploadedFilePath, Buffer.from(data));

    revalidatePath("/admin");

    await Person.updateOne(
      { _id: id },
      { $set: { photo: `/api/public/uploads/${fileName}` } }
    );

    return Response.json(
      {
        message: "Photo Uploaded successfully.",
      },
      { status: 200 }
    );
  } catch (err) {
    await Person.updateOne({ _id: id }, { $set: { photo: "" } });

    return Response.json(
      { error: `Error occured while uploading. Please try again.` },
      { status: 401 }
    );
  }
}
