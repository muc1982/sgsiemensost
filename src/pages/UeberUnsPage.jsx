import { useState, useEffect } from "react";
import { Calendar, Users, Trophy, Heart } from "lucide-react";
import { BackButton } from "@/components/Layout";
import { getAboutUs } from "@/services/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

// Statische Fallback-Daten
const STATIC_ABOUT_DATA = {
  title: "Über Uns",
  subtitle: "Tradition trifft Zukunft seit 1954",
  heroImage: "/assets/Mannschaftsfoto2025.jpg",
  foundingYear: 1954,
  content: null, // Rich Text kommt von Contentful
  staticContent: {
    intro: `Die SG Siemens München Ost e.V. ist mehr als nur ein Fußballverein – wir sind eine Familie, die seit über 70 Jahren den Fußballsport in München-Ost lebt und liebt.`,
    history: {
      title: "Unsere Geschichte",
      text: `Gegründet im Jahr 1954 als Betriebssportgruppe der Siemens AG, hat sich unser Verein über die Jahrzehnte zu einem wichtigen Bestandteil der lokalen Fußballkultur entwickelt. Was als kleine Gruppe fußballbegeisterter Mitarbeiter begann, ist heute ein Verein mit mehreren Mannschaften und einer lebendigen Gemeinschaft.

In den Anfangsjahren spielten wir auf provisorischen Plätzen und trainierten nach Feierabend. Der Zusammenhalt und die Leidenschaft für den Sport haben uns durch alle Höhen und Tiefen getragen. Heute blicken wir stolz auf eine Geschichte zurück, die von unvergesslichen Momenten, großartigen Spielern und vor allem von echter Kameradschaft geprägt ist.`
    },
    values: {
      title: "Unsere Werte",
      items: [
        {
          icon: "users",
          title: "Gemeinschaft",
          text: "Bei uns steht der Mensch im Mittelpunkt. Egal ob jung oder alt, Anfänger oder erfahrener Spieler – jeder ist willkommen."
        },
        {
          icon: "trophy",
          title: "Sportliche Entwicklung",
          text: "Wir fördern jeden Spieler individuell und arbeiten kontinuierlich an der sportlichen Weiterentwicklung unserer Mannschaften."
        },
        {
          icon: "heart",
          title: "Leidenschaft",
          text: "Fußball ist für uns mehr als ein Hobby. Es ist Leidenschaft, die uns verbindet und jeden Spieltag aufs Neue antreibt."
        }
      ]
    },
    teams: {
      title: "Unsere Mannschaften",
      text: `Mit unserer 1. Mannschaft, 2. Mannschaft und Traditionsmannschaft bieten wir Spielern aller Altersklassen und Leistungsstufen eine sportliche Heimat. Jede Mannschaft hat ihren eigenen Charakter, aber alle verbindet der gleiche Teamgeist und die Freude am Spiel.`
    },
    future: {
      title: "Blick in die Zukunft",
      text: `Wir ruhen uns nicht auf unserer Geschichte aus. Mit modernster Infrastruktur, engagierten Trainern und einer wachsenden Mitgliederzahl gestalten wir aktiv die Zukunft unseres Vereins. Unser Ziel ist es, den Fußballsport in München-Ost weiter zu stärken und noch mehr Menschen für unsere Leidenschaft zu begeistern.`
    }
  }
};

// Rich Text Rendering Optionen für Contentful
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="font-heading text-3xl md:text-4xl text-white mt-12 mb-6">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="font-heading text-2xl md:text-3xl text-white mt-10 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="font-heading text-xl md:text-2xl text-cyber-gold mt-8 mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="font-heading text-lg text-white mt-6 mb-2">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside text-slate-300 mb-6 space-y-2 ml-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-inside text-slate-300 mb-6 space-y-2 ml-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="text-slate-300">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-cyber-gold pl-6 my-6 italic text-slate-400 text-lg">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="border-white/20 my-10" />
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title } = node.data.target.fields;
      return (
        <img
          src={`https:${file.url}`}
          alt={title || 'Bild'}
          className="w-full rounded-lg my-8"
        />
      );
    },
  },
  renderMark: {
    bold: (text) => <strong className="font-bold text-white">{text}</strong>,
    italic: (text) => <em className="italic">{text}</em>,
    underline: (text) => <u className="underline">{text}</u>,
  },
};

