import { NavLink } from "react-router-dom";
import { useDiscordLogin } from "../auth/DiscordLoginContext";
import styles from "./Header.module.css";

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
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 className={styles.title}>DungeonPicker</h1>
            </div>
            <nav className={styles.nav}>
                <NavLink to={"/pick"} className={styles.link}>
                    Pick
                </NavLink>
                <NavLink to={"/vote"} className={styles.link}>
                    Vote
                </NavLink>
            </nav>
            <div className={styles.userSection}>
                {isAuthenticated && (
                    <>
                        <span className={styles.username}>
                            Logged in as <strong>{userData?.username || "Player"}</strong>
                        </span>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
