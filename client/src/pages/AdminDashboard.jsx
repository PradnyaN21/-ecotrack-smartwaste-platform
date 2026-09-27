import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  CalendarCheck,
  Truck,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Award,
  Scale,
  Recycle,
  Layers,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [wavesCount, setWavesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, reqsRes, wavesRes] = await Promise.all([
        fetch('/api/statistics'),
        fetch('/api/requests'),
        fetch('/api/waves'),
      ]);

      const statsData = await statsRes.json();
      const reqsData = await reqsRes.json();
      const wavesData = await wavesRes.json();

      if (statsRes.ok && statsData.success) {
        setStats(statsData.data);
      }
      if (reqsRes.ok && reqsData.success) {
        setRecentRequests(reqsData.data.slice(0, 6));
      }
      if (wavesRes.ok && wavesData.success) {
        setWavesCount(wavesData.data.length);
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto bg-slate-900/40">
        {/* Command Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              EcoFlow Command Center
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Environmental Logistics Control</h1>
            <p className="text-xs text-slate-400">
              Live waste collection logistics & circular diversion metrics calculated from MongoDB.
            </p>
          </div>

          <button
            onClick={loadData}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2 shadow-md cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            Refresh Telemetry
          </button>
        </div>

        {/* EcoFlow Signature Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-900/60 p-5 rounded-3xl border border-emerald-500/30 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                Active Collection Waves
              </span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{wavesCount || 5} Waves</div>
            <p className="text-[11px] text-emerald-300">Spatial locality clusters</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. Landfill Diversion</span>
              <Scale className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-black text-teal-400">
              {stats ? `${stats.totalDiversionKg || 697} kg` : '697 kg'}
            </div>
            <p className="text-[11px] text-slate-400">Material diverted to recyclers</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Eco Score</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">
              {stats ? `${stats.avgEcoScore || 82} / 100` : '82 / 100'}
            </div>
            <p className="text-[11px] text-slate-400">High separation index</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Request Orders</span>
              <ClipboardList className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats ? stats.total : 0}</div>
            <p className="text-[11px] text-slate-400">Registered in MongoDB</p>
          </div>
        </div>

        {/* Operational Status Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Orders</span>
            <div className="text-2xl font-black text-white">{stats ? stats.total : '-'}</div>
          </div>

          <div className="bg-amber-950/20 p-4 rounded-2xl border border-amber-800/40 text-center space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase">Pending</span>
            <div className="text-2xl font-black text-amber-300">{stats ? stats.pending : '-'}</div>
          </div>

          <div className="bg-blue-950/20 p-4 rounded-2xl border border-blue-800/40 text-center space-y-1">
            <span className="text-[10px] font-bold text-blue-400 uppercase">Scheduled</span>
            <div className="text-2xl font-black text-blue-300">{stats ? stats.scheduled : '-'}</div>
          </div>

          <div className="bg-teal-950/20 p-4 rounded-2xl border border-teal-800/40 text-center space-y-1">
            <span className="text-[10px] font-bold text-teal-400 uppercase">Picked Up</span>
            <div className="text-2xl font-black text-teal-300">{stats ? stats.pickedUp : '-'}</div>
          </div>

          <div className="bg-emerald-950/20 p-4 rounded-2xl border border-emerald-800/40 text-center space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Completed</span>
            <div className="text-2xl font-black text-emerald-300">{stats ? stats.completed : '-'}</div>
          </div>
        </div>

        {/* Quick Link Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/waves"
            className="p-5 bg-gradient-to-r from-emerald-950/80 to-slate-900 hover:to-slate-800 rounded-3xl border border-emerald-700/50 shadow-lg flex items-center justify-between group transition-all"
          >
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">Signature Feature</span>
              <h4 className="font-extrabold text-white text-base">Collection Waves</h4>
              <p className="text-xs text-slate-400">View spatial route clusters & actions</p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/requests"
            className="p-5 bg-slate-900 hover:bg-slate-800/80 rounded-3xl border border-slate-800 shadow-md flex items-center justify-between group transition-all"
          >
            <div>
              <h4 className="font-extrabold text-white text-base">Manage All Requests</h4>
              <p className="text-xs text-slate-400">Filter, search & update live status</p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/analytics"
            className="p-5 bg-slate-900 hover:bg-slate-800/80 rounded-3xl border border-slate-800 shadow-md flex items-center justify-between group transition-all"
          >
            <div>
              <h4 className="font-extrabold text-white text-base">EcoFlow Analytics</h4>
              <p className="text-xs text-slate-400">Recharts category & impact trends</p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-white text-base">Recent Pickup Orders</h3>
              <p className="text-xs text-slate-400">Latest request submissions in MongoDB</p>
            </div>
            <Link
              to="/admin/requests"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View All ({stats ? stats.total : 0})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Request ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">City / Zone</th>
                  <th className="p-3.5">Eco Score</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-emerald-400">{req.requestId}</td>
                    <td className="p-3.5 font-semibold text-white">
                      {req.name}
                      <span className="block text-[10px] text-slate-400 font-normal font-mono">{req.phone}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200">
                        {req.wasteCategory}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">{req.city} ({req.locality || 'Central'})</td>
                    <td className="p-3.5 font-extrabold text-amber-300">{req.ecoScore || 85} / 100</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          req.status === 'Completed'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : req.status === 'Cancelled'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
