import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Trophy, Users, Target } from "lucide-react";

const CLUB_LOGO = "/assets/logo.png";

const timeline = [
  { year: "1954", event: "Gründung des Vereins" },
  { year: "1970er", event: "Aufbau der Jugendabteilung" },
  { year: "1990er", event: "Etablierung im Münchner Amateurfußball" },
  { year: "2000er", event: "Modernisierung der Sportanlagen" },
  { year: "Heute", event: "3 aktive Mannschaften, starke Gemeinschaft" },
];

const values = [
  { icon: Users, title: "Gemeinschaft", description: "Zusammenhalt und Teamgeist stehen bei uns an erster Stelle." },
  { icon: Trophy, title: "Leidenschaft", description: "Fußball ist unsere Passion - auf und neben dem Platz." },
  { icon: Target, title: "Entwicklung", description: "Wir fördern Spieler jeden Alters und Niveaus." },
];

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="club-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
                Über uns
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">
                Unser Verein
              </h1>
              <p className="text-slate-300 text-lg mt-6 max-w-xl">
                Die SG Siemens München Ost e.V. ist seit 1954 ein fester Bestandteil des Münchner Amateurfußballs. 
                Mit drei aktiven Mannschaften bieten wir Spielern jeden Alters eine sportliche Heimat.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={CLUB_LOGO} 
                alt="SG Siemens München Ost" 
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl text-white mb-8 text-center">Unsere Werte</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-jersey-texture rounded-lg border border-white/10 p-8 text-center">
                <div className="w-16 h-16 bg-electric-royal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-electric-royal" />
                </div>
                <h3 className="font-heading text-xl text-white mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl text-white mb-12 text-center">Unsere Geschichte</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-electric-royal/30 hidden md:block" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-midnight-pitch rounded-lg border border-white/10 p-6 inline-block">
                      <span className="font-accent text-cyber-gold text-2xl font-bold">{item.year}</span>
                      <p className="text-slate-300 mt-2">{item.event}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Point */}
                  <div className="hidden md:flex w-4 h-4 bg-electric-royal rounded-full flex-shrink-0 z-10" />
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
            Mehr erfahren?
          </h2>
          <p className="text-slate-300 text-lg mb-10">
            Lerne unsere Ansprechpartner kennen oder kontaktiere uns direkt.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ansprechpartner">
              <Button 
                size="lg"
                className="bg-cyber-gold text-midnight-pitch font-heading uppercase tracking-wider hover:bg-yellow-300 rounded-full px-8"
              >
                Ansprechpartner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/kontakt">
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-heading uppercase tracking-wider rounded-full px-8"
              >
                Kontakt
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
