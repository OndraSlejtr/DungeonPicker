const Spinner = () => {
    return (
        <div style={styles.spinnerContainer}>
            <div style={styles.spinner}></div>
        </div>
    );
};

const styles = {
    spinnerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 1s ease-in-out", // Add fade-in animation
        opacity: 0, // Start with hidden opacity
        animationFillMode: "forwards", // Ensure opacity stays at 1 after animation
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #ffffff", // White border
        borderTop: "4px solid #3498db", // Blue border for the spinning part
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
};

// Add keyframes for the spin and fade-in animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
    `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`,
    styleSheet.cssRules.length
);
styleSheet.insertRule(
    `
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`,
    styleSheet.cssRules.length
);

export default Spinner;
