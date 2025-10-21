-- Create users table for Chancify AI authentication
-- Run this in your Railway Postgres database

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- Nullable for OAuth users
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    
    -- OAuth fields
    google_id VARCHAR(255) UNIQUE,
    provider VARCHAR(20) DEFAULT 'local', -- 'local', 'google'
    
    -- Account status
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Indexes for better performance
    CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Insert a test user (optional)
-- INSERT INTO users (email, password_hash, first_name, last_name, provider, email_verified) 
-- VALUES ('test@example.com', 'hashed_password_here', 'Test', 'User', 'local', true);

-- Verify table was created
SELECT * FROM users LIMIT 1;
