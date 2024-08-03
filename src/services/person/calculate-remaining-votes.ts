import dbConnect from "@/lib/db-connect";
import { Person } from "@/models/person";
import mongoose from "mongoose";

export async function calculateRemainingVotes(voterId: string) {
  const maxVotes = 30;

  await dbConnect();

  const result = await Person.aggregate([
    { $unwind: "$votes" },
    { $match: { "votes.voterId": new mongoose.Types.ObjectId(voterId) } },
    {
      $group: {
        _id: null,
        totalVotes: { $sum: "$votes.votes" },
      },
    },
    {
      $project: {
        _id: 0,
        remainingVotes: { $subtract: [maxVotes, "$totalVotes"] },
      },
    },
  ]);

  return result.length > 0 ? result[0].remainingVotes : maxVotes;
}
