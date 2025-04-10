import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const clientId = "1359906135255023919";
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = "http://localhost:5173/auth/callback";

app.get("/api/auth/user", async (req, res) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const userResponse = await axios.get("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        res.status(200).json(userResponse.data);
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

app.post("/api/auth/refresh", async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is missing" });
    }

    try {
        const tokenResponse = await axios.post(
            "https://discord.com/api/oauth2/token",
            new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log(tokenResponse.data);

        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: expires_in * 1000, // Convert seconds to milliseconds
        });

        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({ message: "Token refreshed successfully" });
    } catch (err) {
        console.error("Error refreshing token:", err);
        res.status(500).json({ error: "Failed to refresh token" });
    }
});

app.post("/api/auth/callback", async (req, res) => {
    const { authCode } = req.body;

    if (!authCode) {
        return res.status(400).json({ error: "Authorization code is required" });
    }

    try {
        const tokenResponse = await axios.post(
            "https://discord.com/api/oauth2/token",
            new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "authorization_code",
                code: authCode,
                redirect_uri: redirectUri,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: expires_in * 1000, // Convert seconds to milliseconds
        });

        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({ message: "Authentication successful" });
    } catch (err) {
        console.error("Error exchanging code for token:", err);
        res.status(500).json({ error: "Failed to authenticate" });
    }
});

export default app;
