# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you're using chancifyai@gmail.com)
4. Connect your Gmail account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This email was sent from the Chancify AI contact form.
```

4. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `user_abc123def456`)

## Step 5: Update Code
Replace these values in `frontend/app/company/contact/page.tsx`:

```javascript
const serviceId = 'YOUR_SERVICE_ID'        // From Step 2
const templateId = 'YOUR_TEMPLATE_ID'      // From Step 3  
const publicKey = 'YOUR_PUBLIC_KEY'        // From Step 4
```

## Step 6: Test
1. Deploy your changes
2. Fill out the contact form
3. Check your Gmail inbox for the email

## Alternative: Quick Setup with Environment Variables

Add to your `.env.local` file:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update the code to use:
```javascript
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

## Free Tier Limits
- 200 emails per month
- Perfect for a contact form
- No credit card required

## Troubleshooting
- Make sure Gmail account is properly connected
- Check that template variables match exactly
- Verify public key is correct
- Check browser console for errors
