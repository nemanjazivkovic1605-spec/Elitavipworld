import { MatchResult, MatchStatus } from '../types';

// Demo data for matches
const DEMO_MATCH_RESULTS: MatchResult[] = [
  {
    id: 'h1',
    homeTeam: 'Augsburg',
    awayTeam: 'B. Monchengladbach',
    league: 'Bundesliga',
    date: '09.05.2026',
    time: '15:30',
    status: MatchStatus.FINISHED,
    score: { home: 3, away: 1 }
  },
  {
    id: 'h2',
    homeTeam: 'Lazio',
    awayTeam: 'Inter',
    league: 'Serie A',
    date: '09.05.2026',
    time: '20:45',
    status: MatchStatus.FINISHED,
    score: { home: 0, away: 3 }
  },
  {
    id: 'h3',
    homeTeam: 'Lecce',
    awayTeam: 'Juventus',
    league: 'Serie A',
    date: '09.05.2026',
    time: '20:45',
    status: MatchStatus.FINISHED,
    score: { home: 0, away: 1 }
  }
];

// In a real scenario, you'd add your API key here
// const API_KEY = process.env.VITE_FOOTBALL_API_KEY;

export const resultsProvider = {
  getTodayMatches: async (): Promise<MatchResult[]> => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Mocking small delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Return filtered demo data
      return DEMO_MATCH_RESULTS.filter(m => m.date === today);
    } catch (error) {
      console.error('Error fetching today matches:', error);
      return [];
    }
  },

  getFinishedMatchesByDate: async (date: string): Promise<MatchResult[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return DEMO_MATCH_RESULTS.filter(m => m.date === date && m.status === MatchStatus.FINISHED);
    } catch (error) {
      console.error('Error fetching finished matches:', error);
      return [];
    }
  },

  getMatchByTeams: async (home: string, away: string, date: string): Promise<MatchResult | null> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const match = DEMO_MATCH_RESULTS.find(m => 
        m.homeTeam.toLowerCase().includes(home.toLowerCase()) && 
        m.awayTeam.toLowerCase().includes(away.toLowerCase()) &&
        m.date === date
      );
      return match || null;
    } catch (error) {
      console.error('Error fetching match by teams:', error);
      return null;
    }
  },

  getAllMatches: async (): Promise<MatchResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return DEMO_MATCH_RESULTS;
  }
};
