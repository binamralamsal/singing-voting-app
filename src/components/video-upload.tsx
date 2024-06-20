"use client";

import { FileUploader } from "@/components/ui/file-uploader";
import { removeVideo } from "@/services/person/actions";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function BasicUploaderDemo({
  fileProcessing,
  fileURL,
}: {
  fileProcessing: boolean;
  fileURL: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleUpload(files: File[]) {
    try {
      const formData = new FormData();

      formData.set("file", files[0]);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return toast.error(
          "Error occured while uploading video. Please try again."
        );
      }

      router.refresh();
    } catch (error) {
      return toast.error(
        "Error occured while uploading video. Please try again."
      );
    }
  }

  if (fileURL) {
    return (
      <>
        <CardContent>
          <video controls src={fileURL}></video>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Remove Video</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete your video?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your video from our server.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    toast.info("Deleting your video!");

                    startTransition(async () => {
                      await removeVideo();
                      toast.success("Your video has been deleted");
                    });
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </>
    );
  }

  return (
    <>
      <CardContent>
        <div className="space-y-6">
          {fileProcessing ? (
            <Skeleton className="w-full aspect-video flex justify-center items-center">
              Processing your video
            </Skeleton>
          ) : (
            <>
              <FileUploader
                onUpload={handleUpload}
                maxFiles={1}
                accept={{
                  "video/*": [
                    ".mp4",
                    ".webm",
                    ".ogg",
                    ".mov",
                    ".avi",
                    ".wmv",
                    ".flv",
                    ".mkv",
                  ],
                }}
              />
            </>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {fileProcessing && (
          <p className="text-gray-600">
            It will take few min before video is ready to watched. Please
            refresh the page after sometime.
          </p>
        )}
      </CardFooter>
    </>
  );
}
