import styles from "../DungeonPicker.module.css";
import { Dungeon } from "../../../data/dungeons";
import DungeonItem from "../../../components/dungeon/DungeonItem";
import DungeonsList from "../../../components/dungeon/DungeonsList"; // Import the new component

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
    const renderDungeonItem = (dungeon: Dungeon) => {
        const isSelected = selectedDungeons.some((s) => s.id === dungeon.id);
        const isDisabled = selectedDungeons.length >= maxSelection && !isSelected;

        return (
            <DungeonItem
                key={dungeon.id}
                dungeon={dungeon}
                selected={isSelected}
                disabled={isDisabled}
                onClick={() => onAddDungeon(dungeon)}
            />
        );
    };

    return (
        <div className={styles.selectionPanel}>
            <h2>{searchTerm.trim() ? `Search: ${searchTerm}` : "Dungeons"}</h2>
            <DungeonsList dungeons={availableDungeons} renderItem={renderDungeonItem} />
        </div>
    );
};

export default AvailableDungeonsPanel;
