import React from 'react';
import { Clock, CalendarCheck, UserCheck, Truck, CheckCircle2, XCircle } from 'lucide-react';

const steps = [
  { key: 'Pending', label: 'Pending', icon: Clock, desc: 'Request submitted to server' },
  { key: 'Scheduled', label: 'Scheduled', icon: CalendarCheck, desc: 'Pickup date & window confirmed' },
  { key: 'Assigned', label: 'Assigned', icon: UserCheck, desc: 'Driver & vehicle dispatched' },
  { key: 'Picked Up', label: 'Picked Up', icon: Truck, desc: 'Waste collected from location' },
  { key: 'Completed', label: 'Completed', icon: CheckCircle2, desc: 'Processed at recycling facility' },
];

export default function StatusTimeline({ currentStatus }) {
  if (currentStatus === 'Cancelled') {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <XCircle className="w-7 h-7" />
        </div>
        <h4 className="text-lg font-bold text-rose-900 mb-1">Request Cancelled</h4>
        <p className="text-sm text-rose-700">
          This pickup request was cancelled. If you believe this is an error, please submit a new request or contact support.
        </p>
      </div>
    );
  }

  const currentIndex = steps.findIndex((s) => s.key === currentStatus);

  return (
    <div className="w-full py-4">
      {/* Desktop Step Flow */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 z-0" />
        <div
          className="absolute top-5 left-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 z-0"
          style={{
            width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 92}%`,
          }}
        />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group max-w-[120px]">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md scale-110'
                    : isDone
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white text-slate-400 border-2 border-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2.5 text-xs font-semibold text-center ${
                  isCurrent ? 'text-emerald-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              <span className="text-[10px] text-slate-400 text-center leading-tight mt-0.5 hidden lg:block">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Step Flow */}
      <div className="flex md:hidden flex-col space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-slate-400 border-2 border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm font-semibold ${
                    isCurrent ? 'text-emerald-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-slate-500">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
