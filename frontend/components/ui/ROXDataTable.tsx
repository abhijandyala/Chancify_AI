'use client'

import { GlassCard } from '@/components/ui/GlassCard'

interface Row {
  id: string
  college: string
  chance: string
  category: string
  lastUpdated: string
}

const data: Row[] = [
  { id: '1', college: 'Stanford University', chance: '85%', category: 'Reach', lastUpdated: '2025-10-01' },
  { id: '2', college: 'UC Berkeley', chance: '92%', category: 'Target', lastUpdated: '2025-10-01' },
  { id: '3', college: 'MIT', chance: '78%', category: 'Reach', lastUpdated: '2025-10-01' },
  { id: '4', college: 'UCLA', chance: '89%', category: 'Target', lastUpdated: '2025-10-01' },
]

export default function ROXDataTable() {
  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-background-raised">
            <tr>
              {['College', 'Chance', 'Category', 'Updated'].map((header) => (
                <th key={header} className="px-4 py-3 text-left font-semibold text-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t border-border hover:bg-background-subtle transition-colors">
                <td className="px-4 py-3 text-foreground font-medium">{row.college}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-medium text-primary">{row.chance}</span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.category === 'Reach' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {row.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground/70">{row.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
