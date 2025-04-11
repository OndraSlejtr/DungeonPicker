import { createContext, useContext } from "react";

export interface UserData {
    id: string;
    username: string;
    email?: string;
    guildNickname?: string;
}

export interface DiscordLoginContextType {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const DiscordLoginContext = createContext<DiscordLoginContextType | undefined>(undefined);

export const useDiscordLogin = (): DiscordLoginContextType => {
    const context = useContext(DiscordLoginContext);
    if (!context) {
        throw new Error("useDiscordLogin must be used within a DiscordLoginProvider");
    }
    return context;
};
