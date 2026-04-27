import type { RankedUser } from '../types';
import { LeaderboardRow } from './LeaderboardRow';

interface Props {
  list: RankedUser[];
}

export function LeaderboardList({ list }: Props) {
  return (
    <div className="px-4 pb-4 pt-4 flex flex-col gap-3">
      {list.map((entry) => (
        <LeaderboardRow key={entry.user.id} entry={entry} />
      ))}
    </div>
  );
}
