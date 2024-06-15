import { SiteHeader } from "@/components/site-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MedalIcon, StarIcon, TrophyIcon, UploadIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <SiteHeader />

      <section className="px-1 bg-gray-900 text-white text-center py-24">
        <Logo className="h-14 w-14 mx-auto" />
        <h1 className="text-3xl font-bold md:text-5xl">
          Welcome to the Competition
        </h1>
        <p className="text-lg font-light mt-2">
          Showcase your skills and compete for amazing prizes. Join us today!
        </p>
        <Button asChild className="mt-6 inline-block" variant="secondary">
          <Link href="/#register">Register Now</Link>
        </Button>
      </section>

      <section className="py-20 px-4" id="about">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              About the Competition
            </h2>
            <p className="text-gray-600 mt-4">
              Learn more about the competition and what it entails.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold">Competition Overview</h3>
              <p className="text-gray-600 mt-4">
                The competition is open to individuals and teams who want to
                showcase their skills and creativity. Participants will be
                tasked with solving real-world problems and presenting their
                solutions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Eligibility Criteria</h3>
              <p className="text-gray-600 mt-4">
                To participate in the competition, you must be a resident of the
                country and be at least 18 years old. There are no other
                restrictions, and we encourage everyone to join.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Timeline</h2>
            <p className="text-gray-600 mt-4">
              Check out the key milestones of our singing event.
            </p>
          </div>

          <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-900 relative pl-6 after:left-0 grid gap-7">
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                June 1, 2023 - Event Announcement
              </div>
              <div className="text-gray-600">
                The singing event is officially announced, inviting talented
                vocalists to participate.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                June 1, 2023 - Event Announcement
              </div>
              <div className="text-gray-600">
                The singing event is officially announced, inviting talented
                vocalists to participate.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                June 1, 2023 - Event Announcement
              </div>
              <div className="text-gray-600">
                The singing event is officially announced, inviting talented
                vocalists to participate.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                June 1, 2023 - Event Announcement
              </div>
              <div className="text-gray-600">
                The singing event is officially announced, inviting talented
                vocalists to participate.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-4" id="prizes">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Prizes</h2>
            <p className="text-gray-600 mt-4">
              Check out the amazing prizes up for grabs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-md p-6 space-y-4">
              <TrophyIcon className="h-12 w-12 text-blue-500" />
              <h3 className="text-2xl font-bold">1st Place</h3>
              <p className="text-gray-600">$5,000 cash prize and a trophy.</p>
            </div>
            <div className="bg-white shadow-md rounded-md p-6 space-y-4">
              <MedalIcon className="h-12 w-12 text-blue-500" />
              <h3 className="text-2xl font-bold">2nd Place</h3>
              <p className="text-gray-600">$3,000 cash prize and a medal.</p>
            </div>
            <div className="bg-white shadow-md rounded-md p-6 space-y-4">
              <StarIcon className="h-12 w-12 text-blue-500" />
              <h3 className="text-2xl font-bold">3rd Place</h3>
              <p className="text-gray-600">
                $2,000 cash prize and a certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="register">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Register for the Competition
            </h2>
            <p className="text-gray-600 mt-4">
              Fill out the form below to submit your entry.
            </p>
          </div>
          <form className="bg-white md:shadow-md rounded-md p-0 md:p-8 space-y-6">
            <div>
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                placeholder="Enter your full name"
                type="text"
              />
            </div>

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
            <div>
              <Label htmlFor="date-of-birth">Date of Birth</Label>
              <Input id="date-of-birth" type="date" />
            </div>
            <div>
              <Label htmlFor="permanent-address">Permanent Address</Label>
              <Input
                id="permanent-address"
                placeholder="Enter your permanent address"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div>
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                placeholder="Enter your profession"
                type="text"
              />
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
                    <p className="text-xs text-gray-500">
                      MP4, AVI, MOV up to 100MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full">Submit Entry</Button>
          </form>
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-4" id="faq">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-4">
              Find answers to common questions about the competition.
            </p>
          </div>
          <Accordion type="single" className="space-y-4 pt-2" collapsible>
            <AccordionItem
              value="item-1"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Competition</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="text-gray-400 hover:text-white transition-colors"
              href="#about"
            >
              About
            </Link>
            <Link
              className="text-gray-400 hover:text-white transition-colors"
              href="#prizes"
            >
              Prizes
            </Link>
            <Link
              className="text-gray-400 hover:text-white transition-colors"
              href="#register"
            >
              Register
            </Link>
            <Link
              className="text-gray-400 hover:text-white transition-colors"
              href="#faq"
            >
              FAQ
            </Link>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 Competition. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
