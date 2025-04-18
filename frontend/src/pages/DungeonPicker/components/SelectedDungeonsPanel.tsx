import styles from "../DungeonPicker.module.css";
import { Dungeon } from "../../../data/dungeons";
import DungeonItem from "../../../components/dungeon/DungeonItem";

interface SelectedDungeonsPanelProps {
    selectedDungeons: Dungeon[];
    maxSelection: number;
    onRemoveDungeon: (dungeonId: number) => void;
    onSubmitSelection: () => void;
    submissionStatus: "idle" | "success" | "error"; // New prop for submission status
}

const SelectedDungeonsPanel = ({
    selectedDungeons,
    maxSelection,
    onRemoveDungeon,
    onSubmitSelection,
    submissionStatus,
}: SelectedDungeonsPanelProps) => {
    const getButtonText = () => {
        if (submissionStatus === "success") return "Update Your Selection";
        if (submissionStatus === "error") return "Submission failed - Retry";
        return "Submit Your Selection";
    };

    const getButtonClass = () => {
        if (submissionStatus === "success") return styles.successButton;
        if (submissionStatus === "error") return styles.errorButton;
        return styles.submitButton;
    };

    return (
        <div className={styles.selectionPanel}>
            {selectedDungeons.length === maxSelection ? (
                <button className={getButtonClass()} onClick={onSubmitSelection}>
                    {getButtonText()}
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
                        <DungeonItem key={dungeon.id} dungeon={dungeon} onClick={() => onRemoveDungeon(dungeon.id)} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectedDungeonsPanel;
