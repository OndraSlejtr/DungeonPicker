import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";

import { fileURLToPath } from "url";

import path from "path";
import { Request, Response } from "express";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable("trust proxy");

const FRONTEND_URL = process.env.FRONTEND_URL;

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const clientId = "1359906135255023919";
const clientSecret = process.env.CLIENT_SECRET || "";
const guildId = process.env.ZEN_GUILD_ID || "824215968724942878";

app.get("/api/auth/user", async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const userResponse = await axios.get("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const guildsResponse = await axios.get("https://discord.com/api/v10/users/@me/guilds", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const guilds = guildsResponse.data;

        // Check if the user is part of the specified guild
        const guildMembership = guilds.find((guild: { id: string }) => guild.id === guildId);

        if (!guildMembership) {
            res.status(401).json({ error: "User is not part of the guild." });
            return;
        }

        const memberResponse = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/members/@me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const memberData = memberResponse.data;

        // Extract the nickname or fallback to username
        const nickname = memberData.nick || memberData.user.username;

        res.status(200).json({ ...userResponse.data, guildNickname: nickname });
        return;
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ error: "Failed to fetch user data" });
        return;
    }
});

app.post("/api/auth/refresh", [
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refresh_token as string;

        if (!refreshToken) {
            res.status(401).json({ error: "Refresh token is missing" });
            return;
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
    },
]);

app.post("/api/auth/callback", [
    async (req: Request, res: Response) => {
        const { authCode } = req.body;

        const host = `${req.protocol}://${req.get("host")}`;

        if (!authCode) {
            res.status(400).json({ error: "Authorization code is required" });
            return;
        }

        try {
            const tokenResponse = await axios.post(
                "https://discord.com/api/oauth2/token",
                new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: "authorization_code",
                    code: authCode,
                    redirect_uri: `${host}/auth/callback`,
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
    },
]);

// Derive __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = process.env.NODE_ENV;
const isDevelopment = environment === "development";

// Serve static files from the frontend's build directory
const frontendPath = path.join(__dirname, isDevelopment ? "../../frontend/dist" : "./fe-dist");
app.use(express.static(frontendPath));

// Catch-all route to serve the frontend's index.html for any unmatched routes
app.get("*name", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

export default app;
