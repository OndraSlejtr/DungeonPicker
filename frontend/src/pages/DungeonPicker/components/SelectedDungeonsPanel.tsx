import styles from "../DungeonPicker.module.css";
import { Dungeon } from "../../../data/dungeons";

interface SelectedDungeonsPanelProps {
    selectedDungeons: Dungeon[];
    maxSelection: number;
    onRemoveDungeon: (dungeonId: number) => void;
    onSubmitSelection: () => void; // New prop for handling submission
}

const SelectedDungeonsPanel = ({
    selectedDungeons,
    maxSelection,
    onRemoveDungeon,
    onSubmitSelection,
}: SelectedDungeonsPanelProps) => {
    const getImageUrl = (name: string, expansion: string) => {
        return new URL(`../../../assets/dungeons/${expansion}/${name}.png`, import.meta.url).href;
    };

    return (
        <div className={styles.selectionPanel}>
            {selectedDungeons.length === maxSelection ? (
                <button className={styles.submitButton} onClick={onSubmitSelection}>
                    Submit Your Selection
                </button>
            ) : (
                <h2>
                    Your Selection ({selectedDungeons.length}/{maxSelection})
                </h2>
            )}
            {selectedDungeons.length === 0 ? (
                <p className={styles.placeholder}>No dungeons selected</p>
            ) : (
                <ul className={styles.dungeonList}>
                    {selectedDungeons.map((dungeon) => (
                        <li key={dungeon.id} className={styles.dungeonItem} onClick={() => onRemoveDungeon(dungeon.id)}>
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
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectedDungeonsPanel;
