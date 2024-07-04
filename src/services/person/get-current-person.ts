import { Person } from "@/models/person";
import dbConnect from "@/lib/db-connect";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getCurrentPerson = cache(async () => {
  const session = await auth();
  if (!session) return redirect("/");

  await dbConnect();
  const user = await Person.findOne({ email: session?.user?.email });

  const currentPerson = {
    fullName: user?.fullName || session?.user?.name || "",
    address: user?.address || "",
    motivationReason: user?.motivationReason || "",
    alternateContactNumber: user?.alternateContactNumber || "",
    dateOfBirth: user?.dateOfBirth?.toString() || "",
    contactNumber: user?.contactNumber || "",
    profession: user?.profession || "",
    participantCode: user?.getParticipantId() || "",
    email: user?.email || "",
  };

  return currentPerson;
});

export const getLoggedInUserDetail = cache(async () => {
  const session = await auth();

  await dbConnect();
  const user = await Person.findOne({ email: session?.user?.email });

  return { user, session };
});
