# EmailJS Template for Chancify AI Contact Form

## Template Code (Copy this into EmailJS):

```html
<div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; background: #ffffff;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: #ffd700; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
      🎓 Chancify AI
    </h1>
    <p style="color: #ffffff; font-size: 16px; margin: 8px 0 0 0; opacity: 0.9;">
      New Contact Form Submission
    </p>
  </div>

  <!-- Main Content -->
  <div style="padding: 30px 20px; background: #ffffff;">
    
    <!-- Notification -->
    <div style="background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #1a1a1a;">
      <p style="margin: 0; color: #1a1a1a; font-weight: 600; font-size: 16px;">
        📧 A new message has been received from {{from_name}}
      </p>
      <p style="margin: 8px 0 0 0; color: #1a1a1a; font-size: 14px; opacity: 0.8;">
        Please respond at your earliest convenience.
      </p>
    </div>

    <!-- Message Card -->
    <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; padding: 25px; margin: 20px 0;">
      
      <!-- Sender Info -->
      <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e9ecef;">
        <div style="display: flex; align-items: center;">
          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
            <span style="color: #ffd700; font-size: 20px; font-weight: bold;">👤</span>
          </div>
          <div style="flex: 1;">
            <h3 style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 700;">{{from_name}}</h3>
            <p style="margin: 4px 0 0 0; color: #6c757d; font-size: 14px;">{{from_email}}</p>
          </div>
        </div>
      </div>

      <!-- Subject -->
      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">Subject:</h4>
        <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e9ecef;">
          <p style="margin: 0; color: #495057; font-size: 15px;">{{subject}}</p>
        </div>
      </div>

      <!-- Message -->
      <div>
        <h4 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">Message:</h4>
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; min-height: 100px;">
          <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #6c757d; font-size: 13px;">
        This email was sent from the Chancify AI contact form
      </p>
      <p style="margin: 8px 0 0 0; color: #6c757d; font-size: 12px;">
        Powered by EmailJS • Chancify AI © 2024
      </p>
    </div>

  </div>

  <!-- Bottom Accent -->
  <div style="height: 4px; background: linear-gradient(90deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%); border-radius: 0 0 12px 12px;"></div>

</div>
```

## Template Variables Used:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email  
- `{{subject}}` - Email subject
- `{{message}}` - Message content

## Design Features:
✅ **Chancify AI Brand Colors** - Black, yellow, white theme
✅ **Modern Typography** - Inter font family
✅ **Professional Layout** - Clean card-based design
✅ **Responsive Design** - Works on all devices
✅ **Brand Consistency** - Matches your website styling
✅ **Visual Hierarchy** - Clear information structure
✅ **Accessibility** - High contrast and readable fonts

## Setup Instructions:
1. Go to EmailJS → Email Templates
2. Create New Template
3. Paste the HTML code above
4. Save and copy the Template ID
5. Test with your contact form!
