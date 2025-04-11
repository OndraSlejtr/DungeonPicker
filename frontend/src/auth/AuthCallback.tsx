import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDiscordLogin } from "./DiscordLoginContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

const Auth = () => {
    const { setUserData } = useDiscordLogin();
    const [authCode, setAuthCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

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

                    const user = userResponse.data;

                    setUserData(user);
                    navigate("/");
                } catch (err) {
                    setError("Failed to authenticate.");
                    console.error(err);
                }
            };

            authenticate();
        }
    }, [authCode, navigate, setUserData]);

    if (!error) {
        <>Authenticating...</>;
    } else {
        return <p style={{ color: "red" }}>Error during authentication: {error}</p>;
    }
};

export default Auth;
