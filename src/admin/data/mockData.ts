import type { User, Founder, Match, Sprint, LegalAgreement, Provider, Transaction } from '../types'

export const mockUsers: User[] = [
  { id: 'USR001', name: 'Priya Sharma', email: 'priya@example.com', signupDate: '2024-11-01', accountType: 'founder', verificationStatus: 'verified', status: 'active' },
  { id: 'USR002', name: 'Arjun Mehta', email: 'arjun@example.com', signupDate: '2024-11-05', accountType: 'founder', verificationStatus: 'verified', status: 'active' },
  { id: 'USR003', name: 'Neha Gupta', email: 'neha@example.com', signupDate: '2024-11-08', accountType: 'founder', verificationStatus: 'pending', status: 'pending' },
  { id: 'USR004', name: 'Rohan Verma', email: 'rohan@example.com', signupDate: '2024-11-12', accountType: 'founder', verificationStatus: 'unverified', status: 'suspended' },
  { id: 'USR005', name: 'Kavya Reddy', email: 'kavya@example.com', signupDate: '2024-11-15', accountType: 'founder', verificationStatus: 'verified', status: 'active' },
  { id: 'USR006', name: 'Siddharth Joshi', email: 'sid@example.com', signupDate: '2024-11-18', accountType: 'founder', verificationStatus: 'verified', status: 'active' },
  { id: 'USR007', name: 'Ananya Singh', email: 'ananya@example.com', signupDate: '2024-11-20', accountType: 'founder', verificationStatus: 'pending', status: 'pending' },
  { id: 'USR008', name: 'Vikram Das', email: 'vikram@example.com', signupDate: '2024-11-22', accountType: 'provider', verificationStatus: 'verified', status: 'active' },
]

export const mockFounders: Founder[] = [
  { id: 'FDR001', name: 'Priya Sharma', email: 'priya@example.com', startupInterest: 'Fintech', experience: '3 years', compatibilityScore: 87, verificationStatus: 'verified', profileStatus: 'approved', skills: ['Product', 'Marketing'] },
  { id: 'FDR002', name: 'Arjun Mehta', email: 'arjun@example.com', startupInterest: 'EdTech', experience: '5 years', compatibilityScore: 92, verificationStatus: 'verified', profileStatus: 'approved', skills: ['Engineering', 'AI'] },
  { id: 'FDR003', name: 'Neha Gupta', email: 'neha@example.com', startupInterest: 'HealthTech', experience: '2 years', compatibilityScore: 74, verificationStatus: 'pending', profileStatus: 'pending', skills: ['Design', 'Research'] },
  { id: 'FDR004', name: 'Kavya Reddy', email: 'kavya@example.com', startupInterest: 'SaaS', experience: '4 years', compatibilityScore: 89, verificationStatus: 'verified', profileStatus: 'approved', skills: ['Sales', 'Growth'] },
  { id: 'FDR005', name: 'Siddharth Joshi', email: 'sid@example.com', startupInterest: 'Logistics', experience: '6 years', compatibilityScore: 81, verificationStatus: 'verified', profileStatus: 'approved', skills: ['Operations', 'Strategy'] },
  { id: 'FDR006', name: 'Ananya Singh', email: 'ananya@example.com', startupInterest: 'CleanTech', experience: '1 year', compatibilityScore: 68, verificationStatus: 'pending', profileStatus: 'pending', skills: ['Engineering'] },
]

export const mockMatches: Match[] = [
  { id: 'MCH001', founderA: 'Priya Sharma', founderB: 'Arjun Mehta', compatibilityScore: 94, matchDate: '2024-11-10', status: 'active' },
  { id: 'MCH002', founderA: 'Kavya Reddy', founderB: 'Siddharth Joshi', compatibilityScore: 88, matchDate: '2024-11-12', status: 'active' },
  { id: 'MCH003', founderA: 'Neha Gupta', founderB: 'Rohan Verma', compatibilityScore: 72, matchDate: '2024-11-15', status: 'flagged' },
  { id: 'MCH004', founderA: 'Ananya Singh', founderB: 'Vikram Das', compatibilityScore: 65, matchDate: '2024-11-18', status: 'ended' },
  { id: 'MCH005', founderA: 'Priya Sharma', founderB: 'Kavya Reddy', compatibilityScore: 91, matchDate: '2024-11-20', status: 'active' },
]

