// Statische Daten für die Website (ohne Backend)

export const TEAMS_DATA = {
  "erste-mannschaft": {
    id: "erste-mannschaft",
    name: "1. Mannschaft",
    description: "Unsere erste Mannschaft spielt in der Kreisliga München.",
    coaches: [
      { id: "1", name: "Thomas Müller", role: "Cheftrainer", image_url: null },
      { id: "2", name: "Stefan Weber", role: "Co-Trainer", image_url: null },
    ],
    players: [
      { id: "1", name: "Max Huber", position: "Torwart", number: 1, is_captain: false },
      { id: "2", name: "Felix Schmidt", position: "Verteidiger", number: 2, is_captain: false },
      { id: "3", name: "Lukas Wagner", position: "Verteidiger", number: 3, is_captain: false },
      { id: "4", name: "Jonas Bauer", position: "Verteidiger", number: 4, is_captain: true },
      { id: "5", name: "David Koch", position: "Verteidiger", number: 5, is_captain: false },
      { id: "6", name: "Niklas Fischer", position: "Mittelfeld", number: 6, is_captain: false },
      { id: "7", name: "Tim Hoffmann", position: "Mittelfeld", number: 7, is_captain: false },
      { id: "8", name: "Leon Meyer", position: "Mittelfeld", number: 8, is_captain: false },
      { id: "9", name: "Paul Schulz", position: "Mittelfeld", number: 10, is_captain: false },
      { id: "10", name: "Julian Becker", position: "Sturm", number: 9, is_captain: false },
      { id: "11", name: "Moritz Klein", position: "Sturm", number: 11, is_captain: false },
    ]
  },
  "zweite-mannschaft": {
    id: "zweite-mannschaft",
    name: "2. Mannschaft",
    description: "Unsere zweite Mannschaft bietet Spielern die Möglichkeit, sich zu entwickeln.",
    coaches: [
      { id: "1", name: "Andreas Braun", role: "Trainer", image_url: null },
    ],
    players: [
      { id: "1", name: "Markus Richter", position: "Torwart", number: 1, is_captain: false },
      { id: "2", name: "Daniel Wolf", position: "Verteidiger", number: 2, is_captain: false },
      { id: "3", name: "Kevin Neumann", position: "Verteidiger", number: 3, is_captain: true },
      { id: "4", name: "Patrick Schwarz", position: "Mittelfeld", number: 6, is_captain: false },
      { id: "5", name: "Michael Lange", position: "Mittelfeld", number: 8, is_captain: false },
      { id: "6", name: "Sebastian Krause", position: "Sturm", number: 9, is_captain: false },
    ]
  },
  "traditionsmannschaft": {
    id: "traditionsmannschaft",
    name: "Traditionsmannschaft",
    description: "Unsere Traditionsmannschaft vereint ehemalige Spieler und Veteranen des Vereins.",
    coaches: [
      { id: "1", name: "Werner Maier", role: "Spielertrainer", image_url: null },
    ],
    players: [
      { id: "1", name: "Klaus Hartmann", position: "Torwart", number: 1, is_captain: false },
      { id: "2", name: "Bernd Zimmermann", position: "Verteidiger", number: 4, is_captain: true },
      { id: "3", name: "Helmut Krüger", position: "Mittelfeld", number: 10, is_captain: false },
      { id: "4", name: "Rolf Schmitt", position: "Sturm", number: 9, is_captain: false },
    ]
  }
};

export const CONTACT_PERSONS = [
  { id: "1", name: "Robert Steinhauser", role: "1. Vorstand", email: "vorstand@sg-siemens-ost.de", image_url: null },
  { id: "2", name: "André Schuster", role: "2. Vorstand", email: "vorstand2@sg-siemens-ost.de", image_url: null },
  { id: "3", name: "Bernd Hochrein", role: "3. Vorstand", email: "vorstand3@sg-siemens-ost.de", image_url: null },
  { id: "4", name: "Maria Schmidt", role: "Kassenwart", email: "kasse@sg-siemens-ost.de", image_url: null },
  { id: "5", name: "Peter Müller", role: "Schriftführer", email: "info@sg-siemens-ost.de", image_url: null },
];

export const NEWS_DATA = [
  {
    id: "1",
    title: "Saisonstart 2025/26",
    content: "Die neue Saison beginnt am 15. August. Alle Mannschaften starten motiviert in die Vorbereitung.",
    excerpt: "Die neue Saison beginnt am 15. August.",
    image_url: "https://images.unsplash.com/photo-1583505996159-307082cf2085?w=800",
    published_at: "2025-07-15T10:00:00Z",
    is_featured: true
  },
  {
    id: "2",
    title: "Neuzugänge für die 1. Mannschaft",
    content: "Wir freuen uns, drei neue Spieler in unserem Kader begrüßen zu dürfen.",
    excerpt: "Drei neue Spieler verstärken unser Team.",
    image_url: "https://images.unsplash.com/photo-1695054486203-fea2173902ee?w=800",
    published_at: "2025-07-10T10:00:00Z",
    is_featured: false
  },
  {
    id: "3",
    title: "Sommerfest 2025",
    content: "Am 20. Juli findet unser alljährliches Sommerfest statt. Alle Mitglieder und Familien sind herzlich eingeladen!",
    excerpt: "Sommerfest am 20. Juli - Alle sind eingeladen!",
    image_url: null,
    published_at: "2025-07-01T10:00:00Z",
    is_featured: false
  },
];

export const CLUB_INFO = {
  name: "SG Siemens München Ost e.V.",
  founded: 1954,
  address: {
    street: "St.-Cajetan-Straße 33",
    city: "81669 München",
    country: "Deutschland"
  },
  instagram: "sg_siemens_ost_infineon",
  instagram_url: "https://www.instagram.com/sg_siemens_ost_infineon",
  logo_url: "/assets/logo.png"
};