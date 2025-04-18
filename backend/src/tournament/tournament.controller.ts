import { Request, Response } from "express";
import { getUserInfo } from "../user/user.service.js";
import { logAxiosError } from "../logging/AxiosErrorLogger.js";
import { generateNextMatch } from "./tournament.service.js";
import { bestDungeonsPicksBracket, worstDungeonsPicksBracket } from "../data/brackets.js";
import { supabase } from "../database/supabaseClient.js";

const filterSelf = (bracket: any[], discordUsername: string) => {
    return bracket.filter((pick) => pick.authors_discord_id !== discordUsername);
};

const _getNextMatch = async (listType: string, discordUsername: string) => {
    const currentVotes = await supabase
        .from("DungeonVotes")
        .select("*")
        .eq("voter_discord_id", discordUsername)
        .eq("listType", listType);

    const nextMatch = generateNextMatch(
        listType === "best"
            ? filterSelf(bestDungeonsPicksBracket, discordUsername)
            : filterSelf(worstDungeonsPicksBracket, discordUsername),
        currentVotes.data || []
    );

    return nextMatch;
};

const getNextMatch = async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const { listType } = req.params;
    if (listType !== "best" && listType !== "worst") {
        res.status(400).json({ error: "Invalid list type" });
    }

    try {
        const userInfo = await getUserInfo(accessToken);
        if (userInfo.error) {
            res.status(userInfo.errorCode).json({ error: userInfo.error });
        } else {
            const nextMatch = await _getNextMatch(listType, userInfo.data!.username);

            if (!nextMatch) {
                res.status(200).json({ message: "No more matches available" });
                return;
            }

            res.status(200).json({ message: "Next match ready", match: nextMatch });
            return;
        }
    } catch (err) {
        logAxiosError(err, "Error getting next match");
        res.status(500).json({ error: "Error getting next match" });
        return;
    }
};

const postVote = async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const { listType } = req.params;
    const { round, match, winnerId, loserId, winner } = req.body;
    if (
        round === undefined ||
        match === undefined ||
        winnerId === undefined ||
        loserId === undefined ||
        winner === undefined ||
        (listType !== "best" && listType !== "worst")
    ) {
        res.status(400).json({ error: "Invalid inputs type" });
        return;
    }

    try {
        const userInfo = await getUserInfo(accessToken);
        if (userInfo.error) {
            res.status(userInfo.errorCode).json({ error: userInfo.error });
            return;
        } else {
            const currentMatch = await _getNextMatch(listType, userInfo.data!.username);

            if (!currentMatch) {
                res.status(200).json({ message: "No more matches available" });
                return;
            }

            if (
                currentMatch.round !== round ||
                currentMatch.match !== match ||
                (currentMatch.submissionA.id !== winnerId && currentMatch.submissionA.id !== loserId) ||
                (currentMatch.submissionB.id !== winnerId && currentMatch.submissionB.id !== loserId)
            ) {
                res.status(400).json({ message: "You are voting on wrong match" });
                return;
            }

            const trueWinner = winner === "A" ? currentMatch.submissionA.id : currentMatch.submissionB.id;
            const trueLoser = winner === "A" ? currentMatch.submissionB.id : currentMatch.submissionA.id;

            const { error } = await supabase.from("DungeonVotes").insert([
                {
                    voter_discord_id: userInfo.data?.username,
                    listType: listType,
                    round,
                    match,
                    winningSubmission: trueWinner,
                    losingSubmission: trueLoser,
                },
            ]);

            if (error) {
                console.error("Error inserting data:", error);
                res.status(500).json({ error: "Error recording vote" });
                return;
            }

            const nextMatch = await _getNextMatch(listType, userInfo.data!.username);

            if (!nextMatch) {
                res.status(201).json({ message: "No more matches available" });
                return;
            }

            res.status(201).json({ message: "Next match ready", match: nextMatch });
            return;
        }
    } catch (err) {
        logAxiosError(err, "Error getting next match");
        res.status(500).json({ error: "Error getting next match" });
        return;
    }
};

export { getNextMatch, postVote };

/*
let currentVotes = [...previousVotes]; // Start with the known history

// Get the next match
const nextMatch = getNextMatch(bestDungeonsPicksBracket, currentVotes);

if (nextMatch) {
    console.log(`Next Match (Round ${nextMatch.round}, Match ${nextMatch.match}):`);
    const pickA = findPickById(nextMatch.submissionAId);
    const pickB = findPickById(nextMatch.submissionBId);
    console.log(`  Option A (ID ${nextMatch.submissionAId}): ${pickA?.dungeons.join(", ")}`);
    console.log(`  Option B (ID ${nextMatch.submissionBId}): ${pickB?.dungeons.join(", ")}`);

    // --- Simulate User Voting ---
    // Let's say user votes for Option A (ID: nextMatch.submissionAId)
    const winnerId = nextMatch.submissionAId;
    const loserId = nextMatch.submissionBId;

    // Record the vote
    currentVotes = recordVote(currentVotes, nextMatch.round, nextMatch.match, winnerId, loserId);
    console.log("\nVote recorded. Updated vote history:", currentVotes);

    // Get the *next* match after recording the vote
    const afterVoteMatch = getNextMatch(bestDungeonsPicksBracket, currentVotes);
    if (afterVoteMatch) {
        console.log(
            `\nNext match after vote (Round ${afterVoteMatch.round}, Match ${afterVoteMatch.match}): ID ${afterVoteMatch.submissionAId} vs ID ${afterVoteMatch.submissionBId}`
        );
    } else {
        console.log("\nTournament finished after that vote!");
    }
} else {
    console.log("Tournament is already finished!");
    // You might want to find the overall winner here by checking the last vote
    if (currentVotes.length > 0) {
        const lastVote = currentVotes.reduce(
            (latest, vote) => (vote.round > latest.round ? vote : latest),
            currentVotes[0]
        );
        // Find the highest round number
        const maxRound = Math.max(...currentVotes.map((v) => v.round));
        const finalVotes = currentVotes.filter((v) => v.round === maxRound);
        if (finalVotes.length === 1) {
            console.log(`Overall Winner ID: ${finalVotes[0].winningSubmissionId}`);
        } else {
            console.log("Could not determine single winner from votes.");
        }
    }
}
    */
