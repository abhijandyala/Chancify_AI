import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { ArrowRight, BookOpen, Target, Users } from 'lucide-react'

export default function TransferStudentsPage() {
  return (
    <ROXPageTemplate
      title="Transfer Students"
      subtitle="Solutions"
      description="Specialized tools and guidance for students transferring from community college or other institutions to their dream university."
      stats={[
        { value: "25%", label: "Transfer Success Rate" },
        { value: "500+", label: "Transfer-Friendly Schools" },
        { value: "2.5+", label: "Average GPA Required" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Transfer Credit Analysis",
          description: "Analyze which credits will transfer and plan your academic path accordingly.",
          icon: <BookOpen className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Transfer-Friendly Schools",
          description: "Find universities with generous transfer policies and strong support systems.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Application Strategy",
          description: "Tailored application approach highlighting your transfer experience and goals.",
          icon: <ArrowRight className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Community Support",
          description: "Connect with other transfer students and learn from their experiences.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Start Transfer Process",
        href: "/home"
      }}
    />
  )
}
