export function Check({ done, onToggle, label }: { done: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      className="check"
      role="checkbox"
      aria-checked={done}
      aria-label={label}
      onClick={onToggle}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4 8.4 6.8 11 12 5.4" />
      </svg>
    </button>
  );
}
