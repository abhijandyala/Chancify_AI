import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Brain, Target, Search, BookOpen, FileText, Code } from 'lucide-react'

export default function AIPredictorPage() {
  return (
    <ROXPageTemplate
      title="AI Predictor"
      subtitle="Products"
      description="Our advanced machine learning model analyzes your academic profile, extracurriculars, and college preferences to predict your admission chances with 85% accuracy."
      stats={[
        { value: "85%", label: "Prediction Accuracy" },
        { value: "500K+", label: "Students Analyzed" },
        { value: "2,000+", label: "Colleges Covered" },
        { value: "24/7", label: "Real-time Updates" }
      ]}
      features={[
        {
          title: "Hybrid ML Model",
          description: "Combines machine learning algorithms with formula-based calculations for maximum accuracy.",
          icon: <Brain className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Real-time Analysis",
          description: "Get instant predictions based on the latest admission data and trends.",
          icon: <Target className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Comprehensive Profile",
          description: "Analyzes GPA, test scores, extracurriculars, essays, and more for complete assessment.",
          icon: <Search className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Try AI Predictor",
        href: "/home"
      }}
    />
  )
}
