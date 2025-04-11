import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import App from "./App.tsx";
import Auth from "./auth/AuthCallback.tsx";
import { DiscordLoginProvider } from "./auth/DiscordLoginProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DiscordLoginProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/auth/callback" element={<Auth />} />
                </Routes>
            </BrowserRouter>
        </DiscordLoginProvider>
    </StrictMode>
);
