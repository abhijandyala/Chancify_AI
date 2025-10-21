'use client'

import Link from 'next/link'

export default function ROXMegaFooter() {
  const cols = [
    {
      title: 'Products',
      links: ['AI Predictor', 'Profile Builder', 'College Matcher', 'SAT Prep', 'Application Tracker', 'API']
    },
    {
      title: 'Solutions', 
      links: ['High School Students', 'College Prep', 'Transfer Students', 'International Students', 'Gap Year Planning', 'Career Guidance']
    },
    {
      title: 'Resources',
      links: ['Blog', 'Docs', 'Case Studies', 'Status', 'Changelog', 'Help Center']
    },
    {
      title: 'Company',
      links: ['About', 'Pricing', 'Contact', 'Careers', 'Privacy', 'Terms']
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
                  <li key={link}>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      {link}
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
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
