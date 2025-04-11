import React, { useState } from "react";
import styles from "./DungeonPicker.module.css";
import { Dungeon, TWWDungeons } from "../data/dungeons";

function getImageUrl(name: string) {
    return new URL(`../assets/dungeons/tww/${name}.png`, import.meta.url).href;
}

const DungeonPicker = () => {
    const [selectedDungeons, setSelectedDungeons] = useState<Dungeon[]>([]);

    const handleAddDungeon = (dungeon: Dungeon) => {
        // Add dungeon to the selected list if it's not already selected
        if (!selectedDungeons.some((selected) => selected.id === dungeon.id)) {
            setSelectedDungeons((prev) => [...prev, dungeon]);
        }
    };

    const handleRemoveDungeon = (dungeonId: number) => {
        // Remove dungeon from the selected list
        setSelectedDungeons((prev) => prev.filter((dungeon) => dungeon.id !== dungeonId));
    };

    return (
        <div className={styles.container}>
            <div className={styles.selectionPanel}>
                <h2>Available Dungeons</h2>
                <ul className={styles.dungeonList}>
                    {TWWDungeons.map((dungeon) => (
                        <li key={dungeon.id} className={styles.dungeonItem} onClick={() => handleAddDungeon(dungeon)}>
                            <div
                                className={styles.dungeon}
                                style={{
                                    backgroundImage: `url(${getImageUrl(dungeon.journalId + "")})`,
                                }}
                            >
                                <span className={styles.dungeonName}>{dungeon.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.dropPanel}>
                <h2>Your Selection</h2>
                {selectedDungeons.length === 0 ? (
                    <p className={styles.placeholder}>No dungeons selected</p>
                ) : (
                    <ul className={styles.dungeonList}>
                        {selectedDungeons.map((dungeon) => (
                            <li
                                key={dungeon.id}
                                className={styles.dungeonItem}
                                onClick={() => handleRemoveDungeon(dungeon.id)}
                            >
                                <div
                                    className={styles.dungeon}
                                    style={{
                                        backgroundImage: `url(${getImageUrl(dungeon.journalId + "")})`,
                                    }}
                                >
                                    <span className={styles.dungeonName}>{dungeon.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DungeonPicker;
