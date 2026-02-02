import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Instagram, ChevronDown, ArrowLeft, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Logo aus public/assets Ordner
const CLUB_LOGO = "/assets/logo.png";

// Zurück Button Komponente
export const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-2 bg-electric-royal hover:bg-blue-600 text-white font-heading uppercase tracking-wider px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 touch-manipulation ${className}`}
      data-testid="back-button"
    >
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-sm sm:text-base">Zurück</span>
    </button>
  );
};

// Scroll to Top Button Komponente
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-electric-royal hover:bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 touch-manipulation ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      data-testid="scroll-to-top-button"
      aria-label="Nach oben scrollen"
    >
      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
};

const navLinks = [
  { name: "Über Uns", path: "/ueber-uns" },
  { name: "Verein", path: "/verein" },
  { 
    name: "Mannschaften", 
    children: [
      { name: "1. Mannschaft", path: "/erste-mannschaft" },
      { name: "2. Mannschaft", path: "/zweite-mannschaft" },
      { name: "Traditionsmannschaft", path: "/traditionsmannschaft" },
    ]
  },
  { name: "News", path: "/news" },
  { name: "Galerie", path: "/galerie" },
  { name: "Ansprechpartner", path: "/ansprechpartner" },
  { name: "Kontakt", path: "/kontakt" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" data-testid="header">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img 
              src={CLUB_LOGO} 
              alt="SG Siemens München Ost" 
              className="h-14 w-14 object-contain"
            />
            <span className="hidden md:block font-heading text-lg text-white tracking-wide">
              SG Siemens München Ost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              link.children ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="nav-link font-heading text-sm uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1">
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-900 border-slate-700">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.path} asChild>
                        <Link 
                          to={child.path}
                          className={`font-heading text-sm uppercase tracking-wider ${
                            isActive(child.path) ? 'text-cyber-gold' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link font-heading text-sm uppercase tracking-wider ${
                    isActive(link.path) ? 'text-cyber-gold' : 'text-slate-300 hover:text-white'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/mitgliedschaft">
              <Button 
                className="bg-cyber-gold text-midnight-pitch font-heading uppercase tracking-wider hover:bg-yellow-300 rounded-full px-6"
                data-testid="cta-mitglied"
              >
                Mitglied werden
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700" data-testid="mobile-menu">
          <nav className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.name} className="space-y-2">
                  <span className="font-heading text-sm uppercase tracking-wider text-slate-400">
                    {link.name}
                  </span>
                  <div className="pl-4 space-y-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block font-heading text-sm uppercase tracking-wider ${
                          isActive(child.path) ? 'text-cyber-gold' : 'text-slate-300'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block font-heading text-sm uppercase tracking-wider ${
                    isActive(link.path) ? 'text-cyber-gold' : 'text-slate-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link 
              to="/mitgliedschaft"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="w-full bg-cyber-gold text-midnight-pitch font-heading uppercase tracking-wider hover:bg-yellow-300 rounded-full mt-4">
                Mitglied werden
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-12 sm:py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Club Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <img 
                src={CLUB_LOGO} 
                alt="SG Siemens München Ost" 
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              SG Siemens München Ost e.V.<br />
              Tradition seit 1954
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base sm:text-lg text-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/verein" className="text-slate-400 hover:text-cyber-gold text-sm">Verein</Link></li>
              <li><Link to="/erste-mannschaft" className="text-slate-400 hover:text-cyber-gold text-sm">1. Mannschaft</Link></li>
              <li><Link to="/news" className="text-slate-400 hover:text-cyber-gold text-sm">News</Link></li>
              <li><Link to="/kontakt" className="text-slate-400 hover:text-cyber-gold text-sm">Kontakt</Link></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-heading text-base sm:text-lg text-white mb-3 sm:mb-4">Adresse</h4>
            <address className="text-slate-400 text-sm not-italic leading-relaxed">
              St.-Cajetan-Straße 33<br />
              81669 München<br />
              Deutschland
            </address>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-base sm:text-lg text-white mb-3 sm:mb-4">Folge Uns</h4>
            <a 
              href="https://www.instagram.com/sg_siemens_ost_infineon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyber-gold"
              data-testid="instagram-link"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-xs sm:text-sm">@sg_siemens_ost_infineon</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} SG Siemens München Ost e.V. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 sm:gap-8">
            <Link 
              to="/impressum" 
              className="text-slate-500 hover:text-white text-xs sm:text-sm py-3 px-3 -my-3 -mx-3 touch-manipulation inline-block min-w-[80px] text-center" 
              data-testid="footer-impressum-link"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              Impressum
            </Link>
            <Link 
              to="/datenschutz" 
              className="text-slate-500 hover:text-white text-xs sm:text-sm py-3 px-3 -my-3 -mx-3 touch-manipulation inline-block min-w-[80px] text-center" 
              data-testid="footer-datenschutz-link"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
