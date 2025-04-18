import React, { useState, useEffect, useCallback } from "react";

import VotingPanel from "./components/VotingPanel";
import styles from "./DungeonVoter.module.css";
import { Dungeon, getDungeonsByIds } from "../../data/dungeons";
import Confirmed from "../../components/Confirmed";

type VotingState = "idle" | "voted" | "loadingNext" | "finished";

const DungeonVoter: React.FC = () => {
    // const [bracket, setBracket] = useState<TournamentBracket | null>(null);
    const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
    const [maxMatchIndex, setMaxMatchIndex] = useState<number>(7);
    const [votingState, setVotingState] = useState<VotingState>("idle");

    const [dungeonsA, setDungeonsA] = useState<Dungeon[]>([]); // Track dungeons for list A
    const [dungeonsB, setDungeonsB] = useState<Dungeon[]>([]); // Track dungeons for list B

    const [winningList, setWinningList] = useState<"A" | "B" | null>(null); // Track the winning list

    // const listADungeons = votingState === "idle" && currentMatch?.listA ? getDungeonsByIds(currentMatch.listA) : [];
    // const listBDungeons = votingState === "idle" && currentMatch?.listB ? getDungeonsByIds(currentMatch.listB) : [];

    useEffect(() => {
        // Generate mock data on mount
        // TODO: Replace with fetching actual bracket data from backend
        setCurrentRoundIndex(0);
        setCurrentMatchIndex(0);
        setVotingState("idle");
        setDungeonsA(getDungeonsByIds([1, 2, 3, 4, 5, 6, 7, 8]));
        setDungeonsB(getDungeonsByIds([29, 30, 31, 32, 33, 34, 35, 36]));
    }, []);

    // const currentRound: TournamentRound | undefined = bracket?.rounds[currentRoundIndex];
    // const currentMatch: TournamentMatch | undefined = currentRound?.matches[currentMatchIndex];

    const advanceToNext = useCallback(() => {
        setTimeout(() => {
            // let nextMatchIndex = currentMatchIndex + 1;
            // let nextRoundIndex = currentRoundIndex;

            // if (nextMatchIndex >= bracket.rounds[currentRoundIndex].matches.length) {
            //     // Move to the next round
            //     nextRoundIndex++;
            //     nextMatchIndex = 0;

            //     if (nextRoundIndex >= bracket.rounds.length) {
            //         // Tournament finished
            //         setVotingState("finished");
            //         return; // Stop advancement
            //     }
            // }

            // setCurrentMatchIndex(nextMatchIndex);
            // setCurrentRoundIndex(nextRoundIndex);
            // setVotedList(null); // Reset voted list indicator
            // setWinnerDungeonsToShow([]); // Clear winner display
            setVotingState("idle"); // Ready for the next vote
        }, 3000); // 3-second pause
    }, [currentRoundIndex, currentMatchIndex]);

    const handleVote = (selectedList: Dungeon[], side: "A" | "B") => {
        // if (votingState !== "idle" || !currentMatch) return;

        // console.log(`Voted for list in Round ${currentRoundIndex}, Match ${currentMatchIndex}`);
        // // TODO: Send vote to backend

        // Update the match winner in the local state (for display/mock progression)
        // currentMatch.winner = selectedList;
        // setWinnerDungeonsToShow(getDungeonsByIds(selectedList)); // Prepare winner dungeons for display
        setVotingState("voted"); // Indicate vote happened
        setWinningList(side); // Set the winning list

        // Advance to the next match/round after a delay
        advanceToNext();
    };

    // if (!bracket || !currentMatch) {
    //     return <Spinner />; // Show loading spinner while bracket generates/loads
    // }

    // if (votingState === "finished") {
    //     // Find the winner of the final match
    //     const finalRound = bracket.rounds[bracket.rounds.length - 1];
    //     const finalWinnerList = finalRound?.matches[0]?.winner; // Assuming final round has one match
    //     const winnerDungeons = finalWinnerList ? getDungeonsByIds(finalWinnerList) : [];

    //     return (
    //         <div className={`${styles.container} ${styles.tournamentWinner}`}>
    //             <h2>Tournament Complete!</h2>
    //             <h3>Winner:</h3>
    //             {winnerDungeons.length > 0 ? (
    //                 <div className={styles.votingPanel}>
    //                     <DungeonsList
    //                         dungeons={winnerDungeons}
    //                         renderItem={(d) => <DungeonItem key={d.id} dungeon={d} interactive={false} />}
    //                     />
    //                 </div>
    //             ) : (
    //                 <p>Winner could not be determined.</p>
    //             )}
    //         </div>
    //     );
    // }

    // Get actual Dungeon objects for the current match

    return (
        <div className={styles.container}>
            <div className={styles.roundInfo}>
                Round {currentRoundIndex + 1} - Match {currentMatchIndex + 1} / {maxMatchIndex + 1}
            </div>

            {votingState === "voted" && (
                <div className={`${styles.matchContainer} `}>
                    <VotingPanel
                        dungeonList={dungeonsA}
                        onClick={() => {}}
                        disabled={true}
                        isWinner={winningList === "A"}
                    />
                    <span className={styles.vsText}>
                        <Confirmed />
                    </span>
                    <VotingPanel
                        dungeonList={dungeonsB}
                        onClick={() => {}}
                        disabled={true}
                        isWinner={winningList === "B"}
                    />
                </div>
            )}

            {votingState === "idle" && (
                <div className={styles.matchContainer}>
                    <VotingPanel dungeonList={dungeonsA} onClick={() => handleVote(dungeonsA, "A")} disabled={false} />
                    <span className={styles.vsText}>VS</span>
                    <VotingPanel dungeonList={dungeonsB} onClick={() => handleVote(dungeonsB, "B")} disabled={false} />
                </div>
            )}
        </div>
    );
};

export default DungeonVoter;
