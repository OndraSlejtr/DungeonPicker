import styles from "./DoneChip.module.css";

const DoneChip = (props: { complete: boolean }) => {
    if (props.complete) {
        return <div className={styles.chip}>DONE</div>;
    } else {
        return <></>;
    }
};

export default DoneChip;
