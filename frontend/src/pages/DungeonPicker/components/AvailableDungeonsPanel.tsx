import styles from "../DungeonPicker.module.css";
import { Dungeon } from "../../../data/dungeons";

interface AvailableDungeonsPanelProps {
    availableDungeons: Dungeon[];
    selectedDungeons: Dungeon[];
    maxSelection: number;
    onAddDungeon: (dungeon: Dungeon) => void;
}

const AvailableDungeonsPanel = ({
    availableDungeons,
    selectedDungeons,
    maxSelection,
    onAddDungeon,
}: AvailableDungeonsPanelProps) => {
    const getImageUrl = (name: string) => new URL(`../../../assets/dungeons/tww/${name}.png`, import.meta.url).href;

    return (
        <div className={styles.selectionPanel}>
            <h2>Available Dungeons</h2>
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
    );
};

export default AvailableDungeonsPanel;
