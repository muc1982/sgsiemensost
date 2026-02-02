import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Calendar, ArrowRight } from "lucide-react";

const teams = [
  { id: "erste-mannschaft", name: "1. Mannschaft", description: "Unsere erste Mannschaft in der Kreisliga" },
  { id: "zweite-mannschaft", name: "2. Mannschaft", description: "Entwicklung und Aufbau für die Zukunft" },
  { id: "traditionsmannschaft", name: "Traditionsmannschaft", description: "Vereinslegenden im aktiven Einsatz" },
];

const stats = [
  { icon: Users, value: "70+", label: "Jahre Tradition" },
  { icon: Trophy, value: "3", label: "Mannschaften" },
  { icon: Calendar, value: "1954", label: "Gegründet" },
];

const TeamsSection = () => {
  return (
    <section className="py-24 bg-jersey-texture" data-testid="teams-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">Unsere Teams</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-2">Mannschaften</h2>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <Link 
              key={team.id} 
              to={`/${team.id}`}
              className="group"
              data-testid={`team-card-${team.id}`}
            >
              <div className="relative bg-midnight-pitch rounded-lg border border-white/10 p-8 h-full overflow-hidden hover:border-electric-royal/50 transition-colors duration-300">
                {/* Glow Effect */}
                <div className="absolute inset-0 card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Team Number */}
                <div className="absolute top-4 right-4">
                  <span className="font-accent text-6xl font-bold text-white/5 group-hover:text-electric-royal/20 transition-colors duration-300">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl text-white group-hover:text-cyber-gold transition-colors duration-300 mb-3">
                    {team.name}
                  </h3>
                  <p className="text-slate-400 mb-6">{team.description}</p>
                  <div className="flex items-center text-electric-royal group-hover:text-cyber-gold transition-colors duration-300">
                    <span className="text-sm font-medium">Zum Team</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-electric-royal" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-10 h-10 text-cyber-gold mx-auto mb-4" />
              <div className="font-accent text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 bg-midnight-pitch relative overflow-hidden" data-testid="cta-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-electric-royal rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyber-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">Werde Teil des Teams</span>
        <h2 className="font-heading text-4xl md:text-5xl text-white mt-4 mb-6">
          Mitglied werden
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
          Werde Teil unserer Fußballfamilie und erlebe Gemeinschaft, Leidenschaft und sportliche Erfolge hautnah mit.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/mitgliedschaft">
            <Button 
              size="lg"
              className="bg-cyber-gold text-midnight-pitch font-heading uppercase tracking-wider hover:bg-yellow-300 rounded-full px-8"
              data-testid="cta-join-btn"
            >
              Jetzt Mitglied werden
            </Button>
          </Link>
          <Link to="/kontakt">
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-heading uppercase tracking-wider rounded-full px-8"
            >
              Kontakt aufnehmen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <Hero />
      <StatsSection />
      <TeamsSection />
      <NewsSection />
      <CTASection />
    </div>
  );
}
