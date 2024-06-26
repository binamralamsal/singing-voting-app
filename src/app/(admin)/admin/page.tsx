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

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { tab: string; page: string };
}) {
  await dbConnect();
  const session = await auth();
  if (!session || !session.user?.email) return redirect("/");

  const currentPerson = await Person.findOne({ email: session.user.email });
  if (
    !currentPerson ||
    (currentPerson.role !== "reviewer" && currentPerson.role !== "admin")
  )
    return redirect("/");

  const participantsFilter: Record<string, unknown> = {
    role: "participant",
    $or: [{ fileProcessing: true }, { fileURL: { $ne: "" } }],
  };

  let activeTab = "all";
  if (typeof searchParams.tab !== "undefined") {
    if (
      searchParams.tab === "approved" ||
      searchParams.tab === "spam" ||
      searchParams.tab === "pending"
    ) {
      participantsFilter.status = searchParams.tab;
      activeTab = searchParams.tab;
    }
  }
  const page = Number(searchParams.page) || 1; // Default to page 1 if not specified or invalid
  const perPage = 5; // Number of participants per page

  const skip = (page - 1) * perPage;

  const participants = await Person.find(participantsFilter)
    .skip(skip)
    .limit(perPage);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Participants</h1>
      </div>

      <div>
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          <Link
            href={`/admin?${new URLSearchParams({
              ...searchParams,
              tab: "all",
            }).toString()}`}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm font-medium",
              activeTab === "all" && "bg-background text-foreground shadow-sm"
            )}
          >
            All
          </Link>
          <Link
            href={`/admin?${new URLSearchParams({
              ...searchParams,
              tab: "pending",
            }).toString()}`}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm font-medium",
              activeTab === "pending" &&
                "bg-background text-foreground shadow-sm"
            )}
          >
            Pending
          </Link>
          <Link
            href={`/admin?${new URLSearchParams({
              ...searchParams,
              tab: "approved",
            }).toString()}`}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm font-medium",
              activeTab === "approved" &&
                "bg-background text-foreground shadow-sm"
            )}
          >
            Approved
          </Link>
          <Link
            href={`/admin?${new URLSearchParams({
              ...searchParams,
              tab: "spam",
            }).toString()}`}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm font-medium",
              activeTab === "spam" && "bg-background text-foreground shadow-sm"
            )}
          >
            Spam
          </Link>
        </div>
      </div>

      {participants.length === 0 ? (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
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
        <ParticipantsTable participants={participants} />
      )}
    </>
  );
}

function ParticipantsTable({
  participants,
}: {
  participants: (Document<unknown, {}, IPerson> &
    IPerson &
    Required<{
      _id: unknown;
    }>)[];
}) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Date of Birth
              </TableHead>
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
                <TableCell className="font-medium">
                  {participant.fullName} ({participant.email})
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      participant.status === "approved"
                        ? "success"
                        : participant.status === "spam"
                        ? "destructive"
                        : "outline"
                    }
                    className="capitalize"
                  >
                    {participant.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {participant.dateOfBirth.toDateString()}
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
                  {participant.fileProcessing ? (
                    <Badge variant="outline">Processing</Badge>
                  ) : (
                    <Button asChild variant="outline" size="sm">
                      <a href={participant.fileURL} target="_blank" download>
                        Download
                      </a>
                    </Button>
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
                      {participant.status !== "pending" && (
                        <form
                          action={async () => {
                            "use server";

                            await Person.updateOne(
                              {
                                email: participant.email,
                              },
                              {
                                status: "pending",
                              }
                            );
                            revalidatePath("/admin");
                          }}
                        >
                          <DropdownMenuItem asChild>
                            <button className="w-full">Mark as Pending</button>
                          </DropdownMenuItem>
                        </form>
                      )}
                      {participant.status !== "approved" && (
                        <form
                          action={async () => {
                            "use server";

                            await Person.updateOne(
                              {
                                email: participant.email,
                              },
                              {
                                status: "approved",
                              }
                            );
                            revalidatePath("/admin");
                          }}
                        >
                          <DropdownMenuItem asChild>
                            <button className="w-full">Approve</button>
                          </DropdownMenuItem>
                        </form>
                      )}
                      {participant.status !== "spam" && (
                        <form
                          action={async () => {
                            "use server";

                            await Person.updateOne(
                              {
                                email: participant.email,
                              },
                              {
                                status: "spam",
                              }
                            );
                            revalidatePath("/admin");
                          }}
                        >
                          <DropdownMenuItem asChild>
                            <button className="w-full">Mark as Spam</button>
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="text-xs text-muted-foreground mt-4">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
