import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
}

const Button = ({ onClick, children, type = "button" }: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
