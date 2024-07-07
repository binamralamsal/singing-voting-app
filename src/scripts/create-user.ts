import dbConnect from "@/lib/db-connect";
import { Person } from "@/models/person";
import bcrypt, { genSalt, hash } from "bcryptjs";
import inquirer from "inquirer";
import { connect, set } from "mongoose";
import { z } from "zod";

const validate = (input: string, zodSchema: z.Schema) => {
  const parsed = zodSchema.safeParse(input);
  if (parsed.success) return true;

  return parsed.error.issues[0].message;
};

inquirer
  .prompt([
    {
      type: "input",
      name: "fullName",
      message: "What name should I give to the user?",
      validate(input) {
        return validate(
          input,
          z
            .string()
            .min(3, { message: "Name must be at least 3 characters" })
            .max(255, { message: "Name must not exceed 255 characters" })
        );
      },
    },
    {
      type: "input",
      name: "email",
      message: "What email should I give to the user?",
      validate(input) {
        return validate(
          input,
          z.string().email({
            message: "Ooops! The email that you entered is invalid 🤧",
          })
        );
      },
    },
    {
      type: "password",
      name: "password",
      validate(input) {
        return validate(
          input,
          z.string().min(6, {
            message:
              "We value your security, so please enter password >= 6 characters",
          })
        );
      },
    },
    {
      type: "list",
      name: "role",
      message: "What role do you want for the user?",
      choices: [
        { name: "Admin", value: "admin" },
        { name: "Selector", value: "selector" },
        { name: "Reviewer", value: "reviewer" },
        { name: "Participant", value: "participant" },
      ],
      default: "participant",
    },
  ])
  .then(async (answers) => {
    try {
      await dbConnect();

      const salt = await genSalt(12);
      const hashedPassword = await hash(answers.password, salt);

      await Person.create({ ...answers, password: hashedPassword });
      console.log("Person created successfully");
    } catch (err) {
      console.error("Error occured while creating user");
      console.error(err);
    } finally {
      process.exit(0);
    }
  });
