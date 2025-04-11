import React from "react";

const Explanation: React.FC = () => {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Welcome to Dungeon Picker!</h1>
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
                This application allows you to explore all existing World of Warcraft dungeons and select your favorite
                8. Once you've made your selection, you can vote on your favorite combinations and share your
                preferences with others!
            </p>
            <button
                style={{
                    padding: "1rem 2rem",
                    fontSize: "1.25rem",
                    color: "#fff",
                    backgroundColor: "#007BFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Get Started
            </button>
        </div>
    );
};

export default Explanation;
