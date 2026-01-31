import { User } from "lucide-react";

const DEFAULT_PLAYER_IMAGE = "https://images.unsplash.com/photo-1637559508411-e6d65573efff?crop=entropy&cs=srgb&fm=jpg&q=85&w=400";

export const PlayerCard = ({ player, variant = "default" }) => {
  const { name, position, number, image_url, is_captain } = player;
  
  const cardClasses = {
    default: "col-span-1 row-span-1",
    captain: "col-span-1 sm:col-span-2 row-span-1",
    goalkeeper: "col-span-1 row-span-1 sm:row-span-2",
  };

  const getVariant = () => {
    if (is_captain) return "captain";
    if (position === "Torwart") return "goalkeeper";
    return variant;
  };

  const currentVariant = getVariant();

  return (
    <div 
      className={`player-card relative bg-jersey-texture rounded-lg overflow-hidden border border-white/10 group ${cardClasses[currentVariant]}`}
      data-testid={`player-card-${name?.toLowerCase().replace(/\s/g, '-')}`}
    >
      {/* Card Glow Effect */}
      <div className="absolute inset-0 card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Player Number */}
      {number && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <span className="font-accent text-2xl sm:text-3xl md:text-4xl font-bold text-cyber-gold/80 group-hover:text-cyber-gold transition-colors duration-300">
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

      {/* Player Image */}
      <div className={`relative ${currentVariant === 'goalkeeper' ? 'h-48 sm:h-64' : 'h-40 sm:h-48'} overflow-hidden bg-slate-800`}>
        {image_url ? (
          <img 
            src={image_url} 
            alt={name}
            className="player-image w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-700 to-slate-800">
            <User className="w-16 h-16 sm:w-20 sm:h-20 text-slate-600" />
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
      
      {/* Coach Image */}
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

      {/* Coach Info */}
      <div className="p-4 relative z-10">
        <h3 className="font-heading text-lg text-white group-hover:text-cyber-gold transition-colors duration-300">
          {name}
        </h3>
        <p className="text-electric-royal text-sm mt-1 font-medium">{role}</p>
      </div>
    </div>
  );
};

export const SquadGrid = ({ players = [], title = "Kader" }) => {
  // Sort players: Captain first, then Goalkeeper, then by number
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.is_captain) return -1;
    if (b.is_captain) return 1;
    if (a.position === "Torwart") return -1;
    if (b.position === "Torwart") return 1;
    return (a.number || 99) - (b.number || 99);
  });

  return (
    <section className="py-12 sm:py-16" data-testid="squad-grid">
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8">{title}</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sortedPlayers.map((player, index) => (
          <PlayerCard 
            key={player.id || index} 
            player={player}
          />
        ))}
      </div>
    </section>
  );
};

export const CoachesGrid = ({ coaches = [], title = "Trainerteam" }) => {
  return (
    <section className="py-12 sm:py-16" data-testid="coaches-grid">
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {coaches.map((coach, index) => (
          <CoachCard key={coach.id || index} coach={coach} />
        ))}
      </div>
    </section>
  );
};

export default SquadGrid;
