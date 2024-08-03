"use client";

import { FileUploader } from "@/components/ui/file-uploader";
import { removePhoto, removeVideo } from "@/services/person/actions";
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
import { useState, useTransition } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import axios from "axios";
import Image from "next/image";

export function PhotoUpload({ fileURL, id }: { fileURL: string; id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [estimatedSeconds, setEstimatedSeconds] = useState<
    Record<string, number>
  >({});

  async function handleUpload(files: File[]) {
    try {
      if (!files[0])
        return toast.error(
          "Error occured while uploading video. Please try again."
        );

      const formData = new FormData();

      formData.set("file", files[0]);
      formData.set("id", id);

      await axios.post("/api/upload-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.progress || 0.5) * 100;
            setEstimatedSeconds({ [files[0].name]: event.estimated as number });
            setProgress({ [files[0].name]: percentComplete });
          }
        },
      });

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
        <CardContent className="p-0">
          <Image
            src={fileURL}
            height={500}
            width={500}
            className="object-cover aspect-square"
            alt="image"
          />
        </CardContent>
        <CardFooter className="p-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Remove Photo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this photo?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  this photo from our server.
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
                      await removePhoto({ id });
                      toast.success("This photo has been deleted");
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
      <CardContent className="p-0">
        <div className="space-y-6">
          <FileUploader
            onUpload={handleUpload}
            maxFiles={1}
            accept={{
              "image/*": [],
            }}
            progresses={progress}
            estimatedSeconds={estimatedSeconds}
            isImage
          />
        </div>
      </CardContent>
    </>
  );
}
