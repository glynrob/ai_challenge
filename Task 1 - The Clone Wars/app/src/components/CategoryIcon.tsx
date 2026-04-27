import type { Category } from '../types';

interface Props {
  category: Category;
  className?: string;
}

export function CategoryIcon({ category, className = 'w-5 h-5' }: Props) {
  if (category === 'Education') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 10 12 4 2 10l10 6 10-6Z" />
        <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
      </svg>
    );
  }
  if (category === 'University Partnership') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14c1.2 1.4 2.6 2 4 2s2.8-.6 4-2" />
        <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  // Public Speaking
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M12 16v3" />
      <path d="M8 21h8" />
    </svg>
  );
}
