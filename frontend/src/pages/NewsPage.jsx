import { NewsCard, InstagramFeed } from "@/components/NewsSection";
import { NEWS_DATA } from "@/data/staticData";

export default function NewsPage() {
  // Statische Daten verwenden
  const news = NEWS_DATA;

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="news-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
            Aktuelles
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            News & Updates
          </h1>
          <p className="text-slate-300 text-lg mt-4 max-w-2xl">
            Alle Neuigkeiten rund um den SG Siemens München Ost e.V.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News List */}
            <div className="lg:col-span-2 space-y-6">
              {news.length > 0 ? (
                news.map((item, index) => (
                  <NewsCard key={item.id} news={item} featured={index === 0} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">Keine News verfügbar.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <InstagramFeed />
              
              {/* Quick Info */}
              <div className="bg-jersey-texture rounded-lg border border-white/10 p-6">
                <h3 className="font-heading text-xl text-white mb-4">Folge uns</h3>
                <p className="text-slate-400 text-sm">
                  Bleibe auf dem Laufenden über aktuelle Spiele, Trainingszeiten und Vereinsevents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
