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
}: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  className?: string;
  maxItems?: number;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Keep active item in view
  useEffect(() => {
    const el = listRef.current?.querySelectorAll('[data-opt]')?.[active] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  return (
    <div
      ref={rootRef}
      className={clsx(
        'relative mx-auto w-full max-w-2xl',
        className
      )}
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      {/* Input */}
      <div
        className={clsx(
          'group flex items-center gap-3 rounded-xl border px-4 py-3',
          'bg-black/50 backdrop-blur',
          'border-yellow-500/40 focus-within:border-yellow-400',
          'shadow-[0_0_0_1px_rgba(234,179,8,0.15)]'
        )}
      >
        <Search className="h-5 w-5 text-yellow-400/80" />
        <input
          className={clsx(
            'w-full bg-transparent outline-none',
            'text-base text-gray-100 placeholder:text-gray-500'
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
          aria-autocomplete="list"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className={clsx(
            'absolute left-0 right-0 z-50 mt-2',
            'rounded-xl border border-gray-800/50',
            'bg-black/80 backdrop-blur-xl',
            'shadow-2xl'
          )}
        >
          <ul
            id="college-listbox"
            ref={listRef}
            role="listbox"
            className="max-h-72 overflow-y-auto p-2"
          >
            {items.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">No matches.</li>
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
                  'cursor-pointer rounded-lg px-3 py-2',
                  i === active
                    ? 'bg-yellow-500/15 text-yellow-200'
                    : 'hover:bg-white/5 text-gray-200'
                )}
              >
                <div className="text-sm font-medium">{o.label}</div>
                <div className="text-xs text-gray-400">{o.value}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
