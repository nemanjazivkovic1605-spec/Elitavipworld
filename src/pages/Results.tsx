import React, { useState, useEffect } from 'react';
import { mockTipsService } from '../services/mockTips';
import { Tip, TicketStatus } from '../types';
import { CheckCircle2, XCircle, Clock, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

export default function Results() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'WON' | 'LOST'>('all');

  useEffect(() => {
    const fetchData = async () => {
      const allTips = await mockTipsService.getTips();
      setTips(allTips.filter(t => t.status !== TicketStatus.PENDING));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredTips = tips.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">ISTORIJA <span className="gold-text">REZULTATA</span></h1>
        <p className="text-neutral-400">Transparentan uvid u sve naše prošle tipove i njihovu prolaznost.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {['all', TicketStatus.WON, TicketStatus.LOST].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
              filter === f 
                ? 'bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20' 
                : 'bg-white/5 text-neutral-400 border-white/10 hover:border-gold-500/30'
            }`}
          >
            {f === 'all' ? 'Sve' : f === 'WON' ? 'Prošli' : 'Pali'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
           <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <motion.div
              layout
              key={tip.id}
              className={`glass rounded-[2rem] overflow-hidden border-l-4 ${
                tip.status === TicketStatus.WON ? 'border-l-green-500' : 'border-l-red-500'
              }`}
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                    tip.isVip ? 'bg-gold-500 text-black' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {tip.isVip ? 'VIP' : 'FREE'}
                  </div>
                  <span className="text-[10px] text-neutral-500 font-bold">{tip.date}</span>
                </div>
                {tip.status === TicketStatus.WON ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : (
                  <XCircle size={18} className="text-red-500" />
                )}
              </div>

              <div className="p-6 space-y-4">
                {tip.matches.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1 text-xs text-neutral-500 uppercase font-bold tracking-tighter">
                      <span>{m.league}</span>
                      <span>{m.result || '-'}</span>
                    </div>
                    <div className="font-bold text-neutral-200">{m.teams}</div>
                    <div className="mt-2 flex items-center gap-2">
                       <span className="text-[10px] text-neutral-500 font-black uppercase">Prognoza:</span>
                       <span className={`text-xs font-bold ${m.status === TicketStatus.WON ? 'text-green-500' : m.status === TicketStatus.LOST ? 'text-red-500' : 'text-gold-500'}`}>
                          {m.prediction}
                       </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-black/20 flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Ukupna Kvota</span>
                <span className="text-lg font-display font-black text-gold-500">{tip.totalOdds.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
