import React, { useState, useEffect, useCallback } from "react";

import VotingPanel from "./components/VotingPanel";
import styles from "./DungeonVoter.module.css";
import { Dungeon, getDungeonsByIds } from "../../data/dungeons";
import Confirmed from "../../components/Confirmed";

type VotingState = "idle" | "voted" | "loadingNext" | "finished";

const DungeonVoter: React.FC = () => {
    const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
    const [maxMatchIndex, setMaxMatchIndex] = useState<number>(7);
    const [votingState, setVotingState] = useState<VotingState>("idle");

    const [dungeonsA, setDungeonsA] = useState<Dungeon[]>([]);
    const [dungeonsB, setDungeonsB] = useState<Dungeon[]>([]);

    const [winningList, setWinningList] = useState<"A" | "B" | null>(null);

    useEffect(() => {
        setCurrentRoundIndex(0);
        setCurrentMatchIndex(0);
        setVotingState("idle");
        setDungeonsA(getDungeonsByIds([1, 2, 3, 4, 5, 6, 7, 8]));
        setDungeonsB(getDungeonsByIds([29, 30, 31, 32, 33, 34, 35, 36]));
    }, []);

    const advanceToNext = useCallback(() => {
        setVotingState("loadingNext");

        setTimeout(() => {
            setCurrentMatchIndex((prev) => (prev + 1) % (maxMatchIndex + 1));
            setCurrentRoundIndex((prev) => {
                const nextMatchIndex = (currentMatchIndex + 1) % (maxMatchIndex + 1);
                return nextMatchIndex === 0 ? prev + 1 : prev;
            });
            setWinningList(null);
            setVotingState("idle");
        }, 450);
    }, [currentRoundIndex, currentMatchIndex, maxMatchIndex]);

    const handleVote = (selectedList: Dungeon[], side: "A" | "B") => {
        if (votingState !== "idle") return;

        setVotingState("voted");
        setWinningList(side);

        setTimeout(() => {
            advanceToNext();
        }, 2500);
    };

    let animationClass = "";

    if (votingState === "voted") {
        animationClass = styles.contentFadeOut;
    } else if (votingState === "loadingNext") {
        animationClass = styles.contentSlideIn;
    }

    return (
        <div className={styles.container}>
            <div className={styles.roundInfo}>
                Round {currentRoundIndex + 1} - Match {currentMatchIndex + 1} / {maxMatchIndex + 1}
            </div>

            <div
                key={`${currentRoundIndex}-${currentMatchIndex}`}
                className={`${styles.animatedContent} ${animationClass}`}
            >
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

                {(votingState === "idle" || votingState === "loadingNext") && (
                    <div className={styles.matchContainer}>
                        <VotingPanel
                            dungeonList={dungeonsA}
                            onClick={() => handleVote(dungeonsA, "A")}
                            disabled={votingState !== "idle"}
                        />
                        <span className={styles.vsText}>VS</span>
                        <VotingPanel
                            dungeonList={dungeonsB}
                            onClick={() => handleVote(dungeonsB, "B")}
                            disabled={votingState !== "idle"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DungeonVoter;
