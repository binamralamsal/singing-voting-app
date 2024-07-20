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
import { useState, useTransition } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import axios from "axios";

export function BasicUploaderDemo({
  fileProcessing,
  fileURL,
}: {
  fileProcessing: boolean;
  fileURL: string;
}) {
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

      await axios.post("/api/upload", formData, {
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
        <CardContent>
          <MediaPlayer src={fileURL}>
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" disabled>
                Remove Video
              </Button>
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
                <Button variant="destructive" disabled>
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
            <p className="text-gray-600">
              Thank you for submitting your video. We are processing your video.
              We will contact you via your mail or phone number if you are
              selected.
            </p>
          ) : (
            <>
              <div>
                <strong className="size-4">
                  Registrations have been closed!
                </strong>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </>
  );
}
