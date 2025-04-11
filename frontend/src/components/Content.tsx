import { ReactNode } from "react";
import styles from "./Content.module.css";

const Content = ({ children }: { children: ReactNode }) => {
    return <div className={styles.container}>{children}</div>;
};

export default Content;
