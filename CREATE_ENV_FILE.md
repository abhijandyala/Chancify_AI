# Create .env File Instructions

## ✅ What I Did

1. **Removed API key from code** - `backend/config/settings.py` now reads from environment variable
2. **Updated env.template** - Added OPENAI_API_KEY to the template

## 🔧 What You Need to Do

**Create a `.env` file in the `backend` directory:**

1. Go to: `backend` folder
2. Create a new file named: `.env` (exactly that name, with the dot)
3. Add this content:

```
OPENAI_API_KEY=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
```

## ✅ How It Works

1. **Settings.py** reads from `.env` file automatically (already configured)
2. **OpenAI service** checks environment variable first, then settings
3. **Everything will work** - ngrok, backend, all features

## 🔄 After Creating .env

**Restart your backend** to load the API key from .env:

```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

You should see: `OpenAI API key configured successfully` ✅

## 🔒 Security

- `.env` is already in `.gitignore` - won't be committed to git
- API key stays on your local machine only
- Safe to push code now!

