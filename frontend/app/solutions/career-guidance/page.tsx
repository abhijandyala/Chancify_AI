import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Briefcase, Target, Users, TrendingUp } from 'lucide-react'

export default function CareerGuidancePage() {
  return (
    <ROXPageTemplate
      title="Career Guidance"
      subtitle="Solutions"
      description="Connect your college choices with your career goals through comprehensive career exploration and planning tools."
      stats={[
        { value: "500+", label: "Career Paths" },
        { value: "90%", label: "Career Clarity" },
        { value: "10+", label: "Assessment Tools" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Career Assessment",
          description: "Comprehensive career assessments to identify your interests, skills, and values.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Major Exploration",
          description: "Explore college majors and their connection to various career paths.",
          icon: <Briefcase className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Industry Insights",
          description: "Learn about different industries, job markets, and career growth opportunities.",
          icon: <TrendingUp className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Mentorship Network",
          description: "Connect with professionals in your field of interest for guidance and advice.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Explore Careers",
        href: "/home"
      }}
    />
  )
}
