'use client'

import { Switch } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label?: string
}

export function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <Switch.Group>
      <div className="flex items-center gap-3">
        {label && (
          <Switch.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={onChange}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            enabled 
              ? 'bg-gradient-to-r from-amber-500 to-blue-500' 
              : 'bg-gray-300 dark:bg-gray-600'
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              enabled ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}

