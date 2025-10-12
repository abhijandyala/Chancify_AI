# Chancify AI - Project Structure

## Directory Overview

```
Chancify_AI/
│
├── backend/                    # Python FastAPI Backend
│   ├── api/                   # API routes and endpoints
│   │   ├── routes/           # Route handlers
│   │   │   ├── auth.py
│   │   │   ├── profile.py
│   │   │   ├── colleges.py
│   │   │   ├── predictions.py
│   │   │   └── game_plan.py
│   │   └── dependencies.py   # Shared dependencies
│   │
│   ├── models/                # ML models
│   │   ├── probability/      # Probability calculation models
│   │   ├── preprocessing/    # Data preprocessing
│   │   └── evaluation/       # Model evaluation
│   │
│   ├── database/              # Database layer
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── crud.py           # CRUD operations
│   │   └── migrations/       # Alembic migrations
│   │
│   ├── core/                  # Core business logic
│   │   ├── factors.py        # Factor scoring logic
│   │   ├── probability.py    # Probability calculations
│   │   ├── game_plan.py      # Game plan generation
│   │   └── utils.py          # Utility functions
│   │
│   ├── config/                # Configuration
│   │   ├── settings.py       # App settings
│   │   └── constants.py      # Constants
│   │
│   ├── main.py               # FastAPI app entry point
│   ├── requirements.txt      # Python dependencies
│   └── env.template          # Environment variables template
│
├── frontend/                  # Next.js React Frontend
│   ├── src/
│   │   ├── app/              # Next.js 14+ app directory
│   │   │   ├── layout.tsx    # Root layout
│   │   │   ├── page.tsx      # Home page
│   │   │   ├── dashboard/    # User dashboard
│   │   │   ├── profile/      # Profile input/editing
│   │   │   ├── colleges/     # College search & selection
│   │   │   ├── results/      # Probability results
│   │   │   └── game-plan/    # Personalized game plan
│   │   │
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base UI components (buttons, inputs, etc.)
│   │   │   ├── forms/        # Form components
│   │   │   ├── charts/       # Data visualization
│   │   │   └── layout/       # Layout components
│   │   │
│   │   ├── services/          # API client services
│   │   │   ├── api.ts        # API client configuration
│   │   │   ├── auth.ts       # Authentication service
│   │   │   ├── profile.ts    # Profile service
│   │   │   └── colleges.ts   # College data service
│   │   │
│   │   ├── hooks/             # Custom React hooks
│   │   ├── store/             # State management (Zustand)
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   │
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── next.config.js         # Next.js config
│
├── data/                      # Data files and configurations
│   ├── factors/               # Admissions factor definitions
│   │   ├── admissions_factors.json
│   │   └── FACTORS_DOCUMENTATION.md
│   │
│   ├── colleges/              # College-specific data
│   │   ├── college_profiles/  # Individual college JSON files
│   │   └── acceptance_rates/  # Historical acceptance rate data
│   │
│   └── schemas/               # Data validation schemas
│       ├── user_profile_schema.json
│       └── college_data_schema.json
│
├── docs/                      # Documentation
│   ├── methodology/           # Methodology documentation
│   │   ├── probability_calculation.md
│   │   └── game_plan_generation.md
│   │
│   ├── api/                   # API documentation
│   ├── PROJECT_STRUCTURE.md   # This file
│   └── DEVELOPMENT.md         # Development guide (to be created)
│
├── tests/                     # Test suites
│   ├── backend/              # Backend tests
│   │   ├── test_api/
│   │   ├── test_models/
│   │   └── test_core/
│   │
│   └── frontend/             # Frontend tests
│       └── __tests__/
│
├── scripts/                   # Utility scripts
│   ├── setup/                # Setup scripts
│   ├── data_import/          # Data import/migration scripts
│   └── training/             # ML model training scripts
│
├── .gitignore                # Git ignore rules
└── README.md                 # Project README

```

---

## Component Responsibilities

### Backend (`/backend`)

#### API Layer (`/api`)
- **Purpose**: HTTP request handling and response formatting
- **Key Files**:
  - `routes/auth.py` - User authentication (register, login, logout)
  - `routes/profile.py` - User profile CRUD operations
  - `routes/colleges.py` - College data retrieval and search
  - `routes/predictions.py` - Admission probability calculations
  - `routes/game_plan.py` - Personalized game plan generation

#### Models (`/models`)
- **Purpose**: Machine learning models for probability predictions
- **Components**:
  - Factor-based scoring models
  - ML ensemble models (Logistic Regression, Random Forest, XGBoost)
  - Model training and evaluation pipelines
  - Model persistence and versioning

