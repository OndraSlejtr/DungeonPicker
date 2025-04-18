import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Auth from "./auth/AuthCallback";
import AuthGuard from "./auth/AuthGuard";
import Content from "./components/Content";
import Explanation from "./pages/Explanation";
import MyDungeons from "./pages/MyDungeons";
import DungeonVoter from "./pages/DungeonVoter/DungeonVoter";

const App = () => {
    return (
        <>
            <Header />
            <Content>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthGuard>
                                <Explanation />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/vote"
                        element={
                            <AuthGuard>
                                <DungeonVoter />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/pick"
                        element={
                            <AuthGuard>
                                <MyDungeons />
                            </AuthGuard>
                        }
                    />
                    <Route path="/auth/callback" element={<Auth />} />
                </Routes>
            </Content>
        </>
    );
};

export default App;
