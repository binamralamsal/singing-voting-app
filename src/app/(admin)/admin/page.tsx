import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPerson, Person } from "@/models/person";
import dbConnect from "@/lib/db-connect";
import { Document } from "mongoose";
import { revalidatePath } from "next/cache";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { tab: string; page: string };
}) {
  await dbConnect();
  const session = await auth();
  if (!session || !session.user?.email) return redirect("/");

  const allowedRoles = ["reviewer", "admin", "selector"];

  const currentPerson = await Person.findOne({ email: session.user.email });
  if (!currentPerson || !allowedRoles.includes(currentPerson.role))
    return redirect("/");

  const participantsFilter: Record<string, unknown> = {
    role: "participant",
    $or: [{ fileProcessing: true }, { fileURL: { $ne: "" } }],
  };

  let activeTab = "all";
  let allTabs: string[] = [];

  if (currentPerson.role === "admin") {
    allTabs = ["all", "pending", "approved", "spam", "rejected", "selected"];
  } else if (currentPerson.role === "reviewer") {
    allTabs = ["all", "pending", "approved", "spam"];
  } else if (currentPerson.role === "selector") {
    allTabs = ["approved", "rejected", "selected"];
  }

  if (
    typeof searchParams.tab !== "undefined" &&
    allTabs.includes(searchParams.tab)
  ) {
    participantsFilter.status = searchParams.tab;
    activeTab = searchParams.tab;
  }

  const currentPage = Number(searchParams.page) || 1;
  const perPage = 15;
  const skip = (currentPage - 1) * perPage;

  const participants = await Person.find(participantsFilter)
    .skip(skip)
    .limit(perPage);
  const totalParticipants = await Person.countDocuments(participantsFilter);
  const totalPages = Math.ceil(totalParticipants / perPage);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Participants</h1>
      </div>

      <div>
        <div className="inline-flex flex-wrap items-center  rounded-md bg-muted p-1 text-muted-foreground">
          {allTabs.map((tab) => (
            <Link
              href={tab === "all" ? "/admin" : `/admin?tab=${tab}`}
              key={tab}
              className={cn(
                "rounded-sm px-3 py-1.5 text-sm font-medium capitalize",
                activeTab === tab && "bg-background text-foreground shadow-sm"
              )}
            >
              {tab}
            </Link>
          ))}
        </div>
      </div>

      {participants.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No Participants
            </h3>
            <p className="text-sm text-muted-foreground">
              No one has participated yet!
            </p>
          </div>
        </div>
      ) : (
        <ParticipantsTable
          participants={participants}
          perPage={perPage}
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
          totalParticipants={totalParticipants}
          currentRole={currentPerson.role}
        />
      )}
    </>
  );
}

