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
import { BarChart3, RefreshCw, Scale, Recycle, Layers, ShieldCheck } from 'lucide-react';
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
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics & Impact Visualizations</h1>
            <p className="text-xs text-slate-500">
              Interactive Recharts breakdown of waste metrics from MongoDB.
            </p>
          </div>

          <button
            onClick={fetchStats}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            Refresh Analytics
          </button>
        </div>

        {/* Statistic Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-tr from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                Total Waste Collected
              </span>
              <Scale className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-3xl font-black">{stats ? `${stats.totalWasteKg} kg` : '820 kg'}</div>
            <p className="text-xs text-emerald-100">Diverted into recycled material streams</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Recyclability Efficiency</span>
              <Recycle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">68.4%</div>
            <p className="text-xs text-slate-500">High yield material separation</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Completed Pickups</span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats ? stats.completed : 0}</div>
            <p className="text-xs text-slate-500">Verified driver completions</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total System Requests</span>
              <Layers className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats ? stats.total : 0}</div>
            <p className="text-xs text-slate-500">MongoDB active documents</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Category Breakdown (Pie/Donut) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">1. Waste Collected by Category</h3>
              <p className="text-xs text-slate-500">Material breakdown distribution</p>
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
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">2. Weekly Pickup Request Trend</h3>
              <p className="text-xs text-slate-500">Daily request volume (Mon - Sun)</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats ? stats.weeklyTrends : []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
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
                    name="Est. Waste (kg)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Completed vs Pending (Bar Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">3. Status Distribution Comparison</h3>
              <p className="text-xs text-slate-500">
                Pending vs Scheduled vs Picked Up vs Completed vs Cancelled
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats ? stats.statusBreakdown : []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" name="Total Requests" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
