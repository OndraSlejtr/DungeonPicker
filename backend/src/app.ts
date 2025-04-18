import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";

import { fileURLToPath } from "url";

import path from "path";
import { Request, Response } from "express";
import { logAxiosError } from "./logging/AxiosErrorLogger.js";
import { supabase } from "./database/supabaseClient.js";
import router from "./tournament/tournament.routes.js";
import { FRONTEND_URL, clientId, clientSecret } from "./constants.js";
import { getUserInfo } from "./user/user.service.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable("trust proxy");

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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

app.post("/api/dungeons/:type", async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const userInfo = await getUserInfo(accessToken);
    if (userInfo.error) {
        res.status(userInfo.errorCode).json({ error: userInfo.error });
    }

    const { dungeons } = req.body;
    const { type } = req.params;

    if (!dungeons || !type || (type !== "best" && type !== "worst")) {
        res.status(400).json({ error: "Dungeons and dungeon list type are required" });
        return;
    }

    try {
        const { data, error } = await supabase
            .from("DungeonSubmissions")
            .insert([{ author_discord_id: userInfo.data?.username, dungeons, listType: type }]);

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

app.get("/api/dungeons/:type", async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const userInfo = await getUserInfo(accessToken);
    if (userInfo.error) {
        res.status(userInfo.errorCode).json({ error: userInfo.error });
        return;
    }

    const { type } = req.params;
    if (!type || (type !== "best" && type !== "worst")) {
        res.status(400).json({ error: "Dungeons and dungeon list type are required" });
        return;
    }

    try {
        // Query the DungeonSubmissions table for the newest submission by the user
        const { data, error } = await supabase
            .from("DungeonSubmissions")
            .select("*")
            .eq("author_discord_id", userInfo.data?.username) // Filter by the user's Discord ID
            .eq("listType", type) // Filter by the list type (best or worst)
            .order("created_at", { ascending: false }) // Order by newest first
            .limit(1); // Get only the newest submission

        if (error) {
            console.error("Error fetching dungeon submissions:", error);
            res.status(500).json({ error: "Failed to fetch dungeon submissions" });
            return;
        }

        if (!data || data.length === 0) {
            res.status(404).json({ error: "No dungeon submissions found for this user" });
            return;
        }

        res.status(200).json({ dungeons: data[0].dungeons });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

app.use("/", router);

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
