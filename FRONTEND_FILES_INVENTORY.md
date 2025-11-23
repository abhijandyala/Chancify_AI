# Frontend Files Inventory - Assessment, Profile, and College Selection Pages

## 📋 Assessment Page (`/home` or `/app/(dashboard)/home/page.tsx`)

### Main Page File
- `frontend/app/(dashboard)/home/page.tsx` - Main assessment page component

### UI Components Used
- `frontend/components/ui/GlassCard.tsx` - Glass card container component
- `frontend/components/ui/Input.tsx` - Input field component
- `frontend/components/ui/ROXSelect.tsx` - Select dropdown component
- `frontend/components/ui/MajorAutocomplete.tsx` - Major autocomplete component
- `frontend/components/ui/InfoIcon.tsx` - Info icon component
- `frontend/components/ui/InfoModal.tsx` - Info modal dialog
- `frontend/components/ui/Button.tsx` - Button component
- `frontend/components/ui/MajorSelectionModal.tsx` - Major selection modal
- `frontend/components/SaveModal.tsx` - Save preset modal

### Libraries & Utilities
- `frontend/lib/colleges.ts` - College data constants
- `frontend/lib/factorDescriptions.ts` - Factor descriptions for info modals
- `frontend/lib/preset-storage.ts` - Preset storage utility (localStorage wrapper)

### External Dependencies
- `framer-motion` - Animation library
- `lucide-react` - Icon library (GraduationCap, Star, Building2, Calculator, Brain, Zap, Target, ChevronRight)
- `next/navigation` - Next.js router (useRouter)

### Layout Files (Shared)
- `frontend/app/(dashboard)/layout.tsx` - Dashboard layout wrapper
- `frontend/components/layout/Header.tsx` - Header component
- `frontend/components/layout/Sidebar.tsx` - Sidebar navigation
- `frontend/components/providers/AuthProvider.tsx` - Auth context provider
- `frontend/components/auth/ProtectedRoute.tsx` - Route protection wrapper

---

## 📋 Profile Page (`/profile` or `/app/(dashboard)/profile/page.tsx`)

### Main Page File
- `frontend/app/(dashboard)/profile/page.tsx` - Profile/presets page component

### Libraries & Utilities
- `frontend/lib/preset-storage.ts` - Preset storage utility (localStorage wrapper)

### External Dependencies
- `framer-motion` - Animation library
- `lucide-react` - Icon library (ArrowLeft, BookOpen, Clock, Loader2, Trash2)
- `next/navigation` - Next.js router (useRouter)

### Layout Files (Shared)
- `frontend/app/(dashboard)/layout.tsx` - Dashboard layout wrapper
- `frontend/components/layout/Header.tsx` - Header component
- `frontend/components/layout/Sidebar.tsx` - Sidebar navigation
- `frontend/components/providers/AuthProvider.tsx` - Auth context provider
- `frontend/components/auth/ProtectedRoute.tsx` - Route protection wrapper

---

## 📋 College Selection Page (`/college-selection` or `/app/(dashboard)/college-selection/page.tsx`)

### Main Page File
- `frontend/app/(dashboard)/college-selection/page.tsx` - College selection page component

### UI Components Used
- `frontend/components/ui/Button.tsx` - Button component
- `frontend/components/Loader.tsx` - Loading animation component

### API & Hooks
- `frontend/lib/api.ts` - API client functions:
  - `getCollegeSuggestions()` - Get AI college suggestions
  - `searchColleges()` - Search colleges by name
  - Types: `CollegeSuggestionsRequest`, `CollegeSuggestion`, `CollegeSearchResult`
- `frontend/lib/hooks/useTuitionByZipcode.ts` - Hook for single college tuition by zipcode
- `frontend/lib/hooks/useMultipleTuitionByZipcode.ts` - Hook for multiple colleges tuition by zipcode

