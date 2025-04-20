import React, { useMemo } from "react";
import { Dungeon, getDungeonsByIds } from "../../data/dungeons";
import DungeonsList from "../../components/dungeon/DungeonsList";
import DungeonItem from "../../components/dungeon/DungeonItem";
import styles from "./DungeonBasedResults.module.css";

interface BracketPick {
    dungeons: number[];
    id: number;
    authors_discord_id: string;
}

interface ResultsProps {
    listType: "best" | "worst";
    bracketData: BracketPick[];
    scores: Record<string, number>; // Scores keyed by pick ID (which is a dungeon ID)
}

interface ScoredDungeon {
    dungeon: Dungeon;
    score: number;
}

const DungeonBasedResults: React.FC<ResultsProps> = ({ listType, bracketData, scores }) => {
    const scoredDungeons = useMemo(() => {
        const dungeonScores = new Map<number, number>();

        // Calculate cumulative scores for each dungeon
        bracketData.forEach((pick) => {
            const pickScore = scores[pick.id.toString()]; // Get score for the winning dungeon of this pick
            if (pickScore !== undefined) {
                pick.dungeons.forEach((dungeonId) => {
                    dungeonScores.set(dungeonId, (dungeonScores.get(dungeonId) || 0) + pickScore);
                });
            }
        });

        // Get full dungeon objects for the scored dungeons
        const dungeonIds = Array.from(dungeonScores.keys());
        const dungeons = getDungeonsByIds(dungeonIds);

        // Combine dungeon objects with their scores
        const combined: ScoredDungeon[] = dungeons
            .map((dungeon) => ({
                dungeon,
                score: dungeonScores.get(dungeon.id) || 0,
            }))
            // Sort by score descending
            .sort((a, b) => b.score - a.score);

        return combined;
    }, [bracketData, scores]);

    return (
        <div className={styles.resultsContainer}>
            <h2 className={`${styles.resultsTitle} ${listType === "best" ? styles.best : styles.worst}`}>
                {listType === "best" ? "Best Dungeons" : "Worst Dungeons"}
            </h2>
            <DungeonsList
                dungeons={scoredDungeons.map((sd) => sd.dungeon)} // Pass only dungeons to DungeonsList
                renderItem={(dungeon) => {
                    // Find the score for the current dungeon being rendered
                    const scoredDungeon = scoredDungeons.find((sd) => sd.dungeon.id === dungeon.id);
                    return (
                        <DungeonItem
                            key={dungeon.id}
                            dungeon={dungeon}
                            score={scoredDungeon?.score} // Pass the score to DungeonItem
                            interactive={false} // Items in results list are not interactive
                        />
                    );
                }}
                placeholder={<p>No results to display.</p>}
            />
        </div>
    );
};

export default DungeonBasedResults;
