import { NavLink } from "react-router-dom";
import { useDiscordLogin } from "../auth/DiscordLoginContext";
import styles from "./Header.module.css";
import { backendUrl } from "../utils/environment";
import { useState, useEffect } from "react";

const Header = () => {
    const { userData, isAuthenticated } = useDiscordLogin();
    const [countdown, setCountdown] = useState("");

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
        const targetDate = new Date("2025-04-18T00:00:00"); // Midnight of April 18, 2025

        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setCountdown("Voting has started!");
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        updateCountdown(); // Initialize countdown immediately
        const interval = setInterval(updateCountdown, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 className={styles.title}>DungeonPicker</h1>
            </div>
            <nav className={styles.nav}>
                <NavLink to={"/pick"} className={styles.link}>
                    Pick Best
                </NavLink>
                <NavLink to={"/vote"} className={styles.link}>
                    Voting starts in {countdown}
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
