import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-cyber-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-cyber-gold" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-white mb-1">Cookie-Einstellungen</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                Weitere Informationen finden Sie in unserer{" "}
                <a href="/datenschutz" className="text-electric-royal hover:text-cyber-gold underline">
                  Datenschutzerklärung
                </a>.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Button onClick={acceptNecessary} variant="outline" className="border-white/30 text-white hover:bg-white/10 font-heading uppercase tracking-wider text-sm">
              Nur notwendige
            </Button>
            <Button onClick={acceptAll} className="bg-cyber-gold text-midnight-pitch hover:bg-yellow-300 font-heading uppercase tracking-wider text-sm">
              Alle akzeptieren
            </Button>
          </div>
          <button onClick={acceptNecessary} className="absolute top-4 right-4 lg:relative lg:top-0 lg:right-0 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}