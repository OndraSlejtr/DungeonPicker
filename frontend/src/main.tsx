import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Auth from "./auth/AuthCallback.tsx";
import { DiscordLoginProvider } from "./auth/DiscordLoginProvider.tsx";
import AuthGuard from "./auth/AuthGuard.tsx";
import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import Explanation from "./pages/Explanation.tsx";
import App from "./App.tsx";
import Voting from "./pages/Voting.tsx";
import DungeonPicker from "./pages/DungeonPicker/DungeonPicker.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DiscordLoginProvider>
            <BrowserRouter>
                <App>
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
                                        <Voting />
                                    </AuthGuard>
                                }
                            />
                            <Route
                                path="/pick"
                                element={
                                    <AuthGuard>
                                        <DungeonPicker />
                                    </AuthGuard>
                                }
                            />
                            <Route path="/auth/callback" element={<Auth />} />
                        </Routes>
                    </Content>
                </App>
            </BrowserRouter>
        </DiscordLoginProvider>
    </StrictMode>
);
