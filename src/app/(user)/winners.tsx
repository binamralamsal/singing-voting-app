"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { ContestantVideo } from "../../back_vote/contestant-card";
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
import Link from "next/link";

type Card = {
  id: number;
  name: string;
  image: string;
  place: number;
  contestantCode: string;
  votes: number;
  videoLink: string;
};

const cards = [
  {
    id: 1,
    name: "Jane Smith",
    image: "/placeholder.svg?height=360&width=640",
    place: 2,
    contestantCode: "JS2023",
    votes: 1250,
  },
  {
    id: 2,
    name: "John Doe",
    image: "/placeholder.svg?height=360&width=640",
    place: 1,
    contestantCode: "JD2023",
    votes: 1500,
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: "/placeholder.svg?height=360&width=640",
    place: 3,
    contestantCode: "AJ2023",
    votes: 1000,
  },
];

export function Winners({ cards }: { cards: Card[] }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resultsDiv = document.getElementById("results")!;
    const handleResize = () => {
      setWindowSize({
        width: resultsDiv.clientWidth,
        height: resultsDiv.clientHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-6xl m-auto">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
      />
      <div className="flex justify-center items-center">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`rounded-lg shadow-2xl border-4 border-yellow-500 max-w-[400px] w-full`}
          >
            <div className="relative h-full bg-white rounded-t-lg overflow-hidden flex flex-col">
              <div className="relative">
                <Image
                  src={card.image}
                  width={400}
                  height={200}
                  alt={`${card.name}`}
                  className="w-full aspect-video object-cover"
                />
                <span
                  className={`absolute top-2 left-2 inline-block py-1 px-3 ${
                    card.place === 1
                      ? "bg-yellow-500"
                      : card.place === 2
                      ? "bg-gray-400"
                      : "bg-amber-600"
                  } text-white rounded-full text-sm font-bold`}
                >
                  {card.place === 1 ? "1st" : card.place === 2 ? "2nd" : "3rd"}{" "}
                  Place
                </span>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">{card.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Contestant Code: {card.contestantCode}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mb-4">
                    {card.votes.toLocaleString()} votes
                  </p>
                </div>
                <VideoDialog contestant={card} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VideoDialog({ contestant }: { contestant: Card }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Watch {contestant.name}&apos;s Video
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{contestant.name}&apos;s Video</DialogTitle>
          </DialogHeader>
          <ContestantVideo url={contestant.videoLink} name={contestant.name} />
          <DialogFooter>
            <Button className="w-full">
              <Link href={contestant.videoLink} target="_blank">
                Watch on YouTube
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Watch {contestant.name}&apos;s Video
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{contestant.name}&apos;s Video</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ContestantVideo url={contestant.videoLink} name={contestant.name} />
        </div>
        <DrawerFooter className="pt-2">
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full">
              <Link href={contestant.videoLink} target="_blank">
                Watch on YouTube
              </Link>
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
