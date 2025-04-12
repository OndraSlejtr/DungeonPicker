import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";

import { fileURLToPath } from "url";

import path from "path";
import { Request, Response } from "express";
import { logAxiosError } from "./logging/AxiosErrorLogger.js";
import { supabase } from "./supabaseClient.js";

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

type DiscordUser = {
    id: string; // User ID
    username: string; // Username
    avatar: string | null; // Avatar hash or null if not set
    discriminator: string; // Discriminator (e.g., "1234" or "0" for modern usernames)
    public_flags: number; // Public flags (bitfield)
    flags: number; // User flags (bitfield)
    banner: string | null; // Banner hash or null if not set
    accent_color: number | null; // Accent color as a hex value or null
    global_name: string | null; // Global display name
    avatar_decoration_data: any | null; // Avatar decoration data or null
    collectibles: any | null; // Collectibles data or null
    banner_color: string | null; // Banner color as a hex value or null
    clan: any | null; // Clan data or null
    primary_guild: any | null; // Primary guild data or null
    mfa_enabled: boolean; // Whether multi-factor authentication is enabled
    locale: string; // User's locale (e.g., "en-US")
    premium_type: number; // Premium type (e.g., Nitro subscription level)
    email: string | null; // Email address or null if not available
    verified: boolean; // Whether the email is verified
};

const clientId = "1359906135255023919";
const clientSecret = process.env.CLIENT_SECRET || "";
const guildId = process.env.ZEN_GUILD_ID || "824215968724942878";

type Result<T> =
    | { data: T; error?: null } // Success case: data is present, error is null
    | { data?: null | undefined; error: string; errorCode: number }; // Error case: error is present, data is null

const getUserInfo = async (accessToken: string): Promise<Result<DiscordUser>> => {
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
        // res.status(401).json({ error: "User is not part of the guild." });
        // return null;
        return { error: "User is not part of the guild.", errorCode: 401, data: null };
    }

    // TODO: Get nickname, need to setup bot on server
    // const memberResponse = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/members/@me`, {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // });
    // const memberData = memberResponse.data;

    // Extract the nickname or fallback to username
    // const nickname = memberData.nick || memberData.user.username;

    return { data: userResponse.data };
};

app.get("/api/auth/user", async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const userInfo = await getUserInfo(accessToken);
        if (userInfo.error) {
            res.status(userInfo.errorCode).json({ error: userInfo.error });
        } else {
            res.status(200).json(userInfo.data);
            return;
        }
    } catch (err) {
        logAxiosError(err, "Error fetching user data:");
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
            logAxiosError(err, "Error refreshing token");
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
            logAxiosError(err, "Error exchanging code for token");
            res.status(500).json({ error: "Failed to authenticate" });
        }
    },
]);

app.post("/api/auth/logout", (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logged out successfully" });
});

app.post("/api/dungeons", async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const userInfo = await getUserInfo(accessToken);
    if (userInfo.error) {
        res.status(userInfo.errorCode).json({ error: userInfo.error });
    }

    res.status(200).json(userInfo.data);

    const { dungeons } = req.body;

    if (!dungeons) {
        res.status(400).json({ error: " dungeons are required" });
        return;
    }

    try {
        const { data, error } = await supabase
            .from("DungeonSubmissions")
            .insert([{ author_discord_id: userInfo.data?.username, dungeons }]);

        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).json({ error: "Failed to submit dungeon selection" });
            return;
        }

        res.status(200).json({ message: "Dungeon selection submitted successfully", data });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

// Derive __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = process.env.NODE_ENV;
const isDevelopment = environment === "development";

// Serve static files from the frontend's build directory
const frontendPath = path.join(__dirname, isDevelopment ? "../../frontend/dist" : "./fe-dist");
app.use(express.static(frontendPath));

const cacheTime = 86400000 * 30; // the time you want

app.use(
    express.static(path.join(__dirname, isDevelopment ? "../../frontend/dist" : "./fe-dist", "public"), {
        maxAge: cacheTime,
    })
);

// Catch-all route to serve the frontend's index.html for any unmatched routes
app.get("*name", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

export default app;
