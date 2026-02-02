import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGalleryBySlug } from "@/services/contentful";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

// Lightbox Komponente
const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onPrev, onNext]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 text-white/70 hover:text-white p-2 z-50"
            >
                <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Image */}
            <div className="max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
                <img
                    src={images[currentIndex]}
                    alt={`Bild ${currentIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain"
                />
                <p className="text-center text-white/70 mt-4">
                    {currentIndex + 1} / {images.length}
                </p>
            </div>

            {/* Next Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 text-white/70 hover:text-white p-2 z-50"
            >
                <ChevronRight className="w-10 h-10" />
            </button>
        </div>
    );
};

export default function GalleryDetailPage() {
    const { slug } = useParams();
    const [gallery, setGallery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const loadGallery = async () => {
            setLoading(true);
            try {
                const data = await getGalleryBySlug(slug);
                if (data) {
                    setGallery(data);
                } else {
                    setError('Galerie nicht gefunden');
                }
            } catch (err) {
                console.error('Fehler beim Laden der Galerie:', err);
                setError('Fehler beim Laden der Galerie');
            }
            setLoading(false);
        };

        loadGallery();
    }, [slug]);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrev = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? gallery.images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => 
            prev === gallery.images.length - 1 ? 0 : prev + 1
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-gold mx-auto mb-4"></div>
                    <p className="text-slate-400">Lade Galerie...</p>
                </div>
            </div>
        );
    }

    if (error || !gallery) {
        return (
            <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-4xl text-white mb-4">Fehler</h1>
                    <p className="text-slate-400 mb-8">{error || 'Galerie nicht gefunden'}</p>
                    <Link to="/galerie">
                        <Button className="bg-electric-royal text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Zurück zur Galerie
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-midnight-pitch" data-testid="gallery-detail-page">
            {/* Hero */}
            <section className="py-16 sm:py-24 bg-jersey-texture">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Zurück-Button */}
                    <Link to="/galerie" className="inline-flex items-center text-slate-400 hover:text-white mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück zur Übersicht
                    </Link>

                    {/* Category & Date */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-electric-royal/90 text-white text-sm font-medium rounded-full">
                            {gallery.category}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(gallery.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Images className="w-4 h-4" />
                            <span>{gallery.images.length} Bilder</span>
                        </div>
                    </div>

                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white">
                        {gallery.title}
                    </h1>

                    {gallery.description && (
                        <div className="mt-6 max-w-3xl space-y-4">
                            {String(gallery.description).split('\n').filter(p => p.trim()).map((paragraph, index) => (
                                <p key={index} className="text-slate-300 text-lg leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Image Grid */}
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {gallery.images.map((imageUrl, index) => (
                            <div
                                key={index}
                                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${gallery.title} - Bild ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zurück Button */}
            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="pt-8 border-t border-white/10">
                        <Link to="/galerie">
                            <Button className="bg-electric-royal text-white hover:bg-electric-royal/80">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Alle Galerien anzeigen
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={gallery.images}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onPrev={goToPrev}
                    onNext={goToNext}
                />
            )}
        </div>
    );
}
