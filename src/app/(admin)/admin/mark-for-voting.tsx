"use client";

import { PhotoUpload } from "@/components/photo-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { removeContestant, updateVideoUrl } from "@/services/person/actions";

const formSchema = z.object({
  videoLink: z
    .string()
    .url({ message: "Invalid URL, URL must start with https" })
    .min(2),
});

export function MarkForVoting({
  name,
  id,
  photo,
  isContestant,
  videoLink,
}: {
  photo: string;
  name: string;
  id: string;
  isContestant: boolean;
  videoLink: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      videoLink,
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await updateVideoUrl(values.videoLink, id);

      toast.success(`Updated video url of ${name} successfully!`);
    });
  }

  const [isUnmarkDialogOpened, setIsUnmarkDialogOpened] = useState(false);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            {isContestant ? "Edit Contestant Details" : "Mark for Voting"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark {name} as contestant!</DialogTitle>
          </DialogHeader>

          <PhotoUpload fileURL={photo} id={id} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="videoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube Video Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://youtube.com/watch?v=id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="w-full">
                  Mark for Voting / Save
                </Button>
                <Dialog
                  open={isUnmarkDialogOpened}
                  onOpenChange={setIsUnmarkDialogOpened}
                >
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Unmark from Voting
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to unmark {name} from voting?
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          toast.info(`Unmarking ${name} from voting!`);

                          startTransition(async () => {
                            await removeContestant(id);
                            toast.success(
                              `${name} is no longer part of voting`
                            );
                            form.setValue("videoLink", "");
                            setIsUnmarkDialogOpened(false);
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
