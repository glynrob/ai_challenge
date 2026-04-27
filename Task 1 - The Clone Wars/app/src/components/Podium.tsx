import type { RankedUser } from '../types';
import { StarIcon } from './StarIcon';

interface Props {
  podium: RankedUser[];
}

const TIER_DESKTOP_ORDER = [2, 1, 3] as const;

function rankBadgeColor(rank: number) {
  if (rank === 1) return 'bg-medal-gold';
  if (rank === 2) return 'bg-medal-silver';
  return 'bg-medal-bronze';
}

function ringColor(rank: number) {
  if (rank === 1) return 'ring-medal-gold';
  if (rank === 2) return 'ring-medal-silver';
  return 'ring-medal-bronze';
}

function blockColor(rank: number) {
  if (rank === 1) return 'bg-medal-gold-soft';
  if (rank === 2) return 'bg-medal-silver-soft';
  return 'bg-medal-bronze-soft';
}

function blockHeight(rank: number) {
  if (rank === 1) return 'h-44 md:h-48';
  if (rank === 2) return 'h-32 md:h-36';
  return 'h-28 md:h-32';
}

function avatarSize(rank: number) {
  if (rank === 1) return 'w-28 h-28 md:w-32 md:h-32';
  return 'w-20 h-20 md:w-24 md:h-24';
}

function pillColor(rank: number) {
  if (rank === 1) return 'bg-medal-gold-soft text-amber-900';
  return 'bg-white text-accent';
}

function PodiumSlot({ entry }: { entry: RankedUser }) {
  const { rank, total, user } = entry;
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative">
        <img
          src={user.avatarPath}
          alt=""
          className={`${avatarSize(rank)} rounded-full bg-white object-cover ring-4 ${ringColor(rank)}`}
        />
        <span
          className={`${rankBadgeColor(rank)} absolute -bottom-1 right-0 w-7 h-7 rounded-full text-white font-semibold flex items-center justify-center text-sm shadow`}
        >
          {rank}
        </span>
      </div>
      <div className="mt-3 text-center px-2">
        <p className="font-semibold text-slate-900 leading-tight">
          {user.name}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {user.title} ({user.departmentCode})
        </p>
      </div>
      <div
        className={`${pillColor(rank)} mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold shadow-sm`}
      >
        <StarIcon
          className={
            rank === 1 ? 'w-4 h-4 text-amber-700' : 'w-4 h-4 text-accent'
          }
        />
        {total}
      </div>
      <div
        className={`${blockColor(rank)} ${blockHeight(rank)} w-full mt-3 rounded-t-lg flex items-center justify-center text-5xl font-bold text-white/40`}
      >
        {rank}
      </div>
    </div>
  );
}

function EmptySlot() {
  return <div className="w-full" aria-hidden="true" />;
}

export function Podium({ podium }: Props) {
  // Index by rank for desktop ordering (2-1-3) and mobile ordering (1-2-3).
  const byRank = new Map<number, RankedUser>();
  podium.forEach((p) => byRank.set(p.rank, p));

  return (
    <div className="px-4 pt-6">
      {/* Desktop: 2 / 1 / 3 horizontal */}
      <div className="hidden md:grid grid-cols-3 gap-4 items-end">
        {TIER_DESKTOP_ORDER.map((r) => {
          const entry = byRank.get(r);
          return (
            <div key={r} className="flex flex-col items-center">
              {entry ? <PodiumSlot entry={entry} /> : <EmptySlot />}
            </div>
          );
        })}
      </div>

      {/* Mobile: 1 / 2 / 3 stacked */}
      <div className="md:hidden flex flex-col gap-6 items-center">
        {[1, 2, 3].map((r) => {
          const entry = byRank.get(r);
          if (!entry) return null;
          return <PodiumSlot key={r} entry={entry} />;
        })}
      </div>
    </div>
  );
}
