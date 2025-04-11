import DiscordIcon from "../components/DiscordIcon";
import styles from "./DiscordLogin.module.css";

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const redirectUri = `${window.location.origin}/auth/callback`;
const scope = "identify email guilds";

const DiscordLogin = () => {
    const authorizationUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&scope=${encodeURIComponent(scope)}`;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to DungeonPicker</h1>
            <p className={styles.description}>
                Log in with your Discord account to manage your favorite dungeons and vote on them among your guild.
            </p>
            <a href={authorizationUrl} className={styles.button}>
                <DiscordIcon className={styles.icon} />
                Login with Discord
            </a>
        </div>
    );
};

export default DiscordLogin;