export const mockSprints: Sprint[] = [
  { id: 'SPR001', founderA: 'Priya Sharma', founderB: 'Arjun Mehta', startupIdea: 'AI-powered lending', startDate: '2024-10-01', status: 'active', milestonesCompleted: 7, totalMilestones: 12 },
  { id: 'SPR002', founderA: 'Kavya Reddy', founderB: 'Siddharth Joshi', startupIdea: 'Last-mile delivery SaaS', startDate: '2024-10-15', status: 'active', milestonesCompleted: 4, totalMilestones: 12 },
  { id: 'SPR003', founderA: 'Neha Gupta', founderB: 'Vikram Das', startupIdea: 'Remote health diagnostics', startDate: '2024-09-01', status: 'completed', milestonesCompleted: 12, totalMilestones: 12 },
  { id: 'SPR004', founderA: 'Ananya Singh', founderB: 'Rohan Verma', startupIdea: 'Solar EV charging', startDate: '2024-11-01', status: 'disputed', milestonesCompleted: 2, totalMilestones: 12 },
]

export const mockLegal: LegalAgreement[] = [
  { id: 'LGL001', founderA: 'Priya Sharma', founderB: 'Arjun Mehta', agreementType: 'Co-founder Agreement', equitySplit: '50/50', agreementDate: '2024-11-20', status: 'active' },
  { id: 'LGL002', founderA: 'Kavya Reddy', founderB: 'Siddharth Joshi', agreementType: 'Equity Split Agreement', equitySplit: '60/40', agreementDate: '2024-11-22', status: 'active' },
  { id: 'LGL003', founderA: 'Neha Gupta', founderB: 'Vikram Das', agreementType: 'NDA', equitySplit: 'N/A', agreementDate: '2024-11-10', status: 'completed' },
  { id: 'LGL004', founderA: 'Ananya Singh', founderB: 'Rohan Verma', agreementType: 'Co-founder Agreement', equitySplit: '55/45', agreementDate: '2024-11-25', status: 'flagged' },
]

export const mockProviders: Provider[] = [
  { id: 'PRV001', name: 'Rajesh Kumar', serviceType: 'lawyer', rating: 4.9, projectsCompleted: 34, status: 'approved' },
  { id: 'PRV002', name: 'Sunita Patel', serviceType: 'mentor', rating: 4.7, projectsCompleted: 52, status: 'approved' },
  { id: 'PRV003', name: 'Aditya Dev', serviceType: 'freelancer', rating: 4.5, projectsCompleted: 18, status: 'approved' },
  { id: 'PRV004', name: 'Meera Nair', serviceType: 'lawyer', rating: 4.8, projectsCompleted: 28, status: 'pending' },
  { id: 'PRV005', name: 'Karan Soni', serviceType: 'freelancer', rating: 3.9, projectsCompleted: 9, status: 'pending' },
]

export const mockTransactions: Transaction[] = [
  { id: 'TXN001', user: 'Priya Sharma', amount: 15, type: 'Gold Match', paymentMethod: 'Card', status: 'completed', date: '2024-11-25' },
  { id: 'TXN002', user: 'Arjun Mehta', amount: 99, type: 'Gold Match (Annual)', paymentMethod: 'UPI', status: 'completed', date: '2024-11-24' },
  { id: 'TXN003', user: 'Kavya Reddy', amount: 120, type: 'Founder Sprint', paymentMethod: 'Card', status: 'completed', date: '2024-11-23' },
  { id: 'TXN004', user: 'Neha Gupta', amount: 199, type: 'Legal Package', paymentMethod: 'Net Banking', status: 'completed', date: '2024-11-22' },
  { id: 'TXN005', user: 'Siddharth Joshi', amount: 49, type: 'Founder Sprint', paymentMethod: 'Card', status: 'pending', date: '2024-11-21' },
  { id: 'TXN006', user: 'Rohan Verma', amount: 15, type: 'Gold Match', paymentMethod: 'UPI', status: 'failed', date: '2024-11-20' },
]

export const revenueData = [
  { month: 'Jun', revenue: 4200, matches: 28 },
  { month: 'Jul', revenue: 5800, matches: 35 },
  { month: 'Aug', revenue: 7100, matches: 42 },
  { month: 'Sep', revenue: 6400, matches: 38 },
  { month: 'Oct', revenue: 9200, matches: 55 },
  { month: 'Nov', revenue: 11400, matches: 68 },
]

export const userGrowthData = [
  { month: 'Jun', users: 120 },
  { month: 'Jul', users: 195 },
  { month: 'Aug', users: 310 },
  { month: 'Sep', users: 420 },
  { month: 'Oct', users: 580 },
  { month: 'Nov', users: 740 },
]
