"use client";

import { FileUploader } from "@/components/ui/file-uploader";
import { removeVideo, saveVideo } from "@/services/person/actions";
import { Button } from "./ui/button";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
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
import { ClientOnly } from "./client-only";

export function BasicUploaderDemo({
  fileProcessing,
  fileURL,
}: {
  fileProcessing: boolean;
  fileURL: string;
}) {
  const [state, formAction] = useActionState(saveVideo, null);

  useEffect(() => {
    if (state) {
      if (state.error) toast.error(state.error);
      if (state.message) toast.success(state.message);
    }
  }, [state]);

  if (fileURL) {
    return (
      <>
        <CardContent>
          <ClientOnly>
            <Plyr
              source={{
                type: "video",
                sources: [{ src: fileURL }],
              }}
            ></Plyr>
          </ClientOnly>
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

                    await removeVideo();
                    toast.success("Your video has been deleted");
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
    <form action={formAction}>
      <CardContent>
        <div className="space-y-6">
          {fileProcessing ? (
            <Skeleton className="w-full aspect-video flex justify-center items-center">
              Processing your video
            </Skeleton>
          ) : (
            <FileUploader
              maxFiles={1}
              accept={{ "video/mp4": [".mp4", ".MP4"] }}
            />
          )}
        </div>
      </CardContent>

      <CardFooter>
        {fileProcessing ? (
          <p className="text-gray-600">
            It will take few min before video is ready to watched. Please
            refresh the page after sometime.
          </p>
        ) : (
          <Button>Upload Video</Button>
        )}
      </CardFooter>
    </form>
  );
}
