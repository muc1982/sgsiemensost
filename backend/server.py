from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ===================== MODELS =====================

class Player(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    number: Optional[int] = None
    image_url: Optional[str] = None
    is_captain: bool = False

class Coach(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    image_url: Optional[str] = None

class Team(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    description: Optional[str] = None
    coaches: List[Coach] = []
    players: List[Player] = []

class NewsItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_featured: bool = False

class NewsCreate(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool = False

class ContactPerson(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    email: Optional[str] = None
    phone: Optional[str] = None
    image_url: Optional[str] = None

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# ===================== SEED DATA =====================

async def seed_data():
    """Seed initial data if collections are empty"""
    
    # Seed Teams
    teams_count = await db.teams.count_documents({})
    if teams_count == 0:
        teams_data = [
            {
                "id": "erste-mannschaft",
                "name": "1. Mannschaft",
                "description": "Unsere erste Mannschaft spielt in der Kreisliga München.",
                "coaches": [
                    {"id": str(uuid.uuid4()), "name": "Thomas Müller", "role": "Cheftrainer", "image_url": None},
                    {"id": str(uuid.uuid4()), "name": "Stefan Weber", "role": "Co-Trainer", "image_url": None},
                ],
                "players": [
                    {"id": str(uuid.uuid4()), "name": "Max Huber", "position": "Torwart", "number": 1, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Felix Schmidt", "position": "Verteidiger", "number": 2, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Lukas Wagner", "position": "Verteidiger", "number": 3, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Jonas Bauer", "position": "Verteidiger", "number": 4, "is_captain": True},
                    {"id": str(uuid.uuid4()), "name": "David Koch", "position": "Verteidiger", "number": 5, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Niklas Fischer", "position": "Mittelfeld", "number": 6, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Tim Hoffmann", "position": "Mittelfeld", "number": 7, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Leon Meyer", "position": "Mittelfeld", "number": 8, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Paul Schulz", "position": "Mittelfeld", "number": 10, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Julian Becker", "position": "Sturm", "number": 9, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Moritz Klein", "position": "Sturm", "number": 11, "is_captain": False},
                ]
            },
            {
                "id": "zweite-mannschaft",
                "name": "2. Mannschaft",
                "description": "Unsere zweite Mannschaft bietet Spielern die Möglichkeit, sich zu entwickeln.",
                "coaches": [
                    {"id": str(uuid.uuid4()), "name": "Andreas Braun", "role": "Trainer", "image_url": None},
                ],
                "players": [
                    {"id": str(uuid.uuid4()), "name": "Markus Richter", "position": "Torwart", "number": 1, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Daniel Wolf", "position": "Verteidiger", "number": 2, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Kevin Neumann", "position": "Verteidiger", "number": 3, "is_captain": True},
                    {"id": str(uuid.uuid4()), "name": "Patrick Schwarz", "position": "Mittelfeld", "number": 6, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Michael Lange", "position": "Mittelfeld", "number": 8, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Sebastian Krause", "position": "Sturm", "number": 9, "is_captain": False},
                ]
            },
            {
                "id": "traditionsmannschaft",
                "name": "Traditionsmannschaft",
                "description": "Unsere Traditionsmannschaft vereint ehemalige Spieler und Veteranen des Vereins.",
                "coaches": [
                    {"id": str(uuid.uuid4()), "name": "Werner Maier", "role": "Spielertrainer", "image_url": None},
                ],
                "players": [
                    {"id": str(uuid.uuid4()), "name": "Klaus Hartmann", "position": "Torwart", "number": 1, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Bernd Zimmermann", "position": "Verteidiger", "number": 4, "is_captain": True},
                    {"id": str(uuid.uuid4()), "name": "Helmut Krüger", "position": "Mittelfeld", "number": 10, "is_captain": False},
                    {"id": str(uuid.uuid4()), "name": "Rolf Schmitt", "position": "Sturm", "number": 9, "is_captain": False},
                ]
            }
        ]
        await db.teams.insert_many(teams_data)
        logging.info("Teams seeded successfully")

    # Seed Contact Persons (Ansprechpartner/Vorstand)
    contacts_count = await db.contact_persons.count_documents({})
    if contacts_count == 0:
        contacts_data = [
            {"id": str(uuid.uuid4()), "name": "Robert Steinhauser", "role": "1. Vorstand", "email": "vorstand@sg-siemens-ost.de", "image_url": None},
            {"id": str(uuid.uuid4()), "name": "André Schuster", "role": "2. Vorstand", "email": "vorstand2@sg-siemens-ost.de", "image_url": None},
            {"id": str(uuid.uuid4()), "name": "Bernd Hochrein", "role": "3. Vorstand", "email": "vorstand3@sg-siemens-ost.de", "image_url": None},
            {"id": str(uuid.uuid4()), "name": "Maria Schmidt", "role": "Kassenwart", "email": "kasse@sg-siemens-ost.de", "image_url": None},
            {"id": str(uuid.uuid4()), "name": "Peter Müller", "role": "Schriftführer", "email": "info@sg-siemens-ost.de", "image_url": None},
        ]
        await db.contact_persons.insert_many(contacts_data)
        logging.info("Contact persons seeded successfully")

    # Seed News
    news_count = await db.news.count_documents({})
    if news_count == 0:
        news_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "Saisonstart 2025/26",
                "content": "Die neue Saison beginnt am 15. August. Alle Mannschaften starten motiviert in die Vorbereitung.",
                "excerpt": "Die neue Saison beginnt am 15. August.",
                "image_url": "https://images.unsplash.com/photo-1583505996159-307082cf2085?w=800",
                "published_at": datetime.now(timezone.utc).isoformat(),
                "is_featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Neuzugänge für die 1. Mannschaft",
                "content": "Wir freuen uns, drei neue Spieler in unserem Kader begrüßen zu dürfen.",
                "excerpt": "Drei neue Spieler verstärken unser Team.",
                "image_url": "https://images.unsplash.com/photo-1695054486203-fea2173902ee?w=800",
                "published_at": datetime.now(timezone.utc).isoformat(),
                "is_featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Sommerfest 2025",
                "content": "Am 20. Juli findet unser alljährliches Sommerfest statt. Alle Mitglieder und Familien sind herzlich eingeladen!",
                "excerpt": "Sommerfest am 20. Juli - Alle sind eingeladen!",
                "image_url": None,
                "published_at": datetime.now(timezone.utc).isoformat(),
                "is_featured": False
            },
        ]
        await db.news.insert_many(news_data)
        logging.info("News seeded successfully")

# ===================== ROUTES =====================

@api_router.get("/")
async def root():
    return {"message": "SG Siemens München Ost API"}

# Teams
@api_router.get("/teams", response_model=List[Team])
async def get_teams():
    teams = await db.teams.find({}, {"_id": 0}).to_list(100)
    return teams

@api_router.get("/teams/{team_id}", response_model=Team)
async def get_team(team_id: str):
    team = await db.teams.find_one({"id": team_id}, {"_id": 0})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

# News
@api_router.get("/news", response_model=List[NewsItem])
async def get_news(limit: int = 10, featured_only: bool = False):
    query = {"is_featured": True} if featured_only else {}
    news = await db.news.find(query, {"_id": 0}).sort("published_at", -1).to_list(limit)
    for item in news:
        if isinstance(item.get('published_at'), str):
            item['published_at'] = datetime.fromisoformat(item['published_at'].replace('Z', '+00:00'))
    return news

@api_router.post("/news", response_model=NewsItem)
async def create_news(news_input: NewsCreate):
    news_item = NewsItem(**news_input.model_dump())
    doc = news_item.model_dump()
    doc['published_at'] = doc['published_at'].isoformat()
    await db.news.insert_one(doc)
    return news_item

# Contact Persons (Ansprechpartner)
@api_router.get("/contact-persons", response_model=List[ContactPerson])
async def get_contact_persons():
    persons = await db.contact_persons.find({}, {"_id": 0}).to_list(100)
    return persons

# Contact Messages
@api_router.post("/contact", response_model=ContactMessage)
async def send_contact_message(message_input: ContactMessageCreate):
    message = ContactMessage(**message_input.model_dump())
    doc = message.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return message

# Club Info
@api_router.get("/club-info")
async def get_club_info():
    return {
        "name": "SG Siemens München Ost e.V.",
        "founded": 1954,
        "address": {
            "street": "St.-Cajetan-Straße 33",
            "city": "81669 München",
            "country": "Deutschland"
        },
        "instagram": "sg_siemens_ost_infineon",
        "instagram_url": "https://www.instagram.com/sg_siemens_ost_infineon",
        "logo_url": "/assets/logo.png"
    }

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await seed_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
