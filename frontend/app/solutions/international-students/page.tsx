import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Globe, FileText, Target, Users } from 'lucide-react'

export default function InternationalStudentsPage() {
  return (
    <ROXPageTemplate
      title="International Students"
      subtitle="Solutions"
      description="Comprehensive support for international students navigating the US college application process, including visa requirements and cultural adaptation."
      stats={[
        { value: "15%", label: "International Acceptance Rate" },
        { value: "1M+", label: "International Students" },
        { value: "50+", label: "Countries Supported" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Visa Guidance",
          description: "Comprehensive guidance on F-1 visa requirements and application process.",
          icon: <Globe className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Application Support",
          description: "Specialized support for international applications including TOEFL/IELTS requirements.",
          icon: <FileText className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Cultural Preparation",
          description: "Prepare for American college culture and academic expectations.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "International Community",
          description: "Connect with other international students and share experiences.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Start International Journey",
        href: "/home"
      }}
    />
  )
}
