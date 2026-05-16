
export enum TicketStatus {
  WON = 'WON',
  LOST = 'LOST',
  PENDING = 'PENDING'
}

export enum MembershipStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  BLOCKED = 'blocked',
  EXPIRED = 'expired'
}

export interface Match {
  id?: string;
  externalMatchId?: string; // Link to results API
  teams: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  prediction: string; // GG, 3+, 1, X, 2, 1X, X2
  odds: number;
  time: string;
  result?: string;
  status?: TicketStatus;
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED',
  POSTPONED = 'POSTPONED'
}

export interface MatchResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  score?: {
    home: number;
    away: number;
  };
  status: MatchStatus;
}

export interface Tip {
  id: string;
  date: string;
  matches: Match[];
  totalOdds: number;
  status: TicketStatus;
  analysis: string;
  isVip: boolean;
  result?: string;
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  membershipStatus: MembershipStatus;
  isAdmin: boolean;
  registeredAt: string;
  membershipExpDate?: string;
  displayName?: string;
}

export interface GlobalStats {
  totalTips: number;
  winCount: number;
  lossCount: number;
  successRate: number;
  monthlyProfit: number;
  roi: number;
  winStreak: number;
  loseStreak: number;
}

export interface VipPackage {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  userName: string;
  comment: string;
  date: string;
  rating: number;
}

export interface AppSettings {
  telegramLink: string;
  whatsappLink: string;
  instagramLink: string;
  viberLink: string;
  contactEmail: string;
}
