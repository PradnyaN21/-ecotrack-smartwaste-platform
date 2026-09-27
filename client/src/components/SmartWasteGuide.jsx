import React from 'react';
import { Info, Recycle, CheckCircle2, AlertCircle } from 'lucide-react';

export const wasteGuideData = {
  Plastic: {
    recyclability: 'High',
    guidance: 'Clean and separate plastic containers. Rinse out food residue before packing.',
    tips: ['Rinse bottles & tubs', 'Remove metal caps', 'Flatten plastic jugs to save space'],
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  Paper: {
    recyclability: 'High',
    guidance: 'Keep paper dry and separate. Flatten cardboard boxes for easy collection.',
    tips: ['Keep away from oil/moisture', 'Remove heavy plastic wrapping', 'Bundle newspapers together'],
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  Organic: {
    recyclability: 'Medium (Compostable)',
    guidance: 'Keep food and organic waste separate. Use biodegradable or paper bags.',
    tips: ['Separate food scraps & peelings', 'No plastic bags in organic waste', 'Ideal for urban composting'],
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  'E-Waste': {
    recyclability: 'High (Specialized Hazard Recycling)',
    guidance: 'Keep electronic items separate from regular household waste.',
    tips: ['Do not dismantle battery cells', 'Bundle power cables securely', 'Protect screen displays'],
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  Glass: {
    recyclability: 'High',
    guidance: 'Separate glass items carefully. Avoid mixing broken glass with regular recyclables.',
    tips: ['Rinse glass bottles & jars', 'Wrap broken glass in thick newspaper', 'Do not mix with ceramics'],
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
  Metal: {
    recyclability: 'High',
    guidance: 'Clean and separate metal containers. Soda cans and tin containers are 100% recyclable.',
    tips: ['Rinse tin & aluminium cans', 'Remove paper labels if possible', 'Separate sharp sheet metals'],
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  'General Waste': {
    recyclability: 'Low (Landfill Stream)',
    guidance: 'Dispose of non-recyclable household waste appropriately.',
    tips: ['Ensure no hazardous items included', 'Seal garbage bags tightly', 'Separate any wet waste'],
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
};

export default function SmartWasteGuide({ category }) {
  if (!category || !wasteGuideData[category]) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-slate-500 text-sm">
        <Info className="w-5 h-5 mx-auto mb-1 text-slate-400" />
        Select a waste category above to view smart disposal guidance.
      </div>
    );
  }

  const info = wasteGuideData[category];

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/40 border border-emerald-200 rounded-xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-emerald-200/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Recycle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-base">Smart Disposal Guide: {category}</h4>
            <p className="text-xs text-slate-600">Rule-based environmental collection protocol</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${info.badgeColor}`}>
          Recyclability: {info.recyclability}
        </span>
      </div>

      <p className="text-sm font-medium text-slate-800 bg-white/70 p-3 rounded-lg border border-emerald-100">
        "{info.guidance}"
      </p>

      <div className="space-y-1.5 pt-1">
        <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider block">Best Preparation Tips:</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {info.tips.map((tip, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 bg-white p-2 rounded-md border border-slate-100 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
