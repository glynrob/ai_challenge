import { useEffect, useState } from 'react';
import { Filters } from './components/Filters';
import { LeaderboardList } from './components/LeaderboardList';
import { Podium } from './components/Podium';
import { useLeaderboard } from './hooks/useLeaderboard';
import type { Filters as F, User } from './types';

const INITIAL_FILTERS: F = {
  year: 'all',
  quarter: 'all',
  category: 'all',
  search: '',
};

function App() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [filters, setFilters] = useState<F>(INITIAL_FILTERS);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}leaderboard.json`)
      .then((r) => r.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  const { podium, list } = useLeaderboard(users ?? [], filters);

  return (
    <div className="min-h-screen bg-slate-100 px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
          Company Leader Board 2025
        </h1>

        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 md:px-6 pt-5 md:pt-6 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Leaderboard
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top performers based on contributions and activity
            </p>
          </div>

          <div className="px-4 md:px-6 pb-2">
            <Filters filters={filters} onChange={setFilters} />
          </div>

          {users === null ? null : (
            <>
              <Podium podium={podium} />
              <LeaderboardList list={list} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
