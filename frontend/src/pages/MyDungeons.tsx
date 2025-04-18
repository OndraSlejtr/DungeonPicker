// import { useState } from "react";
// import DungeonPicker from "./DungeonPicker/DungeonPicker";
import styles from "./MyDungeon.module.css";
// import DoneChip from "../components/DoneChip";
import PickingClosed from "./DungeonPicker/PickingClosed";

const MyDungeons = () => {
    // const [currentPicker, setCurrentPicker] = useState<"best" | "worst">("best");
    // const [toastMessage, setToastMessage] = useState<string | null>(null);
    // const [bestCompletedStatus, setBestCompletedStatus] = useState<boolean>(false); // Track if the user has completed their selection
    // const [worstCompletedStatus, setWorstCompletedStatus] = useState<boolean>(false); // Track if the user has completed their selection

    // const swap = () => {
    //     if (bestCompletedStatus && worstCompletedStatus) return;
    //     setCurrentPicker((prev) => (prev === "best" ? "worst" : "best")); // Toggle between best and worst
    // };

    return (
        <div className={styles.container}>
            <PickingClosed />
        </div>

        //  {/* Toast Notification */}
        //  {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
        //  {/* Switch to toggle between best and worst DungeonPicker */}
        //  <div className={styles.switchContainer}>
        //      <button
        //          className={`${styles.switchButton} ${styles.best} ${currentPicker === "best" ? styles.active : ""}`}
        //          onClick={() => setCurrentPicker("best")}
        //      >
        //          Pick{currentPicker === "best" && "ing"} best dungeons
        //          <DoneChip complete={bestCompletedStatus} />
        //      </button>
        //      <button
        //          className={`${styles.switchButton} ${styles.worst} ${
        //              currentPicker === "worst" ? styles.active : ""
        //          }`}
        //          onClick={() => setCurrentPicker("worst")}
        //      >
        //          Pick{currentPicker === "worst" && "ing"} worst dungeons
        //          <DoneChip complete={worstCompletedStatus} />
        //      </button>
        //  </div>

        //  {/* Conditionally render the DungeonPicker based on the selected type */}
        //  {currentPicker === "best" ? (
        //      <DungeonPicker
        //          listType="best"
        //          setToastMessage={setToastMessage}
        //          onSubmit={swap}
        //          setCompletedStatus={setBestCompletedStatus}
        //      />
        //  ) : (
        //      <DungeonPicker
        //          listType="worst"
        //          setToastMessage={setToastMessage}
        //          onSubmit={swap}
        //          setCompletedStatus={setWorstCompletedStatus}
        //      />
        //  )}
    );
};

export default MyDungeons;
