import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./db-connect";
import { loginSchema } from "@/validators/person.schema";
import { Person } from "@/models/person";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
        } catch (err) {
          return null;
        }
        const result = loginSchema.parse(credentials);

        const person = await Person.findOne({ email: credentials.email });
        if (!person || !person.password) {
          return null;
        }

        const isPasswordCorrect = await compare(
          result.password,
          person.password
        );

        if (!isPasswordCorrect || person.email !== credentials.email) {
          return null;
        }

        return { email: person.email, name: person.fullName };
      },
    }),
  ],
  callbacks: {
    async signIn(data) {
      if (data.account?.provider === "google" && data.user.email) {
        await dbConnect();
        const person = await Person.findOne({ email: data.user.email });

        if (!person) {
          await Person.create({
            email: data.user.email,
            fullName: data.user.name,
          });
        }
      }
      return true;
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/register",
  },
});
