const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const redirectUri = `${window.location.origin}/auth/callback`;
const scope = "identify email guilds";

const DiscordLogin = () => {
    const authorizationUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&scope=${encodeURIComponent(scope)}`;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to DungeonPicker</h1>
            <p style={styles.description}>
                Log in with your Discord account to manage your favorite dungeons and connect with your guild.
            </p>
            <a href={authorizationUrl} style={styles.button}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
                    alt="Discord Logo"
                    style={styles.icon}
                />
                Login with Discord
            </a>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#2c2f33",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    description: {
        fontSize: "1.2rem",
        marginBottom: "2rem",
        textAlign: "center" as const,
        maxWidth: "400px",
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5865F2",
        color: "#ffffff",
        textDecoration: "none",
        padding: "0.8rem 1.5rem",
        borderRadius: "5px",
        fontSize: "1rem",
        fontWeight: "bold",
        transition: "background-color 0.3s",
    },
    icon: {
        width: "24px",
        height: "24px",
        marginRight: "0.5rem",
    },
};

export default DiscordLogin;
