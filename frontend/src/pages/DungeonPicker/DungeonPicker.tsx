import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./DungeonPicker.module.css";
import { Dungeon, TWWDungeons, ExpansionName, dungeonsByExpansion, allDungeons } from "../../data/dungeons";
import ExpansionPanel from "./components/ExpansionPanel";
import AvailableDungeonsPanel from "./components/AvailableDungeonsPanel";
import SelectedDungeonsPanel from "./components/SelectedDungeonsPanel";
import Spinner from "../../components/Spinner"; // Import the Spinner component
import PickingClosed from "./PickingClosed";

const MAX_SELECTION = 8;

type ListType = "best" | "worst";

const DungeonPicker = (props: {
    listType: ListType;
    setToastMessage: (msg: string | null) => void;
    onSubmit: () => void;
    setCompletedStatus: (complete: boolean) => void; // Add this prop to set the completed status
}) => {
    const [selectedDungeons, setSelectedDungeons] = useState<Dungeon[]>([]);
    const [availableDungeons, setAvailableDungeons] = useState<Dungeon[]>(TWWDungeons);
    const [searchTerm, setSearchTerm] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
    const [loadingPreviousEntry, setLoadingPreviousEntry] = useState<boolean>(false);

    const { setToastMessage, onSubmit, setCompletedStatus } = props; // Destructure setToastMessage from props

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
                `/api/dungeons/${props.listType}`,
                { dungeons: dungeonIds },
                { withCredentials: true } // Include cookies in the request
            );
            setSubmissionStatus("success"); // Update status to success
            setToastMessage(
                `${props.listType.toUpperCase()} dungeon selection submitted successfully! Sit tight until voting opens.`
            );
            onSubmit();
            setCompletedStatus(true); // Set completed status to true
        } catch (error) {
            console.error("Error submitting dungeon selection:", error);
            setSubmissionStatus("error"); // Update status to error
            setToastMessage("Failed to submit dungeon selection. Please try again.");
        }

        // Automatically hide the toast after 5 seconds
        setTimeout(() => setToastMessage(null), 15000);
    };

    // Fetch previously selected dungeons on component load
    useEffect(() => {
        const fetchSelectedDungeons = async () => {
            setLoadingPreviousEntry(true); // Set loading state to true
            try {
                const response = await axios.get(`/api/dungeons/${props.listType}`, { withCredentials: true });
                if (response.data?.dungeons) {
                    const dungeonIds = response.data.dungeons;
                    const previouslySelected = dungeonIds.map((dungeonId: number) =>
                        allDungeons.find((dungeon) => dungeon.id === dungeonId)
                    );
                    setSelectedDungeons(previouslySelected);
                    setSubmissionStatus("success"); // Indicate that we're updating a previous choice
                    setCompletedStatus(true); // Set completed status to true
                }
            } catch (error) {
                console.error("Error fetching previously selected dungeons:", error);
                setSelectedDungeons([]); // Reset selected dungeons on error
                setSubmissionStatus("idle");
            }
            setLoadingPreviousEntry(false); // Reset loading state
        };

        fetchSelectedDungeons();
    }, [props.listType, setCompletedStatus]);

    // Filter available dungeons based on the search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setAvailableDungeons(TWWDungeons); // Reset to default dungeons if search is empty
        } else {
            const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex
            setAvailableDungeons(() => allDungeons.filter((dungeon) => regex.test(dungeon.name)));
        }
    }, [searchTerm]);

    const targetDate = new Date("2025-04-18T16:00:00");

    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        return <PickingClosed />;
    }

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
            {loadingPreviousEntry ? (
                <div className={styles.selectionPanel}>
                    <Spinner />
                </div>
            ) : (
                <SelectedDungeonsPanel
                    onSubmitSelection={submitSelection} // Use the new function here
                    selectedDungeons={selectedDungeons}
                    maxSelection={MAX_SELECTION}
                    onRemoveDungeon={handleRemoveDungeon}
                    submissionStatus={submissionStatus} // Pass submission status
                />
            )}
        </div>
    );
};

export default DungeonPicker;
