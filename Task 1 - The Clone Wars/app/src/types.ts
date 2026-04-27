export type Category =
  | 'Education'
  | 'University Partnership'
  | 'Public Speaking';

export const CATEGORIES: Category[] = [
  'Education',
  'University Partnership',
  'Public Speaking',
];

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export const QUARTERS: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];

export type Year = 2025;

export const YEARS: Year[] = [2025];

export interface Activity {
  id: string;
  title: string;
  category: Category;
  date: string;
  points: number;
  year: Year;
  quarter: Quarter;
}

export interface User {
  id: string;
  name: string;
  title: string;
  departmentCode: string;
  avatarPath: string;
  activities: Activity[];
}

export interface Filters {
  year: 'all' | Year;
  quarter: 'all' | Quarter;
  category: 'all' | Category;
  search: string;
}

export interface RankedUser {
  user: User;
  rank: number;
  total: number;
  matchingActivities: Activity[];
  categoryCounts: Record<Category, number>;
}
