'use client'

import Link from 'next/link'

export default function ROXMegaFooter() {
  const cols = [
    {
      title: 'Products',
      links: [
        { name: 'AI Predictor', href: '/products/ai-predictor' },
        { name: 'Profile Builder', href: '/products/profile-builder' },
        { name: 'College Matcher', href: '/products/college-matcher' },
        { name: 'SAT Prep', href: '/products/sat-prep' },
        { name: 'Application Tracker', href: '/products/application-tracker' },
        { name: 'API', href: '/products/api' }
      ]
    },
    {
      title: 'Solutions', 
      links: [
        { name: 'High School Students', href: '/solutions/high-school-students' },
        { name: 'College Prep', href: '/solutions/college-prep' },
        { name: 'Transfer Students', href: '/solutions/transfer-students' },
        { name: 'International Students', href: '/solutions/international-students' },
        { name: 'Gap Year Planning', href: '/solutions/gap-year-planning' },
        { name: 'Career Guidance', href: '/solutions/career-guidance' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/resources/blog' },
        { name: 'Docs', href: '/resources/docs' },
        { name: 'Case Studies', href: '/resources/case-studies' },
        { name: 'Status', href: '/resources/status' },
        { name: 'Changelog', href: '/resources/changelog' },
        { name: 'Help Center', href: '/resources/help-center' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/company/about' },
        { name: 'Contact', href: '/company/contact' },
        { name: 'Careers', href: '/company/careers' },
        { name: 'Privacy', href: '/company/privacy' },
        { name: 'Terms', href: '/company/terms' }
      ]
    }
  ]

  return (
    <footer className="border-t border-border bg-background-subtle">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((col) => (
            <div key={col.title}>
              <div className="font-semibold text-foreground mb-4">{col.title}</div>
              <ul className="space-y-2 text-foreground/70">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-foreground/60 text-sm">
              Copyright © {new Date().getFullYear()} Chancify AI. All rights reserved.
            </div>
            
            <div className="flex gap-6 text-foreground/60">
              <Link href="/company/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/company/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/company/privacy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
