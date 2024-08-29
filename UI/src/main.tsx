import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Auth0ProviderWithNavigate from "./Components/Auth0ProviderWithNavigate.tsx";
import { BrowserRouter } from "react-router-dom";
import TanstackQueryConfig from "./helpers/TanstackQueryConfig/index.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <TanstackQueryConfig>
          <App />
        </TanstackQueryConfig>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
