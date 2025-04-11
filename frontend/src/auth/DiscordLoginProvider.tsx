import { ReactNode, useEffect, useState } from "react";
import { DiscordLoginContext, UserData } from "./DiscordLoginContext";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

export const DiscordLoginProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get<UserData>(`${backendUrl}/api/auth/user`, {
                    withCredentials: true,
                });
                setUserData(response.data);
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setUserData(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <DiscordLoginContext.Provider value={{ userData, setUserData, isAuthenticated, isLoading, setIsAuthenticated }}>
            {children}
        </DiscordLoginContext.Provider>
    );
};
