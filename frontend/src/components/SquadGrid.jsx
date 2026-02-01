import { User } from "lucide-react";

export const PlayerCard = ({ player }) => {
  const { name, position, number, image_url, is_captain } = player;

  return (
    <div 
      className="player-card relative bg-jersey-texture rounded-lg overflow-hidden border border-white/10 group"
      data-testid={`player-card-${name?.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="absolute inset-0 card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Player Number */}
      {number && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <span className="font-accent text-2xl sm:text-3xl font-bold text-cyber-gold/80 group-hover:text-cyber-gold transition-colors duration-300">
            {number}
          </span>
        </div>
      )}

      {/* Captain Badge */}
      {is_captain && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-cyber-gold text-midnight-pitch px-2 py-0.5 sm:py-1 rounded text-xs font-heading uppercase">
          Kapitän
        </div>
      )}

      {/* Player Image - FESTE HÖHE */}
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

      {/* Player Info */}
      <div className="p-3 sm:p-4 relative z-10">
        <h3 className="font-heading text-sm sm:text-base md:text-lg text-white group-hover:text-cyber-gold transition-colors duration-300 truncate">
          {name}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">{position}</p>
      </div>
    </div>
  );
};

export const CoachCard = ({ coach }) => {
  const { name, role, image_url } = coach;

  return (
    <div 
      className="player-card relative bg-jersey-texture rounded-lg overflow-hidden border border-white/10 group"
      data-testid={`coach-card-${name?.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="absolute inset-0 card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Coach Image - GLEICHE HÖHE wie Spieler */}
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

      {/* Coach Info */}
      <div className="p-3 sm:p-4 relative z-10">
        <h3 className="font-heading text-sm sm:text-base md:text-lg text-white group-hover:text-cyber-gold transition-colors duration-300 truncate">
          {name}
        </h3>
        <p className="text-electric-royal text-xs sm:text-sm mt-1">{role}</p>
      </div>
    </div>
  );
};

export const SquadGrid = ({ players = [], title = "Kader" }) => {
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.is_captain) return -1;
    if (b.is_captain) return 1;
    if (a.position === "Torwart") return -1;
    if (b.position === "Torwart") return 1;
    return (a.number || 99) - (b.number || 99);
  });

  return (
    <section className="py-12" data-testid="squad-grid">
      <h2 className="font-heading text-2xl sm:text-3xl text-white mb-8 uppercase">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {sortedPlayers.map((player, index) => (
          <PlayerCard key={player.id || index} player={player} />
        ))}
      </div>
    </section>
  );
};

export const CoachesGrid = ({ coaches = [], title = "Trainerteam" }) => {
  return (
    <section className="py-12" data-testid="coaches-grid">
      <h2 className="font-heading text-2xl sm:text-3xl text-white mb-8 uppercase">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {coaches.map((coach, index) => (
          <CoachCard key={coach.id || index} coach={coach} />
        ))}
      </div>
    </section>
  );
};

export default SquadGrid;
