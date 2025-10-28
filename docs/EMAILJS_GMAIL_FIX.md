# EmailJS Gmail Service Fix Guide

## 🚨 Current Issue: "Gmail_API: Request had insufficient authentication scopes"

This error occurs when your Gmail service in EmailJS doesn't have the proper permissions to send emails.

## 🔧 Step-by-Step Fix

### 1. Delete Current Gmail Service
1. Go to EmailJS Dashboard → "Email Services"
2. Find your current Gmail service (`service_gu5ac7e`)
3. Click the **trash/delete icon** to remove it
4. Confirm deletion

### 2. Create New Gmail Service
1. Click **"Add New Service"**
2. Select **"Gmail"**
3. Click **"Connect Account"**
4. Sign in with `chancifyai@gmail.com`
5. **IMPORTANT**: When prompted for permissions, grant ALL of these:
   - ✅ **Send email on your behalf**
   - ✅ **Read, compose, send, and permanently delete all your email from Gmail**
   - ✅ **Manage your Gmail settings**
   - ✅ **View your email address**
6. Click **"Allow"** to grant permissions

### 3. Configure Service Settings
1. **Service Name**: `ChancifyAI Contact Form`
2. **From Name**: `{{from_name}}`
3. **From Email**: Use default (your Gmail)
4. **Reply To**: `{{from_email}}`
5. **Save** the service

### 4. Update Service ID
1. Copy the new **Service ID** (it will be different from `service_gu5ac7e`)
2. Update your `frontend/.env.local` file:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=new_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_nbpghyb
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=igE0hcuIxtFuZMchC
   ```

### 5. Test the Service
1. Go to EmailJS → "Email Templates"
2. Click on your template (`template_nbpghyb`)
3. Click **"Test It"** button
4. Fill in test data and send
5. Check your Gmail inbox

## 🔍 Troubleshooting

### If you still get 412 errors:
1. **Check Gmail API quotas** - You might have hit daily limits
2. **Verify template variables** - Make sure they match exactly
3. **Test with minimal template** - Remove complex HTML temporarily

### If permissions are denied:
1. **Revoke access** in Gmail settings
2. **Reconnect** with fresh permissions
3. **Use different Gmail account** if needed

### Alternative: Use Different Email Service
If Gmail continues to have issues, consider:
1. **Outlook/Hotmail** - Often more reliable
2. **Yahoo Mail** - Good alternative
3. **Custom SMTP** - More control but complex

## 📊 Expected Results

After fixing:
- ✅ **No more 412 errors**
- ✅ **Emails sent successfully**
- ✅ **Statistics show successful sends**
- ✅ **Gmail inbox receives emails**

## 🚀 Next Steps

1. **Reconnect Gmail service** with proper permissions
2. **Update Service ID** in environment variables
3. **Test contact form** on live site
4. **Monitor EmailJS statistics** for success

## 📞 Support

If issues persist:
- EmailJS Support: https://www.emailjs.com/support
- Gmail API Documentation: https://developers.google.com/gmail/api
- Check EmailJS status: https://status.emailjs.com
