import { useState, useEffect } from "react";
import { SquadGrid, CoachesGrid } from "@/components/SquadGrid";
import { Skeleton } from "@/components/ui/skeleton";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TEAM_BACKGROUNDS = {
  "erste-mannschaft": "https://images.unsplash.com/photo-1695054486203-fea2173902ee?crop=entropy&cs=srgb&fm=jpg&q=85",
  "zweite-mannschaft": "https://images.unsplash.com/photo-1583505996159-307082cf2085?crop=entropy&cs=srgb&fm=jpg&q=85",
  "traditionsmannschaft": "https://images.unsplash.com/photo-1768492263433-b81fdcdce0e9?crop=entropy&cs=srgb&fm=jpg&q=85",
};

export default function TeamPage({ teamId }) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/teams/${teamId}`);
        if (!response.ok) throw new Error("Team nicht gefunden");
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [teamId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-pitch">
        <div className="h-80 bg-slate-900" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-white mb-4">Fehler</h1>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid={`team-page-${teamId}`}>
      {/* Hero Section */}
      <section className="relative h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEAM_BACKGROUNDS[teamId]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-pitch via-midnight-pitch/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 h-full flex items-end pb-12">
          <div>
            <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
              SG Siemens München Ost
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">
              {team?.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Description */}
        {team?.description && (
          <p className="text-slate-300 text-lg max-w-3xl mb-12">
            {team.description}
          </p>
        )}

        {/* Coaches */}
        {team?.coaches && team.coaches.length > 0 && (
          <CoachesGrid coaches={team.coaches} title="Trainerteam" />
        )}

        {/* Players */}
        {team?.players && team.players.length > 0 && (
          <SquadGrid players={team.players} title="Kader" />
        )}
      </div>
    </div>
  );
}
