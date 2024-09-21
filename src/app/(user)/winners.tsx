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
  contestantCode: string;
  achievement: string;
};

const cards = [
  {
    id: 1,
    name: "Aakanchya Shrestha	",
    image: "/aakansha.png",
    contestantCode: "CAC_910",
    achievement: "17,731	Votes - Most Voted",
  },
  {
    id: 2,
    name: "Allam Aadesh	",
    image: "/allam.png",
    contestantCode: "CAC_845",
    achievement: "The Editor's Choice",
  },
  {
    id: 3,
    name: "Jaisha Maharjan",
    image: "/jaisa.png",
    contestantCode: "CAC_895",
    achievement: "Most Liked on YouTube",
  },
  {
    id: 4,
    name: "Sweta Paudel	",
    image: "/sweta.png",
    contestantCode: "CAC_867",
    achievement: "Most Viewed",
  },
];

export function Winners() {
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
    <div className="container">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-1 justify-center items-center">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`rounded-lg shadow-2xl border-2 border-yellow-500 w-full`}
          >
            <div className="relative h-full bg-white rounded-lg overflow-hidden flex flex-col">
              <div className="relative">
                <Image
                  src={card.image}
                  width={600}
                  height={400}
                  alt={`${card.name}`}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">{card.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Contestant Code: {card.contestantCode}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mb-4">
                    {card.achievement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
