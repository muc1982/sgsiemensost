import { createClient } from 'contentful';

// Contentful Client erstellen
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

// Helper: Asset-ID aus Link extrahieren und dann Asset laden
const resolveAssetUrl = async (assetLink) => {
  if (!assetLink) return null;
  
  // Wenn Asset bereits aufgelöst ist
  if (assetLink?.fields?.file?.url) {
    return `https:${assetLink.fields.file.url}`;
  }
  
  // Wenn es ein Link ist, Asset separat laden
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

// News abrufen
export const getNews = async (staticNews = []) => {
  try {
    const response = await client.getEntries({
      content_type: 'news',
      order: ['-fields.publishedAt'],
    });

    // Alle News mit aufgelösten Bildern
    const contentfulNews = await Promise.all(
      response.items.map(async (item) => {
        const imageUrl = await resolveAssetUrl(item.fields.image);
        
        return {
          id: item.sys.id,
          title: item.fields.title || '',
          slug: item.fields.slug || '',
          excerpt: item.fields.excerpt || '',
          content: item.fields.content || '',
          image_url: imageUrl,
          published_at: item.fields.publishedAt || '',
          is_featured: item.fields.featured || false,
        };
      })
    );

    if (contentfulNews.length > 0) {
      return contentfulNews;
    }
    
    return staticNews;
  } catch (error) {
    console.error('Fehler beim Laden der News:', error);
    return staticNews;
  }
};

// Spieler abrufen (nach Team filtern)
export const getPlayers = async (teamSlug) => {
  try {
    const response = await client.getEntries({
      content_type: 'player',
      order: ['fields.number'],
      'fields.team': teamSlug,
    });

    const players = await Promise.all(
      response.items.map(async (item) => ({
        id: item.sys.id,
        name: item.fields.name || '',
        position: item.fields.position || '',
        number: item.fields.number || null,
        team: item.fields.team || '',
        image_url: await resolveAssetUrl(item.fields.photo),
        is_captain: item.fields.isCaptain || false,
      }))
    );

    return players;
  } catch (error) {
    console.error('Fehler beim Laden der Spieler:', error);
    return [];
  }
};

// Trainer abrufen (nach Team filtern)
export const getCoaches = async (teamSlug) => {
  try {
    const response = await client.getEntries({
      content_type: 'coach',
      'fields.team': teamSlug,
    });

    const coaches = await Promise.all(
      response.items.map(async (item) => ({
        id: item.sys.id,
        name: item.fields.name || '',
        role: item.fields.role || '',
        team: item.fields.team || '',
        image_url: await resolveAssetUrl(item.fields.photo),
      }))
    );

    return coaches;
  } catch (error) {
    console.error('Fehler beim Laden der Trainer:', error);
    return [];
  }
};

// Ansprechpartner abrufen
export const getContactPersons = async (staticPersons = []) => {
  try {
    const response = await client.getEntries({
      content_type: 'contactPerson',
    });

    const contentfulPersons = await Promise.all(
      response.items.map(async (item) => ({
        id: item.sys.id,
        name: item.fields.name || '',
        role: item.fields.role || '',
        email: item.fields.email || '',
        image_url: await resolveAssetUrl(item.fields.photo),
      }))
    );

    if (contentfulPersons.length > 0) {
      return contentfulPersons;
    }
    
    return staticPersons;
  } catch (error) {
    console.error('Fehler beim Laden der Ansprechpartner:', error);
    return staticPersons;
  }
};

// Team-Daten abrufen - Spieler und Trainer GETRENNT
export const getTeamData = async (teamSlug, staticTeamData) => {
  try {
    const contentfulPlayers = await getPlayers(teamSlug);
    const contentfulCoaches = await getCoaches(teamSlug);
    
    const teamInfo = staticTeamData || {
      id: teamSlug,
      name: teamSlug,
      description: '',
      coaches: [],
      players: [],
    };

    const finalPlayers = contentfulPlayers.length > 0 
      ? contentfulPlayers 
      : (staticTeamData?.players || []);

    const finalCoaches = contentfulCoaches.length > 0 
      ? contentfulCoaches 
      : (staticTeamData?.coaches || []);

    return {
      id: teamSlug,
      name: teamInfo.name,
      description: teamInfo.description,
      coaches: finalCoaches,
      players: finalPlayers,
    };
  } catch (error) {
    console.error('Fehler beim Laden der Team-Daten:', error);
    return staticTeamData || null;
  }
};

// Galerien abrufen
export const getGalleries = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'gallery',
      order: ['-fields.date'],
    });

    const galleries = await Promise.all(
      response.items.map(async (item) => {
        // Erstes Bild als Cover verwenden
        let coverImage = null;
        let imageCount = 0;

        if (item.fields.images && item.fields.images.length > 0) {
          imageCount = item.fields.images.length;
          coverImage = await resolveAssetUrl(item.fields.images[0]);
        }

        return {
          id: item.sys.id,
          title: item.fields.title || '',
          slug: item.fields.slug || '',
          description: item.fields.description || '',
          date: item.fields.date || '',
          category: item.fields.category || 'Sonstiges',
          cover_image: coverImage,
          image_count: imageCount,
        };
      })
    );

    return galleries;
  } catch (error) {
    console.error('Fehler beim Laden der Galerien:', error);
    return [];
  }
};

// Einzelne Galerie nach Slug abrufen
export const getGalleryBySlug = async (slug) => {
  try {
    const response = await client.getEntries({
      content_type: 'gallery',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];

    // Alle Bilder laden
    const images = [];
    if (item.fields.images && item.fields.images.length > 0) {
      for (const imageRef of item.fields.images) {
        const imageUrl = await resolveAssetUrl(imageRef);
        if (imageUrl) {
          images.push(imageUrl);
        }
      }
    }

    return {
      id: item.sys.id,
      title: item.fields.title || '',
      slug: item.fields.slug || '',
      description: item.fields.description || '',
      date: item.fields.date || '',
      category: item.fields.category || 'Sonstiges',
      images: images,
    };
  } catch (error) {
    console.error('Fehler beim Laden der Galerie:', error);
    return null;
  }
};

export default client;
