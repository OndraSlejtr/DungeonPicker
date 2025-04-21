import { useState } from "react";
import styles from "./MyDungeon.module.css";
import Results from "./Results/Results";
import { timings } from "../utils/timing";

const MyResults = () => {
    const [currentPicker, setCurrentPicker] = useState<"best" | "worst">("best");

    if (!timings.results.isFulfilled()) {
        return <h1>Results are not available yet.</h1>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.switchContainer}>
                <button
                    className={`${styles.switchButton} ${styles.best} ${currentPicker === "best" ? styles.active : ""}`}
                    onClick={() => setCurrentPicker("best")}
                >
                    BEST dungeons results
                </button>
                <button
                    className={`${styles.switchButton} ${styles.worst} ${
                        currentPicker === "worst" ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPicker("worst")}
                >
                    WORST dungeons results
                </button>
            </div>

            {/* Conditionally render the DungeonPicker based on the selected type */}
            {currentPicker === "best" ? (
                <Results key="best" listType="best" />
            ) : (
                <Results key="worst" listType="worst" />
            )}
        </div>
    );
};

export default MyResults;
