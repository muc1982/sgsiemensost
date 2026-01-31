import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, Trophy, Heart, ArrowRight } from "lucide-react";

const benefits = [
  "Aktive Teilnahme am Spielbetrieb",
  "Kostenlose Nutzung der Sportanlagen",
  "Vergünstigungen bei Vereinsevents",
  "Teil einer starken Gemeinschaft",
  "Zugang zu Trainingsmöglichkeiten",
  "Mitgestaltung des Vereinslebens",
];

const membershipTypes = [
  {
    title: "Aktives Mitglied",
    icon: Trophy,
    description: "Für alle, die aktiv am Spielbetrieb teilnehmen möchten.",
    features: ["Spielberechtigung", "Trainingsteilnahme", "Vereinsausweis"],
  },
  {
    title: "Passives Mitglied",
    icon: Heart,
    description: "Unterstütze den Verein, ohne aktiv zu spielen.",
    features: ["Vereinsmitgliedschaft", "Event-Einladungen", "Newsletter"],
  },
  {
    title: "Fördermitglied",
    icon: Users,
    description: "Für Unternehmen und Privatpersonen, die uns unterstützen möchten.",
    features: ["Sponsoring-Optionen", "Nennung auf Website", "VIP-Zugang bei Events"],
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="membership-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
            Mitgliedschaft
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            Werde Mitglied
          </h1>
          <p className="text-slate-300 text-lg mt-4 max-w-2xl">
            Werde Teil unserer Fußballfamilie und erlebe Gemeinschaft, Leidenschaft und sportliche Erfolge hautnah mit.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl text-white mb-8">Deine Vorteile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-jersey-texture rounded-lg p-4 border border-white/10">
                <div className="w-8 h-8 bg-electric-royal/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-cyber-gold" />
                </div>
                <span className="text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-16 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl text-white mb-8">Mitgliedschaftsarten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTypes.map((type, index) => (
              <Card key={index} className="bg-midnight-pitch border-white/10 hover:border-electric-royal/50 transition-colors duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-electric-royal/20 rounded-lg flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-electric-royal" />
                  </div>
                  <CardTitle className="font-heading text-xl text-white">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <Check className="w-4 h-4 text-cyber-gold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
            Interesse geweckt?
          </h2>
          <p className="text-slate-300 text-lg mb-10">
            Kontaktiere uns für weitere Informationen zur Mitgliedschaft oder komm einfach bei einem Training vorbei!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/kontakt">
              <Button 
                size="lg"
                className="bg-cyber-gold text-midnight-pitch font-heading uppercase tracking-wider hover:bg-yellow-300 rounded-full px-8"
                data-testid="membership-contact-btn"
              >
                Kontakt aufnehmen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/ansprechpartner">
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-heading uppercase tracking-wider rounded-full px-8"
              >
                Ansprechpartner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