### External Dependencies
- `framer-motion` - Animation library
- `lucide-react` - Icon library (Search, Building2, Users, DollarSign, GraduationCap, ChevronRight, Star, MapPin, Loader2, BookOpen)
- `next/navigation` - Next.js router (useRouter)

### Layout Files (Shared)
- `frontend/app/(dashboard)/layout.tsx` - Dashboard layout wrapper
- `frontend/components/layout/Header.tsx` - Header component
- `frontend/components/layout/Sidebar.tsx` - Sidebar navigation
- `frontend/components/providers/AuthProvider.tsx` - Auth context provider
- `frontend/components/auth/ProtectedRoute.tsx` - Route protection wrapper

---

## 🔗 Shared Configuration Files

### API Configuration
- `frontend/lib/config.ts` - API base URL resolution and ngrok headers:
  - `getApiBaseUrl()` - Resolves backend URL
  - `withNgrokHeaders()` - Adds ngrok headers
  - `getBackendUrl()` - Constructs full backend URL

### Type Definitions
- `frontend/lib/api.ts` - TypeScript interfaces:
  - `CollegeSuggestionsRequest`
  - `CollegeSuggestion`
  - `CollegeSearchResult`

---

## 📁 Complete File Tree

```
frontend/
├── app/
│   └── (dashboard)/
│       ├── layout.tsx                    # Dashboard layout (shared)
│       ├── home/
│       │   └── page.tsx                  # Assessment page ⭐ MAIN
│       ├── profile/
│       │   └── page.tsx                  # Profile/presets page ⭐ MAIN
│       └── college-selection/
│           └── page.tsx                  # College selection page ⭐ MAIN
│
├── components/
│   ├── ui/
│   │   ├── GlassCard.tsx                 # Used by: home
│   │   ├── Input.tsx                     # Used by: home
│   │   ├── ROXSelect.tsx                 # Used by: home
│   │   ├── MajorAutocomplete.tsx         # Used by: home
│   │   ├── InfoIcon.tsx                  # Used by: home
│   │   ├── InfoModal.tsx                 # Used by: home
│   │   ├── Button.tsx                    # Used by: home, college-selection
│   │   └── MajorSelectionModal.tsx       # Used by: home
│   ├── SaveModal.tsx                     # Used by: home
│   ├── Loader.tsx                        # Used by: college-selection
│   ├── layout/
│   │   ├── Header.tsx                    # Shared (all pages)
│   │   └── Sidebar.tsx                   # Shared (all pages)
│   ├── providers/
│   │   └── AuthProvider.tsx              # Shared (all pages)
│   └── auth/
│       └── ProtectedRoute.tsx            # Shared (all pages)
│
└── lib/
    ├── api.ts                            # Used by: college-selection
    ├── config.ts                         # Used by: all (API URLs)
    ├── colleges.ts                       # Used by: home
    ├── factorDescriptions.ts             # Used by: home
    ├── preset-storage.ts                 # Used by: home, profile
    └── hooks/
        ├── useTuitionByZipcode.ts         # Used by: college-selection
        └── useMultipleTuitionByZipcode.ts # Used by: college-selection
```

## 📝 Detailed File List

### Assessment Page (`/home`) - Complete File List

**Main Page:**
1. `frontend/app/(dashboard)/home/page.tsx`

**UI Components:**
2. `frontend/components/ui/GlassCard.tsx`
3. `frontend/components/ui/Input.tsx`
4. `frontend/components/ui/ROXSelect.tsx`
5. `frontend/components/ui/MajorAutocomplete.tsx`
6. `frontend/components/ui/InfoIcon.tsx`
7. `frontend/components/ui/InfoModal.tsx`
8. `frontend/components/ui/Button.tsx`
9. `frontend/components/ui/MajorSelectionModal.tsx`
10. `frontend/components/SaveModal.tsx`

**Library Files:**
11. `frontend/lib/colleges.ts`
12. `frontend/lib/factorDescriptions.ts`
13. `frontend/lib/preset-storage.ts`

