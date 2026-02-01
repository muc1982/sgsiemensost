import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { createClient } from 'contentful';

// Contentful Client
const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

// Rich Text Rendering Optionen
const richTextOptions = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>
        ),
        [BLOCKS.HEADING_1]: (node, children) => (
            <h1 className="font-heading text-3xl text-white mt-8 mb-4">{children}</h1>
        ),
        [BLOCKS.HEADING_2]: (node, children) => (
            <h2 className="font-heading text-2xl text-white mt-6 mb-3">{children}</h2>
        ),
        [BLOCKS.HEADING_3]: (node, children) => (
            <h3 className="font-heading text-xl text-cyber-gold mt-6 mb-3">{children}</h3>
        ),
        [BLOCKS.HEADING_4]: (node, children) => (
            <h4 className="font-heading text-lg text-white mt-4 mb-2">{children}</h4>
        ),
        [BLOCKS.UL_LIST]: (node, children) => (
            <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2">{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (node, children) => (
            <li>{children}</li>
        ),
        [BLOCKS.QUOTE]: (node, children) => (
            <blockquote className="border-l-4 border-cyber-gold pl-4 my-4 italic text-slate-400">
                {children}
            </blockquote>
        ),
        [BLOCKS.HR]: () => (
            <hr className="border-white/20 my-8" />
        ),
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { file, title } = node.data.target.fields;
            return (
                <img
                    src={`https:${file.url}`}
                    alt={title || 'Bild'}
                    className="w-full rounded-lg my-6"
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

// Helper: Asset-URL auflösen
const resolveAssetUrl = async (assetLink) => {
    if (!assetLink) return null;

    if (assetLink?.fields?.file?.url) {
        return `https:${assetLink.fields.file.url}`;
    }

    if (assetLink?.sys?.type === 'Link' && assetLink?.sys?.linkType === 'Asset') {
        try {
            const asset = await client.getAsset(assetLink.sys.id);
            if (asset?.fields?.file?.url) {
                return `https:${asset.fields.file.url}`;
            }
        } catch (error) {
            console.error('Fehler beim Laden des Assets:', error);
        }
    }

    return null;
};

export default function NewsDetailPage() {
    const { slug } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                const response = await client.getEntries({
                    content_type: 'news',
                    'fields.slug': slug,
                    limit: 1,
                });

                if (response.items.length > 0) {
                    const item = response.items[0];
                    const imageUrl = await resolveAssetUrl(item.fields.image);

                    setNews({
                        id: item.sys.id,
                        title: item.fields.title || '',
                        slug: item.fields.slug || '',
                        excerpt: item.fields.excerpt || '',
                        content: item.fields.content || null,
                        image_url: imageUrl,
                        published_at: item.fields.publishedAt || '',
                    });
                } else {
                    setError('News nicht gefunden');
                }
            } catch (err) {
                console.error('Fehler beim Laden der News:', err);
                setError('Fehler beim Laden der News');
            }
            setLoading(false);
        };

        loadNews();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-gold mx-auto mb-4"></div>
                    <p className="text-slate-400">Lade News...</p>
                </div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="min-h-screen bg-midnight-pitch flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-4xl text-white mb-4">Fehler</h1>
                    <p className="text-slate-400 mb-8">{error || 'News nicht gefunden'}</p>
                    <Link to="/news">
                        <Button className="bg-electric-royal text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Zurück zu News
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-midnight-pitch" data-testid="news-detail-page">
            {/* Hero mit Bild */}
            <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                {news.image_url ? (
                    <div
                        className="absolute inset-0 bg-cover"
                        style={{
                            backgroundImage: `url(${news.image_url})`,
                            backgroundPosition: 'center 35%'
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-royal/20 to-cyber-gold/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-pitch via-midnight-pitch/10 to-transparent" />

                {/* Zurück-Button */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                    <Link to="/news">
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Zurück
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Titel UNTER dem Bild */}
            <section className="pt-8 pb-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(news.published_at)}</span>
                    </div>
                    <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                        {news.title}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="pt-8 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {/* Excerpt */}
                    <p className="text-lg sm:text-xl text-slate-300 mb-8 font-medium leading-relaxed">
                        {news.excerpt}
                    </p>

                    {/* Rich Text Content */}
                    {news.content && (
                        <div className="prose prose-invert max-w-none">
                            {documentToReactComponents(news.content, richTextOptions)}
                        </div>
                    )}

                    {/* Zurück Button */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <Link to="/news">
                            <Button className="bg-electric-royal text-white hover:bg-electric-royal/80">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Alle News anzeigen
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}