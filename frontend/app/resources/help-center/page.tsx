import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { HelpCircle, MessageCircle, BookOpen, Users } from 'lucide-react'

export default function HelpCenterPage() {
  return (
    <ROXPageTemplate
      title="Help Center"
      subtitle="Resources"
      description="Get help with Chancify AI through our comprehensive knowledge base, tutorials, and support resources."
      stats={[
        { value: "200+", label: "Help Articles" },
        { value: "24/7", label: "Support Available" },
        { value: "95%", label: "Issue Resolution" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Knowledge Base",
          description: "Comprehensive articles covering all aspects of using Chancify AI effectively.",
          icon: <BookOpen className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Video Tutorials",
          description: "Step-by-step video tutorials for all major platform features and workflows.",
          icon: <HelpCircle className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Community Support",
          description: "Connect with other users, ask questions, and share experiences.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Live Chat",
          description: "Get instant help through our live chat support system.",
          icon: <MessageCircle className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Get Help Now",
        href: "#",
        external: true
      }}
    />
  )
}
