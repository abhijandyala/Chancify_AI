import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { User, FileText, Award, TrendingUp } from 'lucide-react'

export default function ProfileBuilderPage() {
  return (
    <ROXPageTemplate
      title="Profile Builder"
      subtitle="Products"
      description="Build a comprehensive academic profile that showcases your strengths and maximizes your college admission chances."
      stats={[
        { value: "95%", label: "Profile Completion Rate" },
        { value: "50+", label: "Profile Sections" },
        { value: "100%", label: "Free to Use" },
        { value: "24/7", label: "Access Available" }
      ]}
      features={[
        {
          title: "Academic Tracking",
          description: "Track your GPA, course rigor, and academic achievements throughout high school.",
          icon: <Award className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Extracurricular Management",
          description: "Organize and showcase your activities, leadership roles, and community involvement.",
          icon: <User className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Essay Builder",
          description: "Craft compelling personal statements and supplemental essays with AI assistance.",
          icon: <FileText className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Progress Analytics",
          description: "Monitor your profile strength and get recommendations for improvement.",
          icon: <TrendingUp className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Start Building Profile",
        href: "/profile"
      }}
    />
  )
}
