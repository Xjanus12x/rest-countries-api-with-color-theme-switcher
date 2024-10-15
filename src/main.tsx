import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CountriesProvider } from "./context/CountriesProvider.tsx";
import { CountryList } from "./components/CountryList.tsx";
import CountryDetails from "./components/CountryDetails.tsx";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <CountriesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<CountryList />} />
              <Route path="country/:countryId" element={<CountryDetails />} />
            </Route>
          </Routes>
        </Router>
      </CountriesProvider>
    </ThemeProvider>
  </StrictMode>
);
