import { useDiscordLogin } from "../auth/DiscordLoginContext";

const Header = () => {
    const { userData, isAuthenticated } = useDiscordLogin();

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            window.location.reload(); // Reload the page after logout
        } catch (err) {
            console.error("Failed to log out:", err);
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                <h1 style={styles.title}>ZenDungeonPicker</h1>
            </div>
            <nav style={styles.nav}>
                <a href="/" style={styles.link}>
                    Home
                </a>
                <a href="/about" style={styles.link}>
                    About
                </a>
                <a href="/dungeons" style={styles.link}>
                    Dungeons
                </a>
            </nav>
            <div style={styles.userSection}>
                {isAuthenticated ? (
                    <>
                        <span style={styles.username}>{userData?.username || "Player"}</span>
                        <button style={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <span style={styles.username}>Guest</span>
                )}
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#165f40", // Jade green
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%", // Stretch header to full width
        position: "fixed", // Fix header at the top
        top: 0,
        zIndex: 1000,
    },
    logo: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#ffd700", // Gold
        margin: 0,
    },
    nav: {
        display: "flex",
        gap: "15px",
    },
    link: {
        color: "#ffd700", // Gold
        textDecoration: "none",
        fontSize: "1rem",
        transition: "color 0.3s",
    },
    linkHover: {
        color: "#fff", // White on hover
    },
    userSection: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    username: {
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#ffd700", // Gold
    },
    logoutButton: {
        backgroundColor: "#ffd700", // Gold
        color: "#165f40", // Jade green text
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "background-color 0.3s",
    },
    logoutButtonHover: {
        backgroundColor: "#e6b800", // Slightly darker gold on hover
    },
};

export default Header;
