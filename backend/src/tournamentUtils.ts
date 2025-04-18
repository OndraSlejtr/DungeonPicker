import { bestDungeonsPicksBracket as initialPicks } from "./brackets.js"; // Assuming brackets.ts exports this

export interface DungeonPick {
    dungeons: number[];
    id: number;
}

export interface Vote {
    round: number;
    match: number; // Index of the match within its round
    winningSubmissionId: number;
    losingSubmissionId: number;
}

export interface Matchup {
    round: number;
    match: number;
    submissionAId: number | null;
    submissionBId: number | null;
}

export interface NextMatchInfo {
    round: number;
    match: number;
    submissionAId: number;
    submissionBId: number;
}

// Helper to find a pick by ID
export const findPickById = (id: number | null): DungeonPick | undefined => {
    if (id === null) return undefined;
    return initialPicks.find((p) => p.id === id);
};

// Helper to check if a vote exists for a specific match
const findVoteForMatch = (
    votes: Vote[],
    round: number,
    submissionAId: number | null,
    submissionBId: number | null
): Vote | undefined => {
    if (submissionAId === null || submissionBId === null) return undefined; // Cannot have a vote for a bye

    return votes.find(
        (v) =>
            v.round === round &&
            ((v.winningSubmissionId === submissionAId && v.losingSubmissionId === submissionBId) ||
                (v.winningSubmissionId === submissionBId && v.losingSubmissionId === submissionAId))
    );
};

/**
 * Determines the participants for a given round based on previous rounds' results.
 * @param round - The round index (0-based).
 * @param allPicks - The initial list of all dungeon picks.
 * @param votes - The history of votes cast so far.
 * @returns An array of submission IDs participating in this round.
 */
const getParticipantsForRound = (round: number, allPicks: DungeonPick[], votes: Vote[]): (number | null)[] => {
    if (round === 0) {
        return allPicks.map((p) => p.id);
    }

    const previousRound = round - 1;
    const previousRoundParticipants = getParticipantsForRound(previousRound, allPicks, votes);

    // Determine matchups for the previous round to find winners
    const { matchups: previousMatchups, byes: previousByes } = generateMatchupsForRound(
        previousRoundParticipants,
        previousRound
    );

    const winners: (number | null)[] = previousMatchups.map((match) => {
        if (match.submissionAId === null) return match.submissionBId; // B got a bye
        if (match.submissionBId === null) return match.submissionAId; // A got a bye

        const vote = findVoteForMatch(votes, previousRound, match.submissionAId, match.submissionBId);
        // If a vote hasn't happened yet for the previous round, we can't determine the winner for *this* round yet.
        // This scenario is handled by getNextMatch checking votes round by round.
        // For participant calculation, assume the vote *should* exist if we're calculating for the *next* round.
        return vote ? vote.winningSubmissionId : null; // Return null if vote missing (shouldn't happen in ideal flow)
    });

    // Combine winners and byes from the previous round
    return [...winners, ...previousByes].filter((id) => id !== null); // Filter out nulls just in case
};

/**
 * Generates the matchups for a given list of participants in a specific round.
 * Handles byes automatically if the number of participants is not a power of 2.
 * @param participantIds - Array of submission IDs for the round.
 * @param round - The round index (0-based).
 * @returns Object containing matchups and IDs of participants who received a bye.
 */
const generateMatchupsForRound = (
    participantIds: (number | null)[],
    round: number
): { matchups: Matchup[]; byes: number[] } => {
    const numParticipants = participantIds.length;
    const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(numParticipants)));
    const numByes = nextPowerOf2 - numParticipants;
    const numMatches = (numParticipants - numByes) / 2;

    const matchups: Matchup[] = [];
    const participantsWithByes: number[] = [];
    const participantsToMatch = [...participantIds]; // Copy to avoid modifying original

    // Assign byes to the last participants
    for (let i = 0; i < numByes; i++) {
        const byeParticipantId = participantsToMatch.pop(); // Take from the end
        if (byeParticipantId !== null && byeParticipantId !== undefined) {
            participantsWithByes.push(byeParticipantId);
        }
    }

    // Create matches for the remaining participants
    let matchIndex = 0;
    for (let i = 0; i < numMatches * 2; i += 2) {
        matchups.push({
            round: round,
            match: matchIndex,
            submissionAId: participantsToMatch[i] ?? null,
            submissionBId: participantsToMatch[i + 1] ?? null,
        });
        matchIndex++;
    }

    // Byes advance automatically, represented here by returning their IDs
    // They will be paired in the *next* round's matchup generation
    return { matchups, byes: participantsWithByes.reverse() }; // Reverse to maintain original relative order if needed
};