#### Database (`/database`)
- **Purpose**: Data persistence and retrieval
- **Components**:
  - SQLAlchemy ORM models (User, Profile, College, Prediction)
  - Pydantic schemas for validation
  - CRUD operations
  - Database migrations (Alembic)

#### Core (`/core`)
- **Purpose**: Business logic implementation
- **Components**:
  - `factors.py` - Individual factor scoring algorithms
  - `probability.py` - Probability calculation engine
  - `game_plan.py` - Game plan generation logic
  - `utils.py` - Helper functions

---

### Frontend (`/frontend`)

#### App Directory (`/src/app`)
- **Purpose**: Page components and routing (Next.js 14+ App Router)
- **Key Routes**:
  - `/` - Landing page
  - `/dashboard` - User dashboard overview
  - `/profile` - Profile creation and editing
  - `/colleges` - College search and selection
  - `/results` - Probability results display
  - `/game-plan` - Personalized recommendations

#### Components (`/src/components`)
- **Purpose**: Reusable UI components
- **Categories**:
  - `ui/` - Base components (Button, Input, Card, Modal)
  - `forms/` - Form components with validation
  - `charts/` - Data visualization (probability charts, factor breakdowns)
  - `layout/` - Header, Footer, Sidebar components

#### Services (`/src/services`)
- **Purpose**: API integration and data fetching
- **Key Services**:
  - Authentication API calls
  - Profile management
  - College data retrieval
  - Prediction requests

#### State Management (`/src/store`)
- **Purpose**: Global state management using Zustand
- **Stores**:
  - User authentication state
  - Profile data
  - Selected colleges
  - Prediction results

---

### Data (`/data`)

#### Factors (`/data/factors`)
- **Content**: Admissions factor definitions and weights
- **Files**:
  - `admissions_factors.json` - Machine-readable factor configuration
  - `FACTORS_DOCUMENTATION.md` - Human-readable factor explanations

#### Colleges (`/data/colleges`)
- **Content**: College-specific data and statistics
- **Structure**:
  - Individual JSON files per college
  - Acceptance rates, test score ranges, demographics
  - Custom factor weights per institution

#### Schemas (`/data/schemas`)
- **Content**: JSON schemas for data validation
- **Files**:
  - `user_profile_schema.json` - User profile structure
  - `college_data_schema.json` - College data structure

---

### Documentation (`/docs`)

#### Methodology (`/docs/methodology`)
- **Content**: Detailed explanation of algorithms
- **Files**:
  - `probability_calculation.md` - How probabilities are calculated
  - `game_plan_generation.md` - How game plans are generated

#### API Documentation (`/docs/api`)
- **Content**: API endpoint documentation
- **To be created**: OpenAPI/Swagger documentation

---

## Data Flow

### User Profile Creation
```
Frontend Form → API /profile → Validation (Pydantic) → Database (PostgreSQL)
```

### Probability Calculation
```
User selects colleges → API /predictions → 
    ↓
Load user profile + college data →
    ↓
Factor scoring (core/factors.py) →
    ↓
ML model prediction (models/probability/) →
    ↓
Probability calibration →
    ↓
Return results to frontend
```

### Game Plan Generation
```
Probability results → API /game-plan →
    ↓
Analyze factor strengths/weaknesses →
    ↓
Generate personalized recommendations →
    ↓
Create timeline and action items →
    ↓
Return game plan to frontend
```

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 + React | Modern web framework with SSR |
| | TypeScript | Type safety |
| | Tailwind CSS | Styling |
| | Zustand | State management |
| | Recharts | Data visualization |
| **Backend** | FastAPI | High-performance API framework |
| | Python 3.11+ | Backend language |
| | Pydantic | Data validation |
| | SQLAlchemy | ORM |
| **Database** | PostgreSQL | Relational database |
| **ML** | scikit-learn | Traditional ML models |
| | XGBoost | Gradient boosting |
| | pandas/numpy | Data manipulation |
| **DevOps** | Docker | Containerization |
| | GitHub Actions | CI/CD |
| **Hosting** | Vercel | Frontend hosting |
| | Railway/AWS | Backend hosting |

---

## Development Workflow

### 1. Local Development Setup
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python main.py

# Frontend
cd frontend
npm install
npm run dev
```

### 2. Git Workflow
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes, commit
git add .
git commit -m "Description of changes"

# Push and create PR
git push origin feature/feature-name
```

### 3. Testing
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

---

## Next Steps

Refer to the TODO list and development phases in the main README.md for implementation priorities.

---

**Version**: 1.0  
**Last Updated**: 2025-10-12

