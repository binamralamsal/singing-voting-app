"use client";

import { UploadIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";
import { FormEvent } from "react";
import { toast } from "sonner";
import { GoogleLogo } from "./google-logo";

export function RegistrationForm() {
  function handleRegistrationFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    toast.error("Registration starts from 22nd June. Please come back later!");
    console.log("Fuck");
  }

  return (
    <form
      className="bg-white md:shadow-md rounded-md p-0 md:p-8 space-y-6"
      onSubmit={handleRegistrationFormSubmit}
    >
      <div className="text-center mb-2 flex justify-center">
        <Button size="lg" className="flex gap-1" variant="secondary">
          <GoogleLogo className="h-5 w-5" /> Login with Google
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="full-name">Full Name</Label>
          <Input
            id="full-name"
            placeholder="Enter your full name"
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="date-of-birth">Date of Birth</Label>
          <Input id="date-of-birth" type="date" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="contact-number">Contact Number</Label>
          <Input
            id="contact-number"
            placeholder="Enter your contact number"
            type="tel"
          />
        </div>
        <div>
          <Label htmlFor="alternate-number">Alternate Number</Label>
          <Input
            id="alternate-number"
            placeholder="Enter your alternate number"
            type="tel"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="permanent-address">Permanent Address</Label>
          <Input
            id="permanent-address"
            placeholder="Enter your permanent address"
          />
        </div>
        <div>
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            placeholder="Enter your profession"
            type="text"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="motivation">
          What is your motivation behind joining the competition?
        </Label>
        <Textarea
          className="min-h-[100px]"
          id="motivation"
          placeholder="Enter your motivation"
        />
      </div>
      <div>
        <Label htmlFor="submission">Upload your video</Label>
        <div>
          <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  htmlFor="submission"
                >
                  <span>Upload a video</span>
                  <Input
                    className="sr-only"
                    id="submission"
                    name="submission"
                    type="file"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">MP4, AVI, MOV up to 100MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="items-top flex space-x-2">
        <Checkbox id="terms-and-conditions" />
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
        </div>
      </div>

      <Button className="w-full">Submit Entry</Button>
    </form>
  );
}
