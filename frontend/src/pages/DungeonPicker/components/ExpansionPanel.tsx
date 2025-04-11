import styles from "../DungeonPicker.module.css";
import { expansions } from "../../../data/dungeons";

interface ExpansionPanelProps {
    onExpansionChange: (expansion: string) => void;
}

const ExpansionPanel = ({ onExpansionChange }: ExpansionPanelProps) => {
    return (
        <div className={styles.expansionPanel}>
            <h2>Expansions</h2>
            {expansions.map((expansion) => (
                <button
                    key={expansion.id}
                    className={styles.expansionButton}
                    onClick={() => onExpansionChange(expansion.shorthand)}
                >
                    {expansion.name}
                </button>
            ))}
        </div>
    );
};

export default ExpansionPanel;
