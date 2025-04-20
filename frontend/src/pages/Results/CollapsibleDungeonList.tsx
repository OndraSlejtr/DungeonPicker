import { useState, ReactNode } from "react";
import { Dungeon } from "../../data/dungeons";
import DungeonsList from "../../components/dungeon/DungeonsList";
import styles from "./CollapsibleDungeonList.module.css";

interface CollapsibleDungeonListProps {
    placement: number;
    points: number;
    author: string;
    dungeons: Dungeon[];
    renderItem: (dungeon: Dungeon) => ReactNode;
}

const CollapsibleDungeonList = ({ placement, points, author, dungeons, renderItem }: CollapsibleDungeonListProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const getPlacementSuffix = (placement: number) => {
        if (placement % 10 === 1 && placement % 100 !== 11) return "st";
        if (placement % 10 === 2 && placement % 100 !== 12) return "nd";
        if (placement % 10 === 3 && placement % 100 !== 13) return "rd";
        return "th";
    };

    return (
        <div className={styles.collapsibleContainer}>
            <div className={styles.header} onClick={toggleExpand}>
                <span className={styles.placement}>
                    {placement}
                    {getPlacementSuffix(placement)}
                </span>
                <span className={styles.author}>{author}</span>
                <span className={styles.points}>({points} points)</span>
                <span className={`${styles.icon} ${isExpanded ? styles.expanded : ""}`}>{isExpanded ? "−" : "+"}</span>
            </div>
            {isExpanded && (
                <div className={styles.content}>
                    <DungeonsList dungeons={dungeons} renderItem={renderItem} />
                </div>
            )}
        </div>
    );
};

export default CollapsibleDungeonList;
