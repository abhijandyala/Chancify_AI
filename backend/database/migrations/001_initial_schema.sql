-- Initial database schema for Chancify AI
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    high_school_name TEXT,
    graduation_year INTEGER,
    profile_complete BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academic Data Table
CREATE TABLE academic_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- GPA Information
    gpa_unweighted DECIMAL(3,2),
    gpa_weighted DECIMAL(3,2),
    gpa_scale TEXT,
    class_rank INTEGER,
    class_size INTEGER,
    
    -- Standardized Testing
    sat_total INTEGER,
    sat_math INTEGER,
    sat_reading_writing INTEGER,
    act_composite INTEGER,
    test_optional_choice BOOLEAN,
    
    -- Curriculum (JSON for flexibility)
    ap_courses JSONB DEFAULT '[]',
    ib_program JSONB DEFAULT '{}',
    honors_courses JSONB DEFAULT '[]',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(profile_id)
);

-- Extracurriculars Table
CREATE TABLE extracurriculars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    activity_name TEXT NOT NULL,
    category TEXT,
    leadership_positions TEXT[],
    years_participated INTEGER[],
    hours_per_week DECIMAL(4,1),
    weeks_per_year INTEGER,
    description TEXT,
    achievements JSONB DEFAULT '[]',
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Colleges Table
CREATE TABLE colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    name TEXT NOT NULL UNIQUE,
    common_name TEXT,
    location_city TEXT,
    location_state TEXT,
    
    -- Admissions Data
    acceptance_rate DECIMAL(5,4),
    acceptance_rate_ed1 DECIMAL(5,4),
    acceptance_rate_ea DECIMAL(5,4),
    acceptance_rate_rd DECIMAL(5,4),
    
    -- Academic Profile
    sat_25th INTEGER,
    sat_75th INTEGER,
    act_25th INTEGER,
    act_75th INTEGER,
    gpa_average DECIMAL(3,2),
    
    -- Policies
    test_policy TEXT,
    financial_aid_policy TEXT,
    uses_common_app BOOLEAN,
    
    -- Factor Weights (custom per college)
    custom_weights JSONB,
    
    -- Metadata
    data_source TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved Colleges Table
CREATE TABLE saved_colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
    
    -- Application Plan
    application_round TEXT,
    intended_major TEXT,
    demonstrated_interest_score DECIMAL(3,1),
    campus_visited BOOLEAN DEFAULT FALSE,
    
    -- User Notes
    notes TEXT,
    category TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combination
    CONSTRAINT unique_user_college UNIQUE(profile_id, college_id)
);

-- Probability Calculations Table
CREATE TABLE probability_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
    
    -- Input Factors (snapshot)
    factor_scores JSONB NOT NULL,
    
    -- Results
    composite_score DECIMAL(6,2),
    probability DECIMAL(5,4),
    percentile_estimate DECIMAL(5,2),
    
    -- Audit Trail
    audit_breakdown JSONB,
    policy_notes JSONB,
    
    -- Metadata
    calculation_version TEXT DEFAULT '1.0',
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_academic_data_profile_id ON academic_data(profile_id);
CREATE INDEX idx_extracurriculars_profile_id ON extracurriculars(profile_id);
CREATE INDEX idx_extracurriculars_display_order ON extracurriculars(display_order);
CREATE INDEX idx_colleges_name ON colleges(name);
CREATE INDEX idx_colleges_location_state ON colleges(location_state);
CREATE INDEX idx_saved_colleges_profile_id ON saved_colleges(profile_id);
CREATE INDEX idx_saved_colleges_college_id ON saved_colleges(college_id);
CREATE INDEX idx_probability_calculations_profile_id ON probability_calculations(profile_id);
CREATE INDEX idx_probability_calculations_college_id ON probability_calculations(college_id);
CREATE INDEX idx_probability_calculations_calculated_at ON probability_calculations(calculated_at);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracurriculars ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE probability_calculations ENABLE ROW LEVEL SECURITY;

-- Note: colleges table is public (no RLS needed)

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own academic data" ON academic_data FOR ALL
    USING (
        profile_id IN (
            SELECT id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view own extracurriculars" ON extracurriculars FOR ALL
    USING (
        profile_id IN (
            SELECT id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view own saved colleges" ON saved_colleges FOR ALL
    USING (
        profile_id IN (
            SELECT id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view own calculations" ON probability_calculations FOR ALL
    USING (
        profile_id IN (
            SELECT id FROM user_profiles WHERE user_id = auth.uid()
        )
    );
