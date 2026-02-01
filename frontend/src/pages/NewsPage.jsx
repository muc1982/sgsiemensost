import { NewsCard } from "@/components/NewsSection";
import { NEWS_DATA } from "@/data/staticData";

export default function NewsPage() {
  const news = NEWS_DATA;

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="news-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">Aktuelles</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">News & Updates</h1>
          <p className="text-slate-300 text-lg mt-4 max-w-2xl">Alle Neuigkeiten rund um den SG Siemens München Ost e.V.</p>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-midnight-pitch">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl text-white mb-8">Instagram Feed</h2>
          <p className="text-slate-400 mb-8">Aktuelle Beiträge von unserem Instagram-Kanal @sg_siemens_ost_infineon</p>

          {/* Elfsight Instagram Widget */}
          <div className="elfsight-app-24b2aa4c-5963-40e0-9fd3-9efb2d8686e4" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl text-white mb-8">Vereinsnachrichten</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {news.length > 0 ? (
              news.map((item, index) => (
                <NewsCard key={item.id} news={item} featured={index === 0} />
              ))
            ) : (
              <div className="text-center py-12 col-span-2">
                <p className="text-slate-400">Keine News verfügbar.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}