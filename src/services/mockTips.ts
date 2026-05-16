import { Tip, TicketStatus, GlobalStats } from '../types';
import { DEMO_TIPS, getDemoStats } from '../lib/demoData';

const TIPS_KEY = 'elite_tips_data';

export const mockTipsService = {
  getTips: async (): Promise<Tip[]> => {
    const stored = localStorage.getItem(TIPS_KEY);
    if (stored) return JSON.parse(stored);
    return DEMO_TIPS;
  },

  getVipTips: async (): Promise<Tip[]> => {
    const tips = await mockTipsService.getTips();
    return tips.filter(t => t.isVip);
  },

  getFreeTips: async (): Promise<Tip[]> => {
    const tips = await mockTipsService.getTips();
    return tips.filter(t => !t.isVip);
  },

  getStats: async (): Promise<GlobalStats> => {
    const tips = await mockTipsService.getTips();
    const completed = tips.filter(t => t.status !== TicketStatus.PENDING);
    const wins = completed.filter(t => t.status === TicketStatus.WON);
    
    // Calculate REAL ROI
    // Assuming flat stake of 100 units
    const stake = 100;
    const totalStaked = completed.length * stake;
    const totalReturned = completed.reduce((acc, t) => {
      if (t.status === TicketStatus.WON) {
        return acc + (stake * t.totalOdds);
      }
      return acc;
    }, 0);

    const profit = totalReturned - totalStaked;
    const roi = totalStaked > 0 ? (profit / totalStaked) * 100 : 0;

    // Calculate streaks
    let winStreak = 0;
    let loseStreak = 0;
    let currentWin = 0;
    let currentLose = 0;

    [...completed].reverse().forEach(t => {
      if (t.status === TicketStatus.WON) {
        currentWin++;
        currentLose = 0;
        if (currentWin > winStreak) winStreak = currentWin;
      } else {
        currentLose++;
        currentWin = 0;
        if (currentLose > loseStreak) loseStreak = currentLose;
      }
    });

    return {
      totalTips: tips.length,
      winCount: wins.length,
      lossCount: completed.length - wins.length,
      successRate: parseFloat(((wins.length / (completed.length || 1)) * 100).toFixed(1)),
      monthlyProfit: parseFloat(profit.toFixed(2)),
      roi: parseFloat(roi.toFixed(1)),
      winStreak,
      loseStreak
    };
  },

  resetTips: async (): Promise<void> => {
    localStorage.setItem(TIPS_KEY, JSON.stringify(DEMO_TIPS));
  },

  addTip: async (tip: Tip): Promise<void> => {
    const tips = await mockTipsService.getTips();
    const newTips = [tip, ...tips];
    localStorage.setItem(TIPS_KEY, JSON.stringify(newTips));
  },

  updateTip: async (updatedTip: Tip): Promise<void> => {
    const tips = await mockTipsService.getTips();
    const index = tips.findIndex(t => t.id === updatedTip.id);
    if (index !== -1) {
      tips[index] = updatedTip;
      localStorage.setItem(TIPS_KEY, JSON.stringify(tips));
    }
  },

  deleteTip: async (id: string): Promise<void> => {
    const tips = await mockTipsService.getTips();
    const newTips = tips.filter(t => t.id !== id);
    localStorage.setItem(TIPS_KEY, JSON.stringify(newTips));
  }
};
