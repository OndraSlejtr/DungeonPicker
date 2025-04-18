import { allDungeons } from "./dungeons";

// Represents a single list submission (array of dungeon IDs)
export type DungeonList = number[];

// Represents a match between two dungeon lists
export type TournamentMatch = {
    id: number;
    listA: DungeonList | null; // Can be null if opponent advanced automatically
    listB: DungeonList | null; // Can be null if opponent advanced automatically
    winner?: DungeonList | null; // Winner of this match (null initially)
};

// Represents a round in the tournament
export type TournamentRound = {
    roundIndex: number;
    matches: TournamentMatch[];
};

// Represents the entire tournament bracket
export type TournamentBracket = {
    rounds: TournamentRound[];
};

// Helper function to get N random dungeon IDs
const getRandomDungeonIds = (count: number): number[] => {
    const shuffled = [...allDungeons].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((d) => d.id);
};

// Function to generate a mock tournament bracket
export const generateMockTournamentBracket = (numberOfLists: number = 16): TournamentBracket => {
    if (numberOfLists < 2 || (numberOfLists & (numberOfLists - 1)) !== 0) {
        console.error("Number of lists must be a power of 2 and at least 2.");
        // For simplicity, return a minimal valid bracket on error
        numberOfLists = 2;
    }

    const bracket: TournamentBracket = { rounds: [] };
    let currentLists: (DungeonList | null)[] = Array.from({ length: numberOfLists }, () => getRandomDungeonIds(8));
    let roundIndex = 0;
    let matchIdCounter = 0;

    while (currentLists.length > 1) {
        const round: TournamentRound = { roundIndex, matches: [] };
        // const nextRoundLists: (DungeonList | null)[] = [];

        for (let i = 0; i < currentLists.length; i += 2) {
            const match: TournamentMatch = {
                id: matchIdCounter++,
                listA: currentLists[i],
                listB: currentLists[i + 1] ?? null, // Handle potential odd number if logic changes
                winner: undefined, // Winner determined by voting
            };
            round.matches.push(match);
            // In a real scenario, the winner pushes to nextRoundLists after voting.
            // For mock structure, we can pre-populate winners or leave them undefined.
            // Let's leave winner undefined for now.
        }

        bracket.rounds.push(round);
        // Prepare for next round (in mock, we don't know winners yet)
        // For structure generation, assume null winners advance for now
        currentLists = Array(currentLists.length / 2).fill(null);
        roundIndex++;
    }

    // Add a final round placeholder if needed (e.g., for displaying the overall winner)
    // bracket.rounds.push({ roundIndex, matches: [] }); // Optional: Final placeholder

    return bracket;
};

// Function to get Dungeon objects from IDs
