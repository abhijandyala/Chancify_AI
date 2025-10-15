"""
Database connection and session management for Supabase PostgreSQL.
"""

from typing import Generator, Optional
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from supabase import create_client, Client
from backend.config import settings
import logging

logger = logging.getLogger(__name__)

# Supabase client for authentication
try:
    supabase: Client = create_client(
        settings.supabase_url,
        settings.supabase_service_key  # Use service key for admin operations
    )
    logger.info("Supabase client initialized successfully")
except Exception as e:
    logger.warning(f"Failed to initialize Supabase client: {e}")
    supabase = None

# SQLAlchemy engine and session
database_url = settings.database_url

try:
    engine = create_engine(
        database_url,
        echo=False,  # Disable SQL query logging in production
        pool_pre_ping=True,  # Verify connections before use
        pool_recycle=300,  # Recycle connections every 5 minutes
        connect_args={"connect_timeout": 10}  # Add connection timeout
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    logger.info("Database engine created successfully")
except Exception as e:
    logger.error(f"Failed to create database engine: {e}")
    engine = None
    SessionLocal = None


def get_db() -> Generator[Session, None, None]:
    """
    Dependency to get database session.
    
    Yields:
        Session: SQLAlchemy database session
    """
    if SessionLocal is None:
        logger.error("Database not initialized")
        raise RuntimeError("Database connection not available")
    
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
    if engine is None:
        logger.warning("Cannot create tables: Database engine not initialized")
        return
    
    try:
        from .models import Base
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created/verified successfully")
    except Exception as e:
        logger.error(f"Failed to create tables: {e}")
        raise


def drop_tables():
    """Drop all database tables (for testing)."""
    from .models import Base
    Base.metadata.drop_all(bind=engine)
