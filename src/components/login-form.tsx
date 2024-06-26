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
import { loginSchema, registerSchema } from "@/validators/person.schema";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerWithGoogle, signInUser } from "@/services/person/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoogleLogo } from "./google-logo";

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const data = await signInUser({
        email: values.email,
        password: values.password,
      });
      if (data.message) {
        toast.success("Logged in Successfully!");

        router.push("/profile");
        router.refresh();
      }

      if (data.error) toast.success(data.error);
    });
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            If you have already created your account, enter your details to
            login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
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
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Register
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
              <GoogleLogo className="h-5 w-5" /> Login with Google
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
