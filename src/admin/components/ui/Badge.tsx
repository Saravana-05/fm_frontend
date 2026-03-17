interface BadgeProps {
  label: string
  variant?: 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'blue'
}

const variants = {
  green:  { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  red:    { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  yellow: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  purple: { bg: 'rgba(152,37,152,0.08)', color: '#982598', border: 'rgba(152,37,152,0.2)' },
  gray:   { bg: '#f9fafb', color: '#6b7280', border: '#e5e7eb' },
  blue:   { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
}

export default function Badge({ label, variant = 'gray' }: BadgeProps) {
  const v = variants[variant]
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border"
      style={{ background: v.bg, color: v.color, borderColor: v.border }}>
      {label}
    </span>
  )
}

export function statusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    active:    { label: 'Active',    variant: 'green' },
    approved:  { label: 'Approved',  variant: 'green' },
    completed: { label: 'Completed', variant: 'blue' },
    pending:   { label: 'Pending',   variant: 'yellow' },
    suspended: { label: 'Suspended', variant: 'red' },
    rejected:  { label: 'Rejected',  variant: 'red' },
    flagged:   { label: 'Flagged',   variant: 'red' },
    ended:     { label: 'Ended',     variant: 'gray' },
    disputed:  { label: 'Disputed',  variant: 'red' },
    failed:    { label: 'Failed',    variant: 'red' },
    refunded:  { label: 'Refunded',  variant: 'yellow' },
    verified:  { label: 'Verified',  variant: 'green' },
    unverified:{ label: 'Unverified',variant: 'gray' },
    inactive:  { label: 'Inactive',  variant: 'gray' },
  }
  const m = map[status] || { label: status, variant: 'gray' as const }
  return <Badge label={m.label} variant={m.variant} />
}
