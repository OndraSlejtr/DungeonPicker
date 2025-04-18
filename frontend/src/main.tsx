import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import { DiscordLoginProvider } from "./auth/DiscordLoginProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DiscordLoginProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </DiscordLoginProvider>
    </StrictMode>
);
