import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Images, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGalleries } from "@/services/contentful";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

const GalleryCard = ({ gallery }) => {
    const { title, slug, description, date, category, cover_image, image_count } = gallery;
    // Nur ersten Absatz als Vorschau zeigen
    const previewText = description ? String(description).split('\n')[0] : '';

    return (
        <Link to={`/galerie/${slug}`}>
            <div className="group relative bg-jersey-texture rounded-lg overflow-hidden border border-white/10 hover:border-cyber-gold/50 transition-all duration-300">
                {/* Cover Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                    {cover_image ? (
                        <img
                            src={cover_image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-electric-royal/20 to-cyber-gold/10 flex items-center justify-center">
                            <Images className="w-12 h-12 text-slate-600" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-pitch via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-electric-royal/90 text-white text-xs font-medium rounded-full">
                            {category}
                        </span>
                    </div>

                    {/* Image Count */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-midnight-pitch/80 px-2 py-1 rounded">
                        <Images className="w-4 h-4 text-cyber-gold" />
                        <span className="text-white text-sm">{image_count}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(date)}</span>
                    </div>
                    <h3 className="font-heading text-lg text-white group-hover:text-cyber-gold transition-colors duration-300 line-clamp-2">
                        {title}
                    </h3>
                    {previewText && (
                        <p className="text-slate-400 text-sm mt-2 line-clamp-3 leading-relaxed">
                            {previewText}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default function GalleryPage() {
    const [galleries, setGalleries] = useState([]);
    const [filteredGalleries, setFilteredGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Alle');

    const categories = ['Alle', 'Nostalgie', 'Feier', 'Spiel', 'Veranstaltung', 'Training'];

    useEffect(() => {
        const loadGalleries = async () => {
            setLoading(true);
            try {
                const data = await getGalleries();
                setGalleries(data);
                setFilteredGalleries(data);
            } catch (error) {
                console.error('Fehler beim Laden der Galerien:', error);
            }
            setLoading(false);
        };

        loadGalleries();
    }, []);

    useEffect(() => {
        if (activeFilter === 'Alle') {
            setFilteredGalleries(galleries);
        } else {
            setFilteredGalleries(galleries.filter(g => g.category === activeFilter));
        }
    }, [activeFilter, galleries]);

    return (
        <div className="min-h-screen bg-midnight-pitch" data-testid="gallery-page">
            {/* Hero */}
            <section className="py-24 bg-jersey-texture">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
                        Eindrücke
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">
                        Galerie
                    </h1>
                    <p className="text-slate-300 text-lg mt-4 max-w-2xl">
                        Bilder von unseren Spielen, Feiern und Veranstaltungen.
                    </p>
                </div>
            </section>

            {/* Filter */}
            <section className="py-8 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <Filter className="w-5 h-5 text-slate-400" />
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeFilter === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveFilter(category)}
                                className={activeFilter === category 
                                    ? "bg-cyber-gold text-midnight-pitch hover:bg-yellow-300" 
                                    : "border-white/20 text-slate-300 hover:text-white hover:border-white/40"
                                }
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-gold mx-auto mb-4"></div>
                            <p className="text-slate-400">Lade Galerien...</p>
                        </div>
                    ) : filteredGalleries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGalleries.map((gallery) => (
                                <GalleryCard key={gallery.id} gallery={gallery} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Images className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400">Keine Galerien gefunden.</p>
                            <p className="text-slate-500 text-sm mt-2">
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
