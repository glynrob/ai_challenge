import type { Activity } from '../types';

interface Props {
  activities: Activity[];
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatDate(iso: string) {
  // iso = yyyy-mm-dd → dd-Mmm-yyyy (matches original format)
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')}-${MONTHS[m - 1]}-${y}`;
}

export function ActivityTable({ activities }: Props) {
  const sorted = [...activities].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );

  return (
    <div className="px-4 md:px-6 pt-3 pb-4">
      <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
        Recent Activity
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-200">
              <th className="text-left font-medium py-2 pr-4 whitespace-nowrap">
                Activity
              </th>
              <th className="text-left font-medium py-2 pr-4 whitespace-nowrap">
                Category
              </th>
              <th className="text-left font-medium py-2 pr-4 whitespace-nowrap">
                Date
              </th>
              <th className="text-right font-medium py-2 whitespace-nowrap">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 last:border-0">
                <td className="py-2 pr-4 text-slate-800">{a.title}</td>
                <td className="py-2 pr-4">
                  <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-2.5 py-0.5 text-xs">
                    {a.category}
                  </span>
                </td>
                <td className="py-2 pr-4 text-slate-600 whitespace-nowrap">
                  {formatDate(a.date)}
                </td>
                <td className="py-2 text-right font-semibold text-accent whitespace-nowrap">
                  +{a.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
