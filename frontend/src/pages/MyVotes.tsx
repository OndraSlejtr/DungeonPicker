import { useState } from "react";
import styles from "./MyDungeon.module.css";
import DoneChip from "../components/DoneChip";
import DungeonVoter from "./DungeonVoter/DungeonVoter";

const MyVotes = () => {
    const [currentPicker, setCurrentPicker] = useState<"best" | "worst">("best");
    const [bestCompletedStatus, setBestCompletedStatus] = useState<boolean>(false); // Track if the user has completed their selection
    const [worstCompletedStatus, setWorstCompletedStatus] = useState<boolean>(false); // Track if the user has completed their selection

    // const swap = () => {
    //     if (bestCompletedStatus && worstCompletedStatus) return;
    //     setCurrentPicker((prev) => (prev === "best" ? "worst" : "best")); // Toggle between best and worst
    // };

    return (
        <div className={styles.container}>
            <div className={styles.switchContainer}>
                <button
                    className={`${styles.switchButton} ${styles.best} ${currentPicker === "best" ? styles.active : ""}`}
                    onClick={() => setCurrentPicker("best")}
                >
                    Vote for best dungeons
                    <DoneChip complete={bestCompletedStatus} />
                </button>
                <button
                    className={`${styles.switchButton} ${styles.worst} ${
                        currentPicker === "worst" ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPicker("worst")}
                >
                    Vote for worst dungeons
                    <DoneChip complete={worstCompletedStatus} />
                </button>
            </div>

            {/* Conditionally render the DungeonPicker based on the selected type */}
            {currentPicker === "best" ? (
                <DungeonVoter key="best" listType="best" setCompletedStatus={setBestCompletedStatus} />
            ) : (
                <DungeonVoter key="worst" listType="worst" setCompletedStatus={setWorstCompletedStatus} />
            )}
        </div>
    );
};

export default MyVotes;
