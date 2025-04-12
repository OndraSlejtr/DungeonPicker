import styles from "../DungeonPicker.module.css";
import { Dungeon } from "../../../data/dungeons";

interface AvailableDungeonsPanelProps {
    availableDungeons: Dungeon[];
    selectedDungeons: Dungeon[];
    maxSelection: number;
    onAddDungeon: (dungeon: Dungeon) => void;
    searchTerm: string; // New prop for the search term
}

const AvailableDungeonsPanel = ({
    availableDungeons,
    selectedDungeons,
    maxSelection,
    onAddDungeon,
    searchTerm,
}: AvailableDungeonsPanelProps) => {
    const getImageUrl = (name: string, expansion: string) => {
        return new URL(`../../../assets/dungeons/${expansion}/${name}.png`, import.meta.url).href;
    };

    return (
        <div className={styles.selectionPanel}>
            <h2>{searchTerm.trim() ? `Search: ${searchTerm}` : "Available Dungeons"}</h2>
            <ul className={styles.dungeonList}>
                {availableDungeons.map((dungeon) => {
                    const isSelected = selectedDungeons.some((selected) => selected.id === dungeon.id);
                    const isDisabled = selectedDungeons.length >= maxSelection && !isSelected;

                    return (
                        <li
                            key={dungeon.id}
                            className={`${styles.dungeonItem} ${isSelected ? styles.selected : ""} ${
                                isDisabled ? styles.disabled : ""
                            }`}
                            onClick={() => !isSelected && !isDisabled && onAddDungeon(dungeon)}
                        >
                            <div
                                className={styles.dungeon}
                                style={{
                                    backgroundImage: `url(${getImageUrl(
                                        dungeon.journalId + "",
                                        dungeon.expansion.shorthand
                                    )})`,
                                }}
                            >
                                <span className={styles.dungeonName}>{dungeon.name}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AvailableDungeonsPanel;
