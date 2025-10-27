import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { BookOpen, Target, Clock, Award } from 'lucide-react'

export default function SATPrepPage() {
  return (
    <ROXPageTemplate
      title="SAT Prep"
      subtitle="Products"
      description="Comprehensive SAT preparation with personalized study plans, practice tests, and AI-powered performance analytics."
      stats={[
        { value: "200+", label: "Practice Questions" },
        { value: "10+", label: "Full Practice Tests" },
        { value: "150+", label: "Score Improvement" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Adaptive Learning",
          description: "Personalized study plans that adapt to your strengths and weaknesses.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Practice Tests",
          description: "Full-length practice tests with detailed explanations and score analysis.",
          icon: <BookOpen className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Progress Tracking",
          description: "Monitor your improvement with detailed analytics and performance insights.",
          icon: <Award className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Flexible Scheduling",
          description: "Study at your own pace with flexible scheduling and reminder systems.",
          icon: <Clock className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Start SAT Prep",
        href: "/sat"
      }}
    />
  )
}
