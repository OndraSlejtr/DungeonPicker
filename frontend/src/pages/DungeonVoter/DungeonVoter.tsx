import { useState, useEffect, useCallback } from "react";

import VotingPanel from "./components/VotingPanel";
import styles from "./DungeonVoter.module.css";
import { Dungeon, getDungeonsByIds } from "../../data/dungeons";
import Confirmed from "../../components/Confirmed";
import axios, { AxiosResponse } from "axios";
import Spinner from "../../components/Spinner";

type VotingState = "idle" | "voted" | "loadingNext" | "finished" | "error";

type ListType = "best" | "worst";

interface DungeonPick {
    dungeons: number[];
    id: number;
}

export interface NextMatchInfo {
    round: number;
    match: number;
    submissionA: DungeonPick;
    submissionB: DungeonPick;
}

const DungeonVoter = (props: { listType: ListType; setCompletedStatus: (status: boolean) => void }) => {
    const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
    const [votingState, setVotingState] = useState<VotingState>("idle");

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [dungeonsA, setDungeonsA] = useState<Dungeon[]>([]);
    const [dungeonsB, setDungeonsB] = useState<Dungeon[]>([]);
    const [dungeonsAId, setDungeonsAId] = useState<number>(0);
    const [dungeonsBId, setDungeonsBId] = useState<number>(0);

    const [winningList, setWinningList] = useState<"A" | "B" | null>(null);

    const { listType, setCompletedStatus } = props;

    const roundNames = ["Round of 32", "Round of 16", "Quarterfinals", "Semifinals", "Grandfinals"];

    const handleNextRoundInfo = useCallback(
        (response: AxiosResponse) => {
            if (response.status === 200 || response.status === 201) {
                const { match: matchData, message } = response.data;

                if (message === "No more matches available") {
                    setVotingState("finished");
                    setCompletedStatus(true);
                    return;
                }

                const { match, round, submissionA, submissionB }: NextMatchInfo = matchData;

                setCurrentMatchIndex(match);
                setCurrentRoundIndex(round);

                setDungeonsA(getDungeonsByIds(submissionA.dungeons));
                setDungeonsB(getDungeonsByIds(submissionB.dungeons));
                setDungeonsAId(submissionA.id);
                setDungeonsBId(submissionB.id);
            } else {
                setVotingState("error");
                console.error("Error fetching next round:", response.data);
            }
        },
        [setCompletedStatus]
    );

    const advanceToNext = (response: AxiosResponse) => {
        setVotingState("loadingNext");
        handleNextRoundInfo(response);

        setTimeout(() => {
            setWinningList(null);
            setVotingState((votingState) => {
                if (votingState !== "finished") return "idle";
                else return "finished";
            });
        }, 450);
    };

    const handleVote = (_selectedList: Dungeon[], side: "A" | "B") => {
        if (votingState !== "idle") return;

        const sendVote = async () => {
            const response = await axios.post(
                `/api/tournament/vote/${listType}`,
                {
                    round: currentRoundIndex,
                    match: currentMatchIndex,
                    winner: side,
                    winnerId: dungeonsAId,
                    loserId: dungeonsBId,
                },
                { withCredentials: true }
            );

            if (response.status !== 201) {
                console.error("Error sending vote:", response.data);
                setVotingState("error");
                return;
            }

            setVotingState("voted");
            setWinningList(side);

            setTimeout(() => {
                advanceToNext(response);
            }, 1500);
        };
        sendVote();
    };

    useEffect(() => {
        const fetchNextRound = async () => {
            const response = await axios.get(`/api/tournament/next-match/${listType}`, { withCredentials: true });
            setIsLoading(false);
            handleNextRoundInfo(response);
        };

        fetchNextRound();
    }, [listType, handleNextRoundInfo]);

    // const targetDate = new Date("2025-04-18T16:00:00");

    // const now = new Date();
    // const difference = targetDate.getTime() - now.getTime();

    // if (difference > 0) {
    //     return <VotingClosed />;
    // }

    if (isLoading) {
        return <Spinner />;
    }

    let animationClass = "";

    if (votingState === "voted") {
        animationClass = styles.contentFadeOut;
    } else if (votingState === "loadingNext") {
        animationClass = styles.contentSlideIn;
    }

    return (
        <div className={styles.container}>
            {/* <div className={styles.roundInfo}>
                <h1>{listType === "best" ? "😲 Pick BEST dungeons" : "💀 Pick WORST dungeons "}</h1> 
                {votingState !== "finished" && (
                    <></>
                )}
            </div> */}

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
                        <div className={styles.vsText}>
                            <p className={styles.roundInfo}>
                                {roundNames[currentRoundIndex]}
                                <br />
                                Match {currentMatchIndex + 1}
                            </p>
                            <div>VS</div>
                        </div>
                        <VotingPanel
                            dungeonList={dungeonsB}
                            onClick={() => handleVote(dungeonsB, "B")}
                            disabled={votingState !== "idle"}
                        />
                    </div>
                )}

                {votingState === "finished" && (
                    <div className={styles.finishedContainer}>
                        <h1 className={styles.finishedText}>You finished this part of tournament!</h1>
                        <p className={styles.finishedText}>
                            Make sure you vote on other half above! The results will be announced soon.
                        </p>
                    </div>
                )}

                {votingState === "error" && <h1>Error occured, try reloading or ask Cynique WTF is up</h1>}
            </div>
        </div>
    );
};

export default DungeonVoter;
