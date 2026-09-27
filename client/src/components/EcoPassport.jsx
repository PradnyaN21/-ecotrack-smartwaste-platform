import React from 'react';
import {
  Award,
  Sparkles,
  Recycle,
  CheckCircle2,
  ShieldAlert,
  MapPin,
  TrendingUp,
  Leaf,
  Layers,
  Info,
} from 'lucide-react';

export default function EcoPassport({ request }) {
  if (!request) return null;

  const score = request.ecoScore || 82;
  const points = request.ecoPoints || 50;
  const diversionKg = request.estimatedDiversionKg || 4.2;

  // Recyclability mapping
  const recyclabilityMap = {
    Plastic: { level: 'HIGH', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    Paper: { level: 'HIGH', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    Metal: { level: 'HIGH', color: 'bg-slate-100 text-slate-800 border-slate-300' },
    Glass: { level: 'HIGH', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
    'E-Waste': { level: 'SPECIAL', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    Organic: { level: 'MEDIUM (Compostable)', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    'General Waste': { level: 'LOW', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  };

  const recInfo = recyclabilityMap[request.wasteCategory] || { level: 'HIGH', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };

  // Circular progress stroke offset (r=36, circumference ~ 226)
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 relative overflow-hidden space-y-6">
      {/* Background Decorative Graphic */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Stamp */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
            <Leaf className="w-5 h-5 fill-slate-950/20" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
              EcoFlow Passport Verified
            </div>
            <h3 className="text-lg font-black tracking-wide text-white mt-0.5">ECOFLOW WASTE PASSPORT</h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Request ID</span>
          <span className="text-xl font-black font-mono tracking-wider text-emerald-400">{request.requestId}</span>
        </div>
      </div>

      {/* Main Grid: Score Ring + Key Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Score Ring */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col items-center justify-center text-center space-y-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                className="text-white/10"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                className="text-emerald-400 transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white leading-none">{score}</span>
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">/ 100</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-100">Eco Score: {score}/100</h4>
            <p className="text-[10px] text-slate-400 leading-tight max-w-[180px] mx-auto mt-0.5">
              Based on waste category, quantity and separation info.
            </p>
          </div>
        </div>

        {/* Eco Points & Landfill Diversion */}
        <div className="space-y-3 md:col-span-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Eco Points Earned
              </span>
              <div className="text-2xl font-black text-amber-400">+{points} Points</div>
              <p className="text-[10px] text-slate-400">Prototype engagement incentive</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                Est. Landfill Diversion
              </span>
              <div className="text-2xl font-black text-emerald-400">~{diversionKg} kg</div>
              <p className="text-[10px] text-slate-400">Estimated recyclable material</p>
            </div>
          </div>

          {/* Details Bar */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Waste Category</span>
              <span className="font-bold text-white block mt-0.5">{request.wasteCategory}</span>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Recyclability</span>
              <span className="font-bold text-emerald-300 block mt-0.5">{recInfo.level}</span>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Collection Zone</span>
              <span className="font-bold text-white block mt-0.5 truncate">{request.locality || request.city}</span>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Status</span>
              <span className="font-extrabold text-amber-300 uppercase block mt-0.5">{request.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-center text-xs gap-2 relative z-10">
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Recommended Handling: <strong>Clean → Sort → Responsible Recycling</strong></span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium italic">
          * Calculated values are prototype estimates.
        </span>
      </div>
    </div>
  );
}
