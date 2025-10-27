import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Calendar, FileText, Target, CheckCircle } from 'lucide-react'

export default function CollegePrepPage() {
  return (
    <ROXPageTemplate
      title="College Prep"
      subtitle="Solutions"
      description="Complete college preparation program covering everything from academic planning to application submission."
      stats={[
        { value: "12 Months", label: "Prep Timeline" },
        { value: "50+", label: "Prep Modules" },
        { value: "90%", label: "Completion Rate" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Timeline Planning",
          description: "Structured timeline covering all aspects of college preparation from junior year to application submission.",
          icon: <Calendar className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Application Strategy",
          description: "Strategic approach to building a compelling college application that stands out.",
          icon: <FileText className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Essay Writing",
          description: "AI-powered essay writing assistance for personal statements and supplemental essays.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Application Tracking",
          description: "Comprehensive tracking system to ensure nothing falls through the cracks.",
          icon: <CheckCircle className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Start College Prep",
        href: "/home"
      }}
    />
  )
}
