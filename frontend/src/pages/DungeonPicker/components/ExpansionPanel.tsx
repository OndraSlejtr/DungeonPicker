import { useState, useEffect } from "react";
import styles from "../DungeonPicker.module.css";
import { ExpansionName, expansions } from "../../../data/dungeons";

interface ExpansionPanelProps {
    onExpansionChange: (expansion: string) => void;
    onSearchChange: (searchTerm: string) => void; // New prop for search term
}

const ExpansionPanel = ({ onExpansionChange, onSearchChange }: ExpansionPanelProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExpansion, setSelectedExpansion] = useState<ExpansionName>("tww"); // Track selected expansion

    // Debounce logic: Call `onSearchChange` after 1 second of inactivity
    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearchChange(searchTerm);
        }, 1000);

        return () => clearTimeout(timeout); // Cleanup timeout on component unmount or searchTerm change
    }, [searchTerm, onSearchChange]);

    const clearSearch = () => {
        setSearchTerm("");
        onSearchChange(""); // Immediately clear the search term in the parent
    };

    // Generate a green gradient for each button based on its index
    const getButtonColor = (index: number, total: number) => {
        const startColor = [22, 95, 64]; // Jade green (RGB: 22, 95, 64)
        const endColor = [80, 160, 120]; // Softer green (RGB: 80, 160, 120)
        const ratio = index / (total - 1); // Calculate the ratio for the gradient progression
        const r = Math.round(startColor[0] + ratio * (endColor[0] - startColor[0]));
        const g = Math.round(startColor[1] + ratio * (endColor[1] - startColor[1]));
        const b = Math.round(startColor[2] + ratio * (endColor[2] - startColor[2]));
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div className={styles.expansionPanel}>
            <h2>Expansions</h2>
            {expansions.map((expansion, index) => {
                const buttonColor = getButtonColor(index, expansions.length);
                const isSelected = selectedExpansion === expansion.shorthand;

                return (
                    <button
                        key={expansion.id}
                        className={styles.expansionButton}
                        onClick={() => {
                            setSelectedExpansion(expansion.shorthand);
                            onExpansionChange(expansion.shorthand);
                        }}
                        style={{
                            backgroundColor: isSelected ? buttonColor : "transparent",
                            border: `2px solid ${buttonColor}`,
                            color: "white", // Adjust text color for visibility
                        }}
                    >
                        {expansion.name}
                    </button>
                );
            })}

            <h2>Global search</h2>
            {/* Search bar with clear button */}
            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    className={styles.searchBar}
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button className={styles.clearButton} onClick={clearSearch}>
                        &#x2716; {/* Unicode for red X symbol */}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ExpansionPanel;
