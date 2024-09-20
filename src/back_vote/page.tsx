import dbConnect from "@/lib/db-connect";
import { ContestantCard } from "./contestant-card";
import { Person } from "@/models/person";
import { getLoggedInUserDetail } from "@/services/person/get-current-person";
import { redirect } from "next/navigation";
import { calculateRemainingVotes } from "@/services/person/calculate-remaining-votes";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { SearchInput } from "./search-input";

export const dynamic = "force-dynamic";

const searchContestantsSchema = z.object({
  query: z.string().toLowerCase().optional(),
});

export default async function VotePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await dbConnect();
  const dbContestants = await Person.find({ isContestant: true }).select(
    "personId fullName photo videoLink _id"
  );

  const { data, error } = searchContestantsSchema.safeParse(searchParams);

  const contestants = dbContestants
    .map((c) => ({
      name: c.fullName,
      image: c.photo,
      video: c.videoLink,
      code: c.getParticipantId(),
      id: c._id.toString(),
    }))
    .filter((c) => {
      if (error || !data.query) return true;
      return (
        c.name.toLowerCase().includes(data.query) ||
        c.code.toLowerCase().includes(data.query)
      );
    })
    .sort(() => Math.random() - 0.5);

  console.log(contestants);

  const { user } = await getLoggedInUserDetail();
  if (!user) return redirect("/");
  const remainingNumberOfVotes = await calculateRemainingVotes(
    user._id.toString()
  );

  return (
    <main>
      <section className="py-12 bg-gray-50">
        <div className="container flex justify-between items-center flex-col md:flex-row ">
          <h1 className="font-bold text-3xl text-gray-800 text-center md:text-left md:mb-0 mb:5">
            Vote for your favorite contestants
          </h1>
          <SearchInput query={data?.query || ""} />
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <p className="py-3 font-medium text-lg">
            {remainingNumberOfVotes === 0
              ? "You don't have any votes left. Thanks for voting!"
              : `Votes remaining: ${remainingNumberOfVotes}`}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {contestants.map((contestant) => (
              <ContestantCard
                key={contestant.name}
                contestant={contestant}
                remainingVotes={remainingNumberOfVotes}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
