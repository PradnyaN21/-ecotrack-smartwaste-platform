import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Boxes,
  Truck,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminWaves() {
  const [waves, setWaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWave, setSelectedWave] = useState(null);

  const fetchWaves = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/waves');
      const data = await res.json();
      if (res.ok && data.success) {
        setWaves(data.data);
      }
    } catch (err) {
      console.error('Fetch collection waves error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaves();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const res = await fetch(`/api/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh waves
        fetchWaves();
        if (selectedWave) {
          const updatedRequests = selectedWave.requests.map((r) =>
            r.requestId === requestId ? { ...r, status: newStatus } : r
          );
          setSelectedWave({ ...selectedWave, requests: updatedRequests });
        }
      }
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto bg-slate-900/60">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              EcoFlow Intelligence Engine
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">EcoFlow Collection Waves</h1>
            <p className="text-xs text-slate-400">
              Rule-based spatial clustering grouping locality requests into optimized logistics routes.
            </p>
          </div>

          <button
            onClick={fetchWaves}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Re-calculate Waves
          </button>
        </div>

        {/* Waves List / Cards */}
        {waves.length === 0 ? (
          /* Unique Empty State */
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800/60">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">No Collection Waves Yet</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Create pickup requests from nearby localities and EcoFlow will automatically cluster them into optimized collection waves.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waves.map((wave) => (
              <div
                key={wave.waveId}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 shadow-xl space-y-5 transition-all group relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                      {wave.waveCode}
                    </span>
                    <h3 className="text-xl font-black text-white flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      {wave.zoneLabel}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      wave.priority === 'HIGH'
                        ? 'bg-rose-950/80 text-rose-300 border-rose-800/80'
                        : wave.priority === 'MEDIUM'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800/80'
                        : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80'
                    }`}
                  >
                    {wave.priority} PRIORITY
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Pickup Requests</span>
                    <span className="text-xl font-black text-white">{wave.requestCount} Orders</span>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Total Quantity</span>
                    <span className="text-xl font-black text-emerald-400">{wave.totalQuantityKg} kg</span>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Recyclable Yield</span>
                    <span className="text-xl font-black text-teal-300">{wave.recyclablePercentage}%</span>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Dominant Waste</span>
                    <span className="text-sm font-extrabold text-amber-300 truncate block mt-1">
                      {wave.dominantCategory}
                    </span>
                  </div>
                </div>

                {/* Suggested Handling Action */}
                <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-3.5 text-xs text-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    EcoFlow Suggested Action:
                  </span>
                  <p className="font-medium leading-relaxed text-slate-300">"{wave.suggestedAction}"</p>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => setSelectedWave(wave)}
                  className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-emerald-600 text-white hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-emerald-500"
                >
                  <Eye className="w-4 h-4" />
                  View Cluster Requests ({wave.requestCount})
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Slide-over / Modal Detail View */}
        {selectedWave && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 space-y-5 border border-slate-800 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                    {selectedWave.waveCode}
                  </span>
                  <h2 className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    {selectedWave.zoneLabel}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {selectedWave.requestCount} Requests • {selectedWave.totalQuantityKg} kg total • {selectedWave.recyclablePercentage}% Recyclable
                  </p>
                </div>
                <button
                  onClick={() => setSelectedWave(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Action Banner */}
              <div className="bg-emerald-950/60 border border-emerald-700/50 p-3.5 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-emerald-400 uppercase tracking-wider block">EcoFlow Logistics Plan:</span>
                <p className="text-slate-200">"{selectedWave.suggestedAction}"</p>
              </div>

              {/* Requests Table inside Wave */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Orders in this Collection Wave</h4>
                <div className="space-y-2">
                  {selectedWave.requests.map((req) => (
                    <div
                      key={req._id}
                      className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-emerald-400">{req.requestId}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                            {req.wasteCategory}
                          </span>
                        </div>
                        <p className="font-semibold text-white mt-0.5">{req.name} • {req.phone}</p>
                        <p className="text-slate-400 text-[11px]">{req.address}</p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.requestId, e.target.value)}
                          className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Assigned">Assigned</option>
                          <option value="Picked Up">Picked Up</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