/**
 * Determines the next match that needs a vote.
 * @param allPicks - The initial list of all dungeon picks.
 * @param votes - The history of votes cast so far.
 * @returns Information about the next match or null if the tournament is finished.
 */
export const getNextMatch = (allPicks: DungeonPick[], votes: Vote[]): NextMatchInfo | null => {
    let round = 0;
    const maxPossibleRounds = Math.ceil(Math.log2(allPicks.length)); // Estimate max rounds

    while (true) {
        const participants = getParticipantsForRound(round, allPicks, votes);
        if (participants.length <= 1 && round > 0) {
            // Tournament likely finished in the previous round
            // Check if the final vote exists
            const finalParticipants = getParticipantsForRound(round - 1, allPicks, votes);
            if (finalParticipants.length === 2) {
                const finalVote = findVoteForMatch(votes, round - 1, finalParticipants[0], finalParticipants[1]);
                if (finalVote) return null; // Final vote cast, tournament finished
                // If final vote not cast, something is wrong, but technically no *next* match
            }
            return null; // Only one or zero participants left
        }
        if (participants.length === 0 && round === 0) {
            return null; // No participants initially
        }

        const { matchups } = generateMatchupsForRound(participants, round);

        if (matchups.length === 0 && participants.length === 1) {
            // Only one participant left, they are the winner
            return null;
        }

        let allMatchesVotedInRound = true;
        for (const match of matchups) {
            // Check if a vote exists for this specific match
            const vote = findVoteForMatch(votes, match.round, match.submissionAId, match.submissionBId);

            if (!vote) {
                // Found the next match to vote on
                allMatchesVotedInRound = false;
                // Ensure it's a valid match (not two nulls)
                if (match.submissionAId !== null && match.submissionBId !== null) {
                    console.log(participants);

                    return {
                        round: match.round,
                        match: match.match,
                        submissionAId: match.submissionAId,
                        submissionBId: match.submissionBId,
                    };
                }
                // If one is null, it's effectively a bye advancing, continue searching
            }
        }

        if (allMatchesVotedInRound) {
            round++; // Move to the next round
            if (round > maxPossibleRounds + 1) {
                // Add buffer for safety
                console.error("Exceeded maximum expected rounds, stopping.");
                return null; // Safety break
            }
        } else {
            // If we finished the loop but didn't find a match without a vote,
            // and not all matches were voted (e.g., only byes left),
            // something might be off, or we need to advance round.
            // Let's advance the round if no votable match was found.
            round++;
            if (round > maxPossibleRounds + 1) {
                console.error("Exceeded maximum expected rounds after checking byes, stopping.");
                return null;
            }
        }
    }
};

/**
 * Records a vote result.
 * @param votes - The current array of votes.
 * @param round - The round index of the match.
 * @param matchIndex - The index of the match within the round.
 * @param winningSubmissionId - The ID of the winning submission.
 * @param losingSubmissionId - The ID of the losing submission.
 * @returns A new array containing all previous votes plus the new one.
 */
export const recordVote = (
    votes: Vote[],
    round: number,
    match: number,
    winningSubmissionId: number,
    losingSubmissionId: number
): Vote[] => {
    const newVote: Vote = {
        round,
        match,
        winningSubmissionId,
        losingSubmissionId,
    };

    // Avoid adding duplicate votes for the same match
    const existingVote = votes.find(
        (v) =>
            v.round === round &&
            ((v.winningSubmissionId === winningSubmissionId && v.losingSubmissionId === losingSubmissionId) ||
                (v.winningSubmissionId === losingSubmissionId && v.losingSubmissionId === winningSubmissionId))
    );

    if (existingVote) {
        console.warn(
            `Vote for round ${round}, match involving ${winningSubmissionId}/${losingSubmissionId} already exists. Not adding duplicate.`
        );
        return votes; // Return original array if vote already exists
    }

    return [...votes, newVote];
};

// Example Usage (assuming you have 'previousVotes' and 'bestDungeonsPicksBracket' available)
