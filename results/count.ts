import * as fs from 'fs';
import * as path from 'path';

// Define the structure for a vote record
interface Vote {
    round: number;
    winner: number;
    loser: number;
}

// Target submission IDs
const bestTargetSubmissionsList: number[] = [
    86, 115, 61, 114, 52, 120, 111,
    109, 72, 68, 107, 118, 121, 91,
    123, 47, 98, 105, 94, 65, 45,
    101
];

const worstTargetSubmissionsList: number[] = [
    53, 116, 119,  93, 108, 117, 124,
    89, 113,  70,  99, 126,  46,  87,
   110, 122, 127, 104,  51,  96,  62,
   112,  79
 ];
const targetSubmissionsSet: Set<number> = new Set(worstTargetSubmissionsList);

// Initialize scores map
const scores: Map<number, number> = new Map();
targetSubmissionsSet.forEach(subId => {
    scores.set(subId, 0);
});

// File path (adjust if necessary)
// Assuming the script runs relative to a project structure where the CSV is accessible
// Or provide the full absolute path as in the Python example
const filePath = path.join('DungeonVotes_rows.csv'); // Use path.join for cross-platform compatibility

const bestVotes: Vote[] = [];
const round1Winners: Set<number> = new Set();
const round1Losers: Set<number> = new Set();

try {
    // Read the CSV file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    // Skip header row (start from index 1)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines

        const columns = line.split(',');

        try {
            // Ensure row has enough columns (id, created_at, round, match, listType, voter_discord_id, winningSubmission, losingSubmission)
            if (columns.length < 8) {
                console.warn(`Skipping row due to insufficient columns: ${line}`);
                continue;
            }

            const listType = columns[4];
            const roundNum = parseInt(columns[2], 10);
            const winner = parseInt(columns[6], 10);
            const loser = parseInt(columns[7], 10);

            // Check for parsing errors
            if (isNaN(roundNum) || isNaN(winner) || isNaN(loser)) {
                 console.warn(`Skipping row due to parsing error: ${line}`);
                 continue;
            }

            // 1. Select only inputs with listType=best
            if (listType === 'worst') {
                bestVotes.push({
                    round: roundNum,
                    winner: winner,
                    loser: loser
                });

                // Identify round 1 participants for step 2
                if (roundNum === 0) {
                    if (targetSubmissionsSet.has(winner)) {
                        round1Winners.add(winner);
                    }
                    if (targetSubmissionsSet.has(loser)) {
                        round1Losers.add(loser);
                    }
                }
            }
        } catch (parseError) {
            console.error(`Error parsing line: ${line} - ${parseError}`);
            continue;
        }
    }

    // 2. Find submissions not present in round 1 and give 0.5 points
    const round1Participants: Set<number> = new Set([...round1Winners, ...round1Losers]);
    targetSubmissionsSet.forEach(subId => {
        if (!round1Participants.has(subId)) {
            scores.set(subId, (scores.get(subId) || 0) + 0.5);
        }
    });

    // console.log(targetSubmissionsSet);
    // console.log(bestVotes);

    // 3. Give points based on winning round
    bestVotes.forEach(vote => {
        if (scores.has(vote.winner)) {
            if(vote.winner === 109) console.log(vote)
            scores.set(vote.winner, (scores.get(vote.winner) || 0) + vote.round + 1);
        }
    });

    // Print the final scores map
    // Convert Map to a plain object for easier viewing if needed, or log the map directly
    const scoresObject = Object.fromEntries(scores);
    console.log(scoresObject);
    // Or: console.log(scores);


} catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error(`Error: File not found at ${filePath}`);
    } else {
        console.error(`An unexpected error occurred: ${error}`);
    }
}

// To run this:
// 1. Make sure you have Node.js installed.
// 2. Save the code as a .ts file (e.g., calculate_scores.ts).
// 3. Install TypeScript if you haven't: npm install -g typescript
// 4. Install Node types: npm install --save-dev @types/node
// 5. Compile the TypeScript to JavaScript: tsc calculate_scores.ts
// 6. Run the JavaScript file: node calculate_scores.js
