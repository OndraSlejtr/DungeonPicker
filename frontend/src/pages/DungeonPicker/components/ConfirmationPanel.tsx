import styles from "../DungeonPicker.module.css";

interface ConfirmationPanelProps {
    onSubmit: () => void;
}

const ConfirmationPanel = ({ onSubmit }: ConfirmationPanelProps) => {
    return (
        <div className={`${styles.confirmationPanel} ${styles.slideIn}`}>
            <h2>Confirm Your Selection</h2>
            <p>You have selected all 8 dungeons. You can change this selection later.</p>
            <button className={styles.confirmButton} onClick={onSubmit}>
                Confirm Selection
            </button>
        </div>
    );
};

export default ConfirmationPanel;
