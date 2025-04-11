import Spinner from "../components/Spinner";
import DiscordLogin from "./DiscordLogin";
import { useDiscordLogin } from "./DiscordLoginContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useDiscordLogin();

    if (isLoading) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        return <DiscordLogin />;
    }

    return <>{children}</>;
};

export default AuthGuard;
