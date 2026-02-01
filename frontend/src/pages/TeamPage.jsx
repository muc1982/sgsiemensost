import { useState, useEffect } from "react";
import { SquadGrid, CoachesGrid } from "@/components/SquadGrid";
import { getTeamData } from "@/services/contentful";
import { TEAMS_DATA } from "@/data/staticData";

const TEAM_BACKGROUNDS = {
  "erste-mannschaft": "/assets/Mannschaftsfoto2025.jpg",
  "zweite-mannschaft": "/assets/Mannschaftsfoto2025.jpg",
  "traditionsmannschaft": "/assets/Mannschaftsfoto2025.jpg",
};

export default function TeamPage({ teamId }) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      setLoading(true);
      try {
        // Statische Daten als Basis holen
        const staticData = TEAMS_DATA[teamId];
        
        // Contentful-Daten laden und mit statischen Daten zusammenführen
        const mergedData = await getTeamData(teamId, staticData);
        setTeam(mergedData);
      } catch (error) {
        console.error('Fehler beim Laden:', error);
        // Fallback zu statischen Daten bei Fehler
        setTeam(TEAMS_DATA[teamId] || null);
      }
      setLoading(false);
    };

    loadTeam();
  }, [teamId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-gold mx-auto mb-4"></div>
          <p className="text-slate-400">Lade Team-Daten...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-white mb-4">Fehler</h1>
          <p className="text-slate-400">Team nicht gefunden</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid={`team-page-${teamId}`}>
      {/* Hero Section - NUR BILD */}
      <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{ 
            backgroundImage: `url(${TEAM_BACKGROUNDS[teamId]})`,
            backgroundPosition: 'center 35%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-pitch via-midnight-pitch/10 to-transparent" />
      </section>

      {/* Titel UNTER dem Bild */}
      <section className="pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
            SG Siemens München Ost
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            {team.name}
          </h1>
          {/* Description */}
          {team.description && (
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-4">
              {team.description}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
        {/* Coaches */}
        {team.coaches && team.coaches.length > 0 && (
          <CoachesGrid coaches={team.coaches} title="Trainerteam" />
        )}

        {/* Players */}
        {team.players && team.players.length > 0 && (
          <SquadGrid players={team.players} title="Kader" />
        )}
      </div>
    </div>
  );
}