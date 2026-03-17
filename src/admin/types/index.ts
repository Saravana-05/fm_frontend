// ── Core Types ──────────────────────────────────────────────

export type Status = 'active' | 'suspended' | 'pending' | 'inactive'
export type VerificationStatus = 'verified' | 'unverified' | 'pending'
export type AccountType = 'founder' | 'admin' | 'provider'

export interface User {
  id: string
  name: string
  email: string
  signupDate: string
  accountType: AccountType
  verificationStatus: VerificationStatus
  status: Status
  avatar?: string
}

export interface Founder {
  id: string
  name: string
  email: string
  startupInterest: string
  experience: string
  compatibilityScore: number
  verificationStatus: VerificationStatus
  profileStatus: 'approved' | 'pending' | 'rejected'
  skills: string[]
}

export interface Match {
  id: string
  founderA: string
  founderB: string
  compatibilityScore: number
  matchDate: string
  status: 'active' | 'ended' | 'flagged'
}

export interface Sprint {
  id: string
  founderA: string
  founderB: string
  startupIdea: string
  startDate: string
  status: 'active' | 'completed' | 'ended' | 'disputed'
  milestonesCompleted: number
  totalMilestones: number
}

export interface LegalAgreement {
  id: string
  founderA: string
  founderB: string
  agreementType: string
  equitySplit: string
  agreementDate: string
  status: 'active' | 'pending' | 'flagged' | 'completed'
}

export interface Provider {
  id: string
  name: string
  serviceType: 'freelancer' | 'mentor' | 'lawyer'
  rating: number
  projectsCompleted: number
  status: 'approved' | 'pending' | 'rejected'
}

export interface Transaction {
  id: string
  user: string
  amount: number
  type: string
  paymentMethod: string
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
}

export interface MetricCard {
  label: string
  value: string | number
  change: number
  icon: string
}

export interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  path: string
  badge?: number
}
