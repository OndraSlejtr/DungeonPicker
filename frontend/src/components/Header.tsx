import { NavLink } from "react-router-dom";
import { useDiscordLogin } from "../auth/DiscordLoginContext";
import styles from "./Header.module.css";
import { backendUrl } from "../utils/environment";
import { useEffect, useState } from "react";
import { timings } from "../utils/timing";

const Header = () => {
    const { userData, isAuthenticated } = useDiscordLogin();
    const [resultsCountdown, setResultsCountdown] = useState("");

    const handleLogout = async () => {
        try {
            await fetch(`${backendUrl}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            window.location.reload(); // Reload the page after logout
        } catch (err) {
            console.error("Failed to log out:", err);
        }
    };

    useEffect(() => {
        const resultsCountdownUpdater = timings.results.getCountdownUpdateFn()(setResultsCountdown);
        return resultsCountdownUpdater;
    }, []);

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
                    Voting
                </NavLink>

                {timings.results.isFulfilled() ? (
                    <>
                        <NavLink to={"/results"} className={styles.link}>
                            List Results
                        </NavLink>
                        <NavLink to={"/dungeon-results"} className={styles.link}>
                            Dungeon Results
                        </NavLink>
                    </>
                ) : (
                    <div style={{ fontSize: "0.9rem" }}>Results open in {resultsCountdown}</div>
                )}
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
