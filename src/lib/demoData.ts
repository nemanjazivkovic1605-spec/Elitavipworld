import { Tip, TicketStatus, User, MembershipStatus, GlobalStats, VipPackage } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'u1',
    email: 'nemanjazivkovic1605@gmail.com',
    emailVerified: true,
    membershipStatus: MembershipStatus.APPROVED,
    isAdmin: true,
    registeredAt: '2026-05-15',
    membershipExpDate: '2026-06-15',
    displayName: 'Nemanja'
  },
  {
    id: 'u2',
    email: 'admin@elitetips.com',
    emailVerified: true,
    membershipStatus: MembershipStatus.APPROVED,
    isAdmin: true,
    registeredAt: '2026-01-01',
    displayName: 'Admin'
  },
  {
    id: 'u3',
    email: 'user@example.com',
    emailVerified: true,
    membershipStatus: MembershipStatus.APPROVED,
    isAdmin: false,
    registeredAt: '2026-02-15',
    membershipExpDate: '2026-06-15',
    displayName: 'Premium John'
  },
  {
    id: 'u4',
    email: 'pending@example.com',
    emailVerified: true,
    membershipStatus: MembershipStatus.PENDING,
    isAdmin: false,
    registeredAt: '2026-05-10',
    displayName: 'Waitlist Will'
  },
  {
    id: 'u5',
    email: 'unverified@example.com',
    emailVerified: false,
    membershipStatus: MembershipStatus.PENDING,
    isAdmin: false,
    registeredAt: '2026-05-12',
    displayName: 'Ghost Guest'
  }
];

export const DEMO_TIPS: Tip[] = [
  {
    id: 't1',
    date: '09.05.2026',
    isVip: true,
    status: TicketStatus.WON,
    totalOdds: 1.98,
    analysis: 'Augsburg dominance at home against Gladbach.',
    matches: [
      {
        id: 'm1',
        teams: 'Augsburg - B. Monchengladbach',
        homeTeam: 'Augsburg',
        awayTeam: 'B. Monchengladbach',
        league: 'Bundesliga',
        prediction: '1',
        odds: 1.98,
        time: '15:30',
        result: '3:1',
        status: TicketStatus.WON
      }
    ]
  },
  {
    id: 't2',
    date: '09.05.2026',
    isVip: true,
    status: TicketStatus.WON,
    totalOdds: 1.90,
    analysis: 'Inter control in Rome.',
    matches: [
      {
        id: 'm2',
        teams: 'Lazio - Inter',
        homeTeam: 'Lazio',
        awayTeam: 'Inter',
        league: 'Serie A',
        prediction: '2',
        odds: 1.90,
        time: '20:45',
        result: '0:3',
        status: TicketStatus.WON
      }
    ]
  },
  {
    id: 't3',
    date: '09.05.2026',
    isVip: false,
    status: TicketStatus.WON,
    totalOdds: 1.42,
    analysis: 'Juventus clinical win away.',
    matches: [
      {
        id: 'm3',
        teams: 'Lecce - Juventus',
        homeTeam: 'Lecce',
        awayTeam: 'Juventus',
        league: 'Serie A',
        prediction: '2',
        odds: 1.42,
        time: '20:45',
        result: '0:1',
        status: TicketStatus.WON
      }
    ]
  }
];

export const getDemoStats = (): GlobalStats => {
  return {
    totalTips: 3,
    winCount: 3,
    lossCount: 0,
    successRate: 100,
    monthlyProfit: 186,
    roi: 43.3,
    winStreak: 3,
    loseStreak: 0
  };
};

export const VIP_PACKAGES: VipPackage[] = [
  {
    id: 'p1',
    name: 'SILVER 7 DANA',
    price: 15,
    durationDays: 7,
    features: ['7 dana VIP tipova', 'Viber/Telegram grupa', 'Osnovne analize'],
    isPopular: false
  },
  {
    id: 'p2',
    name: 'GOLD 30 DANA',
    price: 40,
    durationDays: 30,
    features: ['30 dana VIP tipova', 'Prioritetna podrška', 'Detaljne analize', 'Live tipovi'],
    isPopular: true
  },
  {
    id: 'p3',
    name: 'ELITE 90 DANA',
    price: 100,
    durationDays: 90,
    features: ['90 dana VIP tipova', 'Sve iz GOLD paketa', 'Direktne konsultacije', 'Popust na obnovu'],
    isPopular: false
  }
];
