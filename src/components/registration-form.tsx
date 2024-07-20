"use client";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clientProfileSchema, profileSchema } from "@/validators/person.schema";
import { z } from "zod";
import { useState, useTransition } from "react";
import { updateCurrentPerson } from "@/services/person/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CalendarDatePicker } from "./calendar-date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, CopyIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

export function RegistrationForm(props: {
  currentPerson: z.infer<typeof profileSchema> & {
    participantCode: string;
    email: string;
  };
}) {
  const form = useForm<z.infer<typeof clientProfileSchema>>({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      ...props.currentPerson,
      agreeWithTermsAndConditions: false,
    },
    mode: "all",
  });

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof clientProfileSchema>) {
    toast.error("Registrations have been closed!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Registrations have been closed, so you can&apos;t update your
              details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <p className="space-x-2">
                <span>
                  <strong>Participant Code</strong>:{" "}
                  {props.currentPerson.participantCode}
                </span>
                <Button
                  variant="outline"
                  className="h-6 w-6 p-0"
                  type="button"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(props.currentPerson.participantCode)
                      .then(() => {
                        toast.success(
                          `${props.currentPerson.participantCode} has been copied to clipboard.`
                        );
                      })
                      .catch(() => {
                        toast.error(
                          `Failed to copy text, please use a modern browser.`
                        );
                      });
                  }}
                >
                  <CopyIcon className="w-3 h-3" />
                </Button>
              </p>
              <p>
                <strong>Email Address</strong>: {props.currentPerson.email}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={new Date(field.value)}
                            onSelect={(value) => {
                              field.onChange(value?.toString());
                            }}
                            fromYear={1960}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contact Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="98XXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alternateContactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="98XXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Permanent Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Kathmandu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Profession <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Student" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="motivationReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What is your motivation behind joining the competition?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your motivation"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeWithTermsAndConditions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="items-top flex space-x-2">
                      <Checkbox
                        id="terms-and-conditions"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms-and-conditions"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                          You agree to our{" "}
                          <Link
                            href="/terms-and-conditions"
                            className="text-blue-600 hover:text-blue-500"
                          >
                            Terms and conditions
                          </Link>{" "}
                          or rules of the competition.
                        </p>
                        <FormMessage />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <Button disabled>Update</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
