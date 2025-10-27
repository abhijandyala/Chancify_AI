import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { GitCommit, Zap, Bug, Star } from 'lucide-react'

export default function ChangelogPage() {
  return (
    <ROXPageTemplate
      title="Changelog"
      subtitle="Resources"
      description="Track all updates, new features, bug fixes, and improvements to the Chancify AI platform."
      stats={[
        { value: "50+", label: "Updates This Year" },
        { value: "Weekly", label: "Release Cycle" },
        { value: "100%", label: "Transparent Updates" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Feature Releases",
          description: "New features and enhancements added to improve your college preparation experience.",
          icon: <Star className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Performance Improvements",
          description: "Speed optimizations and performance enhancements across the platform.",
          icon: <Zap className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Bug Fixes",
          description: "Resolved issues and bug fixes to ensure smooth platform operation.",
          icon: <Bug className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Version History",
          description: "Complete version history with detailed release notes and technical details.",
          icon: <GitCommit className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "View Full Changelog",
        href: "#",
        external: true
      }}
    />
  )
}
