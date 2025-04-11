import "./App.css";
import DiscordLogin from "./auth/DiscordLogin";
import { useDiscordLogin } from "./auth/DiscordLoginContext";
import Header from "./components/Header";
import Spinner from "./components/Spinner";

const App = () => {
    const { isAuthenticated, userData, isLoading } = useDiscordLogin();

    if (isAuthenticated) {
        return (
            <>
                <Header />
                Wassap {userData?.username}
            </>
        );
    } else if (isLoading) {
        return (
            <>
                <Header />
                <Spinner />
            </>
        );
    } else {
        return (
            <>
                <Header />
                <DiscordLogin />
            </>
        );
    }
};

export default App;
