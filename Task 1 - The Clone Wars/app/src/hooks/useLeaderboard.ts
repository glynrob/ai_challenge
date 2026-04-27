import { useMemo } from 'react';
import {
  CATEGORIES,
  type Activity,
  type Category,
  type Filters,
  type RankedUser,
  type User,
} from '../types';

function emptyCategoryCounts(): Record<Category, number> {
  return CATEGORIES.reduce(
    (acc, c) => {
      acc[c] = 0;
      return acc;
    },
    {} as Record<Category, number>,
  );
}

function activityMatches(a: Activity, f: Filters): boolean {
  if (f.year !== 'all' && a.year !== f.year) return false;
  if (f.quarter !== 'all' && a.quarter !== f.quarter) return false;
  if (f.category !== 'all' && a.category !== f.category) return false;
  return true;
}

export interface LeaderboardResult {
  podium: RankedUser[];
  list: RankedUser[];
}

export function useLeaderboard(
  users: User[],
  filters: Filters,
): LeaderboardResult {
  return useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    const ranked: RankedUser[] = [];
    for (const user of users) {
      if (search && !user.name.toLowerCase().includes(search)) continue;

      const matchingActivities = user.activities.filter((a) =>
        activityMatches(a, filters),
      );
      if (matchingActivities.length === 0) continue;

      const total = matchingActivities.reduce((sum, a) => sum + a.points, 0);
      const categoryCounts = emptyCategoryCounts();
      for (const a of matchingActivities) categoryCounts[a.category]++;

      ranked.push({
        user,
        rank: 0, // assigned after sort
        total,
        matchingActivities,
        categoryCounts,
      });
    }

    ranked.sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.user.name.localeCompare(b.user.name);
    });

    ranked.forEach((r, i) => {
      r.rank = i + 1;
    });

    return {
      podium: ranked.slice(0, 3),
      list: ranked,
    };
  }, [users, filters]);
}
