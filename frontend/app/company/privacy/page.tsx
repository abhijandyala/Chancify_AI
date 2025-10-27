import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Shield, Eye, Lock, Database } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <ROXPageTemplate
      title="Privacy Policy"
      subtitle="Company"
      description="Your privacy is important to us. Learn how we collect, use, and protect your personal information."
      stats={[
        { value: "GDPR", label: "Compliant" },
        { value: "SOC 2", label: "Certified" },
        { value: "256-bit", label: "Encryption" },
        { value: "Zero", label: "Data Selling" }
      ]}
      features={[
        {
          title: "Data Collection",
          description: "We only collect data necessary to provide our services and improve your experience.",
          icon: <Database className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Data Usage",
          description: "Your data is used solely to provide personalized college admission predictions and recommendations.",
          icon: <Eye className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Data Protection",
          description: "We implement industry-standard security measures to protect your personal information.",
          icon: <Shield className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Your Rights",
          description: "You have the right to access, modify, or delete your personal data at any time.",
          icon: <Lock className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Read Full Policy",
        href: "#",
        external: true
      }}
    />
  )
}
