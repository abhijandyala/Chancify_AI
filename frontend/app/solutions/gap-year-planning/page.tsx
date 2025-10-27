import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Calendar, Target, Users, BookOpen } from 'lucide-react'

export default function GapYearPlanningPage() {
  return (
    <ROXPageTemplate
      title="Gap Year Planning"
      subtitle="Solutions"
      description="Strategic gap year planning to strengthen your college application while gaining valuable life experiences and skills."
      stats={[
        { value: "20%", label: "Gap Year Students" },
        { value: "12 Months", label: "Planning Timeline" },
        { value: "85%", label: "Improved Applications" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Gap Year Programs",
          description: "Explore structured gap year programs including volunteering, internships, and travel opportunities.",
          icon: <Calendar className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Skill Development",
          description: "Identify and pursue skill development opportunities that strengthen your college application.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Application Strategy",
          description: "Learn how to present your gap year experiences in college applications.",
          icon: <BookOpen className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Community Support",
          description: "Connect with other gap year students and share experiences and advice.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Plan Your Gap Year",
        href: "/home"
      }}
    />
  )
}
