import {
  CATEGORIES,
  QUARTERS,
  YEARS,
  type Category,
  type Filters as F,
  type Quarter,
  type Year,
} from '../types';

interface Props {
  filters: F;
  onChange: (next: F) => void;
}

export function Filters({ filters, onChange }: Props) {
  return (
    <div className="rounded-lg bg-white p-3 md:p-4 flex flex-col md:flex-row gap-3 border border-slate-200">
      <select
        aria-label="Filter by year"
        value={filters.year === 'all' ? 'all' : String(filters.year)}
        onChange={(e) =>
          onChange({
            ...filters,
            year:
              e.target.value === 'all' ? 'all' : (Number(e.target.value) as Year),
          })
        }
        className="rounded-md border border-slate-200 px-3 py-2 text-sm bg-white text-slate-900 md:w-36 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <option value="all">All Years</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by quarter"
        value={filters.quarter}
        onChange={(e) =>
          onChange({ ...filters, quarter: e.target.value as 'all' | Quarter })
        }
        className="rounded-md border border-slate-200 px-3 py-2 text-sm bg-white text-slate-900 md:w-36 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <option value="all">All Quarters</option>
        {QUARTERS.map((q) => (
          <option key={q} value={q}>
            {q}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by category"
        value={filters.category}
        onChange={(e) =>
          onChange({ ...filters, category: e.target.value as 'all' | Category })
        }
        className="rounded-md border border-slate-200 px-3 py-2 text-sm bg-white text-slate-900 md:w-44 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          aria-label="Search employee"
          placeholder="Search employee..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-md border border-slate-200 pl-9 pr-3 py-2 text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>
    </div>
  );
}
