import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { GoogleLogo } from "@/components/google-logo";
import { FacebookLogo } from "@/components/facebook-logo";
import { auth, signIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic"

export default async function Home() {
  const session = await auth();

  return (
    <>
      <section className="px-1 bg-primary text-white text-center py-24">
        <div className="mx-auto max-w-4xl">
          <Logo className="h-14 w-14 mx-auto" />
          <h1 className="text-3xl font-bold md:text-5xl">
            Welcome to the
            <br />
            Cosmo Acoustic Challenge 3.0
          </h1>
          <p className="text-lg font-light mt-2">
            Sing Your Heart Out and Shine with Your Musical Talent!
          </p>
          <Button asChild className="mt-6 inline-block" variant="secondary">
            <Link href="/#register">Register Now</Link>
          </Button>
        </div>
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
                The Cosmo Acoustic Challenge is a platform for aspiring singers
                to showcase their talent. Submit a video of you singing with a
                guitar, ukulele, or keyboard for a chance to be selected for
                live auditions and a one-take video shoot. Finalists&apos;
                videos will be posted on Musica Music&apos;s YouTube channel,
                where audience engagement and votes will determine the winners.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Eligibility Criteria</h3>
              <p className="text-gray-600 mt-4">
                To participate in the Cosmo Acoustic Challenge, challengers must
                sing Nepali songs and can be accompanied by a guitar, ukulele,
                or keyboard. The instrument player can be either the contestant
                or a friend. Only 30 challengers will be selected for the final
                video shoot.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="timeline">
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
                22nd June 2024, Saturday - Registration Starts
              </div>
              <div className="text-gray-600">
                Registration for the Cosmo Acoustic Challenge 3.0 starts!
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                13th July 2024, Saturday - Video Submission Deadline
              </div>
              <div className="text-gray-600">
                Submit your singing video accompanied by a guitar, ukulele, or
                keyboard by 12:00 PM.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                17th July 2024, Wednesday - Announcement of Selected 50
                Challengers
              </div>
              <div className="text-gray-600">
                The 50 selected challengers will be announced by 8:00 PM.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                20th July 2024, Saturday - Live Audition
              </div>
              <div className="text-gray-600">
                Selected challengers will attend a live audition.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                25th July 2024, Thursday - Announcement of Selected 30
                Challengers
              </div>
              <div className="text-gray-600">
                The final 30 challengers for the video shoot will be announced.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                3rd August 2024, Saturday - One-Take Video Shoot
              </div>
              <div className="text-gray-600">
                The final 30 challengers will perform for a one-take video
                shoot.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                10th August 2024, Saturday - Videos Go Live on Musica Music
                YouTube Channel
              </div>
              <div className="text-gray-600">
                The challengers&apos; videos will be published on the Musica
                Music YouTube channel.
              </div>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29px] z-10 top-1" />
              <div className="font-medium">
                23rd August 2024, Friday - Voting Deadline
              </div>
              <div className="text-gray-600">
                Voting and engagement on the videos will close at 12:00 PM.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
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
         */}

      {/*
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

          <RegistrationForm />
        </div>
      </section>
         */}

      <div className="py-12" id="register">
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Register
                </h1>
              </div>
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit quis ex corrupti dolores quia cumque tempora amet
                  enim autem et.
                </p>
              </div>
              <div className="mt-8 gap-3 flex justify-center">
                {!session?.user ? (
                  <>
                    <form
                      action={async () => {
                        "use server";
                        await signIn("google");
                      }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex gap-1"
                        type="submit"
                      >
                        <GoogleLogo className="h-5 w-5" /> Register with Google
                      </Button>
                    </form>
                    <Button size="lg" variant="outline" className="flex gap-1">
                      <FacebookLogo className="h-5 w-5" />
                      Register with Facebook
                    </Button>
                  </>
                ) : (
                  <Button asChild>
                      <Link href="/profile/upload">Upload your video</Link>
                    </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                What is the registration fee?
              </AccordionTrigger>
              <AccordionContent>
                The registration fee is Rs.2000/-, payable only by the selected
                30 challengers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                What are the judging criteria?
              </AccordionTrigger>
              <AccordionContent>
                Winners will be determined based on the highest number of votes,
                likes, and views on YouTube, and there will also be an
                Editor&apos;s Choice winner.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                Can I submit multiple entries?
              </AccordionTrigger>
              <AccordionContent>
                No, each challenger can only enter once.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                Who records the final performance video?
              </AccordionTrigger>
              <AccordionContent>
                The event organizing team will record the video at a designated
                location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                What is the duration limit for the performance?
              </AccordionTrigger>
              <AccordionContent>
                Each performance should not exceed 5 minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                Can I use paid promotion for my video?
              </AccordionTrigger>
              <AccordionContent>
                No, paid promotion is not allowed, and using bots for votes will
                result in disqualification.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-7"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                What are the prizes for winners?
              </AccordionTrigger>
              <AccordionContent>
                Winners will receive a brand new Mantra Semi Acoustic Guitar, a
                music deal, and various gift hampers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-8"
              className="bg-white shadow-md px-6 py-3"
            >
              <AccordionTrigger className="font-bold">
                How will I know if I&apos;m selected?
              </AccordionTrigger>
              <AccordionContent>
                Selected participants will be contacted via email or phone call
                with further instructions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}
