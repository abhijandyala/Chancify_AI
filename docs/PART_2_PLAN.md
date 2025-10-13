# PART 2 - Comprehensive Implementation Plan
## API + Database Infrastructure

**Status**: 📋 Planning Phase  
**Estimated Time**: 2-3 hours of focused work  
**Complexity**: Medium-High (but we'll take it slow)

---

## Table of Contents
1. [Architecture Decision](#architecture-decision)
2. [Database Choice & Rationale](#database-choice--rationale)
3. [What I Need From You](#what-i-need-from-you)
4. [Database Schema Design](#database-schema-design)
5. [API Endpoints Plan](#api-endpoints-plan)
6. [Implementation Steps](#implementation-steps)
7. [Security Considerations](#security-considerations)
8. [Testing Strategy](#testing-strategy)

---

## Architecture Decision

### Current Status
✅ We have:
- Complete scoring system (Python + TypeScript)
- Factor definitions and schemas
- Working examples

❌ We need:
- Database to store user profiles and college data
- API endpoints to serve the frontend
- Authentication system
- Data persistence

### Recommended Architecture

```
Frontend (Next.js)
      ↓
   [HTTPS]
      ↓
Backend API (FastAPI)
      ↓
   [SQL]
      ↓
Database (PostgreSQL via Supabase)
```

---

## Database Choice & Rationale

### Option 1: Supabase (PostgreSQL) ⭐ **RECOMMENDED**

**What is Supabase?**
- Open-source Firebase alternative
- PostgreSQL database with instant APIs
- Built-in authentication
- Real-time subscriptions
- File storage
- Free tier: 500MB database, 50,000 monthly active users

**Why I Recommend Supabase:**

✅ **Pros:**
1. **Authentication built-in** - User signup/login handled
2. **Instant REST API** - Auto-generated from database schema
3. **Real-time features** - Can update UI live when data changes
4. **Free tier is generous** - Perfect for MVP and beyond
5. **PostgreSQL** - Industry standard, reliable
6. **Row-level security** - Built-in data access control
7. **Easy to start, scales well** - From prototype to production
8. **Dashboard** - Visual database management
9. **No server management** - Fully managed
10. **Fast setup** - Can be running in 10 minutes

❌ **Cons:**
1. Vendor lock-in (but can self-host if needed)
2. Less control than self-hosted

**Cost:**
- Free tier: Sufficient for development and early users
- Pro ($25/month): 8GB database, 100K MAU
- We'd stay free for a LONG time

---

### Option 2: Railway + PostgreSQL

**What is Railway?**
- Platform for deploying apps and databases
- PostgreSQL as a service
- Environment variables management

**Why Consider Railway:**
✅ Simple deployment
✅ Good for full-stack apps
✅ $5/month credit free

❌ More manual setup (auth, APIs)
❌ Need to build everything ourselves

---

### Option 3: Local PostgreSQL + Manual Setup

**Traditional approach:**
- Install PostgreSQL locally
- Build everything from scratch
- Deploy to cloud later

❌ Most time-consuming
❌ Most complex setup
❌ Requires server management
✅ Full control

---

### 🎯 My Recommendation: **Supabase**

**Rationale:**
1. **Speed**: Get database + auth in 10 minutes vs 2+ hours manual setup
2. **Built-in auth**: Don't reinvent the wheel
3. **Instant APIs**: Can use Supabase client OR our FastAPI (hybrid approach)
4. **Free tier**: No cost to start
5. **Professional**: Used by thousands of production apps
6. **Scales**: Can handle growth without migration

**Following your philosophy** [[memory:9814077]]:
- Not a shortcut - it's using professional tools properly
- Industry best practice (PostgreSQL, REST APIs, JWT auth)
- Lets us focus on unique features, not infrastructure
- Reliable and well-tested

---

## What I Need From You

### Immediate Needs:

#### 1. Supabase Account Setup (5 minutes)
**You need to:**
1. Go to https://supabase.com
2. Sign up (free, use GitHub login)
3. Create a new project:
   - Project name: `chancify-ai`
   - Database password: (save this!)
   - Region: Choose closest to you
4. Wait 2 minutes for project to spin up
5. Give me:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - `anon` public key (safe to share)
   - `service_role` secret key (KEEP SECRET)

**Where to find keys:**
- In Supabase dashboard → Settings → API
- I'll show you exactly where when we get there

#### 2. Decision Points

**Question 1**: Do you want to use Supabase, or prefer another option?
- If Supabase: We move fast ⚡
- If other: We adjust plan (but I recommend Supabase)

**Question 2**: Deployment preference for FastAPI?
- **Option A**: Railway (easiest, ~$5/month)
- **Option B**: Vercel (frontend) + Railway (backend)
- **Option C**: Local development first, deploy later
- **Recommendation**: Start local, deploy to Railway when ready

**Question 3**: Authentication approach?
- **Option A**: Supabase Auth (recommended - handles everything)
- **Option B**: Custom JWT with FastAPI
- **Recommendation**: Supabase Auth (industry standard, secure)

---

## Database Schema Design

### Tables We Need

#### 1. `users` (managed by Supabase Auth)
```sql
-- Automatically created by Supabase
-- We just reference auth.users.id
```

#### 2. `user_profiles` (student data)
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Personal Info
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  high_school_name TEXT,
  graduation_year INTEGER,
  
  -- Profile Status
  profile_complete BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);
```

#### 3. `academic_data` (detailed academic info)
```sql
CREATE TABLE academic_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- GPA
  gpa_unweighted DECIMAL(3,2),
  gpa_weighted DECIMAL(3,2),
  gpa_scale TEXT,
  class_rank INTEGER,
  class_size INTEGER,
  
  -- Testing
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
```

#### 4. `extracurriculars`
```sql
CREATE TABLE extracurriculars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  activity_name TEXT NOT NULL,
  category TEXT, -- Academic, Arts, Athletics, etc.
  leadership_positions TEXT[],
  years_participated INTEGER[],
  hours_per_week DECIMAL(4,1),
  weeks_per_year INTEGER,
  description TEXT,
  achievements JSONB DEFAULT '[]',
  
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. `colleges` (reference data)
```sql
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name TEXT NOT NULL,
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
  test_policy TEXT, -- Required, Optional, Blind
  financial_aid_policy TEXT, -- Need-blind, Need-aware
  uses_common_app BOOLEAN,
  
  -- Factor Weights (custom per college)
  custom_weights JSONB,
  
  -- Metadata
  data_source TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(name)
);
```

#### 6. `saved_colleges` (user's college list)
```sql
CREATE TABLE saved_colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  
  -- Application Plan
  application_round TEXT, -- ED1, ED2, EA, RD
  intended_major TEXT,
  demonstrated_interest_score DECIMAL(3,1),
  campus_visited BOOLEAN DEFAULT FALSE,
  
  -- User Notes
  notes TEXT,
  category TEXT, -- reach, target, safety
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(profile_id, college_id)
);
```

#### 7. `probability_calculations` (cache results)
```sql
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
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Index for lookups
  CONSTRAINT unique_calculation UNIQUE(profile_id, college_id, calculated_at)
);
```

### Indexes for Performance
```sql
-- Frequently queried columns
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_academic_data_profile_id ON academic_data(profile_id);
CREATE INDEX idx_extracurriculars_profile_id ON extracurriculars(profile_id);
CREATE INDEX idx_saved_colleges_profile_id ON saved_colleges(profile_id);
CREATE INDEX idx_saved_colleges_college_id ON saved_colleges(college_id);
CREATE INDEX idx_probability_calculations_profile_id ON probability_calculations(profile_id);
CREATE INDEX idx_colleges_name ON colleges(name);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracurriculars ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE probability_calculations ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Similar policies for other tables
-- (Full policies will be created during implementation)
```

---

## API Endpoints Plan

### Authentication Endpoints

#### 1. `POST /api/auth/signup`
- Create new user account
- Returns: JWT token, user info

#### 2. `POST /api/auth/login`
- Login existing user
- Returns: JWT token, user info

#### 3. `POST /api/auth/logout`
- Logout user
- Invalidates token

#### 4. `GET /api/auth/me`
- Get current user info
- Requires: Valid JWT

---

### Profile Endpoints

#### 5. `GET /api/profile`
- Get user's complete profile
- Returns: Profile + academic data + ECs

#### 6. `POST /api/profile`
- Create initial profile
- Body: Basic info (name, school, grad year)

#### 7. `PUT /api/profile`
- Update profile
- Body: Updated fields

#### 8. `GET /api/profile/academic`
- Get academic data specifically

#### 9. `PUT /api/profile/academic`
- Update academic data
- Body: GPA, test scores, courses

#### 10. `GET /api/profile/extracurriculars`
- Get all ECs

#### 11. `POST /api/profile/extracurriculars`
- Add new EC
- Body: Activity details

#### 12. `PUT /api/profile/extracurriculars/{id}`
- Update specific EC

#### 13. `DELETE /api/profile/extracurriculars/{id}`
- Remove EC

---

### College Endpoints

#### 14. `GET /api/colleges`
- Search/list colleges
- Query params: `?search=harvard&limit=20`

#### 15. `GET /api/colleges/{id}`
- Get specific college details

#### 16. `GET /api/colleges/popular`
- Get most commonly selected colleges

---

### Saved Colleges Endpoints

#### 17. `GET /api/saved-colleges`
- Get user's college list

#### 18. `POST /api/saved-colleges`
- Add college to list
- Body: `{ college_id, application_round, major }`

#### 19. `PUT /api/saved-colleges/{id}`
- Update application plan for a college

#### 20. `DELETE /api/saved-colleges/{id}`
- Remove from list

---

### Probability Calculation Endpoints

#### 21. `POST /api/calculate`
- Calculate admission probability
- Body: `{ college_id }`
- Returns: Probability + audit report
- Uses our scoring system!

#### 22. `POST /api/calculate/batch`
- Calculate for multiple colleges
- Body: `{ college_ids: [...] }`
- Returns: Array of results

#### 23. `GET /api/calculations/history`
- Get past calculations
- Returns: Historical results (track progress)

---

### Admin Endpoints (Future)

#### 24. `POST /api/admin/colleges`
- Add college data (admin only)

#### 25. `PUT /api/admin/colleges/{id}`
- Update college data

---

## Implementation Steps

### Phase 1: Setup (Day 1, ~30 minutes)

**Step 1.1: Supabase Project Setup**
- [ ] Create Supabase account
- [ ] Create new project
- [ ] Get API keys
- [ ] Save connection details

**Step 1.2: Local Environment Setup**
- [ ] Create `.env` file with Supabase credentials
- [ ] Install additional dependencies
- [ ] Test database connection

**Step 1.3: Database Schema Creation**
- [ ] Run SQL migrations to create tables
- [ ] Set up indexes
- [ ] Configure Row Level Security (RLS)
- [ ] Test with sample data

---

### Phase 2: Core API Development (Day 1-2, ~2-3 hours)

**Step 2.1: Database Models (SQLAlchemy)**
- [ ] Create models for each table
- [ ] Set up relationships
- [ ] Create Pydantic schemas for validation

**Step 2.2: Authentication**
- [ ] Integrate Supabase Auth with FastAPI
- [ ] Create JWT verification middleware
- [ ] Build auth endpoints
- [ ] Test login/signup flow

**Step 2.3: Profile CRUD**
- [ ] Create profile endpoints
- [ ] Implement validation
- [ ] Test with Postman/Thunder Client

**Step 2.4: Academic Data & ECs**
- [ ] Build academic data endpoints
- [ ] Build extracurriculars endpoints
- [ ] Test data flow

---

### Phase 3: Probability Integration (Day 2, ~1 hour)

**Step 3.1: Connect Scoring System**
- [ ] Create endpoint that calls `calculate_admission_probability()`
- [ ] Map database profile → factor scores
- [ ] Store calculations in database
- [ ] Return audit reports

**Step 3.2: College Data Management**
- [ ] Seed database with initial college data
- [ ] Build college search endpoint
- [ ] Implement college detail endpoint

**Step 3.3: Saved Colleges**
- [ ] Build saved colleges endpoints
- [ ] Implement batch probability calculation

---

### Phase 4: Testing & Refinement (Day 2-3, ~1 hour)

**Step 4.1: API Testing**
- [ ] Test all endpoints
- [ ] Verify authentication works
- [ ] Check data validation
- [ ] Test error handling

**Step 4.2: Performance Optimization**
- [ ] Add database indexes
- [ ] Implement caching (if needed)
- [ ] Optimize queries

**Step 4.3: Documentation**
- [ ] Generate OpenAPI/Swagger docs
- [ ] Document all endpoints
- [ ] Create example requests

---

## Security Considerations

### 1. Authentication
- ✅ JWT tokens (via Supabase)
- ✅ Secure password hashing (automatic)
- ✅ Token refresh mechanism
- ✅ Session management

### 2. Data Protection
- ✅ Row Level Security (RLS) in database
- ✅ Input validation with Pydantic
- ✅ SQL injection prevention (parameterized queries)
- ✅ HTTPS only in production

### 3. API Security
- ✅ Rate limiting (add later)
- ✅ CORS configuration
- ✅ API key validation
- ✅ User data isolation

### 4. Environment Variables
```env
# Never commit these!
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_KEY=eyJxxx...
DATABASE_URL=postgresql://xxx
SECRET_KEY=your-secret-key
```

---

## Testing Strategy

### 1. Unit Tests
```python
# Test individual functions
def test_calculate_probability():
    scores = {"grades": 9.0, "rigor": 8.5}
    result = calculate_admission_probability(scores, 0.10)
    assert 0.02 <= result.probability <= 0.98
```

### 2. Integration Tests
```python
# Test API endpoints
def test_create_profile():
    response = client.post("/api/profile", json={...})
    assert response.status_code == 200
```

### 3. Database Tests
```python
# Test database operations
def test_save_academic_data():
    data = AcademicData(gpa_unweighted=3.8, ...)
    db.session.add(data)
    db.session.commit()
    assert data.id is not None
```

---

## File Structure for Part 2

```
backend/
├── api/
│   ├── routes/
│   │   ├── auth.py           # Authentication endpoints
│   │   ├── profile.py        # Profile CRUD
│   │   ├── academic.py       # Academic data endpoints
│   │   ├── extracurriculars.py
│   │   ├── colleges.py       # College data endpoints
│   │   ├── calculations.py   # Probability calculation endpoints
│   │   └── saved_colleges.py
│   ├── dependencies.py       # JWT verification, DB session
│   └── middleware.py         # Custom middleware
├── database/
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── connection.py        # Database connection
│   └── migrations/          # SQL migration files
│       ├── 001_initial_schema.sql
│       └── 002_add_indexes.sql
├── services/
│   ├── auth_service.py      # Authentication logic
│   ├── profile_service.py   # Profile business logic
│   └── calculation_service.py # Probability calculations
├── config/
│   └── settings.py          # Environment config
└── tests/
    ├── test_auth.py
    ├── test_profile.py
    └── test_calculations.py
```

---

## Timeline Estimate

### Realistic Timeline (Taking it slow)

**Day 1 (3-4 hours):**
- ☐ Supabase setup (30 min)
- ☐ Database schema creation (1 hour)
- ☐ Basic API structure (1 hour)
- ☐ Authentication (1-1.5 hours)

**Day 2 (3-4 hours):**
- ☐ Profile endpoints (1.5 hours)
- ☐ Academic & EC endpoints (1 hour)
- ☐ College endpoints (1 hour)
- ☐ Probability integration (30 min)

**Day 3 (1-2 hours):**
- ☐ Testing (1 hour)
- ☐ Documentation (30 min)
- ☐ Deployment setup (30 min)

**Total: 7-10 hours spread over 2-3 days**

---

## Dependencies to Add

```txt
# Add to backend/requirements.txt

# Supabase
supabase==2.3.0
postgrest-py==0.13.0

# Database
psycopg2-binary==2.9.9  # Already have
asyncpg==0.29.0          # Already have

# Additional
python-jose[cryptography]==3.3.0  # Already have (JWT)
passlib[bcrypt]==1.7.4            # Already have (password hashing)
python-multipart==0.0.6           # Already have (file uploads)

# Testing
httpx==0.26.0           # For testing async endpoints
pytest-asyncio==0.23.3  # Already have
```

---

## What Happens Next

### Once You Give Me the Go-Ahead:

1. **You**: Create Supabase account, give me credentials
2. **Me**: Set up database schema
3. **Me**: Build all API endpoints
4. **Me**: Integrate with our scoring system
5. **Me**: Test everything
6. **Us**: Review together
7. **Me**: Document everything
8. **Result**: Working backend API ready for frontend

### Questions Before We Start:

1. **Database**: Are you comfortable with Supabase? (I strongly recommend it)
2. **Timeline**: Want to do this in one session or spread over a few days?
3. **Access**: Will you create the Supabase account, or want me to guide you step-by-step?

---

## Summary

**Best Approach**: Supabase + FastAPI
- **Why**: Fast, secure, professional, scalable
- **Cost**: Free for our needs
- **Time**: 7-10 hours total
- **Result**: Production-ready API + database

**What I Need**:
1. Your approval to use Supabase
2. Supabase credentials once you create account
3. Your availability for 3-4 hour sessions (or we go slower)

**What You Get**:
- Complete API with all endpoints
- Secure authentication
- Database with proper schema
- Integration with scoring system
- Ready for frontend to use

Ready to start? 🚀

---

**Version**: 1.0  
**Last Updated**: 2025-10-12  
**Status**: Awaiting user approval to proceed

