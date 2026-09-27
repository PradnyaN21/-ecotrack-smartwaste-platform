import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  CalendarCheck,
  Truck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, reqsRes] = await Promise.all([
        fetch('/api/statistics'),
        fetch('/api/requests'),
      ]);

      const statsData = await statsRes.json();
      const reqsData = await reqsRes.json();

      if (statsRes.ok && statsData.success) {
        setStats(statsData.data);
      }
      if (reqsRes.ok && reqsData.success) {
        setRecentRequests(reqsData.data.slice(0, 6));
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
      setError('Failed to fetch stats from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Operational Dashboard</h1>
            <p className="text-xs text-slate-500">
              Live waste collection logistics metrics calculated from local MongoDB.
            </p>
          </div>

          <button
            onClick={loadData}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Requests</span>
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                <ClipboardList className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{stats ? stats.total : '-'}</div>
            <p className="text-[11px] text-slate-400">All registered pickups</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800">Pending</span>
              <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-amber-700">{stats ? stats.pending : '-'}</div>
            <p className="text-[11px] text-amber-600 font-medium">Awaiting scheduling</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-800">Scheduled</span>
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-blue-700">{stats ? stats.scheduled : '-'}</div>
            <p className="text-[11px] text-blue-600 font-medium">Date & driver assigned</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-teal-800">Picked Up</span>
              <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-teal-700">{stats ? stats.pickedUp : '-'}</div>
            <p className="text-[11px] text-teal-600 font-medium">In transit to hub</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800">Completed</span>
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-700">{stats ? stats.completed : '-'}</div>
            <p className="text-[11px] text-emerald-600 font-medium">Fully processed</p>
          </div>
        </div>

        {/* Quick Link Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/requests"
            className="p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group transition-all"
          >
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Manage All Requests</h4>
              <p className="text-xs text-slate-500">Filter, search & update live status</p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/scheduled"
            className="p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group transition-all"
          >
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Scheduled Pickups</h4>
              <p className="text-xs text-slate-500">Driver dispatch & route control</p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/analytics"
            className="p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group transition-all"
          >
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Visual Analytics</h4>
              <p className="text-xs text-slate-500">Recharts category & weekly charts</p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Recent Pickup Requests</h3>
              <p className="text-xs text-slate-500">Latest submissions in MongoDB</p>
            </div>
            <Link
              to="/admin/requests"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              View All ({stats ? stats.total : 0})
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3.5">Request ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">City</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-emerald-700">{req.requestId}</td>
                    <td className="p-3.5 font-medium text-slate-900">
                      {req.name}
                      <span className="block text-[10px] text-slate-400">{req.phone}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                        {req.wasteCategory}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{req.city}</td>
                    <td className="p-3.5 text-slate-600">{req.pickupDate}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          req.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
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
