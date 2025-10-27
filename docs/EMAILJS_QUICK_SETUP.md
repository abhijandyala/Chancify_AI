# EmailJS Setup Instructions

## Quick Setup Steps:

### 1. Add Email Service
- Click "Add New Service" in EmailJS dashboard
- Choose "Gmail" 
- Connect your chancifyai@gmail.com account
- Copy the Service ID (e.g., service_abc123)

### 2. Create Email Template
- Go to "Email Templates" → "Create New Template"
- Use this template:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This email was sent from the Chancify AI contact form.
```

- Save and copy Template ID (e.g., template_xyz789)

### 3. Get Public Key
- Go to "Account" → "General"
- Copy Public Key (e.g., user_abc123def456)

### 4. Create .env.local file
Create `frontend/.env.local` with:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 5. Test
- Restart your frontend server
- Fill out contact form
- Check chancifyai@gmail.com inbox

## Troubleshooting:
- Make sure .env.local is in frontend/ directory
- Restart server after adding environment variables
- Check browser console for errors
- Verify Gmail account is properly connected in EmailJS
