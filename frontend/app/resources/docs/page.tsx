import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { BookOpen, Code, Zap, Shield } from 'lucide-react'

export default function DocsPage() {
  return (
    <ROXPageTemplate
      title="Documentation"
      subtitle="Resources"
      description="Comprehensive documentation for developers, educators, and students using Chancify AI's platform and API."
      stats={[
        { value: "50+", label: "API Endpoints" },
        { value: "100%", label: "Code Examples" },
        { value: "24/7", label: "Updated Docs" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "API Reference",
          description: "Complete API documentation with examples, parameters, and response formats.",
          icon: <Code className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Integration Guides",
          description: "Step-by-step guides for integrating Chancify AI into your applications.",
          icon: <BookOpen className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "SDK Libraries",
          description: "Official SDKs for popular programming languages and frameworks.",
          icon: <Zap className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Security Best Practices",
          description: "Security guidelines and best practices for API usage and data protection.",
          icon: <Shield className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "View Documentation",
        href: "#",
        external: true
      }}
    />
  )
}
