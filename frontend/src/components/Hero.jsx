import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";

const CLUB_LOGO = "https://customer-assets.emergentagent.com/job_7c590580-50fa-4ebf-a519-299d708e8357/artifacts/2832tj7i_Herunterladen.png";
const HERO_BG = "https://images.unsplash.com/photo-1768492263433-b81fdcdce0e9?crop=entropy&cs=srgb&fm=jpg&q=85";

export const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight-pitch via-midnight-pitch/80 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-electric-royal/30 rounded-full animate-pulse" />
      <div className="absolute bottom-40 right-40 w-20 h-20 bg-cyber-gold/10 rounded-full blur-xl" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-electric-royal/20 border border-electric-royal/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="font-accent text-cyber-gold text-sm font-semibold">SEIT 1954</span>
          </div>

          {/* Logo */}
          <div className="mb-8 animate-fade-in stagger-1 opacity-0">
            <img 
              src={CLUB_LOGO} 
              alt="SG Siemens München Ost" 
              className="h-32 w-32 object-contain"
            />
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in stagger-2 opacity-0">
            SG SIEMENS<br />
            <span className="text-cyber-gold">MÜNCHEN OST</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-xl animate-fade-in stagger-3 opacity-0">
            Tradition trifft Zukunft. Leidenschaft für den Fußball seit über 70 Jahren.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in stagger-4 opacity-0">
            <Link to="/mitgliedschaft">
              <Button 
                size="lg"
                className="bg-cyber-gold text-midnight-pitch font-heading uppercase tracking-wider hover:bg-yellow-300 rounded-full px-8 py-6 text-lg btn-primary"
                data-testid="hero-cta-mitglied"
              >
                <Users className="w-5 h-5 mr-2" />
                Mitglied werden
              </Button>
            </Link>
            <Link to="/erste-mannschaft">
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-heading uppercase tracking-wider rounded-full px-8 py-6 text-lg"
                data-testid="hero-cta-team"
              >
                Unsere Teams
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-cyber-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
