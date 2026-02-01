import { SquadGrid, CoachesGrid } from "@/components/SquadGrid";
import { TEAMS_DATA } from "@/data/staticData";

const TEAM_BACKGROUNDS = {
  "erste-mannschaft": "https://images.unsplash.com/photo-1695054486203-fea2173902ee?crop=entropy&cs=srgb&fm=jpg&q=85",
  "zweite-mannschaft": "https://images.unsplash.com/photo-1583505996159-307082cf2085?crop=entropy&cs=srgb&fm=jpg&q=85",
  "traditionsmannschaft": "https://images.unsplash.com/photo-1768492263433-b81fdcdce0e9?crop=entropy&cs=srgb&fm=jpg&q=85",
};

export default function TeamPage({ teamId }) {
  const team = TEAMS_DATA[teamId];

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
      {/* Hero Section */}
      <section className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEAM_BACKGROUNDS[teamId]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-pitch via-midnight-pitch/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-full flex items-end pb-8 sm:pb-12">
          <div>
            <span className="font-accent text-cyber-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
              SG Siemens München Ost
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-2">
              {team.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
        {/* Description */}
        {team.description && (
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mb-8">
            {team.description}
          </p>
        )}

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
