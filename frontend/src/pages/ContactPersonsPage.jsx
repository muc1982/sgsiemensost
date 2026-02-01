import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { getContactPersons } from "@/services/contentful";
import { CONTACT_PERSONS } from "@/data/staticData";

const PersonCard = ({ person }) => {
  const { name, role, image_url } = person;

  return (
    <div 
      className="player-card relative bg-jersey-texture rounded-lg overflow-hidden border border-white/10 group"
      data-testid={`person-card-${name?.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="absolute inset-0 card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Person Image */}
      <div className="relative h-48 overflow-hidden bg-slate-800/50">
        {image_url ? (
          <img 
            src={image_url} 
            alt={name}
            className="player-image w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-slate-600" />
          </div>
        )}
      </div>

      {/* Person Info */}
      <div className="p-3 sm:p-4 relative z-10">
        <h3 className="font-heading text-sm sm:text-base md:text-lg text-white group-hover:text-cyber-gold transition-colors duration-300 truncate">
          {name}
        </h3>
        <p className="text-electric-royal text-xs sm:text-sm mt-1">{role}</p>
      </div>
    </div>
  );
};

export default function ContactPersonsPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPersons = async () => {
      setLoading(true);
      try {
        // Statische Daten als Basis, Contentful-Daten werden hinzugefügt
        const mergedPersons = await getContactPersons(CONTACT_PERSONS);
        setPersons(mergedPersons);
      } catch (error) {
        console.error('Fehler beim Laden der Ansprechpartner:', error);
        setPersons(CONTACT_PERSONS);
      }
      setLoading(false);
    };

    loadPersons();
  }, []);

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="contact-persons-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
            Team
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            Ansprechpartner
          </h1>
          <p className="text-slate-300 text-lg mt-4 max-w-2xl">
            Unser Vorstand und die Ansprechpartner des Vereins stehen dir bei Fragen gerne zur Verfügung.
          </p>
        </div>
      </section>

      {/* Persons Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-2xl sm:text-3xl text-white mb-8 uppercase">Unser Vorstand</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-gold mx-auto mb-4"></div>
              <p className="text-slate-400">Lade Ansprechpartner...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {persons.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
