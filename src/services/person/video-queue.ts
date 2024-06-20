import dbConnect from "@/lib/db-connect";
import { Person } from "@/models/person";
import Queue, { Job } from "bull";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

const videoQueue = new Queue<VideoJobData>("video processing", {
  redis: {
    host: "localhost",
    port: 6379,
  },
});

interface VideoJobData {
  filePath: string;
  fileName: string;
  uploadedFilePath: string;
  email: string;
}

videoQueue.process(async (job: Job<VideoJobData>) => {
  const { filePath, uploadedFilePath, email, fileName } = job.data;

  try {
    const results = await new Promise((resolve, reject) => {
      ffmpeg(uploadedFilePath)
        .addOptions(["-crf 50", "-c:v libx264"])
        .on("end", async () => {
          try {
            await fs.unlink(uploadedFilePath);
            await dbConnect();

            await Person.updateOne(
              { email },
              {
                $set: {
                  fileProcessing: false,
                  fileURL: `/uploads/${fileName}`,
                },
              }
            );

            revalidatePath("/profile/upload");
            resolve({ filePath: filePath });
          } catch (unlinkError) {
            reject({
              error: "Error occurred while uploading. Please try again.",
            });
          }
        })
        .on("error", (err) => {
          reject({
            error: "Error occurred while uploading. Please try again.",
          });
        })
        .save(filePath);
    });

    console.log(results);
  } catch (error) {
    console.log(error);
  }
});

export { videoQueue };
