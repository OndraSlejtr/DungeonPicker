import { useEffect, useState } from "react";
import axios from "axios";

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const redirectUri = `${window.location.origin}/auth/callback`;
const scope = "identify email";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

type DiscordUserData = {
    id: string;
    username: string;
    email: string;
};

const Auth = () => {
    const [authCode, setAuthCode] = useState<string | null>(null);
    const [userData, setUserData] = useState<DiscordUserData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userData) {
            // Fetch user data from the backend if not already fetched
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/api/auth/user`, {
                        withCredentials: true,
                    });
                    setUserData(response.data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to fetch user data.");
                }
            };

            fetchUserData();
        }
    }, [userData]);

    const authorizationUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&scope=${encodeURIComponent(scope)}`;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        if (code) {
            setAuthCode(code);
        }
    }, []);

    useEffect(() => {
        if (authCode) {
            // Send the authorization code to the backend
            const authenticate = async () => {
                try {
                    await axios.post(`${backendUrl}/api/auth/callback`, { authCode }, { withCredentials: true });

                    const userResponse = await axios.get(`${backendUrl}/api/auth/user`, {
                        withCredentials: true,
                    });
                    setUserData(userResponse.data);
                } catch (err) {
                    setError("Failed to authenticate.");
                    console.error(err);
                }
            };

            authenticate();
        }
    }, [authCode]);

    return (
        <div>
            <h1>Discord Authentication</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!authCode && !userData && <a href={authorizationUrl}>Login with Discord</a>}
            {userData && (
                <div>
                    <h2>Welcome, {userData.username}!</h2>
                    <p>ID: {userData.id}</p>
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </div>
    );
};

export default Auth;
