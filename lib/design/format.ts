/** Coarse relative time for the "Last updated Xm ago" header slot.
 *  Coarse on purpose: minute-level precision would make cached HTML read as
 *  stale the moment it is served. */
export function relativeTime(iso: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;

  const mins = Math.max(1, Math.round((Date.now() - then) / 60_000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}
