"""
Database connection and session management for Supabase PostgreSQL.
"""

from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from supabase import create_client, Client
from config import settings

# Supabase client for authentication
supabase: Client = create_client(
    settings.supabase_url,
    settings.supabase_service_key  # Use service key for admin operations
)

# SQLAlchemy engine and session
database_url = settings.database_url

engine = create_engine(
    database_url,
    echo=settings.debug,  # Log SQL queries in debug mode
    pool_pre_ping=True,  # Verify connections before use
    pool_recycle=300,  # Recycle connections every 5 minutes
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """
    Dependency to get database session.
    
    Yields:
        Session: SQLAlchemy database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_supabase() -> Client:
    """
    Get Supabase client instance.
    
    Returns:
        Client: Supabase client for authentication and database operations
    """
    return supabase


def create_tables():
    """Create all database tables."""
    from .models import Base
    Base.metadata.create_all(bind=engine)


def drop_tables():
    """Drop all database tables (for testing)."""
    from .models import Base
    Base.metadata.drop_all(bind=engine)
