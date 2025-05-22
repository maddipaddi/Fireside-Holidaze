import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext.jsx";
import { VenueProvider } from "./components/context/VenueContext.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <VenueProvider>
          <ScrollToTop />
          <App />
        </VenueProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
