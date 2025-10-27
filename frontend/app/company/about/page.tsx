import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Users, Target, Heart, Zap, Clock, Code, School } from 'lucide-react'

export default function AboutPage() {
  return (
    <ROXPageTemplate
      title="About Chancify AI"
      subtitle="Company"
      description="Built by passionate 10th graders at Marvin Ridge High School, Chancify AI democratizes college admissions through advanced AI-powered prediction tools."
      stats={[
        { value: "3", label: "Core Team Members" },
        { value: "6 Months", label: "Development Time" },
        { value: "10th Grade", label: "Marvin Ridge High School" },
        { value: "100%", label: "Free Platform" }
      ]}
      features={[
        {
          title: "Our Team",
          description: "Abhi Jandyala, Rahul Vuta, and Bhanu Vanukuri - three dedicated 10th graders passionate about revolutionizing college admissions through technology.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Development Journey",
          description: "Built over 6 months using Next.js, React, Python, FastAPI, and machine learning algorithms trained on real college admission data.",
          icon: <Code className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Our Mission",
          description: "To level the playing field in college admissions by providing every student with access to advanced AI-powered tools and insights.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Our School",
          description: "Proud students of Marvin Ridge High School, combining academic excellence with innovative technology solutions.",
          icon: <School className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Try Our Platform",
        href: "/home"
      }}
    />
  )
}
