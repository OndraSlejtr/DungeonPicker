import styles from "../DungeonPicker.module.css";
import { Dungeon } from "../../../data/dungeons";

interface SelectedDungeonsPanelProps {
    selectedDungeons: Dungeon[];
    maxSelection: number;
    onRemoveDungeon: (dungeonId: number) => void;
}

const SelectedDungeonsPanel = ({ selectedDungeons, maxSelection, onRemoveDungeon }: SelectedDungeonsPanelProps) => {
    const getImageUrl = (name: string) => new URL(`../../../assets/dungeons/tww/${name}.png`, import.meta.url).href;

    return (
        <div className={styles.dropPanel}>
            <h2 className={selectedDungeons.length === maxSelection ? styles.full : ""}>
                Your Selection ({selectedDungeons.length}/{maxSelection})
            </h2>
            {selectedDungeons.length === 0 ? (
                <p className={styles.placeholder}>No dungeons selected</p>
            ) : (
                <ul className={styles.dungeonList}>
                    {selectedDungeons.map((dungeon) => (
                        <li key={dungeon.id} className={styles.dungeonItem} onClick={() => onRemoveDungeon(dungeon.id)}>
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
    );
};

export default SelectedDungeonsPanel;
