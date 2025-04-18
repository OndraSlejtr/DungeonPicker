import { ReactNode } from "react";
import { Dungeon } from "../../data/dungeons";
import styles from "./DungeonsList.module.css"; // Use the new CSS module

interface DungeonsListProps {
    dungeons: Dungeon[];
    renderItem: (dungeon: Dungeon) => ReactNode;
    placeholder?: ReactNode; // Optional placeholder when the list is empty
}

const DungeonsList = ({ dungeons, renderItem, placeholder }: DungeonsListProps) => {
    if (dungeons.length === 0 && placeholder) {
        return <>{placeholder}</>;
    }

    return <ul className={styles.dungeonList}>{dungeons.map((dungeon) => renderItem(dungeon))}</ul>;
};

export default DungeonsList;
