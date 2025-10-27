import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Users, Target, Heart, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <ROXPageTemplate
      title="About Chancify AI"
      subtitle="Company"
      description="We're on a mission to democratize college admissions by making advanced AI-powered prediction tools accessible to every student."
      stats={[
        { value: "500K+", label: "Students Helped" },
        { value: "2023", label: "Founded" },
        { value: "50+", label: "Team Members" },
        { value: "100%", label: "Free Platform" }
      ]}
      features={[
        {
          title: "Our Mission",
          description: "To level the playing field in college admissions by providing every student with access to advanced AI-powered tools and insights.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Our Vision",
          description: "A world where every student has the tools and knowledge to make informed decisions about their educational future.",
          icon: <Heart className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Our Team",
          description: "Passionate educators, data scientists, and engineers working together to revolutionize college admissions.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Our Technology",
          description: "Cutting-edge machine learning algorithms trained on real admission data to provide accurate predictions.",
          icon: <Zap className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Join Our Mission",
        href: "/careers"
      }}
    />
  )
}
