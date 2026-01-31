# SG Siemens München Ost e.V. - Vereinswebsite PRD

## Original Problem Statement
Fußballverein Homepage für SG Siemens München Ost e.V. mit Header (Verein, Kontakt, Mitgliedschaft, Ansprechpartner, News), Seiten für 1. Mannschaft, 2. Mannschaft, Traditionsmannschaft (jeweils mit Trainerteam und Kader im Grid), Instagram News-Feed, Footer mit Vereinsinfo. Design inspiriert von "Football Coach Club" WordPress Theme.

## Architecture
- **Frontend**: React with TypeScript-like structure, Tailwind CSS, Shadcn UI Components
- **Backend**: FastAPI with MongoDB
- **Design Theme**: "Stadium at Night" - Dark mode with Electric Royal (#1d4ed8) and Cyber Gold (#facc15)

## User Personas
1. **Vereinsmitglieder**: Aktuelle Infos über Teams und Spiele
2. **Potenzielle Mitglieder**: Informationen über Mitgliedschaft
3. **Interessierte**: Allgemeine Vereinsinfos

## Core Requirements (Static)
- [x] Responsive Navigation mit Mannschaften-Dropdown
- [x] Hero Section mit Vereinslogo
- [x] Team-Seiten mit Kader und Trainer Grid
- [x] News-Sektion
- [x] Kontaktformular
- [x] Ansprechpartner/Vorstand Grid
- [x] Mitgliedschaft-Seite
- [x] Footer mit Vereinsinfos
- [x] Impressum & Datenschutz

## What's Been Implemented (Jan 31, 2026)
### Backend APIs
- GET /api/teams - Liste aller Mannschaften
- GET /api/teams/{id} - Team Details mit Kader/Trainer
- GET /api/news - Vereinsnews
- POST /api/news - News erstellen
- GET /api/contact-persons - Ansprechpartner
- POST /api/contact - Kontaktnachricht senden
- GET /api/club-info - Vereinsinfos

### Frontend Pages
- Homepage mit Hero, Stats, Teams Section, News
- Team-Seiten (1., 2., Traditionsmannschaft)
- News-Seite
- Kontakt-Seite mit Formular
- Mitgliedschaft-Seite
- Ansprechpartner-Seite
- Verein/Über uns
- Impressum & Datenschutz

## Prioritized Backlog
### P0 (Critical) - DONE
- ✅ Alle Kernseiten implementiert
- ✅ API-Endpunkte funktionsfähig

### P1 (High Priority)
- [ ] Admin-Backend für Kader/News-Verwaltung
- [ ] Instagram API Integration (benötigt Business Account + API Keys)
- [ ] Spielplan/Tabelle Integration

### P2 (Nice to Have)
- [ ] Bildupload für Spieler/Trainer
- [ ] Spielergebnisse Live-Ticker
- [ ] Vereinskalender

## Next Tasks
1. Admin-Dashboard zum Bearbeiten von Spielern, Trainern und News
2. Instagram Graph API Integration (wenn API-Credentials verfügbar)
3. Bildupload-Funktion für Spielerfotos
