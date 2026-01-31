import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

export const NewsCard = ({ news, featured = false }) => {
  const { title, excerpt, image_url, published_at } = news;

  if (featured) {
    return (
      <Card className="bg-jersey-texture border-white/10 overflow-hidden group cursor-pointer hover:border-electric-royal/50 transition-colors duration-300">
        <div className="relative h-64 overflow-hidden">
          {image_url ? (
            <img 
              src={image_url} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-electric-royal/20 to-cyber-gold/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-pitch via-transparent to-transparent" />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(published_at)}</span>
          </div>
          <h3 className="font-heading text-2xl text-white group-hover:text-cyber-gold transition-colors duration-300 mb-3">
            {title}
          </h3>
          <p className="text-slate-400 line-clamp-2">{excerpt}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-jersey-texture border-white/10 overflow-hidden group cursor-pointer hover:border-electric-royal/50 transition-colors duration-300">
      <CardContent className="p-4 flex gap-4">
        {image_url && (
          <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
            <img 
              src={image_url} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(published_at)}</span>
          </div>
          <h4 className="font-heading text-base text-white group-hover:text-cyber-gold transition-colors duration-300 line-clamp-2">
            {title}
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export const InstagramFeed = () => {
  const instagramUrl = "https://www.instagram.com/sg_siemens_ost_infineon";
  
  return (
    <div className="bg-jersey-texture rounded-lg border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Instagram className="w-6 h-6 text-pink-500" />
        <h3 className="font-heading text-xl text-white">Instagram</h3>
      </div>
      
      <p className="text-slate-400 text-sm mb-6">
        Folge uns auf Instagram für aktuelle Updates, Spielberichte und Einblicke hinter die Kulissen.
      </p>

      <a 
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button 
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-heading uppercase tracking-wider hover:opacity-90"
          data-testid="instagram-follow-btn"
        >
          <Instagram className="w-4 h-4 mr-2" />
          @sg_siemens_ost_infineon
        </Button>
      </a>
    </div>
  );
};

export const NewsSection = ({ limit = 4, showInstagram = true }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API}/news?limit=${limit}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [limit]);

  if (loading) {
    return (
      <section className="py-24 bg-midnight-pitch">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-800 rounded w-48" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-96 bg-slate-800 rounded" />
              <div className="space-y-4">
                <div className="h-24 bg-slate-800 rounded" />
                <div className="h-24 bg-slate-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredNews = news.find(n => n.is_featured) || news[0];
  const otherNews = news.filter(n => n.id !== featuredNews?.id).slice(0, 3);

  return (
    <section className="py-24 bg-midnight-pitch" data-testid="news-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">Aktuelles</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mt-2">News & Updates</h2>
          </div>
          <Link to="/news">
            <Button 
              variant="outline" 
              className="hidden md:flex border-white/30 text-white hover:bg-white/10 font-heading uppercase tracking-wider"
            >
              Alle News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {featuredNews && <NewsCard news={featuredNews} featured />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent News */}
            {otherNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}

            {/* Instagram Widget */}
            {showInstagram && <InstagramFeed />}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link to="/news">
            <Button 
              className="w-full bg-electric-royal text-white font-heading uppercase tracking-wider"
            >
              Alle News anzeigen
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
