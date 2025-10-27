import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react'

export default function StatusPage() {
  return (
    <ROXPageTemplate
      title="System Status"
      subtitle="Resources"
      description="Real-time status of all Chancify AI services, API endpoints, and platform components."
      stats={[
        { value: "99.9%", label: "Uptime SLA" },
        { value: "< 200ms", label: "API Response" },
        { value: "24/7", label: "Monitoring" },
        { value: "Real-time", label: "Updates" }
      ]}
      features={[
        {
          title: "Service Status",
          description: "Real-time status of all platform services including API, web app, and database.",
          icon: <Activity className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Incident History",
          description: "Complete history of past incidents, resolutions, and preventive measures.",
          icon: <AlertCircle className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Performance Metrics",
          description: "Detailed performance metrics including response times and error rates.",
          icon: <Clock className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Maintenance Schedule",
          description: "Upcoming maintenance windows and planned system updates.",
          icon: <CheckCircle className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "View Full Status",
        href: "#",
        external: true
      }}
    />
  )
}
