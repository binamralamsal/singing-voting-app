"use server";

import fs from "node:fs/promises";

import { z } from "zod";
import { profileSchema, registerSchema } from "@/validators/person.schema";
import { Person } from "@/models/person";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db-connect";
import { revalidatePath } from "next/cache";
import { genSalt, hash } from "bcryptjs";
import { getCurrentPerson, getLoggedInUserDetail } from "./get-current-person";
import { calculateRemainingVotes } from "./calculate-remaining-votes";

export async function updateCurrentPerson(
  person: z.infer<typeof profileSchema>
) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();
  const dbPerson = await Person.findOne({ email: session.user.email });

  if (!dbPerson) {
    await Person.create({
      email: session.user.email,
      ...person,
      profileCompleted: true,
    });
  } else {
    await Person.updateOne(
      { email: session.user.email },
      {
        profileCompleted: true,
        ...person,
      }
    );
  }

  revalidatePath("/profile");

  return { success: true, message: "User Updated Successfully" };
}

export async function updateVideoUrl(videoLink: string, id: string) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();
  const person = await Person.findOne({ _id: id });

  if (!person) {
    return redirect("/admin");
  } else {
    await Person.updateOne(
      { _id: id },
      {
        videoLink,
        isContestant: true,
      }
    );
  }

  revalidatePath("/admin");

  return { success: true, message: "Video link assigned" };
}

export async function removeContestant(id: string) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();
  const person = await Person.findOne({ _id: id });

  if (!person) {
    return redirect("/admin");
  } else {
    await Person.updateOne(
      { _id: id },
      {
        isContestant: false,
        videoLink: "",
        votes: [],
      }
    );
  }

  revalidatePath("/admin");

  return { success: true, message: "Removed user as contestant" };
}

export async function removeVideo() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();

  const currentPerson = await Person.findOne({ email: session.user.email });
  if (!currentPerson?.profileCompleted) return redirect("/profile");

  await Person.updateOne(
    { email: currentPerson.email },
    { $set: { fileProcessing: false, fileURL: "" } }
  );

  if (currentPerson.fileURL) {
    const filePath = currentPerson.fileURL.replace("/api", ".");
    await fs.unlink(filePath);
  }

  revalidatePath("/profile/upload");

  return { message: "Video removed successfully!" };
}

export async function removePhoto({ id }: { id: string }) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();

  const person = await Person.findOne({ _id: id });
  if (!person) return redirect("/admin");

  await Person.updateOne({ _id: id }, { $set: { photo: "" } });

  if (person.photo) {
    const filePath = person.photo.replace("/api", ".");
    await fs.unlink(filePath);
  }

  revalidatePath("/admin");

  return { message: "Photo removed successfully!" };
}

export async function signInUser(person: { email: string; password: string }) {
  try {
    const result = await signIn("credentials", { ...person, redirect: false });
    return { message: "Signed in Successfully" };
  } catch (err) {
    return {
      error:
        "Invalid email or password. If you used google login then please use that instead.",
    };
  }
}

export async function registerUser(personDetails: {
  email: string;
  password: string;
  fullName: string;
}) {
  const parsedBody = registerSchema.safeParse(personDetails);

  if (!parsedBody.success) {
    return {
      status: "ERROR",
      message: "Validation Error Occurred",
      error: parsedBody.error,
    };
  }

  const { data } = parsedBody;

  await dbConnect();
  const person = await Person.findOne({ email: data.email });

  if (person)
    return {
      status: "ERROR",
      message:
        "User with the email address already exists. If you used google login then please login with google!",
    };

  const salt = await genSalt(12);
  data.password = await hash(data.password, salt);
  await Person.create(data);

  return {
    message: "User registered successfully",
    status: "OK",
  };
}

export async function registerWithGoogle() {
  return await signIn("google");
}

export async function voteContestant(formData: FormData) {
  const { user } = await getLoggedInUserDetail();
  if (!user) return redirect("/");

  const votes = parseInt((formData.get("votes") as string) || "");
  const contestantId = formData.get("contestant");
  const remainingNumberOfVotes = await calculateRemainingVotes(
    user._id.toString()
  );

  if (votes > remainingNumberOfVotes)
    return { error: `You only have ${remainingNumberOfVotes} votes left!` };

  const result = await Person.updateOne(
    { _id: contestantId, "votes.voterId": user._id },
    {
      $inc: { "votes.$.votes": votes },
    }
  );

  if (result.matchedCount === 0) {
    await Person.updateOne(
      { _id: contestantId },
      {
        $push: {
          votes: {
            voterId: user._id,
            votes: votes,
          },
        },
      }
    );
  }

  revalidatePath("/vote");

  return { message: `Successfully voted ${votes} to the contestant` };
}
