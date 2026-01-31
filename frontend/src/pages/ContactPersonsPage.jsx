import { useState, useEffect } from "react";
import { User, Mail, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PersonCard = ({ person }) => {
  const { name, role, email, phone, image_url } = person;

  return (
    <div 
      className="player-card relative bg-jersey-texture rounded-lg overflow-hidden border border-white/10 group"
      data-testid={`person-card-${name?.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="absolute inset-0 card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Person Image */}
      <div className="relative h-56 overflow-hidden bg-slate-800">
        {image_url ? (
          <img 
            src={image_url} 
            alt={name}
            className="player-image w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-700 to-slate-800">
            <User className="w-20 h-20 text-slate-600" />
          </div>
        )}
      </div>

      {/* Person Info */}
      <div className="p-6 relative z-10">
        <h3 className="font-heading text-xl text-white group-hover:text-cyber-gold transition-colors duration-300">
          {name}
        </h3>
        <p className="text-electric-royal text-sm mt-1 font-medium">{role}</p>
        
        {/* Contact Info */}
        <div className="mt-4 space-y-2">
          {email && (
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-slate-400 hover:text-cyber-gold text-sm"
            >
              <Mail className="w-4 h-4" />
              {email}
            </a>
          )}
          {phone && (
            <a 
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-slate-400 hover:text-cyber-gold text-sm"
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ContactPersonsPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch(`${API}/contact-persons`);
        const data = await response.json();
        setPersons(data);
      } catch (error) {
        console.error("Error fetching contact persons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersons();
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
          <h2 className="font-heading text-3xl text-white mb-8">Unser Vorstand</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
