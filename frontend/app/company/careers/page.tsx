import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Users, Zap, Heart, Award } from 'lucide-react'

export default function CareersPage() {
  return (
    <ROXPageTemplate
      title="Careers"
      subtitle="Company"
      description="Join our mission to democratize college admissions. We're looking for passionate individuals who want to make a difference in education."
      stats={[
        { value: "50+", label: "Open Positions" },
        { value: "Remote", label: "Work Options" },
        { value: "Competitive", label: "Benefits" },
        { value: "Growth", label: "Opportunities" }
      ]}
      features={[
        {
          title: "Our Culture",
          description: "A collaborative, inclusive environment where innovation and impact drive everything we do.",
          icon: <Heart className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Open Positions",
          description: "Explore current openings in engineering, product, design, and education roles.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Benefits & Perks",
          description: "Competitive compensation, health benefits, flexible work arrangements, and professional development.",
          icon: <Award className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Growth Opportunities",
          description: "Fast-paced startup environment with opportunities to learn, grow, and make a real impact.",
          icon: <Zap className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "View Open Positions",
        href: "#",
        external: true
      }}
    />
  )
}
