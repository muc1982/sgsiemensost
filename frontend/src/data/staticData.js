// Statische Daten für die Website (ohne Backend)

export const TEAMS_DATA = {
  "erste-mannschaft": {
    id: "erste-mannschaft",
    name: "1. Mannschaft",
    description: "Unsere erste Mannschaft spielt in der Kreisliga München.",
    coaches: [
      { id: "1", name: "Vedat Karaüzüm", role: "Cheftrainer", image_url: null },
      { id: "2", name: "Hendrik Grothusheidkamp", role: "Trainerassistent", image_url: null },
    ],
    players: [
      { id: "1", name: "Max Mustermann", position: "Torwart", number: 1, is_captain: false },
    ]
  },
  "zweite-mannschaft": {
    id: "zweite-mannschaft",
    name: "2. Mannschaft",
    description: "Unsere zweite Mannschaft bietet Spielern die Möglichkeit, sich zu entwickeln.",
    coaches: [
      { id: "1", name: "Test Mustermann", role: "Trainer", image_url: null },
    ],
    players: [
      { id: "1", name: "Test Mustermann", position: "Torwart", number: 1, is_captain: false },
    ]
  },
  "traditionsmannschaft": {
    id: "traditionsmannschaft",
    name: "Traditionsmannschaft",
    description: "Unsere Traditionsmannschaft vereint ehemalige Spieler und Veteranen des Vereins.",
    coaches: [
      { id: "1", name: "Max Mustermann", role: "Cheftrainer", image_url: null },
    ],
    players: [
      { id: "1", name: "Max Mustermann", position: "Torwart", number: 1, is_captain: false },
    ]
  }
};

export const CONTACT_PERSONS = [
  { id: "1", name: "Philipp Kruppa", role: "Abteilungsleiter", image_url: null },
  { id: "2", name: "Ulrich Auwärter", role: "Stellv. Abteilungsleiter", image_url: null },
  { id: "3", name: "Yasin Sun", role: "Teammanager", image_url: null },
  { id: "4", name: "Torsten Wegener", role: "Kassenwart", image_url: null },
  { id: "5", name: "Technischer Leiter", role: "Hans Hellebrand", image_url: null },
  { id: "5", name: "Schriftführer", role: "Thomas Bayerle", image_url: null },
];

export const NEWS_DATA = [
  {
    id: "1",
    title: "Saisonstart 2026",
    content: "Die neue Saison beginnt am 01.03.2026. Alle Mannschaften starten motiviert in die Vorbereitung.",
    excerpt: "Die neue Saison beginnt am 01.03.2026.",
    image_url: "https://images.unsplash.com/photo-1583505996159-307082cf2085?w=800",
    published_at: "2026-01-31T10:00:00Z",
    is_featured: true
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