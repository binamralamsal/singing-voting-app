"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/validators/person.schema";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  registerUser,
  registerWithGoogle,
  signInUser,
} from "@/services/person/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoogleLogo } from "./google-logo";

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
    mode: "all",
  });
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      const result = await registerUser(values);
      if (result.status === "ERROR") toast.error(result.message);

      if (result.status === "OK") {
        toast.success(result.message);
        await signInUser(values);
        router.push("/profile");
        router.refresh();
      }
    });
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="*********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <form action={registerWithGoogle} className="w-full">
            <Button
              size="lg"
              variant="outline"
              className="flex gap-1 w-full"
              type="submit"
            >
              <GoogleLogo className="h-5 w-5" /> Register with Google
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
