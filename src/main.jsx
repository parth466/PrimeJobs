import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./pages/navbar.jsx";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Footer from "./pages/Footer";
import { ThemeProvider } from "@/components/themeprovider";
import { AuthProvider } from "./middleware/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <StrictMode>
          <Navbar />
          <App />
          <Footer />
        </StrictMode>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
