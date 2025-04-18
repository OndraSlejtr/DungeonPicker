import React from "react";
import styles from "./Confirmed.module.css";

const Confirmed: React.FC = () => {
    return (
        <div className={styles.circle}>
            <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                {/* Optional: Circle outline animation */}
                {/* <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/> */}
                <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
        </div>
    );
};

export default Confirmed;
