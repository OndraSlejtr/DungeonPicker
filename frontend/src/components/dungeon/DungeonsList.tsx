import { ReactNode } from "react";
import { Dungeon } from "../../data/dungeons";
import styles from "./DungeonsList.module.css"; // Use the new CSS module

interface DungeonsListProps {
    dungeons: Dungeon[];
    renderItem: (dungeon: Dungeon, identical?: boolean) => ReactNode;
    placeholder?: ReactNode; // Optional placeholder when the list is empty
    sameCount?: number; // Number of identical dungeons to highlight
}

const DungeonsList = ({ dungeons, renderItem, placeholder, sameCount }: DungeonsListProps) => {
    if (dungeons.length === 0 && placeholder) {
        return <>{placeholder}</>;
    }

    return (
        <ul className={styles.dungeonList}>
            {dungeons.map((dungeon, index) => renderItem(dungeon, sameCount !== undefined && index >= 8 - sameCount))}
        </ul>
    );
};

export default DungeonsList;
