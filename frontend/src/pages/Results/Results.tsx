import { useState, useEffect } from "react";
import { Dungeon, getDungeonsByIds } from "../../data/dungeons";
import { bestDungeonsPicksBracket, worstDungeonsPicksBracket } from "../../data/brackets"; // Assuming you might want to switch between best/worst
import { best as bestResults, worst as worstResults } from "../../data/result"; // Assuming result.ts exports 'best' and 'worst'
import DungeonsList from "../../components/dungeon/DungeonsList";
import DungeonItem from "../../components/dungeon/DungeonItem";
import CollapsibleDungeonList from "./CollapsibleDungeonList";
import styles from "./Results.module.css";
import Spinner from "../../components/Spinner";

interface DungeonPickResult {
    id: number;
    dungeons: Dungeon[];
    authors_discord_id: string;
    points: number;
    placement: number;
}

const Results = ({ listType }: { listType: "best" | "worst" }) => {
    const [results, setResults] = useState<DungeonPickResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadResults = () => {
            setIsLoading(true);
            const bracketData = listType === "best" ? bestDungeonsPicksBracket : worstDungeonsPicksBracket;
            const pointsData = listType === "best" ? bestResults : worstResults;

            const processedResults = bracketData
                .map((pick) => {
                    const points = pointsData[pick.id.toString() as keyof typeof pointsData] || 0;
                    const dungeons = getDungeonsByIds(pick.dungeons);
                    return {
                        ...pick,
                        dungeons,
                        points,
                    };
                })
                .sort((a, b) => b.points - a.points) // Sort by points descending
                .map((pick, index) => ({
                    ...pick,
                    placement: index + 1, // Assign placement
                }));

            setResults(processedResults);
            setIsLoading(false);
        };

        loadResults();
    }, [listType]);

    const renderDungeonItem = (dungeon: Dungeon) => (
        <DungeonItem key={dungeon.id} dungeon={dungeon} interactive={false} />
    );

    if (isLoading) {
        return <Spinner />;
    }

    const topThree = results.slice(0, 3);
    const rest = results.slice(3);

    const getPlacementSuffix = (placement: number) => {
        if (placement === 1) return "st";
        if (placement === 2) return "nd";
        if (placement === 3) return "rd";
        return "th";
    };

    const getPlacementClass = (placement: number) => {
        if (placement === 1) return styles.firstPlace;
        if (placement === 2) return styles.secondPlace;
        if (placement === 3) return styles.thirdPlace;
        return "";
    };

    const getReward = (placement: number) => {
        if (placement === 1) return "200k";
        if (placement === 2) return "100k";
        if (placement === 3) return "50k";
        return "";
    };

    return (
        <div className={styles.resultsContainer}>
            <h1>{listType === "best" ? "Best Dungeon List Results" : "Worst Dungeon List Results"}</h1>

            <div className={styles.topThreeContainer}>
                {topThree.map((result) => (
                    <div key={result.id} className={`${styles.resultItem} ${getPlacementClass(result.placement)}`}>
                        <h2>
                            <div className={styles.resultPlacement}>
                                {result.placement}
                                {getPlacementSuffix(result.placement)} place
                            </div>
                            <div className={styles.resultTopHeader}>
                                <strong>{result.authors_discord_id}</strong>
                            </div>
                            {getReward(result.placement)} reward ({result.points} pts)
                        </h2>
                        <DungeonsList dungeons={result.dungeons} renderItem={renderDungeonItem} />
                    </div>
                ))}
            </div>

            {rest.length > 0 && (
                <div className={styles.restContainer}>
                    <h3>Other Submissions</h3>
                    {rest.map((result) => (
                        <CollapsibleDungeonList
                            key={result.id}
                            placement={result.placement}
                            points={result.points}
                            author={result.authors_discord_id}
                            dungeons={result.dungeons}
                            renderItem={renderDungeonItem}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Results;
