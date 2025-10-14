'use client'

import { Tab } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabItem {
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultIndex?: number
}

export function Tabs({ tabs, defaultIndex = 0 }: TabsProps) {
  return (
    <Tab.Group defaultIndex={defaultIndex}>
      <Tab.List className="flex gap-2 p-1 glass-card">
        {tabs.map((tab) => (
          <Tab key={tab.label} as={Fragment}>
            {({ selected }) => (
              <button
                className={cn(
                  'flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200',
                  selected
                    ? 'bg-gradient-to-r from-amber-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                )}
              >
                {tab.label}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-6">
        {tabs.map((tab, idx) => (
          <Tab.Panel
            key={idx}
            className="animate-fade-in"
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

