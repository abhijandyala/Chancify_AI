import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react'

export default function ApplicationTrackerPage() {
  return (
    <ROXPageTemplate
      title="Application Tracker"
      subtitle="Products"
      description="Stay organized throughout your college application journey with our comprehensive tracking and deadline management system."
      stats={[
        { value: "20+", label: "Application Components" },
        { value: "100%", label: "Deadline Tracking" },
        { value: "50+", label: "Colleges Supported" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Deadline Management",
          description: "Never miss an important deadline with automated reminders and calendar integration.",
          icon: <Calendar className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Document Tracking",
          description: "Keep track of transcripts, recommendation letters, and other required documents.",
          icon: <FileText className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Progress Monitoring",
          description: "Visual progress bars show completion status for each application component.",
          icon: <CheckCircle className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Status Alerts",
          description: "Get notified about missing requirements and upcoming deadlines.",
          icon: <AlertCircle className="w-6 h-6 text-yellow-400" />
        }
      ]}
    />
  )
}
