import { ContestantCard } from "./contestant-card";

function generateRandomContestants() {
  return Array.from({ length: 8 }, (_, index) => ({
    name: `Person ${index + 1}`,
    image: "/placeholder.svg",
    video: "https://youtu.be/cA9q0k3vIO0",
    code: `CAC_${index + 1}`,
  }));
}

export default function VotePage() {
  return (
    <main>
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h1 className="font-bold text-3xl text-gray-800 text-center md:text-left">
            Vote for your favorite contestants
          </h1>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <p className="py-3 font-medium text-lg">Votes remaining: 30</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {generateRandomContestants().map((contestant) => (
              <ContestantCard key={contestant.name} contestant={contestant} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
