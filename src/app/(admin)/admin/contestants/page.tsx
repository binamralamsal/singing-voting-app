import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db-connect";
import { IPerson, Person } from "@/models/person";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { Schema } from "mongoose";
import { Document } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MarkForVoting } from "../mark-for-voting";

export const dynamic = "force-dynamic";

export default async function ContestantsPage() {
  await dbConnect();
  const session = await auth();
  if (!session || !session.user?.email) return <LoginForm />;

  const allowedRoles = ["reviewer", "admin", "selector"];

  const currentPerson = await Person.findOne({ email: session.user.email });
  if (!currentPerson || !allowedRoles.includes(currentPerson.role))
    return redirect("/");

  const contestants = await Person.find({ isContestant: true });

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Contestants</h1>
      </div>

      {contestants.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No Contestants
            </h3>
            <p className="text-sm text-muted-foreground">
              Please assign someone as contestants
            </p>
          </div>
        </div>
      ) : (
        <ContestantsTable contestants={contestants} />
      )}
    </>
  );
}

function ContestantsTable(props: {
  contestants: (Document<unknown, {}, IPerson> &
    IPerson &
    Required<{
      _id: Schema.Types.ObjectId;
    }>)[];
}) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Video</TableHead>
              <TableHead className="hidden md:table-cell">Votes</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.contestants.map((participant) => (
              <TableRow key={participant._id.toString()}>
                <TableCell>{participant.getParticipantId()}</TableCell>
                <TableCell className="font-medium">
                  {participant.fullName}
                </TableCell>
                <TableCell className="font-medium">
                  {participant.email}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        Watch
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="gap-3">
                        <DialogTitle>
                          {participant.fullName}&apos;s Video
                        </DialogTitle>
                        <DialogDescription>
                          <MediaPlayer src={participant.videoLink}>
                            <MediaProvider />
                            <DefaultVideoLayout icons={defaultLayoutIcons} />
                          </MediaPlayer>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="outline" asChild>
                          <Link href={participant.videoLink} target="_blank">
                            Watch on YouTube
                          </Link>
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {participant.votes.reduce((a, b) => a + b.votes, 0)}
                </TableCell>
                {participant.status === "selected" && (
                  <TableCell>
                    <MarkForVoting
                      name={participant.fullName}
                      id={participant._id.toString()}
                      photo={participant.photo}
                      videoLink={participant.videoLink || ""}
                      isContestant={participant.isContestant}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="text-xs text-muted-foreground mt-4">
          Showing {props.contestants.length} contestants.
        </div>
      </CardFooter>
    </Card>
  );
}
