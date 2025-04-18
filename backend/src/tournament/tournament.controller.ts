const getNextMatch = (req, res) => {
    res.status(200).json([]);
    return;
};

const postVote = (req, res) => {
    const { round, match, winnerId, loserId } = req.body;
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
