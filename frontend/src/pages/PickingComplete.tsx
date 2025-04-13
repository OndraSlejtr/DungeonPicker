import styles from "./PickingComplete.module.css";

const PickingComplete = (props: { complete: boolean }) => {
    if (props.complete) {
        return <div className={styles.chip}>DONE</div>;
    } else {
        return <></>;
    }
};

export default PickingComplete;
