import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Auth from "./auth/AuthCallback";
import AuthGuard from "./auth/AuthGuard";
import Content from "./components/Content";
import Explanation from "./pages/Explanation";
import MyDungeons from "./pages/MyDungeons";
import MyVotes from "./pages/MyVotes";
import Results from "./pages/Results/Results"; // Import the new Results component

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
                                <MyVotes />
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
                    <Route
                        path="/results"
                        element={
                            <AuthGuard>
                                <Results />
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
