import React from "react";
import styles from "./DungeonItem.module.css"; // Updated import path
import { Dungeon } from "../../data/dungeons";

interface DungeonItemProps {
    dungeon: Dungeon;
    selected?: boolean;
    disabled?: boolean;
    interactive?: boolean;
    onClick?: () => void;
}

const DungeonItem: React.FC<DungeonItemProps> = ({ dungeon, selected, disabled, interactive = true, onClick }) => {
    const getImageUrl = (name: string, expansion: string) =>
        new URL(`../../assets/dungeons/${expansion}/${name}.png`, import.meta.url).href;

    return (
        <li
            className={`${styles.dungeonItem} ${selected ? styles.selected : ""} ${disabled ? styles.disabled : ""} ${
                !interactive ? styles.nonInteractive : ""
            }`}
            onClick={() => interactive && !selected && !disabled && onClick?.()}
        >
            <div
                className={styles.dungeon}
                style={{ backgroundImage: `url(${getImageUrl(dungeon.journalId + "", dungeon.expansion.shorthand)})` }}
            >
                <span className={styles.dungeonName}>{dungeon.name}</span>
            </div>
        </li>
    );
};

export default DungeonItem;
