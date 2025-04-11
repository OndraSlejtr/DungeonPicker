import React from "react";
import styles from "./ScrollingText.module.css";

interface ScrollingTextProps {
    lines: {
        text: string;
        fontSize: number; // Font size in rem
        direction: string; // Direction of movement
        speed: number; // Speed of movement (seconds for one loop)
    }[];
    height?: string; // Height of the scrolling area
}

const ScrollingText = ({ lines, height = "200px" }: ScrollingTextProps) => {
    return (
        <div className={styles.container} style={{ height }}>
            {lines.map((line, index) => (
                <div
                    key={index}
                    className={`${styles.line} ${styles[line.direction]}`}
                    style={{
                        fontSize: `${line.fontSize}rem`,
                        animationDuration: `${line.speed * 10}s`,
                    }}
                >
                    {line.text}
                </div>
            ))}
        </div>
    );
};

export default ScrollingText;
