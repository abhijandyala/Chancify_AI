import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { FileText, TrendingUp, Users, Award } from 'lucide-react'

export default function CaseStudiesPage() {
  return (
    <ROXPageTemplate
      title="Case Studies"
      subtitle="Resources"
      description="Real success stories and detailed case studies showcasing how students achieved their college admission goals with Chancify AI."
      stats={[
        { value: "500+", label: "Success Stories" },
        { value: "95%", label: "Admission Rate" },
        { value: "50+", label: "Top Universities" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Student Success Stories",
          description: "Detailed accounts of how students used our platform to get into their dream schools.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Admission Analysis",
          description: "In-depth analysis of what made successful applications stand out.",
          icon: <TrendingUp className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Strategy Breakdowns",
          description: "Step-by-step breakdowns of successful application strategies.",
          icon: <FileText className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Outcome Tracking",
          description: "Long-term tracking of student outcomes and career success.",
          icon: <Award className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Read Case Studies",
        href: "#",
        external: true
      }}
    />
  )
}
