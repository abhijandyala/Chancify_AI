import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { GraduationCap, Target, Users, BookOpen } from 'lucide-react'

export default function HighSchoolStudentsPage() {
  return (
    <ROXPageTemplate
      title="High School Students"
      subtitle="Solutions"
      description="Comprehensive college preparation tools designed specifically for high school students to maximize their admission chances."
      stats={[
        { value: "500K+", label: "Students Helped" },
        { value: "4 Years", label: "Preparation Timeline" },
        { value: "95%", label: "Success Rate" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Academic Planning",
          description: "Plan your high school course load to maximize college readiness and GPA.",
          icon: <BookOpen className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Extracurricular Strategy",
          description: "Build a compelling extracurricular profile that colleges want to see.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Test Preparation",
          description: "Comprehensive SAT/ACT prep with personalized study plans and practice tests.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "College Matching",
          description: "Find colleges that match your academic profile, interests, and goals.",
          icon: <GraduationCap className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Start Your Journey",
        href: "/home"
      }}
    />
  )
}
