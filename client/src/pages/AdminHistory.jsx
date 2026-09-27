import React, { useState, useEffect } from 'react';
import { Search, History, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminHistory() {
  const [historyRequests, setHistoryRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      if (res.ok && data.success) {
        const historyOnly = data.data.filter(
          (r) => r.status === 'Completed' || r.status === 'Cancelled'
        );
        setHistoryRequests(historyOnly);
      }
    } catch (err) {
      console.error('Fetch history error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filtered = historyRequests.filter((r) => {
    const matchesSearch =
      r.requestId.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase()) ||
      r.wasteCategory.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Pickup History Archive</h1>
            <p className="text-xs text-slate-500">Historical completed and cancelled waste pickups</p>
          </div>

          <button
            onClick={fetchHistory}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            Refresh Archive
          </button>
        </div>

        {/* Search & Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search history by ID, customer, city..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
            >
              <option value="All">All Archive (Completed & Cancelled)</option>
              <option value="Completed">Completed Only</option>
              <option value="Cancelled">Cancelled Only</option>
            </select>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Request ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Waste Type</th>
                  <th className="p-3.5">Quantity</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">
                      No historical pickup records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{req.requestId}</td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {req.name}
                        <span className="block text-[10px] text-slate-400 font-normal">{req.phone}</span>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700">{req.wasteCategory}</td>
                      <td className="p-3.5 text-slate-600">{req.quantity}</td>
                      <td className="p-3.5 text-slate-600">{req.address}, {req.city}</td>
                      <td className="p-3.5 text-slate-600">{req.pickupDate}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                            req.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {req.status === 'Completed' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