// Icon Komponente
const ValueIcon = ({ icon }) => {
  const iconClass = "w-8 h-8 text-cyber-gold";
  switch (icon) {
    case "users":
      return <Users className={iconClass} />;
    case "trophy":
      return <Trophy className={iconClass} />;
    case "heart":
      return <Heart className={iconClass} />;
    default:
      return <Users className={iconClass} />;
  }
};

export default function UeberUnsPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getAboutUs(STATIC_ABOUT_DATA);
        setPageData(data || STATIC_ABOUT_DATA);
      } catch (error) {
        console.error('Fehler beim Laden:', error);
        setPageData(STATIC_ABOUT_DATA);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-gold mx-auto mb-4"></div>
          <p className="text-slate-400">Lade Inhalte...</p>
        </div>
      </div>
    );
  }

  const data = pageData || STATIC_ABOUT_DATA;
  const hasContentfulContent = data.content && typeof data.content === 'object';
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - (data.foundingYear || 1954);

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="ueber-uns-page">
      {/* Hero Section mit Bild */}
      <section className="relative h-72 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${data.heroImage || STATIC_ABOUT_DATA.heroImage})`,
            backgroundPosition: 'center 35%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-pitch via-midnight-pitch/50 to-transparent" />
        
        {/* Zurück Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <BackButton />
        </div>
      </section>

      {/* Titel Section */}
      <section className="pt-8 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
            SG Siemens München Ost e.V.
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white mt-2">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-slate-300 text-lg sm:text-xl mt-4 max-w-2xl">
              {data.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 bg-jersey-texture rounded-xl border border-white/10 p-6 sm:p-8">
            <div className="text-center">
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-cyber-gold">{yearsActive}+</span>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Jahre Tradition</p>
            </div>
            <div className="text-center border-x border-white/10">
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-cyber-gold">3</span>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Mannschaften</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-cyber-gold">{data.foundingYear}</span>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Gegründet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          
          {/* Contentful Rich Text Content */}
          {hasContentfulContent ? (
            <div className="prose prose-invert max-w-none">
              {documentToReactComponents(data.content, richTextOptions)}
            </div>
          ) : (
            /* Statischer Fallback Content */
            <div className="space-y-12">
              {/* Intro */}
              <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
                {STATIC_ABOUT_DATA.staticContent.intro}
              </p>

              {/* Geschichte */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">
                  {STATIC_ABOUT_DATA.staticContent.history.title}
                </h2>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {STATIC_ABOUT_DATA.staticContent.history.text}
                </div>
              </div>

              {/* Werte */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
                  {STATIC_ABOUT_DATA.staticContent.values.title}
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {STATIC_ABOUT_DATA.staticContent.values.items.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-jersey-texture rounded-xl border border-white/10 p-6 hover:border-cyber-gold/50 transition-colors"
                    >
                      <div className="mb-4">
                        <ValueIcon icon={item.icon} />
                      </div>
                      <h3 className="font-heading text-lg text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mannschaften */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">
                  {STATIC_ABOUT_DATA.staticContent.teams.title}
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {STATIC_ABOUT_DATA.staticContent.teams.text}
                </p>
              </div>

              {/* Zukunft */}
              <div className="bg-gradient-to-r from-electric-royal/20 to-cyber-gold/10 rounded-xl border border-electric-royal/30 p-6 sm:p-8">
                <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">
                  {STATIC_ABOUT_DATA.staticContent.future.title}
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {STATIC_ABOUT_DATA.staticContent.future.text}
                </p>
              </div>
            </div>
          )}

          {/* Last Updated */}
          {data.lastUpdated && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-slate-500 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Zuletzt aktualisiert: {new Date(data.lastUpdated).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
