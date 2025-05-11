import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext.jsx";
import { VenueProvider } from "./components/VenueContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <VenueProvider>
          <App />
        </VenueProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
