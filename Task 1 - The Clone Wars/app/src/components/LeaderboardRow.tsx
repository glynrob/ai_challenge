import { useState } from 'react';
import { CATEGORIES, type RankedUser } from '../types';
import { ActivityTable } from './ActivityTable';
import { CategoryIcon } from './CategoryIcon';
import { StarIcon } from './StarIcon';

interface Props {
  entry: RankedUser;
}

export function LeaderboardRow({ entry }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { rank, total, user, categoryCounts, matchingActivities } = entry;

  const categoryItems = CATEGORIES.filter((c) => categoryCounts[c] > 0);

  return (
    <div
      className={`rounded-lg bg-white border ${
        expanded ? 'border-accent' : 'border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
        <div className="text-2xl md:text-3xl font-bold text-slate-300 w-8 md:w-10 text-center shrink-0">
          {rank}
        </div>
        <img
          src={user.avatarPath}
          alt=""
          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-slate-100 object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 leading-tight truncate">
            {user.name}
          </p>
          <p className="text-xs md:text-sm text-slate-500 truncate">
            {user.title} ({user.departmentCode})
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-3 md:gap-4 pr-2 md:pr-4 md:border-r md:border-slate-200">
            {categoryItems.map((c) => (
              <div
                key={c}
                className="flex flex-col items-center text-accent"
                title={c}
              >
                <CategoryIcon category={c} className="w-5 h-5" />
                <span className="text-xs font-medium text-slate-500 mt-0.5">
                  {categoryCounts[c]}
                </span>
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-widest font-semibold text-slate-400 uppercase">
              Total
            </p>
            <p className="flex items-center gap-1 text-accent font-bold text-lg md:text-xl">
              <StarIcon className="w-4 h-4 md:w-5 md:h-5" />
              {total}
            </p>
          </div>
          <button
            type="button"
            aria-label={expanded ? 'Collapse activity' : 'Expand activity'}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              expanded
                ? 'bg-accent/10 text-accent border border-accent'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <svg
              className={`w-4 h-4 transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile-only category icon strip — appears below row data on small screens */}
      {categoryItems.length > 0 && (
        <div className="sm:hidden flex items-center gap-4 px-4 pb-3 -mt-1">
          {categoryItems.map((c) => (
            <div
              key={c}
              className="flex items-center gap-1 text-accent"
              title={c}
            >
              <CategoryIcon category={c} className="w-5 h-5" />
              <span className="text-xs font-medium text-slate-500">
                {categoryCounts[c]}
              </span>
            </div>
          ))}
        </div>
      )}

      {expanded && <ActivityTable activities={matchingActivities} />}
    </div>
  );
}
