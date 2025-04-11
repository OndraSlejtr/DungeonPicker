import "./App.css";
import DiscordLogin from "./auth/DiscordLogin";
import { useDiscordLogin } from "./auth/DiscordLoginContext";
import Content from "./components/Content";
import Header from "./components/Header";
import Spinner from "./components/Spinner";

const App = () => {
    const { isAuthenticated, userData, isLoading } = useDiscordLogin();

    return (
        <>
            <Header />
            <Content>
                {isAuthenticated && <>Wassap {userData?.username}</>}
                {isLoading && <Spinner />}
                {!isAuthenticated && !isLoading && <DiscordLogin />}
            </Content>
        </>
    );
};

export default App;
