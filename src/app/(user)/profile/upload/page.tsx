import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db-connect";
import { Person } from "@/models/person";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BasicUploaderDemo } from "@/components/video-upload";

export const dynamic = "force-dynamic";

export default async function UploadVideo() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  await dbConnect();
  const person = await Person.findOne({ email: session.user.email });

  if (!person?.profileCompleted) return redirect("/profile");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{person.fileURL ? "Edit Video" : "Upload Video"}</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <BasicUploaderDemo
        fileURL={person.fileURL as string}
        fileProcessing={person.fileProcessing}
      />
    </Card>
  );
}
