import { useState } from "react";
import styles from "./DungeonPicker.module.css";
import { Dungeon, TWWDungeons, DFDungeons } from "../data/dungeons";

function getImageUrl(name: string) {
    return new URL(`../assets/dungeons/tww/${name}.png`, import.meta.url).href;
}

const MAX_SELECTION = 8; // Maximum number of dungeons that can be selected

const DungeonPicker = () => {
    const [selectedDungeons, setSelectedDungeons] = useState<Dungeon[]>([]);
    const [availableDungeons, setAvailableDungeons] = useState<Dungeon[]>(TWWDungeons); // Default to TWW dungeons

    const handleAddDungeon = (dungeon: Dungeon) => {
        if (
            selectedDungeons.length < MAX_SELECTION &&
            !selectedDungeons.some((selected) => selected.id === dungeon.id)
        ) {
            setSelectedDungeons((prev) => [...prev, dungeon]);
        }
    };

    const handleRemoveDungeon = (dungeonId: number) => {
        setSelectedDungeons((prev) => prev.filter((dungeon) => dungeon.id !== dungeonId));
    };

    const handleExpansionChange = (expansion: "TWW" | "DF") => {
        setAvailableDungeons(expansion === "TWW" ? TWWDungeons : DFDungeons);
    };

    return (
        <div className={styles.container}>
            {/* Expansion Selection Panel */}
            <div className={styles.expansionPanel}>
                <h2>Select Expansion</h2>
                <button className={styles.expansionButton} onClick={() => handleExpansionChange("TWW")}>
                    The War Within
                </button>
                <button className={styles.expansionButton} onClick={() => handleExpansionChange("DF")}>
                    Dragonflight
                </button>
            </div>

            {/* Available Dungeons Panel */}
            <div className={styles.selectionPanel}>
                <h2>Available Dungeons</h2>
                <ul className={styles.dungeonList}>
                    {availableDungeons.map((dungeon) => {
                        const isSelected = selectedDungeons.some((selected) => selected.id === dungeon.id);
                        const isDisabled = selectedDungeons.length >= MAX_SELECTION && !isSelected;

                        return (
                            <li
                                key={dungeon.id}
                                className={`${styles.dungeonItem} ${isSelected ? styles.selected : ""} ${
                                    isDisabled ? styles.disabled : ""
                                }`}
                                onClick={() => !isSelected && !isDisabled && handleAddDungeon(dungeon)}
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
                        );
                    })}
                </ul>
            </div>

            {/* Selected Dungeons Panel */}
            <div className={styles.dropPanel}>
                <h2>
                    Your Selection ({selectedDungeons.length}/{MAX_SELECTION})
                </h2>
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
