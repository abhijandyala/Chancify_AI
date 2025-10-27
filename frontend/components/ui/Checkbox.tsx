'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  disabled?: boolean
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, className, disabled = false, label }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <div className="checkbox-wrapper-31">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <svg viewBox="0 0 35.6 35.6" aria-hidden="true">
            <defs>
              {/* subtle metallic gold gradient */}
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffec8b"/>
                <stop offset="45%" stopColor="#ffd700"/>
                <stop offset="100%" stopColor="#ffb700"/>
              </linearGradient>
            </defs>

            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

// Add the CSS styles to the global CSS
const checkboxStyles = `
.checkbox-wrapper-31 {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
}

/* base circle */
.checkbox-wrapper-31 .background {
  fill: #ccc;
  transition: ease all 0.6s;
}

/* white ring that draws in */
.checkbox-wrapper-31 .stroke {
  fill: none;
  stroke: #fff;
  stroke-miterlimit: 10;
  stroke-width: 2px;
  stroke-dashoffset: 100;
  stroke-dasharray: 100;
  transition: ease all 0.6s;
}

/* checkmark that draws in */
.checkbox-wrapper-31 .check {
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
  stroke-dashoffset: 22;
  stroke-dasharray: 22;
  transition: ease all 0.6s;
}

/* invisible clickable input over the SVG */
.checkbox-wrapper-31 input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
}

/* optional hover to preview the check draw */
.checkbox-wrapper-31:hover .check {
  stroke-dashoffset: 0;
}

/* ✅ GOLD UPGRADE: fill with gradient when checked */
.checkbox-wrapper-31 input[type=checkbox]:checked + svg .background {
  fill: url(#gold-gradient);
}

.checkbox-wrapper-31 input[type=checkbox]:checked + svg .stroke {
  stroke-dashoffset: 0;
}

.checkbox-wrapper-31 input[type=checkbox]:checked + svg .check {
  stroke-dashoffset: 0;
}

/* Dark mode adjustments */
.dark .checkbox-wrapper-31 .background {
  fill: #374151;
}

.dark .checkbox-wrapper-31 .stroke {
  stroke: #f3f4f6;
}

.dark .checkbox-wrapper-31 .check {
  stroke: #f3f4f6;
}

/* Disabled state */
.checkbox-wrapper-31 input[type=checkbox]:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-wrapper-31 input[type=checkbox]:disabled + svg .background {
  fill: #9ca3af;
}

.checkbox-wrapper-31 input[type=checkbox]:disabled + svg .stroke {
  stroke: #6b7280;
}

.checkbox-wrapper-31 input[type=checkbox]:disabled + svg .check {
  stroke: #6b7280;
}
`

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = checkboxStyles
  document.head.appendChild(styleElement)
}
