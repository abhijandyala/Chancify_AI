import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { BookOpen, FileText, Users, TrendingUp } from 'lucide-react'

export default function BlogPage() {
  return (
    <ROXPageTemplate
      title="Blog"
      subtitle="Resources"
      description="Stay updated with the latest college admission trends, tips, and insights from our team of education experts."
      stats={[
        { value: "100+", label: "Articles Published" },
        { value: "50K+", label: "Monthly Readers" },
        { value: "Weekly", label: "New Content" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Admission Tips",
          description: "Expert advice on improving your college application and increasing admission chances.",
          icon: <BookOpen className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Success Stories",
          description: "Real student success stories and case studies from our community.",
          icon: <FileText className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Industry News",
          description: "Latest updates on college admission policies, test changes, and education trends.",
          icon: <TrendingUp className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Community Insights",
          description: "Data-driven insights from our community of students and parents.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        }
      ]}
    />
  )
}