function ParticipantsTable({
  participants,
  currentPage,
  perPage,
  totalPages,
  totalParticipants,
  searchParams,
  currentRole,
}: {
  participants: (Document<unknown, {}, IPerson> &
    IPerson &
    Required<{
      _id: unknown;
    }>)[];
  perPage: number;
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string>;
  totalParticipants: number;
  currentRole: string;
}) {
  const paginationRange = generatePagination(currentPage, totalPages);
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">DOB </TableHead>
              <TableHead className="hidden md:table-cell">
                Contact Number
              </TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead className="hidden md:table-cell">Profession</TableHead>
              <TableHead className="hidden md:table-cell">Video</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={(participant._id as string).toString() as string}>
                <TableCell>CAC_{participant.personId + 800}</TableCell>
                <TableCell className="font-medium">
                  {participant.email}
                </TableCell>
                <TableCell className="font-medium">
                  {participant.email}
                </TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    variant={
                      participant.status === "pending"
                        ? "outline"
                        : participant.status
                    }
                  >
                    {participant.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {participant.dateOfBirth.toDateString()} -{" "}
                  {calculateAge(participant.dateOfBirth)} years old
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {participant.contactNumber}
                  {participant.alternateContactNumber
                    ? `, ${participant.alternateContactNumber}`
                    : ""}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {participant.address}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {participant.profession}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {participant.fileProcessing || !participant.fileURL ? (
                    <Badge variant="outline">Processing</Badge>
                  ) : (
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
                            <MediaPlayer src={participant.fileURL}>
                              <MediaProvider />
                              <DefaultVideoLayout icons={defaultLayoutIcons} />
                            </MediaPlayer>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                          <Button type="button" variant="outline" asChild>
                            <Link
                              href={participant.fileURL}
                              target="_blank"
                              download
                            >
                              Download
                            </Link>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {currentRole !== "selector" &&
                        participant.status !== "pending" && (
                          <form
                            action={async () => {
                              "use server";

                              await Person.updateOne(
                                { email: participant.email },
                                { status: "pending" }
                              );
                              revalidatePath("/admin");
                            }}
                          >
                            <DropdownMenuItem asChild>
                              <button className="w-full">Pending</button>
                            </DropdownMenuItem>
                          </form>
                        )}
                      {participant.status !== "approved" && (
                        <form
                          action={async () => {
                            "use server";

                            await Person.updateOne(
                              { email: participant.email },
                              { status: "approved" }
                            );
                            revalidatePath("/admin");
                          }}
                        >
                          <DropdownMenuItem asChild>
                            <button className="w-full">Approve</button>
                          </DropdownMenuItem>
                        </form>
                      )}
                      {currentRole !== "selector" &&
                        participant.status !== "spam" && (
                          <form
                            action={async () => {
                              "use server";

                              await Person.updateOne(
                                { email: participant.email },
                                { status: "spam" }
                              );
                              revalidatePath("/admin");
                            }}
                          >
                            <DropdownMenuItem asChild>
                              <button className="w-full">Spam</button>
                            </DropdownMenuItem>
                          </form>
                        )}
                      {currentRole !== "reviewer" &&
                        participant.status !== "rejected" && (
                          <form
                            action={async () => {
                              "use server";

                              await Person.updateOne(
                                { email: participant.email },
                                { status: "rejected" }
                              );
                              revalidatePath("/admin");
                            }}
                          >
                            <DropdownMenuItem asChild>
                              <button className="w-full">Reject</button>
                            </DropdownMenuItem>
                          </form>
                        )}
                      {currentRole !== "reviewer" &&
                        participant.status !== "selected" && (
                          <form
                            action={async () => {
                              "use server";

                              await Person.updateOne(
                                { email: participant.email },
                                { status: "selected" }
                              );
                              revalidatePath("/admin");
                            }}
                          >
                            <DropdownMenuItem asChild>
                              <button className="w-full">Select</button>
                            </DropdownMenuItem>
                          </form>
                        )}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Motivation Reason
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuLabel className="max-w-[500px]">
                              {participant.motivationReason}
                            </DropdownMenuLabel>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex-col">
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent className="flex-wrap">
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/admin?${new URLSearchParams({
                      ...searchParams,
                      page: String(currentPage - 1),
                    }).toString()}`}
                  />
                </PaginationItem>
              )}
              {paginationRange.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/admin?${new URLSearchParams({
                      ...searchParams,
                      page: String(page),
                    }).toString()}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {!paginationRange.includes(totalPages) && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={`/admin?${new URLSearchParams({
                      ...searchParams,
                      page: String(currentPage + 1),
                    }).toString()}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
        <div className="text-xs text-muted-foreground mt-4">
          Showing{" "}
          <strong>{`${(currentPage - 1) * perPage + 1}-${Math.min(
            currentPage * perPage,
            totalPages * perPage
          )} `}</strong>
          of <strong>{totalParticipants}</strong> participants.
        </div>
      </CardFooter>
    </Card>
  );
}

function generatePagination(
  currentPage: number,
  totalPages: number,
  maxPages = 10
) {
  let startPage, endPage;

  if (maxPages > totalPages) {
    maxPages = totalPages;
  }

  const halfWindow = Math.floor(maxPages / 2);

  if (currentPage <= halfWindow) {
    startPage = 1;
    endPage = Math.min(totalPages, maxPages);
  } else if (currentPage > totalPages - halfWindow) {
    startPage = totalPages - maxPages + 1;
    endPage = totalPages;
  } else {
    startPage = currentPage - halfWindow;
    endPage = currentPage + halfWindow - 1;
  }

  if (startPage < 1) {
    startPage = 1;
  }
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
}

function calculateAge(dateOfBirth: Date) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
