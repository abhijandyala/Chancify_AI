import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Code, Zap, Shield, Globe } from 'lucide-react'

export default function APIPage() {
  return (
    <ROXPageTemplate
      title="API"
      subtitle="Products"
      description="Integrate Chancify AI's powerful prediction engine into your own applications with our comprehensive REST API."
      stats={[
        { value: "99.9%", label: "Uptime SLA" },
        { value: "< 200ms", label: "Response Time" },
        { value: "REST", label: "API Type" },
        { value: "24/7", label: "Support" }
      ]}
      features={[
        {
          title: "RESTful API",
          description: "Clean, well-documented REST API with JSON responses and standard HTTP status codes.",
          icon: <Code className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "High Performance",
          description: "Sub-200ms response times with 99.9% uptime guarantee for production applications.",
          icon: <Zap className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Secure Authentication",
          description: "API key-based authentication with rate limiting and security best practices.",
          icon: <Shield className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Global CDN",
          description: "Worldwide content delivery network for fast, reliable access from anywhere.",
          icon: <Globe className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "View API Documentation",
        href: "/docs",
        external: true
      }}
    />
  )
}
