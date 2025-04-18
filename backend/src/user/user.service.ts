import axios from "axios";
import { logAxiosError } from "../logging/AxiosErrorLogger";
import { guildId } from "../constants";

export type DiscordUser = {
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

type Result<T> =
    | { data: T; error?: null } // Success case: data is present, error is null
    | { data?: null | undefined; error: string; errorCode: number }; // Error case: error is present, data is null

const cache = new Map<string, { data: DiscordUser; expiry: number }>();

export const getUserInfo = async (accessToken: string): Promise<Result<DiscordUser>> => {
    const now = Date.now();

    // Check if the access token is already cached and not expired
    if (cache.has(accessToken)) {
        const cached = cache.get(accessToken);
        if (cached && cached.expiry > now) {
            console.log("Using cached user data for access token:", accessToken);
            return { data: cached.data }; // Return cached data
        }
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
            return { error: "User is not part of the guild.", errorCode: 401, data: null };
        }

        const userData: DiscordUser = userResponse.data;

        // Cache the response with a 1-hour expiry
        cache.set(accessToken, { data: userData, expiry: now + 60 * 60 * 1000 });

        return { data: userData };
    } catch (err) {
        logAxiosError(err, "Error fetching user data:");
        return { error: "Failed to fetch user data", errorCode: 500, data: null };
    }
};
