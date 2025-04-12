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
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [loadingPreviousEntry, setLoadingPreviousEntry] = useState<boolean>(false);

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
            setToastMessage("Dungeon selection submitted successfully!");
        } catch (error) {
            console.error("Error submitting dungeon selection:", error);
            setSubmissionStatus("error"); // Update status to error
            setToastMessage("Failed to submit dungeon selection. Please try again.");
        }

        // Automatically hide the toast after 5 seconds
        setTimeout(() => setToastMessage(null), 5000);
    };

    // Fetch previously selected dungeons on component load
    useEffect(() => {
        const fetchSelectedDungeons = async () => {
            setLoadingPreviousEntry(true); // Set loading state to true
            try {
                const response = await axios.get("/api/dungeons", { withCredentials: true });
                if (response.data?.dungeons) {
                    const dungeonIds = response.data.dungeons;
                    const previouslySelected = allDungeons.filter((dungeon) => dungeonIds.includes(dungeon.id));
                    setSelectedDungeons(previouslySelected);
                    setSubmissionStatus("success"); // Indicate that we're updating a previous choice
                }
            } catch (error) {
                console.error("Error fetching previously selected dungeons:", error);
            }
            setLoadingPreviousEntry(false); // Reset loading state
        };

        fetchSelectedDungeons();
    }, []);

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
            {/* Toast Notification */}
            {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

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
                loadingStatus={loadingPreviousEntry}
            />
        </div>
    );
};

export default DungeonPicker;
