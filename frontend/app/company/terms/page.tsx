import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { FileText, Scale, Shield, Users } from 'lucide-react'

export default function TermsPage() {
  return (
    <ROXPageTemplate
      title="Terms of Service"
      subtitle="Company"
      description="Please read our terms of service carefully before using Chancify AI. By using our platform, you agree to these terms."
      stats={[
        { value: "Legal", label: "Compliance" },
        { value: "Transparent", label: "Terms" },
        { value: "User", label: "Friendly" },
        { value: "Updated", label: "Regularly" }
      ]}
      features={[
        {
          title: "Service Terms",
          description: "Terms governing your use of our platform, services, and features.",
          icon: <FileText className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "User Responsibilities",
          description: "Your responsibilities when using our platform and interacting with our community.",
          icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Limitation of Liability",
          description: "Limitations on our liability and disclaimers regarding our services.",
          icon: <Shield className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Dispute Resolution",
          description: "How disputes are resolved and applicable laws governing our terms.",
          icon: <Scale className="w-6 h-6 text-yellow-400" />
        }
      ]}
      cta={{
        text: "Read Full Terms",
        href: "#",
        external: true
      }}
    />
  )
}
