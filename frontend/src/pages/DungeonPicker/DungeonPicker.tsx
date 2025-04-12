import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./DungeonPicker.module.css";
import { Dungeon, TWWDungeons, ExpansionName, dungeonsByExpansion, allDungeons } from "../../data/dungeons";
import ExpansionPanel from "./components/ExpansionPanel";
import AvailableDungeonsPanel from "./components/AvailableDungeonsPanel";
import SelectedDungeonsPanel from "./components/SelectedDungeonsPanel";

const MAX_SELECTION = 8;

const DungeonPicker = () => {
    const [selectedDungeons, setSelectedDungeons] = useState<Dungeon[]>([]);
    const [availableDungeons, setAvailableDungeons] = useState<Dungeon[]>(TWWDungeons);
    const [searchTerm, setSearchTerm] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

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

    const handleExpansionChange = (expansion: ExpansionName) => {
        setAvailableDungeons(dungeonsByExpansion[expansion]);
    };

    const submitSelection = async () => {
        try {
            const dungeonIds = selectedDungeons.map((dungeon) => dungeon.id);
            await axios.post(
                "/api/dungeons",
                { dungeons: dungeonIds },
                { withCredentials: true } // Include cookies in the request
            );
            setSubmissionStatus("success"); // Update status to success
        } catch (error) {
            console.error("Error submitting dungeon selection:", error);
            setSubmissionStatus("error"); // Update status to error
        }
    };

    // Filter available dungeons based on the search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setAvailableDungeons(TWWDungeons); // Reset to default dungeons if search is empty
        } else {
            const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex
            setAvailableDungeons(() => allDungeons.filter((dungeon) => regex.test(dungeon.name)));
        }
    }, [searchTerm]);

    return (
        <div className={styles.container}>
            <ExpansionPanel
                onExpansionChange={handleExpansionChange}
                onSearchChange={setSearchTerm} // Pass handler to update search term
            />
            <AvailableDungeonsPanel
                availableDungeons={availableDungeons}
                selectedDungeons={selectedDungeons}
                maxSelection={MAX_SELECTION}
                onAddDungeon={handleAddDungeon}
                searchTerm={searchTerm} // Pass the search term
            />
            <SelectedDungeonsPanel
                onSubmitSelection={submitSelection} // Use the new function here
                selectedDungeons={selectedDungeons}
                maxSelection={MAX_SELECTION}
                onRemoveDungeon={handleRemoveDungeon}
                submissionStatus={submissionStatus} // Pass submission status
            />
        </div>
    );
};

export default DungeonPicker;
