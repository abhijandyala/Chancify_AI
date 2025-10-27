import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <ROXPageTemplate
      title="Contact Us"
      subtitle="Company"
      description="Get in touch with our team for support, partnerships, media inquiries, or general questions about Chancify AI."
      stats={[
        { value: "< 24h", label: "Response Time" },
        { value: "24/7", label: "Support Available" },
        { value: "95%", label: "Satisfaction Rate" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "General Support",
          description: "Get help with platform features, account issues, or general questions.",
          icon: <MessageCircle className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Partnership Inquiries",
          description: "Interested in partnering with us? We'd love to hear from you.",
          icon: <Mail className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Media & Press",
          description: "Press inquiries, media requests, and interview opportunities.",
          icon: <Phone className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Office Location",
          description: "Visit our headquarters or schedule an in-person meeting.",
          icon: <MapPin className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Send Message",
        href: "mailto:contact@chancifyai.com"
      }}
    />
  )
}