**Shared Layout (Required):**
14. `frontend/app/(dashboard)/layout.tsx`
15. `frontend/components/layout/Header.tsx`
16. `frontend/components/layout/Sidebar.tsx`
17. `frontend/components/providers/AuthProvider.tsx`
18. `frontend/components/auth/ProtectedRoute.tsx`
19. `frontend/lib/config.ts` (via AuthProvider)

**Total: 19 files**

---

### Profile Page (`/profile`) - Complete File List

**Main Page:**
1. `frontend/app/(dashboard)/profile/page.tsx`

**Library Files:**
2. `frontend/lib/preset-storage.ts`

**Shared Layout (Required):**
3. `frontend/app/(dashboard)/layout.tsx`
4. `frontend/components/layout/Header.tsx`
5. `frontend/components/layout/Sidebar.tsx`
6. `frontend/components/providers/AuthProvider.tsx`
7. `frontend/components/auth/ProtectedRoute.tsx`
8. `frontend/lib/config.ts` (via AuthProvider)

**Total: 8 files**

---

### College Selection Page (`/college-selection`) - Complete File List

**Main Page:**
1. `frontend/app/(dashboard)/college-selection/page.tsx`

**UI Components:**
2. `frontend/components/ui/Button.tsx`
3. `frontend/components/Loader.tsx`

**API & Hooks:**
4. `frontend/lib/api.ts`
5. `frontend/lib/hooks/useTuitionByZipcode.ts`
6. `frontend/lib/hooks/useMultipleTuitionByZipcode.ts`

**Shared Layout (Required):**
7. `frontend/app/(dashboard)/layout.tsx`
8. `frontend/components/layout/Header.tsx`
9. `frontend/components/layout/Sidebar.tsx`
10. `frontend/components/providers/AuthProvider.tsx`
11. `frontend/components/auth/ProtectedRoute.tsx`
12. `frontend/lib/config.ts` (used by api.ts and hooks)

**Total: 12 files**

---

## 📊 Summary by Page

### Assessment Page (`/home`)
**Total Files: 19**
- 1 main page file
- 9 UI components
- 3 library files
- 6 shared layout/config files

### Profile Page (`/profile`)
**Total Files: 8**
- 1 main page file
- 1 library file
- 6 shared layout/config files

### College Selection Page (`/college-selection`)
**Total Files: 12**
- 1 main page file
- 2 UI components
- 1 API client file
- 2 custom hooks
- 6 shared layout/config files

---

## 🔍 Key Dependencies

### npm Packages Used
- `framer-motion` - Animations (all pages)
- `lucide-react` - Icons (all pages)
- `next` - Framework (all pages)
- `react` - Core library (all pages)

### Internal Shared Files
- `frontend/lib/config.ts` - API configuration (used by all pages via hooks)
- `frontend/lib/utils.ts` - Utility functions (cn helper, used by UI components)
- `frontend/components/providers/AuthProvider.tsx` - Auth state (all pages)
- `frontend/app/(dashboard)/layout.tsx` - Page layout wrapper (all pages)

---

## 🔗 Component Dependencies

### UI Components That Import Other Files
- `GlassCard.tsx` → imports `@/lib/utils` (cn function)
- `ROXSelect.tsx` → imports `framer-motion`, `lucide-react`
- `Input.tsx` → imports `@/lib/utils`
- `Button.tsx` → imports `@/lib/utils`
- `MajorAutocomplete.tsx` → may import other utilities
- `InfoModal.tsx` → may import other utilities
- `MajorSelectionModal.tsx` → may import other utilities

### API Dependencies
- `api.ts` → imports `@/lib/config` (getApiBaseUrl, withNgrokHeaders)
- `useTuitionByZipcode.ts` → imports `@/lib/config`
- `useMultipleTuitionByZipcode.ts` → imports `@/lib/config`

