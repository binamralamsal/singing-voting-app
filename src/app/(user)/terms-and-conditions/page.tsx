import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, HelpCircleIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto max-w-4xl leading-loose space-y-5 mb-14 px-4">
      <h1 className="text-center font-bold text-3xl py-14">
        Terms and Conditions
      </h1>

      <div className="py-2">
        <h2 className="font-bold text-2xl mb-3">Competition Format</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            Interested challengers should register and send a video of them
            singing accompanied by a guitar, ukulele or keyboard in{" "}
            <Link href="/" className="text-blue-600 hover:text-blue-500">
              www.cosmoconcepts.com.np
            </Link>{" "}
            or Cosmo Acoustic Challenge app before 12pm, 3rd August, 2024,
            Saturday.
          </li>
          <li>
            50 challengers will be selected which will be announced on, 8th
            August, 2024, Thursday.
          </li>
          <li>
            The selected 50 challengers will be called for a live audition on
            10th August 2024, Saturday.
          </li>
          <li>
            30 challengers will be selected amongst the challengers for live
            shoot, and will be announced on 15th August 2024, Thursday.
          </li>
          <li>
            Selected 30 challengers should attend a workshop prior to the final
            one take video shoot on 17th August, 2024.
          </li>
          <li>
            Selected 30 challengers should perform their talent, i.e., One take
            video shoot on 24th August, 2024, Saturday.
          </li>
          <li>
            All the 30 challengers&apos; videos will go live from Musica Music{" "}
            <Link
              href="https://www.youtube.com/@MusicaMusic"
              target="_blank"
              className="text-blue-600 hover:text-blue-500"
            >
              YouTube channel (https://www.youtube.com/@MusicaMusic)
            </Link>{" "}
            on 31st August 2024, Saturday.
          </li>
          <li>
            The challengers will have 3 weeks beginning from 31st August 2024,
            Saturday to 21st September 2024, Friday 12pm to get their votes or
            criteria for winning.
          </li>
        </ul>
      </div>

      <div className="py-2">
        <Alert variant="default">
          <HelpCircleIcon className="h-4 w-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            Registration for this event is Rs.2000/- which will be only paid by
            selected 30 challengers to move on to Live one take Video shoot.
          </AlertDescription>
        </Alert>
      </div>

      <div className="py-2">
        <h2 className="font-bold text-2xl mb-3">Rules and Guidelines</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            Only 30 challengers will be selected which will be informed by 15th
            August 2024, Thursday.
          </li>
          <li>Challengers shall only sing Nepali songs.</li>
          <li>
            Challengers must be accompanied by a Guitar, Ukulele or Keyboard
            (the instrument player could either be the contestant
            himself/herself or a friend).
          </li>
          <li>
            Video recording shall be done only by the event organizing team on a
            designed set at specified location.
          </li>
          <li>
            The performance will be video recorded within a specific time frame
            given by the organizing team (make sure you are prepared and don’t
            forget to tune your instrument).
          </li>
          <li>
            The performance of each challenger shall not exceed 5 minutes.
          </li>
          <li>
            Challengers are responsible for getting winning criteria in their
            uploaded video.
          </li>
        </ul>
      </div>

      <div className="py-2">
        <h2 className="font-bold text-2xl mb-3">Criteria for Judging</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            Getting the highest number of votes in the voting app or website
            developed by the organizer will be the winner.
          </li>
          <li>
            Highest number of likes in the YouTube video of the challenger
            uploaded by the event organizing team on Musica Music YouTube
            channel will be the winner.
          </li>
          <li>
            Highest number of views in the YouTube video of the challenger
            uploaded by the event organizing team on Musica Music YouTube
            channel will be the winner.
          </li>
          <li>
            In addition, there will be one Editor’s Choice winner, which will be
            chosen by the event organizing team.
          </li>
        </ul>
      </div>

      <div className="py-2">
        <h2 className="font-bold text-2xl mb-3">Entry & Submission Rules</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>A challenger shall enter only once.</li>
          <li>
            The deadline for submission of video shall be on or before 12:00 PM,
            3rd August 2024, Saturday and the result for 50 selected challengers
            for live audition shall be announced on or before 8:00 PM, 8th
            August 2024, Thursday.
          </li>
        </ul>
      </div>

      <div className="py-2">
        <h2 className="font-bold text-2xl mb-3">
          Requirement for Final Submission
        </h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            The entry form provided by the organizing team shall be filled and
            submitted and must be properly accomplished.
          </li>
          <li>
            Registration fees of Rs.2000/- should be submitted along with the
            form (applicable for selected final 30 challengers only).
          </li>
        </ul>
      </div>

      <div className="py-2">
        <h2 className="font-bold text-2xl mb-3">Rules for Disqualification</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            Paid promotion of the contestant’s video shall not be accepted.
          </li>
          <li>
            Using bots for voting and winning purposes shall be identified, such
            participants will be disqualified immediately.
          </li>
        </ul>
      </div>

      <div className="py-2">
        <h2 className="font-bold text-2xl mb-3">Prize for Winners</h2>
        <p>
          Brand new Semi Acoustic Guitar, a music deal and lots of gift hampers.
        </p>
      </div>

      <div className="py-2">
        <Alert variant="default">
          <HelpCircleIcon className="h-4 w-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            IF SELECTED, WE WILL CONTACT YOU THROUGH EMAIL OR PHONE CALL AND
            FURTHER PROVIDE YOU WITH THE STEPS NEEDED.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
