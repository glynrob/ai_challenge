interface Props {
  className?: string;
  filled?: boolean;
}

export function StarIcon({ className = 'w-4 h-4', filled = true }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5l3 6.2 6.8 1-4.9 4.8 1.2 6.7L12 18l-6.1 3.2 1.2-6.7L2.2 9.7l6.8-1Z" />
    </svg>
  );
}
