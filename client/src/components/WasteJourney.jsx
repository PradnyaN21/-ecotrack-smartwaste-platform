import React from 'react';
import { FilePlus, Layers, Award, Sparkles, Truck, CheckCircle2 } from 'lucide-react';

const stages = [
  { num: '01', title: 'Request Created', icon: FilePlus, desc: 'Logged in EcoTrack DB' },
  { num: '02', title: 'Waste Classified', icon: Layers, desc: 'Category rules matched' },
  { num: '03', title: 'Eco Score Generated', icon: Award, desc: 'Passport score calculated' },
  { num: '04', title: 'Collection Wave', icon: Sparkles, desc: 'Grouped by locality & route' },
  { num: '05', title: 'Pickup Completed', icon: Truck, desc: 'Driver collection verified' },
  { num: '06', title: 'Responsible Recycling', icon: CheckCircle2, desc: 'Landfill diversion achieved' },
];

export default function WasteJourney({ currentStatus = 'Pending' }) {
  // Map currentStatus to active stage index (0-5)
  let activeStageIndex = 2; // Default for Pending: stages 1, 2, 3 active
  if (currentStatus === 'Scheduled' || currentStatus === 'Assigned') {
    activeStageIndex = 3; // Collection Wave active
  } else if (currentStatus === 'Picked Up') {
    activeStageIndex = 4; // Pickup Completed
  } else if (currentStatus === 'Completed') {
    activeStageIndex = 5; // Responsible Recycling
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            EcoFlow Digital Lifecycle
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-1">Your Waste Journey</h3>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Status: <strong className="text-emerald-700 uppercase font-mono">{currentStatus}</strong>
        </span>
      </div>

      {/* Horizontal Steps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx <= activeStageIndex;
          const isCurrent = idx === activeStageIndex;

          return (
            <div
              key={stage.num}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                isCurrent
                  ? 'bg-gradient-to-b from-emerald-600 to-teal-700 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200 scale-102'
                  : isDone
                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                  : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black font-mono ${isCurrent ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {stage.num}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : isDone
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className={`text-xs font-extrabold ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                  {stage.title}
                </h4>
                <p className={`text-[10px] leading-tight ${isCurrent ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
