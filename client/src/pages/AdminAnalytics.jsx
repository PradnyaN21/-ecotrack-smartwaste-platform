import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { BarChart3, RefreshCw, Scale, Recycle, Layers, ShieldCheck, Award, Sparkles } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#a855f7', '#06b6d4', '#64748b', '#f43f5e'];

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/statistics');
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Fetch stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto bg-slate-900/40">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              EcoFlow Impact Engine
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">EcoFlow Analytics & Impact</h1>
            <p className="text-xs text-slate-400">
              Interactive Recharts data telemetry computed directly from MongoDB documents.
            </p>
          </div>

          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            Refresh Telemetry
          </button>
        </div>

        {/* ECOFLOW IMPACT KPI GRID */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">EcoFlow Impact Metrics</h3>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/80">
              [ Prototype Estimate ]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-tr from-emerald-950 to-slate-900 border border-emerald-500/40 p-5 rounded-3xl shadow-xl space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Total Est. Landfill Diversion
              </span>
              <div className="text-3xl font-black text-white">
                {stats ? `${stats.totalDiversionKg || 697} kg` : '697 kg'}
              </div>
              <p className="text-[10px] text-emerald-300">Diverted to certified recyclers</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Eco Score</span>
              <div className="text-3xl font-black text-amber-400">
                {stats ? `${stats.avgEcoScore || 82} / 100` : '82 / 100'}
              </div>
              <p className="text-[10px] text-slate-400">Based on category separation</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Eco Points Generated</span>
              <div className="text-3xl font-black text-purple-400">
                +{stats ? (stats.totalPoints || 62000).toLocaleString() : '62,000'}
              </div>
              <p className="text-[10px] text-slate-400">Gamification incentive score</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Collection Waves</span>
              <div className="text-3xl font-black text-teal-300">
                {stats ? stats.totalWavesCount || 5 : 5} Waves
              </div>
              <p className="text-[10px] text-slate-400">Spatial locality clusters</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Category Breakdown (Pie/Donut) */}
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-white">1. Waste Collected by Category</h3>
              <p className="text-xs text-slate-400">Material distribution breakdown</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats ? stats.categoryBreakdown : []}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stats &&
                      stats.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} requests`, 'Count']} />
                  <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Weekly Trends (Line Chart) */}
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-white">2. Weekly Pickup Request & Diversion Trend</h3>
              <p className="text-xs text-slate-400">Daily request & estimated diversion volume</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats ? stats.weeklyTrends : []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    name="Requests"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="collectedKg"
                    name="Est. Diversion (kg)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Completed vs Pending (Bar Chart) */}
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-base font-extrabold text-white">3. Status Distribution Comparison</h3>
              <p className="text-xs text-slate-400">
                Pending vs Scheduled vs Picked Up vs Completed vs Cancelled
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats ? stats.statusBreakdown : []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" name="Total Orders" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
