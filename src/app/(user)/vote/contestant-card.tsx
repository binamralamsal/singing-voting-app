"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { voteContestant } from "@/services/person/actions";
import { toast } from "sonner";
import Link from "next/link";

export type Contestant = {
  name: string;
  video: string;
  image: string;
  code: string;
  id: string;
};

export function ContestantCard({
  contestant,
  remainingVotes,
}: {
  contestant: Contestant;
  remainingVotes: number;
}) {
  return (
    <Card key={contestant.name}>
      <Image
        src={contestant.image}
        height={200}
        width={200}
        alt="Image"
        className="w-full aspect-video object-cover"
      ></Image>
      <CardContent className="pt-4">
        <CardTitle>{contestant.name}</CardTitle>
        <CardDescription className="pt-2">
          Code: {contestant.code}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <VotingDialog contestant={contestant} remainingVotes={remainingVotes} />
      </CardFooter>
    </Card>
  );
}

function ContestantVideo({ url, name }: { url: string; name: string }) {
  return (
    <MediaPlayer title={`${name}'s Singing Video`} src={url} autoPlay>
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}

export function VotingDialog({
  contestant,
  remainingVotes,
}: {
  contestant: Contestant;
  remainingVotes: number;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Vote for {contestant.name}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Vote for {contestant.name}</DialogTitle>
            <DialogDescription>
              You have <strong>{remainingVotes}</strong> remaining votes. Please
              use your votes wisely.
            </DialogDescription>
          </DialogHeader>
          <ContestantVideo url={contestant.video} name={contestant.name} />
          <VotingForm contestant={contestant} remainingVotes={remainingVotes} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Vote for {contestant.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Vote for {contestant.name}</DrawerTitle>
          <DrawerDescription>
            You have <strong>{remainingVotes}</strong> remaining votes. Please
            use your votes wisely.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ContestantVideo url={contestant.video} name={contestant.name} />
        </div>
        <VotingForm
          className="px-4"
          contestant={contestant}
          remainingVotes={remainingVotes}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function VotingForm({
  className,
  contestant,
  remainingVotes,
}: React.ComponentProps<"form"> & {
  contestant: Contestant;
  remainingVotes: number;
}) {
  const labelId = `${contestant.name.split(" ").join("-")}`;

  const [_, startTransition] = useTransition();

  async function handleVoteContestant(formData: FormData) {
    if (remainingVotes === 0)
      return toast.error(
        "You don't have any votes left now. Thanks for voting!"
      );

    startTransition(async () => {
      const response = await voteContestant(formData);
      if (response.message) toast.success(response.message);
      if (response.error) toast.error(response.error);
    });
  }

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      action={handleVoteContestant}
    >
      <div className="grid gap-2">
        <Label htmlFor={labelId}>No. of Votes</Label>
        <Input
          type="number"
          id={labelId}
          defaultValue={remainingVotes}
          key={remainingVotes}
          max={remainingVotes}
          name="votes"
          required
        />
      </div>
      <input type="hidden" value={contestant.id} name="contestant" />
      <div className="grid grid-cols-2 gap-2">
        <Button type="submit">Vote</Button>
        <Button asChild variant="secondary">
          <Link href={contestant.video} target="_blank">
            Watch on YouTube
          </Link>
        </Button>
      </div>
    </form>
  );
}
