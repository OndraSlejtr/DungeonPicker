import React, { useState, useEffect, useCallback } from "react";
import {
    TournamentBracket,
    TournamentMatch,
    TournamentRound,
    DungeonList,
    generateMockTournamentBracket,
    getDungeonsByIds,
} from "../../data/tournament";
import VotingPanel from "./components/VotingPanel";
import styles from "./DungeonVoter.module.css";
import Spinner from "../../components/Spinner"; // Assuming Spinner exists
import DungeonItem from "../../components/dungeon/DungeonItem";
import DungeonsList from "../../components/dungeon/DungeonsList";

type VotingState = "idle" | "voted" | "loadingNext" | "finished";

const DungeonVoter: React.FC = () => {
    const [bracket, setBracket] = useState<TournamentBracket | null>(null);
    const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
    const [votingState, setVotingState] = useState<VotingState>("idle");
    const [votedList, setVotedList] = useState<DungeonList | null>(null); // Track which list was clicked

    useEffect(() => {
        // Generate mock data on mount
        // TODO: Replace with fetching actual bracket data from backend
        setBracket(generateMockTournamentBracket(16)); // e.g., start with 16 lists
        setCurrentRoundIndex(0);
        setCurrentMatchIndex(0);
        setVotingState("idle");
    }, []);

    const currentRound: TournamentRound | undefined = bracket?.rounds[currentRoundIndex];
    const currentMatch: TournamentMatch | undefined = currentRound?.matches[currentMatchIndex];

    const advanceToNext = useCallback(() => {
        if (!bracket) return;

        setVotingState("loadingNext"); // Show loading indicator

        setTimeout(() => {
            let nextMatchIndex = currentMatchIndex + 1;
            let nextRoundIndex = currentRoundIndex;

            if (nextMatchIndex >= bracket.rounds[currentRoundIndex].matches.length) {
                // Move to the next round
                nextRoundIndex++;
                nextMatchIndex = 0;

                if (nextRoundIndex >= bracket.rounds.length) {
                    // Tournament finished
                    setVotingState("finished");
                    return; // Stop advancement
                }

                // TODO: In a real scenario, update the next round's matches
                // based on winners from the current round before proceeding.
                // For mock data, we just move indices.
            }

            setCurrentMatchIndex(nextMatchIndex);
            setCurrentRoundIndex(nextRoundIndex);
            setVotedList(null); // Reset voted list indicator
            setVotingState("idle"); // Ready for the next vote
        }, 3000); // 3-second pause
    }, [bracket, currentRoundIndex, currentMatchIndex]);

    const handleVote = (selectedList: DungeonList) => {
        if (votingState !== "idle" || !currentMatch) return;

        console.log(`Voted for list in Round ${currentRoundIndex}, Match ${currentMatchIndex}`);
        // TODO: Send vote to backend

        // Update the match winner in the local state (for display/mock progression)
        // This mutation is okay for local state management here
        currentMatch.winner = selectedList;
        setVotedList(selectedList); // Set which list was voted for styling
        setVotingState("voted"); // Indicate vote happened

        // Advance to the next match/round after a delay
        advanceToNext();
    };

    if (!bracket || !currentMatch) {
        return <Spinner />; // Show loading spinner while bracket generates/loads
    }

    if (votingState === "finished") {
        // Find the winner of the final match
        const finalRound = bracket.rounds[bracket.rounds.length - 1];
        const finalWinnerList = finalRound?.matches[0]?.winner; // Assuming final round has one match
        const winnerDungeons = finalWinnerList ? getDungeonsByIds(finalWinnerList) : [];

        return (
            <div className={`${styles.container} ${styles.tournamentWinner}`}>
                <h2>Tournament Complete!</h2>
                <h3>Winner:</h3>
                {winnerDungeons.length > 0 ? (
                    <div className={styles.votingPanel}>
                        <DungeonsList
                            dungeons={winnerDungeons}
                            renderItem={(d) => <DungeonItem key={d.id} dungeon={d} interactive={false} />}
                        />
                    </div>
                ) : (
                    <p>Winner could not be determined.</p>
                )}
            </div>
        );
    }

    // Get actual Dungeon objects for the current match
    const listADungeons = currentMatch.listA ? getDungeonsByIds(currentMatch.listA) : [];
    const listBDungeons = currentMatch.listB ? getDungeonsByIds(currentMatch.listB) : [];

    const isLoading = votingState === "loadingNext" || votingState === "voted";

    return (
        <div className={styles.container}>
            <div className={styles.roundInfo}>
                Round {currentRoundIndex + 1} - Match {currentMatchIndex + 1} / {currentRound?.matches.length ?? 0}
            </div>

            {isLoading ? (
                <div className={styles.loadingNext}>Loading next match...</div>
            ) : (
                <div className={styles.matchContainer}>
                    {
                        listADungeons.length > 0 && currentMatch.listA ? (
                            <VotingPanel
                                dungeonList={listADungeons}
                                onClick={() => handleVote(currentMatch.listA!)}
                                disabled={votingState !== "idle"}
                                isWinner={votingState === "voted" && votedList === currentMatch.listA}
                                isLoser={votingState === "voted" && votedList !== currentMatch.listA}
                            />
                        ) : (
                            <div className={styles.votingPanel}>
                                <p>Waiting for opponent...</p>
                            </div>
                        ) /* Placeholder */
                    }

                    <span className={styles.vsText}>VS</span>

                    {
                        listBDungeons.length > 0 && currentMatch.listB ? (
                            <VotingPanel
                                dungeonList={listBDungeons}
                                onClick={() => handleVote(currentMatch.listB!)}
                                disabled={votingState !== "idle"}
                                isWinner={votingState === "voted" && votedList === currentMatch.listB}
                                isLoser={votingState === "voted" && votedList !== currentMatch.listB}
                            />
                        ) : (
                            <div className={styles.votingPanel}>
                                <p>Waiting for opponent...</p>
                            </div>
                        ) /* Placeholder */
                    }
                </div>
            )}
        </div>
    );
};

export default DungeonVoter;
