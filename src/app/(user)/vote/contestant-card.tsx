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
import { useState } from "react";

export type Contestant = {
  name: string;
  video: string;
  image: string;
  code: string;
};

export function ContestantCard({ contestant }: { contestant: Contestant }) {
  return (
    <Card key={contestant.name}>
      <Image
        src={contestant.image}
        height={200}
        width={200}
        alt="Image"
        className="w-full max-h-[250px] object-cover"
      ></Image>
      <CardContent className="pt-4">
        <CardTitle>{contestant.name}</CardTitle>
        <CardDescription className="pt-2">
          Code: {contestant.code}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <VotingDialog contestant={contestant} />
      </CardFooter>
    </Card>
  );
}

function ContestantVideo({ url, name }: { url: string; name: string }) {
  return (
    <MediaPlayer title={`${name}'s Singing Video`} src={url}>
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}

export function VotingDialog({ contestant }: { contestant: Contestant }) {
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
              You have <strong>30</strong> remaining votes. Please use your
              votes wisely.
            </DialogDescription>
          </DialogHeader>
          <ContestantVideo url={contestant.video} name={contestant.name} />
          <VotingForm contestant={contestant} />
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
            You have <strong>30</strong> remaining votes. Please use your votes
            wisely.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ContestantVideo url={contestant.video} name={contestant.name} />
        </div>
        <VotingForm className="px-4" contestant={contestant} />
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
}: React.ComponentProps<"form"> & { contestant: Contestant }) {
  const labelId = `${contestant.name.split(" ").join("-")}`;

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor={labelId}>No. of Votes</Label>
        <Input type="number" id={labelId} defaultValue="30" required />
      </div>

      <Button type="submit">Vote</Button>
    </form>
  );
}
