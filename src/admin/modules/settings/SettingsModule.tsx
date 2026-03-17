import { useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

export default function SettingsModule() {
  const [commission, setCommission]   = useState('12')
  const [goldPrice, setGoldPrice]     = useState('15')
  const [sprintPrice, setSprintPrice] = useState('49')
  const [legalPrice, setLegalPrice]   = useState('199')
  const [notifications, setNotifications] = useState({ email: true, match: true, sprint: false, legal: true })

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold" style={{ color: '#15173D' }}>{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )

  const Field = ({ label, value, onChange, prefix }: { label: string; value: string; onChange: (v: string) => void; prefix?: string }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-purple-400 transition-colors">
        {prefix && <span className="px-3 py-2.5 bg-gray-50 text-xs text-gray-400 border-r border-gray-200">{prefix}</span>}
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 px-3 py-2.5 text-sm outline-none" style={{ color: '#15173D' }} />
      </div>
    </div>
  )

  const Toggle = ({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <div className="text-sm font-medium" style={{ color: '#15173D' }}>{label}</div>
        <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
      </div>
      <button onClick={onChange}
        className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
        style={{ background: checked ? '#982598' : '#e5e7eb' }}>
        <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all"
          style={{ left: checked ? '22px' : '2px' }} />
      </button>
    </div>
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Settings</h2>
          <p className="text-xs text-gray-400 mt-0.5">Platform configuration and subscription settings</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: '#982598' }}>
          <SaveOutlinedIcon sx={{ fontSize: 16 }} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Section title="Pricing Plans">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Gold Match (Monthly)" value={goldPrice} onChange={setGoldPrice} prefix="$" />
            <Field label="Founder Sprint (Monthly)" value={sprintPrice} onChange={setSprintPrice} prefix="$" />
            <Field label="Legal Package (One-time)" value={legalPrice} onChange={setLegalPrice} prefix="$" />
            <Field label="Gold Match (Annual)" value="99" onChange={() => {}} prefix="$" />
          </div>
        </Section>

        <Section title="Marketplace Commission">
          <div className="space-y-4">
            <Field label="Freelancer Commission Rate" value={commission} onChange={setCommission} prefix="%" />
            <Field label="Lawyer Commission Rate" value="15" onChange={() => {}} prefix="%" />
            <Field label="Mentor Commission Rate" value="10" onChange={() => {}} prefix="%" />
          </div>
        </Section>

        <Section title="Compatibility Test Rules">
          <div className="space-y-4">
            <Field label="Minimum Score for Match" value="60" onChange={() => {}} prefix="%" />
            <Field label="Max Matches per User (Free)" value="5" onChange={() => {}} />
            <Field label="Match Visibility Duration (Days)" value="30" onChange={() => {}} />
          </div>
        </Section>

        <Section title="Notification Settings">
          <Toggle label="Email Notifications" desc="Send email alerts to users" checked={notifications.email} onChange={() => setNotifications(n => ({ ...n, email: !n.email }))} />
          <Toggle label="New Match Alerts" desc="Notify users when matched" checked={notifications.match} onChange={() => setNotifications(n => ({ ...n, match: !n.match }))} />
          <Toggle label="Sprint Reminders" desc="Weekly sprint milestone reminders" checked={notifications.sprint} onChange={() => setNotifications(n => ({ ...n, sprint: !n.sprint }))} />
          <Toggle label="Legal Agreement Alerts" desc="Notify when agreement is ready" checked={notifications.legal} onChange={() => setNotifications(n => ({ ...n, legal: !n.legal }))} />
        </Section>
      </div>
    </div>
  )
}
