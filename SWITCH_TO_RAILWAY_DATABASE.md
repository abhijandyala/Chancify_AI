# How to Switch to Railway PostgreSQL Database

## 🎯 Why Switch?
- Your Supabase database isn't connecting
- Railway PostgreSQL is easier and more reliable
- Everything in one place (frontend + database)

## 📋 Step-by-Step Instructions

### Step 1: Create Railway Database
1. Go to https://railway.app
2. Log in to your account
3. Open your project (or create new one)
4. Click **"+ New"** button
5. Select **"Database"**
6. Choose **"Add PostgreSQL"**
7. Wait for Railway to create the database (30 seconds)

### Step 2: Get Database Connection String
1. Click on your new PostgreSQL database
2. Go to **"Variables"** tab
3. Find `DATABASE_URL` or `POSTGRES_URL`
4. Copy the full connection string
   - Looks like: `postgresql://postgres:PASSWORD@HOST:PORT/railway`

### Step 3: Update Backend Configuration
1. Open `backend/config/settings.py`
2. Find this line:
   ```python
   database_url: str = "postgresql://postgres:Chanifcy123%23%40%21@db.vwvqfellrhxznesaifwe.supabase.co:5432/postgres"
   ```
3. Replace it with your Railway database URL:
   ```python
   database_url: str = "postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:PORT/railway"
   ```

### Step 4: Restart Backend
1. Stop your current backend (Ctrl+C)
2. Restart it: `cd backend && python main.py`
3. You should see: `Database engine created successfully` ✅

## ✅ What This Fixes

- ✅ Database connection will work
- ✅ No more "could not translate host name" errors
- ✅ User authentication will work
- ✅ All database features will work
- ✅ Data persists even when your computer is off

## 🔒 Security Note

**IMPORTANT:** Don't commit your database password to GitHub!
- Use environment variables instead
- Create `.env` file in `backend/` folder
- Add: `DATABASE_URL=postgresql://...`
- Add `.env` to `.gitignore`

---

**After switching, your database will be:**
- Always online
- Accessible from anywhere
- Easy to manage in Railway dashboard
- Reliable connection

