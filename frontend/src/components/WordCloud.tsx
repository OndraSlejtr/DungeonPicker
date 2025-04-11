import React from "react";
import styles from "./WordCloud.module.css";

interface Word {
    text: string;
    top: number; // Top position in percentage
    left: number; // Left position in percentage
    fontSize: number; // Font size in rem,
    opacity: number;
}

interface WordCloudProps {
    words: Word[];
    width?: string; // Width of the word cloud area
    height?: string; // Height of the word cloud area
}

const WordCloud = ({ words, width = "100%", height = "300px" }: WordCloudProps) => {
    return (
        <div className={styles.wordCloud} style={{ width, height }}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className={styles.word}
                    style={{
                        top: `${word.top}%`,
                        left: `${word.left}%`,
                        fontSize: `${word.fontSize}rem`,
                        position: "absolute",
                        opacity: word.opacity,
                    }}
                >
                    {word.text}
                </span>
            ))}
        </div>
    );
};

export default WordCloud;
