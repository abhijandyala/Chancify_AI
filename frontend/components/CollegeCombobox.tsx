'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';

type Option = { value: string; label: string } | string;

function normalize(opt: Option) {
  return typeof opt === 'string' ? { value: opt, label: opt } : opt;
}

export default function CollegeCombobox({
  label = 'Select Your Target College',
  placeholder = 'Search for your college…',
  value,
  onChange,
  options,
  className,
  maxItems = 200, // prevent super long lists
  autoFocus = false,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  className?: string;
  maxItems?: number;
  autoFocus?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const didMount = useRef(false);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const normalized = options.map(normalize);
    if (!q) return normalized.slice(0, maxItems);
    return normalized
      .filter(o =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
      )
      .slice(0, maxItems);
  }, [options, query, maxItems]);

  // Close on click outside
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (rootRef.current) {
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }
  }, []);

  // Keep active item in view
  useEffect(() => {
    const el = listRef.current?.querySelectorAll('[data-opt]')?.[active] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  // Guarded auto-focus to prevent focus-steal on re-render
  useEffect(() => {
    if (!didMount.current && autoFocus) {
      inputRef.current?.focus();
    }
    didMount.current = true;
  }, [autoFocus]);

  return (
    <div
      ref={rootRef}
      className={clsx(
        'relative mx-auto w-full',
        className
      )}
      style={{ zIndex: 9999999 }}
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      {label && (
        <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      {/* Input */}
      <div
        className={clsx(
          'group flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border px-3 sm:px-4 py-2 sm:py-3',
          'bg-black/50 backdrop-blur',
          'border-yellow-500/40 focus-within:border-yellow-400',
          'shadow-[0_0_0_1px_rgba(234,179,8,0.15)]'
        )}
      >
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400/80 flex-shrink-0" />
        <input
          ref={inputRef}
          className={clsx(
            'w-full bg-transparent outline-none',
            'text-sm sm:text-base text-gray-100 placeholder:text-gray-500'
          )}
          placeholder={placeholder}
          value={query || value}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(a + 1, Math.max(items.length - 1, 0)));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              const chosen = items[active];
              if (chosen) {
                onChange(chosen.value);
                setQuery(chosen.label);
                setOpen(false);
              }
            } else if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
          role="combobox"
          aria-controls="college-listbox"
          aria-expanded={open}
          aria-autocomplete="list"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className={clsx(
            'absolute left-0 right-0 mt-1 sm:mt-2',
            'rounded-lg sm:rounded-xl border border-gray-800/50',
            'bg-black/80 backdrop-blur-xl',
            'shadow-2xl'
          )}
          style={{ zIndex: 9999999 }}
        >
          <ul
            id="college-listbox"
            ref={listRef}
            role="listbox"
            className="max-h-60 sm:max-h-72 overflow-y-auto p-1 sm:p-2"
          >
            {items.length === 0 && (
              <li className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-400">No matches.</li>
            )}

            {items.map((o, i) => (
              <li
                key={o.value}
                data-opt
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  // prevent input blur before we set value
                  e.preventDefault();
                  onChange(o.value);
                  setQuery(o.label);
                  setOpen(false);
                }}
                className={clsx(
                  'cursor-pointer rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2',
                  i === active
                    ? 'bg-yellow-500/15 text-yellow-200'
                    : 'hover:bg-white/5 text-gray-200'
                )}
              >
                <div className="text-xs sm:text-sm font-medium">{o.label}</div>
                <div className="text-xs text-gray-400">{o.value}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
