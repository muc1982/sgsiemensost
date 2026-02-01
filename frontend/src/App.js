import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import TeamPage from "@/pages/TeamPage";
import NewsPage from "@/pages/NewsPage";
import ContactPage from "@/pages/ContactPage";
import MembershipPage from "@/pages/MembershipPage";
import ClubPage from "@/pages/ClubPage";
import ContactPersonsPage from "@/pages/ContactPersonsPage";
import ImpressumPage from "@/pages/ImpressumPage";
import DatenschutzPage from "@/pages/DatenschutzPage";
import CookieConsent from "@/components/CookieConsent";

function App() {
  return (
    <div className="App min-h-screen bg-midnight-pitch">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="verein" element={<ClubPage />} />
            <Route path="erste-mannschaft" element={<TeamPage teamId="erste-mannschaft" />} />
            <Route path="zweite-mannschaft" element={<TeamPage teamId="zweite-mannschaft" />} />
            <Route path="traditionsmannschaft" element={<TeamPage teamId="traditionsmannschaft" />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="kontakt" element={<ContactPage />} />
            <Route path="mitgliedschaft" element={<MembershipPage />} />
            <Route path="ansprechpartner" element={<ContactPersonsPage />} />
            <Route path="impressum" element={<ImpressumPage />} />
            <Route path="datenschutz" element={<DatenschutzPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <CookieConsent />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;