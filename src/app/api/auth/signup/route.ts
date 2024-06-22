import dbConnect from "@/lib/db-connect";
import { Person } from "@/models/person";
import { registerSchema } from "@/validators/person.schema";
import { genSalt, hash } from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = registerSchema.safeParse(body);

  if (!parsedBody.success) {
    return Response.json(
      {
        status: "ERROR",
        message: "Validation Error Occurred",
        error: parsedBody.error,
      },
      { status: 422 }
    );
  }

  const { data } = parsedBody;
  await dbConnect();
  const person = await Person.findOne({ email: data.email });

  if (person)
    return Response.json(
      { status: "ERROR", message: "Person already exists!" },
      { status: 422 }
    );

  const salt = await genSalt(12);
  data.password = await hash(data.password, salt);
  const newPerson = await Person.create(data);

  return Response.json(
    {
      message: "User registered successfully",
      status: "OK",
      person: newPerson,
    },
    { status: 200 }
  );
}
